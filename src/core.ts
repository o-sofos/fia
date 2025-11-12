import type { StyleRule } from "./css";
import { effect, type Getter, type Reactive } from "./reactivity";
import { type FlickId, FLICK_ROOT_ID } from "./types";
import {
  queueCommand,
  registerWorkerListener,
  workerEventListenerRegistry,
} from "./worker-api";

let nextId = 0;
const createFlickId = () => (nextId++).toString(36);

const unitlessProps = new Set([
  "animationIterationCount",
  "borderImageOutset",
  "borderImageSlice",
  "borderImageWidth",
  "boxFlex",
  "boxFlexGroup",
  "boxOrdinalGroup",
  "columnCount",
  "flex",
  "flexGrow",
  "flexPositive",
  "flexShrink",
  "flexNegative",
  "flexOrder",
  "gridRow",
  "gridRowEnd",
  "gridRowStart",
  "gridColumn",
  "gridColumnEnd",
  "gridColumnStart",
  "fontWeight",
  "lineClamp",
  "lineHeight",
  "opacity",
  "order",
  "orphans",
  "widows",
  "zIndex",
  "zoom",
]);

export type AttributeRule = {
  name: string;
  value: Reactive<string | number>;
};

function unitHelper(prop: string, value: string | number): string | number {
  if (typeof value === "number" && value !== 0 && !unitlessProps.has(prop)) {
    return `${value}px`;
  }
  return value;
}

/**
 * The core Flick element class.
 * All element factories (div, h1, etc.) return an instance of this.
 * Its methods are chainable.
 */
export class FlickElement {
  public readonly id: FlickId = createFlickId();
  public _key: string | number | null = null;
  private _children: FlickElement[] = [];

  private _isAppended: boolean = false;

  /**
   * Creates a new element in the worker and queues a 'create'
   * command for the main thread.
   *
   * This is used internally by element factories.
   * @param tag The HTML tag name (e.g., 'div').
   * @param ns The XML namespace (e.g., 'svg').
   */
  constructor(tag: string, ns?: "svg") {
    queueCommand({ type: "create", id: this.id, tag, ns });

    // Schedule an "auto-root" check
    // This will run after the current JS "tick"
    // giving .append() or .appendTo() a chance to run first.
    queueMicrotask(() => {
      if (!this._isAppended) {
        // If no parent was set, append to root by default
        this.appendTo("root");
      }
    });
  }

  /**
   * Assigns a unique key to this element.
   * This is used by the `append()` method to perform efficient
   * O(1) list reconciliation.
   *
   * @param value A unique string or number for this element.
   * @returns `this` (for chaining).
   *
   * @example
   * ```typescript
   * data.map(item =>
   * div().key(item.id).text(item.name)
   * );
   * ```
   */
  public key(value: string | number): this {
    this._key = value;
    return this;
  }

  private queueAttribute(name: string, value: string | number) {
    queueCommand({ type: "attribute", id: this.id, name, value });
  }

  private queueStyle(prop: string, value: string | number) {
    queueCommand({ type: "style", id: this.id, prop, value });
  }

  /**
   * Sets the text content of the element.
   * This method is **XSS-safe** as it uses `textContent`.
   *
   * If a `Reactive` value (a signal or getter) is passed,
   * Flick will create an effect to automatically update
   * the text when the value changes.
   *
   * @param value The static or reactive text to set.
   * @returns `this` (for chaining).
   */
  text(value: Reactive<string | number>): this {
    // This 'if' block now correctly handles both Signals and simple getters
    if (typeof value === "function") {
      effect(() => {
        const unwrappedValue = (value as Getter<any>)();
        queueCommand({
          type: "text",
          id: this.id,
          value: String(unwrappedValue),
        });
      });
    } else {
      queueCommand({ type: "text", id: this.id, value: String(value) });
    }
    return this;
  }

  /**
   * Applies CSS styles to the element.
   *
   * Pass one or more `StyleRule` objects created by the
   * CSS helper functions (e.g., `color('red')`).
   *
   * @param rules The `StyleRule` objects to apply.
   * @returns `this` (for chaining).
   *
   * @example
   * ```typescript
   * import { color, padding } from 'jsr:@flick/core/css';
   *
   * div().style(
   * color('blue'),
   * padding(10, 20)
   * );
   * ```
   */
  style(...rules: StyleRule[]): this {
    for (const rule of rules) {
      const { prop, value, unit } = rule;

      if (typeof value === "function") {
        // It's reactive (a Getter or Signal)
        effect(() => {
          let unwrappedValue = (value as Getter<any>)();
          if (unit === "px") {
            unwrappedValue = unitHelper(prop, unwrappedValue);
          }
          this.queueStyle(prop, unwrappedValue);
        });
      } else {
        // It's a static value
        let staticValue = value;
        if (unit === "px") {
          staticValue = unitHelper(prop, staticValue);
        }
        this.queueStyle(prop, staticValue);
      }
    }
    return this;
  }

  /**
   * Appends this element to a specific parent.
   * @param parent The `FlickElement` to append to, or 'root' for the body.
   * @returns `this` (for chaining).
   */
  appendTo(parent: FlickElement | "root"): this {
    this._isAppended = true;

    const parentId = parent === "root" ? FLICK_ROOT_ID : parent.id;
    queueCommand({
      type: "append",
      parentId: parentId,
      childId: this.id,
      beforeId: null,
    });
    return this;
  }

