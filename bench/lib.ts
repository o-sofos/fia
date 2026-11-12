/**
 * Benchmark definitions and statistics.
 *
 * Suites receive the library module instead of importing it, so the runner can
 * load the same suite against the working tree *and* against another git ref
 * (A/B mode) in one process.
 */

import type * as Fia from "../src/core/mod";

export type FiaLib = typeof Fia;

/**
 * - `fn`: a fast operation, timed in batches (micro).
 * - `setup`/`run`/`teardown`: per-iteration state, only `run` is timed (macro).
 */
export type Bench<S = unknown> =
    | { name: string; fn: () => void }
    | { name: string; setup: () => S; run: (state: S) => void; teardown?: (state: S) => void };

export interface Suite {
    name: string;
    /** Needs a DOM (the runner registers happy-dom once). */
    dom?: boolean;
    benches(lib: FiaLib): Bench<any>[];
}

export function defineSuite(suite: Suite): Suite {
    return suite;
}

// =============================================================================
// Statistics
// =============================================================================

export interface Stats {
    /** ns per operation for each sample */
    samples: number[];
    median: number;
    mean: number;
    min: number;
    p25: number;
    p75: number;
    /** median absolute deviation, as a fraction of the median */
    mad: number;
}

export function quantile(sorted: readonly number[], q: number): number {
    if (sorted.length === 0) return NaN;
    const pos = (sorted.length - 1) * q;
    const lo = Math.floor(pos);
    const hi = Math.ceil(pos);
    return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

export function stats(samples: number[]): Stats {
    const sorted = samples.toSorted((a, b) => a - b);
    const median = quantile(sorted, 0.5);
    const deviations = sorted.map((x) => Math.abs(x - median)).sort((a, b) => a - b);
    return {
        samples,
        median,
        mean: samples.reduce((a, b) => a + b, 0) / samples.length,
        min: sorted[0],
        p25: quantile(sorted, 0.25),
        p75: quantile(sorted, 0.75),
        mad: median > 0 ? quantile(deviations, 0.5) / median : 0,
    };
}

/**
 * Two-sided Mann–Whitney U test (normal approximation with tie correction).
 * Returns the p-value that `a` and `b` come from the same distribution.
 * Robust to the skewed, outlier-heavy distributions timing data has.
 */
export function mannWhitney(a: readonly number[], b: readonly number[]): number {
    const n1 = a.length;
    const n2 = b.length;
    if (n1 < 2 || n2 < 2) return 1;
    const all = [...a.map((v) => ({ v, g: 0 })), ...b.map((v) => ({ v, g: 1 }))].sort((x, y) => x.v - y.v);

    // Average ranks for ties
    const ranks = new Array<number>(all.length);
    let tieTerm = 0;
    for (let i = 0; i < all.length; ) {
        let j = i;
        while (j + 1 < all.length && all[j + 1].v === all[i].v) j++;
        const rank = (i + j) / 2 + 1;
        for (let k = i; k <= j; k++) ranks[k] = rank;
        const t = j - i + 1;
        tieTerm += t * t * t - t;
        i = j + 1;
    }
    let r1 = 0;
    for (let i = 0; i < all.length; i++) if (all[i].g === 0) r1 += ranks[i];

    const u1 = r1 - (n1 * (n1 + 1)) / 2;
    const mu = (n1 * n2) / 2;
    const n = n1 + n2;
    const sigma = Math.sqrt(((n1 * n2) / 12) * (n + 1 - tieTerm / (n * (n - 1))));
    if (sigma === 0) return 1;
    const z = (Math.abs(u1 - mu) - 0.5) / sigma;
    return 2 * (1 - normalCdf(Math.max(0, z)));
}

/** Abramowitz–Stegun 7.1.26 */
function normalCdf(z: number): number {
    const t = 1 / (1 + 0.3275911 * (z / Math.SQRT2));
    const y =
        1 -
        ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
            t *
            Math.exp(-(z * z) / 2);
    return 0.5 * (1 + y);
}

// =============================================================================
// Timing
// =============================================================================

const now = (): number => Bun.nanoseconds();

export interface MeasureOptions {
    /** Target wall time per sample (ms) */
    sampleMs: number;
    /** Number of samples */
    samples: number;
    /** Warmup wall time (ms) */
    warmupMs: number;
}

/** A prepared bench: returns ns/op for one sample. */
export interface Sampler {
    sample(): number;
}

/**
 * Calibrate a bench: warm it up, then size the batch so one sample takes
 * ~sampleMs. Macro benches time every iteration individually.
 */
export function prepare(bench: Bench<any>, opts: MeasureOptions, iterations?: number): { sampler: Sampler; iterations: number } {
    if ("fn" in bench) {
        // A fresh function per bench so the loop's call site stays monomorphic:
        // a shared loop would see every bench's `fn` (and both A/B sides) and
        // JIT-deoptimise into a polymorphic call, skewing whoever runs second.
        const runBatch = new Function(
            "fn",
            "now",
            "return function runBatch(n) { const start = now(); for (let i = 0; i < n; i++) fn(); return now() - start; }",
        )(bench.fn, now) as (n: number) => number;
        // Warmup + calibration
        let n = 1;
        const warmupEnd = now() + opts.warmupMs * 1e6;
        let elapsed = runBatch(n);
        while (now() < warmupEnd || elapsed < 1e5) {
            if (elapsed < opts.sampleMs * 1e6 * 0.5) n *= 2;
            elapsed = runBatch(n);
        }
        const iters = iterations ?? Math.max(1, Math.round((n * opts.sampleMs * 1e6) / Math.max(elapsed, 1)));
        return { sampler: { sample: () => runBatch(iters) / iters }, iterations: iters };
    }

    const { setup, run, teardown } = bench;
    const once = (): number => {
        const state = setup();
        const start = now();
        run(state);
        const t = now() - start;
        teardown?.(state);
        return t;
    };
    const warmupEnd = now() + opts.warmupMs * 1e6;
    let cycle = now();
    once();
    cycle = now() - cycle;
    while (now() < warmupEnd) once();
    // Several iterations per sample keeps noise down for fast macros. Budget by
    // the whole setup+run+teardown cycle, not just the timed part, or a cheap
    // run with an expensive setup takes forever.
    const iters = iterations ?? Math.max(1, Math.min(1000, Math.round((opts.sampleMs * 1e6) / Math.max(cycle, 1))));
    return {
        sampler: {
            sample: () => {
                let total = 0;
                for (let i = 0; i < iters; i++) total += once();
                return total / iters;
            },
        },
        iterations: iters,
    };
}

export function gc(): void {
    Bun.gc(true);
}
