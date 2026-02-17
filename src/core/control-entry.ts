/**
 * @module fia/control
 *
 * Reactive control flow components (Show, Each, Match).
 * Includes minimal dependencies: signals and execution context.
 *
 * @example
 * ```typescript
 * import { $, Show, Each } from "fia/control";
 *
 * const items = $([1, 2, 3]);
 * const isVisible = $(true);
 *
 * Show(() => isVisible.value, () => {
 *   Each(() => items.value, (item) => {
 *     console.log(item);
 *   });
 * });
 * ```
 */

// =============================================================================
// REACTIVITY
// =============================================================================

export { $, signal, $e, batch, Mut } from "./reactivity/reactivity";
export type { Signal, WritableSignal, Mutable } from "./reactivity/reactivity";

// =============================================================================
// CONTROL FLOW
// =============================================================================

export { Show, Each, Match } from "./control/control";

// =============================================================================
// CONTEXT (needed by control flow)
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
