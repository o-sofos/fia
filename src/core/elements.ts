/**
 * Flick Element Functions
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

import type { ChildrenCallback, E, ElementFactory, VoidElementFactory, ElementProps, MaybeSignal } from "../types";
import { pushExecutionContext, popExecutionContext, getCurrentExecutionContext } from "./context";
import { $, effect, type Signal } from "./reactivity";

// =============================================================================
// TYPE UTILITIES
// =============================================================================

/**
 * Checks if a value is a Signal.
 * @param value - The value to check
 * @returns True if the value is a Signal
 */
export function isSignal(value: unknown): value is Signal<unknown> {
  if (value === null || value === undefined) return false;
  if (typeof value !== "function") return false;
  const descriptor = Object.getOwnPropertyDescriptor(value, "value");
  return descriptor !== undefined && descriptor.get !== undefined;
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

function assignProp(element: HTMLElement, key: string, value: unknown): void {
  if (key === "class") {
    applyClass(element, value);
  } else if (key === "style") {
    applyStyle(element, value);
  } else if (
    key === "value" ||
    key === "checked" ||
    key === "selected" ||
    key === "muted" ||
    key === "currentTime" ||
    key === "volume" ||
    key === "indeterminate" ||
    key === "defaultValue" ||
    key === "defaultChecked" ||
    key === "textContent" ||
    key === "innerText"
  ) {
    (element as any)[key] = value;
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
  props: ElementProps<K>
): void {
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) continue;

    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value as EventListener);
    } else if (isSignal(value)) {
      effect(() => assignProp(element, key, value.value));
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
      effect(updateClasses);
    } else {
      updateClasses();
    }
  }
}

function transformStyleValue(value: unknown): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "object") {
    // Check for Color Objects
    const v = value as any;
    if (v.type === "rgb") {
      return v.a !== undefined
        ? `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`
        : `rgb(${v.r}, ${v.g}, ${v.b})`;
    }
    if (v.type === "hsl") {
      return v.a !== undefined
        ? `hsla(${v.h}, ${v.s}%, ${v.l}%, ${v.a})`
        : `hsl(${v.h}, ${v.s}%, ${v.l}%)`;
    }
    if (v.type === "hwb") {
      return v.a !== undefined
        ? `hwb(${v.h} ${v.w}% ${v.b}% / ${v.a})`
        : `hwb(${v.h} ${v.w}% ${v.b}%)`;
    }
    if (v.type === "oklch") {
      return v.a !== undefined
        ? `oklch(${v.l}% ${v.c} ${v.h} / ${v.a})`
        : `oklch(${v.l}% ${v.c} ${v.h})`;
    }
    if (v.type === "lab") {
      return v.alpha !== undefined
        ? `lab(${v.l}% ${v.a} ${v.b} / ${v.alpha})`
        : `lab(${v.l}% ${v.a} ${v.b})`;
    }
    if (v.type === "lch") {
      return v.alpha !== undefined
        ? `lch(${v.l}% ${v.c} ${v.h} / ${v.alpha})`
        : `lch(${v.l}% ${v.c} ${v.h})`;
    }
    if (v.type === "oklab") {
      return v.alpha !== undefined
        ? `oklab(${v.l}% ${v.a} ${v.b} / ${v.alpha})`
        : `oklab(${v.l}% ${v.a} ${v.b})`;
    }
    if (v.type === "hex") {
      return v.value;
    }
    if (v.type === "color") {
      const comps = v.components.join(" ");
      return v.alpha !== undefined
        ? `color(${v.space} ${comps} / ${v.alpha})`
        : `color(${v.space} ${comps})`;
    }
    if (v.type === "color-mix") {
      const c1 = typeof v.color1 === 'object' ? transformStyleValue(v.color1) : v.color1;
      const c2 = typeof v.color2 === 'object' ? transformStyleValue(v.color2) : v.color2;
      const p1 = v.percentage1 !== undefined ? `${v.percentage1}%` : "";
      const p2 = v.percentage2 !== undefined ? `${v.percentage2}%` : "";
      // color-mix(in lch, blue 40%, red)
      return `color-mix(${v.method}, ${c1} ${p1}, ${c2} ${p2})`;
    }

    // ... extend for other object types if needed
  }

  return String(value);
}

