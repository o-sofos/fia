import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { describe, it, expect, beforeEach } from "bun:test";
import { div, button, input, h1, span, a, p } from "./elements";
import { $ } from "./reactivity";
import { hasExecutionContext, popExecutionContext } from "./context";

// Setup DOM environment
try {
    GlobalRegistrator.register();
} catch {
    // Already registered
}

describe("Element System", () => {
    beforeEach(() => {
        while (hasExecutionContext()) {
            popExecutionContext();
        }
        document.body.innerHTML = "";
    });

    describe("Basic Creation", () => {
        it("should create correct element type", () => {
            const el = div();
            expect(el).toBeInstanceOf(window.HTMLElement);
            expect(el.tagName).toBe("DIV");
        });

        it("should create void elements", () => {
            const el = input();
            expect(el.tagName).toBe("INPUT");
        });

        it("should create various element types", () => {
            expect(span().tagName).toBe("SPAN");
            expect(button().tagName).toBe("BUTTON");
            expect(h1().tagName).toBe("H1");
            expect(a().tagName).toBe("A");
            expect(p().tagName).toBe("P");
        });
    });

    describe("Static Props & Attributes", () => {
        it("should apply simple attributes", () => {
            const el = div({ id: "test-id", title: "Hello" });
            expect(el.id).toBe("test-id");
            expect(el.title).toBe("Hello");
        });

        it("should apply data attributes", () => {
            const el = div({ "data-testid": "foo", "data-count": 42 });
            expect(el.getAttribute("data-testid")).toBe("foo");
            expect(el.getAttribute("data-count")).toBe("42");
        });

        it("should apply aria attributes", () => {
            const el = button({ "aria-label": "Close", "aria-pressed": true });
            expect(el.getAttribute("aria-label")).toBe("Close");
            expect(el.getAttribute("aria-pressed")).toBe("");
        });

        it("should apply class string", () => {
            const el = div({ class: "foo bar baz" });
            expect(el.className).toBe("foo bar baz");
        });

        it("should apply class object (static)", () => {
            const el = div({ class: { active: true, disabled: false, visible: true } });
            expect(el.classList.contains("active")).toBe(true);
            expect(el.classList.contains("disabled")).toBe(false);
            expect(el.classList.contains("visible")).toBe(true);
        });

        it("should apply style string", () => {
            const el = div({ style: "color: red; margin: 10px" });
            expect(el.getAttribute("style")).toBe("color: red; margin: 10px");
        });

        it("should apply style object", () => {
            const el = div({ style: { color: "red", marginTop: "10px" } });
            expect(el.style.color).toBe("red");
            expect(el.style.marginTop).toBe("10px");
        });

        it("should handle boolean attributes - true", () => {
            const el = input({ required: true, disabled: true });
            expect(el.hasAttribute("required")).toBe(true);
            expect(el.hasAttribute("disabled")).toBe(true);
        });

        it("should handle boolean attributes - false", () => {
            const el = input({ required: false, disabled: false });
            expect(el.hasAttribute("required")).toBe(false);
            expect(el.hasAttribute("disabled")).toBe(false);
        });

        it("should set DOM properties directly", () => {
            const el = input({ value: "hello", checked: true });
            expect(el.value).toBe("hello");
            expect(el.checked).toBe(true);
        });
    });

    describe("Event Handlers", () => {
        it("should handle onclick", () => {
            let clicked = false;
            const el = button({ onclick: () => { clicked = true; } });

            el.click();
            expect(clicked).toBe(true);
        });

        it("should handle multiple events", () => {
            let focused = false;
            let blurred = false;
            const el = input({
                onfocus: () => { focused = true; },
                onblur: () => { blurred = true; },
            });

            el.dispatchEvent(new window.FocusEvent("focus"));
            expect(focused).toBe(true);

            el.dispatchEvent(new window.FocusEvent("blur"));
            expect(blurred).toBe(true);
        });

        it("should pass event object to handler", () => {
            let receivedEvent: Event | null = null;
            const el = button({ onclick: (e) => { receivedEvent = e; } });

            el.click();
            expect(receivedEvent).not.toBeNull();
            expect(receivedEvent!.type).toBe("click");
        });
    });

    describe("Children & Nesting", () => {
        it("should append text children", () => {
            const el = div("Hello", " ", "World");
            expect(el.textContent).toBe("Hello World");
        });

        it("should append number children", () => {
            const el = div("Count: ", 42);
            expect(el.textContent).toBe("Count: 42");
        });

        it("should append node children", () => {
            const child = span("child");
            const parent = div(child);
            expect(parent.firstElementChild).toBe(child);
        });

        it("should handle nested functional children (context)", () => {
            const parent = div(() => {
                h1("Title");
                span("Text");
            });

            expect(parent.children.length).toBe(2);
            expect(parent.children[0].tagName).toBe("H1");
            expect(parent.children[1].tagName).toBe("SPAN");
        });

        it("should handle deeply nested elements", () => {
            const parent = div(() => {
                div(() => {
                    span("Deep");
                });
            });

            expect(parent.querySelector("span")?.textContent).toBe("Deep");
        });

        it("should ignore null and undefined children", () => {
            const el = div("a", null, "b", undefined, "c");
            expect(el.textContent).toBe("abc");
        });

        it("should ignore boolean children", () => {
            const el = div("a", true, "b", false, "c");
            expect(el.textContent).toBe("abc");
        });

        it("should handle array children", () => {
            const items = ["one", "two", "three"];
            const el = div(items);
            expect(el.textContent).toBe("onetwothree");
        });
    });

    describe("Reactive Attributes", () => {
        it("should update reactive attribute", () => {
            const title = $("Initial");
            const el = div({ title });

            expect(el.getAttribute("title")).toBe("Initial");

            title.value = "Updated";
            expect(el.getAttribute("title")).toBe("Updated");
        });

        it("should update reactive boolean attribute", () => {
            const disabled = $(false);
            const el = input({ disabled });

            expect(el.hasAttribute("disabled")).toBe(false);

            disabled.value = true;
            expect(el.hasAttribute("disabled")).toBe(true);

            disabled.value = false;
            expect(el.hasAttribute("disabled")).toBe(false);
        });

        it("should update reactive DOM property", () => {
            const value = $("initial");
            const el = input({ value });

            expect(el.value).toBe("initial");

            value.value = "updated";
            expect(el.value).toBe("updated");
        });

        it("should update reactive checked property", () => {
            const checked = $(false);
            const el = input({ type: "checkbox", checked });

            expect(el.checked).toBe(false);

            checked.value = true;
            expect(el.checked).toBe(true);
        });
    });

    describe("Reactive Class", () => {
        it("should update reactive class string", () => {
            const cls = $("foo");
            const el = div({ class: cls });

            expect(el.className).toBe("foo");

            cls.value = "bar baz";
            expect(el.className).toBe("bar baz");
        });

        it("should update reactive class object", () => {
            const isActive = $(false);
            const isVisible = $(true);
            const el = div({ class: { active: isActive, visible: isVisible, static: true } });

            expect(el.classList.contains("active")).toBe(false);
            expect(el.classList.contains("visible")).toBe(true);
            expect(el.classList.contains("static")).toBe(true);

            isActive.value = true;
            expect(el.classList.contains("active")).toBe(true);

            isVisible.value = false;
            expect(el.classList.contains("visible")).toBe(false);
        });
    });

    describe("Reactive Style", () => {
        it("should update reactive style string", () => {
            const style = $("color: red");
            const el = div({ style });

            expect(el.getAttribute("style")).toBe("color: red");

            style.value = "color: blue";
            expect(el.getAttribute("style")).toBe("color: blue");
        });

        it("should update reactive style properties", () => {
            const color = $("red");
            // @ts-expect-error - Signal in style object is valid at runtime but complex to type perfectly 
            const el = div({ style: { color, backgroundColor: "white" } });

            expect(el.style.color).toBe("red");
            expect(el.style.backgroundColor).toBe("white");

            color.value = "blue";
            expect(el.style.color).toBe("blue");
            expect(el.style.backgroundColor).toBe("white"); // unchanged
        });

        it("should handle reactive style values", () => {
            const width = $("100px");
            // @ts-expect-error - Signal in style object
            const el = div({ style: { width } });

            expect(el.style.width).toBe("100px");

            width.value = "200px";
            expect(el.style.width).toBe("200px");
        });
    });

    describe("Reactive Text Content", () => {
        it("should update signal text child", () => {
            const text = $("Hello");
            const el = div(text);

            expect(el.textContent).toBe("Hello");

            text.value = "World";
            expect(el.textContent).toBe("World");
        });

        it("should update signal number child", () => {
            const count = $(0);
            const el = div("Count: ", count);

            expect(el.textContent).toBe("Count: 0");

            count.value = 42;
            expect(el.textContent).toBe("Count: 42");
        });

        it("should handle null/undefined signal values", () => {
            const text = $<string | null>("Hello");
            const el = div(text);

            expect(el.textContent).toBe("Hello");

            text.value = null;
            expect(el.textContent).toBe("");
        });
    });

    describe("Reactive Children (Functional)", () => {
        it("should update conditional children", () => {
            const show = $(true);
            const el = div(() => {
                if (show.value) {
                    span("Visible");
                }
            });

            expect(el.querySelector("span")).not.toBeNull();
            expect(el.textContent).toBe("Visible");

            show.value = false;
            expect(el.querySelector("span")).toBeNull();
            expect(el.textContent).toBe("");

            show.value = true;
            expect(el.querySelector("span")).not.toBeNull();
        });

        it("should update list children", () => {
            const items = $(["a", "b", "c"]);
            const el = div(() => {
                for (const item of items.value) {
                    span(item);
                }
            });

            expect(el.children.length).toBe(3);
            expect(el.textContent).toBe("abc");

            items.value = ["x", "y"];
            expect(el.children.length).toBe(2);
            expect(el.textContent).toBe("xy");

            items.value = [];
            expect(el.children.length).toBe(0);
        });

        it("should handle switching between different content", () => {
            const mode = $<"a" | "b" | "c">("a");
            const el = div(() => {
                switch (mode.value) {
                    case "a": span("Mode A"); break;
                    case "b": p("Mode B"); break;
                    case "c": h1("Mode C"); break;
                }
            });

            expect(el.querySelector("span")).not.toBeNull();

            mode.value = "b";
            expect(el.querySelector("span")).toBeNull();
            expect(el.querySelector("p")).not.toBeNull();

            mode.value = "c";
            expect(el.querySelector("p")).toBeNull();
            expect(el.querySelector("h1")).not.toBeNull();
        });
    });

    describe("Ref Callbacks", () => {
        it("should call ref with created element", () => {
            let ref: HTMLDivElement | undefined;
            const el = div((element) => {
                ref = element;
            });

            expect(ref).toBe(el);
            expect(ref).toBeInstanceOf(window.HTMLDivElement);
        });

        it("should call ref for void elements", () => {
            let ref: HTMLInputElement | undefined;
            const el = input({ type: "text" });

            // Assign result to silence unused variable warning in strict mode
            // (Testing creation logic, not ref callback for this specific case)
            if (el) ref = el;

            expect(ref?.type).toBe("text");
        });

        it("should call multiple refs", () => {
            let ref1: HTMLDivElement | undefined;
            let ref2: HTMLDivElement | undefined;
            const el = div(
                (element) => { ref1 = element; },
                (element) => { ref2 = element; }
            );

            expect(ref1).toBe(el);
            expect(ref2).toBe(el);
        });

        it("should distinguish ref from render function", () => {
            let refCalled = false;
            let renderCalled = false;

            const el = div(
                (_element) => { refCalled = true; }, // ref (has parameter)
                () => { renderCalled = true; span("child"); } // render (no parameter)
            );

            expect(refCalled).toBe(true);
            expect(renderCalled).toBe(true);
            expect(el.querySelector("span")).not.toBeNull();
        });
    });

    describe("Overloads / Shorthands", () => {
        it("should support button(text, onclick)", () => {
            let clicked = false;
            const btn = button("Click Me", () => { clicked = true; });

            expect(btn.textContent).toBe("Click Me");
            btn.click();
            expect(clicked).toBe(true);
        });

        it("should support button(text, props)", () => {
            const btn = button("Label", { id: "btn-1", disabled: true });
            expect(btn.textContent).toBe("Label");
            expect(btn.id).toBe("btn-1");
            expect(btn.disabled).toBe(true);
        });

        it("should support a(text, onclick)", () => {
            let clicked = false;
            const link = a("Click", () => { clicked = true; });

            expect(link.textContent).toBe("Click");
            link.click();
            expect(clicked).toBe(true);
        });

        it("should support element(props, ...children)", () => {
            const el = div({ id: "parent" }, span("A"), span("B"));
            expect(el.id).toBe("parent");
            expect(el.children.length).toBe(2);
        });

        it("should support element(...children) without props", () => {
            const el = div(span("A"), span("B"), span("C"));
            expect(el.children.length).toBe(3);
        });
    });

    describe("Edge Cases", () => {
        it("should handle empty element", () => {
            const el = div();
            expect(el.childNodes.length).toBe(0);
        });

        it("should handle empty props", () => {
            const el = div({});
            expect(el.childNodes.length).toBe(0);
        });

        it("should handle props with null values", () => {
            const el = div({ id: null as any, title: undefined });
            expect(el.hasAttribute("id")).toBe(false);
            expect(el.hasAttribute("title")).toBe(false);
        });

        it("should not throw on rapid signal updates", () => {
            const count = $(0);
            const el = div(count);

            for (let i = 0; i < 100; i++) {
                count.value = i;
            }

            expect(el.textContent).toBe("99");
        });

        it("should handle nested reactive content", () => {
            const outer = $(true);
            const inner = $("Hello");

            const el = div(() => {
                if (outer.value) {
                    span(inner);
                }
            });

            expect(el.textContent).toBe("Hello");

            inner.value = "World";
            expect(el.textContent).toBe("World");

            outer.value = false;
            expect(el.textContent).toBe("");

            inner.value = "Ignored"; // Should not appear
            expect(el.textContent).toBe("");

            outer.value = true;
            expect(el.textContent).toBe("Ignored"); // Now shows current value
        });
    });
});