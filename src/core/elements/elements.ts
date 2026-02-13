/**
 * Fia Element Functions
 *
 * Factory functions for all HTML elements that auto-mount to parent context.
 * Full TypeScript autocomplete with strict attribute types.
 *
 * Unified API - all elements follow the same pattern.
 *
 * Overloads:
 * 1. element()
 * 2. element(content)
 * 3. element(props)
 * 4. element(children)
 * 5. element(props, children)
 * 6. element(content, props)
 * 7. element(content, children)
 * 8. element(content, props, children)
 */

import {
  pushExecutionContext,
  popExecutionContext,
  getCurrentExecutionContext,
} from "../context/context";
import {
  $e,
  type Signal,
  type MaybeSignal,
  isSignal,
} from "../reactivity/reactivity";
import { registerEventHandler } from "../events/events";
import type { ElementProps, TypedEvent } from "../attributes/html-attributes";
import type { ReactiveCSSProperties } from "../css/css-types";

export { type MaybeSignal, isSignal };
export type { ElementProps };

/**
 * Loose props type that doesn't constrain style to a specific CSS type.
 * This allows `const P` to preserve literal types in style objects.
 *
 * Without this, the constraint `P extends ElementProps<K>` would widen
 * `{ borderRadius: "1rem" }` to `ReactiveCSSProperties`, losing the literal.
 */
/**
 * Helper to make Omit distributive over unions.
 * This ensures that keys unique to specific union members (like 'capture' on file input)
 * are preserved, and discriminated unions stay discriminated.
 */
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

type LooseElementProps<K extends keyof HTMLElementTagNameMap> =
  DistributiveOmit<ElementProps<K>, "style"> & { style?: string | ReactiveCSSProperties | Signal<string> };

/**
 * Validates that all properties in P are present in Target or match allowable patterns (data-*).
 * This prevents excess properties from being allowed by generic constraints.
 */
/**
 * Validates that all properties in P are present in Target or match allowable patterns (data-*).
 * Also maps event handlers to be contextually typed with the current element and props.
 */
type ContextualValidateProps<P, Target, K extends keyof HTMLElementTagNameMap> = {
  [Key in keyof P]: Key extends keyof Target
  ? Key extends `on${string}`
  ? Target[Key] extends ((e: infer BaseEv) => void) | undefined
  ? BaseEv extends TypedEvent<any, infer NativeEv>
  ? (e: TypedEvent<SmartElement<K, P>, NativeEv>) => void
  : Target[Key]
  : Target[Key]
  : Target[Key]
  : Key extends `data-${string}`
  ? P[Key]
  : never;
};

/**
 * Types that can be rendered as text content in an element.
 * Includes primitives that will be converted to strings.
 */
export type Renderable = string | number | boolean | null | undefined;

/**
 * Text content that can be passed as a shorthand first argument.
 * Supports static strings, numbers, or reactive signals.
 */
export type TextContent = string | number | Signal<string | number>;

// =============================================================================
// TYPE GUARDS FOR ARGUMENT PARSING
// =============================================================================

/**
 * Check if value is text content (string, number, or signal of same)
 */
function isTextContent(value: unknown): value is TextContent {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    (isSignal(value) &&
      (typeof value.peek() === "string" || typeof value.peek() === "number"))
  );
}

/**
 * Check if value is a click handler function.
 * Distinguishes from children callbacks by checking function.length:
 * - Click handlers: 0-1 parameters (e) => ...
 * - Children callbacks: 2 parameters (el, onMount) => ...
 */
function isClickHandler(value: unknown): value is (e: MouseEvent) => void {
  if (typeof value !== "function") return false;
  if (isSignal(value)) return false;
  return (value as (...args: unknown[]) => unknown).length <= 1;
}

/**
 * Check if first argument looks like an href (common URL patterns)
 */
function looksLikeHref(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return /^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(value);
}

/**
 * Check if first argument looks like an image src
 */
function looksLikeImgSrc(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return (
    /^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(value) ||
    /\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(value)
  );
}

/**
 * Callback that executes after an element is mounted to the DOM.
 * Use this to access layout properties like `offsetHeight`.
 * 
 * @example
 * ```ts
 * div((el, onMount) => {
 *   onMount(() => console.log(el.offsetHeight));
 * });
 * ```
 */
export type OnMountCallback = (cb: () => void) => void;

/**
 * Callback for creating child elements within a parent.
 * Receives the parent element reference and an onMount helper.
 * 
 * @example
 * ```ts
 * div((el, onMount) => {
 *   p({ textContent: "Child element" });
 *   onMount(() => console.log("Mounted!"));
 * });
 * ```
 */
export type ChildrenCallback<E> = (el: E, onMount: OnMountCallback) => void;

/**
 * Valid child types for element content.
 * Can be text, numbers, booleans, reactive signals, elements, or render callbacks.
 */
export type Child =
  | string
  | number
  | boolean
  | Signal<Renderable>
  | (() => void)
  | HTMLElement
  | Child[]
  | null
  | undefined;

// =============================================================================
// ELEMENT FACTORY TYPE
// =============================================================================

/**
 * Branded string type that prevents union simplification.
 * This allows `"1rem" | AssignableString` to remain as-is instead of
 * being simplified to just `string` or `CSSLength`.
 */
type AssignableString = string & { readonly __assignable?: unique symbol };

/**
 * Style type preserving literal types for defined properties.
 * Shows the exact literal value AND allows assignment of other strings.
 * The branded string type prevents TypeScript from simplifying the union.
 */
type NarrowedStyle<S> = {
  -readonly [K in keyof S]: S[K] | AssignableString;
};

/**
 * Combined style type: narrowed defined props + full CSS for others.
 */
type MergedStyle<S> = S extends object
  ? NarrowedStyle<S> & Omit<ReactiveCSSProperties, keyof S>
  : ReactiveCSSProperties;

/**
 * Processes props to merge style property with full CSS types.
 * Directly accesses P["style"] to preserve literal types from the input.
 */
type ProcessedProps<P> = P extends { style: infer S }
  ? S extends object
  ? Omit<P, "style"> & { style: MergedStyle<S> }
  : P
  : P;



