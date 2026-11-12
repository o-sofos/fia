/**
 * Property test: array and object stores against plain JS models.
 *
 * Random mutations (every writing array method, index writes past the end,
 * length truncation/growth, key add/delete) are applied to a store and to a
 * plain copy. Observer effects read the store in different ways (length,
 * fixed indices, join, for-of, Object.keys, `in`, a computed). After every
 * operation each observer must have seen the model's value and run at most
 * once — no lost updates, no intermediate states.
 */

import { describe, test } from "bun:test";
import { $, $e, Mut } from "../reactivity";
import { checkProperty, shrinkArray, type Rng } from "../../../testing/mod";

type ArrayOp =
    | { t: "push"; v: number[] }
    | { t: "pop" }
    | { t: "shift" }
    | { t: "unshift"; v: number[] }
    | { t: "splice"; at: number; del: number; v: number[] }
    | { t: "sort" }
    | { t: "reverse" }
    | { t: "fill"; v: number }
    | { t: "set"; at: number; v: number }
    | { t: "setPastEnd"; gap: number; v: number }
    | { t: "length"; n: number };

type ObjOp = { t: "put"; k: string; v: number } | { t: "del"; k: string };

interface Case {
    initial: number[];
    arrayOps: ArrayOp[];
    objOps: ObjOp[];
}

const KEYS = ["a", "b", "c", "d"];

function genCase(r: Rng): Case {
    const vals = () => Array.from({ length: r.int(3) + 1 }, () => r.int(10));
    return {
        initial: Array.from({ length: r.int(6) }, () => r.int(10)),
        arrayOps: Array.from({ length: r.range(1, 30) }, (): ArrayOp =>
            r.weighted<() => ArrayOp>([
                [3, () => ({ t: "push", v: vals() })],
                [2, () => ({ t: "pop" })],
                [1, () => ({ t: "shift" })],
                [1, () => ({ t: "unshift", v: vals() })],
                [3, () => ({ t: "splice", at: r.int(8), del: r.int(4), v: r.bool() ? vals() : [] })],
                [1, () => ({ t: "sort" })],
                [1, () => ({ t: "reverse" })],
                [1, () => ({ t: "fill", v: r.int(10) })],
                [3, () => ({ t: "set", at: r.int(8), v: r.int(10) })],
                [1, () => ({ t: "setPastEnd", gap: r.int(2), v: r.int(10) })],
                [2, () => ({ t: "length", n: r.int(8) })],
            ])(),
        ),
        objOps: Array.from({ length: r.range(0, 15) }, (): ObjOp =>
            r.bool(0.6) ? { t: "put", k: r.pick(KEYS), v: r.int(5) } : { t: "del", k: r.pick(KEYS) },
        ),
    };
}

function applyArray(a: number[], op: ArrayOp): void {
    switch (op.t) {
        case "push": a.push(...op.v); break;
        case "pop": a.pop(); break;
        case "shift": a.shift(); break;
        case "unshift": a.unshift(...op.v); break;
        case "splice": a.splice(op.at, op.del, ...op.v); break;
        case "sort": a.sort((x, y) => x - y); break;
        case "reverse": a.reverse(); break;
        case "fill": a.fill(op.v); break;
        case "set": if (op.at < a.length) a[op.at] = op.v; break;
        case "setPastEnd": a[a.length + op.gap] = op.v; break;
        case "length": a.length = op.n; break;
    }
}

/** Holes (from length growth / gaps) read as undefined; normalise for comparison */
const show = (v: unknown) => JSON.stringify(v, (_, x) => (x === undefined ? "∅" : x));

interface Observer {
    name: string;
    read: () => unknown;
    expected: () => unknown;
    seen: unknown;
    runs: number;
}

