import { describe, it, expect } from "bun:test";
import { $, effect } from "./reactivity";

describe("Array Reactivity", () => {
    it("should NOT update when mutating the array in place (push)", () => {
        const list = $<("Apple" | "Banana")[]>(["Apple"]);
        let updateCount = 0;

        effect(() => {
            // Read value to track dependency
            void list.value;
            updateCount++;
        });

        // Initial run
        expect(updateCount).toBe(1);

        // Mutation - SHOULD NOT TRIGGER
        list.value.push("Apple");
        expect(updateCount).toBe(1); // Still 1
        expect(list.value).toContain("Banana"); // Value changed reference did not
    });

    it("should update when replacing the array (immutable update)", () => {
        const list = $<("Apple" | "Banana")[]>(["Apple"]);
        let updateCount = 0;

        effect(() => {
            void list.value;
            updateCount++;
        });

        expect(updateCount).toBe(1);

        // Immutable Update - SHOULD TRIGGER
        list.value = [...list.value, "Banana"];
        expect(updateCount).toBe(2);
        expect(list.value).toEqual(["Apple", "Banana"]);
    });
});
