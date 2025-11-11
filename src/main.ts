import type {
  FlickId,
  MainToWorkerMessage,
  WorkerToMainCommand,
} from "./types";
import { FLICK_ROOT_ID } from "./types";

const SVG_NS = "http://www.w3.org/2000/svg";

//  Add a safelist for URL protocols
const URL_SAFELIST = ["http:", "https:", "mailto:", "tel:", "data:", "#"];

function sanitizeAttribute(id: FlickId, name: string, value: string): boolean {
  const lowerName = name.toLowerCase();

  // Rule 1: Block all inline event handlers (e.g., 'onclick')
  if (lowerName.startsWith("on")) {
    console.warn(`[Flick Security]: Blocked 'on*' event attribute on ${id}.`);
    return false;
  }

  // Rule 2: Check URL-based attributes
  if (
    lowerName === "href" ||
    lowerName === "src" ||
    lowerName === "formaction"
  ) {
    try {
      const url = new URL(value, document.baseURI);
      if (URL_SAFELIST.includes(url.protocol)) {
        return true; // Safe
      }
      console.warn(
        `[Flick Security]: Blocked unsafe protocol in ${name} on ${id}.`
      );
      return false; // Unsafe protocol (e.g., 'javascript:')
    } catch (e) {
      // It's a relative path (e.g., '/img/foo.png'), which is safe.
      return true;
    }
  }

  // Default: All other attributes are safe
  return true;
}

const flickRegistry = new Map<FlickId, Node>();
flickRegistry.set(FLICK_ROOT_ID, document.body);

// Store listeners so we can remove them later (e.g., .off())
const mainThreadListenerRegistry = new Map<
  FlickId,
  Map<string, EventListener>
>();

/**
 * Serializes an Event into a simple object.
 * We only send the data we need, not the whole Event object.
 */
function serializeEvent(event: Event): any {
  // ... (MouseEvent, InputEvent, KeyboardEvent cases) ...

  // Handle 'blur' or 'focus' events
  // We'll check the event type, as FocusEvent is generic.
  if (event.type === "blur" || event.type === "focusout") {
    const target = event.target as HTMLElement;
    if (target.isContentEditable) {
      return {
        innerHTML: target.innerHTML, // The raw, "dirty" HTML
        textContent: target.textContent, // The plain text
      };
    }
  }

  return {}; // Default for simple clicks
}

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});
worker.onerror = (event) => {
  console.error("[Main Thread]: A worker error occurred:", event);
};

worker.addEventListener("message", (e: MessageEvent<WorkerToMainCommand[]>) => {
  const commands = e.data;

  // Use rAF to batch DOM writes
  requestAnimationFrame(() => {
    for (const cmd of commands) {
      switch (cmd.type) {
        case "create":
          let el: Element;
          if (cmd.ns === "svg") {
            el = document.createElementNS(SVG_NS, cmd.tag);
          } else {
            el = document.createElement(cmd.tag);
          }
          flickRegistry.set(cmd.id, el);
          break;
        case "move": {
          const parent = flickRegistry.get(cmd.parentId);
          const node = flickRegistry.get(cmd.id);
          // If beforeId is null, insertBefore appends to the end
          const beforeNode = cmd.beforeId
            ? flickRegistry.get(cmd.beforeId)
            : null;

          if (parent && node) {
            parent.insertBefore(node, beforeNode || null);
          }
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
            (node as HTMLElement).style[cmd.prop as any] = String(cmd.value);
          break;
        }
        case "append": {
          const p = flickRegistry.get(cmd.parentId);
          const c = flickRegistry.get(cmd.childId);
          if (p && c) p.appendChild(c);
          break;
        }
        case "listen": {
          const node = flickRegistry.get(cmd.id);
          if (!node) break;

          // Create a generic proxy listener
          const proxyHandler = (event: Event) => {
            // Send the serializable payload to the worker
            try {
              worker.postMessage({
                type: "event",
                id: cmd.id,
                event: cmd.event,
                payload: serializeEvent(event), // <-- Back to normal
              } as MainToWorkerMessage);
            } catch (error) {
              // ❗️ If this logs, we've found the problem!
              console.error(
                "[Main Thread]: CRITICAL! postMessage FAILED!",
                error
              );
            }
          };

          // Add the real listener
          node.addEventListener(cmd.event, proxyHandler);

          // Store it so we can remove it later
          if (!mainThreadListenerRegistry.has(cmd.id)) {
            mainThreadListenerRegistry.set(cmd.id, new Map());
          }
          mainThreadListenerRegistry.get(cmd.id)!.set(cmd.event, proxyHandler);
          break;
        }

        case "attribute": {
          const node = flickRegistry.get(cmd.id);
          const valueStr = String(cmd.value);

          if (node && "setAttribute" in node) {
            // RUN THE SANITIZER
            if (sanitizeAttribute(cmd.id, cmd.name, valueStr)) {
              (node as Element).setAttribute(cmd.name, valueStr);
            }
          }
          break;
        }
      }
    }
  });
});

// Tell the worker it's time to start
worker.postMessage({ type: "init" });
