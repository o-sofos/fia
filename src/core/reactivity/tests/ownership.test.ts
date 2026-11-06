import { describe, expect, test } from "bun:test";
import { $, $e, Mut, type Signal } from "../reactivity";

describe("Ownership", () => {
    test("disposing an effect disposes its nested effects", () => {
        const a = $(Mut(0));
        let innerRuns = 0;

        const dispose = $e(() => {
            $e(() => {
                a.value;
                innerRuns++;
            });
        });

        a.value++;
        expect(innerRuns).toBe(2);

        dispose();
        a.value++;
        expect(innerRuns).toBe(2);
    });

    test("nested effects are disposed before the parent re-runs", () => {
        const trigger = $(Mut(0));
        const source = $(Mut(0));
        let innerRuns = 0;

        $e(() => {
            trigger.value;
            $e(() => {
                source.value;
                innerRuns++;
            });
        });

        // Re-run the parent many times; inner effects must not accumulate
        for (let i = 0; i < 50; i++) trigger.value++;
        expect(innerRuns).toBe(51);

        source.value++;
        expect(innerRuns).toBe(52);
    });

    test("computeds created in a disposed scope stop recomputing", () => {
        const a = $(Mut(1));
        let computes = 0;

        const dispose = $e(() => {
            const c = $(() => {
                computes++;
                return a.value * 2;
            });
            $e(() => {
                c.value;
            });
        });

        a.value = 2;
        expect(computes).toBe(2);

        dispose();
        a.value = 3;
        a.value = 4;
        expect(computes).toBe(2);
    });

    test("a computed read after its scope is disposed recomputes fresh", () => {
        const a = $(Mut(1));
        let c!: Signal<number>;

        const dispose = $e(() => {
            c = $(() => a.value * 10);
        });
        dispose();

        a.value = 5;
        expect(c.value).toBe(50);
        expect(c.peek()).toBe(50);
    });

    test("effects created inside a computed are not owned by the reader", () => {
        const a = $(Mut(0));
        let innerRuns = 0;

        const c = $(() => {
            $e(() => {
                a.value;
                innerRuns++;
            });
            return 1;
        });

        const dispose = $e(() => {
            c.value;
        });
        dispose();

        a.value++;
        expect(innerRuns).toBe(2);
    });

    test("disposing twice is a no-op", () => {
        const a = $(Mut(0));
        const dispose = $e(() => {
            a.value;
        });
        dispose();
        expect(() => dispose()).not.toThrow();
    });
});
