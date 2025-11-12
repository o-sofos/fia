import { describe, it, expect, vi } from "vitest";
import { signal, effect } from "./reactivity";

describe("Reactivity Core", () => {
  it("should create a signal and get its value", () => {
    const count = signal(0);
    expect(count()).toBe(0);
  });

  it("should set a signal and get the new value", () => {
    const name = signal("Flick");
    name.set("New Flick");
    expect(name()).toBe("New Flick");
  });

  it("should run an effect function immediately", () => {
    const effectFn = vi.fn();
    effect(effectFn);
    expect(effectFn).toHaveBeenCalledTimes(1);
  });

  it("should trigger an effect when a dependency changes", () => {
    //  Setup
    const count = signal(0);
    let effectOutput = 0;

    // A "spy" function to watch the effect
    const effectFn = vi.fn(() => {
      effectOutput = count();
    });

    // Run the effect for the first time
    effect(effectFn);

    // Assert initial state
    expect(effectFn).toHaveBeenCalledTimes(1);
    expect(effectOutput).toBe(0);

    // Change the signal's value
    count.set(5);

    // check that the effect should run again
    expect(effectFn).toHaveBeenCalledTimes(2);
    expect(effectOutput).toBe(5);
  });

  it("should not re-run an effect if the value is set to the same value", () => {
    const count = signal(0);
    const effectFn = vi.fn(() => count());

    // Run the effect (call 1)
    effect(effectFn);

    // Set the same value
    count.set(0);

    // Should NOT run again
    expect(effectFn).toHaveBeenCalledTimes(1);

    // Set a new value
    count.set(1);

    // Should run again (call 2)
    expect(effectFn).toHaveBeenCalledTimes(2);
  });

  it("should trigger an effect when a computed getter (implicit memo) changes", () => {
    // 1. Arrange
    const count = signal(0);
    const double = () => count() * 2; // This is our "implicit memo"
    let output = 0;

    const effectFn = vi.fn(() => {
      output = double();
    });

    // Run the effect
    effect(effectFn);

    // check Initial state is correct
    expect(effectFn).toHaveBeenCalledTimes(1);
    expect(output).toBe(0);

    // Update the root signal
    count.set(5);

    // check that the effect re-ran and got the new computed value
    expect(effectFn).toHaveBeenCalledTimes(2);
    expect(output).toBe(10);
  });
});
