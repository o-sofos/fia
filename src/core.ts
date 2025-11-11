import type { StyleRule } from "./html.props";
import { effect, type Getter, type Reactive } from "./reactivity";
import { type FlickId, FLICK_ROOT_ID } from "./types";
import { queueCommand, registerWorkerListener } from "./worker-api";

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

export class FlickElement {
  public readonly id: FlickId = createFlickId();
  public key: string | number | null = null;
  private _children: FlickElement[] = [];

  private _isAppended: boolean = false;

  /**
   * Assigns a unique key to this element, used for
   * O(1) keyed list reconciliation.
   */
  public setKey(value: string | number): this {
    this.key = value;
    return this;
  }

  private queueAttribute(name: string, value: string | number) {
    queueCommand({ type: "attribute", id: this.id, name, value });
  }

  private queueStyle(prop: string, value: string | number) {
    queueCommand({ type: "style", id: this.id, prop, value });
  }

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

  appendTo(parent: FlickElement | "root"): this {
    this._isAppended = true;

    const parentId = parent === "root" ? FLICK_ROOT_ID : parent.id;
    queueCommand({ type: "append", parentId: parentId, childId: this.id });
    return this;
  }

  /**
   * Replaces all children of this element with a new set,
   * performing an efficient, keyed reconciliation.
   *
   * @param children The new child elements to append.
   */
  append(...children: FlickElement[]): this {
    // This is a simple but fast reconciliation algorithm

    const oldChildren = this._children;
    const newChildren = children;

    const oldKeyMap = new Map<string | number, FlickElement>();
    oldChildren.forEach((child) => {
      if (child.key !== null) {
        oldKeyMap.set(child.key, child);
      }
    });

    const newKeyMap = new Map<string | number, FlickElement>();
    newChildren.forEach((child) => {
      if (child.key !== null) {
        newKeyMap.set(child.key, child);
      }
    });

    // 1. Remove old children that are no longer present
    oldChildren.forEach((oldChild) => {
      if (oldChild.key === null || !newKeyMap.has(oldChild.key)) {
        // We need a .destroy() method to clean up
        // For now, let's just queue a command
        queueCommand({ type: "destroy", id: oldChild.id }); // (We'd need to implement this)
      }
    });

    // 2. Add and Move new children
    let lastPlacedNode: FlickElement | null = null;

    newChildren.forEach((newChild) => {
      // This prevents the child's auto-root microtask
      // from firing incorrectly.
      newChild._isAppended = true;

      const key = newChild.key;

      if (key !== null && oldKeyMap.has(key)) {
        // --- IT'S AN EXISTING NODE (MOVE) ---
        const oldChild = oldKeyMap.get(key)!;

        // Find the node that should be "before" this one
        const beforeId = lastPlacedNode ? lastPlacedNode.id : null;

        // Send the MOVE command
        queueCommand({
          type: "move",
          id: oldChild.id,
          parentId: this.id,
          beforeId: beforeId,
        });

        lastPlacedNode = oldChild; // This node is now placed
      } else {
        // --- IT'S A NEW NODE (APPEND) ---
        // We'll just call the original 'append' logic
        queueCommand({
          type: "append",
          parentId: this.id,
          childId: newChild.id,
        });
        lastPlacedNode = newChild;
      }
    });

    // 3. Update internal state
    this._children = newChildren;

    return this;
  }

  /**
   * Attaches an event listener that runs in the worker.
   * @param event The event name (e.g., 'click')
   * @param handler The handler function
   */
  on(event: string, handler: (payload: any) => void): this {
    // Store the real handler in the worker's registry
    registerWorkerListener(this.id, event, handler);

    // Tell the main thread to attach a proxy listener
    queueCommand({ type: "listen", id: this.id, event });

    return this;
  }

  /**
   * Sets an attribute on the element.
   * This is used for all SVG properties (e.g., cx, cy, d)
   * and standard HTML attributes (e.g., href, src, alt).
   */
  attr(...rules: AttributeRule[]): this;
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
