/**
 * PostToolUse(Edit|Write|MultiEdit): after a change under src/core or
 * src/testing, run the tests most related to the edited file and feed
 * failures straight back (exit 2 → stderr shown to Claude). Silent on success.
 *
 * Related = test files next to the module, in its tests/ subfolder, and any
 * test file that imports it by name. Also runs check-pure for src/core edits.
 */

import { Glob } from "bun";
import { existsSync, readFileSync } from "fs";
import { basename, dirname, join, relative, resolve } from "path";

const input = await Bun.stdin.json().catch(() => ({}));
const filePath: string | undefined = input?.tool_input?.file_path;
if (!filePath) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const abs = resolve(root, filePath);
const rel = relative(root, abs).replaceAll("\\", "/");
if (!/^src\/(core|testing)\/.*\.ts$/.test(rel) || !existsSync(abs)) process.exit(0);

const MAX_FILES = 8;
const related = new Set<string>();

if (rel.endsWith(".test.ts")) {
    related.add(rel);
} else {
    const dir = dirname(rel);
    const stem = basename(rel, ".ts");
    for (const pattern of [`${dir}/*.test.ts`, `${dir}/tests/*.test.ts`]) {
        for (const f of new Glob(pattern).scanSync(root)) related.add(f);
    }
    // Test files elsewhere that import this module
    const importRe = new RegExp(`from\\s+["'][^"']*/${stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\.ts)?["']`);
    for (const f of new Glob("src/**/*.test.ts").scanSync(root)) {
        if (related.size >= MAX_FILES) break;
        if (importRe.test(readFileSync(join(root, f), "utf8"))) related.add(f);
    }
}

const problems: string[] = [];

if (related.size > 0) {
    const files = [...related].slice(0, MAX_FILES);
    const proc = Bun.spawnSync(["bun", "test", ...files.map((f) => `./${f}`)], {
        cwd: root,
        stdout: "pipe",
        stderr: "pipe",
        env: { ...process.env, FORCE_COLOR: "0", NO_COLOR: "1" },
    });
    if (proc.exitCode !== 0) {
        const out = (proc.stdout.toString() + proc.stderr.toString()).split("\n");
        // Keep failures and their errors, drop passing noise
        const keep = out.filter((l) => !/^\s*\(pass\)|^✅|^✓|^🎉|^bun test v/.test(l) && l.trim() !== "");
        problems.push(`Related tests failed after editing ${rel} (${files.join(", ")}):\n${keep.slice(-60).join("\n")}`);
    }
}

if (rel.startsWith("src/core/") && !rel.endsWith(".test.ts")) {
    const pure = Bun.spawnSync(["bun", "scripts/check-pure.ts", rel], { cwd: root, stdout: "pipe", stderr: "pipe" });
    if (pure.exitCode !== 0) problems.push(pure.stderr.toString().trim());
}

if (problems.length > 0) {
    console.error(problems.join("\n\n"));
    process.exit(2);
}
