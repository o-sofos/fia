
import { describe, expect, test } from "bun:test";
import { $, $e, batch, Mut, setDevHook } from "../reactivity";

describe("Signals", () => {
    test("should hold a value", () => {
        const count = $(0);
        expect(count.value).toBe(0);
        expect(count()).toBe(0);
    });

    test("should be readonly by default for primitives", () => {
        const count = $(0);
        // Runtime check: writing to .value should throw in strict mode or just fail
        // In our implementation, we add a setter that throws if readonly
        expect(() => {
            // @ts-ignore
            count.value = 1;
        }).toThrow("Cannot update a read-only signal");
    });

    test("should be writable if Mut() is used", () => {
        const count = $(Mut(0));
        expect(count.value).toBe(0);

        count.value = 1;
        expect(count.value).toBe(1);

        count(2); // Function call syntax
        expect(count.value).toBe(2);
    });
});

describe("Computed", () => {
    test("should derive value from dependencies", () => {
        const count = $(Mut(1));
        const double = $(() => count.value * 2);

        expect(double.value).toBe(2);

        count.value = 2;
        expect(double.value).toBe(4);
    });

    test("should track dependencies dynamically", () => {
        const switchSignal = $(Mut(true));
        const a = $(Mut("A"));
        const b = $(Mut("B"));

        let runs = 0;
        const result = $(() => {
            runs++;
            return switchSignal.value ? a.value : b.value;
        });

        expect(result.value).toBe("A");
        expect(runs).toBe(1);

        // Change 'b' - should NOT trigger recompute because 'b' is not being read
        b.value = "C";
        expect(runs).toBe(1); // Still 1

        // Switch to 'b'
        switchSignal.value = false;
        expect(result.value).toBe("C");
        expect(runs).toBe(2);

        // Change 'a' - should NOT trigger recompute now
        a.value = "D";
        expect(runs).toBe(2);

        // Change 'b' - SHOULD trigger recompute
        b.value = "E";
        expect(result.value).toBe("E");
        expect(runs).toBe(3);
    });
});

describe("Effects ($e)", () => {
    test("should run immediately and on change", () => {
        const count = $(Mut(0));
        let runCount = 0;
        let lastValue = -1;

        $e(() => {
            runCount++;
            lastValue = count.value;
        });

        expect(runCount).toBe(1);
        expect(lastValue).toBe(0);

        count.value = 1;
        expect(runCount).toBe(2);
        expect(lastValue).toBe(1);
    });

    test("should clean up dependencies", () => {
        const count = $(Mut(0));
        let runCount = 0;

        const dispose = $e(() => {
            runCount++;
            // Read signal
            void count.value;
        });

        expect(runCount).toBe(1);

        count.value++;
        expect(runCount).toBe(2);

        dispose();

        count.value++;
        expect(runCount).toBe(2); // Should not run again
    });
});

describe("Computed errors", () => {
    test("readers keep their subscription through a throw and recover", () => {
        const a = $(Mut(1));
        const c = $(() => {
            if (a.value === 2) throw new Error("boom");
            return a.value;
        });
        const seen: number[] = [];
        $e(() => {
            try {
                seen.push(c.value);
            } catch {
                seen.push(-1);
            }
        });

        a.value = 2;
        a.value = 3;
        expect(seen).toEqual([1, -1, 3]);
    });

    test("the cached error is rethrown until a dependency changes", () => {
        const a = $(Mut(0));
        let computations = 0;
        const c = $(() => {
            computations++;
            if (a.value === 0) throw new Error("zero");
            return a.value;
        });

        expect(() => c.value).toThrow("zero");
        expect(() => c.peek()).toThrow("zero");
        expect(computations).toBe(1);
        a.value = 5;
        expect(c.value).toBe(5);
    });
});

describe("Dependency de-duplication", () => {
    const depCounts = (fn: () => void): number[] => {
        const nodes: { deps: readonly unknown[] }[] = [];
        const prev = setDevHook((kind, node) => {
            if (kind === "effect") nodes.push(node);
        });
        try {
            fn();
        } finally {
            setDevHook(prev);
        }
        return nodes.map((n) => n.deps.length);
    };

    test("repeated reads subscribe once", () => {
        const s = $(Mut(1));
        let total = 0;
        expect(
            depCounts(() => {
                $e(() => {
                    for (let i = 0; i < 1000; i++) total += s.value;
                });
            }),
        ).toEqual([1]);
        s.value = 2;
        expect(total).toBe(3000);
    });

    test("a nested computed reading the same source doesn't duplicate it", () => {
        const s = $(Mut(1));
        const c = $(() => s.value * 2);
        let seen = 0;
        expect(
            depCounts(() => {
                $e(() => {
                    s.value;
                    c.value; // refresh reads s as c, overwriting s's marker
                    s.value;
                    seen = c.value + s.value;
                });
            }),
        ).toEqual([2]);
        s.value = 5;
        expect(seen).toBe(15);
    });

    test("an effect with many dependencies re-runs once per batch", () => {
        const signals = Array.from({ length: 2000 }, () => $(Mut(0)));
        let runs = 0;
        $e(() => {
            for (const sig of signals) sig.value;
            runs++;
        });
        batch(() => {
            for (const sig of signals) sig.value++;
        });
        expect(runs).toBe(2);
    });
});
