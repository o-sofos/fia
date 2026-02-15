
import { describe, expect, test } from "bun:test";
import { $, $e, Mut } from "../reactivity";

describe("Stores (Objects)", () => {
    test("should be readonly by default", () => {
        const state = $({ count: 0 });
        expect(state.count).toBe(0);

        // Runtime check
        expect(() => {
            // @ts-ignore
            state.count++;
        }).toThrow();
    });

    test("should support selective mutability", () => {
        // "count" is mutable, "name" is immutable
        const state = $({ count: 0, name: "Fia" }, "count");

        state.count++;
        expect(state.count).toBe(1);

        expect(() => {
            // @ts-ignore
            state.name = "New Name";
        }).toThrow(); // Proxy trap returns false for readonly
    });

    test("should support full mutability with Mut() wrapper for objects", () => {
        const state = $(Mut({ count: 0, name: "Fia" }));

        state.count++;
        expect(state.count).toBe(1);

        state.name = "New Name";
        expect(state.name).toBe("New Name");
    });

    test("should support selective mutability via Mut() wrapper on specific keys", () => {
        const state = $({
            nested: {
                count: 0,
                grades: {
                    1: 0,
                    2: Mut(1), // Selective mutability
                    3: 0,
                }
            }
        });

        // Mut() wrapped property should be mutable
        expect(state.nested.grades[2]).toBe(1);
        state.nested.grades[2]++;
        expect(state.nested.grades[2]).toBe(2);

        // Regular property should be readonly
        expect(() => {
            // @ts-ignore
            state.nested.grades[1] = 5;
        }).toThrow();
        expect(state.nested.grades[1]).toBe(0);
    });

    test("should be deeply reactive", () => {
        const state = $(Mut({
            nested: Mut({
                count: 0
            })
        }));
        let runs = 0;

        $e(() => {
            runs++;
            const _ = state.nested.count;
        });

        expect(runs).toBe(1);

        state.nested.count++;
        expect(runs).toBe(2);
    });
});

describe("Stores (Arrays)", () => {
    test("should be immutable by default", () => {
        const list = $([1, 2, 3]);
        expect(list[0]).toBe(1);

        expect(() => {
            // @ts-ignore
            list.push(4);
        }).toThrow(); // Proxy trap prevents property access or apply? 
        // Actually, immutable arrays are Readonly<T[]>, so push doesn't exist on type.
        // At runtime, the proxy will block set/delete/etc.
    });

    test("should support mutable arrays via Mut()", () => {
        const list = $(Mut([1, 2, 3]));

        list.push(4);
        expect(list.length).toBe(4);
        expect(list[3]).toBe(4);

        // Trigger reactivity
        let count = 0;
        $e(() => {
            count++;
            const _ = list.length;
        });

        expect(count).toBe(1);
        list.pop();
        expect(count).toBe(2);
    });
});
