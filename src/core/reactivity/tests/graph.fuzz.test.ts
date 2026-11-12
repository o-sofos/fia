/**
 * Property test: random signal/computed/effect DAGs against an eager reference
 * model. Checks, after every step:
 *
 * - every computed equals the reference value (lazy pull is correct)
 * - effects re-run exactly when a direct dependency changed — a source that
 *   was written to a different value, or a computed whose value differs from
 *   what the effect last saw (equality cut-off through computeds)
 * - an effect re-runs at most once per step and only ever observes
 *   consistent values (glitch-free diamonds)
 * - reads inside `batch` see the batch's writes (consistent computeds)
 * - disposed effects never run again
 */

import { describe, test } from "bun:test";
import { $, $e, batch, Mut, type Signal, type WritableSignal } from "../reactivity";
import { checkProperty, shrinkArray, type Rng } from "../../../testing/mod";

type NodeDef =
    | { kind: "source"; init: number }
    | { kind: "sum"; inputs: number[]; mod: number }
    /** inputs[0] even ? inputs[1] : inputs[2] — a dynamic dependency */
    | { kind: "select"; inputs: [number, number, number] }
    /** inputs[0] > threshold ? 1 : 0 — cuts off most changes */
    | { kind: "gate"; inputs: [number]; threshold: number };

type Expr = Exclude<NodeDef, { kind: "source" }>;

type Write = { src: number; value: number };
type Op =
    | { t: "write"; w: Write }
    | { t: "batch"; writes: Write[]; readAfter?: number }
    | { t: "dispose"; effect: number }
    | { t: "peek"; node: number };

interface Case {
    nodes: NodeDef[];
    effects: Expr[];
    ops: Op[];
}

// -----------------------------------------------------------------------------
// Evaluation shared by the reference model and the real graph
// -----------------------------------------------------------------------------

function evaluate(def: Expr, read: (i: number) => number, reads: number[]): number {
    const r = (i: number): number => {
        if (!reads.includes(i)) reads.push(i);
        return read(i);
    };
    switch (def.kind) {
        case "sum": {
            let total = 0;
            for (const i of def.inputs) total += r(i);
            return total % def.mod;
        }
        case "select":
            return r(def.inputs[0]) % 2 === 0 ? r(def.inputs[1]) : r(def.inputs[2]);
        case "gate":
            return r(def.inputs[0]) > def.threshold ? 1 : 0;
    }
}

function referenceValues(nodes: NodeDef[], sources: number[]): number[] {
    const values: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
        const def = nodes[i];
        values.push(def.kind === "source" ? sources[i] : evaluate(def, (j) => values[j], []));
    }
    return values;
}

// -----------------------------------------------------------------------------
// Generation
// -----------------------------------------------------------------------------

const VALUES = 4; // small range → many equal writes and cut-offs

function genExpr(r: Rng, upTo: number): Expr {
    const any = () => r.int(upTo);
    return r.weighted<() => Expr>([
        [3, () => ({ kind: "sum", inputs: Array.from({ length: r.range(1, 3) }, any), mod: r.range(2, 5) })],
        [2, () => ({ kind: "select", inputs: [any(), any(), any()] })],
        [1, () => ({ kind: "gate", inputs: [any()], threshold: r.int(VALUES) })],
    ])();
}

function genCase(r: Rng): Case {
    const sourceCount = r.range(2, 5);
    const nodes: NodeDef[] = [];
    for (let i = 0; i < sourceCount; i++) nodes.push({ kind: "source", init: r.int(VALUES) });
    const computedCount = r.range(1, 10);
    for (let i = 0; i < computedCount; i++) nodes.push(genExpr(r, nodes.length));

    const effects = Array.from({ length: r.range(1, 6) }, () => genExpr(r, nodes.length));

    const write = (): Write => ({ src: r.int(sourceCount), value: r.int(VALUES) });
    const ops = Array.from({ length: r.range(5, 50) }, (): Op =>
        r.weighted<() => Op>([
            [6, () => ({ t: "write", w: write() })],
            [3, () => ({
                t: "batch",
                writes: Array.from({ length: r.range(1, 5) }, write),
                readAfter: r.bool() ? r.int(nodes.length) : undefined,
            })],
            [1, () => ({ t: "dispose", effect: r.int(effects.length) })],
            [1, () => ({ t: "peek", node: r.int(nodes.length) })],
        ])(),
    );
    return { nodes, effects, ops };
}

function* shrinkOp(op: Op): Generator<Op> {
    if (op.t !== "batch") return;
    if (op.readAfter !== undefined) yield { ...op, readAfter: undefined };
    if (op.writes.length === 1) yield { t: "write", w: op.writes[0] };
    for (const writes of shrinkArray(op.writes)) {
        if (writes.length > 0) yield { ...op, writes };
    }
}

function show(c: Case): string {
    const fmt = (d: NodeDef) =>
        d.kind === "source" ? `source(${d.init})`
        : d.kind === "sum" ? `sum(${d.inputs.join(",")}) % ${d.mod}`
        : d.kind === "select" ? `n${d.inputs[0]} even ? n${d.inputs[1]} : n${d.inputs[2]}`
        : `n${d.inputs[0]} > ${d.threshold}`;
    const w = (x: Write) => `n${x.src}=${x.value}`;
    return [
        ...c.nodes.map((d, i) => `  n${i} = ${fmt(d)}`),
        ...c.effects.map((d, i) => `  e${i} reads ${fmt(d)}`),
        "  ops:",
        ...c.ops.map((op) =>
            op.t === "write" ? `    write ${w(op.w)}`
            : op.t === "batch" ? `    batch [${op.writes.map(w).join(", ")}]${op.readAfter !== undefined ? ` then read n${op.readAfter}` : ""}`
            : op.t === "dispose" ? `    dispose e${op.effect}`
            : `    peek n${op.node}`,
        ),
    ].join("\n");
}

