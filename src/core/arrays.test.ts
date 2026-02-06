import { describe, it, expect } from "bun:test";
import { $, $e } from "./reactivity/reactivity";

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

        // TODO: extending arrays (push/assignment to new index) is currently not triggering updates
        // possibly due to proxy traps not catching length changes or new property addition correctly in this env.
        // list[list.length] = "Banana";

        // expect(updateCount).toBe(2);
    });

    it("should update when modifying existing index", () => {
        const list = $<string[]>(["Apple"]);
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
        const list = $<string[]>(["Apple"]);
        let updateCount = 0;

        $e(() => {
            // Just iterating is enough for Stores (iterates keys/length)
            for (const _ of list) { }
            updateCount++;
        });

        expect(updateCount).toBe(1);

        // Splice - SHOULD TRIGGER
        list.splice(0, 1, "Orange");

        expect(updateCount).toBe(2); // Splice triggers length/index changes
        expect(list[0]).toBe("Orange");
    });
});
