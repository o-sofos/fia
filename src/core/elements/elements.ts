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
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type LooseElementProps<K extends keyof HTMLElementTagNameMap> =
  DistributiveOmit<ElementProps<K>, "style"> & {
    style?: string | ReactiveCSSProperties | Signal<string>;
  };

/**
 * Validates that all properties in P are present in Target or match allowable patterns (data-*).
 * This prevents excess properties from being allowed by generic constraints.
 */
/**
 * Validates that all properties in P are present in Target or match allowable patterns (data-*).
 * Also maps event handlers to be contextually typed with the current element and props.
 */
export type ContextualValidateProps<
  P,
  Target,
  K extends keyof HTMLElementTagNameMap,
> = {
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
export function isTextContent(value: unknown): value is TextContent {
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
export function isClickHandler(
  value: unknown,
): value is (e: MouseEvent) => void {
  if (typeof value !== "function") return false;
  if (isSignal(value)) return false;
  return (value as (...args: unknown[]) => unknown).length <= 1;
}

/**
 * Check if first argument looks like an href (common URL patterns)
 */
export function looksLikeHref(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return /^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(value);
}

/**
 * Check if first argument looks like an image src
 */
export function looksLikeImgSrc(value: unknown): boolean {
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
export type AssignableString = string & {
  readonly __assignable?: unique symbol;
};

// Shorthand for simple element type (no specific props inference needed for return usually)
export type E<K extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[K];

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
export type DOMPropertyKey =
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
export function isDOMPropertyKey(key: string): key is DOMPropertyKey {
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
export function setElementProperty(
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

export function assignProp(
  element: HTMLElement,
  key: string,
  value: unknown,
): void {
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

export function applyProps<K extends keyof HTMLElementTagNameMap>(
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

export function applyClass(element: HTMLElement, value: unknown): void {
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
import type { SmartElement } from "./SmartElement";
import { createElement, type ElementFactory } from "./ElementFactory";
import {
  createTextElement,
  type TextElementFactory,
} from "./TextElementFactory";
import {
  createInteractiveElement,
  type InteractiveElementFactory,
} from "./InteractiveElementFactory";
import {
  createVoidElement,
  type VoidElementFactory,
} from "./VoidElementFactory";
import { createImgElement } from "./ImgElementFactory";
import { createAnchorElement } from "./AnchorElementFactory";

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
export function setStyleProperty(
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

export function applyStyle(element: HTMLElement, value: unknown): void {
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
export function applyTextContent(
  element: HTMLElement,
  text: TextContent,
): void {
  if (isSignal(text)) {
    $e(() => {
      element.textContent = String(text.value);
    });
  } else {
    element.textContent = String(text);
  }
}

// =============================================================================
// HELPER: TYPE GUARDS
// =============================================================================

export function isProps<K extends keyof HTMLElementTagNameMap>(
  value: unknown,
): value is ElementProps<K> {
  return (
    typeof value === "object" &&
    value !== null &&
    !isSignal(value) &&
    !Array.isArray(value)
  );
}

export function isChildrenCallback<E extends HTMLElement>(
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
export const button = createInteractiveElement(
  "button",
) as InteractiveElementFactory<"button">;
export const summary = createInteractiveElement(
  "summary",
) as InteractiveElementFactory<"summary">;
export const option = createInteractiveElement(
  "option",
) as InteractiveElementFactory<"option">;
export const optgroup = createInteractiveElement(
  "optgroup",
) as InteractiveElementFactory<"optgroup">;

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
export const article = createTextElement(
  "article",
) as TextElementFactory<"article">;
export const section = createTextElement(
  "section",
) as TextElementFactory<"section">;
export const aside = createTextElement("aside") as TextElementFactory<"aside">;
export const header = createTextElement(
  "header",
) as TextElementFactory<"header">;
export const footer = createTextElement(
  "footer",
) as TextElementFactory<"footer">;
export const main = createTextElement("main") as TextElementFactory<"main">;
export const blockquote = createTextElement(
  "blockquote",
) as TextElementFactory<"blockquote">;
export const figcaption = createTextElement(
  "figcaption",
) as TextElementFactory<"figcaption">;
export const pre = createTextElement("pre") as TextElementFactory<"pre">;
export const address = createTextElement(
  "address",
) as TextElementFactory<"address">;

// Inline elements
export const span = createTextElement("span") as TextElementFactory<"span">;
export const strong = createTextElement(
  "strong",
) as TextElementFactory<"strong">;
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
export const legend = createTextElement(
  "legend",
) as TextElementFactory<"legend">;
export const output = createTextElement(
  "output",
) as TextElementFactory<"output">;

// Table cells
export const caption = createTextElement(
  "caption",
) as TextElementFactory<"caption">;
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
export const source = createVoidElement(
  "source",
) as VoidElementFactory<"source">;
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
