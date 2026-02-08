
import { describe, expect, test, mock } from "bun:test";
import { $, $e } from "./reactivity";

describe("Reactivity Core", () => {
    test("Signals (Primitives)", () => {
        const count = $(0);
        expect(count.value).toBe(0);
        expect(count()).toBe(0);

        count.value++;
        expect(count.value).toBe(1);
        expect(count()).toBe(1);

        count.value = 5;
        expect(count.value).toBe(5);
    });

    test("Computed Values", () => {
        const count = $(0);
        const double = $(() => count.value * 2);

        expect(double.value).toBe(0);

        count.value = 5;
        expect(double.value).toBe(10);

        count.value++;
        expect(double.value).toBe(12);
    });

    test("Effects", () => {
        const count = $(0);
        let runCount = 0;
        let lastValue = -1;

        $e(() => {
            runCount++;
            lastValue = count.value;
        });

        // Initial run
        expect(runCount).toBe(1);
        expect(lastValue).toBe(0);

        // Update
        count.value++;
        expect(runCount).toBe(2);
        expect(lastValue).toBe(1);

        // No change -> No run
        count.value = 1;
        expect(runCount).toBe(2);
    });

    test("Nested Effects (Cleanup)", () => {
        const outer = $(0);
        const inner = $(0);
        let innerRuns = 0;

        $e(() => {
            outer.value; // Dependency
            $e(() => {
                inner.value; // Dependency
                innerRuns++;
            });
        });

        expect(innerRuns).toBe(1);

        // Trigger outer -> inner should re-run (new effect created, old disposed?)
        // Note: Fia's active effect stack handles this, but does it dispose old inner effects?
        // Let's verify behavior.
        outer.value++;
        expect(innerRuns).toBe(2);

        // Trigger inner -> inner should re-run
        // Note: Fia does NOT automatically dispose nested effects (no owner system).
        // So the old inner effect AND the new inner effect from step 2 both run.
        inner.value++;
        expect(innerRuns).toBe(4);
    });
    describe("ReactiveStore (Objects)", () => {
        test("Immutable by Default", () => {
            const state = $({ count: 0 });
            expect(state.count).toBe(0);

            // Runtime check: modifying readonly prop should succeed at runtime (proxy) 
            // but fail types. We verify runtime.
            // @ts-ignore
            state.count = 1;
            expect(state.count as number).toBe(1);
        });

        test("Mutable Opt-in", () => {
            const state = $({ count: 0 }, "count");
            state.count++;
            expect(state.count).toBe(1);
        });

        test("Deep Reactivity", () => {
            const state = $({ nested: { count: 0 } as { count: number } }, "nested");
            let runs = 0;
            $e(() => {
                runs++;
                state.nested.count; // Access triggers track
            });
            expect(runs).toBe(1);

            state.nested = { count: 1 } as any;
            expect(runs).toBe(2);
        });

        test("Array Mutation", () => {
            const state = $({ items: ["a"] }, "items");
            let length = 0;
            $e(() => {
                length = state.items.length;
            });
            expect(length).toBe(1);

            state.items.push("b");
            expect(length).toBe(2);
            expect(state.items[1]).toBe("b");
        });

        test("Recursive Immutability", () => {
            // Parent "wrapper" is mutable, but child "inner" is not explicitly mutable
            const state = $({
                wrapper: { inner: "fixed" } as { inner: string }
            }, "wrapper");

            // Valid: Replace wrapper
            // Note: TS expects ReactiveStore type, but runtime accepts plain object which gets wrapped on access.
            state.wrapper = { inner: "replaced" } as any;
            expect(state.wrapper.inner).toBe("replaced");

            // state.wrapper is a proxy.
            // state.wrapper.inner = "changed" -> works at runtime (no freeze).
            // But types forbid. Verify runtime behavior:
            // @ts-ignore
            state.wrapper.inner = "changed";
            expect(state.wrapper.inner).toBe("changed");
        });

        test("Nested Store Preservation", () => {
            const inner = $({ name: "mutable" as string }, "name");
            const outer = $({ inner }, "inner"); // "inner" reference is mutable

            // Outer sees inner as mutable because it IS the inner store
            outer.inner.name = "updated";
            expect(inner.name).toBe("updated");
            expect(outer.inner.name).toBe("updated");

            // Replace inner
            const newInner = $({ name: "new" as string });
            outer.inner = newInner;
            expect(outer.inner.name).toBe("new");
        });
    });
});