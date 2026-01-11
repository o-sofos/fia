import { describe, it, expect } from "bun:test";
import { $, effect, batch } from "./reactivity";

describe("Reactivity System", () => {

    describe("Signals", () => {
        it("should hold and update values", () => {
            const count = $(0);
            expect(count.value).toBe(0);
            expect(count()).toBe(0);

            count.value = 5;
            expect(count.value).toBe(5);

            count(10);
            expect(count.value).toBe(10);
        });

        it("should trigger effects", () => {
            const count = $(0);
            let dummy = 0;

            effect(() => {
                dummy = count.value;
            });
            expect(dummy).toBe(0);

            count.value = 1;
            expect(dummy).toBe(1);
        });
    });

    describe("Computed", () => {
        it("should derive values", () => {
            const count = $(1);
            const doubled = $(() => count.value * 2);

            expect(doubled.value).toBe(2);
            expect(doubled()).toBe(2);

            count.value = 2;
            expect(doubled.value).toBe(4);
        });

        it("should chain computed values", () => {
            const count = $(1);
            const doubled = $(() => count.value * 2);
            const quadrupled = $(() => doubled.value * 2);

            expect(quadrupled.value).toBe(4);

            count.value = 2;
            expect(quadrupled.value).toBe(8);
        });
    });

    describe("Effects", () => {
        it("should react to multiple dependencies", () => {
            const first = $("John");
            const last = $("Doe");
            let fullName = "";

            effect(() => {
                fullName = `${first.value} ${last.value}`;
            });

            expect(fullName).toBe("John Doe");

            first.value = "Jane";
            expect(fullName).toBe("Jane Doe");

            last.value = "Smith";
            expect(fullName).toBe("Jane Smith");
        });

        it("should be resilient to conditional dependencies", () => {
            const show = $(true);
            const msg = $("Hello");
            let output = "";

            effect(() => {
                output = show.value ? msg.value : "Hidden";
            });

            expect(output).toBe("Hello");

            // Change dependency
            msg.value = "World";
            expect(output).toBe("World");

            // Switch branch - should stop tracking 'msg'? 
            // Note: The current safe/simple implementation might not garbage collect dependencies aggressively
            // but it should definitely behave correctly.
            show.value = false;
            expect(output).toBe("Hidden");

            // Changing msg should potentially NOT trigger effect if dependency tracking is dynamic
            // But let's just assert correctness of output first
            msg.value = "Ignored";
            expect(output).toBe("Hidden");
        });
    });

    describe("Batching", () => {
        it("should batch updates", () => {
            const count = $(0);
            let callCount = 0;

            effect(() => {
                // Dependency
                count.value;
                callCount++;
            });

            expect(callCount).toBe(1);

            batch(() => {
                count.value = 1;
                count.value = 2;
                count.value = 3;
            });

            // Should have run once initially + once after batch
            expect(callCount).toBe(2);
            expect(count.value).toBe(3);
        });
    });
});
