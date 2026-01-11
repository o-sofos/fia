/**
 * Flick Element Functions
 *
 * Factory functions for all HTML elements that auto-mount to parent context.
 * Full TypeScript autocomplete with strict attribute types.
 */

import { pushContext, popContext, getCurrentContext, type Context } from "./context";
import { effect, type Signal } from "./reactivity";

// =============================================================================
// CAPTURE CONTEXT
// =============================================================================

class CaptureContext implements Context {
  nodes: Node[] = [];
  appendChild(node: Node): Node {
    this.nodes.push(node);
    return node;
  }
}

// =============================================================================
// TYPE UTILITIES
// =============================================================================

export function isSignal(value: unknown): value is Signal<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    "value" in value &&
    Object.getOwnPropertyDescriptor(value, "value")?.get !== undefined
  );
}

export type MaybeSignal<T> = T | Signal<T>;

export type Child =
  | string
  | number
  | boolean
  | Signal<unknown>
  | (() => void)
  | HTMLElement
  | Child[]
  | null
  | undefined;

// =============================================================================
// STRICT ATTRIBUTE TYPES
// =============================================================================

type InputType =
  | "text" | "password" | "email" | "number" | "tel" | "url"
  | "search" | "date" | "time" | "datetime-local" | "month" | "week"
  | "color" | "file" | "hidden" | "checkbox" | "radio"
  | "range" | "submit" | "reset" | "button" | "image";

type InputMode = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

type AutoCapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";

type EnterKeyHint = "enter" | "done" | "go" | "next" | "previous" | "search" | "send";

type ButtonType = "submit" | "reset" | "button";

type FormMethod = "get" | "post" | "dialog";

type FormEnctype = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";

type CrossOrigin = "anonymous" | "use-credentials" | "";

type Decoding = "sync" | "async" | "auto";

type Loading = "eager" | "lazy";

type FetchPriority = "high" | "low" | "auto";

type Preload = "none" | "metadata" | "auto" | "";

type ReferrerPolicy =
  | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin"
  | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | "";

type Target = "_self" | "_blank" | "_parent" | "_top";

type Dir = "ltr" | "rtl" | "auto";

type Wrap = "soft" | "hard";

type ThScope = "row" | "col" | "rowgroup" | "colgroup";

type Autocomplete =
  | "off" | "on" | "name" | "email" | "username" | "new-password" | "current-password"
  | "one-time-code" | "organization" | "street-address" | "country" | "country-name"
  | "postal-code" | "cc-name" | "cc-number" | "cc-exp" | "cc-csc" | "tel" | "url";

// =============================================================================
// EVENT HANDLER TYPES
// =============================================================================

type EventHandlers<E extends Element> = {
  [K in keyof HTMLElementEventMap as `on${K}`]?: (
    this: E,
    event: Omit<HTMLElementEventMap[K], "currentTarget"> & { currentTarget: E }
  ) => void;
};

// =============================================================================
// GLOBAL ATTRIBUTES (shared by all elements)
// =============================================================================

interface GlobalAttributes {
  // Core
  id?: MaybeSignal<string>;
  class?: MaybeSignal<string> | Record<string, MaybeSignal<boolean>>;
  style?: MaybeSignal<string> | MaybeSignal<Partial<CSSStyleDeclaration>>;
  title?: MaybeSignal<string>;
  lang?: MaybeSignal<string>;
  dir?: MaybeSignal<Dir>;
  
  // Accessibility
  role?: MaybeSignal<string>;
  tabIndex?: MaybeSignal<number>;
  
  // Editing
  contentEditable?: MaybeSignal<"true" | "false" | "plaintext-only">;
  spellcheck?: MaybeSignal<boolean>;
  draggable?: MaybeSignal<boolean>;
  
  // Input hints
  inputMode?: MaybeSignal<InputMode>;
  enterKeyHint?: MaybeSignal<EnterKeyHint>;
  autoCapitalize?: MaybeSignal<AutoCapitalize>;
  
  // Boolean
  hidden?: MaybeSignal<boolean>;
  inert?: MaybeSignal<boolean>;
  
  // Popover
  popover?: MaybeSignal<"auto" | "manual">;
}

