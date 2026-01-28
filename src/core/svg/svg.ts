/**
 * Flick SVG Elements
 *
 * Factory functions for SVG elements with full TypeScript support.
 * SVG elements require a different namespace than HTML elements.
 */

import { getCurrentExecutionContext, pushExecutionContext, popExecutionContext, type ExecutionContext } from "../context/context";
import { $e, type Signal, isSignal, type MaybeSignal } from "../reactivity/reactivity";


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
    "fill-opacity"?: MaybeSignal<number | string>;
    fillOpacity?: MaybeSignal<number | string>;
    "fill-rule"?: MaybeSignal<FillRule>;
    fillRule?: MaybeSignal<FillRule>;
    stroke?: MaybeSignal<SVGPaint>;
    "stroke-opacity"?: MaybeSignal<number | string>;
    strokeOpacity?: MaybeSignal<number | string>;
    "stroke-width"?: MaybeSignal<number | string>;
    strokeWidth?: MaybeSignal<number | string>;
    "stroke-linecap"?: MaybeSignal<StrokeLinecap>;
    strokeLinecap?: MaybeSignal<StrokeLinecap>;
    "stroke-linejoin"?: MaybeSignal<StrokeLinejoin>;
    strokeLinejoin?: MaybeSignal<StrokeLinejoin>;
    "stroke-dasharray"?: MaybeSignal<string>;
    strokeDasharray?: MaybeSignal<string>;
    "stroke-dashoffset"?: MaybeSignal<number | string>;
    strokeDashoffset?: MaybeSignal<number | string>;
    "stroke-miterlimit"?: MaybeSignal<number | string>;
    strokeMiterlimit?: MaybeSignal<number | string>;

    // Opacity & Visibility
    opacity?: MaybeSignal<number | string>;
    visibility?: MaybeSignal<Visibility>;
    display?: MaybeSignal<Display>;

    // Clipping & Masking
    "clip-path"?: MaybeSignal<string>;
    clipPath?: MaybeSignal<string>;
    "clip-rule"?: MaybeSignal<ClipRule>;
    clipRule?: MaybeSignal<ClipRule>;
    mask?: MaybeSignal<string>;

    // Filters & Effects
    filter?: MaybeSignal<string>;

    // Color interpolation (for filters/gradients)
    "color-interpolation"?: MaybeSignal<ColorInterpolation>;
    colorInterpolation?: MaybeSignal<ColorInterpolation>;
    "color-interpolation-filters"?: MaybeSignal<ColorInterpolation>;
    colorInterpolationFilters?: MaybeSignal<ColorInterpolation>;

    // Text
    "font-family"?: MaybeSignal<string>;
    fontFamily?: MaybeSignal<string>;
    "font-size"?: MaybeSignal<number | string>;
    fontSize?: MaybeSignal<number | string>;
    "font-style"?: MaybeSignal<FontStyle>;
    fontStyle?: MaybeSignal<FontStyle>;
    "font-weight"?: MaybeSignal<FontWeight>;
    fontWeight?: MaybeSignal<FontWeight>;
    "font-variant"?: MaybeSignal<string>;
    fontVariant?: MaybeSignal<string>;
    "font-stretch"?: MaybeSignal<string>;
    fontStretch?: MaybeSignal<string>;
    "text-anchor"?: MaybeSignal<TextAnchor>;
    textAnchor?: MaybeSignal<TextAnchor>;
    "dominant-baseline"?: MaybeSignal<DominantBaseline>;
    dominantBaseline?: MaybeSignal<DominantBaseline>;
    "letter-spacing"?: MaybeSignal<number | string>;
    letterSpacing?: MaybeSignal<number | string>;
    "word-spacing"?: MaybeSignal<number | string>;
    wordSpacing?: MaybeSignal<number | string>;
    "text-decoration"?: MaybeSignal<string>;
    textDecoration?: MaybeSignal<string>;

    // Rendering
    "shape-rendering"?: MaybeSignal<ShapeRendering>;
    shapeRendering?: MaybeSignal<ShapeRendering>;
    "text-rendering"?: MaybeSignal<TextRendering>;
    textRendering?: MaybeSignal<TextRendering>;
    "image-rendering"?: MaybeSignal<ImageRendering>;
    imageRendering?: MaybeSignal<ImageRendering>;

    // Interaction
    "pointer-events"?: MaybeSignal<PointerEvents>;
    pointerEvents?: MaybeSignal<PointerEvents>;
    cursor?: MaybeSignal<string>;

    // Transform
    transform?: MaybeSignal<string>;
    "transform-origin"?: MaybeSignal<string>;
    transformOrigin?: MaybeSignal<string>;

    // Vector Effect
    "vector-effect"?: MaybeSignal<VectorEffect>;
    vectorEffect?: MaybeSignal<VectorEffect>;

    // Markers
    "marker-start"?: MaybeSignal<string>;
    markerStart?: MaybeSignal<string>;
    "marker-mid"?: MaybeSignal<string>;
    markerMid?: MaybeSignal<string>;
    "marker-end"?: MaybeSignal<string>;
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
// SVG CONDITIONAL PROCESSING ATTRIBUTES
// =============================================================================

