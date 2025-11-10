// === src/svg-attributes.ts (NEW FILE) ===
import type { Reactive } from "./reactivity";

/**
 * The plain object that our SVG attribute functions return.
 */
export type AttributeRule = {
  name: string;
  value: Reactive<string | number>;
};

// Helper function
const a =
  (name: string) =>
  (value: Reactive<string | number>): AttributeRule => ({
    name,
    value,
  });

// --- Geometry & Positioning ---
export const x = a("x");
export const y = a("y");
export const cx = a("cx");
export const cy = a("cy");
export const r = a("r");
export const rx = a("rx");
export const ry = a("ry");
export const width = a("width");
export const height = a("height");
export const x1 = a("x1");
export const y1 = a("y1");
export const x2 = a("x2");
export const y2 = a("y2");

// --- Path Data ---
export const d = a("d");

// --- Presentation (Fill & Stroke) ---
export const fill = a("fill");
export const fillRule = a("fill-rule");
export const fillOpacity = a("fill-opacity");
export const stroke = a("stroke");
export const strokeWidth = a("stroke-width");
export const strokeOpacity = a("stroke-opacity");
export const strokeLinecap = a("stroke-linecap");
export const strokeLinejoin = a("stroke-linejoin");
export const strokeDasharray = a("stroke-dasharray");
export const strokeDashoffset = a("stroke-dashoffset");

// --- Text ---
export const textAnchor = a("text-anchor");
export const dominantBaseline = a("dominant-baseline");
export const fontSize = a("font-size");
export const fontFamily = a("font-family");
export const fontWeight = a("font-weight");
export const textDecoration = a("text-decoration");

// --- Other ---
export const transform = a("transform");
export const viewBox = a("viewBox");
export const preserveAspectRatio = a("preserveAspectRatio");
export const opacity = a("opacity");
export const clipPath = a("clip-path");
export const mask = a("mask");
export const filter = a("filter");

// ... many more can be added, but this is the core set.
