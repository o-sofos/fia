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
 * The returned factory supports 8 overloads for flexibility:
 * 1. `div()` - Empty element
 * 2. `div(content)` - Text or Signal content
 * 3. `div(props)` - Attributes and event listeners
 * 4. `div(childrenCallback)` - Nesting
 * 5. `div(props, children)`
 * 6. `div(content, props)`
 * 7. `div(content, children)`
 * 8. `div(content, props, children)`
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
 * Void elements like `<input>`, `<br>`, `<img>` cannot have children.
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
/** Generic container definition. */
export const div: ElementFactory<"div"> = createElement("div");
/** Generic inline container definition. */
export const span: ElementFactory<"span"> = createElement("span");
/** Paragraph definition. */
export const p: ElementFactory<"p"> = createElement("p");
/** Heading 1 definition. */
export const h1: ElementFactory<"h1"> = createElement("h1");
/** Heading 2 definition. */
export const h2: ElementFactory<"h2"> = createElement("h2");
/** Heading 3 definition. */
export const h3: ElementFactory<"h3"> = createElement("h3");
/** Heading 4 definition. */
export const h4: ElementFactory<"h4"> = createElement("h4");
/** Heading 5 definition. */
export const h5: ElementFactory<"h5"> = createElement("h5");
/** Heading 6 definition. */
export const h6: ElementFactory<"h6"> = createElement("h6");
/** Anchor link definition. */
export const a: ElementFactory<"a"> = createElement("a");
/** Strong emphasis definition. */
export const strong: ElementFactory<"strong"> = createElement("strong");
/** Emphasis definition. */
export const em: ElementFactory<"em"> = createElement("em");
/** Inline code definition. */
export const code: ElementFactory<"code"> = createElement("code");
/** Preformatted text definition. */
export const pre: ElementFactory<"pre"> = createElement("pre");

// Form elements
/** Form definition. */
export const form: ElementFactory<"form"> = createElement("form");
/** Input field definition. */
export const input: VoidElementFactory<"input"> = createVoidElement("input");
/** Textarea definition. */
export const textarea: ElementFactory<"textarea"> = createElement("textarea");
/** Select dropdown definition. */
export const select: ElementFactory<"select"> = createElement("select");
/** Option definition. */
export const option: ElementFactory<"option"> = createElement("option");
/** Option group definition. */
export const optgroup: ElementFactory<"optgroup"> = createElement("optgroup");
/** Button definition. */
export const button: ElementFactory<"button"> = createElement("button");
/** Label definition. */
export const label: ElementFactory<"label"> = createElement("label");
/** Fieldset definition. */
export const fieldset: ElementFactory<"fieldset"> = createElement("fieldset");
/** Legend definition. */
export const legend: ElementFactory<"legend"> = createElement("legend");
/** Data list definition. */
export const datalist: ElementFactory<"datalist"> = createElement("datalist");
/** Output definition. */
export const output: ElementFactory<"output"> = createElement("output");

// List elements
/** Unordered list definition. */
export const ul: ElementFactory<"ul"> = createElement("ul");
/** Ordered list definition. */
export const ol: ElementFactory<"ol"> = createElement("ol");
/** List item definition. */
export const li: ElementFactory<"li"> = createElement("li");
/** Description list definition. */
export const dl: ElementFactory<"dl"> = createElement("dl");
/** Description term definition. */
export const dt: ElementFactory<"dt"> = createElement("dt");
/** Description details definition. */
export const dd: ElementFactory<"dd"> = createElement("dd");

// Table elements
/** Table container definition. */
export const table: ElementFactory<"table"> = createElement("table");
/** Table header definition. */
export const thead: ElementFactory<"thead"> = createElement("thead");
/** Table body definition. */
export const tbody: ElementFactory<"tbody"> = createElement("tbody");
/** Table footer definition. */
export const tfoot: ElementFactory<"tfoot"> = createElement("tfoot");
/** Table row definition. */
export const tr: ElementFactory<"tr"> = createElement("tr");
/** Table data cell definition. */
export const td: ElementFactory<"td"> = createElement("td");
/** Table header cell definition. */
export const th: ElementFactory<"th"> = createElement("th");
/** Table caption definition. */
export const caption: ElementFactory<"caption"> = createElement("caption");
/** Column group definition. */
export const colgroup: ElementFactory<"colgroup"> = createElement("colgroup");
/** Column definition. */
export const col: VoidElementFactory<"col"> = createVoidElement("col");

// Semantic elements
/** Header definition. */
export const header: ElementFactory<"header"> = createElement("header");
/** Footer definition. */
export const footer: ElementFactory<"footer"> = createElement("footer");
/** Navigation definition. */
export const nav: ElementFactory<"nav"> = createElement("nav");
/** Main content definition. */
export const main: ElementFactory<"main"> = createElement("main");
/** Section definition. */
export const section: ElementFactory<"section"> = createElement("section");
/** Article definition. */
export const article: ElementFactory<"article"> = createElement("article");
/** Aside content definition. */
export const aside: ElementFactory<"aside"> = createElement("aside");
/** Figure definition. */
export const figure: ElementFactory<"figure"> = createElement("figure");
/** Figure caption definition. */
export const figcaption: ElementFactory<"figcaption"> = createElement("figcaption");
/** Header group definition. */
export const hgroup: ElementFactory<"hgroup"> = createElement("hgroup");
/** Search definition. */
export const search: ElementFactory<"search"> = createElement("search");
/** Address definition. */
export const address: ElementFactory<"address"> = createElement("address");

