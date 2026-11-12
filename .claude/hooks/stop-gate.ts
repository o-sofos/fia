/**
 * Stop: before Claude finishes a turn that changed code, run the same gates
 * CI runs (types, tests incl. runtime-idle checks, size, check-pure). On
 * failure, exit 2 so Claude keeps working with the failure in front of it.
 *
 * - Skips when no relevant file changed, or nothing changed since the last
 *   passing run (keyed by a hash of the diff), so Q&A turns stay instant.
 * - Gives up blocking after 3 consecutive failures in a session so a stuck
 *   state can't loop forever; it then lets the turn end and says so.
 */

import { createHash } from "crypto";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const input = await Bun.stdin.json().catch(() => ({}));
const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const session = String(input?.session_id ?? "default").replace(/[^\w-]/g, "");
const stateFile = join(tmpdir(), `fia-stop-gate-${session}.json`);
const MAX_BLOCKS = 3;

const RELEVANT = /^(src\/|bench\/|scripts\/|tsconfig[^/]*\.json$|bunfig\.toml$|package\.json$|size-limits\.json$|coverage-thresholds\.json$)/;

function run(cmd: string[]): { ok: boolean; out: string } {
    const p = Bun.spawnSync(cmd, { cwd: root, stdout: "pipe", stderr: "pipe", env: { ...process.env, NO_COLOR: "1" } });
    return { ok: p.exitCode === 0, out: p.stdout.toString() + p.stderr.toString() };
}

const status = run(["git", "status", "--porcelain", "--untracked-files=all"]).out;
const changed = status
    .split("\n")
    .map((l) => l.slice(3).trim().replace(/^"|"$/g, ""))
    .filter((f) => f && RELEVANT.test(f) && !f.includes(":Zone.Identifier"));
if (changed.length === 0) process.exit(0);

// Fingerprint the working tree's relevant changes
const hash = createHash("sha1");
hash.update(run(["git", "diff", "HEAD", "--", ...changed]).out);
for (const f of changed) {
    const p = join(root, f);
    if (existsSync(p)) {
        try {
            hash.update(f).update(readFileSync(p));
        } catch {
            // directory or unreadable — the diff covers it
        }
    }
}
const fingerprint = hash.digest("hex");

interface State { passed?: string; blocks: number }
let state: State = { blocks: 0 };
try {
    state = JSON.parse(readFileSync(stateFile, "utf8"));
} catch {
    // first run
}
if (state.passed === fingerprint) process.exit(0);

const touchesCore = changed.some((f) => f.startsWith("src/core/"));
const gates: [string, string[]][] = [
    ["types", ["bun", "run", "test:types"]],
    ["tests", ["bun", "run", "test"]],
    ...(touchesCore ? ([["size", ["bun", "run", "size"]], ["check:pure", ["bun", "run", "check:pure"]]] as [string, string[]][]) : []),
];

const failures: string[] = [];
for (const [name, cmd] of gates) {
    const r = run(cmd);
    if (!r.ok) {
        const lines = r.out
            .split("\n")
            .filter((l) => l.trim() && !/^\s*\(pass\)|^✅|^✓|^🎉|^\$ /.test(l));
        failures.push(`── ${name} (${cmd.slice(2).join(" ") || cmd.join(" ")}) failed:\n${lines.slice(-40).join("\n")}`);
    }
}

if (failures.length === 0) {
    writeFileSync(stateFile, JSON.stringify({ passed: fingerprint, blocks: 0 }));
    process.exit(0);
}

state.blocks = (state.blocks ?? 0) + 1;
writeFileSync(stateFile, JSON.stringify(state));
if (state.blocks > MAX_BLOCKS) {
    // Let the turn end; the user sees this in the transcript
    console.log(`fia stop-gate: still failing after ${MAX_BLOCKS} attempts — stopping anyway. Tell the user what's failing:\n${failures.join("\n\n")}`);
    writeFileSync(stateFile, JSON.stringify({ blocks: 0 }));
    process.exit(0);
}

console.error(
    `The project's gates fail on your changes (attempt ${state.blocks}/${MAX_BLOCKS}). Fix them before finishing, ` +
        `or if a failure is pre-existing/out of scope, say so explicitly to the user.\n\n${failures.join("\n\n")}`,
);
process.exit(2);
