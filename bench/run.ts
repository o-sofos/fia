/**
 * Fia benchmark runner.
 *
 *   bun run bench                         run all suites
 *   bun run bench -f diamond              only benches matching /diamond/i
 *   bun run bench --suite reactivity      only one suite
 *   bun run bench --quick                 fewer/shorter samples (CI smoke)
 *   bun run bench --save                  write bench/.results/baseline.json
 *   bun run bench --compare               compare against the saved baseline
 *   bun run bench --against main          A/B against a git ref, interleaved in-process
 *   bun run bench --against HEAD~1 --fail-on-regression --threshold 5
 *   bun run bench --json out.json         write results as JSON
 *
 * A/B mode checks the ref out into a temporary git worktree, imports its
 * src/core/mod.ts next to the working tree's, calibrates once and alternates
 * samples between the two, so machine drift hits both sides equally. A change
 * is only called faster/slower when the medians differ by more than
 * --threshold percent AND a Mann–Whitney U test gives p < 0.01.
 */

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { cpus, tmpdir } from "os";
import { join, resolve } from "path";
import { gc, mannWhitney, prepare, stats, type Bench, type FiaLib, type MeasureOptions, type Stats, type Suite } from "./lib";

async function loadSuites(benchDir: string): Promise<Suite[]> {
    return Promise.all(SUITE_FILES.map(async (f) => (await import(join(benchDir, "suites", f))).default as Suite));
}
const SUITE_FILES = ["reactivity.bench.ts", "dom.bench.ts"];
const ROOT = resolve(import.meta.dir, "..");
const RESULTS_DIR = join(ROOT, "bench/.results");
const DEFAULT_BASELINE = join(RESULTS_DIR, "baseline.json");

// =============================================================================
// CLI
// =============================================================================

interface Args {
    filter?: RegExp;
    suite?: string;
    quick: boolean;
    save?: string;
    compare?: string;
    against?: string;
    json?: string;
    threshold: number;
    failOnRegression: boolean;
}

function parseArgs(argv: string[]): Args {
    const args: Args = { quick: false, threshold: 5, failOnRegression: false };
    const optionalPath = (i: number, fallback: string): [string, number] =>
        argv[i + 1] && !argv[i + 1].startsWith("-") ? [argv[i + 1], i + 1] : [fallback, i];
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        switch (a) {
            case "-f":
            case "--filter":
                args.filter = new RegExp(argv[++i], "i");
                break;
            case "--suite":
                args.suite = argv[++i];
                break;
            case "--quick":
                args.quick = true;
                break;
            case "--save":
                [args.save, i] = optionalPath(i, DEFAULT_BASELINE);
                break;
            case "--compare":
                [args.compare, i] = optionalPath(i, DEFAULT_BASELINE);
                break;
            case "--against":
                args.against = argv[++i];
                break;
            case "--json":
                args.json = argv[++i];
                break;
            case "--threshold":
                args.threshold = Number(argv[++i]);
                break;
            case "--fail-on-regression":
                args.failOnRegression = true;
                break;
            case "-h":
            case "--help":
                console.log(readFileSync(import.meta.path, "utf8").split("*/")[0]);
                process.exit(0);
            default:
                console.error(`unknown argument: ${a}`);
                process.exit(2);
        }
    }
    return args;
}

// =============================================================================
// Loading libraries
// =============================================================================

function git(...cmd: string[]): string {
    const p = Bun.spawnSync(["git", ...cmd], { cwd: ROOT, stderr: "pipe" });
    if (p.exitCode !== 0) throw new Error(`git ${cmd.join(" ")} failed: ${p.stderr.toString().trim()}`);
    return p.stdout.toString().trim();
}

async function loadRef(ref: string): Promise<{ lib: FiaLib; suites: Suite[]; sha: string; cleanup: () => void }> {
    const sha = git("rev-parse", "--verify", `${ref}^{commit}`);
    const dir = join(tmpdir(), `fia-bench-${sha.slice(0, 12)}`);
    if (!existsSync(join(dir, "src/core/mod.ts"))) {
        git("worktree", "add", "--detach", "--force", dir, sha);
    }
    const lib = (await import(join(dir, "src/core/mod.ts"))) as FiaLib;
    // The base side runs a *copy* of the working tree's suites: same source,
    // separate module, so neither side's JIT feedback pollutes the other's.
    const copy = join(dir, ".bench-suites");
    cpSync(join(ROOT, "bench"), copy, { recursive: true, filter: (src) => !src.includes(".results") });
    const suites = await loadSuites(copy);
    return {
        lib,
        suites,
        sha,
        cleanup: () => {
            try {
                git("worktree", "remove", "--force", dir);
            } catch {
                // Leave it; next run reuses it
            }
        },
    };
}