type DataAttributes = { [K in `data-${string}`]?: MaybeSignal<string | number | boolean> };
type AriaAttributes = { [K in `aria-${string}`]?: MaybeSignal<string | number | boolean> };

// =============================================================================
// ELEMENT-SPECIFIC ATTRIBUTES
// =============================================================================

interface InputAttrs extends GlobalAttributes {
  type?: MaybeSignal<InputType>;
  name?: MaybeSignal<string>;
  value?: MaybeSignal<string | number>;
  defaultValue?: MaybeSignal<string>;
  placeholder?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  readOnly?: MaybeSignal<boolean>;
  required?: MaybeSignal<boolean>;
  autofocus?: MaybeSignal<boolean>;
  autocomplete?: MaybeSignal<Autocomplete>;
  min?: MaybeSignal<string | number>;
  max?: MaybeSignal<string | number>;
  step?: MaybeSignal<string | number>;
  minLength?: MaybeSignal<number>;
  maxLength?: MaybeSignal<number>;
  pattern?: MaybeSignal<string>;
  multiple?: MaybeSignal<boolean>;
  accept?: MaybeSignal<string>;
  checked?: MaybeSignal<boolean>;
  defaultChecked?: MaybeSignal<boolean>;
  indeterminate?: MaybeSignal<boolean>;
  size?: MaybeSignal<number>;
  list?: MaybeSignal<string>;
  form?: MaybeSignal<string>;
}

interface TextAreaAttrs extends GlobalAttributes {
  name?: MaybeSignal<string>;
  value?: MaybeSignal<string>;
  defaultValue?: MaybeSignal<string>;
  placeholder?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  readOnly?: MaybeSignal<boolean>;
  required?: MaybeSignal<boolean>;
  autofocus?: MaybeSignal<boolean>;
  autocomplete?: MaybeSignal<Autocomplete>;
  rows?: MaybeSignal<number>;
  cols?: MaybeSignal<number>;
  minLength?: MaybeSignal<number>;
  maxLength?: MaybeSignal<number>;
  wrap?: MaybeSignal<Wrap>;
  form?: MaybeSignal<string>;
}

interface SelectAttrs extends GlobalAttributes {
  name?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  required?: MaybeSignal<boolean>;
  autofocus?: MaybeSignal<boolean>;
  multiple?: MaybeSignal<boolean>;
  size?: MaybeSignal<number>;
  form?: MaybeSignal<string>;
  autocomplete?: MaybeSignal<Autocomplete>;
}

interface OptionAttrs extends GlobalAttributes {
  value?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  selected?: MaybeSignal<boolean>;
  label?: MaybeSignal<string>;
}

interface ButtonAttrs extends GlobalAttributes {
  type?: MaybeSignal<ButtonType>;
  name?: MaybeSignal<string>;
  value?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  autofocus?: MaybeSignal<boolean>;
  form?: MaybeSignal<string>;
  formAction?: MaybeSignal<string>;
  formMethod?: MaybeSignal<FormMethod>;
  formEnctype?: MaybeSignal<FormEnctype>;
  formNoValidate?: MaybeSignal<boolean>;
  formTarget?: MaybeSignal<Target>;
  popoverTarget?: MaybeSignal<string>;
  popoverTargetAction?: MaybeSignal<"toggle" | "show" | "hide">;
}

interface FormAttrs extends GlobalAttributes {
  action?: MaybeSignal<string>;
  method?: MaybeSignal<FormMethod>;
  enctype?: MaybeSignal<FormEnctype>;
  target?: MaybeSignal<Target>;
  noValidate?: MaybeSignal<boolean>;
  autocomplete?: MaybeSignal<"on" | "off">;
  name?: MaybeSignal<string>;
}

interface LabelAttrs extends GlobalAttributes {
  htmlFor?: MaybeSignal<string>;
}

interface AnchorAttrs extends GlobalAttributes {
  href?: MaybeSignal<string>;
  target?: MaybeSignal<Target>;
  rel?: MaybeSignal<string>;
  download?: MaybeSignal<string | boolean>;
  hreflang?: MaybeSignal<string>;
  type?: MaybeSignal<string>;
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  ping?: MaybeSignal<string>;
}