interface SVGConditionalProcessingAttributes {
    requiredFeatures?: MaybeSignal<string>;
    requiredExtensions?: MaybeSignal<string>;
    systemLanguage?: MaybeSignal<string>;
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

    // SVG-specific animation events
    onbegin?: (event: Event) => void;
    onend?: (event: Event) => void;
    onrepeat?: (event: Event) => void;
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

type CrossOrigin = "anonymous" | "use-credentials" | "";

type Decoding = "sync" | "async" | "auto";

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
    baseProfile?: MaybeSignal<string>;
    contentScriptType?: MaybeSignal<string>;
    contentStyleType?: MaybeSignal<string>;
    zoomAndPan?: MaybeSignal<"disable" | "magnify">;
}

// Anchor Element (NEW)
interface SVGAAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
    target?: MaybeSignal<"_self" | "_parent" | "_top" | "_blank" | string>;
    download?: MaybeSignal<string>;
    rel?: MaybeSignal<string>;
    hreflang?: MaybeSignal<string>;
    type?: MaybeSignal<string>;
    ping?: MaybeSignal<string>;
    referrerpolicy?: MaybeSignal<"no-referrer" | "no-referrer-when-downgrade" | "same-origin" | "origin" | "strict-origin" | "origin-when-cross-origin" | "strict-origin-when-cross-origin" | "unsafe-url">;
}

// View Element (NEW)
interface SVGViewAttributes extends SVGCoreAttributes {
    viewBox?: MaybeSignal<string>;
    preserveAspectRatio?: MaybeSignal<PreserveAspectRatio>;
    zoomAndPan?: MaybeSignal<"disable" | "magnify">;
}

// Basic Shapes
interface SVGRectAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    rx?: MaybeSignal<number | string>;
    ry?: MaybeSignal<number | string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGCircleAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    cx?: MaybeSignal<number | string>;
    cy?: MaybeSignal<number | string>;
    r?: MaybeSignal<number | string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGEllipseAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    cx?: MaybeSignal<number | string>;
    cy?: MaybeSignal<number | string>;
    rx?: MaybeSignal<number | string>;
    ry?: MaybeSignal<number | string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGLineAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    x1?: MaybeSignal<number | string>;
    y1?: MaybeSignal<number | string>;
    x2?: MaybeSignal<number | string>;
    y2?: MaybeSignal<number | string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGPolylineAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    points?: MaybeSignal<string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGPolygonAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    points?: MaybeSignal<string>;
    pathLength?: MaybeSignal<number>;
}

interface SVGPathAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    d?: MaybeSignal<string>;
    pathLength?: MaybeSignal<number>;
}

// Text Elements
interface SVGTextAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    dx?: MaybeSignal<number | string>;
    dy?: MaybeSignal<number | string>;
    rotate?: MaybeSignal<string>;
    lengthAdjust?: MaybeSignal<LengthAdjust>;
    textLength?: MaybeSignal<number | string>;
}

