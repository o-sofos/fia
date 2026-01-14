/**
 * Flick Reactivity System - Performance Optimized
 * 
 * Key optimizations:
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
 * effect(() => {
 *   console.log("Count is:", count.value);
 * });
 * ```
 * 
 * @param fn - The effect function to run
 * @returns A dispose function to stop the effect
 */
export function effect(fn: EffectFn): () => void {
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
export interface Signal<T> {
  (): T;
  readonly value: T;
  peek(): T;
}

export interface WritableSignal<T> extends Signal<T> {
  (newValue: T): void;
  value: T;
}

/**
 * Create a writable signal
 */
function createSignal<T>(initial: T): WritableSignal<T> {
  const node: ReactiveNode = {
    version: globalVersion,
    subs: new Set(),
  };

  let currentValue = initial;

  const signal = function (newValue?: T): T | void {
    // Write path
    if (arguments.length > 0) {
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
      if (!Object.is(currentValue, newValue)) {
        currentValue = newValue;
        trigger(node);
      }
    },
  });

  // Peek: read without tracking (inspired by SolidJS)
  signal.peek = () => currentValue;

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

  // Peek without tracking
  signal.peek = () => {
    if (lastComputedVersion !== node.version) {
      recompute();
    }
    return currentValue;
  };

  return signal;
}

/**
 * Create a signal or computed value.
 * 
 * **Signal (State):**
 * ```ts
 * const count = $(0);
 * count.value++;
 * ```
 * 
 * **Computed (Derived State):**
 * ```ts
 * const double = $(() => count.value * 2);
 * ```
 * 
 * @param initial - The initial value or a computation function
 * @returns A writable Signal for values, or a readonly Signal for functions
 */
export function $<const T>(initial: T): [T] extends [() => infer R] ? Signal<R> : WritableSignal<T>;
export function $<T>(initial: T): Signal<T> | WritableSignal<T> {
  return typeof initial === "function"
    ? createComputed(initial as () => T)
    : createSignal(initial);
}

// Named export for API compatibility
export { $ as signal };