function check(c: Case): void {
    // ---- arrays ---------------------------------------------------------------
    const model = c.initial.slice();
    const store = $(Mut(c.initial.slice())) as unknown as number[];
    const sum = $(() => {
        let s = 0;
        for (const x of store) s += x ?? 0;
        return s;
    });
    const observers: Observer[] = [
        { name: "length", read: () => store.length, expected: () => model.length, seen: undefined, runs: 0 },
        { name: "[0]", read: () => store[0], expected: () => model[0], seen: undefined, runs: 0 },
        { name: "[2]", read: () => store[2], expected: () => model[2], seen: undefined, runs: 0 },
        { name: "[5]", read: () => store[5], expected: () => model[5], seen: undefined, runs: 0 },
        { name: "join", read: () => store.join(","), expected: () => model.join(","), seen: undefined, runs: 0 },
        { name: "for-of", read: () => show([...store]), expected: () => show([...model]), seen: undefined, runs: 0 },
        { name: "keys", read: () => Object.keys(store).join(), expected: () => Object.keys(model).join(), seen: undefined, runs: 0 },
        { name: "sum (computed)", read: () => sum.value, expected: () => model.reduce((s, x) => s + (x ?? 0), 0), seen: undefined, runs: 0 },
    ];

    // ---- objects --------------------------------------------------------------
    const objModel: Record<string, number> = { a: 1 };
    const obj = $(Mut({ a: 1 } as Record<string, number>));
    observers.push(
        { name: "obj keys", read: () => Object.keys(obj).sort().join(), expected: () => Object.keys(objModel).sort().join(), seen: undefined, runs: 0 },
        { name: "obj 'c' in", read: () => "c" in obj, expected: () => "c" in objModel, seen: undefined, runs: 0 },
        { name: "obj entries", read: () => show(Object.entries(obj).sort()), expected: () => show(Object.entries(objModel).sort()), seen: undefined, runs: 0 },
        { name: "obj.b", read: () => obj.b, expected: () => objModel.b, seen: undefined, runs: 0 },
    );

    const disposers = observers.map((o) =>
        $e(() => {
            o.seen = o.read();
            o.runs++;
        }),
    );

    const verify = (where: string) => {
        for (const o of observers) {
            if (show(o.seen) !== show(o.expected())) {
                throw new Error(`${where}: observer ${o.name} saw ${show(o.seen)}, model has ${show(o.expected())}`);
            }
        }
    };

    verify("initial");
    const step = (where: string, mutate: () => void) => {
        const before = observers.map((o) => o.runs);
        mutate();
        observers.forEach((o, i) => {
            if (o.runs - before[i] > 1) throw new Error(`${where}: observer ${o.name} ran ${o.runs - before[i]} times for one operation`);
        });
        verify(where);
    };

    c.arrayOps.forEach((op, i) => {
        applyArray(model, op);
        step(`array op ${i} ${JSON.stringify(op)}`, () => applyArray(store, op));
    });
    c.objOps.forEach((op, i) => {
        if (op.t === "put") objModel[op.k] = op.v;
        else delete objModel[op.k];
        step(`object op ${i} ${JSON.stringify(op)}`, () => {
            if (op.t === "put") obj[op.k] = op.v;
            else delete obj[op.k];
        });
    });

    for (const d of disposers) d();
}

describe("stores (property)", () => {
    test("array and object stores match plain models", () => {
        checkProperty("stores match plain models", {
            runs: 300,
            generate: genCase,
            check,
            shrink: (c) => (function* () {
                for (const arrayOps of shrinkArray(c.arrayOps)) yield { ...c, arrayOps };
                for (const objOps of shrinkArray(c.objOps)) yield { ...c, objOps };
                for (const initial of shrinkArray(c.initial)) yield { ...c, initial };
            })(),
            show: (c) => [
                `  initial: ${JSON.stringify(c.initial)}`,
                ...c.arrayOps.map((o) => `  ${JSON.stringify(o)}`),
                ...c.objOps.map((o) => `  ${JSON.stringify(o)}`),
            ].join("\n"),
        });
    });
});