interface SVGTspanAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    dx?: MaybeSignal<number | string>;
    dy?: MaybeSignal<number | string>;
    rotate?: MaybeSignal<string>;
    lengthAdjust?: MaybeSignal<LengthAdjust>;
    textLength?: MaybeSignal<number | string>;
}

interface SVGTextPathAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
    startOffset?: MaybeSignal<number | string>;
    method?: MaybeSignal<"align" | "stretch">;
    spacing?: MaybeSignal<"auto" | "exact">;
    side?: MaybeSignal<"left" | "right">;
    lengthAdjust?: MaybeSignal<LengthAdjust>;
    textLength?: MaybeSignal<number | string>;
    path?: MaybeSignal<string>;
}

// Container Elements
interface SVGGAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers { }

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

interface SVGUseAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
}

interface SVGImageAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    preserveAspectRatio?: MaybeSignal<PreserveAspectRatio>;
    crossorigin?: MaybeSignal<CrossOrigin>;
    decoding?: MaybeSignal<Decoding>;
}

interface SVGSwitchAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers { }

interface SVGForeignObjectAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGEventHandlers {
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
    "stop-color"?: MaybeSignal<SVGColor>;
    stopColor?: MaybeSignal<SVGColor>;
    "stop-opacity"?: MaybeSignal<number | string>;
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
interface SVGClipPathAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes {
    clipPathUnits?: MaybeSignal<Units>;
}

interface SVGMaskAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes {
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

// =============================================================================
// FILTER ELEMENTS (with proper presentation attributes)
// =============================================================================

type FilterIn = "SourceGraphic" | "SourceAlpha" | "BackgroundImage" | "BackgroundAlpha" | "FillPaint" | "StrokePaint" | string;

/**
 * Common filter primitive attributes
 */
interface SVGFilterPrimitiveAttributes extends SVGCoreAttributes {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    result?: MaybeSignal<string>;
}

interface SVGFilterAttributes extends SVGCoreAttributes, SVGPresentationAttributes {
    x?: MaybeSignal<number | string>;
    y?: MaybeSignal<number | string>;
    width?: MaybeSignal<number | string>;
    height?: MaybeSignal<number | string>;
    filterUnits?: MaybeSignal<Units>;
    primitiveUnits?: MaybeSignal<Units>;
}

interface SVGFeBlendAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    in2?: MaybeSignal<FilterIn>;
    mode?: MaybeSignal<"normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity">;
}

interface SVGFeColorMatrixAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    type?: MaybeSignal<"matrix" | "saturate" | "hueRotate" | "luminanceToAlpha">;
    values?: MaybeSignal<string>;
}

interface SVGFeComponentTransferAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
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

interface SVGFeCompositeAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    in2?: MaybeSignal<FilterIn>;
    operator?: MaybeSignal<"over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic">;
    k1?: MaybeSignal<number | string>;
    k2?: MaybeSignal<number | string>;
    k3?: MaybeSignal<number | string>;
    k4?: MaybeSignal<number | string>;
}

interface SVGFeConvolveMatrixAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    order?: MaybeSignal<string>;
    kernelMatrix?: MaybeSignal<string>;
    divisor?: MaybeSignal<number | string>;
    bias?: MaybeSignal<number | string>;
    targetX?: MaybeSignal<number>;
    targetY?: MaybeSignal<number>;
    edgeMode?: MaybeSignal<"duplicate" | "wrap" | "none">;
    preserveAlpha?: MaybeSignal<boolean | "true" | "false">;
}

interface SVGFeDiffuseLightingAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    surfaceScale?: MaybeSignal<number | string>;
    diffuseConstant?: MaybeSignal<number | string>;
    "lighting-color"?: MaybeSignal<SVGColor>;
    lightingColor?: MaybeSignal<SVGColor>;
}

interface SVGFeDisplacementMapAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    in2?: MaybeSignal<FilterIn>;
    scale?: MaybeSignal<number | string>;
    xChannelSelector?: MaybeSignal<"R" | "G" | "B" | "A">;
    yChannelSelector?: MaybeSignal<"R" | "G" | "B" | "A">;
}

