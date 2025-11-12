type Effect = () => void;
const trackingStack: Effect[] = [];

function getActiveEffect(): Effect | undefined {
  return trackingStack[trackingStack.length - 1];
}

export type Getter<T> = () => T;
export type Reactive<T> = T | Getter<T>;

export interface Signal<T> extends Getter<T> {
  set(value: T): void;
}

/** Creates a reactive signal that holds a value. */
export function signal<T>(initialValue: T): Signal<T> {
  let value = initialValue;
  const subscribers = new Set<Effect>();

  const getter: Getter<T> = (): T => {
    const activeEffect = getActiveEffect();
    if (activeEffect) {
      subscribers.add(activeEffect);
    }
    return value;
  };

  const setter = (newValue: T) => {
    if (newValue === value) {
      return;
    }
    value = newValue;
    new Set(subscribers).forEach((effect) => effect());
  };

  return Object.assign(getter, { set: setter });
}

/** Creates a new effect (the basis for implicit memoization). */
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
