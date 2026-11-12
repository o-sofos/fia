/**
 * Fia test harness. Not published (excluded in jsr.json).
 *
 * The preload (src/testing/setup.ts, wired via bunfig.toml) already gives every
 * test a fresh DOM and runtime-idle checks; import from here for fixtures.
 */

export { render, nextFrame, type RenderResult } from "./render";
export { fire } from "./fire";
export { trackLeaks, expectNoLeaks, type LeakTracker, type LeakedNode } from "./leaks";
export { checkProperty, rng, shrinkArray, shrinkInt, type PropertySpec, type Rng } from "./fuzz";
export { resetDom, assertRuntimeIdle } from "./runtime";
