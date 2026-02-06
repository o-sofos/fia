import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { describe, it, expect, beforeEach } from "bun:test";
import { div, button, input, h1, span, a, p, ul, li, label } from "./elements";
import { $ } from "../reactivity/reactivity";
import { hasExecutionContext, popExecutionContext } from "../context/context";

try {
    GlobalRegistrator.register();
} catch {
    // Already registered
}

describe("Element System - Unified API", () => {
    beforeEach(() => {
        while (hasExecutionContext()) popExecutionContext();
        document.body.innerHTML = "";
    });

    describe("Overload 1: element()", () => {
        it("should create empty element", () => {
            const el = div();
            expect(el.tagName).toBe("DIV");
            expect(el.childNodes.length).toBe(0);
        });

        it("should create various empty elements", () => {
            expect(span().tagName).toBe("SPAN");
            expect(button().tagName).toBe("BUTTON");
            expect(p().tagName).toBe("P");
        });
    });

    describe("Overload 2: element(props)", () => {
        it("should create element with props", () => {
            const el = div({ id: "test", class: "container" });
            expect(el.id).toBe("test");
            expect(el.className).toBe("container");
        });

        it("should apply event handlers", () => {
            let clicked = false;
            const el = button({ onclick: () => { clicked = true; } });
            el.click();
            expect(clicked).toBe(true);
        });

        it("should apply reactive props", () => {
            const disabled = $<boolean>(false);
            const el = button({ disabled });
            expect((el as unknown as HTMLButtonElement).disabled).toBe(false);

            disabled.value = true;
            expect((el as unknown as HTMLButtonElement).disabled).toBe(true);
        });
    });

    describe("Overload 3: element(children)", () => {
        it("should create element with children callback", () => {
            const el = div((_el) => {
                span({ textContent: "Child 1" });
                span({ textContent: "Child 2" });
            });
            expect(el.children.length).toBe(2);
            expect(el.children[0].tagName).toBe("SPAN");
            expect(el.children[1].tagName).toBe("SPAN");
        });

        it("should provide element reference in callback", () => {
            let ref: HTMLDivElement | undefined;
            const el = div((r) => {
                ref = r;
            });
            expect(ref).toBe(el);
        });

        it("should handle nested children", () => {
            const el = div((_el) => {
                div((_el) => {
                    span({ textContent: "Deep" });
                });
            });
            expect(el.querySelector("span")?.textContent).toBe("Deep");
        });
    });

    describe("Overload 4: element(props, children)", () => {
        it("should create element with props and children", () => {
            const el = div({ class: "parent" }, (_el) => {
                span({ textContent: "Child" });
            });
            expect(el.className).toBe("parent");
            expect(el.children.length).toBe(1);
            expect(el.textContent).toBe("Child");
        });

        it("should work with event handlers and children", () => {
            let clicked = false;
            const el = button({ onclick: () => { clicked = true; } }, (_el) => {
                span({ textContent: "Click me" });
            });
            expect(el.textContent).toBe("Click me");
            el.click();
            expect(clicked).toBe(true);
        });
    });

    describe("Void Elements", () => {
        it("should create input with props", () => {
            const el = input({ type: "email", placeholder: "Enter email" });
            expect(el.type).toBe("email");
            expect(el.placeholder).toBe("Enter email");
        });

        it("should handle reactive input value", () => {
            const value = $<string>("");
            const el = input({ type: "text", value });
            expect(el.value).toBe("");

            value.value = "typed text";
            expect(el.value).toBe("typed text");
        });
    });

    describe("Class Handling", () => {
        it("should apply string class", () => {
            const el = div({ class: "foo bar" });
            expect(el.className).toBe("foo bar");
        });

        it("should apply object class (static)", () => {
            const el = div({ class: { active: true, disabled: false } });
            expect(el.classList.contains("active")).toBe(true);
            expect(el.classList.contains("disabled")).toBe(false);
        });

        it("should apply object class (reactive)", () => {
            const isActive = $<boolean>(false);
            const el = div({ class: { active: isActive, static: true } });

            expect(el.classList.contains("active")).toBe(false);
            expect(el.classList.contains("static")).toBe(true);

            isActive.value = true;
            expect(el.classList.contains("active")).toBe(true);
        });
    });

    describe("Style Handling", () => {
        it("should apply string style", () => {
            const el = div({ style: "color: red" });
            expect(el.getAttribute("style")).toBe("color: red");
        });

        it("should apply object style", () => {
            const el = div({ style: { color: "blue", marginTop: "10px" } });
            expect(el.style.color).toBe("blue");
            expect(el.style.marginTop).toBe("10px");
        });

        it("should apply reactive style properties", () => {
            const color = $<string>("red");
            const el = div({ style: { color } });
            expect((el as unknown as HTMLElement).style.color).toBe("red");

            color.value = "blue";
            expect((el as unknown as HTMLElement).style.color).toBe("blue");
        });
    });

    describe("Event Handling", () => {
        it("should handle click events", () => {
            let count = 0;
            const el = button({ onclick: () => count++ }, (_el) => {
                span({ textContent: "Click" });
            });

            el.click();
            el.click();
            expect(count).toBe(2);
        });

        it("should handle multiple event types", () => {
            let focused = false;
            let blurred = false;

            const el = input({
                onfocus: () => { focused = true; },
                onblur: () => { blurred = true; },
            });

            el.dispatchEvent(new FocusEvent("focus"));
            expect(focused).toBe(true);

            el.dispatchEvent(new FocusEvent("blur"));
            expect(blurred).toBe(true);
        });
    });

    describe("Real-World Patterns", () => {
        it("should create a button with icon and text", () => {
            const el = button({ class: "btn-primary", onclick: () => { } }, (_el) => {
                span({ class: "icon" });
                span({ textContent: "Save" });
            });

            expect(el.className).toBe("btn-primary");
            expect(el.children.length).toBe(2);
        });

        it("should create a navigation link", () => {
            const el = a({
                textContent: "Dashboard",
                href: "/dashboard",
                onclick: (e: Event) => e.preventDefault(),
            });

            expect(el.textContent).toBe("Dashboard");
            expect(el.getAttribute("href")).toBe("/dashboard");
        });

        it("should create a form input with label", () => {
            const value = $<string>("");

            const container = div((_el) => {
                label({ textContent: "Email", for: "email-input" });
                input({
                    id: "email-input",
                    type: "email",
                    value,
                    placeholder: "Enter email",
                });
            });

            expect(container.querySelector("label")).not.toBeNull();
            expect(container.querySelector("input")?.type).toBe("email");
        });

        it("should create a dynamic list", () => {
            const items = $<string[]>(["Apple", "Banana", "Cherry"]);

            const list = ul((_el) => {
                for (const item of items) {
                    li({ textContent: item });
                }
            });

            expect(list.children.length).toBe(3);
            expect(list.children[0].textContent).toBe("Apple");
        });

        it("should create a card component pattern", () => {
            const title = $<string>("Card Title");
            const isExpanded = $<boolean>(false);

            const card = div({ class: { card: true, expanded: isExpanded } }, (_el) => {
                h1({ textContent: title, class: "card-title" });
                div({ class: "card-body" }, (_el) => {
                    p({ textContent: "Card content goes here" });
                });
                button({ onclick: () => { isExpanded.value = !isExpanded.value; } }, (_el) => {
                    span({ textContent: "Toggle" });
                });
            });

            expect(card.classList.contains("card")).toBe(true);
            expect(card.classList.contains("expanded")).toBe(false);
            expect(card.querySelector("h1")?.textContent).toBe("Card Title");

            // Simulate toggle
            isExpanded.value = true;
            expect(card.classList.contains("expanded")).toBe(true);
        });
    });

    describe("Edge Cases", () => {
        it("should handle empty props object", () => {
            const el = div({});
            expect(el.childNodes.length).toBe(0);
        });

        it("should handle null/undefined prop values", () => {
            const el = div();
            expect(el.hasAttribute("id")).toBe(false);
            expect(el.hasAttribute("title")).toBe(false);
        });

        it("should handle rapid reactive updates", () => {
            const count = $<number>(0);
            const el = div({ textContent: count });

            for (let i = 0; i < 100; i++) {
                count.value = i;
            }

            expect(el.textContent as unknown as string).toBe("99");
        });
    });
});