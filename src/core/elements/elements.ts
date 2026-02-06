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
import type { ElementProps } from "../attributes/html-attributes";
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
type ValidateProps<P, Target> = {
  [K in keyof P]: K extends keyof Target
  ? P[K]
  : K extends `data-${string}`
  ? P[K]
  : never;
};

export type Renderable = string | number | boolean | null | undefined;

/** onMount callback - runs after element is in DOM */
type OnMountCallback = (cb: () => void) => void;

/** Children callback - receives element reference and onMount helper */
type ChildrenCallback<E extends HTMLElement> = (el: E, onMount: OnMountCallback) => void;

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
  ProcessedProps<P> & {
    // Internal marker for prop type preservation
    _props?: P;
  };

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
 * @example
 * // 6. Content + props
 * button("Click me", {
 *   onclick: () => alert("Clicked!"),
 *   class: "btn-primary"
 * });
 *
 * @example
 * // 7. Content + children
 * section("Header", () => {
 *   p("Additional content");
 * });
 *
 * @example
 * // 8. All three: content + props + children
 * article("Title", { class: "post" }, () => {
 *   p("Post body");
 *   span("Footer");
 * });
 */
export interface ElementFactory<K extends keyof HTMLElementTagNameMap> {
  /**
   * Create an empty element.
   * @example div()
   */
  (): E<K>;

  /**
   * Create element with text content (static or reactive).
   * @param content - Text or number content, or a signal containing content
   * @example h1("Hello World")
   * @example h1($(() => `Count: ${count.value}`))
   */
  (content: MaybeSignal<string | number>): E<K>;

  /**
   * Create element with props only.
   * @param props - Element attributes, styles, and event handlers
   * @example div({ style: { color: "red" } })
   * @example input({ type: "email", placeholder: "Enter email" })
   */
  <const P extends LooseElementProps<K>>(props: P & ValidateProps<P, LooseElementProps<K>>): SmartElement<K, P>;

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
  <const P extends LooseElementProps<K>>(
    props: P & ValidateProps<P, LooseElementProps<K>>,
    children: (element: SmartElement<K, P>) => void,
  ): SmartElement<K, P>;

  /**
   * Create element with content and props.
   * @param content - Text or number content, or a signal
   * @param props - Element attributes, styles, and event handlers
   * @example button("Click me", { onclick: () => alert("Hi!") })
   */
  <const P extends LooseElementProps<K>>(
    content: MaybeSignal<string | number>,
    props: P & ValidateProps<P, LooseElementProps<K>>,
  ): SmartElement<K, P>;

  /**
   * Create element with content and children.
   * @param content - Text or number content, or a signal
   * @param children - Function that creates child elements
   * @example section("Header", () => { p("Subtext"); })
   */
  (
    content: MaybeSignal<string | number>,
    children: ChildrenCallback<E<K>>,
  ): E<K>;