interface ImgAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  alt?: MaybeSignal<string>;
  width?: MaybeSignal<number | string>;
  height?: MaybeSignal<number | string>;
  loading?: MaybeSignal<Loading>;
  decoding?: MaybeSignal<Decoding>;
  crossOrigin?: MaybeSignal<CrossOrigin>;
  srcset?: MaybeSignal<string>;
  sizes?: MaybeSignal<string>;
  useMap?: MaybeSignal<string>;
  isMap?: MaybeSignal<boolean>;
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  fetchPriority?: MaybeSignal<FetchPriority>;
}

interface VideoAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  width?: MaybeSignal<number>;
  height?: MaybeSignal<number>;
  poster?: MaybeSignal<string>;
  preload?: MaybeSignal<Preload>;
  autoplay?: MaybeSignal<boolean>;
  loop?: MaybeSignal<boolean>;
  muted?: MaybeSignal<boolean>;
  controls?: MaybeSignal<boolean>;
  playsInline?: MaybeSignal<boolean>;
  crossOrigin?: MaybeSignal<CrossOrigin>;
  currentTime?: MaybeSignal<number>;
  volume?: MaybeSignal<number>;
}

interface AudioAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  preload?: MaybeSignal<Preload>;
  autoplay?: MaybeSignal<boolean>;
  loop?: MaybeSignal<boolean>;
  muted?: MaybeSignal<boolean>;
  controls?: MaybeSignal<boolean>;
  crossOrigin?: MaybeSignal<CrossOrigin>;
  currentTime?: MaybeSignal<number>;
  volume?: MaybeSignal<number>;
}

interface CanvasAttrs extends GlobalAttributes {
  width?: MaybeSignal<number>;
  height?: MaybeSignal<number>;
}

interface IframeAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  srcdoc?: MaybeSignal<string>;
  name?: MaybeSignal<string>;
  width?: MaybeSignal<number | string>;
  height?: MaybeSignal<number | string>;
  loading?: MaybeSignal<Loading>;
  sandbox?: MaybeSignal<string>;
  allow?: MaybeSignal<string>;
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
}

interface ProgressAttrs extends GlobalAttributes {
  value?: MaybeSignal<number>;
  max?: MaybeSignal<number>;
}

interface MeterAttrs extends GlobalAttributes {
  value?: MaybeSignal<number>;
  min?: MaybeSignal<number>;
  max?: MaybeSignal<number>;
  low?: MaybeSignal<number>;
  high?: MaybeSignal<number>;
  optimum?: MaybeSignal<number>;
}

interface TimeAttrs extends GlobalAttributes {
  dateTime?: MaybeSignal<string>;
}

interface DialogAttrs extends GlobalAttributes {
  open?: MaybeSignal<boolean>;
}

interface DetailsAttrs extends GlobalAttributes {
  open?: MaybeSignal<boolean>;
  name?: MaybeSignal<string>;
}

interface TableCellAttrs extends GlobalAttributes {
  colSpan?: MaybeSignal<number>;
  rowSpan?: MaybeSignal<number>;
  headers?: MaybeSignal<string>;
}

interface ThAttrs extends TableCellAttrs {
  scope?: MaybeSignal<ThScope>;
  abbr?: MaybeSignal<string>;
}

interface BlockquoteAttrs extends GlobalAttributes {
  cite?: MaybeSignal<string>;
}

interface OlAttrs extends GlobalAttributes {
  start?: MaybeSignal<number>;
  reversed?: MaybeSignal<boolean>;
  type?: MaybeSignal<"1" | "a" | "A" | "i" | "I">;
}

interface LiAttrs extends GlobalAttributes {
  value?: MaybeSignal<number>;
}

// =============================================================================
// ELEMENT PROPS MAP
// =============================================================================

interface ElementPropsMap {
  input: InputAttrs;
  textarea: TextAreaAttrs;
  select: SelectAttrs;
  option: OptionAttrs;
  button: ButtonAttrs;
  form: FormAttrs;
  label: LabelAttrs;
  a: AnchorAttrs;
  img: ImgAttrs;
  video: VideoAttrs;
  audio: AudioAttrs;
  canvas: CanvasAttrs;
  iframe: IframeAttrs;
  progress: ProgressAttrs;
  meter: MeterAttrs;
  time: TimeAttrs;
  dialog: DialogAttrs;
  details: DetailsAttrs;
  td: TableCellAttrs;
  th: ThAttrs;
  blockquote: BlockquoteAttrs;
  ol: OlAttrs;
  li: LiAttrs;
}

