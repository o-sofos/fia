/**
 * Flick SVG Elements
 *
 * Factory functions for SVG elements with full TypeScript support.
 * SVG elements require a different namespace than HTML elements.
 */

import { getCurrentContext, pushContext, popContext, type Context } from "./context";
import { effect, type Signal } from "./reactivity";

// =============================================================================
// SVG TYPE UTILITIES
// =============================================================================

type MaybeSignal<T> = T | Signal<T>;

function isSignal(value: unknown): value is Signal<unknown> {
    if (value === null || value === undefined) return false;
    if (typeof value !== "function") return false;
    const descriptor = Object.getOwnPropertyDescriptor(value, "value");
    return descriptor !== undefined && descriptor.get !== undefined;
}

// =============================================================================
// SVG PRESENTATION ATTRIBUTES
// =============================================================================

type SVGColor = "currentColor" | "inherit" | "none" | "transparent" | (string & {});

type SVGPaint = SVGColor | `url(#${string})`;

type StrokeLinecap = "butt" | "round" | "square" | "inherit";

type StrokeLinejoin = "miter" | "round" | "bevel" | "inherit";

type FillRule = "nonzero" | "evenodd" | "inherit";

type ClipRule = FillRule;

type TextAnchor = "start" | "middle" | "end" | "inherit";

type DominantBaseline =
    | "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle"
    | "central" | "mathematical" | "hanging" | "text-top" | "inherit";

type FontStyle = "normal" | "italic" | "oblique" | "inherit";

type FontWeight =
    | "normal" | "bold" | "bolder" | "lighter"
    | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
    | "inherit";

type Visibility = "visible" | "hidden" | "collapse" | "inherit";

type Display = "inline" | "block" | "none" | "inherit";

type Overflow = "visible" | "hidden" | "scroll" | "auto" | "inherit";

type PointerEvents =
    | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible"
    | "painted" | "fill" | "stroke" | "all" | "none" | "inherit";

type ShapeRendering = "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision" | "inherit";

type TextRendering = "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision" | "inherit";

type ImageRendering = "auto" | "optimizeSpeed" | "optimizeQuality" | "inherit";

type ColorInterpolation = "auto" | "sRGB" | "linearRGB" | "inherit";

type VectorEffect = "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";

/**
 * Common presentation attributes for SVG elements
 */
interface SVGPresentationAttributes {
    // Fill & Stroke
    fill?: MaybeSignal<SVGPaint>;
    fillOpacity?: MaybeSignal<number | string>;
    fillRule?: MaybeSignal<FillRule>;
    stroke?: MaybeSignal<SVGPaint>;
    strokeOpacity?: MaybeSignal<number | string>;
    strokeWidth?: MaybeSignal<number | string>;
    strokeLinecap?: MaybeSignal<StrokeLinecap>;
    strokeLinejoin?: MaybeSignal<StrokeLinejoin>;
    strokeDasharray?: MaybeSignal<string>;
    strokeDashoffset?: MaybeSignal<number | string>;
    strokeMiterlimit?: MaybeSignal<number | string>;

    // Opacity & Visibility
    opacity?: MaybeSignal<number | string>;
    visibility?: MaybeSignal<Visibility>;
    display?: MaybeSignal<Display>;

    // Clipping & Masking
    clipPath?: MaybeSignal<string>;
    clipRule?: MaybeSignal<ClipRule>;
    mask?: MaybeSignal<string>;

    // Filters & Effects
    filter?: MaybeSignal<string>;

    // Color interpolation (for filters/gradients)
    colorInterpolation?: MaybeSignal<ColorInterpolation>;
    colorInterpolationFilters?: MaybeSignal<ColorInterpolation>;

    // Text
    fontFamily?: MaybeSignal<string>;
    fontSize?: MaybeSignal<number | string>;
    fontStyle?: MaybeSignal<FontStyle>;
    fontWeight?: MaybeSignal<FontWeight>;
    fontVariant?: MaybeSignal<string>;
    fontStretch?: MaybeSignal<string>;
    textAnchor?: MaybeSignal<TextAnchor>;
    dominantBaseline?: MaybeSignal<DominantBaseline>;
    letterSpacing?: MaybeSignal<number | string>;
    wordSpacing?: MaybeSignal<number | string>;
    textDecoration?: MaybeSignal<string>;

    // Rendering
    shapeRendering?: MaybeSignal<ShapeRendering>;
    textRendering?: MaybeSignal<TextRendering>;
    imageRendering?: MaybeSignal<ImageRendering>;

    // Interaction
    pointerEvents?: MaybeSignal<PointerEvents>;
    cursor?: MaybeSignal<string>;

