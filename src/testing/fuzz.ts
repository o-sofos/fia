/**
 * Minimal property-based testing: seeded generation, replayable failures and
 * greedy shrinking. No dependencies.
 *
 * Environment knobs (all optional):
 *   FIA_FUZZ_SEED  base seed (default: fixed, so plain `bun test` is deterministic)
 *   FIA_FUZZ_RUNS  cases per property (default: the property's own `runs`)
 *   FIA_FUZZ_SCALE multiplier on `runs` (CI deep-fuzz uses e.g. 20)
 *
 * A failure reports the case seed; `FIA_FUZZ_SEED=<seed> FIA_FUZZ_RUNS=1`
 * replays exactly that case.
 */

import { resetDom } from "./runtime";

// =============================================================================
// PRNG
// =============================================================================

export interface Rng {
    readonly seed: number;
    /** Float in [0, 1) */
    next(): number;
    /** Integer in [0, n) */
    int(n: number): number;
    /** Integer in [min, max] */
    range(min: number, max: number): number;
    bool(probability?: number): boolean;
    pick<T>(items: readonly T[]): T;
    /** Pick by relative weight: `weighted([[3, "a"], [1, "b"]])` */
    weighted<T>(choices: readonly (readonly [number, T])[]): T;
    /** Fisher–Yates copy */
    shuffle<T>(items: readonly T[]): T[];
    /** A random subset (order preserved) */
    subset<T>(items: readonly T[], probability?: number): T[];
}

/** mulberry32 — fast, decent distribution, 32-bit state. */
export function rng(seed: number): Rng {
    let state = seed >>> 0;
    const next = (): number => {
        state = (state + 0x6d2b79f5) >>> 0;
        let t = state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const int = (n: number): number => Math.floor(next() * n);
    const r: Rng = {
        seed,
        next,
        int,
        range: (min, max) => min + int(max - min + 1),
        bool: (p = 0.5) => next() < p,
        pick: (items) => {
            if (items.length === 0) throw new Error("rng.pick: empty array");
            return items[int(items.length)];
        },
        weighted: (choices) => {
            let total = 0;
            for (const [w] of choices) total += w;
            let roll = next() * total;
            for (const [w, v] of choices) {
                roll -= w;
                if (roll < 0) return v;
            }
            return choices[choices.length - 1][1];
        },
        shuffle: (items) => {
            const out = items.slice();
            for (let i = out.length - 1; i > 0; i--) {
                const j = int(i + 1);
                [out[i], out[j]] = [out[j], out[i]];
            }
            return out;
        },
        subset: (items, p = 0.5) => items.filter(() => next() < p),
    };
    return r;
}

// =============================================================================
// SHRINKING
// =============================================================================

/**
 * Smaller variants of an array: big chunks removed first (so a 200-op case
 * collapses fast), then single elements, then per-element shrinks.
 */
export function* shrinkArray<T>(items: readonly T[], shrinkItem?: (item: T) => Iterable<T>): Generator<T[]> {
    const n = items.length;
    for (let size = n >> 1; size >= 1; size >>= 1) {
        for (let start = 0; start + size <= n; start += size) {
            yield [...items.slice(0, start), ...items.slice(start + size)];
        }
    }
    if (n > 0 && n >> 1 === 0) yield [];
    if (shrinkItem) {
        for (let i = 0; i < n; i++) {
            for (const smaller of shrinkItem(items[i])) {
                const copy = items.slice();
                copy[i] = smaller;
                yield copy;
            }
        }
    }
}

/** Candidate smaller integers, closest-to-zero first. */
export function* shrinkInt(n: number, toward = 0): Generator<number> {
    if (n === toward) return;
    yield toward;
    let diff = Math.trunc((n - toward) / 2);
    while (diff !== 0) {
        yield n - diff;
        diff = Math.trunc(diff / 2);
    }
}

// =============================================================================
// RUNNER
// =============================================================================

export interface PropertySpec<C> {
    /** Build a case from a seeded generator. */
    generate(rng: Rng): C;
    /** Throw (e.g. via `expect`) if the case violates the property. */
    check(c: C): void;
    /** Smaller variants of a failing case, tried greedily. */
    shrink?(c: C): Iterable<C>;
    /** Pretty-print a case for the failure message. */
    show?(c: C): string;
    /** Cases to run (scaled by FIA_FUZZ_SCALE, overridden by FIA_FUZZ_RUNS). */
    runs?: number;
    /** Base seed (overridden by FIA_FUZZ_SEED). */
    seed?: number;
    /** Run before every attempt, including shrink attempts. Default: `resetDom`. */
    reset?(): void;
    /** Max shrink attempts. */
    shrinkBudget?: number;
}

const DEFAULT_SEED = 0xf1a;

function envInt(name: string): number | undefined {
    const raw = typeof process !== "undefined" ? process.env[name] : undefined;
    if (raw === undefined || raw === "") return undefined;
    const n = Number(raw);
    if (!Number.isFinite(n)) throw new Error(`${name} must be a number, got "${raw}"`);
    return n;
}

function attempt<C>(spec: PropertySpec<C>, c: C): unknown {
    (spec.reset ?? resetDom)();
    try {
        spec.check(c);
        return undefined;
    } catch (e) {
        return e ?? new Error("check threw a falsy value");
    }
}

function describeError(e: unknown): string {
    if (e instanceof Error) return e.message;
    return String(e);
}

/**
 * Check a property over many generated cases. On failure the case is shrunk
 * and an error is thrown carrying the replay seed and the minimal case.
 */
export function checkProperty<C>(name: string, spec: PropertySpec<C>): void {
    const baseSeed = envInt("FIA_FUZZ_SEED") ?? spec.seed ?? DEFAULT_SEED;
    const scale = envInt("FIA_FUZZ_SCALE") ?? 1;
    const runs = envInt("FIA_FUZZ_RUNS") ?? Math.max(1, Math.round((spec.runs ?? 100) * scale));
    const show = spec.show ?? ((c: C) => JSON.stringify(c, null, 1));

    for (let i = 0; i < runs; i++) {
        const caseSeed = (baseSeed + i) >>> 0;
        const original = spec.generate(rng(caseSeed));
        const firstError = attempt(spec, original);
        if (firstError === undefined) continue;

        // Greedy shrink: take the first smaller case that still fails, repeat.
        let minimal = original;
        let minimalError = firstError;
        let steps = 0;
        let budget = spec.shrinkBudget ?? 2000;
        if (spec.shrink) {
            let improved = true;
            while (improved && budget > 0) {
                improved = false;
                for (const candidate of spec.shrink(minimal)) {
                    if (--budget < 0) break;
                    const err = attempt(spec, candidate);
                    if (err !== undefined) {
                        minimal = candidate;
                        minimalError = err;
                        steps++;
                        improved = true;
                        break;
                    }
                }
            }
        }
        (spec.reset ?? resetDom)();

        const error = new Error(
            [
                `[fia fuzz] property "${name}" failed on case ${i + 1}/${runs} (seed ${caseSeed}).`,
                `Replay: FIA_FUZZ_SEED=${caseSeed} FIA_FUZZ_RUNS=1 bun test -t ${JSON.stringify(name)}`,
                ``,
                `Minimal case (${steps} shrink step${steps === 1 ? "" : "s"}):`,
                show(minimal),
                ``,
                `Failure: ${describeError(minimalError)}`,
            ].join("\n"),
        );
        if (minimalError instanceof Error && minimalError.stack) {
            error.stack = `${error.message}\n\nOriginal stack:\n${minimalError.stack}`;
        }
        throw error;
    }
}
