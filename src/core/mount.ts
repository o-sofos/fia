/**
 * Utility to mount an application to a DOM element
 */
export function mount(
    component: () => HTMLElement,
    target: HTMLElement | string
): void {
    const el = typeof target === "string" ? document.querySelector(target) : target;

    if (!el) {
        throw new Error(`[Fia] Mount target '${target}' not found.`);
    }

    if (!(el instanceof HTMLElement)) {
        throw new Error("[Fia] Mount target must be an HTMLElement.");
    }

    // clear existing content
    el.innerHTML = "";

    // append new component
    el.appendChild(component());
}