    // Transform
    transform?: MaybeSignal<string>;
    transformOrigin?: MaybeSignal<string>;

    // Vector Effect
    vectorEffect?: MaybeSignal<VectorEffect>;

    // Markers
    markerStart?: MaybeSignal<string>;
    markerMid?: MaybeSignal<string>;
    markerEnd?: MaybeSignal<string>;
}

// =============================================================================
// SVG CORE ATTRIBUTES
// =============================================================================

interface SVGCoreAttributes {
    id?: MaybeSignal<string>;
    class?: MaybeSignal<string>;
    style?: MaybeSignal<string>;
    tabindex?: MaybeSignal<number>;
    lang?: MaybeSignal<string>;
    "xml:lang"?: MaybeSignal<string>;
    "xml:space"?: MaybeSignal<"default" | "preserve">;
}

// =============================================================================
// SVG EVENT HANDLERS
// =============================================================================

type SVGEventHandlers = {
    // Mouse events
    onclick?: (event: MouseEvent) => void;
    ondblclick?: (event: MouseEvent) => void;
    onmousedown?: (event: MouseEvent) => void;
    onmouseup?: (event: MouseEvent) => void;
    onmouseover?: (event: MouseEvent) => void;
    onmousemove?: (event: MouseEvent) => void;
    onmouseout?: (event: MouseEvent) => void;
    onmouseenter?: (event: MouseEvent) => void;
    onmouseleave?: (event: MouseEvent) => void;
    oncontextmenu?: (event: MouseEvent) => void;

    // Touch events
    ontouchstart?: (event: TouchEvent) => void;
    ontouchmove?: (event: TouchEvent) => void;
    ontouchend?: (event: TouchEvent) => void;
    ontouchcancel?: (event: TouchEvent) => void;

    // Focus events
    onfocus?: (event: FocusEvent) => void;
    onblur?: (event: FocusEvent) => void;
    onfocusin?: (event: FocusEvent) => void;
    onfocusout?: (event: FocusEvent) => void;

    // Keyboard events
    onkeydown?: (event: KeyboardEvent) => void;
    onkeyup?: (event: KeyboardEvent) => void;
    onkeypress?: (event: KeyboardEvent) => void;

    // Wheel events
    onwheel?: (event: WheelEvent) => void;

    // Animation events
    onanimationstart?: (event: AnimationEvent) => void;
    onanimationend?: (event: AnimationEvent) => void;
    onanimationiteration?: (event: AnimationEvent) => void;

    // Transition events
    ontransitionend?: (event: TransitionEvent) => void;

    // Pointer events
    onpointerdown?: (event: PointerEvent) => void;
    onpointerup?: (event: PointerEvent) => void;
    onpointermove?: (event: PointerEvent) => void;
    onpointerover?: (event: PointerEvent) => void;
    onpointerout?: (event: PointerEvent) => void;
    onpointerenter?: (event: PointerEvent) => void;
    onpointerleave?: (event: PointerEvent) => void;
    onpointercancel?: (event: PointerEvent) => void;

    // Load events
    onload?: (event: Event) => void;
    onerror?: (event: Event) => void;
};

// =============================================================================
// SVG ELEMENT-SPECIFIC ATTRIBUTES
// =============================================================================

type PreserveAspectRatioAlign =
    | "none"
    | "xMinYMin" | "xMidYMin" | "xMaxYMin"
    | "xMinYMid" | "xMidYMid" | "xMaxYMid"
    | "xMinYMax" | "xMidYMax" | "xMaxYMax";

type PreserveAspectRatioMeetOrSlice = "meet" | "slice";

type PreserveAspectRatio =
    | PreserveAspectRatioAlign
    | `${PreserveAspectRatioAlign} ${PreserveAspectRatioMeetOrSlice}`;

type Units = "userSpaceOnUse" | "objectBoundingBox";

type SpreadMethod = "pad" | "reflect" | "repeat";

type LengthAdjust = "spacing" | "spacingAndGlyphs";

// SVG Root Element
interface SVGSvgAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    viewBox?: MaybeSignal<string>;
    preserveAspectRatio?: MaybeSignal<PreserveAspectRatio>;
    xmlns?: string;
    "xmlns:xlink"?: string;
    version?: string;
}

