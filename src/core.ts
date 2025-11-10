import { effect } from "./reactivity";
import  type { Signal } from "./reactivity";
import { type FlickId, FLICK_ROOT_ID } from "./types";
import  { queueCommand } from "./worker";

let nextId = 0;
const createFlickId = () => (nextId++).toString(36);

type Reactive<T> = T | Signal<T>;

export class FlickElement {
  public readonly id: FlickId = createFlickId();

  constructor(tag: string) {
    queueCommand({ type: "create", id: this.id, tag });
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
}

export const div = () => new FlickElement("div");
export const h1 = () => new FlickElement("h1");
export const p = () => new FlickElement("p");
export const button = () => new FlickElement("button");
