/**
 * Control Flow Components
 * 
 * Reactive conditional rendering using effects.
 */

import { $e } from "../reactivity/reactivity";
import {
    pushExecutionContext,
    popExecutionContext,
    getCurrentExecutionContext,
} from "../context/context";

/**
 * Reactive conditional rendering.
 * Re-renders when the condition signal changes.
 * 
 * @example
 * Show(() => data.loading, {
 *   then: () => p({ textContent: "Loading..." }),
 *   else: () => ul(() => items.forEach(i => li({ textContent: i }))),
 * });
 * 
 * // Or simpler without else:
 * Show(() => isVisible.value, () => div({ textContent: "Hello!" }));
 */
export function Show(
    when: () => boolean,
    options: (() => void) | { then: () => void; else?: () => void },
): void {
    // Create a placeholder/anchor element
    const anchor = document.createComment("Show");
    getCurrentExecutionContext().appendChild(anchor);

    // Track currently rendered nodes
    let currentNodes: Node[] = [];

    const thenFn = typeof options === "function" ? options : options.then;
    const elseFn = typeof options === "function" ? undefined : options.else;

    $e(() => {
        // Clear previous nodes
        for (const node of currentNodes) {
            node.parentNode?.removeChild(node);
        }
        currentNodes = [];

        // Create new content
        const frag = document.createDocumentFragment();
        pushExecutionContext(frag);

        try {
            if (when()) {
                thenFn();
            } else if (elseFn) {
                elseFn();
            }
        } finally {
            popExecutionContext();
        }

        // Track nodes we're about to insert
        currentNodes = Array.from(frag.childNodes);

        // Insert after anchor
        anchor.parentNode?.insertBefore(frag, anchor.nextSibling);
    });
}

/**
 * Reactive list rendering with keyed reconciliation.
 * Re-renders when the list signal changes.
 * 
 * @example
 * Each(() => todos.items, (item, index) => {
 *   li({ textContent: item });
 * });
 */
export function Each<T>(
    items: () => T[],
    render: (item: T, index: number) => void,
): void {
    const anchor = document.createComment("Each");
    getCurrentExecutionContext().appendChild(anchor);

    let currentNodes: Node[] = [];

    $e(() => {
        // Clear previous nodes
        for (const node of currentNodes) {
            node.parentNode?.removeChild(node);
        }
        currentNodes = [];

        const list = items();
        const frag = document.createDocumentFragment();
        pushExecutionContext(frag);

        try {
            for (let i = 0; i < list.length; i++) {
                render(list[i], i);
            }
        } finally {
            popExecutionContext();
        }

        // Track nodes we're about to insert
        currentNodes = Array.from(frag.childNodes);

        // Insert after anchor
        anchor.parentNode?.insertBefore(frag, anchor.nextSibling);
    });
}

/**
 * Reactive pattern matching.
 * Switches rendering based on a derived key from a signal.
 * 
 * @example
 * Match(() => status.value, {
 *   loading: () => p("Loading..."),
 *   success: () => p("Success!"),
 *   error: () => p("Error!"),
 *   _: () => p("Idle"), // Default case
 * });
 */
export function Match<T extends PropertyKey>(
    when: () => T,
    cases: Partial<Record<T, () => void>> & { _?: () => void },
): void {
    const anchor = document.createComment("Match");
    getCurrentExecutionContext().appendChild(anchor);

    let currentNodes: Node[] = [];

    $e(() => {
        // Clear previous nodes
        for (const node of currentNodes) {
            node.parentNode?.removeChild(node);
        }
        currentNodes = [];

        const key = when();
        const handler = cases[key] || cases._;

        if (handler) {
            const frag = document.createDocumentFragment();
            pushExecutionContext(frag);
            try {
                handler();
            } finally {
                popExecutionContext();
            }

            // Track nodes we're about to insert
            currentNodes = Array.from(frag.childNodes);

            // Insert after anchor
            anchor.parentNode?.insertBefore(frag, anchor.nextSibling);
        }
    });
}
