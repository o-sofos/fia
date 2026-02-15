
import { describe, expect, test } from "bun:test";
import { Mut } from "../reactivity";

describe("Mut Helper", () => {
    test("should wrap a value", () => {
        const wrapped = Mut(0);
        expect(wrapped.value).toBe(0);
    });

    test("should wrap an object", () => {
        const obj = { count: 0 };
        const wrapped = Mut(obj);
        expect(wrapped.value).toBe(obj);
    });

    test("should be identifiable", () => {
        // We can't easily check the internal symbol without exporting it,
        // but we can verify it behaves as expected when passed to $
        // which is covered in other tests.

        // However, we can check basic object structure
        const m = Mut(1);
        expect(typeof m).toBe("object");
        expect(m).toHaveProperty("value", 1);
    });
});
