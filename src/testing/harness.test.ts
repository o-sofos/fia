import { describe, expect, test } from "bun:test";
import { $, $e, Mut } from "../core/reactivity/reactivity";
import { button, div, li, p, ul } from "../core/elements/elements";
import { Each, Show } from "../core/control/control";
import { checkProperty, expectNoLeaks, fire, render, rng, shrinkArray, shrinkInt, trackLeaks } from "./mod";

describe("render", () => {
    test("renders into a container and disposes its bindings", () => {
        const count = $(Mut(0));
        let runs = 0;
        const view = render(() => {
            p(count);
            $e(() => {
                count.value;
                runs++;
            });
        });

        expect(view.text()).toBe("0");
        count.value = 1;
        expect(view.text()).toBe("1");
        expect(runs).toBe(2);

        view.dispose();
        count.value = 2;
        expect(runs).toBe(2);
        expect(view.container.isConnected).toBe(false);
    });

    test("get() throws with the markup when nothing matches", () => {
        const view = render(() => div({ class: "x" }));
        expect(() => view.get(".missing")).toThrow(/no element matches/);
        expect(view.get(".x").tagName).toBe("DIV");
    });
});

describe("fire", () => {
    test("click reaches delegated handlers", () => {
        let clicks = 0;
        const view = render(() => button("go", () => clicks++));
        fire.click(view.get("button"));
        fire.click(view.get("button"));
        expect(clicks).toBe(2);
    });
});

describe("leak tracking", () => {
    test("reports an effect created outside any owner", () => {
        const source = $(Mut(0));
        const leaks = trackLeaks();
        const view = render(() => p("static"));
        // Simulates an event handler creating an effect at the root
        $e(() => {
            source.value;
        });
        view.dispose();
        expect(() => leaks.expectNone()).toThrow(/1 of 1 reactive node\(s\) leaked/);
    });

    test("leak report points at the creating line", () => {
        const source = $(Mut(0));
        const leaks = trackLeaks();
        $e(() => void source.value);
        leaks.stop();
        expect(leaks.leaked()[0].stack).toContain("harness.test.ts");
    });

    test("owned effects, computeds and list items are clean after dispose", () => {
        const length = $(Mut(3));
        const on = $(Mut(true));
        expectNoLeaks(() => {
            const view = render(() => {
                const doubled = $(() => Array.from({ length: length.value }, (_, i) => i * 2));
                ul(() => Each(() => doubled.value, (n) => li(String(n))));
                Show(() => on.value, () => $e(() => void length.value));
            });
            length.value = 5;
            length.value = 2;
            on.value = false;
            on.value = true;
            view.dispose();
        });
    });

    test("nested trackers both record", () => {
        const s = $(Mut(0));
        const outer = trackLeaks();
        const inner = trackLeaks();
        const dispose = $e(() => void s.value);
        inner.stop();
        outer.stop();
        expect(inner.created).toBe(1);
        expect(outer.created).toBe(1);
        dispose();
        inner.expectNone();
        outer.expectNone();
    });
});

describe("runtime invariants", () => {
    test("assertRuntimeIdle flags an unbalanced context stack", async () => {
        const { pushExecutionContext } = await import("../core/context/context");
        const { assertRuntimeIdle } = await import("./runtime");
        pushExecutionContext(document.createElement("div"));
        expect(() => assertRuntimeIdle()).toThrow(/unbalanced push\/pop/);
        // assertRuntimeIdle drained the stack, so the afterEach check passes
    });
});

describe("fuzz", () => {
    test("rng is deterministic per seed", () => {
        const a = rng(42);
        const b = rng(42);
        const xs = Array.from({ length: 10 }, () => a.int(1000));
        const ys = Array.from({ length: 10 }, () => b.int(1000));
        expect(xs).toEqual(ys);
        expect(new Set(xs).size).toBeGreaterThan(5);
    });

    test("shrinkInt walks toward the target", () => {
        expect([...shrinkInt(10)]).toEqual([0, 5, 8, 9]);
        expect([...shrinkInt(0)]).toEqual([]);
    });

    test("a failing property shrinks to a minimal case and reports the seed", () => {
        let message = "";
        try {
            checkProperty("no element is >= 50", {
                runs: 50,
                generate: (r) => Array.from({ length: r.range(5, 40) }, () => r.int(100)),
                check: (xs) => {
                    if (xs.some((x) => x >= 50)) throw new Error("found a big one");
                },
                shrink: (xs) => shrinkArray(xs, (x) => shrinkInt(x)),
            });
        } catch (e) {
            message = (e as Error).message;
        }
        expect(message).toContain("FIA_FUZZ_SEED=");
        // Shrinks to the single smallest failing element
        expect(message).toMatch(/Minimal case[^\n]*\n\[\n 50\n\]/);
    });

    test("a holding property passes silently", () => {
        checkProperty("sorting is idempotent", {
            runs: 50,
            generate: (r) => Array.from({ length: r.int(30) }, () => r.int(10)),
            check: (xs) => {
                const once = xs.toSorted((a, b) => a - b);
                expect(once.toSorted((a, b) => a - b)).toEqual(once);
            },
        });
    });
});