// Basic Shapes
interface SVGRectAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    rx?: MaybeSignal<number | string>;
    ry?: MaybeSignal<number | string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGCircleAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    cx?: MaybeSignal<number | string>;
    cy?: MaybeSignal<number | string>;
    r?: MaybeSignal<number | string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGEllipseAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    cx?: MaybeSignal<number | string>;
    cy?: MaybeSignal<number | string>;
    rx?: MaybeSignal<number | string>;
    ry?: MaybeSignal<number | string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGLineAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    x1?: MaybeSignal<number | string>;
    y1?: MaybeSignal<number | string>;
    x2?: MaybeSignal<number | string>;
    y2?: MaybeSignal<number | string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGPolylineAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    points?: MaybeSignal<string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGPolygonAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    points?: MaybeSignal<string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGPathAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    d?: MaybeSignal<string>;
    pathLength?: MaybeSignal<number>;
}

// Text Elements
interface SVGTextAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    dx?: MaybeSignal<number | string>;
    dy?: MaybeSignal<number | string>;
    rotate?: MaybeSignal<string>;
    lengthAdjust?: MaybeSignal<LengthAdjust>;
    textLength?: MaybeSignal<number | string>;
}

interface SVGTspanAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    dx?: MaybeSignal<number | string>;
    dy?: MaybeSignal<number | string>;
    rotate?: MaybeSignal<string>;
    lengthAdjust?: MaybeSignal<LengthAdjust>;
    textLength?: MaybeSignal<number | string>;
}

interface SVGTextPathAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
    startOffset?: MaybeSignal<number | string>;
    method?: MaybeSignal<"align" | "stretch">;
    spacing?: MaybeSignal<"auto" | "exact">;
    side?: MaybeSignal<"left" | "right">;
    lengthAdjust?: MaybeSignal<LengthAdjust>;
    textLength?: MaybeSignal<number | string>;
}

// Container Elements
interface SVGGAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers { }

interface SVGDefsAttributes extends SVGCoreAttributes, SVGPresentationAttributes { }

interface SVGSymbolAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    viewBox?: MaybeSignal<string>;
    preserveAspectRatio?: MaybeSignal<PreserveAspectRatio>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    refX?: MaybeSignal<number | string>;
    refY?: MaybeSignal<number | string>;
}

interface SVGUseAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGImageAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    preserveAspectRatio?: MaybeSignal<PreserveAspectRatio>;
    crossorigin?: MaybeSignal<"anonymous" | "use-credentials">;
}

interface SVGSwitchAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers { }

interface SVGForeignObjectAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGEventHandlers {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

// Gradient Elements
interface SVGLinearGradientAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    x1?: MaybeSignal<number | string>;
    y1?: MaybeSignal<number | string>;
    x2?: MaybeSignal<number | string>;
    y2?: MaybeSignal<number | string>;
    gradientUnits?: MaybeSignal<Units>;
    gradientTransform?: MaybeSignal<string>;
    spreadMethod?: MaybeSignal<SpreadMethod>;
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
}

interface SVGRadialGradientAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    cx?: MaybeSignal<number | string>;
    cy?: MaybeSignal<number | string>;
    r?: MaybeSignal<number | string>;
    fx?: MaybeSignal<number | string>;
    fy?: MaybeSignal<number | string>;
    fr?: MaybeSignal<number | string>;
    gradientUnits?: MaybeSignal<Units>;
    gradientTransform?: MaybeSignal<string>;
    spreadMethod?: MaybeSignal<SpreadMethod>;
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
}

interface SVGStopAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    offset?: MaybeSignal<number | string>;
    stopColor?: MaybeSignal<SVGColor>;
    stopOpacity?: MaybeSignal<number | string>;
}

// Pattern
interface SVGPatternAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    patternUnits?: MaybeSignal<Units>;
    patternContentUnits?: MaybeSignal<Units>;
    patternTransform?: MaybeSignal<string>;
    viewBox?: MaybeSignal<string>;
    preserveAspectRatio?: MaybeSignal<PreserveAspectRatio>;
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
}

// Clipping & Masking
interface SVGClipPathAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    clipPathUnits?: MaybeSignal<Units>;
}

interface SVGMaskAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    maskUnits?: MaybeSignal<Units>;
    maskContentUnits?: MaybeSignal<Units>;
}

// Marker
interface SVGMarkerAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    viewBox?: MaybeSignal<string>;
    preserveAspectRatio?: MaybeSignal<PreserveAspectRatio>;
    refX?: MaybeSignal<number | string>;
    refY?: MaybeSignal<number | string>;
    markerUnits?: MaybeSignal<"strokeWidth" | "userSpaceOnUse">;
    markerWidth?: MaybeSignal<number | string>;
    markerHeight?: MaybeSignal<number | string>;
    orient?: MaybeSignal<"auto" | "auto-start-reverse" | number | string>;
}

// Filter Elements
type FilterIn = "SourceGraphic" | "SourceAlpha" | "BackgroundImage" | "BackgroundAlpha" | "FillPaint" | "StrokePaint" | string;

