
import { type Signal, effect } from "./reactivity";

/**
 * optimized keyed list reconciliation.
 * 
 * @param parent - The parent DOM element (ul, tbody, etc.)
 * @param itemsSignal - The signal containing the array of items
 * @param renderFn - Function to create a DOM node for an item
 * @param keyFn - Optional function to extract a unique key from an item. Defaults to item identity.
 */
export function reconcileList<T>(
    parent: HTMLElement,
    itemsSignal: Signal<T[]>,
    renderFn: (item: T, index: number) => HTMLElement,
    keyFn?: (item: T) => unknown
): void {
    // Map of Key -> DOM Node
    const nodeMap = new Map<unknown, HTMLElement>();
    let oldItems: T[] = [];

    // Default key function uses item identity
    const getKey = keyFn || ((item: T) => item);

    effect(() => {
        const newItems = itemsSignal.value;
        const newKeys = new Set(newItems.map(getKey));

        // 1. Fast-path: Clear
        if (newItems.length === 0) {
            parent.textContent = "";
            nodeMap.clear();
            oldItems = [];
            return;
        }

        // 2. Fast-path: Initial Creation (DocumentFragment)
        if (oldItems.length === 0) {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < newItems.length; i++) {
                const item = newItems[i];
                const el = renderFn(item, i);
                const key = getKey(item);
                nodeMap.set(key, el);
                fragment.appendChild(el);
            }
            parent.appendChild(fragment);
            oldItems = newItems;
            return;
        }

        // 3. Remove deleted nodes
        let i = 0;
        while (i < oldItems.length) {
            const item = oldItems[i];
            const key = getKey(item);
            if (!newKeys.has(key)) {
                const el = nodeMap.get(key);
                if (el) el.remove();
                nodeMap.delete(key);
                oldItems.splice(i, 1);
            } else {
                i++;
            }
        }

        // 4. Keyed Reconciliation (Head/Tail Algorithm)
        let oldStartIdx = 0;
        let oldEndIdx = oldItems.length - 1;
        let newStartIdx = 0;
        let newEndIdx = newItems.length - 1;

        let oldStartItem = oldItems[oldStartIdx];
        let oldEndItem = oldItems[oldEndIdx];
        let newStartItem = newItems[newStartIdx];
        let newEndItem = newItems[newEndIdx];

        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (!oldStartItem) {
                oldStartItem = oldItems[++oldStartIdx];
            } else if (!oldEndItem) {
                oldEndItem = oldItems[--oldEndIdx];
            } else if (getKey(oldStartItem) === getKey(newStartItem)) {
                // No move needed
                oldStartItem = oldItems[++oldStartIdx];
                newStartItem = newItems[++newStartIdx];
            } else if (getKey(oldEndItem) === getKey(newEndItem)) {
                // No move needed
                oldEndItem = oldItems[--oldEndIdx];
                newEndItem = newItems[--newEndIdx];
            } else if (getKey(oldStartItem) === getKey(newEndItem)) {
                // Look up DOM node by key
                const el = nodeMap.get(getKey(oldStartItem));
                if (el) {
                    const anchor = nodeMap.get(getKey(oldEndItem))?.nextSibling || null;
                    parent.insertBefore(el, anchor);
                }
                oldStartItem = oldItems[++oldStartIdx];
                newEndItem = newItems[--newEndIdx];
            } else if (getKey(oldEndItem) === getKey(newStartItem)) {
                // Look up DOM node by key
                const el = nodeMap.get(getKey(oldEndItem));
                if (el) {
                    const anchor = nodeMap.get(getKey(oldStartItem));
                    parent.insertBefore(el, anchor as Node | null);
                }
                oldEndItem = oldItems[--oldEndIdx];
                newStartItem = newItems[++newStartIdx];
            } else {
                // Random move or new insert
                const newKey = getKey(newStartItem);
                let el = nodeMap.get(newKey);
                if (!el) {
                    el = renderFn(newStartItem, newStartIdx);
                    nodeMap.set(newKey, el);
                }

                const anchor = nodeMap.get(getKey(oldStartItem));
                parent.insertBefore(el, anchor as Node | null);
                newStartItem = newItems[++newStartIdx];
            }
        }

        // 5. Add any remaining new items
        while (newStartIdx <= newEndIdx) {
            const item = newItems[newStartIdx];
            const el = renderFn(item, newStartIdx);
            const key = getKey(item);
            nodeMap.set(key, el);

            const nextItem = newItems[newEndIdx + 1];
            const anchor = nextItem ? nodeMap.get(getKey(nextItem)) : null;
            parent.insertBefore(el, anchor as Node | null);
            newStartIdx++;
        }

        oldItems = newItems;
    });
}
