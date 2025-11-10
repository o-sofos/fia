type Effect = () => void;
const trackingStack: Effect[] = [];

export interface Signal<T> {
  (): T;
  set(value: T): void;
}

export function signal<T>(initialValue: T): Signal<T> {
  let value = initialValue;
  const subscribers = new Set<Effect>();

  const getter = (): T => {
    if (trackingStack.length > 0)
      subscribers.add(trackingStack[trackingStack.length - 1]);
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
