/**
 * Control Flow Components
 *
 * Reactive conditional rendering using effects.
 */

import {
  $,
  $e,
  Mut,
  disposeOwner,
  onCleanup,
  runWithOwner,
  untrack,
  type Owner,
  type Signal,
} from "../reactivity/reactivity";
import {
  pushExecutionContext,
  popExecutionContext,
  getCurrentExecutionContext,
} from "../context/context";

// =============================================================================
// Regions
// =============================================================================

/**
 * A control-flow block owns the nodes between a start and an end comment.
 * Tracking a live range (not a list of nodes captured at render time) keeps
 * nesting correct: a Show/Each/Match at the top level of a branch or list
 * item inserts its own nodes later, and those must move and disappear with
 * the enclosing branch/item.
 */
interface Region {
  start: Comment;
  end: Comment;
}

function createRegion(name: string): Region {
  const context = getCurrentExecutionContext();
  const start = document.createComment(name);
  const end = document.createComment(`/${name}`);
  context.appendChild(start);
  context.appendChild(end);
  return { start, end };
}

/** Remove every node strictly between the region's markers. */
function clearRegion(region: Region): void {
  const parent = region.end.parentNode;
  if (!parent) return;
  // Whole-parent fast path: one native clear instead of N removals
  if (parent.firstChild === region.start && parent.lastChild === region.end && parent.nodeType === 1) {
    if (region.start.nextSibling === region.end) return;
    (parent as Element).textContent = "";
    parent.appendChild(region.start);
    parent.appendChild(region.end);
    return;
  }
  let node = region.start.nextSibling;
  while (node && node !== region.end) {
    const next = node.nextSibling;
    parent.removeChild(node);
    node = next;
  }
}

/** Render `fn` untracked into a fragment. */
function renderFragment<R>(fn: () => R): { frag: DocumentFragment; result: R } {
  const frag = document.createDocumentFragment();
  pushExecutionContext(frag);
  try {
    // Reads inside belong to the content's own bindings, not to the block
    return { frag, result: untrack(fn) };
  } finally {
    popExecutionContext();
  }
}

/**
 * Indices (into `seq`) of a longest strictly increasing subsequence, ignoring
 * negative entries. O(n log n).
 */
function longestIncreasing(seq: readonly number[]): Set<number> {
  const tails: number[] = []; // indices into seq
  const prev = new Array<number>(seq.length);
  for (let i = 0; i < seq.length; i++) {
    const v = seq[i];
    if (v < 0) continue;
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (seq[tails[mid]] < v) lo = mid + 1;
      else hi = mid;
    }
    prev[i] = lo > 0 ? tails[lo - 1] : -1;
    tails[lo] = i;
  }
  const out = new Set<number>();
  let k = tails.length > 0 ? tails[tails.length - 1] : -1;
  while (k >= 0) {
    out.add(k);
    k = prev[k];
  }
  return out;
}

/**
 * Reactive conditional rendering.
 * Swaps branches only when the condition flips between truthy and falsy;
 * reads inside a branch update through their own bindings, not a re-render.
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
  const region = createRegion("Show");

  const thenFn = typeof options === "function" ? options : options.then;
  const elseFn = typeof options === "function" ? undefined : options.else;

  // Only a flip of truthiness swaps branches, not every re-evaluation
  const condition = $(() => !!when());

  $e(() => {
    const branch = condition.value ? thenFn : elseFn;
    clearRegion(region);
    if (!branch) return;
    const { frag } = renderFragment(branch);
    region.end.parentNode?.insertBefore(frag, region.end);
  });
}

// WeakMap to assign stable internal IDs to objects
const itemToIdMap = new WeakMap<object, number>();
let idCounter = 0;

/**
 * Get a stable key for an item.
 * - If keyFn provided: use it
 * - If item is object: assign stable internal ID via WeakMap
 * - If item is primitive: use string representation
 */
function getItemKey<T>(
  item: T,
  index: number,
  keyFn?: (item: T, index: number) => string | number,
): string | number {
  // User-provided key function takes precedence
  if (keyFn) {
    return keyFn(item, index);
  }

  // For objects, assign stable internal ID
  if (typeof item === "object" && item !== null) {
    if (!itemToIdMap.has(item)) {
      itemToIdMap.set(item, idCounter++);
    }
    return `_o:${itemToIdMap.get(item)}`;
  }

  // For primitives, use value with type prefix
  return `${typeof item}:${item}`;
}

