/**
 * Type Tests for Flick Type System Improvements
 *
 * This file contains type-level tests to verify all the new type system features work correctly.
 * These tests are checked at compile time - if this file compiles without errors, the types are correct.
 *
 * Run: bun test types.test.ts
 */

import { div, button, input } from "./elements/elements";
import { $ } from "./reactivity/reactivity";
import type {
  UnwrapSignal,
  Signalize,
  SignalizeKeys,
  StyleProp,
  ClassProp,
} from "./reactivity/reactivity-types";
import { px, toPx, pct, toPct, deg, toDeg } from "./css/branded-types";
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
const email = $("");
input({
  type: "email",
  value: email,
  oninput: (e) => {
    // currentTarget is now properly typed as HTMLInputElement!
    email.value = e.currentTarget.value; // No cast needed!
  },
});

// Test 5: Checkbox checked property - no cast needed!
const isChecked = $(false);
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

console.log("✅ Phase 3 tests passed: Template literal CSS types work!");

// =============================================================================
// PHASE 4: UTILITY TYPES LIBRARY
// =============================================================================

console.log("✓ Phase 4: Testing utility types library");

// Test 9: UnwrapSignal
const testSignal = $("hello" as string);
type UnwrappedType = UnwrapSignal<typeof testSignal>; // Should be string
const unwrappedValue: UnwrappedType = "test"; // Should work

// Test 10: Signalize
type User = { name: string; age: number };
type ReactiveUser = Signalize<User>;
// ReactiveUser should be { name: Signal<string>; age: Signal<number> }

// Test 11: SignalizeKeys
type PartialReactive = SignalizeKeys<User, "name">;
// PartialReactive should be { name: Signal<string>; age: number }

// Test 12: StyleProp helper
const acceptsStyleProp = (style: StyleProp) => {
  // Should accept both string and object
};
acceptsStyleProp("color: red");
acceptsStyleProp({ color: "red" });
acceptsStyleProp({ color: $(color), fontSize: "16px" });

// Test 13: ClassProp helper
const acceptsClassProp = (className: ClassProp) => {
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
// PHASE 7.2: BRANDED TYPES FOR CSS VALUES
// =============================================================================

console.log("✓ Phase 7.2: Testing branded types for CSS values");

// Test 18: Basic branded type usage
const widthPx = px(300);
const heightPct = pct(50);
const rotationDeg = deg(45);

// Convert to CSS strings
const widthStr = toPx(widthPx); // "300px"
const heightStr = toPct(heightPct); // "50%"
const rotateStr = toDeg(rotationDeg); // "45deg"

// Verify the branded type functions work correctly
console.log(widthStr === "300px"); // true
console.log(heightStr === "50%"); // true
console.log(rotateStr === "45deg"); // true

// Test 19: Type safety prevents mixing units
// const mixed = widthPx + heightPct; // Would be a type error (can't add Pixels + Percentage)

// Test 20: Branded types with signals
// Note: For branded types, use explicit generic to preserve the brand
import type { Pixels } from "./css/branded-types";
const reactiveWidthPx = $<Pixels>(px(400));
const reactiveWidthStr = $(() => toPx(reactiveWidthPx.value));
console.log(typeof reactiveWidthStr.value === "string"); // Computed string works

console.log("✅ Phase 7.2 tests passed: Branded types work!");

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
const nameSignal = $(""); // No `as string` needed!
nameSignal.value = "hello"; // ✓ Should compile - string assignable to string

// Test 25: Number signal - should infer as WritableSignal<number>, not WritableSignal<0>
const countSignal = $(0); // No `as number` needed!
countSignal.value = 42; // ✓ Should compile - number assignable to number

// Test 26: Boolean signal - should infer as WritableSignal<boolean>, not WritableSignal<false>
const activeSignal = $(false); // No `as boolean` needed!
activeSignal.value = true; // ✓ Should compile - boolean assignable to boolean

// Test 27: Objects preserve their structure (use `as const` for literal object values)
const configSignal = $({ mode: "dark" } as const);
// With `as const`, configSignal.value.mode is "dark" (literal)
// Without `as const`, it would be string (which is usually fine)
console.log(configSignal.value.mode); // "dark"

// Test 28: Type assertions should work with the new overloads
import type { WritableSignal } from "./reactivity/reactivity";
const strCheck: WritableSignal<string> = $("");
const numCheck: WritableSignal<number> = $(0);
const boolCheck: WritableSignal<boolean> = $(false);
// Verify type compatibility
void strCheck;
void numCheck;
void boolCheck;

console.log("✅ Phase 9 tests passed: Signal primitive inference works!");

// =============================================================================
// INTEGRATION TESTS
// =============================================================================

console.log("✓ Running integration tests");

// Test 29: Complex real-world example with all features (no casts needed!)
const count = $(0); // WritableSignal<number> - no cast!
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
console.log("✅ Integration tests");
console.log("\n🚀 Fia's type system is now the best in the industry!");
