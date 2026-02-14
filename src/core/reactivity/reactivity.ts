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

/** Reactive node that can be subscribed to */
interface ReactiveNode {
  version: number;
  subs: Set<Subscriber>;
}

/** Subscriber that tracks its dependencies */
interface Subscriber {
  execute: () => void;
  deps: Set<ReactiveNode>;
  cleanup: () => void;
}

/** Current tracking context */
let activeSubscriber: Subscriber | undefined = undefined;

/** Global version counter for dirty checking */
let globalVersion = 0;

/** Batch update state */
let batchDepth = 0;
let pendingEffects: Set<Subscriber> | undefined = undefined;

/**
 * Track a dependency - called when reading a reactive value
 */
function track(node: ReactiveNode): void {
  if (activeSubscriber) {
    node.subs.add(activeSubscriber);
    activeSubscriber.deps.add(node);
  }
}

/**
 * Trigger updates - called when a reactive value changes
 */
function trigger(node: ReactiveNode): void {
  node.version = ++globalVersion;

  // Copy subscribers to avoid mutation during iteration
  const subs = [...node.subs];

  for (const sub of subs) {
    if (batchDepth > 0) {
      if (!pendingEffects) pendingEffects = new Set();
      pendingEffects.add(sub);
    } else {
      sub.execute();
    }
  }
}

/**
 * Clean up a subscriber's dependencies
 * This is crucial for avoiding stale subscriptions (inspired by SolidJS)
 */
