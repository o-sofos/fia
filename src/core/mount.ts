import { root } from "./reactivity/reactivity";

/**
 * Mount a Fia application to a DOM element.
 *
 * Clears the target element's contents, renders the component inside its own
 * root scope and appends it. Returns a function that unmounts: it disposes
 * every effect, computed, control-flow block and cleanup the app created,
 * and removes the app's element.
 *
 * @example
 * ```ts
 * import { mount, div, h1 } from "@fia/core";
 *
 * const App = () => div(() => {
 *   h1("Hello, Fia!");
 * });
 *
 * const unmount = mount(App, "#app");
 * // later
 * unmount();
 * ```
 *
 * @param component - A function that returns the root element
 * @param target - CSS selector string or HTMLElement to mount into
 * @returns A function that unmounts the app
 * @throws Error if target element is not found
 */
export function mount(
    component: () => HTMLElement,
    target: HTMLElement | string = document.body
): () => void {
    const el = typeof target === "string" ? document.querySelector(target) : target;

    if (!el) {
        throw new Error(`[Fia] Mount target '${target}' not found.`);
    }

    if (!(el instanceof HTMLElement)) {
        throw new Error("[Fia] Mount target must be an HTMLElement.");
    }

    // clear existing content
    el.innerHTML = "";

    return root((dispose) => {
        const node = component();
        el.appendChild(node);
        let mounted = true;
        return () => {
            if (!mounted) return;
            mounted = false;
            dispose();
            node.remove();
        };
    });
}
