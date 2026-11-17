/**
 * Fia Reactivity System
 *
 * - Minimal allocations
 * - Inline hot paths
 * - Avoid Set/Map overhead where possible
 * - Use arrays for small subscriber lists
 * - Lazy property definitions
 */

/** Effect function type */
type EffectFn = () => void;

/**
 * Reactive node that can be subscribed to.
 *
 * `version` changes only when the node's value actually changes, so a
 * subscriber can tell "a dependency was touched" from "a dependency changed".
 */
interface ReactiveNode {
  version: number;
  subs: Subscriber[];
  /** For each entry of `subs`: this node's index in that subscriber's `deps` */
  subSlots: number[];
  /** Last subscriber that tracked this node, and when (see `track`) */
  tracker: Subscriber | undefined;
  trackedAt: number;
  /** Computed nodes only: bring the cached value up to date (may bump version). */
  refresh?: () => void;
}

/**
 * Subscriber that tracks its dependencies.
 *
 * Updates are two-phase (push dirtiness, pull values):
 * 1. A write calls `notify` down the graph. Computeds mark themselves stale and
 *    forward; effects enqueue themselves. No user code runs in this phase.
 * 2. `flush` runs queued effects. Each one first re-validates its deps, pulling
 *    stale computeds up to date, and only re-runs if a dep version moved.
 *
 * This gives glitch-free diamonds, equality cut-off through computeds, and
 * correct computed reads inside `batch`.
 */
interface Subscriber {
  notify: () => void;
  deps: ReactiveNode[];
  /** Version of each dep when it was read (parallel to `deps`). */
  depVersions: number[];
  /** For each dep: this subscriber's index in that dep's `subs` (O(1) unsubscribe) */
  depSlots: number[];
  /** `trackClock` when the current run started */
  runStart: number;
}

/** Monotonic clock for de-duplicating dependency reads (see `track`) */
let trackClock = 0;

/**
 * Shared placeholders for a node nobody has subscribed to yet: most signals
 * never get a subscriber, so their lists are allocated on first `track`.
 * Never mutated (trackIn swaps in real arrays before pushing).
 */
const NO_SUBS: Subscriber[] = [];
const NO_SLOTS: number[] = [];

/** Current tracking context */
let activeSubscriber: Subscriber | undefined = undefined;

/** Global version counter for dirty checking */
let globalVersion = 0;

/** Batch update state */
let batchDepth = 0;

/** Effects waiting to re-validate and possibly re-run */
const effectQueue: (() => void)[] = [];
let flushing = false;

// =============================================================================
// INSTRUMENTATION (tests / devtools only — not part of the public API)
// =============================================================================

/**
 * Observer for reactive nodes. `deps` is the live dependency list: it's empty
 * once the node is disposed or detached, so anything still subscribed after
 * its scope was torn down is a leak.
 * @internal
 */
export type DevHook = (kind: "effect" | "computed", node: { readonly deps: readonly unknown[] }) => void;

let devHook: DevHook | undefined = undefined;

/**
 * Install (or with `undefined`, remove) the creation observer. Returns the
 * previous hook so callers can nest.
 * @internal
 */
export function setDevHook(hook: DevHook | undefined): DevHook | undefined {
  const prev = devHook;
  devHook = hook;
  return prev;
}

/**
 * Snapshot of the scheduler's global state. Between top-level operations
 * every field should be at its idle value (0 / false).
 * @internal
 */
export function inspectRuntime(): {
  batchDepth: number;
  flushing: boolean;
  queued: number;
  tracking: boolean;
  owned: boolean;
} {
  return {
    batchDepth,
    flushing,
    queued: effectQueue.length,
    tracking: activeSubscriber !== undefined,
    owned: currentOwner !== undefined,
  };
}

// =============================================================================
// OWNERSHIP
// =============================================================================

/**
 * A scope that owns the effects and computeds created while it runs.
 * Disposing an owner disposes everything it owns (children before parents'
 * remaining cleanups, in reverse creation order).
 *
 * Every effect is an owner for the duration of its run: nested effects are
 * disposed before it re-runs. Control flow (Show/Each/Match) uses explicit
 * owners so a removed branch or list item releases its bindings.
 *
 * @internal
 */
export interface Owner {
  owned: (() => void)[] | undefined;
}

/** Owner of whatever is being created right now */
let currentOwner: Owner | undefined = undefined;

/**
 * Run `fn` when the current scope is torn down: before an effect re-runs or
 * when it's disposed, when a Show/Match branch is swapped out, when an Each
 * item leaves the list, or when a `root`/`mount` is disposed. Use it to
 * release timers, subscriptions and listeners a component set up.
 *
 * ```ts
 * $e(() => {
 *   const id = setInterval(tick, delay.value);
 *   onCleanup(() => clearInterval(id));
 * });
 * ```
 *
 * Outside any scope there is nothing to attach to and `fn` never runs.
 */
export function onCleanup(fn: () => void): void {
  if (currentOwner) {
    (currentOwner.owned ??= []).push(fn);
  }
}

