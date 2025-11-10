import type { StyleRule } from "./css-html-props";
import type { AttributeRule } from "./css-svg-props";
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

function unitHelper(prop: string, value: string | number): string | number {
  if (typeof value === "number" && value !== 0 && !unitlessProps.has(prop)) {
    return `${value}px`;
  }
  return value;
}

export class FlickElement {
  public readonly id: FlickId = createFlickId();

  private queueAttribute(name: string, value: string | number) {
    queueCommand({ type: "attribute", id: this.id, name, value });
  }

  private queueStyle(prop: string, value: string | number) {
    queueCommand({ type: "style", id: this.id, prop, value });
  }

  constructor(tag: string, ns?: "svg") {
    queueCommand({ type: "create", id: this.id, tag, ns });
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
    queueCommand({
      type: "append",
      parentId: parent === "root" ? FLICK_ROOT_ID : parent.id,
      childId: this.id,
    });
    return this;
  }

  /**
   * Appends multiple FlickElement children to this element.
   * This is a convenience method that calls .appendTo() on each child,
   * passing 'this' (the current element) as the parent.
   */
  append(...elements: FlickElement[]): this {
    for (const element of elements) {
      element.appendTo(this);
    }
    return this; // For chaining
  }

  /**
   * Attaches an event listener that runs in the worker.
   * @param event The event name (e.g., 'click')
   * @param handler The handler function
   */
  on(event: string, handler: (payload: any) => void): this {
    console.log(
      `[Worker]: Registering listener for "${event}" on ID ${this.id}`
    );

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
