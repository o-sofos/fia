/**
 * Flick Reactivity System
 *
 * Creates reactive values with automatic dependency tracking.
 * Use $() for both signals and computed values.
 */

/** Effect function type */
type Effect = () => void;

/** Tracking stack for dependency collection */
const trackingStack: Effect[] = [];

/** Currently running effects that need re-execution */
let pendingEffects: Set<Effect> | null = null;
let isBatching = false;

/**
 * Get the currently tracking effect (if any)
 */
function getActiveEffect(): Effect | undefined {
  return trackingStack[trackingStack.length - 1];
}

/**
 * Run effects, batching them to avoid duplicate runs
 */
function scheduleEffects(effects: Set<Effect>): void {
  if (isBatching) {
    // Add to pending batch
    for (const effect of effects) {
      pendingEffects!.add(effect);
    }
    return;
  }

  // Execute immediately
  for (const effect of effects) {
    effect();
  }
}

/**
 * Batch multiple signal updates to run effects only once
 */
export function batch(fn: () => void): void {
  if (isBatching) {
    fn();
    return;
  }

  isBatching = true;
  pendingEffects = new Set();

  try {
    fn();
  } finally {
    isBatching = false;
    const effects = pendingEffects;
    pendingEffects = null;

    for (const effect of effects) {
      effect();
    }
  }
}

/**
 * Create a reactive effect that re-runs when dependencies change
 */
export function effect(fn: Effect): () => void {
  const effectFn = () => {
    trackingStack.push(effectFn);
    try {
      fn();
    } finally {
      trackingStack.pop();
    }
  };

  effectFn();

  // Return cleanup function
  return () => {
    // Effects clean themselves up when their signals are garbage collected
  };
}

/**
 * Signal interface - reactive value with .value getter/setter
 */
export interface Signal<T> {
  /** Get the current value */
  readonly value: T;
}

export interface WritableSignal<T> extends Signal<T> {
  /** Set a new value */
  value: T;
}

/**
 * Create a reactive signal or computed value
 *
 * @example
 * ```typescript
 * // Writable signal
 * const count = $(0);
 * count.value = 5;
 *
 * // Computed (read-only)
 * const doubled = $(() => count.value * 2);
 * console.log(doubled.value); // 10
 * ```
 */
export function $<T>(initialOrCompute: T | (() => T)): typeof initialOrCompute extends () => T ? Signal<T> : WritableSignal<T>;
export function $<T>(initialOrCompute: T | (() => T)): Signal<T> | WritableSignal<T> {
  // Check if it's a computed (function that returns a value)
  if (typeof initialOrCompute === "function") {
    return createComputed(initialOrCompute as () => T);
  }

  return createSignal(initialOrCompute);
}

/**
 * Create a writable signal
 */
function createSignal<T>(initialValue: T): WritableSignal<T> {
  let value = initialValue;
  const subscribers = new Set<Effect>();

  return {
    get value(): T {
      const activeEffect = getActiveEffect();
      if (activeEffect) {
        subscribers.add(activeEffect);
      }
      return value;
    },

    set value(newValue: T) {
      if (Object.is(value, newValue)) {
        return;
      }
      value = newValue;
      scheduleEffects(new Set(subscribers));
    },
  };
}

/**
 * Create a read-only computed signal
 */
function createComputed<T>(compute: () => T): Signal<T> {
  let cachedValue: T;
  let isDirty = true;
  const subscribers = new Set<Effect>();

  // Effect to track dependencies and mark dirty
  const updateEffect = () => {
    trackingStack.push(updateEffect);
    try {
      cachedValue = compute();
      isDirty = false;
    } finally {
      trackingStack.pop();
    }
    // Notify our subscribers
    scheduleEffects(new Set(subscribers));
  };

  // Run once to establish initial value and dependencies
  updateEffect();

  return {
    get value(): T {
      const activeEffect = getActiveEffect();
      if (activeEffect) {
        subscribers.add(activeEffect);
      }

      if (isDirty) {
        trackingStack.push(updateEffect);
        try {
          cachedValue = compute();
          isDirty = false;
        } finally {
          trackingStack.pop();
        }
      }

      return cachedValue;
    },
  };
}

// Alias for API compatibility with README examples
export { $ as signal };
