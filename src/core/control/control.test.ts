import { describe, expect, test } from "bun:test";
import { Each, Match, Show } from "./control";
import { $, $e, batch, Mut } from "../reactivity/reactivity";
import { div, li, p, span, ul } from "../elements/elements";

describe("Show", () => {
    test("swaps branches on condition change", () => {
        const on = $(Mut(true));
        Show(() => on.value, { then: () => p("yes"), else: () => p("no") });

        expect(document.body.textContent).toBe("yes");
        on.value = false;
        expect(document.body.textContent).toBe("no");
    });

    test("disposes bindings of a removed branch", () => {
        const on = $(Mut(true));
        const count = $(Mut(0));
        let branchRuns = 0;

        Show(
            () => on.value,
            () => {
                $e(() => {
                    count.value;
                    branchRuns++;
                });
            },
        );

        on.value = false;
        const before = branchRuns;
        count.value++;
        expect(branchRuns).toBe(before);
    });

    test("keeps the branch DOM while the condition stays truthy", () => {
        const n = $(Mut(1));
        let renders = 0;
        Show(
            () => n.value > 0,
            () => {
                renders++;
                p("positive");
            },
        );

        const node = document.querySelector("p");
        n.value = 2;
        n.value = 3;
        expect(renders).toBe(1);
        expect(document.querySelector("p")).toBe(node);
    });

    test("reads inside a branch don't re-render it", () => {
        const name = $(Mut("a"));
        let renders = 0;
        Show(
            () => true,
            () => {
                renders++;
                p(`hello ${name.value}`);
            },
        );

        name.value = "b";
        expect(renders).toBe(1);
    });
});

describe("Each", () => {
    test("reads inside an item render don't re-run the list", () => {
        const items = $(Mut({ list: [1, 2] }));
        const tick = $(Mut(0));
        let keyCalls = 0;

        Each(
            () => items.list,
            (item) => {
                p(`${item}-${tick.value}`);
            },
            (item) => {
                keyCalls++;
                return item;
            },
        );

        expect(keyCalls).toBe(2);
        tick.value++;
        expect(keyCalls).toBe(2);
    });

    test("disposes bindings of removed items only", () => {
        const items = $(Mut({ list: [{ id: 1 }, { id: 2 }, { id: 3 }] }));
        const tick = $(Mut(0));
        const runsById = new Map<number, number>();

        ul(() => {
            Each(
                () => items.list,
                (item) => {
                    li($(() => `${item.id}:${tick.value}`));
                    $e(() => {
                        tick.value;
                        runsById.set(item.id, (runsById.get(item.id) ?? 0) + 1);
                    });
                },
                (item) => item.id,
            );
        });

        items.list = items.list.filter((i) => i.id !== 2);
        tick.value++;

        expect(runsById.get(1)).toBe(2);
        expect(runsById.get(2)).toBe(1);
        expect(runsById.get(3)).toBe(2);
        expect(document.body.textContent).toBe("1:13:1");
    });

    test("kept items keep their bindings across list updates", () => {
        const items = $(Mut({ list: ["a", "b"] }));
        const suffix = $(Mut("!"));

        ul(() => {
            Each(
                () => items.list,
                (item) => {
                    li($(() => item + suffix.value));
                },
            );
        });

        items.list = [...items.list, "c"];
        suffix.value = "?";
        expect(document.body.textContent).toBe("a?b?c?");
    });

    test("disposing the owning scope disposes all items", () => {
        const items = $(Mut({ list: [1, 2] }));
        const tick = $(Mut(0));
        let runs = 0;

        const dispose = $e(() => {
            ul(() => {
                Each(
                    () => items.list,
                    () => {
                        $e(() => {
                            tick.value;
                            runs++;
                        });
                    },
                );
            });
        });

        expect(runs).toBe(2);
        dispose();
        tick.value++;
        expect(runs).toBe(2);
    });
});

