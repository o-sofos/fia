import { div, button, input } from "./elements";
import type { SmartElement } from "./elements";

// =============================================================================
// VALID USAGE (Should compile)
// =============================================================================

// 1. Basic Props
div({
    id: "my-div",
    class: "container",
    style: "color: red",
});

// 2. ClassList (Array Support)
div({
    classList: ["a", "b", "c"],
});

// 3. Class (Array Support)
div({
    class: ["a", "b"],
});

// 4. ClassName (React compat)
div({
    className: "my-class",
});

// 5. Event Handler Context (The main feature)
button({
    textContent: "Click Me",
    onclick: (e) => {
        // e.currentTarget should be HTMLButtonElement & { textContent: string }

        // Valid DOM property
        e.currentTarget.disabled = true;

        // Valid inferred prop
        const text = e.currentTarget.textContent;

        // Valid classList access
        e.currentTarget.classList.add("clicked");
        e.currentTarget.classList
    }
});

// 6. Reactive Props (Signal unwrap)
// Mocking signal for type test
type Signal<T> = (() => T) & { value: T } & { peek(): T };
const sig = (null as any) as Signal<string>;

input({
    value: sig, // Should be accepted
    oninput: (e) => {
        // e.currentTarget.value should be string, not Signal
        const val = e.currentTarget.value;
    }
});

// =============================================================================
// INVALID USAGE (Should fail compilation - marked with @ts-expect-error)
// =============================================================================

// 1. Invalid Prop Type
// @ts-expect-error
div({ id: 123 }); // id must be string

// 2. Invalid Event Handler
// @ts-expect-error
button({ onclick: "not-a-function" });

// 3. Accessing non-existent prop on currentTarget
button({
    // @ts-expect-error - Accessing non-existent prop invalidates the handler type
    onclick: (e) => {
        e.currentTarget.nonExistentProp;
    }
});

// 4. Invalid classList type
// @ts-expect-error
div({ classList: "string-not-array" });
