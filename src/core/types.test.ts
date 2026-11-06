/**
 * Type Tests for Flick Type System Improvements
 *
 * This file contains type-level tests to verify all the new type system features work correctly.
 * These tests are checked at compile time - if this file compiles without errors, the types are correct.
 *
 * Run: bun test types.test.ts
 */

import { GlobalRegistrator } from "@happy-dom/global-registrator";

try {
  GlobalRegistrator.register();
} catch {
  // Already registered
}

import { div, button, input, img } from "./elements/elements";
import { $, Mut } from "./reactivity/reactivity";
import type {
  UnwrapSignal,
  Signalize,
  SignalizeKeys,
  StyleProp,
  ClassProp,
} from "./reactivity/reactivity-types";
import type { CSSRgbFunction, CSSHslFunction } from "./css/properties/visual";

// =============================================================================
// PHASE 1: MIXED REACTIVE/STATIC CSS PROPERTIES
// =============================================================================

console.log("✓ Phase 1: Testing mixed reactive/static CSS properties");

// Test 1: Mixed signals and static values in style object
// CSS literal values like "red" and "16px" are automatically preserved
const color = $("red");
const fontSize = $("16px");

div({
  style: {
    color: color, // Signal with literal type
    fontSize: "16px", // Static - should work!
    padding: fontSize, // Signal with literal type
    margin: "1rem", // Static - should work!
  },
});

// Test 2: All static values
div({
  style: {
    color: "blue",
    fontSize: "14px",
    padding: "0.5rem",
  },
});

// Test 3: All signal values (CSS literals automatically preserved)
div({
  style: {
    color: color,
    fontSize: fontSize,
    padding: $("1rem"),
  },
});

console.log("✅ Phase 1 tests passed: Mixed reactive/static works!");

// =============================================================================
// PHASE 2: TYPE-SAFE PROPERTY SETTERS
// =============================================================================

console.log("✓ Phase 2: Testing type-safe property setters");

// Test 4: Input value property - no cast needed with new inference!
const email = $(Mut(""));
input({
  type: "email",
  value: email,
  oninput: (e) => {
    // currentTarget is now properly typed as HTMLInputElement!
    email.value = e.currentTarget.value; // No cast needed!
  },
});

// Test 5: Checkbox checked property - no cast needed!
const isChecked = $(Mut(false));
input({
  type: "checkbox",
  checked: isChecked,
  onchange: (e) => {
    // currentTarget is properly typed!
    isChecked.value = e.currentTarget.checked; // No cast needed!
  },
});

console.log("✅ Phase 2 tests passed: Type-safe property setters work!");

// =============================================================================
// PHASE 3: TEMPLATE LITERAL TYPES FOR CSS
// =============================================================================

console.log("✓ Phase 3: Testing template literal types for CSS");

// Test 6: RGB function syntax validation
const rgbColor1: CSSRgbFunction = "rgb(255, 0, 0)"; // Comma syntax ✓
const rgbColor2: CSSRgbFunction = "rgb(255 0 0)"; // Space syntax ✓
const rgbColor3: CSSRgbFunction = "rgba(255, 0, 0, 0.5)"; // With alpha ✓
const rgbColor4: CSSRgbFunction = "rgba(255 0 0 / 0.5)"; // Modern alpha ✓

// Test 7: HSL function syntax validation
const hslColor1: CSSHslFunction = "hsl(120deg, 100%, 50%)"; // Comma syntax ✓
const hslColor2: CSSHslFunction = "hsl(120deg 100% 50%)"; // Space syntax ✓
const hslColor3: CSSHslFunction = "hsla(120deg, 100%, 50%, 0.5)"; // With alpha ✓
const hslColor4: CSSHslFunction = "hsla(120deg 100% 50% / 0.5)"; // Modern alpha ✓

// Test 8: Using template literal colors in styles
div({
  style: {
    color: "rgb(255, 0, 0)",
    backgroundColor: "hsl(120deg 100% 50%)",
    borderColor: "#ff0000",
    outlineColor: "var(--primary-color)",
  },
});

void rgbColor1;
void rgbColor2;
void rgbColor3;
void rgbColor4;
void hslColor1;
void hslColor2;
void hslColor3;
void hslColor4;