interface SVGFeDropShadowAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    dx?: MaybeSignal<number | string>;
    dy?: MaybeSignal<number | string>;
    stdDeviation?: MaybeSignal<number | string>;
    "flood-color"?: MaybeSignal<SVGColor>;
    floodColor?: MaybeSignal<SVGColor>;
    "flood-opacity"?: MaybeSignal<number | string>;
    floodOpacity?: MaybeSignal<number | string>;
}

interface SVGFeFloodAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    "flood-color"?: MaybeSignal<SVGColor>;
    floodColor?: MaybeSignal<SVGColor>;
    "flood-opacity"?: MaybeSignal<number | string>;
    floodOpacity?: MaybeSignal<number | string>;
}

interface SVGFeGaussianBlurAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    stdDeviation?: MaybeSignal<number | string>;
    edgeMode?: MaybeSignal<"duplicate" | "wrap" | "none">;
}

interface SVGFeImageAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
    preserveAspectRatio?: MaybeSignal<PreserveAspectRatio>;
    crossorigin?: MaybeSignal<CrossOrigin>;
}

interface SVGFeMergeAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes { }

interface SVGFeMergeNodeAttributes extends SVGCoreAttributes {
    in?: MaybeSignal<FilterIn>;
}

interface SVGFeMorphologyAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    operator?: MaybeSignal<"erode" | "dilate">;
    radius?: MaybeSignal<number | string>;
}

interface SVGFeOffsetAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    dx?: MaybeSignal<number | string>;
    dy?: MaybeSignal<number | string>;
}

interface SVGFeSpecularLightingAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
    surfaceScale?: MaybeSignal<number | string>;
    specularConstant?: MaybeSignal<number | string>;
    specularExponent?: MaybeSignal<number | string>;
    "lighting-color"?: MaybeSignal<SVGColor>;
    lightingColor?: MaybeSignal<SVGColor>;
}

interface SVGFeTileAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    in?: MaybeSignal<FilterIn>;
}

