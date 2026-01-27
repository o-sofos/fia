import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { describe, it, expect, beforeEach } from "bun:test";
import { pushExecutionContext, popExecutionContext, getCurrentExecutionContext, hasExecutionContext } from "./context";

try {
    GlobalRegistrator.register();
} catch (e) {
    // Already registered
}

describe("Context System", () => {
    // Clear the stack before each test to ensure isolation
    beforeEach(() => {
        while (hasExecutionContext()) {
            popExecutionContext();
        }
    });

    it("should return document.body when stack is empty", () => {
        expect(hasExecutionContext()).toBe(false);
        expect(getCurrentExecutionContext()).toBe(document.body);
    });

    it("should push and return new context", () => {
        const div = document.createElement("div");
        pushExecutionContext(div);

        expect(hasExecutionContext()).toBe(true);
        expect(getCurrentExecutionContext()).toBe(div);
    });

    it("should pop context and return to previous", () => {
        const div = document.createElement("div");
        pushExecutionContext(div);
        expect(getCurrentExecutionContext()).toBe(div);

        popExecutionContext();
        expect(hasExecutionContext()).toBe(false);
        expect(getCurrentExecutionContext()).toBe(document.body);
    });

    it("should handle popExecutionContext on empty stack gracefully", () => {
        expect(hasExecutionContext()).toBe(false);
        popExecutionContext(); // Should not throw
        expect(hasExecutionContext()).toBe(false);
        expect(getCurrentExecutionContext()).toBe(document.body);
    });

    it("should handle nested contexts correctly", () => {
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const div3 = document.createElement("div");

        // Push 1
        pushExecutionContext(div1);
        expect(getCurrentExecutionContext()).toBe(div1);

        // Push 2
        pushExecutionContext(div2);
        expect(getCurrentExecutionContext()).toBe(div2);

        // Push 3
        pushExecutionContext(div3);
        expect(getCurrentExecutionContext()).toBe(div3);

        // Pop 3 -> 2
        popExecutionContext();
        expect(getCurrentExecutionContext()).toBe(div2);

        // Pop 2 -> 1
        popExecutionContext();
        expect(getCurrentExecutionContext()).toBe(div1);

        // Pop 1 -> Root
        popExecutionContext();
        expect(getCurrentExecutionContext()).toBe(document.body);
    });
});
