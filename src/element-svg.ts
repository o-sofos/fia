import { FlickSvgElement } from "./core";

// --- The <svg> root element ---
export const svg = () => new FlickSvgElement("svg");

// --- Shapes ---
export const path = () => new FlickSvgElement("path");
export const rect = () => new FlickSvgElement("rect");
export const circle = () => new FlickSvgElement("circle");
export const ellipse = () => new FlickSvgElement("ellipse");
export const line = () => new FlickSvgElement("line");
export const polyline = () => new FlickSvgElement("polyline");
export const polygon = () => new FlickSvgElement("polygon");

// --- Structural & Grouping ---
export const g = () => new FlickSvgElement("g");
export const defs = () => new FlickSvgElement("defs");
export const symbol = () => new FlickSvgElement("symbol");
export const use = () => new FlickSvgElement("use");

// --- Text Content ---
export const text = () => new FlickSvgElement("text");
export const tspan = () => new FlickSvgElement("tspan");
export const textPath = () => new FlickSvgElement("textPath");

// --- Gradients & Fills ---
export const linearGradient = () => new FlickSvgElement("linearGradient");
export const radialGradient = () => new FlickSvgElement("radialGradient");
export const stop = () => new FlickSvgElement("stop");
export const pattern = () => new FlickSvgElement("pattern");

// --- Clipping, Masking & Filters ---
export const clipPath = () => new FlickSvgElement("clipPath");
export const mask = () => new FlickSvgElement("mask");
export const filter = () => new FlickSvgElement("filter");
export const feBlend = () => new FlickSvgElement("feBlend");
export const feColorMatrix = () => new FlickSvgElement("feColorMatrix");
export const feComponentTransfer = () =>
  new FlickSvgElement("feComponentTransfer");
export const feComposite = () => new FlickSvgElement("feComposite");
export const feConvolveMatrix = () => new FlickSvgElement("feConvolveMatrix");
export const feDiffuseLighting = () => new FlickSvgElement("feDiffuseLighting");
export const feDisplacementMap = () => new FlickSvgElement("feDisplacementMap");
export const feDistantLight = () => new FlickSvgElement("feDistantLight");
export const feDropShadow = () => new FlickSvgElement("feDropShadow");
export const feFlood = () => new FlickSvgElement("feFlood");
export const feFuncA = () => new FlickSvgElement("feFuncA");
export const feFuncB = () => new FlickSvgElement("feFuncB");
export const feFuncG = () => new FlickSvgElement("feFuncG");
export const feFuncR = () => new FlickSvgElement("feFuncR");
export const feGaussianBlur = () => new FlickSvgElement("feGaussianBlur");
export const feImage = () => new FlickSvgElement("feImage");
export const feMerge = () => new FlickSvgElement("feMerge");
export const feMergeNode = () => new FlickSvgElement("feMergeNode");
export const feMorphology = () => new FlickSvgElement("feMorphology");
export const feOffset = () => new FlickSvgElement("feOffset");
export const fePointLight = () => new FlickSvgElement("fePointLight");
export const feSpecularLighting = () =>
  new FlickSvgElement("feSpecularLighting");
export const feSpotLight = () => new FlickSvgElement("feSpotLight");
export const feTile = () => new FlickSvgElement("feTile");
export const feTurbulence = () => new FlickSvgElement("feTurbulence");

// --- Other ---
export const marker = () => new FlickSvgElement("marker");
export const foreignObject = () => new FlickSvgElement("foreignObject");
export const metadata = () => new FlickSvgElement("metadata");
export const view = () => new FlickSvgElement("view");
export const title = () => new FlickSvgElement("title"); // SVG title
export const desc = () => new FlickSvgElement("desc"); // SVG description

// --- Animation (SMIL) ---
export const animate = () => new FlickSvgElement("animate");
export const animateMotion = () => new FlickSvgElement("animateMotion");
export const animateTransform = () => new FlickSvgElement("animateTransform");
export const set = () => new FlickSvgElement("set");
export const mpath = () => new FlickSvgElement("mpath");