// =============================================================================
// ELEMENT PROPS TYPE
// =============================================================================

export type ElementProps<K extends keyof HTMLElementTagNameMap> =
  (K extends keyof ElementPropsMap ? ElementPropsMap[K] : GlobalAttributes)
  & EventHandlers<HTMLElementTagNameMap[K]>
  & DataAttributes
  & AriaAttributes;

// =============================================================================
// ELEMENT FACTORY TYPE
// =============================================================================

export interface ElementFactory<K extends keyof HTMLElementTagNameMap> {
  (props: ElementProps<K>, ...children: Child[]): HTMLElementTagNameMap[K];
  (...children: Child[]): HTMLElementTagNameMap[K];
}

// =============================================================================
// CHILD HANDLING
// =============================================================================

function appendChild(parent: HTMLElement | Context, child: Child): void {
  if (child === null || child === undefined || child === false || child === true) {
    return;
  }

  if (Array.isArray(child)) {
    for (const c of child) {
      appendChild(parent, c);
    }
    return;
  }

  const target = parent;

  if (typeof child === "string" || typeof child === "number") {
    target.appendChild(document.createTextNode(String(child)));
  } else if (child instanceof HTMLElement) {
    target.appendChild(child);
  } else if (isSignal(child)) {
    const textNode = document.createTextNode("");
    effect(() => {
      textNode.textContent = String(child.value);
    });
    target.appendChild(textNode);
  } else if (typeof child === "function") {
    const anchor = document.createTextNode("");
    target.appendChild(anchor);

    let activeNodes: Node[] = [];

    effect(() => {
      for (const node of activeNodes) {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
      activeNodes = [];

      const captureCtx = new CaptureContext();
      pushContext(captureCtx);
      try {
        child();
      } finally {
        popContext();
      }

      if (typeof (target as HTMLElement).insertBefore === "function") {
        const realParent = target as HTMLElement;
        const referenceNode = anchor.nextSibling;

        for (const node of captureCtx.nodes) {
          realParent.insertBefore(node, referenceNode);
          activeNodes.push(node);
        }
      } else {
        const captureParent = target as CaptureContext;
        const index = captureParent.nodes.indexOf(anchor);
        if (index !== -1) {
          captureParent.nodes.splice(index + 1, 0, ...captureCtx.nodes);
        } else {
          captureParent.nodes.push(...captureCtx.nodes);
        }
        activeNodes.push(...captureCtx.nodes);
      }
    });
  }
}

// =============================================================================
// PROP APPLICATION
// =============================================================================

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
    key === "defaultChecked"
  ) {
    (element as any)[key] = value;
  } else if (typeof value === "boolean") {
    if (value) {
      element.setAttribute(key, "");
    } else {
      element.removeAttribute(key);
    }
  } else {
    element.setAttribute(key, String(value));
  }
}

function applyProps<K extends keyof HTMLElementTagNameMap>(
  element: HTMLElementTagNameMap[K],
  props: ElementProps<K>
): void {
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value as EventListener);
    } else if (isSignal(value)) {
      effect(() => {
        assignProp(element, key, value.value);
      });
    } else {
      assignProp(element, key, value);
    }
  }
}

function applyClass(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.className = value;
  } else if (typeof value === "object" && value !== null) {
    const classes: string[] = [];
    for (const [className, condition] of Object.entries(value as Record<string, unknown>)) {
      const isActive = isSignal(condition) ? condition.value : condition;
      if (isActive) {
        classes.push(className);
      }
    }
    element.className = classes.join(" ");
  }
}

function applyStyle(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.setAttribute("style", value);
  } else if (typeof value === "object" && value !== null) {
    for (const [prop, val] of Object.entries(value as Record<string, string>)) {
      (element.style as any)[prop] = val;
    }
  }
}

