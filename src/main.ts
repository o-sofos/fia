import type { FlickId, WorkerToMainCommand } from "./types";
import { FLICK_ROOT_ID } from "./types";

/**
 * Connects the Flick renderer to your application worker.
 * Call this function once in your main thread file.
 *
 * @param worker An instance of your application's Worker.
 *
 * @example
 * ```typescript
 * // In main.ts
 * import { renderer } from 'jsr:@flick/core/renderer';
 *
 * const worker = new Worker(new URL('./app.worker.ts', import.meta.url), {
 * type: 'module'
 * });
 *
 * renderer(worker);
 * ```
 */
export function renderer(worker: Worker) {
  const flickRegistry = new Map<FlickId, Node>();
  flickRegistry.set(FLICK_ROOT_ID, document.body);

  const mainThreadListenerRegistry = new Map<
    FlickId,
    Map<string, EventListener>
  >();

  // --- Attribute Sanitizer ---
  const URL_SAFELIST = ["http:", "https:", "mailto:", "tel:", "data:", "#"];
  function sanitizeAttribute(
    id: FlickId,
    name: string,
    value: string
  ): boolean {
    const lowerName = name.toLowerCase();
    if (lowerName.startsWith("on")) {
      console.warn(`[Flick Security]: Blocked 'on*' event attribute on ${id}.`);
      return false;
    }
    if (
      lowerName === "href" ||
      lowerName === "src" ||
      lowerName === "formaction"
    ) {
      try {
        const url = new URL(value, document.baseURI);
        if (URL_SAFELIST.includes(url.protocol)) return true;
        console.warn(
          `[Flick Security]: Blocked unsafe protocol in ${name} on ${id}.`
        );
        return false;
      } catch (e) {
        return true; // Relative paths are safe
      }
    }
    return true;
  }

  // --- Event Serializer ---
  function serializeEvent(event: Event): any {
    if (event instanceof MouseEvent) {
      return {
        clientX: event.clientX,
        clientY: event.clientY,
        button: event.button,
      };
    }
    if (event instanceof InputEvent) {
      return { value: (event.target as HTMLInputElement).value };
    }
    if (event instanceof KeyboardEvent) {
      return { key: event.key, code: event.code, ctrlKey: event.ctrlKey };
    }
    if (event.type === "blur" || event.type === "focusout") {
      const target = event.target as HTMLElement;
      if (target.isContentEditable) {
        return {
          innerHTML: target.innerHTML,
          textContent: target.textContent,
        };
      }
    }
    return {};
  }

  // --- The Renderer's Message Listener ---
  worker.addEventListener(
    "message",
    (e: MessageEvent<WorkerToMainCommand[]>) => {
      const commands = e.data;
      requestAnimationFrame(() => {
        for (const cmd of commands) {
          switch (cmd.type) {
            case "create": {
              let el: Element;
              if (cmd.ns === "svg") {
                el = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  cmd.tag
                );
              } else {
                el = document.createElement(cmd.tag);
              }
              flickRegistry.set(cmd.id, el);
              break;
            }
            case "text": {
              const node = flickRegistry.get(cmd.id);
              if (node) node.textContent = cmd.value;
              break;
            }
            case "style": {
              const node = flickRegistry.get(cmd.id);
              if (node && "style" in node)
                (node as HTMLElement).style[cmd.prop as any] = String(
                  cmd.value
                );
              break;
            }
            case "attribute": {
              const node = flickRegistry.get(cmd.id);
              const valueStr = String(cmd.value);
              if (node && "setAttribute" in node) {
                if (sanitizeAttribute(cmd.id, cmd.name, valueStr)) {
                  (node as Element).setAttribute(cmd.name, valueStr);
                }
              }
              break;
            }
            case "append": {
              const p = flickRegistry.get(cmd.parentId);
              const c = flickRegistry.get(cmd.childId);
              if (p && c) p.appendChild(c);
              break;
            }
            case "move": {
              const parent = flickRegistry.get(cmd.parentId);
              const node = flickRegistry.get(cmd.id);
              const beforeNode = cmd.beforeId
                ? flickRegistry.get(cmd.beforeId)
                : null;
              if (parent && node) {
                parent.insertBefore(node, beforeNode || null);
              }
              break;
            }
            case "listen": {
              const node = flickRegistry.get(cmd.id);
              if (!node) break;
              const proxyHandler = (event: Event) => {
                worker.postMessage({
                  type: "event",
                  id: cmd.id,
                  event: cmd.event,
                  payload: serializeEvent(event),
                });
              };
              node.addEventListener(cmd.event, proxyHandler);
              if (!mainThreadListenerRegistry.has(cmd.id)) {
                mainThreadListenerRegistry.set(cmd.id, new Map());
              }
              mainThreadListenerRegistry
                .get(cmd.id)!
                .set(cmd.event, proxyHandler);
              break;
            }
            // We still need to implement 'destroy'
          }
        }
      });
    }
  );

  // --- Worker Error Handler ---
  worker.onerror = (event) => {
    console.error("[Flick Main Thread]: A worker error occurred:", event);
  };

  // --- Send the 'init' message ---
  worker.postMessage({ type: "init" });
}