/**
 * The scope currently collecting effects/cleanups, if any.
 * @internal
 */
export function getOwner(): Owner | undefined {
  return currentOwner;
}

/**
 * Create an independent scope. Everything created inside `fn` (effects,
 * computeds, control flow, cleanups) is disposed by the `dispose` function
 * passed to `fn`, and not by any enclosing scope. Reads inside `fn` are not
 * tracked.
 *
 * ```ts
 * const stop = root((dispose) => {
 *   $e(() => console.log(count.value));
 *   return dispose;
 * });
 * stop(); // the effect stops
 * ```
 */
export function root<T>(fn: (dispose: () => void) => T): T {
  const owner: Owner = { owned: undefined };
  return runWithOwner(owner, () => untrack(() => fn(() => disposeOwner(owner))));
}

/**
 * Run `fn` with `owner` as the current owner.
 * @internal
 */
export function runWithOwner<T>(owner: Owner, fn: () => T): T {
  const prevOwner = currentOwner;
  currentOwner = owner;
  try {
    return fn();
  } finally {
    currentOwner = prevOwner;
  }
}

/**
 * Dispose everything an owner owns. The owner can be reused afterwards.
 * @internal
 */
export function disposeOwner(owner: Owner): void {
  const owned = owner.owned;
  if (!owned) return;
  owner.owned = undefined;
  for (let i = owned.length - 1; i >= 0; i--) {
    owned[i]();
  }
}

/**
 * Run `fn` without tracking any reactive reads: inside an effect or computed,
 * signals read in `fn` don't become dependencies.
 *
 * ```ts
 * $e(() => {
 *   // Re-runs when `query` changes, not when `settings` does
 *   search(query.value, untrack(() => settings.value));
 * });
 * ```
 */
export function untrack<T>(fn: () => T): T {
  const prevSubscriber = activeSubscriber;
  activeSubscriber = undefined;
  try {
    return fn();
  } finally {
    activeSubscriber = prevSubscriber;
  }
}

/**
 * Track a dependency - called when reading a reactive value
 */
function track(node: ReactiveNode): void {
  const sub = activeSubscriber;
  if (sub !== undefined) trackIn(sub, node);
}

/**
 * Subscribe `sub` to `node` unless it already is in this run. O(1): the node
 * remembers who tracked it last and when. If that was `sub` during the
 * current run, it's a repeat. If it was another subscriber during our run
 * (a computed nested inside us read the same node), we may or may not have
 * it, so scan; that's the only case that scans.
 */
function trackIn(sub: Subscriber, node: ReactiveNode): void {
  if (node.trackedAt > sub.runStart) {
    if (node.tracker === sub || sub.deps.includes(node)) {
      node.tracker = sub;
      return;
    }
  }
  if (node.subs === NO_SUBS) {
    node.subs = [];
    node.subSlots = [];
  }
  const n = sub.deps.length;
  sub.deps.push(node);
  sub.depVersions.push(node.version);
  sub.depSlots.push(node.subs.length);
  node.subs.push(sub);
  node.subSlots.push(n);
  node.tracker = sub;
  node.trackedAt = ++trackClock;
}

/**
 * Trigger updates - called when a reactive value changes
 */
function trigger(node: ReactiveNode): void {
  node.version = ++globalVersion;

  // notify() never runs user code or touches subs lists, so no copy is needed
  const subs = node.subs;
  for (let i = 0; i < subs.length; i++) {
    subs[i].notify();
  }

  if (batchDepth === 0) flush();
}

/**
 * Run queued effects. Effects queued while flushing (writes made by effects)
 * are picked up by the same loop. An effect error doesn't strand the rest of
 * the queue — the first error is rethrown once everything has run.
 */
function flush(): void {
  if (flushing) return;
  flushing = true;

  let error: unknown;
  let failed = false;
  for (let i = 0; i < effectQueue.length; i++) {
    try {
      effectQueue[i]();
    } catch (e) {
      if (!failed) {
        failed = true;
        error = e;
      }
    }
  }
  effectQueue.length = 0;
  flushing = false;

  if (failed) throw error;
}

/**
 * Whether any dependency changed since the subscriber last ran.
 * Pulls stale computed deps up to date first, so a computed that recomputes
 * to the same value doesn't count as a change.
 */
function depsChanged(sub: Subscriber): boolean {
  const deps = sub.deps;
  const versions = sub.depVersions;
  for (let i = 0; i < deps.length; i++) {
    const dep = deps[i];
    if (dep.refresh) dep.refresh();
    if (dep.version !== versions[i]) return true;
  }
  return false;
}

/**
 * Clean up a subscriber's dependencies
 * This is crucial for avoiding stale subscriptions (inspired by SolidJS)
 */
