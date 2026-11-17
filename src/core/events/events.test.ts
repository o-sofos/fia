import { describe, expect, test } from "bun:test";
import { $, Mut } from "../reactivity/reactivity";
import { a, button, div, img, span } from "../elements/elements";
import { pushExecutionContext, popExecutionContext } from "../context/context";
import { fire, render } from "../../testing/mod";

describe("delegated events", () => {
    test("bubble from the target up through handlers, innermost first", () => {
        const order: string[] = [];
        const view = render(() =>
            div({ onclick: () => order.push("outer") }, () =>
                div({ onclick: () => order.push("inner") }, () => span("x")),
            ),
        );
        fire.click(view.get("span"));
        expect(order).toEqual(["inner", "outer"]);
    });

    test("stopPropagation stops outer handlers", () => {
        let outer = 0;
        const view = render(() =>
            div({ onclick: () => outer++ }, () => button({ onclick: (e) => e.stopPropagation() }, () => {})),
        );
        fire.click(view.get("button"));
        expect(outer).toBe(0);
    });

    test("currentTarget is the handler's element during dispatch and restored after", () => {
        let during = null as EventTarget | null;
        let event: Event | undefined;
        const view = render(() =>
            div({ onclick: (e) => { during = e.currentTarget; event = e; } }, () => span("x")),
        );
        fire.click(view.get("span"));
        expect(during).toBe(view.get("div"));
        expect(event!.currentTarget).not.toBe(view.get("div"));
    });

    test("reach handlers inside an open shadow root", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const shadow = host.attachShadow({ mode: "open" });
        let clicks = 0;
        pushExecutionContext(shadow);
        try {
            button("in shadow", () => clicks++);
        } finally {
            popExecutionContext();
        }
        fire.click(shadow.querySelector("button"));
        expect(clicks).toBe(1);
    });
});

describe("attribute bindings", () => {
    test("null/undefined removes the attribute", () => {
        const title = $(Mut("x" as string | null));
        const view = render(() => div({ title }));
        expect(view.get("div").getAttribute("title")).toBe("x");
        title.value = null;
        expect(view.get("div").hasAttribute("title")).toBe(false);
    });

    test("a null class clears it", () => {
        const cls = $(Mut("a" as string | null));
        const view = render(() => div({ class: cls }));
        cls.value = null;
        expect(view.get("div").hasAttribute("class")).toBe(false);
    });
});

describe("href/src shorthands", () => {
    test("any string is the href, relative ones included", () => {
        const view = render(() => {
            a("about", "About");
            a("?page=2", "Next");
            a("//cdn.example.com/x");
        });
        expect(view.all("a").map((el) => el.getAttribute("href"))).toEqual(["about", "?page=2", "//cdn.example.com/x"]);
        expect(view.all("a")[0].textContent).toBe("About");
    });

    test("any string is the img src", () => {
        const view = render(() => img("avatar", "Me"));
        const el = view.get<HTMLImageElement>("img");
        expect(el.getAttribute("src")).toBe("avatar");
        expect(el.alt).toBe("Me");
    });
});
