import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { describe, it, expect, beforeEach } from "bun:test";
import { div, button, input, h1, span, a, p, ul, li, label, img, strong, summary, option, td, code } from "./elements";
import { $, Mut } from "../reactivity/reactivity";
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
            const disabled = $(Mut(false));
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
            const value = $(Mut(""));
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
            const isActive = $(Mut(false));
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
            const color = $(Mut("red"));
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
            const title = $("Card Title");
            const isExpanded = $(Mut(false));

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
            const count = $(Mut(0));
            const el = div({ textContent: count });

            for (let i = 0; i < 100; i++) {
                count.value = i;
            }

            expect(el.textContent as unknown as string).toBe("99");
        });
    });

    // =========================================================================
    // NEW SHORTHAND OVERLOAD TESTS
    // =========================================================================

    describe("Text Shorthand - Text-Holding Elements", () => {
        it("should create h1 with text shorthand", () => {
            const el = h1("Hello World");
            expect(el.textContent).toBe("Hello World");
            expect(el.tagName).toBe("H1");
        });

        it("should create p with text shorthand", () => {
            const el = p("Paragraph text");
            expect(el.textContent).toBe("Paragraph text");
        });

        it("should create div with text shorthand", () => {
            const el = div("Div content");
            expect(el.textContent).toBe("Div content");
        });

        it("should create span with text shorthand", () => {
            const el = span("Inline text");
            expect(el.textContent).toBe("Inline text");
        });

        it("should create code with text shorthand", () => {
            const el = code("const x = 1");
            expect(el.textContent).toBe("const x = 1");
        });

        it("should create li with text shorthand", () => {
            const el = li("List item");
            expect(el.textContent).toBe("List item");
        });

        it("should create td with text shorthand", () => {
            const el = td("Cell content");
            expect(el.textContent).toBe("Cell content");
        });

        it("should create element with number text", () => {
            const el = span(42);
            expect(el.textContent).toBe("42");
        });

        it("should create p with text + props", () => {
            const el = p("Important", { class: "highlight" });
            expect(el.textContent).toBe("Important");
            expect(el.className).toBe("highlight");
        });

        it("should create h1 with text + props", () => {
            const el = h1("Title", { id: "main-title", class: "hero" });
            expect(el.textContent).toBe("Title");
            expect(el.id).toBe("main-title");
            expect(el.className).toBe("hero");
        });

        it("should create span with reactive text", () => {
            const text = $(Mut("initial"));
            const el = span(text);
            expect(el.textContent).toBe("initial");
            text.value = "updated";
            expect(el.textContent).toBe("updated");
        });

        it("should create div with reactive number text", () => {
            const count = $(Mut(0));
            const el = div(count);
            expect(el.textContent).toBe("0");
            count.value = 99;
            expect(el.textContent).toBe("99");
        });

        it("should create div with text + children", () => {
            const el = div("Prefix: ", () => {
                strong("bold");
            });
            expect(el.textContent).toBe("Prefix: bold");
        });

        it("should create p with text + props + children", () => {
            const el = p("Note: ", { class: "note" }, () => {
                strong("important");
            });
            expect(el.textContent).toBe("Note: important");
            expect(el.className).toBe("note");
        });
    });

    describe("Interactive Element Shorthand", () => {
        it("should create button with text", () => {
            const el = button("Click me");
            expect(el.textContent).toBe("Click me");
            expect(el.tagName).toBe("BUTTON");
        });

        it("should create button with text + onclick", () => {
            let clicked = false;
            const el = button("Click", () => { clicked = true; });
            el.click();
            expect(clicked).toBe(true);
            expect(el.textContent).toBe("Click");
        });

        it("should create button with text + props", () => {
            const el = button("Submit", { class: "btn", disabled: true });
            expect(el.textContent).toBe("Submit");
            expect(el.className).toBe("btn");
            expect(el.disabled).toBe(true);
        });

        it("should create summary with text", () => {
            const el = summary("Details");
            expect(el.textContent).toBe("Details");
            expect(el.tagName).toBe("SUMMARY");
        });

        it("should create option with text", () => {
            const el = option("Option 1");
            expect(el.textContent).toBe("Option 1");
        });

        it("should create button with reactive text", () => {
            const text = $(Mut("Loading..."));
            const el = button(text);
            expect(el.textContent).toBe("Loading...");
            text.value = "Submit";
            expect(el.textContent).toBe("Submit");
        });
    });

    describe("img Shorthand", () => {
        it("should create img with src only", () => {
            const el = img("/logo.png");
            expect(el.src).toContain("/logo.png");
            expect(el.tagName).toBe("IMG");
        });

        it("should create img with src + alt", () => {
            const el = img("/avatar.jpg", "User avatar");
            expect(el.src).toContain("/avatar.jpg");
            expect(el.alt).toBe("User avatar");
        });

        it("should create img with src + alt + props", () => {
            const el = img("/photo.webp", "Photo", { loading: "lazy", class: "gallery" });
            expect(el.alt).toBe("Photo");
            expect(el.loading).toBe("lazy");
            expect(el.className).toBe("gallery");
        });

        it("should create img with props only (existing pattern)", () => {
            const el = img({ src: "/test.png", alt: "Test" });
            expect(el.src).toContain("/test.png");
            expect(el.alt).toBe("Test");
        });

        it("should handle data URL src", () => {
            const el = img("data:image/png;base64,abc123", "Data image");
            expect(el.src).toContain("data:image/png");
            expect(el.alt).toBe("Data image");
        });
    });

    describe("a (Anchor) Shorthand", () => {
        it("should create anchor with href only", () => {
            const el = a("/home");
            expect(el.getAttribute("href")).toBe("/home");
            expect(el.tagName).toBe("A");
        });

        it("should create anchor with href + text", () => {
            const el = a("/about", "About Us");
            expect(el.getAttribute("href")).toBe("/about");
            expect(el.textContent).toBe("About Us");
        });

        it("should create anchor with href + text + props", () => {
            const el = a("https://github.com", "GitHub", { target: "_blank", class: "external" });
            expect(el.getAttribute("href")).toBe("https://github.com");
            expect(el.textContent).toBe("GitHub");
            expect(el.target).toBe("_blank");
            expect(el.className).toBe("external");
        });

        it("should create anchor with hash href", () => {
            const el = a("#section", "Go to section");
            expect(el.getAttribute("href")).toBe("#section");
            expect(el.textContent).toBe("Go to section");
        });

        it("should create anchor with mailto href", () => {
            const el = a("mailto:test@example.com", "Email us");
            expect(el.getAttribute("href")).toBe("mailto:test@example.com");
        });

        it("should create anchor with props only (existing pattern)", () => {
            const el = a({ href: "/", textContent: "Home" });
            expect(el.getAttribute("href")).toBe("/");
            expect(el.textContent).toBe("Home");
        });

        it("should create anchor with children (existing pattern)", () => {
            const el = a({ href: "/page" }, () => {
                span("Link text");
            });
            expect(el.getAttribute("href")).toBe("/page");
            expect(el.textContent).toBe("Link text");
        });

        it("should handle reactive anchor text", () => {
            const text = $(Mut("Click here"));
            const el = a("/link", text);
            expect(el.textContent).toBe("Click here");
            text.value = "Updated text";
            expect(el.textContent).toBe("Updated text");
        });
    });

    describe("Backward Compatibility", () => {
        it("should still support div(props)", () => {
            const el = div({ class: "container", id: "main" });
            expect(el.className).toBe("container");
            expect(el.id).toBe("main");
        });

        it("should still support div(children)", () => {
            const el = div(() => {
                span("Child");
            });
            expect(el.textContent).toBe("Child");
        });

        it("should still support div(props, children)", () => {
            const el = div({ class: "wrapper" }, () => {
                p("Content");
            });
            expect(el.className).toBe("wrapper");
            expect(el.textContent).toBe("Content");
        });

        it("should still support button({ textContent, onclick })", () => {
            let clicked = false;
            const el = button({ textContent: "Old style", onclick: () => { clicked = true; } });
            expect(el.textContent).toBe("Old style");
            el.click();
            expect(clicked).toBe(true);
        });

        it("should still support a({ href, textContent })", () => {
            const el = a({ href: "/", textContent: "Home" });
            expect(el.getAttribute("href")).toBe("/");
            expect(el.textContent).toBe("Home");
        });

        it("should still support img({ src, alt })", () => {
            const el = img({ src: "/logo.png", alt: "Logo" });
            expect(el.src).toContain("/logo.png");
            expect(el.alt).toBe("Logo");
        });

        it("container elements should not accept text shorthand", () => {
            // ul, ol, table should work with props/children only
            const list = ul({ class: "list" }, () => {
                li("Item 1");
                li("Item 2");
            });
            expect(list.className).toBe("list");
            expect(list.children.length).toBe(2);
        });
    });
});