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
  base,
  textarea,
  form,
} from "./elements";

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
    void text;

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
    void val;
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
button("Submit", () => { });
button("Click", (e) => {
  console.log(e);
});

// Text + props
button("Save", { disabled: true, class: "btn" });
summary("Show", { class: "summary" });

// Reactive text on interactive
button(textSig);
button(textSig, () => { });

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
table(() => { });
table({ class: "data" }, () => { });

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
button({ onclick: () => { } });
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

// =============================================================================
// VOID ELEMENTS - SMART TYPED PATH
// =============================================================================

// Discriminated variants accepted; handlers see the concrete element
const emailInput = input({
  type: "email",
  value: "a@b.c",
  oninput: (e) => {
    const v: string = e.currentTarget.value;
    void v;
  },
});
void emailInput;

// base element attributes are typed
base({ href: "https://example.com/", target: "_blank" });

// data-* attributes allowed on void elements
input({ type: "text", "data-testid": "name" });

// @ts-expect-error - unknown props are rejected on void elements
input({ type: "text", unknownProp: 1 });

// @ts-expect-error - checked is a checkbox/radio prop, invalid on text inputs
input({ type: "text", checked: true });

// @ts-expect-error - email inputs take string values
input({ type: "email", value: 123 });

// @ts-expect-error - checkbox checked must be boolean
input({ type: "checkbox", checked: "yes" });

// =============================================================================
// HANDLER-ONLY PROPS (regression: P inference from context-sensitive functions)
// =============================================================================

// A props literal whose only members are event handlers must still infer
// P and contextually type the event parameter on every factory kind.
textarea({ onchange: (e) => { void e.currentTarget.value; } });
div({ onclick: (e) => { void e.currentTarget.classList; } });
input({ oninput: (e) => { void e.currentTarget.value; } });
button({ onclick: (e) => { void e.currentTarget.disabled; } });

// =============================================================================
// EVENT TARGET NARROWING
// =============================================================================

// On childless elements, e.target is the element itself
input({
  type: "text",
  oninput: (e) => {
    const v: string = e.target.value;
    void v;
  },
});

textarea({
  onchange: (e) => {
    const v: string = e.target.value;
    void v;
  },
});

img({
  src: "/logo.png",
  onload: (e) => {
    const w: number = e.target.naturalWidth;
    void w;
  },
});

// On containers, target may be any descendant — stays Element
div({
  onchange: (e) => {
    // @ts-expect-error - target is Element on containers, not the div
    void e.target.value;
  },
});

// =============================================================================
// EVENT HANDLER MAP COMPLETENESS
// =============================================================================

// Toggle events carry ToggleEvent (newState/oldState)
div({
  popover: "auto",
  onbeforetoggle: (e) => {
    const s: string = e.newState;
    void s;
  },
  ontoggle: (e) => {
    void e.oldState;
  },
});

// beforeinput is an InputEvent
input({
  type: "text",
  onbeforeinput: (e) => {
    const t: string | null = e.data;
    void t;
  },
});

// click handlers receive PointerEvent
button({
  onclick: (e) => {
    const id: number = e.pointerId;
    void id;
  },
});

// formdata carries the FormData payload
form({
  onformdata: (e) => {
    void e.formData.get("name");
  },
});

// pointer capture, dialog close, auxclick exist
div({
  ongotpointercapture: (e) => void e.pointerId,
  onlostpointercapture: (e) => void e.pointerId,
  onauxclick: (e) => void e.button,
});

// Interactive shorthand handler is typed (element + PointerEvent)
button("Save", (e) => {
  e.currentTarget.disabled = true;
  void e.pointerId;
});

// =============================================================================
// HOVER QUALITY: handler event types are single-sourced
// =============================================================================

// Locks against the double-contextual-source regression where handler params
// were typed as a union of near-identical event types, producing hovers like
// "(EventTarget & HTMLInputElement) | (EventTarget & HTMLInputElement & Element)".
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

input({
  type: "email",
  oninput: (e) => {
    const targetIsExact: Equal<typeof e.target, EventTarget & HTMLInputElement> = true;
    const currentTargetIsExact: Equal<typeof e.currentTarget, EventTarget & HTMLInputElement> = true;
    void targetIsExact;
    void currentTargetIsExact;
  },
});

// Text/interactive/anchor/img factories resolve to the generic overloads, so
// props narrow the returned element and style values get validated.
{
  const d = div({ id: "main", style: { display: "grid" } });
  const id: "main" = d.id;
  const display: "grid" | (string & {}) = d.style.display;
  d.style.setProperty("--x", "1"); // declaration methods survive narrowing
  const b = button("Save", { type: "submit" });
  const type: "submit" = b.type;
  const s = span({ title: "hint" }, () => {});
  const title: "hint" = s.title;
  void id;
  void display;
  void type;
  void title;
}