function cleanupSubscriber(sub: Subscriber): void {
  const deps = sub.deps;
  const slots = sub.depSlots;
  for (let i = 0; i < deps.length; i++) {
    // Swap-remove `sub` from the dep's subscriber list, fixing the slot of
    // whichever subscriber takes its place
    const dep = deps[i];
    const slot = slots[i];
    const subs = dep.subs;
    const subSlots = dep.subSlots;
    const last = subs.pop()!;
    const lastSlot = subSlots.pop()!;
    if (slot < subs.length) {
      subs[slot] = last;
      subSlots[slot] = lastSlot;
      last.depSlots[lastSlot] = slot;
    }
  }
  deps.length = 0;
  sub.depVersions.length = 0;
  slots.length = 0;
}

/**
 * Batch multiple signal updates into a single effect run.
 *
 * Usage:
 * ```ts
 * batch(() => {
 *   count.value = 1;
 *   name.value = "John";
 * });
 * // Effects run only once here
 * ```
 *
 * @param fn - The function containing state updates to batch
 */
export function batch(fn: () => void): void {
  batchDepth++;
  try {
    fn();
  } finally {
    if (--batchDepth === 0) flush();
  }
}

/**
 * Create a reactive effect that runs whenever its dependencies change.
 *
 * Usage:
 * ```ts
 * $e(() => {
 *   // console.log("Count is:", count.value);
 * });
 * ```
 *
 * Effects created inside another effect (or inside a Show/Each/Match branch)
 * are owned by it and disposed automatically when it re-runs or is disposed.
 *
 * @param fn - The effect function to run
 * @returns A dispose function to stop the effect
 */
export function $e(fn: EffectFn): () => void {
  let active = true;
  let queued = false;

  const subscriber: Subscriber & Owner = {
    notify() {
      if (active && !queued) {
        queued = true;
        effectQueue.push(validate);
      }
    },
    deps: [],
    depVersions: [],
    depSlots: [],
    runStart: 0,
    owned: undefined,
  };

  function run(): void {
    // Dispose effects/computeds created by the previous run
    disposeOwner(subscriber);

    // Clean up old dependencies before re-running
    // This ensures conditional branches don't leave stale subscriptions
    cleanupSubscriber(subscriber);

    const prevSubscriber = activeSubscriber;
    const prevOwner = currentOwner;
    subscriber.runStart = ++trackClock;
    activeSubscriber = subscriber;
    currentOwner = subscriber;
    try {
      fn();
    } finally {
      activeSubscriber = prevSubscriber;
      currentOwner = prevOwner;
    }
  }

  function validate(): void {
    queued = false;
    if (active && depsChanged(subscriber)) run();
  }

  const dispose = (): void => {
    if (!active) return;
    active = false;
    disposeOwner(subscriber);
    cleanupSubscriber(subscriber);
  };

  onCleanup(dispose);
  if (devHook !== undefined) devHook("effect", subscriber);

  // Run immediately to establish initial dependencies
  run();

  return dispose;
}

/**
 * Signal types
 */

/**
 * Detects if T is a "plain object" (not a primitive, array, or function).
 * Branded types like `number & { [brand]: "px" }` extend primitives and are NOT plain objects.
 */
export type IsPlainObject<T> =
  T extends string | number | boolean | symbol | bigint | null | undefined ? false :
  T extends readonly unknown[] ? false :
  T extends Function ? false :
  T extends object ? true :
  false;

/**
 * Widens primitive types, arrays, and objects for assignment flexibility.
 * - Strings: "1rem" → string
 * - Numbers: 42 → number (branded numbers like Pixels preserved)
 * - Booleans: true → boolean
 * - Arrays: readonly [1, 3, 4] → number[]
 * - Objects: { readonly name: "evan"; age: 30 } → { name: string; age: number }
 */
export type Widen<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends readonly [] ? unknown[] :
  T extends readonly (infer U)[] ? Widen<U>[] :
  IsPlainObject<T> extends true ? { -readonly [K in keyof T]: Widen<T[K]> } :
  T;

/**
 * Makes the getter type readable (mutable but with preserved literals for intellisense).
 * - Primitives: preserved ("1rem" stays "1rem", branded types preserved)
 * - Arrays: readonly [1, 3, 4] → (1 | 3 | 4)[]
 * - Objects: { readonly name: "evan" } → { name: "evan" } (mutable, literals preserved)
 */
export type Readable<T> =
  T extends string | number | boolean | symbol | bigint | null | undefined ? T :  // Preserve primitives (including branded)
  T extends readonly (infer U)[] ? U[] :
  IsPlainObject<T> extends true ? { -readonly [K in keyof T]: Readable<T[K]> } :
  T;

/**
 * A read-only reactive signal.
 * 
 * Signals track their dependencies automatically and update when dependencies change.
 * Read the value by calling the signal or accessing `.value`.
 * 
 * @example
 * ```ts
 * const count = $(0);
 * const double = $(() => count.value * 2); // Signal<number>
 * 
 * // console.log(double.value); // 0
 * count.value = 5;
 * // console.log(double.value); // 10
 * ```
 * 
 * @template T - The type of the signal's value
 */