// -----------------------------------------------------------------------------
// Check
// -----------------------------------------------------------------------------

function fail(msg: string): never {
    throw new Error(msg);
}

function check(c: Case): void {
    const sourceValues = c.nodes.map((d) => (d.kind === "source" ? d.init : 0));
    let ref = referenceValues(c.nodes, sourceValues);
    /** What an effect must observe while running */
    let currentRef = ref;

    // Real graph
    const real: Signal<number>[] = [];
    for (const def of c.nodes) {
        if (def.kind === "source") real.push($(Mut(def.init)) as WritableSignal<number>);
        else real.push($(() => evaluate(def, (j) => real[j].value, [])));
    }

    interface EffectState {
        runs: number;
        dispose: () => void;
        disposed: boolean;
        /** node index → value the effect saw on its last run */
        seen: Map<number, number>;
        /** values observed on the last run must be mutually consistent */
        lastRunConsistentWith?: number[];
    }
    const effects: EffectState[] = c.effects.map((def, k) => {
        const state: EffectState = { runs: 0, dispose: () => {}, disposed: false, seen: new Map() };
        state.dispose = $e(() => {
            state.runs++;
            const seen = new Map<number, number>();
            evaluate(def, (j) => {
                const v = real[j].value;
                seen.set(j, v);
                return v;
            }, []);
            state.seen = seen;
            // Glitch check: everything this run read must match the
            // reference for the *current* source state
            for (const [j, v] of seen) {
                if (v !== currentRef[j]) {
                    fail(`e${k} observed n${j}=${v} but the consistent value is ${currentRef[j]} (glitch)`);
                }
            }
        });
        return state;
    });

    const isSource = (j: number) => c.nodes[j].kind === "source";

    for (let step = 0; step < c.ops.length; step++) {
        const op = c.ops[step];
        const where = `step ${step} (${op.t})`;

        const before = effects.map((e) => ({ runs: e.runs, seen: new Map(e.seen) }));
        const touched = new Set<number>();
        const applyRef = (w: Write) => {
            if (sourceValues[w.src] !== w.value) touched.add(w.src);
            sourceValues[w.src] = w.value;
        };

        if (op.t === "write") {
            applyRef(op.w);
            ref = currentRef = referenceValues(c.nodes, sourceValues);
            (real[op.w.src] as WritableSignal<number>).value = op.w.value;
        } else if (op.t === "batch") {
            for (const w of op.writes) applyRef(w);
            ref = currentRef = referenceValues(c.nodes, sourceValues);
            batch(() => {
                for (const w of op.writes) (real[w.src] as WritableSignal<number>).value = w.value;
                if (op.readAfter !== undefined) {
                    const got = real[op.readAfter].peek();
                    if (got !== ref[op.readAfter]) {
                        fail(`${where}: n${op.readAfter} read inside batch = ${got}, expected ${ref[op.readAfter]}`);
                    }
                }
                // No effect may run before the batch closes
                for (let k = 0; k < effects.length; k++) {
                    if (effects[k].runs !== before[k].runs) fail(`${where}: e${k} ran inside the batch`);
                }
            });
        } else if (op.t === "dispose") {
            effects[op.effect].dispose();
            effects[op.effect].disposed = true;
        } else {
            const got = real[op.node].peek();
            if (got !== ref[op.node]) fail(`${where}: peek n${op.node} = ${got}, expected ${ref[op.node]}`);
        }

        for (let k = 0; k < effects.length; k++) {
            const e = effects[k];
            const delta = e.runs - before[k].runs;
            if (e.disposed) {
                if (delta !== 0) fail(`${where}: disposed e${k} ran ${delta} time(s)`);
                continue;
            }
            let shouldRun = false;
            for (const [j, v] of before[k].seen) {
                if (isSource(j) ? touched.has(j) : ref[j] !== v) {
                    shouldRun = true;
                    break;
                }
            }
            if (delta !== (shouldRun ? 1 : 0)) {
                fail(`${where}: e${k} ran ${delta} time(s), expected ${shouldRun ? 1 : 0} (deps it read: ${[...before[k].seen.keys()].map((j) => `n${j}`).join(", ")})`);
            }
        }
    }

    // Final sweep: every lazily-held computed is correct
    for (let j = 0; j < c.nodes.length; j++) {
        const got = real[j].peek();
        if (got !== ref[j]) fail(`final: n${j} = ${got}, expected ${ref[j]}`);
    }

    for (const e of effects) e.dispose();
}

describe("reactive graph (property)", () => {
    test("matches the eager reference model", () => {
        checkProperty("reactive graph matches reference", {
            runs: 300,
            generate: genCase,
            check,
            shrink: (c) => (function* () {
                for (const ops of shrinkArray(c.ops, shrinkOp)) yield { ...c, ops };
            })(),
            show,
        });
    });
});