interface SVGFilterAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    filterUnits?: MaybeSignal<Units>;
    primitiveUnits?: MaybeSignal<Units>;
}

interface SVGFeBlendAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
    in2?: MaybeSignal<FilterIn>;
    mode?: MaybeSignal<"normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity">;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeColorMatrixAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
    type?: MaybeSignal<"matrix" | "saturate" | "hueRotate" | "luminanceToAlpha">;
    values?: MaybeSignal<string>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeComponentTransferAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeFuncAttributes extends SVGCoreAttributes {
    type?: MaybeSignal<"identity" | "table" | "discrete" | "linear" | "gamma">;
    tableValues?: MaybeSignal<string>;
    slope?: MaybeSignal<number | string>;
    intercept?: MaybeSignal<number | string>;
    amplitude?: MaybeSignal<number | string>;
    exponent?: MaybeSignal<number | string>;
    offset?: MaybeSignal<number | string>;
}

interface SVGFeCompositeAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
    in2?: MaybeSignal<FilterIn>;
    operator?: MaybeSignal<"over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic">;
    k1?: MaybeSignal<number | string>;
    k2?: MaybeSignal<number | string>;
    k3?: MaybeSignal<number | string>;
    k4?: MaybeSignal<number | string>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeConvolveMatrixAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
    order?: MaybeSignal<string>;
    kernelMatrix?: MaybeSignal<string>;
    divisor?: MaybeSignal<number | string>;
    bias?: MaybeSignal<number | string>;
    targetX?: MaybeSignal<number>;
    targetY?: MaybeSignal<number>;
    edgeMode?: MaybeSignal<"duplicate" | "wrap" | "none">;
    preserveAlpha?: MaybeSignal<boolean>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeDiffuseLightingAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    surfaceScale?: MaybeSignal<number | string>;
    diffuseConstant?: MaybeSignal<number | string>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeDisplacementMapAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
    in2?: MaybeSignal<FilterIn>;
    scale?: MaybeSignal<number | string>;
    xChannelSelector?: MaybeSignal<"R" | "G" | "B" | "A">;
    yChannelSelector?: MaybeSignal<"R" | "G" | "B" | "A">;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeDropShadowAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    dx?: MaybeSignal<number | string>;
    dy?: MaybeSignal<number | string>;
    stdDeviation?: MaybeSignal<number | string>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeFloodAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    floodColor?: MaybeSignal<SVGColor>;
    floodOpacity?: MaybeSignal<number | string>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeGaussianBlurAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
    stdDeviation?: MaybeSignal<number | string>;
    edgeMode?: MaybeSignal<"duplicate" | "wrap" | "none">;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeImageAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
    preserveAspectRatio?: MaybeSignal<PreserveAspectRatio>;
    crossorigin?: MaybeSignal<"anonymous" | "use-credentials">;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeMergeAttributes extends SVGCoreAttributes {
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeMergeNodeAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
}

