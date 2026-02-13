import {
  div,
  button,
  input,
  h1,
  p,
  span,
  a,
  img,
  ul,
  table,
  li,
  strong,
  summary,
  option,
  code,
  td,
} from "./elements";
import type { SmartElement } from "./SmartElement";

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
    e.currentTarget.classList;
  },
});

// 6. Reactive Props (Signal unwrap)
// Mocking signal for type test
type Signal<T> = (() => T) & { value: T } & { peek(): T };
const sig = null as any as Signal<string>;

input({
  value: sig, // Should be accepted
  oninput: (e) => {
    // e.currentTarget.value should be string, not Signal
    const val = e.currentTarget.value;
  },
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
  onclick: (e) => {
    // @ts-expect-error - nonExistentProp doesn't exist on HTMLButtonElement
    e.currentTarget.nonExistentProp;
  },
});

// 4. Invalid classList type
// @ts-expect-error
div({ classList: "string-not-array" });

// =============================================================================
// TEXT SHORTHAND VALID USAGE
// =============================================================================

// Text-holding elements with text shorthand
h1("Hello World");
p("Paragraph text");
div("Div content");
span("Inline text");
code("const x = 1");
li("List item");
td("Cell");

// Text + props
h1("Title", { class: "hero", id: "main" });
p("Important", { class: "highlight" });
div("Content", { style: { color: "red" } });

// Text + children
div("Prefix: ", () => {
  strong("bold");
});

// Text + props + children
p("Note: ", { class: "note" }, () => {
  strong("important");
});

// Reactive text
const textSig = null as any as Signal<string>;
span(textSig);
h1(textSig, { class: "reactive" });

// Number text
span(42);
div(100, { class: "number" });

// =============================================================================
// INTERACTIVE ELEMENT SHORTHAND VALID USAGE
// =============================================================================

// Text only
button("Click me");
summary("Details");
option("Option 1");

// Text + onclick handler
button("Submit", () => {});
button("Click", (e) => {
  console.log(e);
});

// Text + props
button("Save", { disabled: true, class: "btn" });
summary("Show", { class: "summary" });

// Reactive text on interactive
button(textSig);
button(textSig, () => {});

// =============================================================================
// IMG SHORTHAND VALID USAGE
// =============================================================================

// src only
img("/logo.png");
img("https://example.com/image.jpg");
img("data:image/png;base64,abc123");

// src + alt
img("/avatar.jpg", "User avatar");
img("https://example.com/photo.webp", "Photo");

// src + alt + props
img("/photo.webp", "Photo", { loading: "lazy" });
img("/banner.png", "Banner", { class: "hero-image", width: 800 });

// Props only (existing)
img({ src: "/test.png", alt: "Test" });

// =============================================================================
// ANCHOR SHORTHAND VALID USAGE
// =============================================================================

// href only
a("/home");
a("https://example.com");
a("#section");
a("mailto:test@example.com");

// href + text
a("/about", "About Us");
a("https://github.com", "GitHub");

// href + text + props
a("https://external.com", "External", { target: "_blank" });
a("/page", "Link", { class: "nav-link", rel: "noopener" });

// href + reactive text
a("/link", textSig);
a("/page", textSig, { class: "reactive" });

// Props only (existing)
a({ href: "/", textContent: "Home" });

// Children only (existing)
a(() => {
  span("Link content");
});

// Props + children (existing)
a({ href: "/page" }, () => {
  span("Complex link");
});

// =============================================================================
// CONTAINER ELEMENTS - NO TEXT SHORTHAND (existing behavior only)
// =============================================================================

// These should only accept props/children patterns, not text shorthand
ul({ class: "list" });
ul(() => {
  li("item");
});
ul({ class: "list" }, () => {
  li("item");
});

table({ class: "data" });
table(() => {});
table({ class: "data" }, () => {});

// =============================================================================
// BACKWARD COMPATIBILITY
// =============================================================================

// All existing patterns still work
div();
div({ class: "container" });
div(() => {
  span("child");
});
div({ class: "wrapper" }, () => {
  p("content");
});

button();
button({ onclick: () => {} });
button(() => {
  span("icon");
});
button({ class: "btn" }, () => {
  span("text");
});

// =============================================================================
// INVALID SHORTHAND USAGE (Should fail compilation)
// =============================================================================

// Container elements should NOT accept text as first argument
// @ts-expect-error - ul should not accept text shorthand
ul("item");

// @ts-expect-error - table should not accept text shorthand
table("content");

// Void elements (except img) should not accept text shorthand
// @ts-expect-error - input is void, no text shorthand
input("text");

// Invalid img shorthand - first arg must look like src
// @ts-expect-error - objects aren't valid for src position shorthand
img({ invalid: true }, "alt");
