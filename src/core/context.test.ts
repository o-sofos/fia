import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { describe, it, expect, beforeEach } from "bun:test";
import { pushContext, popContext, getCurrentContext, hasContext, type Context } from "./context";

GlobalRegistrator.register();

// Simple mock context implementation
class MockContext implements Context {
    public id: string;
    public children: Node[] = [];

    constructor(id: string) {
        this.id = id;
    }

    appendChild(node: Node): Node {
        this.children.push(node);
        return node;
    }
}

describe("Context System", () => {
    // Clear the stack before each test to ensure isolation
    beforeEach(() => {
        while (hasContext()) {
            popContext();
        }
    });

    it("should return document.body when stack is empty", () => {
        expect(hasContext()).toBe(false);
        expect(getCurrentContext()).toBe(document.body);
    });

    it("should push and return new context", () => {
        const ctx = new MockContext("ctx1");
        pushContext(ctx);

        expect(hasContext()).toBe(true);
        expect(getCurrentContext()).toBe(ctx);
    });

    it("should pop context and return to previous", () => {
        const ctx = new MockContext("ctx1");
        pushContext(ctx);
        expect(getCurrentContext()).toBe(ctx);

        popContext();
        expect(hasContext()).toBe(false);
        expect(getCurrentContext()).toBe(document.body);
    });

    it("should handle nested contexts correctly", () => {
        const ctx1 = new MockContext("ctx1");
        const ctx2 = new MockContext("ctx2");
        const ctx3 = new MockContext("ctx3");

        // Push 1
        pushContext(ctx1);
        expect(getCurrentContext()).toBe(ctx1);

        // Push 2
        pushContext(ctx2);
        expect(getCurrentContext()).toBe(ctx2);

        // Push 3
        pushContext(ctx3);
        expect(getCurrentContext()).toBe(ctx3);

        // Pop 3 -> 2
        popContext();
        expect(getCurrentContext()).toBe(ctx2);

        // Pop 2 -> 1
        popContext();
        expect(getCurrentContext()).toBe(ctx1);

        // Pop 1 -> Root
        popContext();
        expect(getCurrentContext()).toBe(document.body);
    });
});