interface SVGFeTurbulenceAttributes extends SVGFilterPrimitiveAttributes, SVGPresentationAttributes {
    baseFrequency?: MaybeSignal<number | string>;
    numOctaves?: MaybeSignal<number>;
    seed?: MaybeSignal<number>;
    stitchTiles?: MaybeSignal<"stitch" | "noStitch">;
    type?: MaybeSignal<"fractalNoise" | "turbulence">;
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

// =============================================================================
// ANIMATION ELEMENTS (with href support)
// =============================================================================

interface SVGAnimationTimingAttributes {
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

interface SVGAnimationValueAttributes {
    calcMode?: MaybeSignal<"discrete" | "linear" | "paced" | "spline">;
    values?: MaybeSignal<string>;
    keyTimes?: MaybeSignal<string>;
    keySplines?: MaybeSignal<string>;
    from?: MaybeSignal<string>;
    to?: MaybeSignal<string>;
    by?: MaybeSignal<string>;
}

interface SVGAnimationAdditionAttributes {
    additive?: MaybeSignal<"replace" | "sum">;
    accumulate?: MaybeSignal<"none" | "sum">;
}

interface SVGAnimationTargetAttributes {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
}

interface SVGAnimateAttributes extends SVGCoreAttributes, SVGAnimationTimingAttributes, SVGAnimationValueAttributes, SVGAnimationAdditionAttributes, SVGAnimationTargetAttributes, SVGEventHandlers {
    attributeName?: MaybeSignal<string>;
    attributeType?: MaybeSignal<"CSS" | "XML" | "auto">;
}

interface SVGAnimateMotionAttributes extends SVGCoreAttributes, SVGAnimationTimingAttributes, SVGAnimationValueAttributes, SVGAnimationAdditionAttributes, SVGAnimationTargetAttributes, SVGEventHandlers {
    path?: MaybeSignal<string>;
    keyPoints?: MaybeSignal<string>;
    rotate?: MaybeSignal<"auto" | "auto-reverse" | number | string>;
    origin?: MaybeSignal<string>;
}

interface SVGAnimateTransformAttributes extends SVGCoreAttributes, SVGAnimationTimingAttributes, SVGAnimationValueAttributes, SVGAnimationAdditionAttributes, SVGAnimationTargetAttributes, SVGEventHandlers {
    attributeName?: MaybeSignal<string>;
    type?: MaybeSignal<"translate" | "scale" | "rotate" | "skewX" | "skewY">;
}

interface SVGMpathAttributes extends SVGCoreAttributes {
    href?: MaybeSignal<string>;
    "xlink:href"?: MaybeSignal<string>;
}

interface SVGSetAttributes extends SVGCoreAttributes, SVGAnimationTimingAttributes, SVGAnimationTargetAttributes, SVGEventHandlers {
    attributeName?: MaybeSignal<string>;
    to?: MaybeSignal<string>;
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
    a: SVGAAttributes;
    view: SVGViewAttributes;

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



// =============================================================================
// SVG FACTORY TYPES
// =============================================================================

export interface SVGElementFactory<K extends keyof SVGElementPropsMap> {
    (props: SVGElementPropsMap[K], children: () => void): SVGElement;
    (children: () => void): SVGElement;
    (props: SVGElementPropsMap[K]): SVGElement;
    (): SVGElement;
}

export interface SVGVoidElementFactory<K extends keyof SVGElementPropsMap> {
    (props?: SVGElementPropsMap[K]): SVGElement;
}

export interface SVGTextElementFactory<K extends keyof SVGElementPropsMap> {
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
const XLINK_NS = "http://www.w3.org/1999/xlink";

class SVGCaptureContext implements ExecutionContext {
    nodes: Node[] = [];
    appendChild(node: Node): Node {
        this.nodes.push(node);
        return node;
    }
}

/**
 * Map of camelCase to kebab-case for presentation attributes
 */
const CAMEL_TO_KEBAB: Record<string, string> = {
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    strokeLinecap: "stroke-linecap",
    strokeLinejoin: "stroke-linejoin",
    strokeDasharray: "stroke-dasharray",
    strokeDashoffset: "stroke-dashoffset",
    strokeMiterlimit: "stroke-miterlimit",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontStyle: "font-style",
    fontWeight: "font-weight",
    fontVariant: "font-variant",
    fontStretch: "font-stretch",
    textAnchor: "text-anchor",
    dominantBaseline: "dominant-baseline",
    letterSpacing: "letter-spacing",
    wordSpacing: "word-spacing",
    textDecoration: "text-decoration",
    shapeRendering: "shape-rendering",
    textRendering: "text-rendering",
    imageRendering: "image-rendering",
    pointerEvents: "pointer-events",
    transformOrigin: "transform-origin",
    vectorEffect: "vector-effect",
    markerStart: "marker-start",
    markerMid: "marker-mid",
    markerEnd: "marker-end",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    lightingColor: "lighting-color",
};

function applySVGProps(element: SVGElement, props: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(props)) {
        if (value === null || value === undefined) continue;

        if (key.startsWith("on") && typeof value === "function") {
            const eventName = key.slice(2).toLowerCase();
            element.addEventListener(eventName, value as EventListener);
        } else if (isSignal(value)) {
            $e(() => {
                const attrName = CAMEL_TO_KEBAB[key] ?? key;
                if (key.startsWith("xlink:")) {
                    element.setAttributeNS(XLINK_NS, key, String((value as Signal<unknown>).value));
                } else {
                    element.setAttribute(attrName, String((value as Signal<unknown>).value));
                }
            });
        } else {
            const attrName = CAMEL_TO_KEBAB[key] ?? key;
            if (key.startsWith("xlink:")) {
                element.setAttributeNS(XLINK_NS, key, String(value));
            } else {
                element.setAttribute(attrName, String(value));
            }
        }
    }
}

function isSVGPropsObject(value: unknown): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        !isSignal(value)
    );
}

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

        if (typeof arg1 === "function") {
            childrenFn = arg1;
        } else if (isSVGPropsObject(arg1)) {
            props = arg1 as Record<string, unknown>;
            if (typeof arg2 === "function") {
                childrenFn = arg2;
            }
        }

        if (props) {
            applySVGProps(element, props);
        }