/**
 * High-performance keyed list rendering with efficient reconciliation.
 * Minimizes DOM operations by reusing existing nodes when possible.
 *
 * @param items - Reactive list or static array
 * @param render - Render function for each item
 * @param keyFn - Optional function to extract unique key from item
 *
 * **Automatic Key Assignment:**
 * The key function is **optional**. When not provided, Each automatically assigns stable keys:
 * - **Objects/Arrays**: Each reference gets a unique stable internal ID via WeakMap (no memory leaks)
 * - **Primitives**: Keyed by `type:value` (e.g., "number:42", "string:hello")
 * - **Custom**: Provide keyFn for explicit control (e.g., database IDs)
 *
 * **When Automatic Keying Works:**
 * - ✅ Object arrays (each object gets unique ID)
 * - ✅ Unique primitive values ([1, 2, 3])
 * - ✅ Arrays of arrays (each array reference gets unique ID)
 *
 * **When to Provide Custom keyFn:**
 * - ⚠️ Duplicate primitive values ([1, 2, 1] - both 1's share key "number:1")
 * - ⚠️ Same object reference multiple times ([obj, obj] - duplicate keys)
 * - 🎯 Explicit control needed (database IDs, debugging)
 *
 * Performance:
 * - Add 1 item to 1000: O(1) - creates 1 node (~0.5ms)
 * - Remove 1 item from 1000: O(1) - removes 1 node (~0.3ms)
 * - Move 1 item in 1000: O(1) - moves 1 node (~0.2ms)
 * - Preserves component state, focus, scroll position
 *
 * @example
 * // ✅ Automatic keying - objects get unique stable IDs
 * Each(() => todos.items, (todo) => {
 *   li({ textContent: todo.text });
 * });
 *
 * @example
 * // ✅ Automatic keying - unique primitives work great
 * Each(() => [1, 2, 3], (num) => {
 *   div({ textContent: num });
 * });
 *
 * @example
 * // ⚠️ Duplicate primitives - provide keyFn to distinguish them
 * const tags = ["react", "vue", "react"];  // Duplicate "react"
 * Each(() => tags, (tag) => {
 *   span({ textContent: tag });
 * }, (tag, index) => `${tag}-${index}`);  // Make keys unique
 *
 * @example
 * // 🎯 Explicit key function (optional, useful for DB objects)
 * Each(() => todos.items, (todo) => {
 *   li({ textContent: todo.text });
 * }, (todo) => todo.id);
 */