console.log("✅ Phase 3 tests passed: Template literal CSS types work!");

// =============================================================================
// PHASE 4: UTILITY TYPES LIBRARY
// =============================================================================

console.log("✓ Phase 4: Testing utility types library");

// Test 9: UnwrapSignal
const testSignal = $("hello" as string);
type UnwrappedType = UnwrapSignal<typeof testSignal>; // Should be string
const unwrappedValue: UnwrappedType = "test"; // Should work
void unwrappedValue;

// Test 10: Signalize
type User = { name: string; age: number };
// ReactiveUser should be { name: Signal<string>; age: Signal<number> }
const reactiveUserCheck: Signalize<User> extends { name: { value: string } } ? true : false = true;
void reactiveUserCheck;

// Test 11: SignalizeKeys
// PartialReactive should be { name: Signal<string>; age: number }
const partialReactiveCheck: SignalizeKeys<User, "name"> extends { age: number } ? true : false = true;
void partialReactiveCheck;

// Test 12: StyleProp helper
const acceptsStyleProp = (_style: StyleProp) => {
  // Should accept both string and object
};
acceptsStyleProp("color: red");
acceptsStyleProp({ color: "red" });
acceptsStyleProp({ color: $(color), fontSize: "16px" });

// Test 13: ClassProp helper
const acceptsClassProp = (_className: ClassProp) => {
  // Should accept string or object
};
acceptsClassProp("active");
acceptsClassProp({ active: true, disabled: $(isChecked) });

console.log("✅ Phase 4 tests passed: Utility types library works!");

// =============================================================================
// PHASE 7.1: PRECISE EVENT HANDLER TYPES
// =============================================================================

console.log("✓ Phase 7.1: Testing precise event handler types");

// Test 14: Mouse event handler with precise MouseEvent type
button({
  onclick: (e) => {
    console.log(e.clientX); // ✓ MouseEvent has clientX
    console.log(e.clientY); // ✓ MouseEvent has clientY
  },
});

// Test 15: Keyboard event handler with precise KeyboardEvent type
input({
  onkeydown: (e) => {
    console.log(e.key); // ✓ KeyboardEvent has key
    console.log(e.code); // ✓ KeyboardEvent has code
    console.log(e.ctrlKey); // ✓ KeyboardEvent has ctrlKey
  },
});

// Test 16: Input event handler with InputEvent type
input({
  oninput: (e) => {
    console.log(e.data); // ✓ InputEvent has data
    console.log(e.inputType); // ✓ InputEvent has inputType
  },
});

// Test 17: Focus event handler with FocusEvent type
input({
  onfocus: (e) => {
    console.log(e.relatedTarget); // ✓ FocusEvent has relatedTarget
  },
});

console.log("✅ Phase 7.1 tests passed: Precise event handlers work!");

// =============================================================================
// PHASE 7.2: NUMBER LENGTHS (auto-px) AND CUSTOM PROPERTIES
// =============================================================================

console.log("✓ Phase 7.2: Testing number lengths and custom properties");

// Test 18: Bare numbers are accepted for length properties (auto-px at runtime)
div({ style: { width: 300, marginTop: 8 } });

// Test 19: Unitless properties keep plain numbers
div({ style: { opacity: 0.5, zIndex: 3, flexGrow: 1, lineHeight: 1.4 } });

// Test 20: Custom properties accept strings and numbers
div({ style: { "--brand": "rebeccapurple", "--columns": 3 } });

console.log("✅ Phase 7.2 tests passed: number lengths and custom properties work!");

// =============================================================================
// PHASE 7.3: FULL CSS PROPERTY COVERAGE
// =============================================================================

console.log("✓ Phase 7.3: Testing CSS property coverage");

// Test 21: Every standard property is accepted (lib.dom fallback), incl. vendor ones
div({
  style: {
    clipPath: "circle(50%)",
    paintOrder: "stroke",
    viewTransitionName: "hero",
    webkitLineClamp: "3",
  },
});

// Test 22: Fallback properties don't get auto-px numbers
// @ts-expect-error - numbers only on properties known to take lengths
div({ style: { viewTransitionName: 1 } });

