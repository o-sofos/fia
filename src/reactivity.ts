type Effect = () => void;
const trackingStack: Effect[] = [];

export interface Signal<T> {
  (): T;
  set(value: T): void;
}
export type Reactive<T> = T | Getter<T>;
export type Getter<T> = () => T;

export interface Signal<T> extends Getter<T> {
  set(value: T): void;
}

/**
 * Gets the currently running effect, if any.
 */
function getActiveEffect(): Effect | undefined {
  return trackingStack[trackingStack.length - 1];
}

/**
 * Creates a reactive signal that holds a value.
 *
 * Signals are the foundation of reactivity in Flick.
 * When a signal's value is updated via `.set()`, it will
 * automatically trigger any effects or UI bindings that read it.
 *
 * @param initialValue The starting value for the signal.
 * @returns A function that acts as a getter when called (`mySignal()`),
 * and has a `.set(newValue)` method for updates.
 *
 * @example
 * ```typescript
 * const count = signal(0);
 *
 * // Read the value
 * console.log(count()); // 0
 *
 * // Set the value
 * count.set(1);
 * console.log(count()); // 1
 * ```
 */
export function signal<T>(initialValue: T): Signal<T> {
  let value = initialValue;
  const subscribers = new Set<Effect>();

  const getter: Getter<T> = (): T => {
    // ... (same implementation)
    const activeEffect = getActiveEffect();
    if (activeEffect) {
      subscribers.add(activeEffect);
    }
    return value;
  };

  const setter = (newValue: T) => {
    if (newValue !== value) {
      value = newValue;
      new Set(subscribers).forEach((eff) => eff());
    }
  };

  return Object.assign(getter, { set: setter });
}

/**
 * Creates a new effect.
 *
 * An effect runs the given function immediately, and re-runs it
 * automatically whenever a signal it reads is updated.
 *
 * This is the core mechanism for binding state to the DOM,
 * but is rarely needed by users, as `.text()`, `.style()`,
 * and `.attr()` use it internally.
 *
 * @param fn The function to run as an effect.
 */
export function effect(fn: Effect): void {
  const effectFn = () => {
    trackingStack.push(effectFn);
    try {
      fn();
    } finally {
      trackingStack.pop();
    }
  };
  effectFn();
}