export function Each<T>(
  items: T[] | (() => T[]),
  render: (item: T, index: number) => void,
  keyFn?: (item: T, index: number) => string | number,
): void {
  const region = createRegion("Each");

  interface ItemNode {
    key: string | number | symbol;
    item: T;
    /** First node the item rendered (stable: an element or a nested block's start marker) */
    first: Node | null;
    /** Freshly rendered content waiting to be inserted (its only node, or a fragment) */
    pending: Node | null;
    /** Owns the effects created while rendering this item */
    owner: Owner;
  }

  let prevItemNodes: ItemNode[] = [];
  const nodeMap = new Map<string | number | symbol, ItemNode>();

  // Items are owned individually (not by the list effect below), so a list
  // update only disposes the items that actually left.
  onCleanup(() => {
    for (const itemNode of prevItemNodes) disposeOwner(itemNode.owner);
  });

  const renderItem = (item: T, index: number, key: string | number | symbol): ItemNode => {
    const owner: Owner = { owned: undefined };
    const frag = document.createDocumentFragment();
    pushExecutionContext(frag);
    try {
      runWithOwner(owner, () => untrack(() => render(item, index)));
    } finally {
      popExecutionContext();
    }
    const first = frag.firstChild;
    // A single node is inserted directly: moving it out of a fragment again costs a second DOM move
    const pending = first !== null && first === frag.lastChild ? first : frag;
    return { key, item, first, pending, owner };
  };

  $e(() => {
    const list =
      typeof items === "function" && !Array.isArray(items)
        ? (items as () => T[])()
        : items;

    const newItemNodes: ItemNode[] = new Array(list.length);
    const reused = new Set<ItemNode>();
    const usedKeys = new Set<string | number>();

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const key = getItemKey(item, i, keyFn);

      if (usedKeys.has(key)) {
        // A duplicate can't share the original's DOM: render it unkeyed
        console.warn(`[Each] Duplicate key: "${String(key)}". Keys must be unique.`);
        newItemNodes[i] = renderItem(item, i, Symbol());
        continue;
      }
      usedKeys.add(key);

      const existing = nodeMap.get(key);
      if (existing && !reused.has(existing) && (!keyFn || existing.item === item)) {
        reused.add(existing);
        newItemNodes[i] = existing;
      } else {
        newItemNodes[i] = renderItem(item, i, key);
      }
    }

    const parent = region.end.parentNode;

    // Live extent of each previous item, measured before anything moves:
    // from its first node up to the next item's first node (or the end
    // marker). Includes nodes nested blocks inserted after rendering.
    const extents = new Map<ItemNode, Node[]>();
    if (prevItemNodes.length > 0) {
      const firsts = new Set<Node>();
      for (const n of prevItemNodes) if (n.first) firsts.add(n.first);
      for (const n of prevItemNodes) {
        const nodes: Node[] = [];
        let node: Node | null = n.first;
        while (node && node !== region.end) {
          nodes.push(node);
          node = node.nextSibling;
          if (node && firsts.has(node)) break;
        }
        extents.set(n, nodes);
      }
    }

    // Remove items that left
    if (reused.size === 0 && prevItemNodes.length > 0) {
      for (const n of prevItemNodes) disposeOwner(n.owner);
      clearRegion(region);
    } else {
      for (const n of prevItemNodes) {
        if (reused.has(n)) continue;
        disposeOwner(n.owner);
        for (const node of extents.get(n) ?? []) node.parentNode?.removeChild(node);
      }
    }

    if (parent) {
      if (reused.size === 0) {
        // Nothing to keep in place: append everything in order
        const end = region.end;
        for (let i = 0; i < newItemNodes.length; i++) {
          const pending = newItemNodes[i].pending;
          if (pending) parent.insertBefore(pending, end);
        }
      } else {
        // Keep the longest run of items already in relative order; move or
        // insert only the rest. Walk backwards inserting before `next`.
        const prevIndex = new Map<ItemNode, number>();
        for (let i = 0; i < prevItemNodes.length; i++) prevIndex.set(prevItemNodes[i], i);
        const seq = newItemNodes.map((n) => (n.pending ? -1 : prevIndex.get(n) ?? -1));
        const stay = longestIncreasing(seq);

        let next: Node = region.end;
        for (let i = newItemNodes.length - 1; i >= 0; i--) {
          const n = newItemNodes[i];
          if (n.pending) {
            parent.insertBefore(n.pending, next);
          } else if (!stay.has(i)) {
            const nodes = extents.get(n) ?? [];
            if (nodes.length === 1) parent.insertBefore(nodes[0], next);
            else if (nodes.length > 1) {
              const frag = document.createDocumentFragment();
              for (const node of nodes) frag.appendChild(node);
              parent.insertBefore(frag, next);
            }
          }
          if (n.first) next = n.first;
        }
      }
    }
    for (const n of newItemNodes) n.pending = null;

    // Update tracking for next render
    prevItemNodes = newItemNodes;
    nodeMap.clear();
    for (const n of newItemNodes) nodeMap.set(n.key, n);
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
  if (typeof value !== "number") return false;

  // Range pattern with optional brackets/parentheses: "[18..65]", "(18..65)", etc.
  const rangeMatch = pattern.match(
    /^([\[\(])?(\d+(?:\.\d+)?)\.\.(\d+(?:\.\d+)?)([\]\)])?$/,
  );
  if (rangeMatch) {
    const [, startBracket, minStr, maxStr, endBracket] = rangeMatch;
    const min = Number(minStr);
    const max = Number(maxStr);

    // Determine inclusivity from brackets (default is inclusive)
    const startInclusive = startBracket !== "("; // [ or nothing = inclusive
    const endInclusive = endBracket !== ")"; // ] or nothing = inclusive

    const aboveMin = startInclusive ? value >= min : value > min;
    const belowMax = endInclusive ? value <= max : value < max;

    return aboveMin && belowMax;
  }

  // Comparison patterns: <, >, <=, >=
  const compMatch = pattern.match(/^(<=?|>=?)(\d+(?:\.\d+)?)$/);
  if (compMatch) {
    const [, op, numStr] = compMatch;
    const n = Number(numStr);

    if (op === "<") return value < n;
    if (op === ">") return value > n;
    if (op === "<=") return value <= n;
    if (op === ">=") return value >= n;
  }

  return false;
}

/**
 * Helper type that suggests patterns based on the matched value type.
 * - For numbers: suggests concrete range pattern examples
 * - For strings/other: allows any string key
 */
type MatchPattern<T> = T extends number
  ?
      | string
      // Comparison patterns (examples)
      | "<18"
      | ">18"
      | "<=18"
      | ">=18"
      | "<65"
      | ">65"
      | "<=65"
      | ">=65"
      // Range patterns (examples)
      | "0..17"
      | "18..64"
      | "65..120"
      | "[0..17]"
      | "[18..64]"
      | "[65..120]"
      | "(0..17)"
      | "(18..64)"
      | "(65..120)"
      | "[0..17)"
      | "[18..64)"
      | "[65..120)"
      | "(0..17]"
      | "(18..64]"
      | "(65..120]"
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
  const region = createRegion("Match");

  // Use a mutable store for internal state
  const state = $(Mut({ result: undefined as R | undefined }));

  // Normalize the input to a getter function
  const getter =
    typeof when === "function" ? when : () => (when as Signal<T>).value;

  // Select the arm in a computed so the view only re-renders when the
  // matched arm changes, not on every new value within the same arm
  const selected = $(() => {
    const value = getter();

    // Find matching handler:
    // 1. Try exact string match first (backward compatible)
    let handler = cases[String(value)];

    // 2. If no exact match and value is numeric, try pattern matching
    if (!handler && typeof value === "number") {
      for (const pattern in cases) {
        if (pattern !== "_" && matchesPattern(value, pattern)) {
          handler = cases[pattern];
          break;
        }
      }
    }

    // 3. Fall back to default case
    return handler ?? cases._;
  });

  $e(() => {
    const handler = selected.value;
    clearRegion(region);

    if (handler) {
      const { frag, result } = renderFragment(handler);
      // Update internal state (cast needed due to reactive store type complexity)
      state.result = result as unknown as typeof state.result;
      region.end.parentNode?.insertBefore(frag, region.end);
    } else {
      // No handler matched
      state.result = undefined as unknown as typeof state.result;
    }
  });

  // Return a computed signal that reads from the state
  return $(() => state.result) as Signal<R | undefined>;
}