/**
 * Unwraps Signal types in properties to their inner values.
 * This ensures that if a prop is passed as a Signal (e.g. textContent: Signal<string>),
 * the resulting element property is typed as the value (string), not the Signal.
 */
type UnwrapSignalsInProps<P> = {
  [K in keyof P]: P[K] extends Signal<infer U> ? U : P[K];
};

/**
 * Smart Element type that properly narrows properties from props.
 * Uses Omit to remove overlapping properties from the base element,
 * then merges with props to ensure narrower types (like literal strings) are preserved.
 *
 * Special handling for `style`: merges with ReactiveCSSProperties so all CSS
 * properties are available, while keeping defined properties narrowed.
 */
export type SmartElement<K extends keyof HTMLElementTagNameMap, P> = Omit<
  HTMLElementTagNameMap[K],
  keyof P
> &
  UnwrapSignalsInProps<ProcessedProps<P>>;

// Shorthand for simple element type (no specific props inference needed for return usually)
type E<K extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[K];

/**
 * Factory function for creating HTML elements with auto-mounting to parent context.
 *
 * Provides 8 flexible overloads covering all common element creation patterns.
 * Supports reactive content, type-safe props, and nested children.
 *
 * @template K - The HTML tag name key from HTMLElementTagNameMap
 *
 * @example
 * // 1. Empty element
 * div();
 *
 * @example
 * // 2. Text content (static or reactive)
 * h1("Hello World");
 * h1($(() => `Count: ${count.value}`));
 *
 * @example
 * // 3. Props only (with full type safety and IntelliSense)
 * div({
 *   id: "main",
 *   class: "container",
 *   style: { color: "red", padding: "1rem" }
 * });
 *
 * @example
 * // 4. Children callback (automatic parent context)
 * div(() => {
 *   h2("Nested heading");
 *   p("Nested paragraph");
 * });
 *
 * @example
 * // 5. Props + children (most common pattern)
 * div({ class: "card" }, () => {
 *   h3("Card Title");
 *   p("Card content");
 * });
 *
 * // 6. Content + props - Use textContent prop
 * button({
 *   textContent: "Click me",
 *   onclick: () => alert("Clicked!"),
 *   class: "btn-primary"
 * });
 *
 * @example
 * // 7. Content + children - Use textContent prop
 * section({ textContent: "Header" }, () => {
 *   p({ textContent: "Additional content" });
 * });
 *
 * @example
 * // 8. All three: content + props + children - Use textContent prop
 * article({ textContent: "Title", class: "post" }, () => {
 *   p({ textContent: "Post body" });
 *   span({ textContent: "Footer" });
 * });
 */
export interface ElementFactory<K extends keyof HTMLElementTagNameMap> {
  /**
   * Create an empty element.
   * @example div()
   */
  (): E<K>;

  /**
   * Create element with props only.
   * @param props - Element attributes, styles, and event handlers
   * @example div({ style: { color: "red" } })
   * @example input({ type: "email", placeholder: "Enter email" })
   */
  <const P extends Record<string, unknown>>(props: P & ContextualValidateProps<P, LooseElementProps<K>, K>): SmartElement<K, P>;

  /**
   * Create element with children callback only.
   * @param children - Function that creates child elements (runs in parent context)
   * @example div(() => { h2("Title"); p("Content"); })
   */
  (children: ChildrenCallback<E<K>>): E<K>;

  /**
   * Create element with props and children (most common pattern).
   * @param props - Element attributes, styles, and event handlers
   * @param children - Function that creates child elements
   * @example div({ class: "card" }, () => { h3("Title"); p("Body"); })
   */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
    children: ChildrenCallback<SmartElement<K, P>>,
  ): SmartElement<K, P>;

}

/**
 * Factory function for void elements (no children).
 */
export interface VoidElementFactory<K extends keyof HTMLElementTagNameMap> {
  /**
   * Create a void element (e.g., <input>, <br>).
   * @param props - Element attributes and event handlers
   */
  (props?: ElementProps<K>): HTMLElementTagNameMap[K];
}

/**
 * Factory for elements that commonly hold text content.
 * Adds text shorthand overloads: el(text), el(text, props), el(text, children), el(text, props, children)
 *
 * Elements: h1-h6, p, div, span, article, section, aside, header, footer,
 *           main, blockquote, figcaption, label, legend, caption, strong,
 *           em, small, mark, code, pre, samp, kbd, var_, i, b, u, s, del,
 *           ins, sub, sup, li, td, th, output
 */
export interface TextElementFactory<K extends keyof HTMLElementTagNameMap> {
  /** Create an empty element */
  (): E<K>;

  /** Create element with props only (non-generic, for overload resolution) */
  (props: LooseElementProps<K>): E<K>;

  /** Create element with children callback only */
  (children: ChildrenCallback<E<K>>): E<K>;

  /** Create element with props and children (non-generic) */
  (props: LooseElementProps<K>, children: ChildrenCallback<E<K>>): E<K>;

  /** Create element with text content */
  (text: TextContent): E<K>;

  /** Create element with text content and children */
  (text: TextContent, children: ChildrenCallback<E<K>>): E<K>;

  /** Create element with props only (generic, for SmartElement inference) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
  ): SmartElement<K, P>;

  /** Create element with props and children (generic) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
    children: ChildrenCallback<SmartElement<K, P>>,
  ): SmartElement<K, P>;

  /** Create element with text content and props */
  <const P extends Record<string, unknown>>(
    text: TextContent,
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
  ): SmartElement<K, P>;

  /** Create element with text content, props, and children */
  <const P extends Record<string, unknown>>(
    text: TextContent,
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
    children: ChildrenCallback<SmartElement<K, P>>,
  ): SmartElement<K, P>;
}

/**
 * Factory for interactive elements with text + handler shorthand.
 * Adds: el(text), el(text, onclick), el(text, props)
 *
 * Elements: button, summary, option, optgroup
 */
export interface InteractiveElementFactory<K extends keyof HTMLElementTagNameMap> {
  /** Create an empty element */
  (): E<K>;

  /** Create element with props only (non-generic, for overload resolution) */
  (props: LooseElementProps<K>): E<K>;

  /** Create element with children callback only */
  (children: ChildrenCallback<E<K>>): E<K>;