function applyStyle(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.setAttribute("style", value);
  } else if (typeof value === "object" && value !== null) {
    for (const [prop, val] of Object.entries(value as Record<string, unknown>)) {
      if (isSignal(val)) {
        effect(() => {
          (element.style as any)[prop] = transformStyleValue(val.value);
        });
      } else {
        (element.style as any)[prop] = transformStyleValue(val);
      }
    }
  }
}

// =============================================================================
// CONTENT APPLICATION
// =============================================================================

function applyContent(
  element: HTMLElement,
  content: MaybeSignal<string | number>
): void {
  if (isSignal(content)) {
    const textNode = document.createTextNode("");
    effect(() => {
      const v = content.value;
      textNode.textContent = v == null ? "" : String(v);
    });
    element.appendChild(textNode);
  } else {
    element.appendChild(document.createTextNode(String(content)));
  }
}

// =============================================================================
// CHILDREN EXECUTION
// =============================================================================

function executeChildren<E extends HTMLElement>(
  element: E,
  children: ChildrenCallback<E>
): void {
  pushExecutionContext(element);
  try {
    children(element);
  } finally {
    popExecutionContext();
  }
}

// =============================================================================
// ELEMENT FACTORY
// =============================================================================

/**
 * Creates an element factory for a specific HTML tag.
 * 
 * @param tag - The HTML tag name (e.g., "div", "span")
 * @returns An `ElementFactory` function for creating elements of that type
 */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
): ElementFactory<K> {
  return (
    arg1?: MaybeSignal<string | number> | ElementProps<K> | ChildrenCallback<E<K>>,
    arg2?: ElementProps<K> | ChildrenCallback<E<K>>,
    arg3?: ChildrenCallback<E<K>>
  ): E<K> => {
    const element = document.createElement(tag);

    // Parse arguments based on types
    let content: MaybeSignal<string | number> | undefined;
    let props: ElementProps<K> | undefined;
    let children: ChildrenCallback<E<K>> | undefined;

    if (arg1 === undefined) {
      // 1. element()
    } else if (isContent(arg1)) {
      content = arg1;
      if (arg2 === undefined) {
        // 2. element(content)
      } else if (isProps<K>(arg2)) {
        props = arg2;
        if (arg3 !== undefined) {
          // 8. element(content, props, children)
          children = arg3;
        }
        // else 6. element(content, props)
      } else if (isChildrenCallback<E<K>>(arg2)) {
        // 7. element(content, children)
        children = arg2;
      }
    } else if (isProps<K>(arg1)) {
      props = arg1;
      if (isChildrenCallback<E<K>>(arg2)) {
        // 5. element(props, children)
        children = arg2;
      }
      // else 3. element(props)
    } else if (isChildrenCallback<E<K>>(arg1)) {
      // 4. element(children)
      children = arg1;
    }

    // Apply in order: props, content, children
    if (props) {
      applyProps(element, props);
    }

    if (content !== undefined) {
      // Auto-wrap zero-arity functions in signals for reactivity
      if (typeof content === "function" && !isSignal(content)) {
        // It's a thunk, wrap it in a computed
        applyContent(element, $(content as () => string));
      } else {
        applyContent(element, content);
      }
    }

    if (children) {
      executeChildren(element, children);
    }

    // Mount to current context
    getCurrentExecutionContext().appendChild(element);

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
  tag: K
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
  value: unknown
): value is ElementProps<K> {
  return (
    typeof value === "object" &&
    value !== null &&
    !isSignal(value) &&
    !Array.isArray(value)
  );
}

function isChildrenCallback<E extends HTMLElement>(
  value: unknown
): value is ChildrenCallback<E> {
  return typeof value === "function" && !isSignal(value);
}

// Helper to check for zero-arity functions (thunks) that returns primitives
function isContentThunk(value: unknown): value is () => string | number {
  return typeof value === "function" && value.length === 0 && !isSignal(value);
}

function isContent(value: unknown): value is MaybeSignal<string | number> {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    isSignal(value) ||
    isContentThunk(value)
  );
}

