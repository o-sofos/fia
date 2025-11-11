// --- 1. Reactivity ---
// This is the core state management
export { signal } from "./reactivity";

// --- 2. Element Factories ---
// Export all functions from the element modules
export * from "./html";

// --- 3. Style & Attribute Helpers ---
// Export all functions from the helper modules
export * from "./html.props";
export * from "./accessibility";

// --- 4. Core Classes (for advanced use & type-checking) ---
// Developers might need these to check 'instanceof' or for types
export { FlickElement, FlickSvgElement } from "./core";

// NOTE: We do NOT export src/main.ts or src/worker-api.ts.
// Those are the *runtime* and are not part of the
// app-building API.
