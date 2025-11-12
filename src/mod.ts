// === @flick/core/src/mod.ts ===

// --- 1. Reactivity Primitives (The State Model) ---
// Exports the core functions for state and side effects.
export { signal, effect } from "./reactivity";

// --- 2. Core Element Classes (The Base Objects) ---
// Exports the classes that all other element factories extend.
export { FlickElement, FlickSvgElement } from "./core";
