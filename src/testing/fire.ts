/**
 * Event dispatch helpers. Events bubble and are composed, like real user
 * input, so they reach Fia's document-level delegated listeners, including
 * from inside shadow roots.
 */

type Target = Element | null | undefined;

function need(target: Target, what: string): Element {
    if (!target) throw new Error(`[fia harness] fire.${what}: target element is ${target}`);
    return target;
}

function dispatch<E extends Event>(target: Element, event: E): E {
    target.dispatchEvent(event);
    return event;
}

/** Dispatch an arbitrary bubbling event. */
export function fire(target: Target, type: string, init: EventInit = {}): Event {
    return dispatch(need(target, type), new Event(type, { bubbles: true, cancelable: true, composed: true, ...init }));
}

fire.click = (target: Target, init: MouseEventInit = {}): MouseEvent =>
    dispatch(need(target, "click"), new MouseEvent("click", { bubbles: true, cancelable: true, composed: true, ...init }));

fire.dblclick = (target: Target, init: MouseEventInit = {}): MouseEvent =>
    dispatch(need(target, "dblclick"), new MouseEvent("dblclick", { bubbles: true, cancelable: true, composed: true, ...init }));

/** Set `value` (or `checked` for checkboxes/radios) then fire `input`. */
fire.input = (target: Target, value: string | boolean): Event => {
    const el = need(target, "input") as HTMLInputElement;
    if (typeof value === "boolean") el.checked = value;
    else el.value = value;
    return dispatch(el, new Event("input", { bubbles: true, composed: true }));
};

/** Set `value` (or `checked`) then fire `change`. */
fire.change = (target: Target, value: string | boolean): Event => {
    const el = need(target, "change") as HTMLInputElement;
    if (typeof value === "boolean") el.checked = value;
    else el.value = value;
    return dispatch(el, new Event("change", { bubbles: true, composed: true }));
};

fire.keydown = (target: Target, key: string, init: KeyboardEventInit = {}): KeyboardEvent =>
    dispatch(need(target, "keydown"), new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, composed: true, ...init }));

fire.keyup = (target: Target, key: string, init: KeyboardEventInit = {}): KeyboardEvent =>
    dispatch(need(target, "keyup"), new KeyboardEvent("keyup", { key, bubbles: true, cancelable: true, composed: true, ...init }));

fire.submit = (target: Target): Event =>
    dispatch(need(target, "submit"), new Event("submit", { bubbles: true, cancelable: true }));

fire.focusin = (target: Target): FocusEvent =>
    dispatch(need(target, "focusin"), new FocusEvent("focusin", { bubbles: true, composed: true }));

fire.focusout = (target: Target): FocusEvent =>
    dispatch(need(target, "focusout"), new FocusEvent("focusout", { bubbles: true, composed: true }));
