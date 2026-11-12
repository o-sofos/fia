/**
 * Render fixture: mounts UI into a fresh container under a root owner, so
 * `dispose()` tears down every binding the UI created — the same thing a
 * disposable `mount()` will do once it exists.
 */

import { popExecutionContext, pushExecutionContext } from "../core/context/context";
import { disposeOwner, runWithOwner, type Owner } from "../core/reactivity/reactivity";

export interface RenderResult {
    /** The `<div data-testid="root">` the UI was rendered into. */
    readonly container: HTMLElement;
    /** Dispose all owned effects/computeds and detach the container. */
    dispose(): void;
    /** `container.textContent` */
    text(): string;
    /** `container.innerHTML` */
    html(): string;
    /** First match or throw — keeps tests from silently asserting on `null`. */
    get<E extends Element = HTMLElement>(selector: string): E;
    /** First match or `null`. */
    query<E extends Element = HTMLElement>(selector: string): E | null;
    /** All matches. */
    all<E extends Element = HTMLElement>(selector: string): E[];
}

export function render(ui: () => unknown, options: { container?: HTMLElement } = {}): RenderResult {
    const container = options.container ?? document.createElement("div");
    if (!options.container) container.setAttribute("data-testid", "root");
    if (!container.isConnected) document.body.appendChild(container);

    const owner: Owner = { owned: undefined };
    pushExecutionContext(container);
    try {
        runWithOwner(owner, ui);
    } finally {
        popExecutionContext();
    }

    let disposed = false;
    return {
        container,
        dispose() {
            if (disposed) return;
            disposed = true;
            disposeOwner(owner);
            container.remove();
        },
        text: () => container.textContent ?? "",
        html: () => container.innerHTML,
        get<E extends Element = HTMLElement>(selector: string): E {
            const el = container.querySelector<E>(selector);
            if (!el) throw new Error(`[fia harness] no element matches "${selector}" in:\n${container.innerHTML}`);
            return el;
        },
        query: <E extends Element = HTMLElement>(selector: string) => container.querySelector<E>(selector),
        all: <E extends Element = HTMLElement>(selector: string) => Array.from(container.querySelectorAll<E>(selector)),
    };
}

/** Resolve after the next animation frame (for `onMount` callbacks). */
export function nextFrame(): Promise<void> {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