interface SVGFeMorphologyAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
    operator?: MaybeSignal<"erode" | "dilate">;
    radius?: MaybeSignal<number | string>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeOffsetAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
    dx?: MaybeSignal<number | string>;
    dy?: MaybeSignal<number | string>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeSpecularLightingAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    surfaceScale?: MaybeSignal<number | string>;
    specularConstant?: MaybeSignal<number | string>;
    specularExponent?: MaybeSignal<number | string>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeTileAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGFeTurbulenceAttributes extends SVGCoreAttributes {
    baseFrequency?: MaybeSignal<number | string>;
    numOctaves?: MaybeSignal<number>;
    seed?: MaybeSignal<number>;
    stitchTiles?: MaybeSignal<"stitch" | "noStitch">;
    type?: MaybeSignal<"fractalNoise" | "turbulence">;
    result?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

// Light source elements
interface SVGFeDistantLightAttributes extends SVGCoreAttributes {
    azimuth?: MaybeSignal<number | string>;
    elevation?: MaybeSignal<number | string>;
}

interface SVGFePointLightAttributes extends SVGCoreAttributes {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    z?: MaybeSignal<number | string>;
}

interface SVGFeSpotLightAttributes extends SVGCoreAttributes {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    z?: MaybeSignal<number | string>;
    pointsAtX?: MaybeSignal<number | string>;
    pointsAtY?: MaybeSignal<number | string>;
    pointsAtZ?: MaybeSignal<number | string>;
    specularExponent?: MaybeSignal<number | string>;
    limitingConeAngle?: MaybeSignal<number | string>;
}

// Animation Elements
interface SVGAnimateAttributes extends SVGCoreAttributes {
    attributeName?: MaybeSignal<string>;
    attributeType?: MaybeSignal<"CSS" | "XML" | "auto">;
    from?: MaybeSignal<string>;
    to?: MaybeSignal<string>;
    by?: MaybeSignal<string>;
    values?: MaybeSignal<string>;
    begin?: MaybeSignal<string>;
    dur?: MaybeSignal<string>;
    end?: MaybeSignal<string>;
    min?: MaybeSignal<string>;
    max?: MaybeSignal<string>;
    restart?: MaybeSignal<"always" | "whenNotActive" | "never">;
    repeatCount?: MaybeSignal<number | "indefinite">;
    repeatDur?: MaybeSignal<string>;
    fill?: MaybeSignal<"freeze" | "remove">;
    calcMode?: MaybeSignal<"discrete" | "linear" | "paced" | "spline">;
    keyTimes?: MaybeSignal<string>;
    keySplines?: MaybeSignal<string>;
    additive?: MaybeSignal<"replace" | "sum">;
    accumulate?: MaybeSignal<"none" | "sum">;
}

interface SVGAnimateMotionAttributes extends SVGCoreAttributes {
    path?: MaybeSignal<string>;
    keyPoints?: MaybeSignal<string>;
    rotate?: MaybeSignal<"auto" | "auto-reverse" | number | string>;
    origin?: MaybeSignal<string>;
    // Inherits animation timing attributes
    begin?: MaybeSignal<string>;
    dur?: MaybeSignal<string>;
    end?: MaybeSignal<string>;
    repeatCount?: MaybeSignal<number | "indefinite">;
    repeatDur?: MaybeSignal<string>;
    fill?: MaybeSignal<"freeze" | "remove">;
    calcMode?: MaybeSignal<"discrete" | "linear" | "paced" | "spline">;
    keyTimes?: MaybeSignal<string>;
    keySplines?: MaybeSignal<string>;
}

interface SVGAnimateTransformAttributes extends SVGCoreAttributes {
    attributeName?: MaybeSignal<string>;
    type?: MaybeSignal<"translate" | "scale" | "rotate" | "skewX" | "skewY">;
    from?: MaybeSignal<string>;
    to?: MaybeSignal<string>;
    by?: MaybeSignal<string>;
    values?: MaybeSignal<string>;
    begin?: MaybeSignal<string>;
    dur?: MaybeSignal<string>;
    end?: MaybeSignal<string>;
    repeatCount?: MaybeSignal<number | "indefinite">;
    repeatDur?: MaybeSignal<string>;
    fill?: MaybeSignal<"freeze" | "remove">;
    additive?: MaybeSignal<"replace" | "sum">;
    accumulate?: MaybeSignal<"none" | "sum">;
}

interface SVGMpathAttributes extends SVGCoreAttributes {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
}

interface SVGSetAttributes extends SVGCoreAttributes {
    attributeName?: MaybeSignal<string>;
    to?: MaybeSignal<string>;
    begin?: MaybeSignal<string>;
    dur?: MaybeSignal<string>;
    end?: MaybeSignal<string>;
    min?: MaybeSignal<string>;
    max?: MaybeSignal<string>;
    restart?: MaybeSignal<"always" | "whenNotActive" | "never">;
    repeatCount?: MaybeSignal<number | "indefinite">;
    repeatDur?: MaybeSignal<string>;
    fill?: MaybeSignal<"freeze" | "remove">;
}

// Descriptive Elements
interface SVGDescAttributes extends SVGCoreAttributes { }
interface SVGTitleAttributes extends SVGCoreAttributes { }
interface SVGMetadataAttributes extends SVGCoreAttributes { }

// =============================================================================
// SVG ELEMENT PROPS MAP
// =============================================================================

interface SVGElementPropsMap {
    svg: SVGSvgAttributes;
    g: SVGGAttributes;
    defs: SVGDefsAttributes;
    symbol: SVGSymbolAttributes;
    use: SVGUseAttributes;
    image: SVGImageAttributes;
    switch: SVGSwitchAttributes;
    foreignObject: SVGForeignObjectAttributes;

    // Shapes
    rect: SVGRectAttributes;
    circle: SVGCircleAttributes;
    ellipse: SVGEllipseAttributes;
    line: SVGLineAttributes;
    polyline: SVGPolylineAttributes;
    polygon: SVGPolygonAttributes;
    path: SVGPathAttributes;

    // Text
    text: SVGTextAttributes;
    tspan: SVGTspanAttributes;
    textPath: SVGTextPathAttributes;

    // Gradients
    linearGradient: SVGLinearGradientAttributes;
    radialGradient: SVGRadialGradientAttributes;
    stop: SVGStopAttributes;
    pattern: SVGPatternAttributes;

    // Clipping & Masking
    clipPath: SVGClipPathAttributes;
    mask: SVGMaskAttributes;
    marker: SVGMarkerAttributes;

    // Filters
    filter: SVGFilterAttributes;
    feBlend: SVGFeBlendAttributes;
    feColorMatrix: SVGFeColorMatrixAttributes;
    feComponentTransfer: SVGFeComponentTransferAttributes;
    feFuncR: SVGFeFuncAttributes;
    feFuncG: SVGFeFuncAttributes;
    feFuncB: SVGFeFuncAttributes;
    feFuncA: SVGFeFuncAttributes;
    feComposite: SVGFeCompositeAttributes;
    feConvolveMatrix: SVGFeConvolveMatrixAttributes;
    feDiffuseLighting: SVGFeDiffuseLightingAttributes;
    feDisplacementMap: SVGFeDisplacementMapAttributes;
    feDropShadow: SVGFeDropShadowAttributes;
    feFlood: SVGFeFloodAttributes;
    feGaussianBlur: SVGFeGaussianBlurAttributes;
    feImage: SVGFeImageAttributes;
    feMerge: SVGFeMergeAttributes;
    feMergeNode: SVGFeMergeNodeAttributes;
    feMorphology: SVGFeMorphologyAttributes;
    feOffset: SVGFeOffsetAttributes;
    feSpecularLighting: SVGFeSpecularLightingAttributes;
    feTile: SVGFeTileAttributes;
    feTurbulence: SVGFeTurbulenceAttributes;
    feDistantLight: SVGFeDistantLightAttributes;
    fePointLight: SVGFePointLightAttributes;
    feSpotLight: SVGFeSpotLightAttributes;

    // Animation
    animate: SVGAnimateAttributes;
    animateMotion: SVGAnimateMotionAttributes;
    animateTransform: SVGAnimateTransformAttributes;
    mpath: SVGMpathAttributes;
    set: SVGSetAttributes;

    // Descriptive
    desc: SVGDescAttributes;
    title: SVGTitleAttributes;
    metadata: SVGMetadataAttributes;
}

// =============================================================================
// SVG CHILD TYPE
// =============================================================================

type SVGChild =
    | string
    | number
    | Signal<unknown>
    | (() => void)
    | SVGElement
    | SVGChild[]
    | null
    | undefined;

// =============================================================================
// SVG FACTORY TYPES
// =============================================================================

/**
 * Factory for SVG container elements (can have children)
 * 
 * Signatures:
 * - (props, children) - props object + function children
 * - (props) - props only
 * - (children) - function children only
 * - () - no arguments
 */
interface SVGElementFactory<K extends keyof SVGElementPropsMap> {
    (props: SVGElementPropsMap[K], children: () => void): SVGElement;
    (children: () => void): SVGElement;
    (props: SVGElementPropsMap[K]): SVGElement;
    (): SVGElement;
}

/**
 * Factory for SVG void elements (no children allowed)
 */
interface SVGVoidElementFactory<K extends keyof SVGElementPropsMap> {
    (props?: SVGElementPropsMap[K]): SVGElement;
}

/**
 * Factory for SVG text elements (can have text content or tspan children)
 * 
 * Signatures:
 * - (props, text) - props + text content
 * - (props, children) - props + tspan children
 * - (props) - props only
 * - (text) - text content only
 * - (signal) - reactive text
 * - () - no arguments
 */
interface SVGTextElementFactory<K extends keyof SVGElementPropsMap> {
    (props: SVGElementPropsMap[K], text: string | number | Signal<unknown>): SVGElement;
    (props: SVGElementPropsMap[K], children: () => void): SVGElement;
    (props: SVGElementPropsMap[K]): SVGElement;
    (text: string | number | Signal<unknown>): SVGElement;
    (): SVGElement;
}

// =============================================================================
// SVG ELEMENT FACTORY IMPLEMENTATION
// =============================================================================

const SVG_NS = "http://www.w3.org/2000/svg";

class SVGCaptureContext implements Context {
    nodes: Node[] = [];
    appendChild(node: Node): Node {
        this.nodes.push(node);
        return node;
    }
}

function applySVGProps(element: SVGElement, props: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(props)) {
        if (value === null || value === undefined) continue;

        if (key.startsWith("on") && typeof value === "function") {
            const eventName = key.slice(2).toLowerCase();
            element.addEventListener(eventName, value as EventListener);
        } else if (isSignal(value)) {
            effect(() => {
                element.setAttribute(key, String((value as Signal<unknown>).value));
            });
        } else {
            element.setAttribute(key, String(value));
        }
    }
}