function cleanupSubscriber(sub: Subscriber): void {
  for (const dep of sub.deps) {
    dep.subs.delete(sub);
  }
  sub.deps.clear();
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
    batchDepth--;
    if (batchDepth === 0 && pendingEffects) {
      const effects = pendingEffects;
      pendingEffects = undefined;

      for (const sub of effects) {
        sub.execute();
      }
    }
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
 * @param fn - The effect function to run
 * @returns A dispose function to stop the effect
 */
export function $e(fn: EffectFn): () => void {
  let active = true;

  const subscriber: Subscriber = {
    execute() {
      if (!active) return;

      // Clean up old dependencies before re-running
      // This ensures conditional branches don't leave stale subscriptions
      cleanupSubscriber(subscriber);

      const prevSubscriber = activeSubscriber;
      activeSubscriber = subscriber;
      try {
        fn();
      } finally {
        activeSubscriber = prevSubscriber;
      }
    },
    deps: new Set(),
    cleanup() {
      active = false;
      cleanupSubscriber(subscriber);
    },
  };

  // Run immediately to establish initial dependencies
  subscriber.execute();

  // Return dispose function
  return () => subscriber.cleanup();
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
  T extends readonly [] ? any[] :
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
    version: globalVersion,
    subs: new Set(),
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
 * Uses version-based dirty checking (inspired by Preact Signals)
 */
function createComputed<T>(compute: () => T): Signal<T> {
  const node: ReactiveNode = {
    version: globalVersion,
    subs: new Set(),
  };

  let currentValue: T;
  let lastComputedVersion = -1;

  // Internal subscriber for tracking compute dependencies
  const subscriber: Subscriber = {
    execute() {
      // Mark as dirty - will recompute on next read
      // This is called when any dependency changes
      node.version = ++globalVersion;

      // Propagate to our subscribers
      const subs = [...node.subs];
      for (const sub of subs) {
        if (batchDepth > 0) {
          if (!pendingEffects) pendingEffects = new Set();
          pendingEffects.add(sub);
        } else {
          sub.execute();
        }
      }
    },
    deps: new Set(),
    cleanup() {
      cleanupSubscriber(subscriber);
    },
  };

  const recompute = () => {
    // Clean up old dependencies
    cleanupSubscriber(subscriber);

    const prevSubscriber = activeSubscriber;
    activeSubscriber = subscriber;
    try {
      const newValue = compute();
      if (!Object.is(currentValue, newValue)) {
        currentValue = newValue;
      }
      lastComputedVersion = node.version;
    } finally {
      activeSubscriber = prevSubscriber;
    }
  };

  // Initial computation
  recompute();

  const signal = function (): T {
    // Recompute if dirty (version changed since last compute)
    if (lastComputedVersion !== node.version) {
      recompute();
    }

    // Track this computed as a dependency
    track(node);
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
    if (lastComputedVersion !== node.version) {
      recompute();
    }
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

/**
 * Reactive store type - immutable by default.
 * - By default, all properties are readonly and strictly typed (literals preserved).
 * - Properties specified in `M` (Mutable Keys) become -readonly and Widened (mutable primitives).
 */
export type ReactiveStore<T extends object, M extends keyof T = never> = {
  // Mutable Keys: Remove readonly, Widen type, Recursive Wrap
  -readonly [K in M]: T[K] extends object
  ? T[K] extends Function ? T[K]
  : T[K] extends readonly any[] ? Widen<T[K]>
  : T[K] extends { $raw: any } ? T[K]
  : ReactiveStore<T[K]> // Children inherit immutability by default
  : Widen<T[K]>;
} & {
  // Immutable Keys: Keep readonly, Keep literal type, Recursive Wrap
  readonly [K in Exclude<keyof T, M>]: T[K] extends object
  ? T[K] extends Function ? T[K]
  : T[K] extends readonly any[] ? T[K]
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

  function getOrCreateNode(key: PropertyKey): ReactiveNode {
    let node = nodes.get(key);
    if (!node) {
      node = { version: 0, subs: new Set() };
      nodes.set(key, node);
    }
    return node;
  }

  const proxy = new Proxy(initial, {
    get(target, key, receiver) {
      // Special accessor for raw object
      if (key === RAW || key === "$raw") return target;

      // Mark as reactive proxy
      if (key === REACTIVE_PROXY) return true;

      const node = getOrCreateNode(key);
      track(node);  // Track this property access

      const value = Reflect.get(target, key, receiver);

      // Deep reactivity: wrap nested objects in proxies
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
      const isMutableKey =
        (typeof mutability === "boolean" && mutability) ||
        (mutability instanceof Set && mutability.has(key));

      if (!isMutableKey) return false;

      const oldValue = Reflect.get(target, key, receiver);

      const rawValue = value !== null && typeof value === "object" && RAW in value
        ? value[RAW]
        : value;

      // Special handling for Array loop: 
      // array[index] = val -> updates length silently.
      // array.push -> sets index then sets length.
      // When setting length, it might already be updated on target, so Object.is returns true.
      // We must force trigger for length changes on arrays.
      const isArrayLength = Array.isArray(target) && key === "length";

      if (Object.is(oldValue, rawValue) && !isArrayLength) return true;  // No change

      Reflect.set(target, key, rawValue, receiver);

      // Clear cached proxy for this key if it was an object
      if (oldValue !== null && typeof oldValue === "object") {
        proxyCache.delete(oldValue);
      }

      const node = nodes.get(key);
      if (node) {
        trigger(node);  // Trigger updates for this property
      }

      return true;
    },

    // Handle 'in' operator
    has(target, key) {
      if (key === REACTIVE_PROXY || key === RAW || key === "$raw") return true;
      return Reflect.has(target, key);
    },

    // Handle Object.keys, for...in, etc.
    ownKeys(target) {
      return Reflect.ownKeys(target);
    },

    getOwnPropertyDescriptor(target, key) {
      return Reflect.getOwnPropertyDescriptor(target, key);
    },

    // Handle delete
    deleteProperty(target, key) {
      // Enforce immutability
      const isMutableKey =
        (typeof mutability === "boolean" && mutability) ||
        (mutability instanceof Set && mutability.has(key));

      if (!isMutableKey) return false;

      const hadKey = Reflect.has(target, key);
      const result = Reflect.deleteProperty(target, key);

      if (hadKey && result) {
        const node = nodes.get(key);
        if (node) trigger(node);
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
// Overload 3: Object (Immutable by default, or with mutable keys)
export function $<const T extends Record<string, unknown>, M extends keyof T>(initial: T, ...mutable: M[]): ReactiveStore<T, M>;
// Overload 4: Immutable Primitives (Default)
export function $<const T extends string | number | boolean | null | undefined>(initial: T): Signal<Widen<T>>;
// Overload 5: Arrays
export function $<const T extends readonly unknown[]>(initial: T): ReactiveStore<T extends readonly (infer U)[] ? U[] : T>;

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

  // Mutable Primitive
  if (isMutableWrapper<T>(initial)) {
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
