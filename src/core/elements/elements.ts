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

import { pushExecutionContext, popExecutionContext, getCurrentExecutionContext } from "../context/context";
import { $, $e, type Signal, type MaybeSignal, isSignal } from "../reactivity/reactivity";
import type { ElementProps } from "../attributes/html-attributes";

export { type MaybeSignal, isSignal };
export type { ElementProps };

export type Renderable = string | number | boolean | null | undefined;

/** Children callback - receives element reference, creates children inside */
type ChildrenCallback<E extends HTMLElement> = (el: E) => void;

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
 * Smart Element type that includes strict attribute autocomplete and event handlers.
 * It intersects the native element with our strictly typed props to ensure DX.
 */
export type SmartElement<K extends keyof HTMLElementTagNameMap, P> = HTMLElementTagNameMap[K] & {
  // We can attach custom properties or methods here if needed
  // For now, it mainly serves to carry the Props type for inference
  _props?: P;
};

// Shorthand for simple element type (no specific props inference needed for return usually)
type E<K extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[K];


/**
 * Factory function for creating HTML elements.
 * Supports signal content, properties, and children overloads.
 *
 * @template K - The HTML tag name key from HTMLElementTagNameMap
 */
export interface ElementFactory<K extends keyof HTMLElementTagNameMap> {
  /** 1. Empty element */
  (): E<K>;
  /** 2. Text content only */
  (content: MaybeSignal<string | number>): E<K>;
  /** 3. Props only */
  <const P extends ElementProps<K>>(props: P): SmartElement<K, P>;
  /** 4. Children callback only */
  (children: ChildrenCallback<E<K>>): E<K>;
  /** 5. Props + children */
  <const P extends ElementProps<K>>(
    props: P,
    children: (element: SmartElement<K, P>) => void
  ): SmartElement<K, P>;
  /** 6. Content + props */
  <const P extends ElementProps<K>>(
    content: MaybeSignal<string | number>,
    props: P
  ): SmartElement<K, P>;
  /** 7. Content + children */
  (
    content: MaybeSignal<string | number>,
    children: ChildrenCallback<E<K>>
  ): E<K>;
  /** 8. Content + props + children */
  <const P extends ElementProps<K>>(
    content: MaybeSignal<string | number>,
    props: P,
    children: (element: SmartElement<K, P>) => void
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
        $e(() => {
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
    $e(() => {
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

export const a = createElement("a");
export const abbr = createElement("abbr");
export const address = createElement("address");
export const area = createVoidElement("area");
export const article = createElement("article");
export const aside = createElement("aside");
export const audio = createElement("audio");
export const b = createElement("b");
export const base = createVoidElement("base");
export const bdi = createElement("bdi");
export const bdo = createElement("bdo");
export const blockquote = createElement("blockquote");
export const body = createElement("body");
export const br = createVoidElement("br");
export const button = createElement("button");
export const canvas = createElement("canvas");
export const caption = createElement("caption");
export const cite = createElement("cite");
export const code = createElement("code");
export const col = createVoidElement("col");
export const colgroup = createElement("colgroup");
export const data = createElement("data");
export const datalist = createElement("datalist");
export const dd = createElement("dd");
export const del = createElement("del");
export const details = createElement("details");
export const dfn = createElement("dfn");
export const dialog = createElement("dialog");
export const div = createElement("div");
export const dl = createElement("dl");
export const dt = createElement("dt");
export const em = createElement("em");
export const embed = createVoidElement("embed");
export const fieldset = createElement("fieldset");
export const figcaption = createElement("figcaption");
export const figure = createElement("figure");
export const footer = createElement("footer");
export const form = createElement("form");
export const h1 = createElement("h1");
export const h2 = createElement("h2");
export const h3 = createElement("h3");
export const h4 = createElement("h4");
export const h5 = createElement("h5");
export const h6 = createElement("h6");
export const head = createElement("head");
export const header = createElement("header");
export const hgroup = createElement("hgroup");
export const hr = createVoidElement("hr");
export const html = createElement("html");
export const i = createElement("i");
export const iframe = createElement("iframe");
export const img = createVoidElement("img");
export const input = createVoidElement("input");
export const ins = createElement("ins");
export const kbd = createElement("kbd");
export const label = createElement("label");
export const legend = createElement("legend");
export const li = createElement("li");
export const link = createVoidElement("link");
export const main = createElement("main");
export const map = createElement("map");
export const mark = createElement("mark");
export const menu = createElement("menu");
export const meta = createVoidElement("meta");
export const meter = createElement("meter");
export const nav = createElement("nav");
export const noscript = createElement("noscript");
export const object = createElement("object");
export const ol = createElement("ol");
export const optgroup = createElement("optgroup");
export const option = createElement("option");
export const output = createElement("output");
export const p = createElement("p");
export const picture = createElement("picture");
export const pre = createElement("pre");
export const progress = createElement("progress");
export const q = createElement("q");
export const rp = createElement("rp");
export const rt = createElement("rt");
export const ruby = createElement("ruby");
export const s = createElement("s");
export const samp = createElement("samp");
export const script = createElement("script");
export const search = createElement("search");
export const section = createElement("section");
export const select = createElement("select");
export const slot = createElement("slot");
export const small = createElement("small");
export const source = createVoidElement("source");
export const span = createElement("span");
export const strong = createElement("strong");
export const style = createElement("style");
export const sub = createElement("sub");
export const summary = createElement("summary");
export const sup = createElement("sup");
export const table = createElement("table");
export const tbody = createElement("tbody");
export const td = createElement("td");
export const template = createElement("template");
export const textarea = createElement("textarea");
export const tfoot = createElement("tfoot");
export const th = createElement("th");
export const thead = createElement("thead");
export const time = createElement("time");
export const title = createElement("title");
export const tr = createElement("tr");
export const track = createVoidElement("track");
export const u = createElement("u");
export const ul = createElement("ul");
export const var_ = createElement("var"); // var is reserved
export const video = createElement("video");
export const wbr = createVoidElement("wbr");
