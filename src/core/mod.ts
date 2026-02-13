/**
 * @module @fia/core
 *
 * Fia - A 2KB framework for building reactive UIs with signals and plain functions.
 *
 * @example
 * ```typescript
 * import { $, div, h1, button, p } from "@fia/core";
 *
 * const count = $(0);
 *
 * div({ class: "app" }, () => {
 *   h1("Counter App");
 *   p("Count: ", count);
 *   button("Increment", { onclick: () => count.value++ });
 * });
 * ```
 */

// =============================================================================
// REACTIVITY
// =============================================================================

export { $, signal, $e, batch } from "./reactivity/reactivity";
export type { Signal, WritableSignal } from "./reactivity/reactivity";

// =============================================================================
// CONTROL FLOW
// =============================================================================

export { Show, Each, Match } from "./control/control";

// =============================================================================
// HTML ELEMENTS
// =============================================================================

export * from "./elements/elements";
export * from "./mount";

// =============================================================================
// SVG ELEMENTS
// =============================================================================

// SVG elements are in a separate namespace to avoid conflicts with HTML elements
// Import as: import { svg } from "@fia/core/svg";
// Or: import * as SVG from "@fia/core/svg";

// Re-export commonly used SVG elements with svg prefix for convenience
export {
  svg,
  g as svgG,
  defs as svgDefs,
  symbol as svgSymbol,
  use as svgUse,
  image as svgImage,
  foreignObject as svgForeignObject,
  rect as svgRect,
  circle as svgCircle,
  ellipse as svgEllipse,
  line as svgLine,
  polyline as svgPolyline,
  polygon as svgPolygon,
  path as svgPath,
  text as svgText,
  tspan as svgTspan,
  textPath as svgTextPath,
  linearGradient as svgLinearGradient,
  radialGradient as svgRadialGradient,
  stop as svgStop,
  pattern as svgPattern,
  clipPath as svgClipPath,
  svgMask,
  marker as svgMarker,
  svgFilter,
  feGaussianBlur as svgFeGaussianBlur,
  feDropShadow as svgFeDropShadow,
  feBlend as svgFeBlend,
  feColorMatrix as svgFeColorMatrix,
  feOffset as svgFeOffset,
  feMerge as svgFeMerge,
  feMergeNode as svgFeMergeNode,
  animate as svgAnimate,
  animateMotion as svgAnimateMotion,
  animateTransform as svgAnimateTransform,
  desc as svgDesc,
  svgTitle,
  metadata as svgMetadata,
} from "./svg/svg";

// =============================================================================
// CONTEXT
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