  /** Create element with props and children (non-generic) */
  (props: LooseElementProps<K>, children: ChildrenCallback<E<K>>): E<K>;

  /** Create element with text content */
  (text: TextContent): E<K>;

  /** Create element with text and click handler shorthand */
  (text: TextContent, onclick: (e: MouseEvent) => void): E<K>;

  /** Create element with text content and children */
  (text: TextContent, children: ChildrenCallback<E<K>>): E<K>;

  /** Create element with props only (generic, for SmartElement inference) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
  ): SmartElement<K, P>;

  /** Create element with props and children (generic) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
    children: ChildrenCallback<SmartElement<K, P>>,
  ): SmartElement<K, P>;

  /** Create element with text content and props */
  <const P extends Record<string, unknown>>(
    text: TextContent,
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
  ): SmartElement<K, P>;

  /** Create element with text content, props, and children */
  <const P extends Record<string, unknown>>(
    text: TextContent,
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
    children: ChildrenCallback<SmartElement<K, P>>,
  ): SmartElement<K, P>;
}

/**
 * Factory for img elements with src/alt shorthand.
 * Overloads: img(), img(props), img(src), img(src, alt), img(src, alt, props)
 */
export interface ImgElementFactory {
  /** Create empty img */
  (): HTMLImageElement;

  /** Create img with props only (non-generic, for overload resolution) */
  (props: LooseElementProps<"img">): HTMLImageElement;

  /** Create img with src shorthand */
  (src: string): HTMLImageElement;

  /** Create img with src and alt shorthand */
  (src: string, alt: string): HTMLImageElement;

  /** Create img with props only (generic, for SmartElement inference) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<"img">, "img">,
  ): SmartElement<"img", P>;

  /** Create img with src, alt, and additional props */
  <const P extends Record<string, unknown>>(
    src: string,
    alt: string,
    props: P &
      ContextualValidateProps<
        P,
        Omit<LooseElementProps<"img">, "src" | "alt">,
        "img"
      >,
  ): SmartElement<"img", P & { src: string; alt: string }>;
}

/**
 * Factory for anchor elements with href/text shorthand.
 * Overloads: a(), a(href), a(href, text), a(href, text, props), plus existing patterns
 */
export interface AnchorElementFactory {
  /** Create an empty anchor */
  (): HTMLAnchorElement;

  /** Create anchor with props only (non-generic, for overload resolution) */
  (props: LooseElementProps<"a">): HTMLAnchorElement;

  /** Create anchor with children callback only */
  (children: ChildrenCallback<HTMLAnchorElement>): HTMLAnchorElement;

  /** Create anchor with props and children (non-generic) */
  (props: LooseElementProps<"a">, children: ChildrenCallback<HTMLAnchorElement>): HTMLAnchorElement;

  /** Create anchor with href shorthand */
  (href: string): HTMLAnchorElement;

  /** Create anchor with href and text shorthand */
  (href: string, text: TextContent): HTMLAnchorElement;

  /** Create anchor with props only (generic, for SmartElement inference) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<"a">, "a">,
  ): SmartElement<"a", P>;

  /** Create anchor with props and children (generic) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<"a">, "a">,
    children: ChildrenCallback<SmartElement<"a", P>>,
  ): SmartElement<"a", P>;

  /** Create anchor with href, text, and additional props */
  <const P extends Record<string, unknown>>(
    href: string,
    text: TextContent,
    props: P &
      ContextualValidateProps<P, Omit<LooseElementProps<"a">, "href">, "a">,
  ): SmartElement<"a", P & { href: string }>;
}

// =============================================================================
// PROP APPLICATION - PROP TO ATTRIBUTE MAP
// =============================================================================

/**
 * Map of camelCase prop names to their HTML attribute equivalents
 */
const PROP_TO_ATTR: Record<string, string> = {
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv",
  acceptCharset: "accept-charset",
  accessKey: "accesskey",
  autoCapitalize: "autocapitalize",
  autoComplete: "autocomplete",
  autoFocus: "autofocus",
  autoPlay: "autoplay",
  colSpan: "colspan",
  contentEditable: "contenteditable",
  crossOrigin: "crossorigin",
  dateTime: "datetime",
  defaultChecked: "checked",
  defaultValue: "value",
  encType: "enctype",
  enterKeyHint: "enterkeyhint",
  fetchPriority: "fetchpriority",
  formAction: "formaction",
  formEnctype: "formenctype",
  formMethod: "formmethod",
  formNoValidate: "formnovalidate",
  formTarget: "formtarget",
  hrefLang: "hreflang",
  inputMode: "inputmode",
  isMap: "ismap",
  maxLength: "maxlength",
  minLength: "minlength",
  noModule: "nomodule",
  noValidate: "novalidate",
  playsInline: "playsinline",
  readOnly: "readonly",
  referrerPolicy: "referrerpolicy",
  rowSpan: "rowspan",
  srcDoc: "srcdoc",
  srcLang: "srclang",
  srcSet: "srcset",
  tabIndex: "tabindex",
  useMap: "usemap",
  itemScope: "itemscope",
  itemType: "itemtype",
  itemId: "itemid",
  itemProp: "itemprop",
  itemRef: "itemref",
  popoverTarget: "popovertarget",
  popoverTargetAction: "popovertargetaction",
  shadowRootMode: "shadowrootmode",
  shadowRootDelegatesFocus: "shadowrootdelegatesfocus",
  shadowRootClonable: "shadowrootclonable",
  shadowRootSerializable: "shadowrootserializable",
  controlsList: "controlslist",
  disablePictureInPicture: "disablepictureinpicture",
  disableRemotePlayback: "disableremoteplayback",
  allowFullscreen: "allowfullscreen",
  attributionSrc: "attributionsrc",
  elementTiming: "elementtiming",
};

// =============================================================================
// TYPE-SAFE DOM PROPERTY SETTERS
// =============================================================================

/**
 * Properties that should be set as DOM properties rather than attributes.
 * These properties have special behavior and must be set directly on the element.
 */
type DOMPropertyKey =
  | "value"
  | "checked"
  | "selected"
  | "muted"
  | "currentTime"
  | "volume"
  | "indeterminate"
  | "defaultValue"
  | "defaultChecked"
  | "textContent"
  | "innerText";

/**
 * Type guard to check if a key is a DOM property key
 */