export interface Signal<T> {
  /** Call the signal as a function to read its value (tracks dependencies). */
  (): Readable<T>;
  /** Read the current value (tracks dependencies). */
  readonly value: Readable<T>;
  /** Read the current value without tracking dependencies. */
  peek(): Readable<T>;
}

/**
 * A writable reactive signal for primitives.
 * 
 * Create with `$(initialValue)` where initialValue is a primitive (string, number, boolean, etc.).
 * Write by setting `.value` or calling with a new value.
 * 
 * @example
 * ```ts
 * const name = $("Evan");
 * name.value = "John";  // Update via .value
 * name("Jane");         // Or call as function
 * 
 * // console.log(name.value); // "Jane"
 * ```
 * 
 * @template T - The type of the signal's value
 */
export interface WritableSignal<T> extends Signal<T> {
  /** Call with a value to update the signal. */
  (newValue: Widen<T>): void;
  /** Get: returns readable type (mutable arrays, literal primitives). Set: accepts widened type. */
  get value(): Readable<T>;
  set value(v: Widen<T>);
}

/**
 * Create a writable signal
 */
function createSignal<T>(initial: T, readonly: boolean = false): Signal<T> | WritableSignal<T> {
  const node: ReactiveNode = {
    version: 0,
    subs: NO_SUBS,
    subSlots: NO_SLOTS,
    tracker: undefined,
    trackedAt: 0,
  };

  let currentValue = initial;

  const signal = function (newValue?: T): T | void {
    // Write path
    if (arguments.length > 0) {
      if (readonly) {
        throw new TypeError("Cannot update a read-only signal.");
      }
      if (!Object.is(currentValue, newValue)) {
        currentValue = newValue!;
        trigger(node);
      }
      return;
    }

    // Read path
    track(node);
    return currentValue;
  } as WritableSignal<T>;

  Object.defineProperty(signal, "value", {
    get() {
      track(node);
      return currentValue;
    },
    set(newValue: T) {
      if (readonly) {
        throw new TypeError("Cannot update a read-only signal.");
      }
      if (!Object.is(currentValue, newValue)) {
        currentValue = newValue;
        trigger(node);
      }
    },
  });

  // Mark as signal for fast detection
  (signal as unknown as InternalSignal)[SIGNAL] = true;

  // Peek: read without tracking (inspired by SolidJS)
  signal.peek = () => currentValue as Readable<T>;

  return signal;
}

/**
 * Create a computed signal
 * Uses version-based dirty checking (inspired by Preact Signals): a stale
 * computed only recomputes if a dependency's version moved, and only bumps
 * its own version if the result actually changed.
 */
function createComputed<T>(compute: () => T): Signal<T> {
  let currentValue: T;
  let initialized = false;
  /** A dependency was notified since the last refresh */
  let stale = true;

  const node: ReactiveNode = {
    version: 0,
    subs: NO_SUBS,
    subSlots: NO_SLOTS,
    tracker: undefined,
    trackedAt: 0,
    refresh,
  };

  // Internal subscriber for tracking compute dependencies
  const subscriber: Subscriber = {
    notify() {
      // Already stale → our subscribers were already notified
      if (stale) return;
      stale = true;
      const subs = node.subs;
      for (let i = 0; i < subs.length; i++) {
        subs[i].notify();
      }
    },
    deps: [],
    depVersions: [],
    depSlots: [],
    runStart: 0,
  };

  /** Unsubscribed by its owner's disposal — can't trust staleness anymore */
  let detached = false;

  /** The last computation threw; `error` is rethrown to readers */
  let hasError = false;
  let error: unknown = undefined;

  function refresh(): void {
    if (!stale) return;
    stale = false;
    if (initialized && !detached && !depsChanged(subscriber)) return;
    detached = false;

    // Clean up old dependencies
    cleanupSubscriber(subscriber);

    // Computeds aren't owners: they recompute lazily from arbitrary contexts,
    // so anything created inside must not attach to whoever triggered the read
    const prevSubscriber = activeSubscriber;
    const prevOwner = currentOwner;
    subscriber.runStart = ++trackClock;
    activeSubscriber = subscriber;
    currentOwner = undefined;
    let newValue: T;
    try {
      newValue = compute();
    } catch (e) {
      // Cache the error like a value: readers rethrow it, and because the
      // deps read before the throw stay tracked (and readers keep tracking
      // this node), a later change to them recomputes and recovers. Throwing
      // out of refresh instead would drop readers' subscriptions for good.
      error = e;
      hasError = true;
      initialized = true;
      node.version = ++globalVersion;
      return;
    } finally {
      activeSubscriber = prevSubscriber;
      currentOwner = prevOwner;
    }

    if (!initialized || hasError || !Object.is(currentValue, newValue)) {
      currentValue = newValue;
      initialized = true;
      hasError = false;
      error = undefined;
      node.version = ++globalVersion;
    }
  }

  // When the creating scope is disposed, stop listening to sources. A later
  // read recomputes from scratch (and re-subscribes).
  onCleanup(() => {
    cleanupSubscriber(subscriber);
    stale = true;
    detached = true;
  });
  if (devHook !== undefined) devHook("computed", subscriber);

  // Initial computation
  refresh();

  const signal = function (): T {
    refresh();

    // Track this computed as a dependency (also when it holds an error)
    track(node);
    if (hasError) throw error;
    return currentValue;
  } as Signal<T>;

  Object.defineProperty(signal, "value", {
    get() {
      return signal();
    },
  });

  // Mark as signal for fast detection
  (signal as unknown as InternalSignal)[SIGNAL] = true;

  // Peek without tracking
  signal.peek = () => {
    refresh();
    if (hasError) throw error;
    return currentValue as Readable<T>;
  };

  return signal;
}