        if (childrenFn) {
            const captureCtx = new SVGCaptureContext();
            pushExecutionContext(captureCtx);
            try {
                childrenFn();
            } finally {
                popExecutionContext();
            }
            for (const node of captureCtx.nodes) {
                element.appendChild(node);
            }
        }

        getCurrentExecutionContext().appendChild(element);
        return element;
    }) as SVGElementFactory<K>;
}

function createSVGVoidElement<K extends keyof SVGElementPropsMap>(
    tag: string
): SVGVoidElementFactory<K> {
    return (props?: SVGElementPropsMap[K]): SVGElement => {
        const element = document.createElementNS(SVG_NS, tag);
        if (props) {
            applySVGProps(element, props as Record<string, unknown>);
        }
        getCurrentExecutionContext().appendChild(element);
        return element;
    };
}

function createSVGTextElement<K extends keyof SVGElementPropsMap>(
    tag: string
): SVGTextElementFactory<K> {
    return ((
        arg1?: SVGElementPropsMap[K] | string | number | Signal<unknown>,
        arg2?: string | number | Signal<unknown> | (() => void)
    ): SVGElement => {
        const element = document.createElementNS(SVG_NS, tag);

        if (typeof arg1 === "string" || typeof arg1 === "number") {
            element.textContent = String(arg1);
        } else if (isSignal(arg1)) {
            $e(() => {
                element.textContent = String(arg1.value);
            });
        } else if (isSVGPropsObject(arg1)) {
            applySVGProps(element, arg1 as Record<string, unknown>);

            if (typeof arg2 === "string" || typeof arg2 === "number") {
                element.textContent = String(arg2);
            } else if (isSignal(arg2)) {
                $e(() => {
                    element.textContent = String(arg2.value);
                });
            } else if (typeof arg2 === "function") {
                const captureCtx = new SVGCaptureContext();
                pushExecutionContext(captureCtx);
                try {
                    arg2();
                } finally {
                    popExecutionContext();
                }
                for (const node of captureCtx.nodes) {
                    element.appendChild(node);
                }
            }
        }

        getCurrentExecutionContext().appendChild(element);
        return element;
    }) as SVGTextElementFactory<K>;
}

// =============================================================================
// SVG ELEMENT EXPORTS
// =============================================================================

// Root & Container Elements
/** SVG Root definition. */
export const svg: SVGElementFactory<"svg"> = createSVGElement<"svg">("svg");
/** Group container definition. */
export const g: SVGElementFactory<"g"> = createSVGElement<"g">("g");
/** Definitions container. */
export const defs: SVGElementFactory<"defs"> = createSVGElement<"defs">("defs");
/** Symbol definition. */
export const symbol: SVGElementFactory<"symbol"> = createSVGElement<"symbol">("symbol");
/** Use element (instantiation). */
export const use: SVGVoidElementFactory<"use"> = createSVGVoidElement<"use">("use");
/** Image element. */
export const image: SVGVoidElementFactory<"image"> = createSVGVoidElement<"image">("image");
/** Switch conditional container. */
export const svgSwitch: SVGElementFactory<"switch"> = createSVGElement<"switch">("switch");
/** Foreign object container. */
export const foreignObject: SVGElementFactory<"foreignObject"> = createSVGElement<"foreignObject">("foreignObject");
/** Anchor link. */
export const a: SVGElementFactory<"a"> = createSVGElement<"a">("a");
/** View definition. */
export const view: SVGVoidElementFactory<"view"> = createSVGVoidElement<"view">("view");

// Basic Shapes
/** Rectangle shape. */
export const rect: SVGVoidElementFactory<"rect"> = createSVGVoidElement<"rect">("rect");
/** Circle shape. */
export const circle: SVGVoidElementFactory<"circle"> = createSVGVoidElement<"circle">("circle");
/** Ellipse shape. */
export const ellipse: SVGVoidElementFactory<"ellipse"> = createSVGVoidElement<"ellipse">("ellipse");
/** Line shape. */
export const line: SVGVoidElementFactory<"line"> = createSVGVoidElement<"line">("line");
/** Polyline shape. */
export const polyline: SVGVoidElementFactory<"polyline"> = createSVGVoidElement<"polyline">("polyline");
/** Polygon shape. */
export const polygon: SVGVoidElementFactory<"polygon"> = createSVGVoidElement<"polygon">("polygon");
/** Path shape. */
export const path: SVGVoidElementFactory<"path"> = createSVGVoidElement<"path">("path");

