/**
 * @module fia/elements
 *
 * HTML element factories with reactive props.
 * Includes minimal dependencies: signals, context, and mount.
 *
 * @example
 * ```typescript
 * import { $, div, button, p } from "fia/elements";
 *
 * const count = $(0);
 *
 * div({ class: "app" }, () => {
 *   p("Count: ", count);
 *   button("Increment", { onclick: () => count.value++ });
 * });
 * ```
 */

// =============================================================================
// REACTIVITY
// =============================================================================

export { $, signal, $e, batch, Mut } from "./reactivity/reactivity";
export type { Signal, WritableSignal, Mutable } from "./reactivity/reactivity";

// =============================================================================
// HTML ELEMENTS
// =============================================================================

export * from "./elements/elements";
export * from "./mount";

// =============================================================================
// CONTEXT (needed by elements)
// =============================================================================

export {
  pushExecutionContext as pushContext,
  popExecutionContext as popContext,
  getCurrentExecutionContext as getCurrentContext,
  hasExecutionContext as hasContext,
  debugContext,
  fragment,
  type ExecutionContext as Context,
} from "./context/context";

// =============================================================================
// TYPE UTILITIES
// =============================================================================

export type {
  MaybeSignal,
  Child,
  ElementProps,
  ElementFactory,
  VoidElementFactory,
} from "./elements/elements";
