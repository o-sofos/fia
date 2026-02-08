
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
 * Global event handler that simulates bubbling.
 */
function globalListener(event: Event) {
    let target = event.target as Element | null;
    const eventType = event.type;

    // Bubble up the DOM
    while (target) {
        const handlers = handlerMap.get(target);
        if (handlers && handlers[eventType]) {
            // Mock currentTarget for the handler
            // We use defineProperty because currentTarget is read-only
            Object.defineProperty(event, "currentTarget", {
                configurable: true,
                value: target,
            });

            // Invoke handler
            handlers[eventType](event);

            // Stop propagation if requested (optional simulation, 
            // strict DOM bubbling keeps going unless stopPropagation is called on event)
            if (event.cancelBubble) break;
        }
        target = target.parentElement;
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

// Expose to window for debugging
if (typeof window !== 'undefined') {
    (window as any).__eventHandlerMap = handlerMap;
}