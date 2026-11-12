
import { describe, expect, test } from "bun:test";
import { $, $e, batch, Mut } from "../reactivity";

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
            void state.nested.count;
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
            void list.length;
        });

        expect(count).toBe(1);
        list.pop();
        expect(count).toBe(2);
    });
});

describe("Store element identity", () => {
    test("a nested object keeps its proxy when it moves to another index", () => {
        const list = $(Mut([{ name: "a", done: false }, { name: "b", done: false }]));
        const b = list[1];
        const seen: boolean[] = [];
        $e(() => {
            seen.push(b.done);
        });

        batch(() => {
            list.reverse();
        });
        expect(list[0]).toBe(b);

        // A write through the new index must reach bindings made through the old
        // one. (Nested objects of a Mut array are writable at runtime but typed
        // readonly, hence the cast.)
        (list[0] as { done: boolean }).done = true;
        expect(seen).toEqual([false, true]);
    });
});

describe("Store key tracking", () => {
    test("Object.keys and for...in react to added and deleted keys", () => {
        const state = $(Mut({ a: 1 } as Record<string, number>));
        const keys: string[] = [];
        $e(() => {
            keys.push(Object.keys(state).join());
        });

        state.b = 2;
        delete state.a;
        expect(keys).toEqual(["a", "a,b", "b"]);
    });

    test("`in` reacts to a key appearing", () => {
        const state = $(Mut({} as Record<string, number>));
        const has: boolean[] = [];
        $e(() => {
            has.push("x" in state);
        });

        state.x = 1;
        expect(has).toEqual([false, true]);
    });
});
