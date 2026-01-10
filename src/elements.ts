/**
 * Flick Element Functions
 *
 * Factory functions for all HTML elements that auto-mount to parent context.
 * Each function returns the created HTMLElement.
 */

import { pushContext, popContext, getCurrentContext } from "./context";
import { effect, type Signal } from "./reactivity";

/** Props that can be passed to element functions */
export type ElementProps = {
  [key: string]: unknown;
  class?: string | Record<string, boolean>;
  style?: Partial<CSSStyleDeclaration> | string;
};

/** A child can be a string, number, signal, or render function */
export type Child = string | number | Signal<unknown> | (() => void) | HTMLElement | null | undefined;

/**
 * Check if a value is a Signal (has .value property)
 */
function isSignal(value: unknown): value is Signal<unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    "value" in value &&
    Object.getOwnPropertyDescriptor(value, "value")?.get !== undefined
  );
}

/**
 * Apply props to an element
 */
function applyProps(element: HTMLElement, props: ElementProps): void {
  for (const [key, value] of Object.entries(props)) {
    if (key === "class") {
      applyClass(element, value);
    } else if (key === "style") {
      applyStyle(element, value);
    } else if (key.startsWith("on") && typeof value === "function") {
      // Event handler
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value as EventListener);
    } else if (isSignal(value)) {
      // Reactive attribute
      effect(() => {
        element.setAttribute(key, String((value as Signal<unknown>).value));
      });
    } else if (value !== null && value !== undefined) {
      // Static attribute
      element.setAttribute(key, String(value));
    }
  }
}

/**
 * Apply class prop (string or object form)
 */
function applyClass(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.className = value;
  } else if (typeof value === "object" && value !== null) {
    // Object form: { active: isActive.value }
    const classes: string[] = [];
    for (const [className, condition] of Object.entries(value as Record<string, boolean>)) {
      if (condition) {
        classes.push(className);
      }
    }
    element.className = classes.join(" ");
  }
}

/**
 * Apply style prop (object or string form)
 */
function applyStyle(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.setAttribute("style", value);
  } else if (typeof value === "object" && value !== null) {
    for (const [prop, val] of Object.entries(value as Record<string, string>)) {
      element.style.setProperty(prop, val);
    }
  }
}

/**
 * Append a child to an element
 */
function appendChild(parent: HTMLElement, child: Child): void {
  if (child === null || child === undefined) {
    return;
  }

  if (typeof child === "string" || typeof child === "number") {
    parent.appendChild(document.createTextNode(String(child)));
  } else if (child instanceof HTMLElement) {
    parent.appendChild(child);
  } else if (isSignal(child)) {
    // Reactive text node
    const textNode = document.createTextNode("");
    effect(() => {
      textNode.textContent = String(child.value);
    });
    parent.appendChild(textNode);
  } else if (typeof child === "function") {
    // Render function - push context and execute
    pushContext(parent);
    try {
      child();
    } finally {
      popContext();
    }
  }
}

/**
 * Create an element factory function
 */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
): (propsOrChild?: ElementProps | Child, ...children: Child[]) => HTMLElementTagNameMap[K] {
  return (propsOrChild?: ElementProps | Child, ...children: Child[]): HTMLElementTagNameMap[K] => {
    const element = document.createElement(tag);

    // Determine if first arg is props or a child
    let props: ElementProps | null = null;
    let allChildren: Child[] = [];

    if (propsOrChild !== undefined) {
      if (
        typeof propsOrChild === "object" &&
        propsOrChild !== null &&
        !(propsOrChild instanceof HTMLElement) &&
        !isSignal(propsOrChild) &&
        typeof propsOrChild !== "function"
      ) {
        // It's a props object
        props = propsOrChild as ElementProps;
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
export const button = createElement("button");
export const label = createElement("label");
export const fieldset = createElement("fieldset");
export const legend = createElement("legend");

// List elements
export const ul = createElement("ul");
export const ol = createElement("ol");
export const li = createElement("li");

// Table elements
export const table = createElement("table");
export const thead = createElement("thead");
export const tbody = createElement("tbody");
export const tfoot = createElement("tfoot");
export const tr = createElement("tr");
export const td = createElement("td");
export const th = createElement("th");

// Semantic elements
export const header = createElement("header");
export const footer = createElement("footer");
export const nav = createElement("nav");
export const main = createElement("main");
export const section = createElement("section");
export const article = createElement("article");
export const aside = createElement("aside");

// Media elements
export const img = createElement("img");
export const video = createElement("video");
export const audio = createElement("audio");
export const canvas = createElement("canvas");

// Other common elements
export const br = createElement("br");
export const hr = createElement("hr");
export const blockquote = createElement("blockquote");
export const details = createElement("details");
export const summary = createElement("summary");
export const dialog = createElement("dialog");
export const progress = createElement("progress");
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