// =============================================================================
// Running
// =============================================================================

interface Result {
    id: string;
    stats: Stats;
    iterations: number;
    base?: Stats;
}

function benchesOf(suite: Suite, lib: FiaLib, args: Args): Bench<any>[] {
    return suite.benches(lib).filter((b) => !args.filter || args.filter.test(`${suite.name}/${b.name}`));
}

function options(suite: Suite, quick: boolean): MeasureOptions {
    const macro = suite.dom === true;
    if (quick) return { samples: macro ? 6 : 10, sampleMs: macro ? 20 : 10, warmupMs: macro ? 50 : 30 };
    return { samples: macro ? 20 : 30, sampleMs: macro ? 40 : 20, warmupMs: macro ? 250 : 150 };
}

function runSingle(suites: Suite[], lib: FiaLib, args: Args, onResult: (r: Result) => void): void {
    for (const suite of suites) {
        const opts = options(suite, args.quick);
        for (const bench of benchesOf(suite, lib, args)) {
            gc();
            const { sampler, iterations } = prepare(bench, opts);
            const samples: number[] = [];
            for (let i = 0; i < opts.samples; i++) samples.push(sampler.sample());
            onResult({ id: `${suite.name}/${bench.name}`, stats: stats(samples), iterations });
        }
    }
}

function runAB(suites: Suite[], baseSuites: Suite[], current: FiaLib, base: FiaLib, args: Args, onResult: (r: Result) => void): void {
    for (const suite of suites) {
        const opts = options(suite, args.quick);
        const curBenches = benchesOf(suite, current, args);
        const baseSuite = baseSuites.find((s) => s.name === suite.name)!;
        let baseBenches: Bench<any>[];
        try {
            baseBenches = benchesOf(baseSuite, base, args);
        } catch (e) {
            console.warn(`  (suite ${suite.name} doesn't run against the base ref: ${(e as Error).message})`);
            continue;
        }
        for (const bench of curBenches) {
            const baseBench = baseBenches.find((b) => b.name === bench.name);
            if (!baseBench) continue;
            gc();
            const a = prepare(bench, opts);
            const b = prepare(baseBench, opts, a.iterations);
            const curSamples: number[] = [];
            const baseSamples: number[] = [];
            for (let i = 0; i < opts.samples; i++) {
                // Alternate who goes first to cancel ordering effects
                if (i % 2 === 0) {
                    curSamples.push(a.sampler.sample());
                    baseSamples.push(b.sampler.sample());
                } else {
                    baseSamples.push(b.sampler.sample());
                    curSamples.push(a.sampler.sample());
                }
            }
            onResult({ id: `${suite.name}/${bench.name}`, stats: stats(curSamples), base: stats(baseSamples), iterations: a.iterations });
        }
    }
}

// =============================================================================
// Reporting
// =============================================================================

function fmtTime(ns: number): string {
    if (ns < 1e3) return `${ns.toFixed(1)} ns`;
    if (ns < 1e6) return `${(ns / 1e3).toFixed(2)} µs`;
    if (ns < 1e9) return `${(ns / 1e6).toFixed(2)} ms`;
    return `${(ns / 1e9).toFixed(2)} s`;
}

type Verdict = "faster" | "slower" | "same" | "";

function verdict(r: Result, threshold: number): { verdict: Verdict; delta: number; p: number } {
    if (!r.base) return { verdict: "", delta: 0, p: 1 };
    const delta = r.stats.median / r.base.median - 1;
    const p = mannWhitney(r.stats.samples, r.base.samples);
    // Sub-nanosecond differences are code-alignment/JIT noise, not regressions
    const absNs = Math.abs(r.stats.median - r.base.median);
    if (p >= 0.01 || Math.abs(delta) * 100 < threshold || absNs < 1) return { verdict: "same", delta, p };
    return { verdict: delta < 0 ? "faster" : "slower", delta, p };
}

const color = process.stdout.isTTY
    ? { red: (s: string) => `\x1b[31m${s}\x1b[0m`, green: (s: string) => `\x1b[32m${s}\x1b[0m`, dim: (s: string) => `\x1b[2m${s}\x1b[0m` }
    : { red: (s: string) => s, green: (s: string) => s, dim: (s: string) => s };

