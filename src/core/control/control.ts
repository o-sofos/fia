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
 * High-performance keyed list rendering with efficient reconciliation.
 * Minimizes DOM operations by reusing existing nodes when possible.
 *
 * @param items - Reactive list or static array
 * @param render - Render function for each item
 * @param keyFn - Function to extract unique key from item (defaults to index)
 *
 * Performance:
 * - Add 1 item to 1000: O(1) - creates 1 node
 * - Remove 1 item from 1000: O(1) - removes 1 node
 * - Move 1 item in 1000: O(1) - moves 1 node
 * - Preserves component state, focus, scroll position
 *
 * @example
 * // With key function (recommended for dynamic lists)
 * Each(() => todos.items, (todo) => {
 *   li({ textContent: todo.text });
 * }, (todo) => todo.id);
 *
 * @example
 * // Without key function (uses index - only for append-only)
 * Each(() => items, (item) => {
 *   li({ textContent: item });
 * });
 */
export function Each<T>(
    items: T[] | (() => T[]),
    render: (item: T, index: number) => void,
    keyFn?: (item: T, index: number) => string | number,
): void {
    const anchor = document.createComment("Each");
    getCurrentExecutionContext().appendChild(anchor);

    interface ItemNode {
        key: string | number;
        item: T;
        nodes: Node[];
    }

    let prevItemNodes: ItemNode[] = [];
    const nodeMap = new Map<string | number, ItemNode>();

    $e(() => {
        const list = typeof items === "function" && !Array.isArray(items)
            ? (items as () => T[])()
            : items;

        const newItemNodes: ItemNode[] = [];
        const newNodeMap = new Map<string | number, ItemNode>();
        const usedKeys = new Set<string | number>();

        // Create or reuse nodes for each item
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const key = keyFn ? keyFn(item, i) : i;

            // Warn about duplicate keys
            if (usedKeys.has(key)) {
                console.warn(`[Each] Duplicate key: "${key}". Keys must be unique.`);
            }
            usedKeys.add(key);

            // Try to reuse existing node
            const existingNode = nodeMap.get(key);

            if (existingNode && (!keyFn || existingNode.item === item)) {
                // Reuse existing node
                newItemNodes.push(existingNode);
                newNodeMap.set(key, existingNode);
            } else {
                // Create new node
                const frag = document.createDocumentFragment();
                pushExecutionContext(frag);

                try {
                    render(item, i);
                } finally {
                    popExecutionContext();
                }

                const nodes = Array.from(frag.childNodes);
                const itemNode: ItemNode = { key, item, nodes };

                newItemNodes.push(itemNode);
                newNodeMap.set(key, itemNode);

                // Clean up old node with same key
                if (existingNode) {
                    for (const node of existingNode.nodes) {
                        node.parentNode?.removeChild(node);
                    }
                }
            }
        }

        // Remove nodes no longer in list
        for (const prevNode of prevItemNodes) {
            if (!newNodeMap.has(prevNode.key)) {
                for (const node of prevNode.nodes) {
                    node.parentNode?.removeChild(node);
                }
            }
        }

        // Insert/move nodes in correct order
        let currentAnchor: Node = anchor;

        for (const itemNode of newItemNodes) {
            const firstNode = itemNode.nodes[0];
            if (!firstNode) continue;

            const nextNode = currentAnchor.nextSibling;

            if (nextNode !== firstNode) {
                const parent = anchor.parentNode;
                if (!parent) continue;

                // Insert/move all nodes for this item
                for (const node of itemNode.nodes) {
                    parent.insertBefore(node, currentAnchor.nextSibling);
                }
            }

            // Update anchor to last node of this item
            currentAnchor = itemNode.nodes[itemNode.nodes.length - 1] || currentAnchor;
        }

        // Update tracking for next render
        prevItemNodes = newItemNodes;
        nodeMap.clear();
        for (const [key, node] of newNodeMap) {
            nodeMap.set(key, node);
        }
    });
}