// =============================================================================
// ELEMENT FACTORY
// =============================================================================

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
): ElementFactory<K> {
  return (
    propsOrChild?: ElementProps<K> | Child,
    ...children: Child[]
  ): HTMLElementTagNameMap[K] => {
    const element = document.createElement(tag);

    let props: ElementProps<K> | null = null;
    let allChildren: Child[] = [];

    if (propsOrChild !== undefined) {
      if (
        typeof propsOrChild === "object" &&
        propsOrChild !== null &&
        !(propsOrChild instanceof HTMLElement) &&
        !isSignal(propsOrChild) &&
        typeof propsOrChild !== "function" &&
        !Array.isArray(propsOrChild)
      ) {
        props = propsOrChild as ElementProps<K>;
        allChildren = children;
      } else {
        allChildren = [propsOrChild as Child, ...children];
      }
    }

    if (props) {
      applyProps(element, props);
    }

    for (const child of allChildren) {
      appendChild(element, child);
    }

    getCurrentContext().appendChild(element);

    return element;
  };
}

// =============================================================================
// ELEMENT EXPORTS
// =============================================================================

// Text elements
export const div = createElement("div");
export const span = createElement("span");
export const p = createElement("p");
export const h1 = createElement("h1");
export const h2 = createElement("h2");
export const h3 = createElement("h3");
export const h4 = createElement("h4");
export const h5 = createElement("h5");
export const h6 = createElement("h6");
export const a = createElement("a");
export const strong = createElement("strong");
export const em = createElement("em");
export const code = createElement("code");
export const pre = createElement("pre");

// Form elements
export const form = createElement("form");
export const input = createElement("input");
export const textarea = createElement("textarea");
export const select = createElement("select");
export const option = createElement("option");
export const optgroup = createElement("optgroup");
export const button = createElement("button");
export const label = createElement("label");
export const fieldset = createElement("fieldset");
export const legend = createElement("legend");
export const datalist = createElement("datalist");
export const output = createElement("output");

// List elements
export const ul = createElement("ul");
export const ol = createElement("ol");
export const li = createElement("li");
export const dl = createElement("dl");
export const dt = createElement("dt");
export const dd = createElement("dd");

// Table elements
export const table = createElement("table");
export const thead = createElement("thead");
export const tbody = createElement("tbody");
export const tfoot = createElement("tfoot");
export const tr = createElement("tr");
export const td = createElement("td");
export const th = createElement("th");
export const caption = createElement("caption");
export const colgroup = createElement("colgroup");
export const col = createElement("col");

// Semantic elements
export const header = createElement("header");
export const footer = createElement("footer");
export const nav = createElement("nav");
export const main = createElement("main");
export const section = createElement("section");
export const article = createElement("article");
export const aside = createElement("aside");
export const figure = createElement("figure");
export const figcaption = createElement("figcaption");
export const hgroup = createElement("hgroup");
export const search = createElement("search");

// Media elements
export const img = createElement("img");
export const video = createElement("video");
export const audio = createElement("audio");
export const canvas = createElement("canvas");
export const picture = createElement("picture");
export const source = createElement("source");
export const track = createElement("track");
export const iframe = createElement("iframe");
export const embed = createElement("embed");
export const object = createElement("object");

// Interactive elements
export const details = createElement("details");
export const summary = createElement("summary");
export const dialog = createElement("dialog");
export const menu = createElement("menu");

// Text-level elements
export const br = createElement("br");
export const hr = createElement("hr");
export const wbr = createElement("wbr");
export const blockquote = createElement("blockquote");
export const q = createElement("q");
export const cite = createElement("cite");
export const abbr = createElement("abbr");
export const address = createElement("address");
export const time = createElement("time");
export const small = createElement("small");
export const sub = createElement("sub");
export const sup = createElement("sup");
export const mark = createElement("mark");
export const del = createElement("del");
export const ins = createElement("ins");
export const kbd = createElement("kbd");
export const samp = createElement("samp");
export const var_ = createElement("var");
export const dfn = createElement("dfn");
export const bdi = createElement("bdi");
export const bdo = createElement("bdo");
export const ruby = createElement("ruby");
export const rt = createElement("rt");
export const rp = createElement("rp");
export const data = createElement("data");

// Progress/Meter
export const progress = createElement("progress");
export const meter = createElement("meter");

// Template/Slot
export const template = createElement("template");
export const slot = createElement("slot");

// Deprecated but sometimes needed
export const b = createElement("b");
export const i = createElement("i");
export const u = createElement("u");
export const s = createElement("s");