  /**
   * Create element with content, props, and children (all three).
   * @param content - Text or number content, or a signal
   * @param props - Element attributes, styles, and event handlers
   * @param children - Function that creates child elements
   * @example article("Title", { class: "post" }, () => { p("Body"); })
   */
  <const P extends LooseElementProps<K>>(
    content: MaybeSignal<string | number>,
    props: P & ValidateProps<P, LooseElementProps<K>>,
    children: (element: SmartElement<K, P>) => void,
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
  if (key === "class") {
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
  for (const [key, value] of Object.entries(props)) {
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
  } else if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value as Record<string, unknown>);
    const hasSignal = entries.some(([_, v]) => isSignal(v));

    const updateClasses = () => {
      const classes: string[] = [];
      for (const [className, condition] of entries) {
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
    const entries = Object.entries(value as Record<string, unknown>);

    // Check if any value is a signal to determine reactivity strategy
    const hasAnySignal = entries.some(([_, val]) => isSignal(val));

    if (hasAnySignal) {
      // Create a reactive effect that updates all properties
      $e(() => {
        for (const [prop, val] of entries) {
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
      for (const [prop, val] of entries) {
        setStyleProperty(element.style, prop, transformStyleValue(val));
      }
    }
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

    // Parse arguments - simplified to 4 patterns
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
        mountCallbacks.forEach(cb => cb());
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

export const a: ElementFactory<"a"> = createElement("a");
export const abbr: ElementFactory<"abbr"> = createElement("abbr");
export const address: ElementFactory<"address"> = createElement("address");
export const area: VoidElementFactory<"area"> = createVoidElement("area");
export const article: ElementFactory<"article"> = createElement("article");
export const aside: ElementFactory<"aside"> = createElement("aside");
export const audio: ElementFactory<"audio"> = createElement("audio");
export const b: ElementFactory<"b"> = createElement("b");
export const base: VoidElementFactory<"base"> = createVoidElement("base");
export const bdi: ElementFactory<"bdi"> = createElement("bdi");
export const bdo: ElementFactory<"bdo"> = createElement("bdo");
export const blockquote: ElementFactory<"blockquote"> = createElement("blockquote");
export const body: ElementFactory<"body"> = createElement("body");
export const br: VoidElementFactory<"br"> = createVoidElement("br");
export const button: ElementFactory<"button"> = createElement("button");
export const canvas: ElementFactory<"canvas"> = createElement("canvas");
export const caption: ElementFactory<"caption"> = createElement("caption");
export const cite: ElementFactory<"cite"> = createElement("cite");
export const code: ElementFactory<"code"> = createElement("code");
export const col: VoidElementFactory<"col"> = createVoidElement("col");
export const colgroup: ElementFactory<"colgroup"> = createElement("colgroup");
export const data: ElementFactory<"data"> = createElement("data");
export const datalist: ElementFactory<"datalist"> = createElement("datalist");
export const dd: ElementFactory<"dd"> = createElement("dd");
export const del: ElementFactory<"del"> = createElement("del");
export const details: ElementFactory<"details"> = createElement("details");
export const dfn: ElementFactory<"dfn"> = createElement("dfn");
export const dialog: ElementFactory<"dialog"> = createElement("dialog");
export const div: ElementFactory<"div"> = createElement("div");
export const dl: ElementFactory<"dl"> = createElement("dl");
export const dt: ElementFactory<"dt"> = createElement("dt");
export const em: ElementFactory<"em"> = createElement("em");
export const embed: VoidElementFactory<"embed"> = createVoidElement("embed");
export const fieldset: ElementFactory<"fieldset"> = createElement("fieldset");
export const figcaption: ElementFactory<"figcaption"> = createElement("figcaption");
export const figure: ElementFactory<"figure"> = createElement("figure");
export const footer: ElementFactory<"footer"> = createElement("footer");
export const form: ElementFactory<"form"> = createElement("form");
export const h1: ElementFactory<"h1"> = createElement("h1");
export const h2: ElementFactory<"h2"> = createElement("h2");
export const h3: ElementFactory<"h3"> = createElement("h3");
export const h4: ElementFactory<"h4"> = createElement("h4");
export const h5: ElementFactory<"h5"> = createElement("h5");
export const h6: ElementFactory<"h6"> = createElement("h6");
export const head: ElementFactory<"head"> = createElement("head");
export const header: ElementFactory<"header"> = createElement("header");
export const hgroup: ElementFactory<"hgroup"> = createElement("hgroup");
export const hr: VoidElementFactory<"hr"> = createVoidElement("hr");
export const html: ElementFactory<"html"> = createElement("html");
export const i: ElementFactory<"i"> = createElement("i");
export const iframe: ElementFactory<"iframe"> = createElement("iframe");
export const img: VoidElementFactory<"img"> = createVoidElement("img");
export const input: VoidElementFactory<"input"> = createVoidElement("input");
export const ins: ElementFactory<"ins"> = createElement("ins");
export const kbd: ElementFactory<"kbd"> = createElement("kbd");
export const label: ElementFactory<"label"> = createElement("label");
export const legend: ElementFactory<"legend"> = createElement("legend");
export const li: ElementFactory<"li"> = createElement("li");
export const link: VoidElementFactory<"link"> = createVoidElement("link");
export const main: ElementFactory<"main"> = createElement("main");
export const map: ElementFactory<"map"> = createElement("map");
export const mark: ElementFactory<"mark"> = createElement("mark");
export const menu: ElementFactory<"menu"> = createElement("menu");
export const meta: VoidElementFactory<"meta"> = createVoidElement("meta");
export const meter: ElementFactory<"meter"> = createElement("meter");
export const nav: ElementFactory<"nav"> = createElement("nav");
export const noscript: ElementFactory<"noscript"> = createElement("noscript");
export const object: ElementFactory<"object"> = createElement("object");
export const ol: ElementFactory<"ol"> = createElement("ol");
export const optgroup: ElementFactory<"optgroup"> = createElement("optgroup");
export const option: ElementFactory<"option"> = createElement("option");
export const output: ElementFactory<"output"> = createElement("output");
export const p: ElementFactory<"p"> = createElement("p");
export const picture: ElementFactory<"picture"> = createElement("picture");
export const pre: ElementFactory<"pre"> = createElement("pre");
export const progress: ElementFactory<"progress"> = createElement("progress");
export const q: ElementFactory<"q"> = createElement("q");
export const rp: ElementFactory<"rp"> = createElement("rp");
export const rt: ElementFactory<"rt"> = createElement("rt");
export const ruby: ElementFactory<"ruby"> = createElement("ruby");
export const s: ElementFactory<"s"> = createElement("s");
export const samp: ElementFactory<"samp"> = createElement("samp");
export const script: ElementFactory<"script"> = createElement("script");
export const search: ElementFactory<"search"> = createElement("search");
export const section: ElementFactory<"section"> = createElement("section");
export const select: ElementFactory<"select"> = createElement("select");
export const slot: ElementFactory<"slot"> = createElement("slot");
export const small: ElementFactory<"small"> = createElement("small");
export const source: VoidElementFactory<"source"> = createVoidElement("source");
export const span: ElementFactory<"span"> = createElement("span");
export const strong: ElementFactory<"strong"> = createElement("strong");
export const style: ElementFactory<"style"> = createElement("style");
export const sub: ElementFactory<"sub"> = createElement("sub");
export const summary: ElementFactory<"summary"> = createElement("summary");
export const sup: ElementFactory<"sup"> = createElement("sup");
export const table: ElementFactory<"table"> = createElement("table");
export const tbody: ElementFactory<"tbody"> = createElement("tbody");
export const td: ElementFactory<"td"> = createElement("td");
export const template: ElementFactory<"template"> = createElement("template");
export const textarea: ElementFactory<"textarea"> = createElement("textarea");
export const tfoot: ElementFactory<"tfoot"> = createElement("tfoot");
export const th: ElementFactory<"th"> = createElement("th");
export const thead: ElementFactory<"thead"> = createElement("thead");
export const time: ElementFactory<"time"> = createElement("time");
export const title: ElementFactory<"title"> = createElement("title");
export const tr: ElementFactory<"tr"> = createElement("tr");
export const track: VoidElementFactory<"track"> = createVoidElement("track");
export const u: ElementFactory<"u"> = createElement("u");
export const ul: ElementFactory<"ul"> = createElement("ul");
export const var_: ElementFactory<"var"> = createElement("var"); // var is reserved
export const video: ElementFactory<"video"> = createElement("video");
export const wbr: VoidElementFactory<"wbr"> = createVoidElement("wbr");