// =============================================================================
// ELEMENT EXPORTS
// =============================================================================

// Text elements
export const div: ElementFactory<"div"> = createElement("div");
export const span: ElementFactory<"span"> = createElement("span");
export const p: ElementFactory<"p"> = createElement("p");
export const h1: ElementFactory<"h1"> = createElement("h1");
export const h2: ElementFactory<"h2"> = createElement("h2");
export const h3: ElementFactory<"h3"> = createElement("h3");
export const h4: ElementFactory<"h4"> = createElement("h4");
export const h5: ElementFactory<"h5"> = createElement("h5");
export const h6: ElementFactory<"h6"> = createElement("h6");
export const a: ElementFactory<"a"> = createElement("a");
export const strong: ElementFactory<"strong"> = createElement("strong");
export const em: ElementFactory<"em"> = createElement("em");
export const code: ElementFactory<"code"> = createElement("code");
export const pre: ElementFactory<"pre"> = createElement("pre");

// Form elements
export const form: ElementFactory<"form"> = createElement("form");
export const input: VoidElementFactory<"input"> = createVoidElement("input");
export const textarea: ElementFactory<"textarea"> = createElement("textarea");
export const select: ElementFactory<"select"> = createElement("select");
export const option: ElementFactory<"option"> = createElement("option");
export const optgroup: ElementFactory<"optgroup"> = createElement("optgroup");
export const button: ElementFactory<"button"> = createElement("button");
export const label: ElementFactory<"label"> = createElement("label");
export const fieldset: ElementFactory<"fieldset"> = createElement("fieldset");
export const legend: ElementFactory<"legend"> = createElement("legend");
export const datalist: ElementFactory<"datalist"> = createElement("datalist");
export const output: ElementFactory<"output"> = createElement("output");

// List elements
export const ul: ElementFactory<"ul"> = createElement("ul");
export const ol: ElementFactory<"ol"> = createElement("ol");
export const li: ElementFactory<"li"> = createElement("li");
export const dl: ElementFactory<"dl"> = createElement("dl");
export const dt: ElementFactory<"dt"> = createElement("dt");
export const dd: ElementFactory<"dd"> = createElement("dd");

// Table elements
export const table: ElementFactory<"table"> = createElement("table");
export const thead: ElementFactory<"thead"> = createElement("thead");
export const tbody: ElementFactory<"tbody"> = createElement("tbody");
export const tfoot: ElementFactory<"tfoot"> = createElement("tfoot");
export const tr: ElementFactory<"tr"> = createElement("tr");
export const td: ElementFactory<"td"> = createElement("td");
export const th: ElementFactory<"th"> = createElement("th");
export const caption: ElementFactory<"caption"> = createElement("caption");
export const colgroup: ElementFactory<"colgroup"> = createElement("colgroup");
export const col: VoidElementFactory<"col"> = createVoidElement("col");

// Semantic elements
export const header: ElementFactory<"header"> = createElement("header");
export const footer: ElementFactory<"footer"> = createElement("footer");
export const nav: ElementFactory<"nav"> = createElement("nav");
export const main: ElementFactory<"main"> = createElement("main");
export const section: ElementFactory<"section"> = createElement("section");
export const article: ElementFactory<"article"> = createElement("article");
export const aside: ElementFactory<"aside"> = createElement("aside");
export const figure: ElementFactory<"figure"> = createElement("figure");
export const figcaption: ElementFactory<"figcaption"> = createElement("figcaption");
export const hgroup: ElementFactory<"hgroup"> = createElement("hgroup");
export const search: ElementFactory<"search"> = createElement("search");
export const address: ElementFactory<"address"> = createElement("address");

