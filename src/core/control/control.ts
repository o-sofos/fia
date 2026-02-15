/**
 * Control Flow Components
 * 
 * Reactive conditional rendering using effects.
 */

import { $, $e, Mut, type Signal } from "../reactivity/reactivity";
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
    /**
     * Reactive list or static array.
     * Can be a signal, a function, or a direct array (which may be a reactive store).
     */
    items: T[] | (() => T[]),
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

        const list = typeof items === "function" && !Array.isArray(items)
            ? (items as () => T[])()
            : items;
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
 * Returns a Computed Signal of the result of the evaluated arm.
 * 
 * @example
 * Match(() => status.value, {
 *   loading: () => p("Loading..."),
 *   success: () => p("Success!"),
 *   error: () => p("Error!"),
 *   _: () => p("Idle"), // Default case
 * });
 * 
 * const message = Match(() => status.value, {
 *   loading: () => "Wait...",
 *   success: () => "Done!",
 *   _: () => "Unknown",
 * });
 */
// Overload: When '_' is provided, result is never undefined
export function Match<T, R>(
    when: Signal<T> | (() => T),
    cases: Partial<Record<string, () => R>> & { _: () => R },
): Signal<R>;

// Overload: Without '_', result can be undefined
export function Match<T, R = void>(
    when: Signal<T> | (() => T),
    cases: Partial<Record<string, () => R>> & { _?: () => R },
): Signal<R | undefined>;

export function Match<T, R = void>(
    when: Signal<T> | (() => T),
    cases: Partial<Record<string, () => R>> & { _?: () => R },
): Signal<R | undefined> {
    const anchor = document.createComment("Match");
    getCurrentExecutionContext().appendChild(anchor);

    // Use a mutable store for internal state
    const state = $(Mut({ result: undefined as R | undefined }));

    let currentNodes: Node[] = [];

    // Normalize the input to a getter function
    const getter = typeof when === 'function'
        ? when
        : () => (when as Signal<T>).value;

    $e(() => {
        // Clear previous nodes
        for (const node of currentNodes) {
            node.parentNode?.removeChild(node);
        }
        currentNodes = [];

        // Convert to string for consistent key lookup
        const key = String(getter());
        const handler = cases[key] || cases._;

        if (handler) {
            const frag = document.createDocumentFragment();
            pushExecutionContext(frag);

            let result: R;
            try {
                result = handler();
            } finally {
                popExecutionContext();
            }

            // Update internal state (cast needed due to reactive store type complexity)
            state.result = result as unknown as typeof state.result;

            // Track nodes we're about to insert
            currentNodes = Array.from(frag.childNodes);

            // Insert after anchor
            anchor.parentNode?.insertBefore(frag, anchor.nextSibling);
        } else {
            // No handler matched
            state.result = undefined as unknown as typeof state.result;
        }
    });

    // Return a computed signal that reads from the state
    return $(() => state.result) as Signal<R | undefined>;
}