function isDOMPropertyKey(key: string): key is DOMPropertyKey {
  return [
    "value",
    "checked",
    "selected",
    "muted",
    "currentTime",
    "volume",
    "indeterminate",
    "defaultValue",
    "defaultChecked",
    "textContent",
    "innerText",
  ].includes(key);
}

/**
 * Type-safe property setter for HTMLElement properties.
 * Properly narrows element types and ensures runtime safety.
 */
function setElementProperty(
  element: HTMLElement,
  key: DOMPropertyKey,
  value: unknown,
): void {
  switch (key) {
    case "value":
      if ("value" in element) {
        (
          element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        ).value = String(value ?? "");
      }
      break;
    case "checked":
      if ("checked" in element) {
        (element as HTMLInputElement).checked = Boolean(value);
      }
      break;
    case "selected":
      if ("selected" in element) {
        (element as HTMLOptionElement).selected = Boolean(value);
      }
      break;
    case "muted":
      if ("muted" in element) {
        (element as HTMLMediaElement).muted = Boolean(value);
      }
      break;
    case "currentTime":
      if ("currentTime" in element) {
        (element as HTMLMediaElement).currentTime = Number(value ?? 0);
      }
      break;
    case "volume":
      if ("volume" in element) {
        (element as HTMLMediaElement).volume = Number(value ?? 1);
      }
      break;
    case "indeterminate":
      if ("indeterminate" in element) {
        (element as HTMLInputElement).indeterminate = Boolean(value);
      }
      break;
    case "defaultValue":
      if ("defaultValue" in element) {
        (element as HTMLInputElement | HTMLTextAreaElement).defaultValue =
          String(value ?? "");
      }
      break;
    case "defaultChecked":
      if ("defaultChecked" in element) {
        (element as HTMLInputElement).defaultChecked = Boolean(value);
      }
      break;
    case "textContent":
      element.textContent = String(value ?? "");
      break;
    case "innerText":
      element.innerText = String(value ?? "");
      break;
  }
}

function assignProp(element: HTMLElement, key: string, value: unknown): void {
  if (key === "class" || key === "className" || key === "classList") {
    applyClass(element, value);
  } else if (key === "style") {
    applyStyle(element, value);
  } else if (isDOMPropertyKey(key)) {
    setElementProperty(element, key, value);
  } else if (typeof value === "boolean") {
    if (value) {
      element.setAttribute(PROP_TO_ATTR[key] ?? key, "");
    } else {
      element.removeAttribute(PROP_TO_ATTR[key] ?? key);
    }
  } else {
    element.setAttribute(PROP_TO_ATTR[key] ?? key, String(value));
  }
}

function applyProps<K extends keyof HTMLElementTagNameMap>(
  element: HTMLElementTagNameMap[K],
  props: ElementProps<K>,
): void {
  for (const key in props) {
    const value = (props as Record<string, unknown>)[key];
    if (value === null || value === undefined) continue;

    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      // Use event delegation for better performance
      registerEventHandler(element, eventName, value as EventListener);
    } else if (isSignal(value)) {
      $e(() => assignProp(element, key, value.value));
    } else {
      assignProp(element, key, value);
    }
  }
}

function applyClass(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.className = value;
  } else if (Array.isArray(value)) {
    element.className = value.filter(Boolean).join(" ");
  } else if (typeof value === "object" && value !== null) {
    // Check if any value is a signal to determine reactivity strategy
    // We can't use .some() on an object, so we iterate
    let hasSignal = false;
    for (const key in value) {
      if (isSignal((value as Record<string, unknown>)[key])) {
        hasSignal = true;
        break;
      }
    }

    const updateClasses = () => {
      const classes: string[] = [];
      for (const className in value) {
        const condition = (value as Record<string, unknown>)[className];
        const isActive = isSignal(condition) ? condition.value : condition;
        if (isActive) classes.push(className);
      }
      element.className = classes.join(" ");
    };

    if (hasSignal) {
      $e(updateClasses);
    } else {
      updateClasses();
    }
  }
}

// =============================================================================
// COLOR OBJECT TYPE GUARDS AND CONVERTERS
// =============================================================================

/**
 * Import color object types for type-safe handling
 */
import type {
  ColorRGB,
  ColorHSL,
  ColorHWB,
  ColorOKLCH,
  ColorLab,
  ColorLCH,
  ColorOKLab,
  ColorHex,
  ColorFunction,
  ColorMix,
} from "../css/properties/visual";

/**
 * Union of all color object types for type narrowing
 */
type CSSColorObject =
  | ColorRGB
  | ColorHSL
  | ColorHWB
  | ColorOKLCH
  | ColorLab
  | ColorLCH
  | ColorOKLab
  | ColorHex
  | ColorFunction
  | ColorMix;

/**
 * Type guard for color objects
 */
function isColorObject(value: unknown): value is CSSColorObject {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    typeof (value as { type: unknown }).type === "string"
  );
}

/**
 * Type-safe color object to string transformation.
 * Uses exhaustive switch statement for compile-time safety.
 */