// Media elements
export const img: VoidElementFactory<"img"> = createVoidElement("img");
export const video: ElementFactory<"video"> = createElement("video");
export const audio: ElementFactory<"audio"> = createElement("audio");
export const canvas: ElementFactory<"canvas"> = createElement("canvas");
export const picture: ElementFactory<"picture"> = createElement("picture");
export const source: VoidElementFactory<"source"> = createVoidElement("source");
export const track: VoidElementFactory<"track"> = createVoidElement("track");
export const iframe: ElementFactory<"iframe"> = createElement("iframe");
export const embed: VoidElementFactory<"embed"> = createVoidElement("embed");
export const object: ElementFactory<"object"> = createElement("object");
export const map: ElementFactory<"map"> = createElement("map");

// Interactive elements
export const details: ElementFactory<"details"> = createElement("details");
export const summary: ElementFactory<"summary"> = createElement("summary");
export const dialog: ElementFactory<"dialog"> = createElement("dialog");
export const menu: ElementFactory<"menu"> = createElement("menu");

// Text-level elements
export const br: VoidElementFactory<"br"> = createVoidElement("br");
export const hr: VoidElementFactory<"hr"> = createVoidElement("hr");
export const wbr: VoidElementFactory<"wbr"> = createVoidElement("wbr");
export const blockquote: ElementFactory<"blockquote"> = createElement("blockquote");
export const q: ElementFactory<"q"> = createElement("q");
export const cite: ElementFactory<"cite"> = createElement("cite");
export const abbr: ElementFactory<"abbr"> = createElement("abbr");
export const time: ElementFactory<"time"> = createElement("time");
export const small: ElementFactory<"small"> = createElement("small");
export const sub: ElementFactory<"sub"> = createElement("sub");
export const sup: ElementFactory<"sup"> = createElement("sup");
export const mark: ElementFactory<"mark"> = createElement("mark");
export const del: ElementFactory<"del"> = createElement("del");
export const ins: ElementFactory<"ins"> = createElement("ins");
export const kbd: ElementFactory<"kbd"> = createElement("kbd");
export const samp: ElementFactory<"samp"> = createElement("samp");
export const var_: ElementFactory<"var"> = createElement("var");
export const dfn: ElementFactory<"dfn"> = createElement("dfn");
export const bdi: ElementFactory<"bdi"> = createElement("bdi");
export const bdo: ElementFactory<"bdo"> = createElement("bdo");
export const ruby: ElementFactory<"ruby"> = createElement("ruby");
export const rt: ElementFactory<"rt"> = createElement("rt");
export const rp: ElementFactory<"rp"> = createElement("rp");
export const data: ElementFactory<"data"> = createElement("data");

// Progress/Meter
export const progress: ElementFactory<"progress"> = createElement("progress");
export const meter: ElementFactory<"meter"> = createElement("meter");

// Template/Slot
export const template: ElementFactory<"template"> = createElement("template");
export const slot: ElementFactory<"slot"> = createElement("slot");

// Document metadata (void elements)
export const area: VoidElementFactory<"area"> = createVoidElement("area");
export const base: VoidElementFactory<"base"> = createVoidElement("base");
export const link: VoidElementFactory<"link"> = createVoidElement("link");
export const meta: VoidElementFactory<"meta"> = createVoidElement("meta");

// Script/Style (typically used differently but included for completeness)
export const script: ElementFactory<"script"> = createElement("script");
export const style: ElementFactory<"style"> = createElement("style");
export const noscript: ElementFactory<"noscript"> = createElement("noscript");

// Deprecated but sometimes needed
export const b: ElementFactory<"b"> = createElement("b");
export const i: ElementFactory<"i"> = createElement("i");
export const u: ElementFactory<"u"> = createElement("u");
export const s: ElementFactory<"s"> = createElement("s");