// Text Elements
/** Text element. */
export const text: SVGTextElementFactory<"text"> = createSVGTextElement<"text">("text");
/** Text span element. */
export const tspan: SVGTextElementFactory<"tspan"> = createSVGTextElement<"tspan">("tspan");
/** Text path element. */
export const textPath: SVGTextElementFactory<"textPath"> = createSVGTextElement<"textPath">("textPath");

// Gradient Elements
/** Linear gradient definition. */
export const linearGradient: SVGElementFactory<"linearGradient"> = createSVGElement<"linearGradient">("linearGradient");
/** Radial gradient definition. */
export const radialGradient: SVGElementFactory<"radialGradient"> = createSVGElement<"radialGradient">("radialGradient");
/** Gradient stop definition. */
export const stop: SVGVoidElementFactory<"stop"> = createSVGVoidElement<"stop">("stop");
/** Pattern definition. */
export const pattern: SVGElementFactory<"pattern"> = createSVGElement<"pattern">("pattern");

// Clipping & Masking
/** Clip path definition. */
export const clipPath: SVGElementFactory<"clipPath"> = createSVGElement<"clipPath">("clipPath");
/** Mask definition. */
export const svgMask: SVGElementFactory<"mask"> = createSVGElement<"mask">("mask");
/** Marker definition. */
export const marker: SVGElementFactory<"marker"> = createSVGElement<"marker">("marker");

// Filter Elements
/** Filter definition. */
export const svgFilter: SVGElementFactory<"filter"> = createSVGElement<"filter">("filter");
/** Blend filter. */
export const feBlend: SVGVoidElementFactory<"feBlend"> = createSVGVoidElement<"feBlend">("feBlend");
/** Color matrix filter. */
export const feColorMatrix: SVGVoidElementFactory<"feColorMatrix"> = createSVGVoidElement<"feColorMatrix">("feColorMatrix");
/** Component transfer filter. */
export const feComponentTransfer: SVGElementFactory<"feComponentTransfer"> = createSVGElement<"feComponentTransfer">("feComponentTransfer");
/** Function R filter. */
export const feFuncR: SVGVoidElementFactory<"feFuncR"> = createSVGVoidElement<"feFuncR">("feFuncR");
/** Function G filter. */
export const feFuncG: SVGVoidElementFactory<"feFuncG"> = createSVGVoidElement<"feFuncG">("feFuncG");
/** Function B filter. */
export const feFuncB: SVGVoidElementFactory<"feFuncB"> = createSVGVoidElement<"feFuncB">("feFuncB");
/** Function A filter. */
export const feFuncA: SVGVoidElementFactory<"feFuncA"> = createSVGVoidElement<"feFuncA">("feFuncA");
/** Composite filter. */
export const feComposite: SVGVoidElementFactory<"feComposite"> = createSVGVoidElement<"feComposite">("feComposite");
/** Convolve matrix filter. */
export const feConvolveMatrix: SVGVoidElementFactory<"feConvolveMatrix"> = createSVGVoidElement<"feConvolveMatrix">("feConvolveMatrix");
/** Diffuse lighting filter. */
export const feDiffuseLighting: SVGElementFactory<"feDiffuseLighting"> = createSVGElement<"feDiffuseLighting">("feDiffuseLighting");
/** Displacement map filter. */
export const feDisplacementMap: SVGVoidElementFactory<"feDisplacementMap"> = createSVGVoidElement<"feDisplacementMap">("feDisplacementMap");
/** Drop shadow filter. */
export const feDropShadow: SVGVoidElementFactory<"feDropShadow"> = createSVGVoidElement<"feDropShadow">("feDropShadow");
/** Flood filter. */
export const feFlood: SVGVoidElementFactory<"feFlood"> = createSVGVoidElement<"feFlood">("feFlood");
/** Gaussian blur filter. */
export const feGaussianBlur: SVGVoidElementFactory<"feGaussianBlur"> = createSVGVoidElement<"feGaussianBlur">("feGaussianBlur");
/** Image filter. */
export const feImage: SVGVoidElementFactory<"feImage"> = createSVGVoidElement<"feImage">("feImage");
/** Merge filter. */
export const feMerge: SVGElementFactory<"feMerge"> = createSVGElement<"feMerge">("feMerge");
/** Merge node filter. */
export const feMergeNode: SVGVoidElementFactory<"feMergeNode"> = createSVGVoidElement<"feMergeNode">("feMergeNode");
/** Morphology filter. */
export const feMorphology: SVGVoidElementFactory<"feMorphology"> = createSVGVoidElement<"feMorphology">("feMorphology");
/** Offset filter. */
export const feOffset: SVGVoidElementFactory<"feOffset"> = createSVGVoidElement<"feOffset">("feOffset");
/** Specular lighting filter. */
export const feSpecularLighting: SVGElementFactory<"feSpecularLighting"> = createSVGElement<"feSpecularLighting">("feSpecularLighting");
/** Tile filter. */
export const feTile: SVGVoidElementFactory<"feTile"> = createSVGVoidElement<"feTile">("feTile");
/** Turbulence filter. */
export const feTurbulence: SVGVoidElementFactory<"feTurbulence"> = createSVGVoidElement<"feTurbulence">("feTurbulence");
/** Distant light. */
export const feDistantLight: SVGVoidElementFactory<"feDistantLight"> = createSVGVoidElement<"feDistantLight">("feDistantLight");
/** Point light. */
export const fePointLight: SVGVoidElementFactory<"fePointLight"> = createSVGVoidElement<"fePointLight">("fePointLight");
/** Spot light. */
export const feSpotLight: SVGElementFactory<"feSpotLight"> = createSVGElement<"feSpotLight">("feSpotLight");