/**
 * Check if value is a props object (not a function child)
 */
function isSVGPropsObject(value: unknown): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        !isSignal(value)
    );
}

/**
 * Factory for SVG container elements (can have children)
 */
function createSVGElement<K extends keyof SVGElementPropsMap>(
    tag: string
): SVGElementFactory<K> {
    return ((
        arg1?: SVGElementPropsMap[K] | (() => void),
        arg2?: () => void
    ): SVGElement => {
        const element = document.createElementNS(SVG_NS, tag);

        let props: Record<string, unknown> | null = null;
        let childrenFn: (() => void) | null = null;

        // Parse arguments
        if (typeof arg1 === "function") {
            // (children: () => void)
            childrenFn = arg1;
        } else if (isSVGPropsObject(arg1)) {
            // (props, children?) or (props)
            props = arg1 as Record<string, unknown>;
            if (typeof arg2 === "function") {
                childrenFn = arg2;
            }
        }

        // Apply props
        if (props) {
            applySVGProps(element, props);
        }

        // Process children
        if (childrenFn) {
            const captureCtx = new SVGCaptureContext();
            pushContext(captureCtx);
            try {
                childrenFn();
            } finally {
                popContext();
            }
            for (const node of captureCtx.nodes) {
                element.appendChild(node);
            }
        }

        getCurrentContext().appendChild(element);
        return element;
    }) as SVGElementFactory<K>;
}