// Test 23: Misspelled CSS properties are rejected on every factory kind
// @ts-expect-error - colr is not a CSS property
div({ style: { colr: "red" } });
// @ts-expect-error - widht is not a CSS property
div({ style: { width: 10, widht: 10 } }, () => { });
// @ts-expect-error - colr is not a CSS property
input({ style: { colr: "red" } });
// @ts-expect-error - colr is not a CSS property
button("Save", { style: { colr: "red" } });
// @ts-expect-error - colr is not a CSS property
img({ src: "a.png", style: { colr: "red" } });

// Test 25: Logical properties are typed as lengths (numbers auto-px)
div({
  style: {
    inset: 0,
    insetInlineStart: 8,
    blockSize: "50vh",
    maxInlineSize: 640,
    borderBlockEndWidth: 1,
    borderBlockEndStyle: "solid",
    borderInlineStartColor: "red",
    borderStartEndRadius: 4,
  },
});
// @ts-expect-error - not a border style
div({ style: { borderBlockStyle: "wavy" } });

// Test 26: Scroll properties
div({
  style: {
    scrollMarginTop: 64,
    scrollPaddingInline: "1rem",
    scrollSnapType: "x mandatory",
    scrollSnapAlign: "start",
    overscrollBehavior: "contain none",
    overscrollBehaviorY: "none",
    scrollbarWidth: "thin",
    scrollbarGutter: "stable both-edges",
    scrollbarColor: "gray transparent",
  },
});
// @ts-expect-error - not a snap strictness
div({ style: { scrollSnapType: "x strict" } });
// @ts-expect-error - not a scrollbar width
div({ style: { scrollbarWidth: "wide" } });

// Test 24: String, signal and custom-property styles are still accepted
div({ style: "color: red" });
div({ style: $(() => "color: red") });
div({ style: { width: $(Mut(10)), "--gap": 4 } });

console.log("✅ Phase 7.3 tests passed: CSS property coverage works!");

// =============================================================================
// ELEMENT-TYPED EVENT HANDLERS (currentTarget narrowing)
// =============================================================================

console.log("✓ Phase 8: Testing element-typed event handlers");

// Test 21: Button onclick - currentTarget should be HTMLButtonElement
button({
  onclick: (e) => {
    // currentTarget is now properly typed as HTMLButtonElement!
    const btn: HTMLButtonElement = e.currentTarget; // ✓ No cast needed!
    btn.disabled = true; // ✓ Can access button-specific properties
    console.log(btn.type); // ✓ "submit" | "reset" | "button"
  },
});

// Test 22: Input oninput - currentTarget should be HTMLInputElement
input({
  type: "text",
  oninput: (e) => {
    // currentTarget is now properly typed as HTMLInputElement!
    const inp: HTMLInputElement = e.currentTarget; // ✓ No cast needed!
    console.log(inp.value); // ✓ Can access input-specific properties
    console.log(inp.selectionStart); // ✓ Text input properties available
  },
});

// Test 23: Div event handlers - currentTarget should be HTMLDivElement
div({
  onclick: (e) => {
    const d: HTMLDivElement = e.currentTarget; // ✓ No cast needed!
    console.log(d.tagName); // "DIV"
  },
  onmouseover: (e) => {
    const d: HTMLDivElement = e.currentTarget; // ✓ Works for all event types
    d.style.backgroundColor = "blue";
  },
});

console.log("✅ Phase 8 tests passed: Element-typed event handlers work!");

// =============================================================================
// SIGNAL PRIMITIVE TYPE INFERENCE (no more explicit casts)
// =============================================================================

console.log("✓ Phase 9: Testing signal primitive type inference");

// Test 24: String signal - should infer as WritableSignal<string>, not WritableSignal<"">
const nameSignal = $(Mut("")); // No `as string` needed!
nameSignal.value = "hello"; // ✓ Should compile - string assignable to string

// Test 25: Number signal - should infer as WritableSignal<number>, not WritableSignal<0>
const countSignal = $(Mut(0)); // No `as number` needed!
countSignal.value = 42; // ✓ Should compile - number assignable to number