// Animation Elements
/** Animate definition. */
export const animate: SVGVoidElementFactory<"animate"> = createSVGVoidElement<"animate">("animate");
/** Animate motion definition. */
export const animateMotion: SVGElementFactory<"animateMotion"> = createSVGElement<"animateMotion">("animateMotion");
/** Animate transform definition. */
export const animateTransform: SVGVoidElementFactory<"animateTransform"> = createSVGVoidElement<"animateTransform">("animateTransform");
/** Multi-path animation definition. */
export const mpath: SVGVoidElementFactory<"mpath"> = createSVGVoidElement<"mpath">("mpath");
/** Set definition. */
export const svgSet: SVGVoidElementFactory<"set"> = createSVGVoidElement<"set">("set");

// Descriptive Elements
/** Description definition. */
export const desc: SVGTextElementFactory<"desc"> = createSVGTextElement<"desc">("desc");
/** Title definition. */
export const svgTitle: SVGTextElementFactory<"title"> = createSVGTextElement<"title">("title");
/** Metadata definition. */
export const metadata: SVGElementFactory<"metadata"> = createSVGElement<"metadata">("metadata");

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type {
    // Core
    SVGPresentationAttributes,
    SVGCoreAttributes,
    SVGConditionalProcessingAttributes,
    SVGEventHandlers,

    // Elements
    SVGSvgAttributes,
    SVGGAttributes,
    SVGDefsAttributes,
    SVGSymbolAttributes,
    SVGUseAttributes,
    SVGImageAttributes,
    SVGForeignObjectAttributes,
    SVGAAttributes,
    SVGViewAttributes,

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
    SVGFilterPrimitiveAttributes,
    SVGFeGaussianBlurAttributes,
    SVGFeDropShadowAttributes,
    SVGFeBlendAttributes,
    SVGFeColorMatrixAttributes,
    SVGFeCompositeAttributes,
    SVGFeOffsetAttributes,

    // Animation
    SVGAnimateAttributes,
    SVGAnimateMotionAttributes,
    SVGAnimateTransformAttributes,
    SVGSetAttributes,
};