function printRow(r: Result, args: Args): void {
    const name = r.id.padEnd(48);
    const time = fmtTime(r.stats.median).padStart(10);
    const noise = `±${(r.stats.mad * 100).toFixed(1)}%`.padStart(7);
    const ops = `${Math.round(1e9 / r.stats.median).toLocaleString("en-US")}/s`.padStart(14);
    let line = `${name} ${time} ${color.dim(noise)} ${color.dim(ops)}`;
    if (r.base) {
        const v = verdict(r, args.threshold);
        const pct = `${v.delta >= 0 ? "+" : ""}${(v.delta * 100).toFixed(1)}%`.padStart(8);
        const label = v.verdict === "faster" ? color.green(`${pct} faster`)
            : v.verdict === "slower" ? color.red(`${pct} SLOWER`)
            : color.dim(`${pct} ~`);
        line += `   base ${fmtTime(r.base.median).padStart(10)} ${label}`;
    }
    console.log(line);
}

interface SavedResults {
    meta: { date: string; sha: string; dirty: boolean; bun: string; cpu: string; quick: boolean };
    results: Record<string, { median: number; mad: number; iterations: number; samples: number[] }>;
}

// =============================================================================
// Main
// =============================================================================

async function main(): Promise<void> {
    const args = parseArgs(process.argv.slice(2));
    const all = await loadSuites(import.meta.dir);
    const suites = all.filter((s) => !args.suite || s.name === args.suite);
    if (suites.length === 0) {
        console.error(`no suite named "${args.suite}" (have: ${all.map((s) => s.name).join(", ")})`);
        process.exit(2);
    }
    if (suites.some((s) => s.dom)) {
        const { GlobalRegistrator } = await import("@happy-dom/global-registrator");
        GlobalRegistrator.register();
    }

    const current = (await import(join(ROOT, "src/core/mod.ts"))) as FiaLib;
    const sha = git("rev-parse", "--short", "HEAD");
    const dirty = git("status", "--porcelain", "--", "src/core") !== "";

    console.log(color.dim(`fia bench · ${sha}${dirty ? "+dirty" : ""} · bun ${Bun.version} · ${cpus()[0]?.model ?? "unknown cpu"}${args.quick ? " · quick" : ""}`));

    const results: Result[] = [];
    const onResult = (r: Result) => {
        results.push(r);
        printRow(r, args);
    };

    if (args.against) {
        const ref = await loadRef(args.against);
        console.log(color.dim(`A/B against ${args.against} (${ref.sha.slice(0, 7)}), threshold ${args.threshold}%\n`));
        try {
            runAB(suites, ref.suites, current, ref.lib, args, onResult);
        } finally {
            ref.cleanup();
        }
    } else {
        let saved: SavedResults | undefined;
        if (args.compare) {
            if (!existsSync(args.compare)) {
                console.error(`no baseline at ${args.compare} — create one with --save`);
                process.exit(2);
            }
            saved = JSON.parse(readFileSync(args.compare, "utf8"));
            console.log(color.dim(`comparing against ${args.compare} (${saved!.meta.sha}, ${saved!.meta.date})\n`));
        } else {
            console.log();
        }
        runSingle(suites, current, args, (r) => {
            const b = saved?.results[r.id];
            if (b) r.base = stats(b.samples);
            onResult(r);
        });
    }

    if (args.save || args.json) {
        const out: SavedResults = {
            meta: { date: new Date().toISOString(), sha, dirty, bun: Bun.version, cpu: cpus()[0]?.model ?? "", quick: args.quick },
            results: Object.fromEntries(
                results.map((r) => [r.id, { median: r.stats.median, mad: r.stats.mad, iterations: r.iterations, samples: r.stats.samples }]),
            ),
        };
        for (const file of [args.save, args.json]) {
            if (!file) continue;
            mkdirSync(resolve(file, ".."), { recursive: true });
            writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
            console.log(color.dim(`\nwrote ${file}`));
        }
    }

    const compared = results.filter((r) => r.base);
    if (compared.length > 0) {
        const vs = compared.map((r) => verdict(r, args.threshold));
        const slower = compared.filter((_, i) => vs[i].verdict === "slower");
        const faster = vs.filter((v) => v.verdict === "faster").length;
        // Geometric mean of ratios: one number for "overall"
        const geo = Math.exp(vs.reduce((s, v) => s + Math.log(1 + v.delta), 0) / vs.length) - 1;
        console.log(
            `\n${compared.length} compared · ${faster} faster · ${slower.length} slower · overall ${geo >= 0 ? "+" : ""}${(geo * 100).toFixed(1)}% (geomean)`,
        );
        if (slower.length > 0 && args.failOnRegression) {
            console.error(color.red(`\nregressions beyond ${args.threshold}%:\n  ${slower.map((r) => r.id).join("\n  ")}`));
            process.exit(1);
        }
    }
}

await main();