// =============================================================================
// MUTABILITY HELPERS
// =============================================================================

const MUTABLE = Symbol("mutable");

/** Wrapper for mutable primitive values */
export type Mutable<T> = { value: T;[MUTABLE]: true };

/**
 * Mark a primitive value as mutable.
 * Used with `$` to create a writable signal.
 * 
 * @example
 * ```ts
 * const count = $(Mut(0));
 * count.value++; // Works
 * 
 * const immutable = $(0);
 * immutable.value++; // Error
 * ```
 */
export function Mut<T>(value: T): Mutable<T> {
  return { value, [MUTABLE]: true };
}

function isMutableWrapper<T>(value: unknown): value is Mutable<T> {
  return value !== null && typeof value === "object" && (value as any)[MUTABLE] === true;
}

// =============================================================================
// REACTIVE STORE (Proxy-based object reactivity)
// =============================================================================

/** Symbol to mark an object as a reactive proxy */
const REACTIVE_PROXY = Symbol("reactive-proxy");

/** Symbol to access the raw (unwrapped) object */
const RAW = Symbol("raw");

/** Store node for the key set (Object.keys, for...in, `in` on missing keys) */
const ITERATE = Symbol("iterate");

/**
 * Array methods that write. Called on a store they run as one batch and
 * untracked: one notification instead of one per index they touch, no
 * effect ever sees a half-sorted array, and an effect that pushes doesn't
 * subscribe to the length it just changed (which would re-run it forever).
 */
const ARRAY_MUTATORS: Record<string, true> = {
  push: true, pop: true, shift: true, unshift: true, splice: true,
  sort: true, reverse: true, fill: true, copyWithin: true,
};