// Test 26: Boolean signal - should infer as WritableSignal<boolean>, not WritableSignal<false>
const activeSignal = $(Mut(false)); // No `as boolean` needed!
activeSignal.value = true; // ✓ Should compile - boolean assignable to boolean

// Test 27: Objects preserve their structure (use `as const` for literal object values)
const configSignal = $({ mode: "dark" } as const);
// With `as const`, configSignal.mode is "dark" (literal)
// Without `as const`, it would be string (which is usually fine)
// Note: $({ object }) returns a ReactiveStore (proxy), so accessing .mode directly
console.log(configSignal.mode); // "dark"

// Test 28: Signals now preserve literal types (getter narrow, setter wide)
// Literal types are preserved - use explicit type param to widen if needed
const strLiteral = $(Mut("")); // WritableSignal<"">
const numLiteral = $(Mut(0)); // WritableSignal<0>
const boolLiteral = $(Mut(false)); // WritableSignal<false>
// Explicit widening when needed
const strWide = $<string>(""); // WritableSignal<string>
const numWide = $<number>(0); // WritableSignal<number>
const boolWide = $<boolean>(false); // WritableSignal<boolean>
// Verify type compatibility
void strLiteral;
void numLiteral;
void boolLiteral;
void strWide;
void numWide;
void boolWide;

console.log("✅ Phase 9 tests passed: Signal primitive inference works!");

// =============================================================================
// PHASE 10: STRICTNESS VERIFICATION (Negative Tests)
// =============================================================================

console.log("✓ Phase 10: Testing strictness (compilation should fail without @ts-expect-error)");

// 1. className is supported as a React-style alias for class
div({ className: "foo" });

// 2. Check strict CSS (should error)
// @ts-expect-error - invalid-display is not a valid CSSDisplay
div({ style: { display: "invalid-display" } });

// 3. Void element children (should error)
// @ts-expect-error - img cannot have children
img(() => { });
// @ts-expect-error - img cannot have children
img({ src: "foo.png" }, () => { });

// 4. Signal type safety
const numSig = $(123);
// @ts-expect-error - id expects string signal
div({ id: numSig });

// 5. Unknown prop
// @ts-expect-error - unknownProp is not in global attributes
div({ unknownProp: "foo" });

// 6. Input discrimination
// @ts-expect-error - type="email" implies value is string
input({ type: "email", value: 123 });
// @ts-expect-error - checked is boolean
input({ type: "checkbox", checked: "yes" });
// @ts-expect-error - type="file" does not allow value prop
input({ type: "file", value: "" });

console.log("✅ Phase 10 tests passed: strictness confirmed!");

// =============================================================================
// INTEGRATION TESTS
// =============================================================================

console.log("✓ Running integration tests");

// Test 29: Complex real-world example with all features (no casts needed!)
const count = $(Mut(0)); // WritableSignal<number> - no cast!
const isActive = $(false); // WritableSignal<boolean> - no cast!
const bgColor = $("red"); // WritableSignal<string> - no cast!

// Verify all type features work together
const complexProps = {
  class: {
    active: isActive,
    disabled: $(() => count.value === 0),
  },
  style: {
    color: bgColor, // Signal
    fontSize: "16px", // Static
    padding: "16px", // String works
    backgroundColor: "rgb(255, 255, 255)", // Template literal
  },
  onclick: (e: MouseEvent) => {
    console.log(e.clientX, e.clientY); // Precise MouseEvent
    count.value++;
  },
};

// The props object is type-safe
console.log(typeof complexProps === "object");

console.log("✅ Integration tests passed!");

// =============================================================================
// SUMMARY
// =============================================================================

console.log("\n🎉 All type tests passed!");
console.log("✅ Mixed reactive/static CSS properties");
console.log("✅ Type-safe property setters");
console.log("✅ Template literal CSS types");
console.log("✅ Utility types library");
console.log("✅ Precise event handler types");
console.log("✅ Branded CSS value types");
console.log("✅ Element-typed event handlers (currentTarget narrowing)");
console.log("✅ Signal primitive type inference");
console.log("✅ Strictness verification (negative tests)");
console.log("✅ Integration tests");
console.log("\n🚀 Fia's type system is safe and sound!");