  /**
   * Appends one or more child elements.
   *
   * This method performs an efficient, keyed reconciliation to
   * add, move, or remove children, minimizing DOM operations.
   *
   * @param children The child `FlickElement`s to append.
   * @returns `this` (for chaining).
   */
  append(...children: FlickElement[]): this {
    const oldChildren = this._children;
    const newChildren = children;

    const oldKeyMap = new Map<string | number, FlickElement>();
    oldChildren.forEach((child) => {
      if (child._key !== null) {
        // Map the existing DOM element ID to its key
        oldKeyMap.set(child._key, child);
      }
    });

    const newKeySet = new Set<string | number>();
    newChildren.forEach((child) => {
      if (child._key !== null) {
        newKeySet.add(child._key);
      }
    });

    // 1. Remove old children that are no longer present
    oldChildren.forEach((oldChild) => {
      if (oldChild._key === null || !newKeySet.has(oldChild._key)) {
        oldChild.destroy();
      }
    });

    // 2. Add and Move new children
    newChildren.forEach((newChild, i) => {
      newChild._isAppended = true;
      const key = newChild._key;

      // --- Determine the Before Node (The Fix) ---
      let beforeId: FlickId | null = null;

      // Iterate over the rest of the new children to find the first sibling
      // that corresponds to an element ALREADY IN THE DOM.
      for (let j = i + 1; j < newChildren.length; j++) {
        const potentialSibling = newChildren[j];

        // If this sibling is a MOVED node, it is already in the DOM.
        if (
          potentialSibling._key !== null &&
          oldKeyMap.has(potentialSibling._key)
        ) {
          // Get the *existing* DOM node's ID to use as the reference
          beforeId = oldKeyMap.get(potentialSibling._key!)!.id;
          break;
        }
        // If the sibling is brand new, we ignore it and check the next one.
      }

      const oldChild = key !== null ? oldKeyMap.get(key) : undefined;

      if (oldChild) {
        // --- IT'S AN EXISTING NODE (MOVE) ---
        // If the old element is in the wrong place, move it.
        queueCommand({
          type: "move",
          id: oldChild.id,
          parentId: this.id,
          beforeId: beforeId,
        });
      } else {
        // --- IT'S A NEW NODE (CREATE & APPEND) ---
        // Insert the brand new node before the first existing element found above.
        queueCommand({
          type: "append",
          parentId: this.id,
          childId: newChild.id,
          beforeId: beforeId,
        });
      }
    });

    // 3. Update internal state
    this._children = newChildren;

    return this;
  }

  /**
   * Attaches an event listener that runs in the worker.
   *
   * The event payload is automatically serialized and sent
   * from the main thread to the worker.
   *
   * @param event The DOM event name (e.g., 'click', 'input').
   * @param handler The callback function to run in the worker.
   * @returns `this` (for chaining).
   */
  on(event: string, handler: (payload: any) => void): this {
    // Store the real handler in the worker's registry
    registerWorkerListener(this.id, event, handler);

    // Tell the main thread to attach a proxy listener
    queueCommand({ type: "listen", id: this.id, event });

    return this;
  }

  /**
   * Applies attributes to the element.
   *
   * Pass one or more `AttributeRule` objects from the
   * SVG or ARIA helper modules. This method is **XSS-safe**
   * and sanitizes dangerous attributes like `href` and `on*` handlers.
   *
   * @param rules The `AttributeRule` objects to apply.
   * @returns `this` (for chaining).
   *
   * @example
   * ```typescript
   * import { href } from 'jsr:@flick/core/svg';
   *
   * mySvgCircle.attr(href('#foo'));
   * ```
   */
  attr(...rules: AttributeRule[]): this;
  /**
   * Applies a single attribute. (Legacy)
   */
  attr(name: string, value: Reactive<string | number>): this;

  // Implementation
  attr(first: string | AttributeRule, ...rest: any[]): this {
    if (typeof first === "string") {
      // --- Signature: attr(name, value) ---
      const name = first;
      const value = rest[0] as Reactive<string | number>;

      if (typeof value === "function") {
        effect(() => {
          const unwrappedValue = (value as Getter<any>)();
          this.queueAttribute(name, String(unwrappedValue));
        });
      } else {
        this.queueAttribute(name, String(value));
      }
    } else {
      // --- Signature: attr(...rules) ---
      const rules = [first, ...rest] as AttributeRule[];
      for (const rule of rules) {
        const { name, value } = rule;
        if (typeof value === "function") {
          effect(() => {
            const unwrappedValue = (value as Getter<any>)();
            this.queueAttribute(name, String(unwrappedValue));
          });
        } else {
          this.queueAttribute(name, String(value));
        }
      }
    }
    return this;
  }

  /**
   * Recursively destroys this element and all its children.
   *
   * This queues 'destroy' commands for the main thread, which
   * will remove the DOM nodes and clean up all associated
   * event listeners to prevent memory leaks.
   */
  public destroy(): void {
    // 1. Destroy all children first (depth-first)
    for (const child of this._children) {
      child.destroy();
    }

    // 2. Queue the destroy command for this element
    queueCommand({ type: "destroy", id: this.id });

    // 3. We also need to clean up the worker-side listener map
    // (This assumes workerEventListenerRegistry is in worker-api.ts)
    workerEventListenerRegistry.delete(this.id);
  }
}

/**
 * A specialized FlickElement that creates elements
 * in the SVG namespace.
 */
export class FlickSvgElement extends FlickElement {
  constructor(tag: string) {
    // Always call the parent constructor with 'svg'
    super(tag, "svg");
  }
}