function colorObjectToString(color: CSSColorObject): string {
  switch (color.type) {
    case "rgb":
      return color.a !== undefined
        ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
        : `rgb(${color.r}, ${color.g}, ${color.b})`;
    case "hsl":
      return color.a !== undefined
        ? `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`
        : `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
    case "hwb":
      return color.a !== undefined
        ? `hwb(${color.h} ${color.w}% ${color.b}% / ${color.a})`
        : `hwb(${color.h} ${color.w}% ${color.b}%)`;
    case "oklch":
      return color.a !== undefined
        ? `oklch(${color.l}% ${color.c} ${color.h} / ${color.a})`
        : `oklch(${color.l}% ${color.c} ${color.h})`;
    case "lab":
      return color.alpha !== undefined
        ? `lab(${color.l}% ${color.a} ${color.b} / ${color.alpha})`
        : `lab(${color.l}% ${color.a} ${color.b})`;
    case "lch":
      return color.alpha !== undefined
        ? `lch(${color.l}% ${color.c} ${color.h} / ${color.alpha})`
        : `lch(${color.l}% ${color.c} ${color.h})`;
    case "oklab":
      return color.alpha !== undefined
        ? `oklab(${color.l}% ${color.a} ${color.b} / ${color.alpha})`
        : `oklab(${color.l}% ${color.a} ${color.b})`;
    case "hex":
      return color.value;
    case "color": {
      const comps = color.components.join(" ");
      return color.alpha !== undefined
        ? `color(${color.space} ${comps} / ${color.alpha})`
        : `color(${color.space} ${comps})`;
    }
    case "color-mix": {
      const c1 =
        typeof color.color1 === "object"
          ? colorObjectToString(color.color1 as CSSColorObject)
          : color.color1;
      const c2 =
        typeof color.color2 === "object"
          ? colorObjectToString(color.color2 as CSSColorObject)
          : color.color2;
      const p1 = color.percentage1 !== undefined ? `${color.percentage1}%` : "";
      const p2 = color.percentage2 !== undefined ? `${color.percentage2}%` : "";
      return `color-mix(${color.method}, ${c1} ${p1}, ${c2} ${p2})`;
    }
  }
}

function transformStyleValue(value: unknown): string {
  if (value === null || value === undefined) return "";

  if (isColorObject(value)) {
    return colorObjectToString(value);
  }

  // For other object types (not colors), convert to string
  if (typeof value === "object") {
    // Future: handle other complex CSS value objects here
  }

  return String(value);
}

// =============================================================================
// STYLE PROPERTY SETTER
// =============================================================================

/**
 * Type-safe style property setter with CSS variable and vendor prefix support.
 * Maintains flexibility while avoiding unsafe type assertions.
 *
 * @param style - The CSSStyleDeclaration to modify
 * @param property - The CSS property name (camelCase)
 * @param value - The CSS value as a string
 */
function setStyleProperty(
  style: CSSStyleDeclaration,
  property: string,
  value: string,
): void {
  // CSS variables (custom properties) must use setProperty
  if (property.startsWith("--")) {
    style.setProperty(property, value);
    return;
  }

  // Vendor prefixes need kebab-case conversion
  if (
    property.startsWith("webkit") ||
    property.startsWith("moz") ||
    property.startsWith("ms") ||
    property.startsWith("o")
  ) {
    const kebabProp = property.replace(/([A-Z])/g, "-$1").toLowerCase();
    style.setProperty(kebabProp, value);
    return;
  }

  // Standard properties - use direct assignment for performance
  // This single type assertion is safe because:
  // 1. Property names are validated at compile time through StrictCSSProperties
  // 2. Invalid properties are silently ignored by browsers (no errors)
  // 3. We have a fallback for edge cases
  try {
    (style as unknown as Record<string, unknown>)[property] = value;
  } catch {
    // Fallback for non-standard or future CSS properties
    style.setProperty(property, value);
  }
}

function applyStyle(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.setAttribute("style", value);
  } else if (typeof value === "object" && value !== null) {
    // Check if any value is a signal to determine reactivity strategy
    let hasAnySignal = false;
    for (const key in value) {
      if (isSignal((value as Record<string, unknown>)[key])) {
        hasAnySignal = true;
        break;
      }
    }

    if (hasAnySignal) {
      // Create a reactive effect that updates all properties
      $e(() => {
        for (const prop in value) {
          const val = (value as Record<string, unknown>)[prop];
          const resolvedValue = isSignal(val) ? val.value : val;
          setStyleProperty(
            element.style,
            prop,
            transformStyleValue(resolvedValue),
          );
        }
      });
    } else {
      // Static values - apply once without effect
      for (const prop in value) {
        const val = (value as Record<string, unknown>)[prop];
        setStyleProperty(element.style, prop, transformStyleValue(val));
      }
    }
  }
}


// =============================================================================
// TEXT CONTENT HELPER
// =============================================================================

/**
 * Applies text content to an element, with reactive support.
 */
function applyTextContent(element: HTMLElement, text: TextContent): void {
  if (isSignal(text)) {
    $e(() => {
      element.textContent = String(text.value);
    });
  } else {
    element.textContent = String(text);
  }
}

// =============================================================================
// ELEMENT FACTORY
// =============================================================================

/**
 * Creates an element factory for a specific HTML tag.
 * 
 * Simplified API with 4 overloads:
 * 1. el() - empty element
 * 2. el({ props }) - props only
 * 3. el(() => {}) - children only  
 * 4. el({ props }, () => {}) - props + children
 *
 * @param tag - The HTML tag name (e.g., "div", "span")
 * @returns An `ElementFactory` function for creating elements of that type
 */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
): (
  propsOrChildren?: ElementProps<K> | ChildrenCallback<E<K>>,
  children?: ChildrenCallback<E<K>>,
) => E<K> {
  return (
    arg1?: ElementProps<K> | ChildrenCallback<E<K>>,
    arg2?: ChildrenCallback<E<K>>,
  ): E<K> => {
    const element = document.createElement(tag);

    // Parse arguments - strict 4 patterns
    let props: ElementProps<K> | undefined;
    let children: ChildrenCallback<E<K>> | undefined;

    if (arg1 === undefined) {
      // 1. element()
    } else if (isChildrenCallback<E<K>>(arg1)) {
      // 3. element(children)
      children = arg1;
    } else if (isProps<K>(arg1)) {
      // 2. element(props) or 4. element(props, children)
      props = arg1;
      if (arg2 !== undefined) {
        children = arg2;
      }
    }

    // Apply props
    if (props) {
      applyProps(element, props);
    }

    // Execute children with implicit fragment batching
    let mountCallbacks: (() => void)[] = [];
    const onMount: OnMountCallback = (cb) => mountCallbacks.push(cb);

    if (children) {
      const frag = document.createDocumentFragment();
      pushExecutionContext(frag);
      try {
        children(element, onMount);
      } finally {
        popExecutionContext();
      }
      element.appendChild(frag);
    }

    // Mount to current context
    getCurrentExecutionContext().appendChild(element);

    // Execute onMount callbacks after element is in DOM
    if (mountCallbacks.length > 0) {
      requestAnimationFrame(() => {
        for (const cb of mountCallbacks) {
          cb();
        }
      });
    }

    return element;
  };
}

/**
 * Creates a void element factory (no children allowed).
 *
 * @param tag - The HTML tag name (e.g., "input", "br")
 * @returns A `VoidElementFactory` function
 */
function createVoidElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
): VoidElementFactory<K> {
  return (props?: ElementProps<K>): E<K> => {
    const element = document.createElement(tag);
    if (props) applyProps(element, props);
    getCurrentExecutionContext().appendChild(element);
    return element;
  };
}

/**
 * Creates a text element factory with text shorthand support.
 * Supports: el(), el(text), el(text, props), el(text, children), el(text, props, children),
 *           el(props), el(children), el(props, children)
 */
function createTextElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
): TextElementFactory<K> {
  return ((
    arg1?: TextContent | ElementProps<K> | ChildrenCallback<E<K>>,
    arg2?: ElementProps<K> | ChildrenCallback<E<K>>,
    arg3?: ChildrenCallback<E<K>>,
  ): E<K> => {
    const element = document.createElement(tag);

    let text: TextContent | undefined;
    let props: ElementProps<K> | undefined;
    let children: ChildrenCallback<E<K>> | undefined;

    // Parse arguments based on type
    if (arg1 === undefined) {
      // 1. element()
    } else if (isTextContent(arg1)) {
      // First arg is text
      text = arg1;

      if (arg2 === undefined) {
        // 2. element(text)
      } else if (isChildrenCallback<E<K>>(arg2)) {
        // 4. element(text, children)
        children = arg2;
      } else if (isProps<K>(arg2)) {
        // 3 or 5. element(text, props) or element(text, props, children)
        props = arg2;
        if (arg3 !== undefined) {
          children = arg3;
        }
      }
    } else if (isChildrenCallback<E<K>>(arg1)) {
      // 7. element(children)
      children = arg1;
    } else if (isProps<K>(arg1)) {
      // 6 or 8. element(props) or element(props, children)
      props = arg1;
      if (arg2 !== undefined && isChildrenCallback<E<K>>(arg2)) {
        children = arg2;
      }
    }

    // Apply text content (reactive or static)
    if (text !== undefined) {
      applyTextContent(element, text);
    }

    // Apply props
    if (props) {
      applyProps(element, props);
    }

    // Execute children with implicit fragment batching
    const mountCallbacks: (() => void)[] = [];
    const onMount: OnMountCallback = (cb) => mountCallbacks.push(cb);

    if (children) {
      const frag = document.createDocumentFragment();
      pushExecutionContext(frag);
      try {
        children(element, onMount);
      } finally {
        popExecutionContext();
      }
      element.appendChild(frag);
    }

    // Mount to current context
    getCurrentExecutionContext().appendChild(element);

    // Execute onMount callbacks after element is in DOM
    if (mountCallbacks.length > 0) {
      requestAnimationFrame(() => {
        for (const cb of mountCallbacks) {
          cb();
        }
      });
    }

    return element;
  }) as TextElementFactory<K>;
}

/**
 * Creates an interactive element factory with text + handler shorthand.
 * Supports: el(), el(text), el(text, onclick), el(text, props), el(text, children),
 *           el(text, props, children), el(props), el(children), el(props, children)
 */
function createInteractiveElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
): InteractiveElementFactory<K> {
  return ((
    arg1?: TextContent | ElementProps<K> | ChildrenCallback<E<K>>,
    arg2?:
      | ((e: MouseEvent) => void)
      | ElementProps<K>
      | ChildrenCallback<E<K>>,
    arg3?: ChildrenCallback<E<K>>,
  ): E<K> => {
    const element = document.createElement(tag);

    let text: TextContent | undefined;
    let onclick: ((e: MouseEvent) => void) | undefined;
    let props: ElementProps<K> | undefined;
    let children: ChildrenCallback<E<K>> | undefined;

    // Parse arguments
    if (arg1 === undefined) {
      // 1. element()
    } else if (isTextContent(arg1)) {
      text = arg1;

      if (arg2 === undefined) {
        // 2. element(text)
      } else if (isClickHandler(arg2)) {
        // 3. element(text, onclick)
        onclick = arg2;
      } else if (isChildrenCallback<E<K>>(arg2)) {
        // 5. element(text, children)
        children = arg2;
      } else if (isProps<K>(arg2)) {
        // 4 or 6. element(text, props) or element(text, props, children)
        props = arg2;
        if (arg3 !== undefined) {
          children = arg3;
        }
      }
    } else if (isChildrenCallback<E<K>>(arg1)) {
      // 8. element(children)
      children = arg1;
    } else if (isProps<K>(arg1)) {
      // 7 or 9. element(props) or element(props, children)
      props = arg1;
      if (arg2 !== undefined && isChildrenCallback<E<K>>(arg2)) {
        children = arg2;
      }
    }

    // Apply text content
    if (text !== undefined) {
      applyTextContent(element, text);
    }

    // Apply click handler shorthand
    if (onclick) {
      registerEventHandler(element, "click", onclick as EventListener);
    }

    // Apply props
    if (props) {
      applyProps(element, props);
    }

    // Execute children with implicit fragment batching
    const mountCallbacks: (() => void)[] = [];
    const onMount: OnMountCallback = (cb) => mountCallbacks.push(cb);

    if (children) {
      const frag = document.createDocumentFragment();
      pushExecutionContext(frag);
      try {
        children(element, onMount);
      } finally {
        popExecutionContext();
      }
      element.appendChild(frag);
    }

    // Mount to current context
    getCurrentExecutionContext().appendChild(element);

    // Execute onMount callbacks after element is in DOM
    if (mountCallbacks.length > 0) {
      requestAnimationFrame(() => {
        for (const cb of mountCallbacks) {
          cb();
        }
      });
    }

    return element;
  }) as InteractiveElementFactory<K>;
}

/**
 * Creates the img element factory with src/alt shorthand.
 * Supports: img(), img(props), img(src), img(src, alt), img(src, alt, props)
 */
function createImgElement(): ImgElementFactory {
  return ((
    arg1?: string | ElementProps<"img">,
    arg2?: string | ElementProps<"img">,
    arg3?: ElementProps<"img">,
  ): HTMLImageElement => {
    const element = document.createElement("img");

    let src: string | undefined;
    let alt: string | undefined;
    let props: ElementProps<"img"> | undefined;

    if (arg1 === undefined) {
      // img() - empty
    } else if (typeof arg1 === "string" && looksLikeImgSrc(arg1)) {
      // First arg is src
      src = arg1;

      if (arg2 === undefined) {
        // img(src)
      } else if (typeof arg2 === "string") {
        // img(src, alt) or img(src, alt, props)
        alt = arg2;
        if (arg3 !== undefined) {
          props = arg3;
        }
      } else if (isProps<"img">(arg2)) {
        // img(src, props) - src only with additional props
        props = arg2;
      }
    } else if (isProps<"img">(arg1)) {
      // img(props)
      props = arg1;
    }

    // Apply src
    if (src !== undefined) {
      element.src = src;
    }

    // Apply alt
    if (alt !== undefined) {
      element.alt = alt;
    }

    // Apply props
    if (props) {
      applyProps(element, props);
    }

    getCurrentExecutionContext().appendChild(element);
    return element;
  }) as ImgElementFactory;
}

/**
 * Creates the anchor element factory with href/text shorthand.
 * Supports: a(), a(href), a(href, text), a(href, text, props),
 *           a(props), a(children), a(props, children)
 */
function createAnchorElement(): AnchorElementFactory {
  return ((
    arg1?: string | ElementProps<"a"> | ChildrenCallback<HTMLAnchorElement>,
    arg2?: TextContent | ElementProps<"a"> | ChildrenCallback<HTMLAnchorElement>,
    arg3?: ElementProps<"a">,
  ): HTMLAnchorElement => {
    const element = document.createElement("a");

    let href: string | undefined;
    let text: TextContent | undefined;
    let props: ElementProps<"a"> | undefined;
    let children: ChildrenCallback<HTMLAnchorElement> | undefined;

    if (arg1 === undefined) {
      // a() - empty
    } else if (typeof arg1 === "string" && looksLikeHref(arg1)) {
      // First arg is href
      href = arg1;

      if (arg2 === undefined) {
        // a(href)
      } else if (isTextContent(arg2)) {
        // a(href, text) or a(href, text, props)
        text = arg2;
        if (arg3 !== undefined) {
          props = arg3;
        }
      } else if (isProps<"a">(arg2)) {
        // a(href, props)
        props = arg2;
      }
    } else if (isChildrenCallback<HTMLAnchorElement>(arg1)) {
      // a(children)
      children = arg1;
    } else if (isProps<"a">(arg1)) {
      // a(props) or a(props, children)
      props = arg1;
      if (arg2 !== undefined && isChildrenCallback<HTMLAnchorElement>(arg2)) {
        children = arg2;
      }
    }

    // Apply href
    if (href !== undefined) {
      element.href = href;
    }

    // Apply text content
    if (text !== undefined) {
      applyTextContent(element, text);
    }

    // Apply props
    if (props) {
      applyProps(element, props);
    }

    // Execute children
    const mountCallbacks: (() => void)[] = [];
    const onMount: OnMountCallback = (cb) => mountCallbacks.push(cb);

    if (children) {
      const frag = document.createDocumentFragment();
      pushExecutionContext(frag);
      try {
        children(element, onMount);
      } finally {
        popExecutionContext();
      }
      element.appendChild(frag);
    }

    getCurrentExecutionContext().appendChild(element);

    if (mountCallbacks.length > 0) {
      requestAnimationFrame(() => {
        for (const cb of mountCallbacks) {
          cb();
        }
      });
    }

    return element;
  }) as AnchorElementFactory;
}

// =============================================================================
// HELPER: TYPE GUARDS
// =============================================================================

function isProps<K extends keyof HTMLElementTagNameMap>(
  value: unknown,
): value is ElementProps<K> {
  return (
    typeof value === "object" &&
    value !== null &&
    !isSignal(value) &&
    !Array.isArray(value)
  );
}

function isChildrenCallback<E extends HTMLElement>(
  value: unknown,
): value is ChildrenCallback<E> {
  return typeof value === "function" && !isSignal(value);
}


// =============================================================================
// ELEMENT EXPORTS
// =============================================================================

// -----------------------------------------------------------------------------
// Special elements with custom factories
// -----------------------------------------------------------------------------
export const a = createAnchorElement();
export const img = createImgElement();

// -----------------------------------------------------------------------------
// Interactive elements (text + handler shorthand)
// -----------------------------------------------------------------------------
export const button = createInteractiveElement("button") as InteractiveElementFactory<"button">;
export const summary = createInteractiveElement("summary") as InteractiveElementFactory<"summary">;
export const option = createInteractiveElement("option") as InteractiveElementFactory<"option">;
export const optgroup = createInteractiveElement("optgroup") as InteractiveElementFactory<"optgroup">;

// -----------------------------------------------------------------------------
// Text-holding elements (text shorthand)
// -----------------------------------------------------------------------------
// Headings
export const h1 = createTextElement("h1") as TextElementFactory<"h1">;
export const h2 = createTextElement("h2") as TextElementFactory<"h2">;
export const h3 = createTextElement("h3") as TextElementFactory<"h3">;
export const h4 = createTextElement("h4") as TextElementFactory<"h4">;
export const h5 = createTextElement("h5") as TextElementFactory<"h5">;
export const h6 = createTextElement("h6") as TextElementFactory<"h6">;

// Block elements
export const p = createTextElement("p") as TextElementFactory<"p">;
export const div = createTextElement("div") as TextElementFactory<"div">;
export const article = createTextElement("article") as TextElementFactory<"article">;
export const section = createTextElement("section") as TextElementFactory<"section">;
export const aside = createTextElement("aside") as TextElementFactory<"aside">;
export const header = createTextElement("header") as TextElementFactory<"header">;
export const footer = createTextElement("footer") as TextElementFactory<"footer">;
export const main = createTextElement("main") as TextElementFactory<"main">;
export const blockquote = createTextElement("blockquote") as TextElementFactory<"blockquote">;
export const figcaption = createTextElement("figcaption") as TextElementFactory<"figcaption">;
export const pre = createTextElement("pre") as TextElementFactory<"pre">;
export const address = createTextElement("address") as TextElementFactory<"address">;

// Inline elements
export const span = createTextElement("span") as TextElementFactory<"span">;
export const strong = createTextElement("strong") as TextElementFactory<"strong">;
export const em = createTextElement("em") as TextElementFactory<"em">;
export const small = createTextElement("small") as TextElementFactory<"small">;
export const mark = createTextElement("mark") as TextElementFactory<"mark">;
export const code = createTextElement("code") as TextElementFactory<"code">;
export const samp = createTextElement("samp") as TextElementFactory<"samp">;
export const kbd = createTextElement("kbd") as TextElementFactory<"kbd">;
export const var_ = createTextElement("var") as TextElementFactory<"var">; // var is reserved
export const i = createTextElement("i") as TextElementFactory<"i">;
export const b = createTextElement("b") as TextElementFactory<"b">;
export const u = createTextElement("u") as TextElementFactory<"u">;
export const s = createTextElement("s") as TextElementFactory<"s">;
export const del = createTextElement("del") as TextElementFactory<"del">;
export const ins = createTextElement("ins") as TextElementFactory<"ins">;
export const sub = createTextElement("sub") as TextElementFactory<"sub">;
export const sup = createTextElement("sup") as TextElementFactory<"sup">;
export const abbr = createTextElement("abbr") as TextElementFactory<"abbr">;
export const cite = createTextElement("cite") as TextElementFactory<"cite">;
export const dfn = createTextElement("dfn") as TextElementFactory<"dfn">;
export const q = createTextElement("q") as TextElementFactory<"q">;
export const time = createTextElement("time") as TextElementFactory<"time">;
export const data = createTextElement("data") as TextElementFactory<"data">;
export const bdi = createTextElement("bdi") as TextElementFactory<"bdi">;
export const bdo = createTextElement("bdo") as TextElementFactory<"bdo">;
export const ruby = createTextElement("ruby") as TextElementFactory<"ruby">;
export const rp = createTextElement("rp") as TextElementFactory<"rp">;
export const rt = createTextElement("rt") as TextElementFactory<"rt">;

// Form-adjacent
export const label = createTextElement("label") as TextElementFactory<"label">;
export const legend = createTextElement("legend") as TextElementFactory<"legend">;
export const output = createTextElement("output") as TextElementFactory<"output">;

// Table cells
export const caption = createTextElement("caption") as TextElementFactory<"caption">;
export const td = createTextElement("td") as TextElementFactory<"td">;
export const th = createTextElement("th") as TextElementFactory<"th">;

// List items
export const li = createTextElement("li") as TextElementFactory<"li">;
export const dd = createTextElement("dd") as TextElementFactory<"dd">;
export const dt = createTextElement("dt") as TextElementFactory<"dt">;

// Title
export const title = createTextElement("title") as TextElementFactory<"title">;

// -----------------------------------------------------------------------------
// Void elements (no children, props only)
// -----------------------------------------------------------------------------
export const input = createVoidElement("input") as VoidElementFactory<"input">;
export const br = createVoidElement("br") as VoidElementFactory<"br">;
export const hr = createVoidElement("hr") as VoidElementFactory<"hr">;
export const meta = createVoidElement("meta") as VoidElementFactory<"meta">;
export const link = createVoidElement("link") as VoidElementFactory<"link">;
export const area = createVoidElement("area") as VoidElementFactory<"area">;
export const base = createVoidElement("base") as VoidElementFactory<"base">;
export const col = createVoidElement("col") as VoidElementFactory<"col">;
export const embed = createVoidElement("embed") as VoidElementFactory<"embed">;
export const source = createVoidElement("source") as VoidElementFactory<"source">;
export const track = createVoidElement("track") as VoidElementFactory<"track">;
export const wbr = createVoidElement("wbr") as VoidElementFactory<"wbr">;

// -----------------------------------------------------------------------------
// Container elements (no text shorthand, props + children only)
// -----------------------------------------------------------------------------
export const ul = createElement("ul") as ElementFactory<"ul">;
export const ol = createElement("ol") as ElementFactory<"ol">;
export const menu = createElement("menu") as ElementFactory<"menu">;
export const table = createElement("table") as ElementFactory<"table">;
export const tbody = createElement("tbody") as ElementFactory<"tbody">;
export const thead = createElement("thead") as ElementFactory<"thead">;
export const tfoot = createElement("tfoot") as ElementFactory<"tfoot">;
export const tr = createElement("tr") as ElementFactory<"tr">;
export const colgroup = createElement("colgroup") as ElementFactory<"colgroup">;
export const form = createElement("form") as ElementFactory<"form">;
export const fieldset = createElement("fieldset") as ElementFactory<"fieldset">;
export const details = createElement("details") as ElementFactory<"details">;
export const dialog = createElement("dialog") as ElementFactory<"dialog">;
export const nav = createElement("nav") as ElementFactory<"nav">;
export const figure = createElement("figure") as ElementFactory<"figure">;
export const select = createElement("select") as ElementFactory<"select">;
export const datalist = createElement("datalist") as ElementFactory<"datalist">;
export const dl = createElement("dl") as ElementFactory<"dl">;

// Media/embedded
export const audio = createElement("audio") as ElementFactory<"audio">;
export const video = createElement("video") as ElementFactory<"video">;
export const picture = createElement("picture") as ElementFactory<"picture">;
export const iframe = createElement("iframe") as ElementFactory<"iframe">;
export const object = createElement("object") as ElementFactory<"object">;
export const canvas = createElement("canvas") as ElementFactory<"canvas">;
export const map = createElement("map") as ElementFactory<"map">;

// Document structure
export const body = createElement("body") as ElementFactory<"body">;
export const head = createElement("head") as ElementFactory<"head">;
export const html = createElement("html") as ElementFactory<"html">;
export const hgroup = createElement("hgroup") as ElementFactory<"hgroup">;

// Other container-like
export const template = createElement("template") as ElementFactory<"template">;
export const slot = createElement("slot") as ElementFactory<"slot">;
export const noscript = createElement("noscript") as ElementFactory<"noscript">;
export const script = createElement("script") as ElementFactory<"script">;
export const style = createElement("style") as ElementFactory<"style">;
export const textarea = createElement("textarea") as ElementFactory<"textarea">;
export const meter = createElement("meter") as ElementFactory<"meter">;
export const progress = createElement("progress") as ElementFactory<"progress">;
export const search = createElement("search") as ElementFactory<"search">;
