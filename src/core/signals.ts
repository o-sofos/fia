/**
 * @module fia/signals
 *
 * Core reactivity system - signals, computed, and effects.
 * The minimal entry point for signal-based reactivity without DOM.
 *
 * @example
 * ```typescript
 * import { $, $e, batch } from "fia/signals";
 *
 * const count = $(0);
 * const double = $(() => count.value * 2);
 *
 * $e(() => {
 *   console.log("Count:", count.value);
 * });
 * ```
 */

export { $, signal, $e, batch, Mut } from "./reactivity/reactivity";
export type { Signal, WritableSignal, Mutable } from "./reactivity/reactivity";
