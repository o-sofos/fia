/**
 * Flick Element Functions
 *
 * Factory functions for all HTML elements that auto-mount to parent context.
 * Each function returns the created HTMLElement.
 */

import { pushContext, popContext, getCurrentContext, type Context } from "./context";
import { effect, type Signal } from "./reactivity";

/**
 * Context that captures nodes appended to it instead of attaching to DOM
 */
class CaptureContext implements Context {
  nodes: Node[] = [];
  appendChild(node: Node): Node {
    this.nodes.push(node);
    return node;
  }
}

/**
 * Check if a value is a Signal (has .value property)
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
 * Append a child to an element
 */
function appendChild(parent: HTMLElement | Context, child: Child): void {
  const target = parent instanceof HTMLElement ? parent : parent;
  
  if (child === null || child === undefined) {
    return;
  }

  if (typeof child === "string" || typeof child === "number") {
    target.appendChild(document.createTextNode(String(child)));
  } else if (child instanceof HTMLElement) {
    target.appendChild(child);
  } else if (isSignal(child)) {
    // Reactive text node
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
      if (typeof (target as any).insertBefore === 'function') {
        const realParent = target as HTMLElement;
        const referenceParams = anchor.nextSibling;
        
        for (const node of captureCtx.nodes) {
          realParent.insertBefore(node, referenceParams); 
          activeNodes.push(node);
        }
      } else {
         // Parent is a CaptureContext.
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

/** A child can be a string, number, signal, or render function */
export type Child = string | number | Signal<unknown> | (() => void) | HTMLElement | null | undefined;

/**
 * MaybeSignal type helps with "Smart Signals"
 */
export type MaybeSignal<T> = T | Signal<T>;

/**
 * Strict Element Props mapped from HTMLElementTagNameMap
 */
export type ElementProps<T extends HTMLElement> = {
  [K in keyof Omit<T, 'style' | 'class'>]?: MaybeSignal<T[K]>;
} & {
  class?: MaybeSignal<string | Record<string, MaybeSignal<boolean>>>;
  style?: MaybeSignal<string | Partial<CSSStyleDeclaration> | Record<string, string>>;
  [key: string]: any; // Allow data-* attributes and others not in strict types
};

/**
 * Assign a single property/attribute to an element
 */
function assignProp(element: HTMLElement, key: string, value: unknown) {
  if (key === "class") {
    applyClass(element, value);
  } else if (key === "style") {
    applyStyle(element, value);
  } else {
    // Smart Property Assignment
    // For these keys, the property state is more important/richer than the attribute
    if (key === "value" || key === "checked" || key === "selected" || key === "muted") {
      (element as any)[key] = value;
    } else if (typeof value === "boolean") {
      // Handle boolean attributes (disabled, readonly, required, open, etc.)
      // Note: 'readonly' attribute maps to 'readOnly' property, so we use attribute for safety/simplicity here.
      if (value) {
        element.setAttribute(key, "");
      } else {
        element.removeAttribute(key);
      }
    } else {
      // Default to attribute
      element.setAttribute(key, String(value));
    }
  }
}

/**
 * Apply props to an element
 */
function applyProps(element: HTMLElement, props: Record<string, any>): void {
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("on") && typeof value === "function") {
      // Event handler
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value as EventListener);
    } else if (isSignal(value)) {
      // Reactive prop
      effect(() => {
        assignProp(element, key, value.value);
      });
    } else if (value !== null && value !== undefined) {
      // Static prop
      assignProp(element, key, value);
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
    // Object form: { active: isActive.value } needs to be handled?
    // If usage is class: { active: isActive }, applyProps sees object. 
    // isSignal check is top level.
    // If value is object { active: true }, keys are static.
    // If nested signals? 
    // Flick philosophy: use signal for whole prop or computed signal.
    // user: class: computed(() => ({ active: isActive.value }))
    const classes: string[] = [];
    for (const [className, condition] of Object.entries(value as Record<string, unknown>)) {
        // If condition is signal?
        // Current implementation expects boolean.
        // If nested signal support is needed, applyClass logic needs to be reactive.
        // But simpler to just unwrap boolean.
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
      // Direct assignment supports camelCase properties
      (element.style as any)[prop] = val;
    }
  }
}


/**
 * Type for element factory functions
 */
export type ElementFactory<K extends keyof HTMLElementTagNameMap> = (
  propsOrChild?: ElementProps<HTMLElementTagNameMap[K]> | Child,
  ...children: Child[]
) => HTMLElementTagNameMap[K];

/**
 * Create an element factory function
 */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
): ElementFactory<K> {
  return (propsOrChild?: ElementProps<HTMLElementTagNameMap[K]> | Child, ...children: Child[]): HTMLElementTagNameMap[K] => {
    const element = document.createElement(tag);

    // Determine if first arg is props or a child
    let props: Record<string, any> | null = null;
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
        props = propsOrChild as Record<string, any>;
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

    return element as HTMLElementTagNameMap[K];
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
