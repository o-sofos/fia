/**
 * Reactivity micro-benchmarks: the hot paths of signals, computeds, effects,
 * batching and stores. Graph shapes follow the usual reactivity-benchmark
 * families (fan-out, deep chains, diamonds, cut-off).
 */

import { defineSuite } from "../lib";

/** Sink so results aren't dead-code eliminated */
export let sink: unknown;

export default defineSuite({
    name: "reactivity",
    benches: ({ $, $e, batch, Mut }) => {
        // --- signals -----------------------------------------------------------
        const plain = $(Mut(0));
        const watched = $(Mut(0));
        $e(() => void watched.value);

        const fanSource = $(Mut(0));
        for (let i = 0; i < 1000; i++) $e(() => void fanSource.value);

        // --- computeds ---------------------------------------------------------
        const chainHead = $(Mut(0));
        let tail = $(() => chainHead.value + 1);
        for (let i = 0; i < 999; i++) {
            const prev = tail;
            tail = $(() => prev.value + 1);
        }
        const chainTail = tail;
        $e(() => void chainTail.value);

        const diamondSource = $(Mut(0));
        const branches = Array.from({ length: 100 }, (_, i) => $(() => diamondSource.value + i));
        let diamondSum = 0;
        $e(() => {
            let s = 0;
            for (const b of branches) s += b.value;
            diamondSum = s;
        });

        const cutSource = $(Mut(0));
        const parity = $(() => cutSource.value & 0); // always 0: every write is cut off
        let cutRuns = 0;
        for (let i = 0; i < 100; i++) $e(() => { parity.value; cutRuns++; });

        // --- batching ----------------------------------------------------------
        const many = Array.from({ length: 1000 }, () => $(Mut(0)));
        let batchedRuns = 0;
        $e(() => {
            for (const s of many) s.value;
            batchedRuns++;
        });

        const grid = Array.from({ length: 1000 }, () => $(Mut(0)));
        for (const s of grid) $e(() => void s.value);

        // --- stores ------------------------------------------------------------
        const store = $(Mut({ count: 0, name: "x" }));
        $e(() => void store.count);

        const list = $(Mut(Array.from({ length: 1000 }, (_, i) => ({ id: i }))));
        $e(() => void list.length);

        let tick = 0;
        return [
            { name: "signal create", fn: () => { sink = $(Mut(0)); } },
            { name: "signal read", fn: () => { sink = plain.value; } },
            { name: "signal write (no subscribers)", fn: () => { plain.value = ++tick; } },
            { name: "signal write → 1 effect", fn: () => { watched.value = ++tick; } },
            { name: "signal write → 1000 effects", fn: () => { fanSource.value = ++tick; } },
            { name: "computed chain ×1000 (write + effect)", fn: () => { chainHead.value = ++tick; } },
            { name: "diamond 1→100→1", fn: () => { diamondSource.value = ++tick; sink = diamondSum; } },
            { name: "equality cut-off → 100 effects", fn: () => { cutSource.value = ++tick; sink = cutRuns; } },
            {
                name: "batch 1000 writes → 1 effect",
                fn: () => {
                    const t = ++tick;
                    batch(() => { for (const s of many) s.value = t; });
                    sink = batchedRuns;
                },
            },
            {
                name: "batch 1000 writes → 1000 effects",
                fn: () => {
                    const t = ++tick;
                    batch(() => { for (const s of grid) s.value = t; });
                },
            },
            { name: "effect create + dispose", fn: () => { $e(() => void plain.value)(); } },
            { name: "computed create + read", fn: () => { sink = $(() => plain.value * 2).value; } },
            { name: "store property write → 1 effect", fn: () => { store.count = ++tick; } },
            { name: "store property read", fn: () => { sink = store.name; } },
            {
                name: "store array push + pop (1k items)",
                fn: () => {
                    batch(() => { list.push({ id: -1 }); });
                    batch(() => { list.pop(); });
                },
            },
        ];
    },
});
