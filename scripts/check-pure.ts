/**
 * Tree-shaking guard: every module-level `export const x = call(...)` in
 * src/core must be annotated `/*#__PURE__*\/`, or bundlers must assume the
 * call has side effects and keep it (plus everything it references) in every
 * bundle that imports the module — even if `x` is never used.
 *
 *   bun scripts/check-pure.ts            check all of src/core
 *   bun scripts/check-pure.ts <files…>   check specific files
 */

import { Glob } from "bun";
import { readFileSync } from "fs";

// `export const name[: Type] = callee(`  /  `= callee<T>(` / `= ns.callee(`
const EXPORT_CALL = /^export const (\w+)\s*(?::[^=]+)?=\s*(?!\/\*#__PURE__\*\/)([\w.$]+)\s*(?:<[^>]*>)?\s*\(/;

const args = process.argv.slice(2);
const files = args.length > 0
    ? args.filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))
    : [...new Glob("src/core/**/*.ts").scanSync(".")].filter((f) => !f.endsWith(".test.ts"));

const problems: string[] = [];
for (const file of files) {
    let text: string;
    try {
        text = readFileSync(file, "utf8");
    } catch {
        continue;
    }
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
        const m = EXPORT_CALL.exec(lines[i]);
        // Symbol()/Object.freeze() etc. are side-effect free by bundler convention
        if (m && !/^(Symbol|Object\.freeze)$/.test(m[2])) {
            problems.push(`${file}:${i + 1}  export const ${m[1]} = ${m[2]}(…) is missing /*#__PURE__*/`);
        }
    }
}

if (problems.length > 0) {
    console.error(problems.join("\n"));
    console.error(`\ncheck-pure: ${problems.length} unannotated export call(s). Add /*#__PURE__*/ before the call.`);
    process.exit(1);
}
console.log(`check-pure: ok (${files.length} files)`);
