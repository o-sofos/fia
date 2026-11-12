import { describe, expect, test } from "bun:test";
import { Each, Match, Show } from "./control";
import { $, $e, Mut } from "../reactivity/reactivity";
import { li, p, span, ul } from "../elements/elements";

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
