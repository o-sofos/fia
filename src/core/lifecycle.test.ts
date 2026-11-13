import { describe, expect, test } from "bun:test";
import { $, $e, Mut, onCleanup, root, untrack } from "./reactivity/reactivity";
import { div, button, p } from "./elements/elements";
import { Show } from "./control/control";
import { mount } from "./mount";
import { trackLeaks } from "../testing/mod";

const microtask = () => new Promise<void>((r) => queueMicrotask(r));

describe("root", () => {
    test("disposes everything created inside it", () => {
        const s = $(Mut(0));
        let runs = 0;
        const cleanups: string[] = [];
        const dispose = root((d) => {
            $e(() => {
                s.value;
                runs++;
            });
            onCleanup(() => cleanups.push("root"));
            return d;
        });
        s.value++;
        expect(runs).toBe(2);
        dispose();
        s.value++;
        expect(runs).toBe(2);
        expect(cleanups).toEqual(["root"]);
    });

    test("is not disposed by an enclosing effect", () => {
        const trigger = $(Mut(0));
        const s = $(Mut(0));
        let innerRuns = 0;
        $e(() => {
            trigger.value;
            if (innerRuns === 0) {
                root(() => {
                    $e(() => {
                        s.value;
                        innerRuns++;
                    });
                });
            }
        });
        trigger.value++; // re-runs the outer effect
        s.value++;
        expect(innerRuns).toBe(2);
    });

    test("doesn't track reads", () => {
        const s = $(Mut(0));
        let outer = 0;
        $e(() => {
            outer++;
            root(() => s.value);
        });
        s.value++;
        expect(outer).toBe(1);
    });
});

describe("onCleanup", () => {
    test("runs before an effect re-runs and when it's disposed", () => {
        const s = $(Mut(0));
        const log: string[] = [];
        const dispose = $e(() => {
            const v = s.value;
            log.push(`run ${v}`);
            onCleanup(() => log.push(`clean ${v}`));
        });
        s.value = 1;
        dispose();
        expect(log).toEqual(["run 0", "clean 0", "run 1", "clean 1"]);
    });

    test("runs when a Show branch is swapped out", () => {
        const on = $(Mut(true));
        const log: string[] = [];
        root(() =>
            div(() =>
                Show(() => on.value, () => {
                    onCleanup(() => log.push("branch gone"));
                    p("x");
                }),
            ),
        );
        on.value = false;
        expect(log).toEqual(["branch gone"]);
    });

    test("is a no-op outside a scope", () => {
        expect(() => onCleanup(() => {})).not.toThrow();
    });
});

describe("untrack", () => {
    test("reads inside don't become dependencies", () => {
        const a = $(Mut(0));
        const b = $(Mut(0));
        let runs = 0;
        $e(() => {
            a.value;
            untrack(() => b.value);
            runs++;
        });
        b.value++;
        expect(runs).toBe(1);
        a.value++;
        expect(runs).toBe(2);
    });
});

describe("mount", () => {
    test("returns an unmount that disposes the app and removes it", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const count = $(Mut(0));
        let runs = 0;

        const leaks = trackLeaks();
        const unmount = mount(
            () =>
                div(() => {
                    p(count);
                    $e(() => {
                        count.value;
                        runs++;
                    });
                }),
            host,
        );
        expect(host.textContent).toBe("0");
        count.value = 1;
        expect(host.textContent).toBe("1");

        unmount();
        unmount(); // idempotent
        count.value = 2;
        expect(runs).toBe(2);
        expect(host.childNodes.length).toBe(0);
        leaks.expectNone();
    });

    test("accepts a selector and throws for a missing target", () => {
        const host = document.createElement("section");
        host.id = "app";
        document.body.appendChild(host);
        mount(() => div("hi"), "#app");
        expect(host.textContent).toBe("hi");
        expect(() => mount(() => div(), "#nope")).toThrow(/not found/);
    });
});

describe("onMount", () => {
    test("runs once the element is in the document, not synchronously", async () => {
        let connected: boolean | undefined;
        mount(() =>
            div((el, onMount) => {
                onMount(() => {
                    connected = el.isConnected;
                });
            }),
        );
        expect(connected).toBeUndefined();
        await microtask();
        expect(connected).toBe(true);
    });

    test("its cleanup and effects are disposed with the element's scope", async () => {
        const s = $(Mut(0));
        const log: string[] = [];
        let runs = 0;
        const unmount = mount(() =>
            div((_, onMount) => {
                onMount(() => {
                    $e(() => {
                        s.value;
                        runs++;
                    });
                    return () => log.push("cleanup");
                });
            }),
        );
        await microtask();
        s.value++;
        expect(runs).toBe(2);
        unmount();
        s.value++;
        expect(runs).toBe(2);
        expect(log).toEqual(["cleanup"]);
    });

    test("doesn't run if the element's scope is gone before it mounts", async () => {
        const on = $(Mut(true));
        let ran = false;
        mount(() =>
            div(() =>
                Show(() => on.value, () =>
                    button((_, onMount) => {
                        onMount(() => {
                            ran = true;
                        });
                    }),
                ),
            ),
        );
        on.value = false;
        await microtask();
        await new Promise((r) => setTimeout(r, 30));
        expect(ran).toBe(false);
    });
});