/**
 * Factory for SVG void elements (no children)
 */
function createSVGVoidElement<K extends keyof SVGElementPropsMap>(
    tag: string
): SVGVoidElementFactory<K> {
    return (props?: SVGElementPropsMap[K]): SVGElement => {
        const element = document.createElementNS(SVG_NS, tag);
        if (props) {
            applySVGProps(element, props as Record<string, unknown>);
        }
        getCurrentContext().appendChild(element);
        return element;
    };
}

/**
 * Factory for SVG text elements (can have text content)
 */
function createSVGTextElement<K extends keyof SVGElementPropsMap>(
    tag: string
): SVGTextElementFactory<K> {
    return ((
        arg1?: SVGElementPropsMap[K] | string | number | Signal<unknown>,
        arg2?: string | number | Signal<unknown> | (() => void)
    ): SVGElement => {
        const element = document.createElementNS(SVG_NS, tag);

        if (typeof arg1 === "string" || typeof arg1 === "number") {
            // (text)
            element.textContent = String(arg1);
        } else if (isSignal(arg1)) {
            // (signal)
            effect(() => {
                element.textContent = String(arg1.value);
            });
        } else if (isSVGPropsObject(arg1)) {
            // (props, text?) or (props, children?)
            applySVGProps(element, arg1 as Record<string, unknown>);

            if (typeof arg2 === "string" || typeof arg2 === "number") {
                element.textContent = String(arg2);
            } else if (isSignal(arg2)) {
                effect(() => {
                    element.textContent = String(arg2.value);
                });
            } else if (typeof arg2 === "function") {
                // Children function for nested tspans
                const captureCtx = new SVGCaptureContext();
                pushContext(captureCtx);
                try {
                    arg2();
                } finally {
                    popContext();
                }
                for (const node of captureCtx.nodes) {
                    element.appendChild(node);
                }
            }
        }

        getCurrentContext().appendChild(element);
        return element;
    }) as SVGTextElementFactory<K>;
}

// =============================================================================
// SVG ELEMENT EXPORTS
// =============================================================================

// Root & Container Elements
export const svg = createSVGElement<"svg">("svg");
export const g = createSVGElement<"g">("g");
export const defs = createSVGElement<"defs">("defs");
export const symbol = createSVGElement<"symbol">("symbol");
export const use = createSVGVoidElement<"use">("use");
export const image = createSVGVoidElement<"image">("image");
export const svgSwitch = createSVGElement<"switch">("switch");
export const foreignObject = createSVGElement<"foreignObject">("foreignObject");

// Basic Shapes
export const rect = createSVGVoidElement<"rect">("rect");
export const circle = createSVGVoidElement<"circle">("circle");
export const ellipse = createSVGVoidElement<"ellipse">("ellipse");
export const line = createSVGVoidElement<"line">("line");
export const polyline = createSVGVoidElement<"polyline">("polyline");
export const polygon = createSVGVoidElement<"polygon">("polygon");
export const path = createSVGVoidElement<"path">("path");

// Text Elements
export const text = createSVGTextElement<"text">("text");
export const tspan = createSVGTextElement<"tspan">("tspan");
export const textPath = createSVGTextElement<"textPath">("textPath");

