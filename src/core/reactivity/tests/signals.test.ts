
import { describe, expect, test, mock } from "bun:test";
import { $, $e, Mut } from "../reactivity";

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
            const _ = count.value;
        });

        expect(runCount).toBe(1);

        count.value++;
        expect(runCount).toBe(2);

        dispose();

        count.value++;
        expect(runCount).toBe(2); // Should not run again
    });
});