/**
 * Reactive pattern matching.
 * Switches rendering based on a derived key from a signal.
 * Returns a Computed Signal of the result of the evaluated arm.
 * 
 * Supports range-based comparisons for numbers:
 * - <N, >N, <=N, >=N - comparison operators
 * - N..M, [N..M], (N..M), [N..M), (N..M] - range notation
 * 
 * @example
 * // Exact string matching
 * Match(() => status.value, {
 *   loading: () => p("Loading..."),
 *   success: () => p("Success!"),
 *   error: () => p("Error!"),
 *   _: () => p("Idle"), // Default case
 * });
 * 
 * // Range-based number matching
 * Match(age, {
 *   "<18": () => "Minor",
 *   "[18..65)": () => "Adult",  // 18 <= age < 65
 *   ">=65": () => "Senior",
 *   _: () => "Unknown"
 * });
 * 
 * const message = Match(() => status.value, {
 *   loading: () => "Wait...",
 *   success: () => "Done!",
 *   _: () => "Unknown",
 * });
 */

/**
 * Check if a value matches a comparison pattern.
 * Supports: <N, >N, <=N, >=N, N..M, [N..M], (N..M), [N..M), (N..M]
 * 
 * @example
 * matchesPattern(25, "<18")       // false
 * matchesPattern(25, ">=18")      // true
 * matchesPattern(25, "[18..65]")  // true
 * matchesPattern(18, "(18..65)")  // false (exclusive start)
 * matchesPattern(18, "[18..65)")  // true (inclusive start)
 */
function matchesPattern(value: unknown, pattern: string): boolean {
    // Only works for numeric values
    if (typeof value !== 'number') return false;

    // Range pattern with optional brackets/parentheses: "[18..65]", "(18..65)", etc.
    const rangeMatch = pattern.match(/^([\[\(])?(\d+(?:\.\d+)?)\.\.(\d+(?:\.\d+)?)([\]\)])?$/);
    if (rangeMatch) {
        const [, startBracket, minStr, maxStr, endBracket] = rangeMatch;
        const min = Number(minStr);
        const max = Number(maxStr);

        // Determine inclusivity from brackets (default is inclusive)
        const startInclusive = startBracket !== '(';  // [ or nothing = inclusive
        const endInclusive = endBracket !== ')';      // ] or nothing = inclusive

        const aboveMin = startInclusive ? value >= min : value > min;
        const belowMax = endInclusive ? value <= max : value < max;

        return aboveMin && belowMax;
    }

    // Comparison patterns: <, >, <=, >=
    const compMatch = pattern.match(/^(<=?|>=?)(\d+(?:\.\d+)?)$/);
    if (compMatch) {
        const [, op, numStr] = compMatch;
        const n = Number(numStr);

        if (op === '<') return value < n;
        if (op === '>') return value > n;
        if (op === '<=') return value <= n;
        if (op === '>=') return value >= n;
    }

    return false;
}

/**
 * Helper type that suggests patterns based on the matched value type.
 * - For numbers: suggests concrete range pattern examples
 * - For strings/other: allows any string key
 */
type MatchPattern<T> = T extends number
    ? string |
    // Comparison patterns (examples)
    "<18" | ">18" | "<=18" | ">=18" | "<65" | ">65" | "<=65" | ">=65" |
    // Range patterns (examples)  
    "0..17" | "18..64" | "65..120" |
    "[0..17]" | "[18..64]" | "[65..120]" |
    "(0..17)" | "(18..64)" | "(65..120)" |
    "[0..17)" | "[18..64)" | "[65..120)" |
    "(0..17]" | "(18..64]" | "(65..120]"
    : string;

// Overload: When '_' is provided, result is never undefined
export function Match<T, R>(
    when: Signal<T> | (() => T),
    cases: Partial<Record<MatchPattern<T>, () => R>> & { _: () => R },
): Signal<R>;

// Overload: Without '_', result can be undefined
export function Match<T, R = void>(
    when: Signal<T> | (() => T),
    cases: Partial<Record<MatchPattern<T>, () => R>> & { _?: () => R },
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

        const value = getter();
        const key = String(value);

        // Find matching handler:
        // 1. Try exact string match first (backward compatible)
        let handler = cases[key];

        // 2. If no exact match and value is numeric, try pattern matching
        if (!handler && typeof value === 'number') {
            for (const pattern in cases) {
                if (pattern !== '_' && matchesPattern(value, pattern)) {
                    handler = cases[pattern];
                    break;
                }
            }
        }

        // 3. Fall back to default case
        if (!handler) {
            handler = cases._;
        }

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
