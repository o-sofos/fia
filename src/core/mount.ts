/**
 * Mount a Fia application to a DOM element.
 * 
 * Clears the target element's contents and appends the component.
 * 
 * @example
 * ```ts
 * import { mount, div, h1 } from "@fia/core";
 * 
 * const App = () => div(() => {
 *   h1("Hello, Fia!");
 * });
 * 
 * mount(App, "#app");
 * // or
 * mount(App, document.getElementById("app")!);
 * ```
 * 
 * @param component - A function that returns the root element
 * @param target - CSS selector string or HTMLElement to mount into
 * @throws Error if target element is not found
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
