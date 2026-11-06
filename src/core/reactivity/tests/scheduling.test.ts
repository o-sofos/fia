import { describe, expect, test } from "bun:test";
import { $, $e, batch, Mut } from "../reactivity";

describe("Scheduling", () => {
    test("computed read inside batch sees the new value", () => {
        const a = $(Mut(1));
        const double = $(() => a.value * 2);
        $e(() => {
            double.value;
        });

        let seen = 0;
        batch(() => {
            a.value = 5;
            seen = double.value;
        });
        expect(seen).toBe(10);
    });

    test("batch defers effects until the outermost batch ends", () => {
        const a = $(Mut(0));
        let runs = 0;
        $e(() => {
            a.value;
            runs++;
        });

        batch(() => {
            a.value = 1;
            batch(() => {
                a.value = 2;
            });
            expect(runs).toBe(1);
        });
        expect(runs).toBe(2);
    });

    test("effect skips re-run when a computed recomputes to the same value", () => {
        const n = $(Mut(1));
        const parity = $(() => n.value % 2);
        let runs = 0;
        $e(() => {
            parity.value;
            runs++;
        });

        n.value = 3;
        expect(runs).toBe(1);
        n.value = 4;
        expect(runs).toBe(2);
    });

    test("cut-off propagates through computed chains", () => {
        const n = $(Mut(1));
        let downstreamComputes = 0;
        const sign = $(() => Math.sign(n.value));
        const label = $(() => {
            downstreamComputes++;
            return sign.value > 0 ? "positive" : "non-positive";
        });
        $e(() => {
            label.value;
        });

        expect(downstreamComputes).toBe(1);
        n.value = 2;
        expect(downstreamComputes).toBe(1);
    });

    test("diamond dependencies run the effect once with consistent values", () => {
        const a = $(Mut(1));
        const b = $(() => a.value + 1);
        const seen: [number, number][] = [];
        $e(() => {
            seen.push([a.value, b.value]);
        });

        a.value = 10;
        expect(seen).toEqual([
            [1, 2],
            [10, 11],
        ]);
    });

    test("unobserved computed stays correct across repeated writes", () => {
        const a = $(Mut(1));
        const c1 = $(() => a.value * 10);
        const c2 = $(() => c1.value + 1);

        a.value = 2;
        a.value = 3;
        expect(c2.value).toBe(31);
        expect(c2.peek()).toBe(31);
    });

    test("a throwing effect does not block other queued effects", () => {
        const a = $(Mut(0));
        let otherRuns = 0;
        $e(() => {
            if (a.value === 1) throw new Error("boom");
        });
        $e(() => {
            a.value;
            otherRuns++;
        });

        expect(() => {
            a.value = 1;
        }).toThrow("boom");
        expect(otherRuns).toBe(2);

        // queue is not stuck: later writes still flow
        a.value = 2;
        expect(otherRuns).toBe(3);
    });

    test("a throwing computed recomputes on the next read", () => {
        const a = $(Mut(0));
        const c = $(() => {
            if (a.value === 1) throw new Error("bad");
            return a.value;
        });

        a.value = 1;
        expect(() => c.value).toThrow("bad");
        a.value = 2;
        expect(c.value).toBe(2);
    });
});
