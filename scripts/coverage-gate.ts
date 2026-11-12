/**
 * Coverage gate on *totals* (bun's coverageThreshold is per-file, which would
 * pin the gate to the weakest file).
 *
 *   bun run test:coverage            # run tests, enforce thresholds
 *   bun run test:coverage --update   # rewrite thresholds to current totals (ratchet up)
 *
 * Thresholds live in coverage-thresholds.json. Raise them when coverage
 * improves; lowering them should be a deliberate, reviewed change.
 */

import { existsSync, readFileSync, rmSync, writeFileSync } from "fs";

const THRESHOLDS_FILE = "coverage-thresholds.json";
const LCOV = "coverage/lcov.info";
const update = process.argv.includes("--update");

interface Totals {
    lines: number;
    functions: number;
}

rmSync("coverage", { recursive: true, force: true });
const proc = Bun.spawnSync(
    ["bun", "test", "src/core", "src/testing", "--coverage", "--coverage-reporter=lcov", "--coverage-reporter=text"],
    { stdout: "inherit", stderr: "inherit" },
);
if (proc.exitCode !== 0) {
    console.error("\ncoverage gate: tests failed");
    process.exit(proc.exitCode ?? 1);
}
if (!existsSync(LCOV)) {
    console.error(`coverage gate: ${LCOV} was not written`);
    process.exit(1);
}

// lcov: per-file LF/LH (lines found/hit), FNF/FNH (functions found/hit)
let lf = 0, lh = 0, fnf = 0, fnh = 0;
const perFile: { file: string; lines: number }[] = [];
let file = "";
let fileLf = 0, fileLh = 0;
for (const line of readFileSync(LCOV, "utf8").split("\n")) {
    const [tag, value] = line.split(":", 2);
    const n = Number(value);
    if (tag === "SF") file = value;
    else if (tag === "LF") { lf += n; fileLf = n; }
    else if (tag === "LH") { lh += n; fileLh = n; }
    else if (tag === "FNF") fnf += n;
    else if (tag === "FNH") fnh += n;
    else if (line === "end_of_record") perFile.push({ file, lines: fileLf ? fileLh / fileLf : 1 });
}

const actual: Totals = {
    lines: lf ? lh / lf : 1,
    functions: fnf ? fnh / fnf : 1,
};

const pct = (x: number) => `${(x * 100).toFixed(2)}%`;

if (update) {
    const floor = (x: number) => Math.floor(x * 1000) / 1000;
    const next: Totals = { lines: floor(actual.lines), functions: floor(actual.functions) };
    writeFileSync(THRESHOLDS_FILE, JSON.stringify(next, null, 2) + "\n");
    console.log(`\ncoverage gate: thresholds set to lines ${pct(next.lines)}, functions ${pct(next.functions)}`);
    process.exit(0);
}

const required: Totals = JSON.parse(readFileSync(THRESHOLDS_FILE, "utf8"));
const failures: string[] = [];
for (const key of ["lines", "functions"] as const) {
    const status = actual[key] + 1e-9 >= required[key] ? "ok  " : "FAIL";
    console.log(`coverage ${status} ${key.padEnd(9)} ${pct(actual[key]).padStart(7)}  (required ${pct(required[key])})`);
    if (status === "FAIL") failures.push(key);
}

if (failures.length > 0) {
    const weakest = perFile.toSorted((a, b) => a.lines - b.lines).slice(0, 5);
    console.error(`\ncoverage gate failed (${failures.join(", ")}). Least-covered files:`);
    for (const w of weakest) console.error(`  ${pct(w.lines).padStart(7)}  ${w.file}`);
    process.exit(1);
}