// Media elements
/** Image definition. */
export const img: VoidElementFactory<"img"> = createVoidElement("img");
/** Video definition. */
export const video: ElementFactory<"video"> = createElement("video");
/** Audio definition. */
export const audio: ElementFactory<"audio"> = createElement("audio");
/** Canvas definition. */
export const canvas: ElementFactory<"canvas"> = createElement("canvas");
/** Picture definition. */
export const picture: ElementFactory<"picture"> = createElement("picture");
/** Source definition. */
export const source: VoidElementFactory<"source"> = createVoidElement("source");
/** Track definition. */
export const track: VoidElementFactory<"track"> = createVoidElement("track");
/** Iframe definition. */
export const iframe: ElementFactory<"iframe"> = createElement("iframe");
/** Embed definition. */
export const embed: VoidElementFactory<"embed"> = createVoidElement("embed");
/** Object definition. */
export const object: ElementFactory<"object"> = createElement("object");
/** Map definition. */
export const map: ElementFactory<"map"> = createElement("map");

// Interactive elements
/** Details definition. */
export const details: ElementFactory<"details"> = createElement("details");
/** Summary definition. */
export const summary: ElementFactory<"summary"> = createElement("summary");
/** Dialog definition. */
export const dialog: ElementFactory<"dialog"> = createElement("dialog");
/** Menu definition. */
export const menu: ElementFactory<"menu"> = createElement("menu");

// Text-level elements
/** Line break definition. */
export const br: VoidElementFactory<"br"> = createVoidElement("br");
/** Horizontal rule definition. */
export const hr: VoidElementFactory<"hr"> = createVoidElement("hr");
/** Word break opportunity definition. */
export const wbr: VoidElementFactory<"wbr"> = createVoidElement("wbr");
/** Blockquote definition. */
export const blockquote: ElementFactory<"blockquote"> = createElement("blockquote");
/** Inline quotation definition. */
export const q: ElementFactory<"q"> = createElement("q");
/** Citation definition. */
export const cite: ElementFactory<"cite"> = createElement("cite");
/** Abbreviation definition. */
export const abbr: ElementFactory<"abbr"> = createElement("abbr");
/** Time definition. */
export const time: ElementFactory<"time"> = createElement("time");
/** Small print definition. */
export const small: ElementFactory<"small"> = createElement("small");
/** Subscript definition. */
export const sub: ElementFactory<"sub"> = createElement("sub");
/** Superscript definition. */
export const sup: ElementFactory<"sup"> = createElement("sup");
/** Marked text definition. */
export const mark: ElementFactory<"mark"> = createElement("mark");
/** Deleted text definition. */
export const del: ElementFactory<"del"> = createElement("del");
/** Inserted text definition. */
export const ins: ElementFactory<"ins"> = createElement("ins");
/** Keyboard input definition. */
export const kbd: ElementFactory<"kbd"> = createElement("kbd");
/** Sample output definition. */
export const samp: ElementFactory<"samp"> = createElement("samp");
/** Variable definition. */
export const var_: ElementFactory<"var"> = createElement("var");
/** Definition definition. */
export const dfn: ElementFactory<"dfn"> = createElement("dfn");
/** Bi-directional isolation definition. */
export const bdi: ElementFactory<"bdi"> = createElement("bdi");
/** Bi-directional override definition. */
export const bdo: ElementFactory<"bdo"> = createElement("bdo");
/** Ruby annotation definition. */
export const ruby: ElementFactory<"ruby"> = createElement("ruby");
/** Ruby text definition. */
export const rt: ElementFactory<"rt"> = createElement("rt");
/** Ruby parenthesis definition. */
export const rp: ElementFactory<"rp"> = createElement("rp");
/** Data definition. */
export const data: ElementFactory<"data"> = createElement("data");

// Progress/Meter
/** Progress bar definition. */
export const progress: ElementFactory<"progress"> = createElement("progress");
/** Scalar measurement definition. */
export const meter: ElementFactory<"meter"> = createElement("meter");

// Template/Slot
/** Template definition. */
export const template: ElementFactory<"template"> = createElement("template");
/** Shadow DOM slot definition. */
export const slot: ElementFactory<"slot"> = createElement("slot");

// Document metadata (void elements)
/** Area definition. */
export const area: VoidElementFactory<"area"> = createVoidElement("area");
/** Base URL definition. */
export const base: VoidElementFactory<"base"> = createVoidElement("base");
/** Link definition. */
export const link: VoidElementFactory<"link"> = createVoidElement("link");
/** Metadata definition. */
export const meta: VoidElementFactory<"meta"> = createVoidElement("meta");

// Script/Style (typically used differently but included for completeness)
/** Script definition. */
export const script: ElementFactory<"script"> = createElement("script");
/** Style definition. */
export const style: ElementFactory<"style"> = createElement("style");
/** Noscript definition. */
export const noscript: ElementFactory<"noscript"> = createElement("noscript");

// Deprecated but sometimes needed
/** Bold definition. */
export const b: ElementFactory<"b"> = createElement("b");
/** Italic definition. */
export const i: ElementFactory<"i"> = createElement("i");
/** Underline definition. */
export const u: ElementFactory<"u"> = createElement("u");
/** Strikethrough definition. */
export const s: ElementFactory<"s"> = createElement("s");

