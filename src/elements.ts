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
 * Append a child to an element
 */
function appendChild(parent: HTMLElement | Context, child: Child): void {
  const target = parent instanceof HTMLElement ? parent : parent;
  // If parent is not an HTMLElement (i.e. it's a proxy Context), 
  // we just call appendChild. This handles nested proxies naturally.
  // Wait, if parent is CaptureContext, appendChild is defined.
  // But logic below creates text nodes etc.
  
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
      // 1. Clean up old nodes
      // Since this effect might run multiple times, we need to remove the previous elements
      // from the DOM to avoid duplication.
      // Note: If nodes were captured in a CaptureContext, 'remove()' might fail or be no-op 
      // if they haven't been attached to real DOM yet. But typically 'effect' runs
      // synchronously immediately (initial run), then asynchronously later?
      // Our effect implementation is synchronous.
      
      for (const node of activeNodes) {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
      activeNodes = [];

      // 2. Run the function in a capture context
      const captureCtx = new CaptureContext();
      pushContext(captureCtx);
      try {
        child();
      } finally {
        popContext();
      }

      // 3. Move new nodes to the correct place (after anchor)
      // If parent is a real HTMLElement:
      if (typeof (target as any).insertBefore === 'function') {
        const realParent = target as HTMLElement;
        const referenceParams = anchor.nextSibling;
        
        for (const node of captureCtx.nodes) {
          realParent.insertBefore(node, referenceParams); // If ref is null, appends to end
          activeNodes.push(node);
        }
      } else {
         // Parent is a CaptureContext. We just push them up.
         // But we need to maintain order relative to 'anchor'.
         // Since CaptureContext just maintains a list, re-inserting is tricky without
         // proper list splicing support.
         // Limitation: Reactive functions inside a CaptureContext (nested reactivity inside function)
         // might be tricky with this simple implementation.
         // BUT standard usage is: div(() => { ... })
         // div is an HTMLElement. So target IS an HTMLElement usually.
         // It's only a CaptureContext if we are INSIDE another reactive function.
         // In that case, we are building the list for the OUTSIDE effect.
         // The outside effect will handle attachment.
         // So for now, we just append to the parent context in order.
         // Actually, if we are in a capture context, 'anchor' is in captureCtx.nodes.
         // We should insert 'blockNodes' after 'anchor' in 'target.nodes'.
         // This requires CaptureContext to support splice/insert.
         // Let's assume for now target is HTMLElement for the common case.
         // If it's not, we might append to end (which might be wrong order if other siblings exist).
         
         // Fix: Only support direct DOM manipulation for now. Nested reactive functions ok as long as parent is real.
         // If parent is CaptureContext, we just append. This means nested reactivity re-renders entire parent list?
         // No, the inner effect runs independently.
         // For a recursive VDOM-less system, handling nested reactive inserts into a detached list is hard.
         // Simple solution: CaptureContext should support `insertBefore`.
         // Let's assume it does or casting.
         
         const captureParent = target as CaptureContext;
         // Find anchor index
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