describe("Match", () => {
    test("disposes bindings of the previous arm", () => {
        const status = $(Mut<"a" | "b">("a"));
        const count = $(Mut(0));
        let armRuns = 0;

        Match(() => status.value, {
            a: () => {
                $e(() => {
                    count.value;
                    armRuns++;
                });
            },
            b: () => span("b"),
        });

        status.value = "b";
        const before = armRuns;
        count.value++;
        expect(armRuns).toBe(before);
    });

    test("only re-renders when the matched arm changes", () => {
        const age = $(Mut(20));
        let adultRenders = 0;

        const label = Match(() => age.value, {
            "<18": () => "minor",
            "[18..65)": () => {
                adultRenders++;
                return "adult";
            },
            _: () => "senior",
        });

        age.value = 30;
        age.value = 40;
        expect(adultRenders).toBe(1);
        expect(label.value).toBe("adult");

        age.value = 70;
        expect(label.value).toBe("senior");
    });

    test("reads inside an arm don't re-render it", () => {
        const status = $(Mut("a"));
        const name = $(Mut("x"));
        let renders = 0;

        Match(() => status.value, {
            a: () => {
                renders++;
                span(name.value);
            },
        });

        name.value = "y";
        expect(renders).toBe(1);
    });
});

describe("Nested blocks at the top level of a branch or item", () => {
    test("removing an item removes content its nested Show inserted later", () => {
        const on = $(Mut(false));
        const items = $(Mut(["a", "b"]));
        const root = div(() =>
            Each(() => [...items], (x) => {
                Show(() => on.value, () => span(x.toUpperCase()));
                span(x);
            }),
        );
        on.value = true;
        items.splice(0, 1);
        expect(root.textContent).toBe("Bb");
    });

    test("moving an item moves its nested Show content", () => {
        const on = $(Mut(false));
        const items = $(Mut(["a", "b"]));
        const root = div(() =>
            Each(() => [...items], (x) => {
                Show(() => on.value, () => span(x.toUpperCase()));
                span(x);
            }),
        );
        on.value = true;
        items.reverse();
        expect(root.textContent).toBe("BbAa");
    });

    test("hiding an outer Show removes a nested Show's content", () => {
        const outer = $(Mut(true));
        const inner = $(Mut(false));
        const root = div(() =>
            Show(() => outer.value, () => {
                Show(() => inner.value, () => span("inner"));
                span("x");
            }),
        );
        inner.value = true;
        outer.value = false;
        expect(root.textContent).toBe("");
    });

    test("switching a Match arm removes a nested Show's content", () => {
        const k = $(Mut("a"));
        const on = $(Mut(false));
        const root = div(() =>
            Match(() => k.value, {
                a: () => Show(() => on.value, () => span("A!")),
                b: () => span("B"),
            }),
        );
        on.value = true;
        k.value = "b";
        expect(root.textContent).toBe("B");
    });

    test("nested Each items move with their parent item", () => {
        const items = $(Mut([1, 2]));
        const sub = $(Mut([10]));
        const root = div(() =>
            Each(() => [...items], (x) => {
                Each(() => [...sub], (y) => span(`${x}.${y}`));
            }),
        );
        sub.push(20);
        items.reverse();
        expect(root.textContent).toBe("2.102.201.101.20");
    });

    test("swapping two rows moves only those rows", () => {
        const items = $(Mut(Array.from({ length: 100 }, (_, i) => ({ id: i }))));
        const root = div(() => Each(() => items as unknown as { id: number }[], (it) => span(String(it.id))));
        let moves = 0;
        const insertBefore = root.insertBefore.bind(root);
        root.insertBefore = ((node: Node, ref: Node | null) => {
            moves++;
            return insertBefore(node, ref);
        }) as typeof root.insertBefore;

        batch(() => {
            const a = items[1];
            items[1] = items[98];
            items[98] = a;
        });
        expect(root.textContent?.startsWith("0982")).toBe(true);
        expect(moves).toBeLessThanOrEqual(2);
    });
});