// Gradient Elements
export const linearGradient = createSVGElement<"linearGradient">("linearGradient");
export const radialGradient = createSVGElement<"radialGradient">("radialGradient");
export const stop = createSVGVoidElement<"stop">("stop");
export const pattern = createSVGElement<"pattern">("pattern");

// Clipping & Masking
export const clipPath = createSVGElement<"clipPath">("clipPath");
export const svgMask = createSVGElement<"mask">("mask");
export const marker = createSVGElement<"marker">("marker");

// Filter Elements
export const svgFilter = createSVGElement<"filter">("filter");
export const feBlend = createSVGVoidElement<"feBlend">("feBlend");
export const feColorMatrix = createSVGVoidElement<"feColorMatrix">("feColorMatrix");
export const feComponentTransfer = createSVGElement<"feComponentTransfer">("feComponentTransfer");
export const feFuncR = createSVGVoidElement<"feFuncR">("feFuncR");
export const feFuncG = createSVGVoidElement<"feFuncG">("feFuncG");
export const feFuncB = createSVGVoidElement<"feFuncB">("feFuncB");
export const feFuncA = createSVGVoidElement<"feFuncA">("feFuncA");
export const feComposite = createSVGVoidElement<"feComposite">("feComposite");
export const feConvolveMatrix = createSVGVoidElement<"feConvolveMatrix">("feConvolveMatrix");
export const feDiffuseLighting = createSVGElement<"feDiffuseLighting">("feDiffuseLighting");
export const feDisplacementMap = createSVGVoidElement<"feDisplacementMap">("feDisplacementMap");
export const feDropShadow = createSVGVoidElement<"feDropShadow">("feDropShadow");
export const feFlood = createSVGVoidElement<"feFlood">("feFlood");
export const feGaussianBlur = createSVGVoidElement<"feGaussianBlur">("feGaussianBlur");
export const feImage = createSVGVoidElement<"feImage">("feImage");
export const feMerge = createSVGElement<"feMerge">("feMerge");
export const feMergeNode = createSVGVoidElement<"feMergeNode">("feMergeNode");
export const feMorphology = createSVGVoidElement<"feMorphology">("feMorphology");
export const feOffset = createSVGVoidElement<"feOffset">("feOffset");
export const feSpecularLighting = createSVGElement<"feSpecularLighting">("feSpecularLighting");
export const feTile = createSVGVoidElement<"feTile">("feTile");
export const feTurbulence = createSVGVoidElement<"feTurbulence">("feTurbulence");
export const feDistantLight = createSVGVoidElement<"feDistantLight">("feDistantLight");
export const fePointLight = createSVGVoidElement<"fePointLight">("fePointLight");
export const feSpotLight = createSVGVoidElement<"feSpotLight">("feSpotLight");

// Animation Elements
export const animate = createSVGVoidElement<"animate">("animate");
export const animateMotion = createSVGElement<"animateMotion">("animateMotion");
export const animateTransform = createSVGVoidElement<"animateTransform">("animateTransform");
export const mpath = createSVGVoidElement<"mpath">("mpath");
export const svgSet = createSVGVoidElement<"set">("set");

// Descriptive Elements
export const desc = createSVGTextElement<"desc">("desc");
export const svgTitle = createSVGTextElement<"title">("title");
export const metadata = createSVGElement<"metadata">("metadata");

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type {
    // Core
    SVGPresentationAttributes,
    SVGCoreAttributes,
    SVGEventHandlers,

    // Elements
    SVGSvgAttributes,
    SVGGAttributes,
    SVGDefsAttributes,
    SVGSymbolAttributes,
    SVGUseAttributes,
    SVGImageAttributes,
    SVGForeignObjectAttributes,

    // Shapes
    SVGRectAttributes,
    SVGCircleAttributes,
    SVGEllipseAttributes,
    SVGLineAttributes,
    SVGPolylineAttributes,
    SVGPolygonAttributes,
    SVGPathAttributes,

    // Text
    SVGTextAttributes,
    SVGTspanAttributes,
    SVGTextPathAttributes,

    // Gradients
    SVGLinearGradientAttributes,
    SVGRadialGradientAttributes,
    SVGStopAttributes,
    SVGPatternAttributes,

    // Clipping & Masking
    SVGClipPathAttributes,
    SVGMaskAttributes,
    SVGMarkerAttributes,

    // Filters
    SVGFilterAttributes,
    SVGFeGaussianBlurAttributes,
    SVGFeDropShadowAttributes,

    // Animation
    SVGAnimateAttributes,
    SVGAnimateMotionAttributes,
    SVGAnimateTransformAttributes,
};