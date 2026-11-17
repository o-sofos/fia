
/**
 * Global Event Delegation
 * 
 * Instead of attaching event listeners to every element, we attach a single
 * listener to the document for common events and dispatch to the correct
 * handler based on the target.
 */

// Events that should be delegated
const DELEGATED_EVENTS = new Set([
    "click",
    "dblclick",
    "input",
    "change",
    "keydown",
    "keyup",
    "keypress",
    "mousedown",
    "mouseup",
    "mouseover",
    "mouseout",
    "mousemove",
    "touchstart",
    "touchend",
    "touchmove",
    "focusin",
    "focusout",
    "submit"
]);

// Map of Element -> EventType -> Handler
const handlerMap = new WeakMap<Element, Record<string, EventListener>>();

// Track which events we have already attached to the document
const attachedEvents = new Set<string>();

/**
 * Global event handler that simulates bubbling over the delegated handlers.
 *
 * Walks `composedPath()` (not `parentElement`) so handlers inside open shadow
 * roots fire too, honours stopPropagation/stopImmediatePropagation, and
 * restores `currentTarget` afterwards so handlers that keep the event see
 * the native value.
 */
function globalListener(event: Event) {
    const eventType = event.type;
    const path = event.composedPath();
    let patched = false;

    try {
        for (let i = 0; i < path.length; i++) {
            const target = path[i];
            if (!(target instanceof Element)) continue;
            const handlers = handlerMap.get(target);
            const handler = handlers?.[eventType];
            if (!handler) continue;

            // currentTarget is read-only on Event; shadow it per handler
            Object.defineProperty(event, "currentTarget", { configurable: true, value: target });
            patched = true;
            handler(event);

            if (event.cancelBubble) break;
        }
    } finally {
        if (patched) delete (event as { currentTarget?: unknown }).currentTarget;
    }
}

/**
 * Registers an event handler for an element.
 * If the event is delegatable, it attaches the global listener if not present.
 * Otherwise, it falls back to native addEventListener (handled by caller usually, 
 * but we provide a check here).
 */
export function registerEventHandler(
    element: HTMLElement,
    eventType: string,
    handler: EventListener
): void {
    // If it's a known delegated event
    if (DELEGATED_EVENTS.has(eventType)) {
        // 1. Ensure global listener is attached
        if (!attachedEvents.has(eventType)) {
            document.addEventListener(eventType, globalListener, { capture: false, passive: false });
            attachedEvents.add(eventType);
        }

        // 2. Store handler in WeakMap
        let handlers = handlerMap.get(element);
        if (!handlers) {
            handlers = {};
            handlerMap.set(element, handlers);
        }
        handlers[eventType] = handler;

    } else {
        // Fallback for non-delegated events (e.g. scroll, load, custom events)
        element.addEventListener(eventType, handler);
    }
}