/** Wrap an array method to run untracked inside one batch. */
function batchedMutator(method: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown {
  return function (this: unknown, ...args: unknown[]) {
    const prevSubscriber = activeSubscriber;
    activeSubscriber = undefined;
    batchDepth++;
    try {
      return method.apply(this, args);
    } finally {
      activeSubscriber = prevSubscriber;
      if (--batchDepth === 0) flush();
    }
  };
}

/** Trigger several nodes as one update (no flush between them). */
function triggerAll(nodes: ReactiveNode[]): void {
  if (nodes.length === 1) {
    trigger(nodes[0]);
    return;
  }
  batchDepth++;
  try {
    for (let i = 0; i < nodes.length; i++) trigger(nodes[i]);
  } finally {
    if (--batchDepth === 0) flush();
  }
}

/**
 * Utility type to extract keys that are wrapped in Mutable<T>
 */
export type MutableKeys<T> = {
  [K in keyof T]-?: T[K] extends Mutable<infer U>
  ? (IsPlainObject<U> extends true ? never : K)
  : never
}[keyof T];

/**
 * Reactive store type - immutable by default.
 * - By default, all properties are readonly and strictly typed (literals preserved).
 * - Properties specified in `M` (Mutable Keys) become -readonly and Widened (mutable primitives).
 * - Properties wrapped in `Mut()` are automatically treated as mutable.
 */
export type ReactiveStore<T extends object, M extends keyof T = never> = ReactiveStoreImpl<T, M | MutableKeys<T>>;

type ReactiveStoreImpl<T extends object, M extends keyof T> = {
  // Mutable Keys: Remove readonly, Widen type, Recursive Wrap
  -readonly [K in M]: T[K] extends object
  ? T[K] extends Function ? T[K]
  : T[K] extends readonly any[] ? Widen<T[K]>
  : T[K] extends Mutable<infer U> ? (U extends object ? ReactiveStore<U, keyof U> : Widen<U>) // Unwrap Mutable
  : T[K] extends { $raw: any } ? T[K]
  : ReactiveStore<T[K]> // Children inherit immutability by default
  : Widen<T[K]>;
} & {
  // Immutable Keys: Keep readonly, Keep literal type, Recursive Wrap
  readonly [K in Exclude<keyof T, M>]: T[K] extends object
  ? T[K] extends Function ? T[K]
  : T[K] extends readonly any[] ? T[K]
  : T[K] extends Mutable<infer U> ? (U extends object ? ReactiveStore<U, keyof U> : Widen<U>) // Unwrap AND make mutable!
  : T[K] extends { $raw: any } ? T[K]
  : ReactiveStore<T[K]> // Children inherit immutability by default
  : T[K];
} & {
  /** Access the raw unwrapped object (escape hatch) */
  readonly $raw: T;
};

/**
 * Utility type to mark specific keys as mutable in a ReactiveStore.
 * Useful when working with readonly source types.
 */
export type Mut<T, K extends keyof T> = {
  -readonly [P in K]: T[P];
} & Omit<T, K>;

/**
 * Utility type to mark specific keys as immutable in a ReactiveStore.
 */
export type Imut<T, K extends keyof T> = {
  readonly [P in K]: T[P];
} & Omit<T, K>;

/**
 * Check if a value is already a reactive proxy
 */
function isReactiveProxy(value: unknown): boolean {
  return value !== null && typeof value === "object" && REACTIVE_PROXY in value;
}

/**
 * Create a reactive store from an object.
 * Uses Proxy for fine-grained per-property reactivity.
 */
function createStore<T extends object>(initial: T, mutability: Set<PropertyKey> | boolean = false): ReactiveStore<T> {
  // Per-property reactive nodes for fine-grained tracking
  const nodes = new Map<PropertyKey, ReactiveNode>();

  // Cache for nested proxy wrappers
  // We separate mutable and immutable proxies to ensure consistency
  const proxyCache = new WeakMap<object, { readonly?: ReactiveStore<any>; mutable?: ReactiveStore<any> }>();

  /** Batched wrappers for ARRAY_MUTATORS, created on first use */
  let mutators: Record<string, (...args: unknown[]) => unknown> | undefined;
  const isArray = Array.isArray(initial);

  function getOrCreateNode(key: PropertyKey): ReactiveNode {
    let node = nodes.get(key);
    if (!node) {
      node = { version: 0, subs: NO_SUBS, subSlots: NO_SLOTS, tracker: undefined, trackedAt: 0 };
      nodes.set(key, node);
    }
    return node;
  }

  // Strict Immutability: Freeze the object if it has no mutable keys/wrappers
  const isStrictlyImmutable = mutability === false || (mutability instanceof Set && mutability.size === 0);

  if (isStrictlyImmutable) {
    let hasMutableWrappers = false;

    // Scan for Mut wrappers
    // Using for...in to be safe with prototypes, though usually initial is plain object
    for (const key in initial) {
      if (isMutableWrapper(initial[key])) {
        hasMutableWrappers = true;
        break;
      }
    }

    if (Array.isArray(initial) && !hasMutableWrappers) {
      for (let i = 0; i < initial.length; i++) {
        if (isMutableWrapper(initial[i])) {
          hasMutableWrappers = true;
          break;
        }
      }
    }

    if (!hasMutableWrappers) {
      // Eagerly replace nested objects with their proxies before freezing
      // This ensures Proxy Invariants are met (target prop value === get trap result)
      if (Array.isArray(initial)) {
        for (let i = 0; i < initial.length; i++) {
          const val = initial[i];
          if (val && typeof val === "object" && !isMutableWrapper(val) && !isReactiveProxy(val)) {
            // Recursively create frozen immutable proxy
            initial[i] = createStore(val as object, false);
          }
        }
      } else {
        for (const key in initial) {
          const val = initial[key];
          if (val && typeof val === "object" && !isMutableWrapper(val) && !isReactiveProxy(val)) {
            // Recursively create frozen immutable proxy
            // @ts-ignore
            initial[key] = createStore(val as object, false);
          }
        }
      }
      Object.freeze(initial);
    }
  }

  const proxy = new Proxy(initial, {
    get(target, key, receiver) {
      // Special accessor for raw object
      if (key === RAW || key === "$raw") return target;

      // Mark as reactive proxy
      if (key === REACTIVE_PROXY) return true;

      const value = Reflect.get(target, key, receiver);

      // Writing array methods: batched + untracked (see ARRAY_MUTATORS).
      // Checked only for function values so plain reads pay nothing.
      // (The wrapper is built outside the trap: a closure here would make
      // every read allocate a scope for the captured value.)
      if (isArray && typeof value === "function" && ARRAY_MUTATORS[key as string] === true) {
        return ((mutators ??= {})[key as string] ??= batchedMutator(value as (...a: unknown[]) => unknown));
      }

      track(getOrCreateNode(key));  // Track this property access

      // Deep reactivity: wrap nested objects in proxies
      // Check for Mutable wrapper first to unwrap
      if (isMutableWrapper(value)) {
        // Check cache for the wrapper itself to ensure stable proxy reference
        let cacheEntry = proxyCache.get(value);
        if (cacheEntry?.mutable) return cacheEntry.mutable;

        // It's a Mutable wrapper! Treat inner value as mutable.
        const inner = value.value;
        if (inner !== null && typeof inner === "object") {
          const newProxy = createStore(inner as object, true);

          if (!cacheEntry) {
            cacheEntry = {};
            proxyCache.set(value, cacheEntry);
          }
          cacheEntry.mutable = newProxy;

          return newProxy;
        }
        return inner;
      }

      if (value !== null && typeof value === "object" && !isReactiveProxy(value)) {
        const isMutableKey =
          (typeof mutability === "boolean" && mutability) ||
          (mutability instanceof Set && mutability.has(key));

        // Check cache first
        let cacheEntry = proxyCache.get(value);
        if (cacheEntry) {
          const cached = isMutableKey ? cacheEntry.mutable : cacheEntry.readonly;
          if (cached) return cached;
        }

        const newProxy = createStore(value, isMutableKey);

        if (!cacheEntry) {
          cacheEntry = {};
          proxyCache.set(value, cacheEntry);
        }

        if (isMutableKey) cacheEntry.mutable = newProxy;
        else cacheEntry.readonly = newProxy;

        return newProxy;
      }

      return value;
    },

    set(target, key, value, receiver) {
      // Enforce immutability
      let isMutableKey =
        (typeof mutability === "boolean" && mutability) ||
        (mutability instanceof Set && mutability.has(key));

      const oldValue = Reflect.get(target, key, receiver);

      // Logic: If the value being overwritten is a Mut() wrapper, 
      // strict immutability shouldn't apply - the user explicitly opted in.
      // We promote this key to be mutable for future writes too.
      // BUT: If the inner value is an object, we should NOT allow replacing the wrapper itself.
      // Mut({...}) means the *contents* are mutable, not the reference on the parent.
      if (!isMutableKey && isMutableWrapper(oldValue)) {
        // Allow if primitive (value is not object or is null)
        // Note: Mut(null) is ambiguous but usually means nullable primitive slot.
        if (oldValue.value === null || typeof oldValue.value !== "object") {
          if (mutability === false) mutability = new Set();
          if (mutability instanceof Set) mutability.add(key);
          isMutableKey = true;
        }
      }

      if (!isMutableKey) {
        throw new TypeError(
          `[Fia] Cannot mutate immutable store property "${String(key)}". ` +
          `Opt in with $(obj, "${String(key)}") or wrap the value in Mut().`,
        );
      }

      const rawValue = value !== null && typeof value === "object" && RAW in value
        ? value[RAW]
        : value;

      const hadKey = oldValue !== undefined || Object.prototype.hasOwnProperty.call(target, key);
      if (hadKey && Object.is(oldValue, rawValue)) return true;  // No change

      const oldLength = isArray ? (target as unknown[]).length : 0;

      Reflect.set(target, key, rawValue, receiver);

      // Keep oldValue's cached proxy: the cache is keyed by the raw object, not
      // the slot, and an object overwritten here may still live at another
      // index (splice/reverse/sort). Dropping it would mint a second proxy with
      // its own property nodes, silently cutting off bindings made through the
      // first one. The WeakMap releases it once the object is unreachable.

      const node = nodes.get(key);
      // Fast path: overwriting an existing key of a plain object
      if (hadKey && !isArray) {
        if (node) trigger(node);
        return true;
      }

      const changed: ReactiveNode[] = [];
      if (node) changed.push(node);
      if (!hadKey) {
        const keysNode = nodes.get(ITERATE);
        if (keysNode) changed.push(keysNode);
      }
      if (isArray) {
        const newLength = (target as unknown[]).length;
        if (key !== "length" && newLength !== oldLength) {
          // arr[arr.length] = x grows the array without a "length" write
          const lengthNode = nodes.get("length");
          if (lengthNode) changed.push(lengthNode);
        } else if (key === "length" && newLength < oldLength) {
          // Truncation removes indices without writing them
          for (let i = newLength; i < oldLength; i++) {
            const indexNode = nodes.get(String(i));
            if (indexNode) changed.push(indexNode);
          }
        }
      }
      if (changed.length > 0) triggerAll(changed);

      return true;
    },

    // Handle 'in' operator — tracked, so `"k" in store` updates when k appears
    has(target, key) {
      if (key === REACTIVE_PROXY || key === RAW || key === "$raw") return true;
      track(getOrCreateNode(key));
      return Reflect.has(target, key);
    },

    // Handle Object.keys, for...in, etc. — tracked against the key set
    ownKeys(target) {
      track(getOrCreateNode(ITERATE));
      if (Array.isArray(target)) track(getOrCreateNode("length"));
      return Reflect.ownKeys(target);
    },

    getOwnPropertyDescriptor(target, key) {
      return Reflect.getOwnPropertyDescriptor(target, key);
    },

    // Handle delete
    deleteProperty(target, key) {
      // Enforce immutability
      let isMutableKey =
        (typeof mutability === "boolean" && mutability) ||
        (mutability instanceof Set && mutability.has(key));

      if (!isMutableKey) {
        const oldValue = Reflect.get(target, key);
        if (isMutableWrapper(oldValue)) {
          // Allow deleting a Mut wrapper ONLY if it's a primitive
          if (oldValue.value === null || typeof oldValue.value !== "object") {
            if (mutability === false) mutability = new Set();
            if (mutability instanceof Set) mutability.add(key);
            isMutableKey = true;
          }
        }
      }

      if (!isMutableKey) {
        throw new TypeError(
          `[Fia] Cannot delete immutable store property "${String(key)}". ` +
          `Opt in with $(obj, "${String(key)}") or wrap the value in Mut().`,
        );
      }

      const hadKey = Reflect.has(target, key);
      const result = Reflect.deleteProperty(target, key);

      if (hadKey && result) {
        const changed: ReactiveNode[] = [];
        const node = nodes.get(key);
        if (node) changed.push(node);
        const keysNode = nodes.get(ITERATE);
        if (keysNode) changed.push(keysNode);
        if (changed.length > 0) triggerAll(changed);
      }

      return result;
    }
  }) as ReactiveStore<T>;

  return proxy;
}

/**
 * Checks if a type has extra properties beyond its base primitive type.
 * Used to detect branded types (e.g., `Pixels = number & { [brand]: "px" }`).
 */
/**
 * Create a signal, computed value, or reactive store.
 *
 * **Signal (Primitives):**
 * ```ts
 * const count = $(0);
 * count.value++;
 * ```
 *
 * **Reactive Store (Objects):**
 * ```ts
 * const state = $({ name: "Evan", age: 17 });
 * state.age++;  // Direct mutation is reactive!
 * ```
 *
 * **Computed (Derived State):**
 * ```ts
 * const double = $(() => count.value * 2);
 * const isAdult = $(() => state.age >= 18);
 * ```
 *
 * Type inference:
 * - Primitives: `$(0)` → `WritableSignal<number>`
 * - Objects: `$({a: 1})` → `ReactiveStore<{a: number}>`
 * - Functions: `$(() => x)` → `Signal<typeof x>`
 *
 * @param initial - The initial value, object, or computation function
 * @returns Signal for primitives, ReactiveStore for objects, or computed Signal for functions
 */
// Overload 1: Computed (function)
export function $<T>(compute: () => T): Signal<T>;
// Overload 2: Mutable Primitives
export function $<const T extends string | number | boolean | null | undefined>(initial: Mutable<T>): WritableSignal<Widen<T>>;
// Overload 3: Mutable Arrays
export function $<const T extends readonly unknown[]>(initial: Mutable<T>): ReactiveStore<T extends readonly (infer U)[] ? U[] : T, keyof (T extends readonly (infer U)[] ? U[] : T)>;
// Overload 4: Mutable Objects (All keys mutable)
export function $<const T extends Record<string, unknown>>(initial: Mutable<T>): ReactiveStore<T, keyof T>;
// Overload 5: Object (Immutable by default)
export function $<const T extends object>(initial: T): ReactiveStore<T>;
// Overload 6: Object (With mutable keys)
export function $<const T extends object, M extends keyof T>(initial: T, ...mutable: M[]): ReactiveStore<T, M>;
// Overload 6: Immutable Primitives (Default)
export function $<const T extends string | number | boolean | null | undefined>(initial: T): Signal<Widen<T>>;
// Overload 7: Immutable Arrays (Default)
export function $<const T extends readonly unknown[]>(initial: T): ReactiveStore<Readonly<T extends readonly (infer U)[] ? U[] : T>>;

// Implementation
export function $<T>(initial: T | Mutable<T>, ..._mutable: (keyof T)[]): Signal<T> | WritableSignal<T> | ReactiveStore<T & object> {
  // Computed
  if (typeof initial === "function") {
    return createComputed(initial as () => T) as Signal<T>;
  }

  // Object
  if (initial !== null && typeof initial === "object" && !isMutableWrapper(initial)) {
    return createStore(initial as T & object, new Set(_mutable));
  }

  // Mutable Wrapper (Primitive or Object)
  if (isMutableWrapper<T>(initial)) {
    if (typeof initial.value === "object" && initial.value !== null) {
      // Create fully mutable store (pass true)
      return createStore(initial.value as T & object, true);
    }
    // Primitive
    return createSignal(initial.value, false) as WritableSignal<T>;
  }

  // Immutable Primitive
  return createSignal(initial as T, true) as Signal<T>;
}

// Named export for API compatibility
export { $ as signal };

/**
 * A value that can be either a static value `T` or a `Signal<T>`.
 * Used for reactive properties and content.
 */
export type MaybeSignal<T> = T | Signal<T>;

/**
 * An attribute/property value: a static value, or a signal that may also be
 * `null`/`undefined` — which removes the attribute (or resets the property).
 */
export type Bindable<T> = T | Signal<T | null | undefined>;

// =============================================================================
// INTERNAL: FAST SIGNAL DETECTION
// =============================================================================

const SIGNAL = Symbol("signal");

interface InternalSignal {
  [SIGNAL]: true;
}

/**
 * Checks if a value is a Signal.
 * @param value - The value to check
 * @returns True if the value is a Signal
 */
export function isSignal(value: unknown): value is Signal<unknown> {
  return (
    typeof value === "function" && (value as unknown as InternalSignal)[SIGNAL] === true
  );
}
