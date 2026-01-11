/**
 * @module @flick/core
 *
 * Flick - A 2KB framework for building reactive UIs with signals and plain functions.
 *
 * @example
 * ```typescript
 * import { $, div, h1, button, p } from "@flick/core";
 *
 * const count = $(0);
 *
 * div(() => {
 *   h1("Counter App");
 *   p("Count: ", count);
 *   button({ onclick: () => count.value++ }, "Increment");
 * });
 * ```
 */

// Reactivity primitives
export { $, effect, batch } from "./reactivity";
export { $ as signal } from "./reactivity";
export type { Signal, WritableSignal } from "./reactivity";

// Element factories
export * from "./elements";
