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
 * Type for element factory functions
 */
export type ElementFactory<K extends keyof HTMLElementTagNameMap> = (
  propsOrChild?: ElementProps | Child,
  ...children: Child[]
) => HTMLElementTagNameMap[K];

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
/** HTML <div> element */
export const div: ElementFactory<"div"> = createElement("div");
/** HTML <span> element */
export const span: ElementFactory<"span"> = createElement("span");
/** HTML <p> element */
export const p: ElementFactory<"p"> = createElement("p");
/** HTML <h1> element */
export const h1: ElementFactory<"h1"> = createElement("h1");
/** HTML <h2> element */
export const h2: ElementFactory<"h2"> = createElement("h2");
/** HTML <h3> element */
export const h3: ElementFactory<"h3"> = createElement("h3");
/** HTML <h4> element */
export const h4: ElementFactory<"h4"> = createElement("h4");
/** HTML <h5> element */
export const h5: ElementFactory<"h5"> = createElement("h5");
/** HTML <h6> element */
export const h6: ElementFactory<"h6"> = createElement("h6");
/** HTML <a> element */
export const a: ElementFactory<"a"> = createElement("a");
/** HTML <strong> element */
export const strong: ElementFactory<"strong"> = createElement("strong");
/** HTML <em> element */
export const em: ElementFactory<"em"> = createElement("em");
/** HTML <code> element */
export const code: ElementFactory<"code"> = createElement("code");
/** HTML <pre> element */
export const pre: ElementFactory<"pre"> = createElement("pre");

// Form elements
/** HTML <form> element */
export const form: ElementFactory<"form"> = createElement("form");
/** HTML <input> element */
export const input: ElementFactory<"input"> = createElement("input");
/** HTML <textarea> element */
export const textarea: ElementFactory<"textarea"> = createElement("textarea");
/** HTML <select> element */
export const select: ElementFactory<"select"> = createElement("select");
/** HTML <option> element */
export const option: ElementFactory<"option"> = createElement("option");
/** HTML <button> element */
export const button: ElementFactory<"button"> = createElement("button");
/** HTML <label> element */
export const label: ElementFactory<"label"> = createElement("label");
/** HTML <fieldset> element */
export const fieldset: ElementFactory<"fieldset"> = createElement("fieldset");
/** HTML <legend> element */
export const legend: ElementFactory<"legend"> = createElement("legend");

// List elements
/** HTML <ul> element */
export const ul: ElementFactory<"ul"> = createElement("ul");
/** HTML <ol> element */
export const ol: ElementFactory<"ol"> = createElement("ol");
/** HTML <li> element */
export const li: ElementFactory<"li"> = createElement("li");

// Table elements
/** HTML <table> element */
export const table: ElementFactory<"table"> = createElement("table");
/** HTML <thead> element */
export const thead: ElementFactory<"thead"> = createElement("thead");
/** HTML <tbody> element */
export const tbody: ElementFactory<"tbody"> = createElement("tbody");
/** HTML <tfoot> element */
export const tfoot: ElementFactory<"tfoot"> = createElement("tfoot");
/** HTML <tr> element */
export const tr: ElementFactory<"tr"> = createElement("tr");
/** HTML <td> element */
export const td: ElementFactory<"td"> = createElement("td");
/** HTML <th> element */
export const th: ElementFactory<"th"> = createElement("th");

// Semantic elements
/** HTML <header> element */
export const header: ElementFactory<"header"> = createElement("header");
/** HTML <footer> element */
export const footer: ElementFactory<"footer"> = createElement("footer");
/** HTML <nav> element */
export const nav: ElementFactory<"nav"> = createElement("nav");
/** HTML <main> element */
export const main: ElementFactory<"main"> = createElement("main");
/** HTML <section> element */
export const section: ElementFactory<"section"> = createElement("section");
/** HTML <article> element */
export const article: ElementFactory<"article"> = createElement("article");
/** HTML <aside> element */
export const aside: ElementFactory<"aside"> = createElement("aside");

// Media elements
/** HTML <img> element */
export const img: ElementFactory<"img"> = createElement("img");
/** HTML <video> element */
export const video: ElementFactory<"video"> = createElement("video");
/** HTML <audio> element */
export const audio: ElementFactory<"audio"> = createElement("audio");
/** HTML <canvas> element */
export const canvas: ElementFactory<"canvas"> = createElement("canvas");

// Other common elements
/** HTML <br> element */
export const br: ElementFactory<"br"> = createElement("br");
/** HTML <hr> element */
export const hr: ElementFactory<"hr"> = createElement("hr");
/** HTML <blockquote> element */
export const blockquote: ElementFactory<"blockquote"> = createElement("blockquote");
/** HTML <details> element */
export const details: ElementFactory<"details"> = createElement("details");
/** HTML <summary> element */
export const summary: ElementFactory<"summary"> = createElement("summary");
/** HTML <dialog> element */
export const dialog: ElementFactory<"dialog"> = createElement("dialog");
/** HTML <progress> element */
export const progress: ElementFactory<"progress"> = createElement("progress");
/** HTML <abbr> element */
export const abbr: ElementFactory<"abbr"> = createElement("abbr");
/** HTML <address> element */
export const address: ElementFactory<"address"> = createElement("address");
/** HTML <time> element */
export const time: ElementFactory<"time"> = createElement("time");
/** HTML <small> element */
export const small: ElementFactory<"small"> = createElement("small");
/** HTML <sub> element */
export const sub: ElementFactory<"sub"> = createElement("sub");
/** HTML <sup> element */
export const sup: ElementFactory<"sup"> = createElement("sup");
/** HTML <mark> element */
export const mark: ElementFactory<"mark"> = createElement("mark");
/** HTML <del> element */
export const del: ElementFactory<"del"> = createElement("del");
/** HTML <ins> element */
export const ins: ElementFactory<"ins"> = createElement("ins");
/** HTML <kbd> element */
export const kbd: ElementFactory<"kbd"> = createElement("kbd");
/** HTML <samp> element */
export const samp: ElementFactory<"samp"> = createElement("samp");
