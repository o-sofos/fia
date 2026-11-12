import { describe, it, expect } from "bun:test";
import { $, $e, batch, Mut } from "./reactivity/reactivity";

describe("Array Reactivity (Store)", () => {
    it("should update when mutating the array in place (push)", () => {
        // $(array) returns a ReactiveStore (Proxy), not a Signal with .value
        const list = $<string[]>(["Apple"]);
        let updateCount = 0;

        $e(() => {
            // Explicitly track length to ensure push triggers update
            void list.length;
            // Iterate to track items
            for (const _ of list) { }
            updateCount++;
        });

        // Initial run
        expect(updateCount).toBe(1);

        // Read-only store: in-place mutation is rejected
        expect(() => (list as unknown as string[]).push("Banana")).toThrow(TypeError);
        expect(updateCount).toBe(1);
    });

    it("assignment past the end updates length readers", () => {
        const list = $(Mut(["Apple"]));
        const lengths: number[] = [];
        $e(() => {
            lengths.push(list.length);
        });

        list[list.length] = "Banana";
        list.push("Cherry");
        expect(lengths).toEqual([1, 2, 3]);
    });

    it("truncating length updates readers of removed indices", () => {
        const list = $(Mut(["a", "b", "c"]));
        const seen: (string | undefined)[] = [];
        $e(() => {
            seen.push(list[2]);
        });

        list.length = 1;
        expect(seen).toEqual(["c", undefined]);
    });

    it("array methods notify once and never expose intermediate states", () => {
        const list = $(Mut([3, 1, 2]));
        const snapshots: string[] = [];
        $e(() => {
            snapshots.push(list.join(","));
        });

        list.sort();
        list.splice(0, 2, 9);
        expect(snapshots).toEqual(["3,1,2", "1,2,3", "9,3"]);
    });

    it("an effect that pushes doesn't re-trigger itself", () => {
        const list = $(Mut([] as number[]));
        let runs = 0;
        $e(() => {
            runs++;
            list.push(runs);
        });

        expect(runs).toBe(1);
        expect([...list]).toEqual([1]);
    });

    it("should reject index assignment on immutable arrays (default)", () => {
        const list = $<string[]>(["Apple"]);

        expect(() => {
            (list as any)[0] = "Banana";
        }).toThrow(TypeError);
        expect(list[0]).toBe("Apple");
    });

    it("should update when modifying existing index", () => {
        const list = $(Mut(["Apple"]));
        let updateCount = 0;

        $e(() => {
            void list[0];
            updateCount++;
        });

        expect(updateCount).toBe(1);

        list[0] = "Banana";
        expect(updateCount).toBe(2);
    });

    it("should update when using splice (mutation)", () => {
        const list = $(Mut(["Apple"]));
        let updateCount = 0;

        $e(() => {
            // Just iterating is enough for Stores (iterates keys/length)
            for (const _ of list) { }
            updateCount++;
        });

        expect(updateCount).toBe(1);

        // Array methods are batched internally (an explicit batch also works)
        batch(() => {
            list.splice(0, 1, "Orange");
        });

        expect(updateCount).toBe(2);
        expect(list[0]).toBe("Orange");
    });
});
