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
type Effect = () => void;

/** Tracking context */
let currentEffect: Effect | undefined = undefined;

/** Batch update state */
let batchDepth = 0;
let batchedEffects: Effect[] | undefined = undefined;

/**
 * Batch multiple signal updates
 */
export function batch(fn: () => void): void {
  batchDepth++;
  try {
    fn();
  } finally {
    batchDepth--;
    if (batchDepth === 0 && batchedEffects) {
      const effects = batchedEffects;
      batchedEffects = undefined;

      // Run effects, avoiding duplicates
      const seen = new Set<Effect>();
      for (let i = 0; i < effects.length; i++) {
        const effect = effects[i];
        if (!seen.has(effect)) {
          seen.add(effect);
          effect();
        }
      }
    }
  }
}

/**
 * Schedule effect execution
 */
function scheduleEffect(effect: Effect): void {
  if (batchDepth > 0) {
    // Batch mode: collect effects
    if (!batchedEffects) batchedEffects = [];
    batchedEffects.push(effect);
  } else {
    // Immediate execution
    effect();
  }
}

/**
 * Create a reactive effect
 */
export function effect(fn: Effect): () => void {
  const run = () => {
    const prevEffect = currentEffect;
    currentEffect = run;
    try {
      fn();
    } finally {
      currentEffect = prevEffect;
    }
  };

  run();
  return () => {
    // Cleanup handled by GC
  };
}

/**
 * Signal type - optimized for both function calls and property access
 */
export interface Signal<T> {
  (): T;
  value: T;
  valueOf(): T;
}

export interface WritableSignal<T> extends Signal<T> {
  (newValue?: T): T | void;
  value: T;
}

/**
 * Internal signal node - pure data structure for performance
 */
interface SignalNode<T> {
  value: T;
  subs: Effect[] | null; // Use array for better cache locality
}

/**
 * Create signal - optimized version
 */
function createSignal<T>(initial: T): WritableSignal<T> {
  // Use plain object for data - better for V8 optimization
  const node: SignalNode<T> = {
    value: initial,
    subs: null
  };

  // Main function - hot path must be fast
  const read = function (newValue?: T): T | void {
    // WRITE PATH (less common)
    if (arguments.length > 0) {
      // Early exit if value hasn't changed
      if (Object.is(node.value, newValue)) return;

      node.value = newValue!;

      // Notify subscribers if any exist
      const subs = node.subs;
      if (subs) {
        // Inline notification for small arrays (common case)
        if (subs.length === 1) {
          scheduleEffect(subs[0]);
        } else if (subs.length === 2) {
          scheduleEffect(subs[0]);
          scheduleEffect(subs[1]);
        } else {
          // General case
          for (let i = 0; i < subs.length; i++) {
            scheduleEffect(subs[i]);
          }
        }
      }
      return;
    }

    // READ PATH (hot path - most common)
    // Track dependency if we're in an effect
    if (currentEffect) {
      if (!node.subs) {
        // First subscriber - allocate array
        node.subs = [currentEffect];
      } else if (node.subs.indexOf(currentEffect) === -1) {
        // Add new subscriber
        node.subs.push(currentEffect);
      }
    }

    return node.value;
  } as WritableSignal<T>;

  // Define .value property - lazy getter/setter
  Object.defineProperty(read, 'value', {
    get() {
      // Same as read() - track dependency
      if (currentEffect && node.subs) {
        if (node.subs.indexOf(currentEffect) === -1) {
          node.subs.push(currentEffect);
        }
      } else if (currentEffect) {
        node.subs = [currentEffect];
      }
      return node.value;
    },
    set(newValue: T) {
      // Same as read(newValue)
      if (Object.is(node.value, newValue)) return;
      node.value = newValue;

      const subs = node.subs;
      if (subs) {
        for (let i = 0; i < subs.length; i++) {
          scheduleEffect(subs[i]);
        }
      }
    }
  });

  // valueOf for auto-unwrapping - inline for performance
  read.valueOf = function () {
    if (currentEffect && node.subs) {
      if (node.subs.indexOf(currentEffect) === -1) {
        node.subs.push(currentEffect);
      }
    } else if (currentEffect) {
      node.subs = [currentEffect];
    }
    return node.value;
  };

  return read;
}

/**
 * Create computed signal - optimized version
 */
function createComputed<T>(compute: () => T): Signal<T> {
  const node: SignalNode<T> = {
    value: undefined as T,
    subs: null
  };

  let dirty = true;

  const update = () => {
    const prevEffect = currentEffect;
    currentEffect = update;
    try {
      const newValue = compute();
      if (!Object.is(node.value, newValue)) {
        node.value = newValue;

        // Notify subscribers
        const subs = node.subs;
        if (subs) {
          for (let i = 0; i < subs.length; i++) {
            scheduleEffect(subs[i]);
          }
        }
      }
      dirty = false;
    } finally {
      currentEffect = prevEffect;
    }
  };

  // Initial computation
  update();

  const read = function (): T {
    // Re-compute if dirty
    if (dirty) {
      update();
    }

    // Track dependency
    if (currentEffect) {
      if (!node.subs) {
        node.subs = [currentEffect];
      } else if (node.subs.indexOf(currentEffect) === -1) {
        node.subs.push(currentEffect);
      }
    }

    return node.value;
  } as Signal<T>;

  Object.defineProperty(read, 'value', {
    get() {
      return read();
    }
  });

  read.valueOf = function () {
    return read();
  };

  return read;
}

/**
 * Main $ function - optimized dispatch
 */
export function $<T>(
  initialOrCompute: T | (() => T)
): typeof initialOrCompute extends () => T ? Signal<T> : WritableSignal<T> {
  return typeof initialOrCompute === "function"
    ? createComputed(initialOrCompute as () => T)
    : createSignal(initialOrCompute);
}

// Alias for API compatibility
export { $ as signal };