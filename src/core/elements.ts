/**
 * Flick Element Functions
 *
 * Factory functions for all HTML elements that auto-mount to parent context.
 * Each function returns the created HTMLElement.
 *
 * Features:
 * - Full TypeScript autocomplete for element-specific attributes
 * - Type-safe event handlers (onclick gets MouseEvent, onkeydown gets KeyboardEvent, etc.)
 * - Reactive props via Signal<T> anywhere
 * - data-* and aria-* attribute support
 * - Compile-time errors for invalid attributes
 */

import { pushContext, popContext, getCurrentContext, type Context } from "./context";
import { effect, type Signal } from "./reactivity";

// =============================================================================
// CAPTURE CONTEXT
// =============================================================================

/**
 * Context that captures nodes appended to it instead of attaching to DOM.
 * Used internally for reactive function children.
 */
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

/**
 * Check if a value is a Signal (has reactive .value property)
 */
export function isSignal(value: unknown): value is Signal<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    "value" in value &&
    Object.getOwnPropertyDescriptor(value, "value")?.get !== undefined
  );
}

/**
 * MaybeSignal - value can be static or reactive
 */
export type MaybeSignal<T> = T | Signal<T>;

/**
 * Child types - what can be passed as element children
 */
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
// EVENT HANDLER TYPES
// =============================================================================

/**
 * Event handler types - properly typed for each event kind
 * 
 * - `this` is bound to the element
 * - `currentTarget` is typed to the element the handler is attached to
 * - `target` remains EventTarget | null (can be any descendant in bubble path)
 */
type EventHandlers<E extends Element> = {
  [K in keyof HTMLElementEventMap as `on${K}`]?: (
    this: E,
    event: Omit<HTMLElementEventMap[K], "currentTarget"> & { currentTarget: E }
  ) => void;
};

// =============================================================================
// ELEMENT PROPS TYPES
// =============================================================================

/**
 * Properties we explicitly exclude from settable props
 */
type ExcludedKeys =
  // Handled separately with special logic
  | "style"
  | "className"
  // DOM traversal (readonly)
  | "parentElement"
  | "parentNode"
  | "childNodes"
  | "children"
  | "firstChild"
  | "lastChild"
  | "firstElementChild"
  | "lastElementChild"
  | "nextSibling"
  | "previousSibling"
  | "nextElementSibling"
  | "previousElementSibling"
  | "ownerDocument"
  | "isConnected"
  | "shadowRoot"
  | "assignedSlot"
  // Node info (readonly)
  | "nodeName"
  | "nodeType"
  | "nodeValue"
  | "tagName"
  | "localName"
  | "namespaceURI"
  | "prefix"
  | "baseURI"
  | "textContent"
  | "innerHTML"
  | "innerText"
  | "outerHTML"
  | "outerText"
  // Element dimensions/position (readonly, computed)
  | "clientHeight"
  | "clientWidth"
  | "clientTop"
  | "clientLeft"
  | "scrollHeight"
  | "scrollWidth"
  | "offsetHeight"
  | "offsetWidth"
  | "offsetTop"
  | "offsetLeft"
  | "offsetParent"
  // Form element readonly properties
  | "form"
  | "validity"
  | "validationMessage"
  | "willValidate"
  | "labels"
  | "list"
  | "files"
  | "selectionStart"
  | "selectionEnd"
  | "selectionDirection"
  // Media element readonly properties
  | "duration"
  | "paused"
  | "ended"
  | "seeking"
  | "readyState"
  | "networkState"
  | "buffered"
  | "seekable"
  | "played"
  | "videoHeight"
  | "videoWidth"
  | "audioTracks"
  | "videoTracks"
  | "textTracks"
  | "mediaKeys"
  | "error"
  // Other readonly
  | "dataset"
  | "attributes"
  | "classList"
  | "part"
  | "sheet"
  | "complete"
  | "naturalHeight"
  | "naturalWidth"
  | "currentSrc"
  | "contentDocument"
  | "contentWindow"
  // Event handlers - we handle these separately with proper typing
  | keyof GlobalEventHandlers
  | `on${string}`;

/**
 * Filter to only include settable attributes/properties from an HTMLElement.
 * Excludes methods, readonly properties, and event handlers.
 */
type SettableProps<E extends HTMLElement> = {
  [K in keyof E as K extends ExcludedKeys
    ? never
    : K extends string
      ? E[K] extends Function
        ? never
        : K
      : never]?: MaybeSignal<E[K]>;
};

/**
 * Global HTML attributes available on all elements
 */
interface GlobalAttributes {
  class?: MaybeSignal<string> | Record<string, MaybeSignal<boolean>>;
  style?: MaybeSignal<string> | MaybeSignal<Partial<CSSStyleDeclaration>>;
}

/**
 * Data and ARIA attributes - allow any data-* or aria-* attribute
 */
type DataAndAriaAttributes = {
  [K in `data-${string}`]?: MaybeSignal<string | number | boolean>;
} & {
  [K in `aria-${string}`]?: MaybeSignal<string | number | boolean>;
};

/**
 * Complete element props - combining all pieces
 */
