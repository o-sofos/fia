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
