import { effect } from "./reactivity";
import type { Signal } from "./reactivity";
import { type FlickId, FLICK_ROOT_ID } from "./types";
import { queueCommand, registerWorkerListener } from "./worker-api";

let nextId = 0;
const createFlickId = () => (nextId++).toString(36);

type Reactive<T> = T | Signal<T>;

export class FlickElement {
  public readonly id: FlickId = createFlickId();

  constructor(tag: string, ns?: "svg") {
    queueCommand({ type: "create", id: this.id, tag, ns });
  }

  text(value: Reactive<string | number>): this {
    if (typeof value === "function") {
      effect(() =>
        queueCommand({
          type: "text",
          id: this.id,
          value: String((value as Signal<any>)()),
        })
      );
    } else {
      queueCommand({ type: "text", id: this.id, value: String(value) });
    }
    return this;
  }

  style(prop: string, value: Reactive<string | number>): this {
    if (typeof value === "function") {
      effect(() =>
        queueCommand({
          type: "style",
          id: this.id,
          prop,
          value: (value as Signal<any>)(),
        })
      );
    } else {
      queueCommand({ type: "style", id: this.id, prop, value });
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