export type ElementProps<E extends HTMLElement> =
  & SettableProps<E>
  & GlobalAttributes
  & EventHandlers<E>
  & DataAndAriaAttributes;

/**
 * Element factory function signature with overloads for better DX
 */
export interface ElementFactory<K extends keyof HTMLElementTagNameMap> {
  (props: ElementProps<HTMLElementTagNameMap[K]>, ...children: Child[]): HTMLElementTagNameMap[K];
  (...children: Child[]): HTMLElementTagNameMap[K];
}

// =============================================================================
// CHILD HANDLING
// =============================================================================

/**
 * Append a child to an element or context.
 * Handles strings, numbers, booleans, signals, functions, arrays, and elements.
 */
function appendChild(parent: HTMLElement | Context, child: Child): void {
  // Filter out falsy values (enables conditional rendering patterns)
  if (child === null || child === undefined || child === false || child === true) {
    return;
  }

  // Handle arrays recursively
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
    // Reactive text node - updates when signal changes
    const textNode = document.createTextNode("");
    effect(() => {
      textNode.textContent = String(child.value);
    });
    target.appendChild(textNode);
  } else if (typeof child === "function") {
    // Reactive function: Create an anchor and compute children reactively
    const anchor = document.createTextNode("");
    target.appendChild(anchor);

    let activeNodes: Node[] = [];

    effect(() => {
      // Clean up old nodes
      for (const node of activeNodes) {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
      activeNodes = [];

      // Run the function in a capture context
      const captureCtx = new CaptureContext();
      pushContext(captureCtx);
      try {
        child();
      } finally {
        popContext();
      }

      // Move new nodes to the correct place (after anchor)
      if (typeof (target as HTMLElement).insertBefore === "function") {
        const realParent = target as HTMLElement;
        const referenceNode = anchor.nextSibling;

        for (const node of captureCtx.nodes) {
          realParent.insertBefore(node, referenceNode);
          activeNodes.push(node);
        }
      } else {
        // Parent is a CaptureContext
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

/**
 * Assign a single property/attribute to an element.
 * 
 * Some properties (value, checked, etc.) must be set as element properties
 * rather than attributes because their property state is richer than the
 * attribute representation.
 */
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
    // Set as property for richer state handling
    (element as any)[key] = value;
  } else if (typeof value === "boolean") {
    // Boolean attributes: present = true, absent = false
    if (value) {
      element.setAttribute(key, "");
    } else {
      element.removeAttribute(key);
    }
  } else {
    // Default: set as attribute
    element.setAttribute(key, String(value));
  }
}

/**
 * Apply all props to an element
 */
function applyProps<E extends HTMLElement>(element: E, props: ElementProps<E>): void {
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (key.startsWith("on") && typeof value === "function") {
      // Event handler - extract event name and attach listener
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value as EventListener);
    } else if (isSignal(value)) {
      // Reactive prop - re-apply when signal changes
      effect(() => {
        assignProp(element, key, value.value);
      });
    } else {
      // Static prop
      assignProp(element, key, value);
    }
  }
}

/**
 * Apply class prop - supports string or object notation
 */
function applyClass(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.className = value;
  } else if (typeof value === "object" && value !== null) {
    // Object form: { active: true, disabled: false }
    const classes: string[] = [];
    for (const [className, condition] of Object.entries(value as Record<string, unknown>)) {
      // Unwrap signal if needed
      const isActive = isSignal(condition) ? condition.value : condition;
      if (isActive) {
        classes.push(className);
      }
    }
    element.className = classes.join(" ");
  }
}

/**
 * Apply style prop - supports string or object notation
 */
function applyStyle(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.setAttribute("style", value);
  } else if (typeof value === "object" && value !== null) {
    // Object form: { backgroundColor: "red", fontSize: "16px" }
    for (const [prop, val] of Object.entries(value as Record<string, string>)) {
      (element.style as any)[prop] = val;
    }
  }
}

// =============================================================================
// ELEMENT FACTORY
// =============================================================================

/**
 * Create an element factory function for a given tag.
 * The returned function creates elements that auto-mount to the current context.
 */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
): ElementFactory<K> {
  return (
    propsOrChild?: ElementProps<HTMLElementTagNameMap[K]> | Child,
    ...children: Child[]
  ): HTMLElementTagNameMap[K] => {
    const element = document.createElement(tag);

    // Determine if first argument is props or a child
    let props: ElementProps<HTMLElementTagNameMap[K]> | null = null;
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
        // It's a props object
        props = propsOrChild as ElementProps<HTMLElementTagNameMap[K]>;
        allChildren = children;
      } else {
        // It's a child
        allChildren = [propsOrChild as Child, ...children];
      }
    }

    // Apply props
    if (props) {
      applyProps(element, props);
    }

    // Append children
    for (const child of allChildren) {
      appendChild(element, child);
    }

    // Auto-mount to current context
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

// Template/Slot (for web components)
export const template = createElement("template");
export const slot = createElement("slot");

// Deprecated but sometimes needed
export const b = createElement("b");
export const i = createElement("i");
export const u = createElement("u");
export const s = createElement("s");