/**
 * PreToolUse(Edit|Write|MultiEdit): block edits to generated or ratcheted
 * files and point at the command that owns them. Exit 2 = block, stderr goes
 * back to Claude.
 */

import { relative, resolve } from "path";

const input = await Bun.stdin.json().catch(() => ({}));
const filePath: string | undefined = input?.tool_input?.file_path ?? input?.tool_input?.notebook_path;
if (!filePath) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const rel = relative(root, resolve(root, filePath)).replaceAll("\\", "/");

const rules: [RegExp, string][] = [
    [/^docs\//, "docs/ is the built GitHub Pages site. Edit src/docs/ and run `bun run build:docs`."],
    [/:Zone\.Identifier$/, "Zone.Identifier files are WSL download metadata. Ignore them; never edit or commit them."],
    [/^(dist|coverage)\//, `${rel.split("/")[0]}/ is build output.`],
    [/^bench\/\.results\//, "bench/.results/ holds benchmark baselines. Regenerate with `bun run bench --save`."],
    [/\.tsbuildinfo$/, "tsbuildinfo files are tsc caches."],
    [
        /^coverage-thresholds\.json$/,
        "Coverage thresholds are a ratchet. Raise them with `bun run test:coverage --update` after adding tests; lowering them is the user's call, so ask first.",
    ],
    [
        /^size-limits\.json$/,
        "Size budgets are a gate. If growth is intended, run `bun run size --update` and say why in the commit; ask the user before raising a budget.",
    ],
];

for (const [pattern, reason] of rules) {
    if (pattern.test(rel)) {
        console.error(`Blocked edit to ${rel}: ${reason}`);
        process.exit(2);
    }
}
