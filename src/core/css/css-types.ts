import type { MaybeSignal } from "../reactivity";

export type CSSGlobalValues = "inherit" | "initial" | "revert" | "revert-layer" | "unset";

export type CSSTransform =
    | "none"
    | `matrix(${string})`
    | `translate(${string})`
    | `translateX(${string})`
    | `translateY(${string})`
    | `scale(${string})`
    | `scaleX(${string})`
    | `scaleY(${string})`
    | `rotate(${string})`
    | `skew(${string})`
    | `skewX(${string})`
    | `skewY(${string})`
    | `matrix3d(${string})`
    | `translate3d(${string})`
    | `translateZ(${string})`
    | `scale3d(${string})`
    | `scaleZ(${string})`
    | `rotate3d(${string})`
    | `rotateX(${string})`
    | `rotateY(${string})`
    | `rotateZ(${string})`
    | `perspective(${string})`
    | (string & {});

export type CSSFilter =
    | "none"
    | `blur(${string})`
    | `brightness(${string})`
    | `contrast(${string})`
    | `drop-shadow(${string})`
    | `grayscale(${string})`
    | `hue-rotate(${string})`
    | `invert(${string})`
    | `opacity(${string})`
    | `saturate(${string})`
    | `sepia(${string})`
    | `url(${string})`
    | (string & {});

export type CSSWillChange =
    | "auto"
    | "scroll-position"
    | "contents"
    | "transform"
    | "opacity"
    | "left"
    | "top"
    | "right"
    | "bottom"
    | (string & {});

export type CSSMixBlendMode =
    | "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten"
    | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference"
    | "exclusion" | "hue" | "saturation" | "color" | "luminosity"
    | "plus-darker" | "plus-lighter"
    | CSSGlobalValues;

export type CSSBoxShadow =
    | "none"
    | `inset ${string}`
    | `${string} inset`
    | (string & {});

export type CSSContain =
    | "none"
    | "strict"
    | "content"
    | "size"
    | "layout"
    | "style"
    | "paint"
    | "inline-size"
    | "block-size"
    | (string & {});


export type CSSDisplay =
    | "block" | "inline" | "inline-block" | "flex" | "inline-flex"
    | "grid" | "inline-grid" | "flow-root" | "none" | "contents"
    | "table" | "table-row" | "table-cell" | "table-column" | "table-column-group"
    | "table-footer-group" | "table-header-group" | "table-row-group" | "table-caption"
    | "list-item" | "run-in"
    | CSSGlobalValues;

export type CSSPosition = "static" | "relative" | "absolute" | "fixed" | "sticky" | CSSGlobalValues;

export type CSSFlexDirection = "row" | "row-reverse" | "column" | "column-reverse" | CSSGlobalValues;

export type CSSFlexWrap = "nowrap" | "wrap" | "wrap-reverse" | CSSGlobalValues;

export type CSSJustifyContent =
    | "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
    | "start" | "end" | "left" | "right" | "normal" | "stretch"
    | CSSGlobalValues;

export type CSSAlignItems =
    | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
    | "start" | "end" | "self-start" | "self-end" | "normal"
    | CSSGlobalValues;

export type CSSAlignContent =
    | "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "stretch"
    | "start" | "end" | "normal" | "baseline"
    | CSSGlobalValues;

export type CSSAlignSelf =
    | "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
    | "start" | "end" | "self-start" | "self-end" | "normal"
    | CSSGlobalValues;

export type CSSOverflow = "visible" | "hidden" | "clip" | "scroll" | "auto" | CSSGlobalValues;

export type CSSVisibility = "visible" | "hidden" | "collapse" | CSSGlobalValues;

export type CSSBoxSizing = "content-box" | "border-box" | CSSGlobalValues;

export type CSSTextAlign = "left" | "right" | "center" | "justify" | "start" | "end" | "match-parent" | CSSGlobalValues;

export type CSSTextDecoration = "none" | "underline" | "overline" | "line-through" | "blink" | CSSGlobalValues | (string & {});

export type CSSTextTransform = "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana" | CSSGlobalValues;

export type CSSWhiteSpace = "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | "break-spaces" | CSSGlobalValues;

export type CSSWordBreak = "normal" | "break-all" | "keep-all" | "break-word" | CSSGlobalValues;

export type CSSWordWrap = "normal" | "break-word" | "anywhere" | CSSGlobalValues;

export type CSSFontWeight =
    | "normal" | "bold" | "bolder" | "lighter"
    | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
    | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
    | CSSGlobalValues;

export type CSSFontStyle = "normal" | "italic" | "oblique" | CSSGlobalValues | (string & {});

export type CSSCursor =
    | "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" | "wait"
    | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" | "no-drop"
    | "not-allowed" | "grab" | "grabbing" | "all-scroll" | "col-resize" | "row-resize"
    | "n-resize" | "e-resize" | "s-resize" | "w-resize" | "ne-resize" | "nw-resize" | "se-resize" | "sw-resize"
    | "ew-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "zoom-in" | "zoom-out"
    | CSSGlobalValues | (string & {});

export type CSSPointerEvents =
    | "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible"
    | "painted" | "fill" | "stroke" | "all"
    | CSSGlobalValues;

export type CSSUserSelect = "auto" | "none" | "text" | "all" | "contain" | CSSGlobalValues;

export type CSSFloat = "left" | "right" | "none" | "inline-start" | "inline-end" | CSSGlobalValues;

export type CSSClear = "none" | "left" | "right" | "both" | "inline-start" | "inline-end" | CSSGlobalValues;

export type CSSObjectFit = "contain" | "cover" | "fill" | "none" | "scale-down" | CSSGlobalValues;

export type CSSObjectPosition = "top" | "bottom" | "left" | "right" | "center" | CSSGlobalValues | (string & {});

export type CSSBackgroundSize = "auto" | "cover" | "contain" | CSSGlobalValues | (string & {});

export type CSSBackgroundRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | "space" | "round" | CSSGlobalValues | (string & {});

export type CSSBackgroundPosition = "top" | "bottom" | "left" | "right" | "center" | CSSGlobalValues | (string & {});

export type CSSBackgroundAttachment = "scroll" | "fixed" | "local" | CSSGlobalValues;

export type CSSBackgroundClip = "border-box" | "padding-box" | "content-box" | "text" | CSSGlobalValues;

export type CSSBorderStyle = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | CSSGlobalValues;

export type CSSListStyleType =
    | "none" | "disc" | "circle" | "square" | "decimal" | "decimal-leading-zero"
    | "lower-roman" | "upper-roman" | "lower-greek" | "lower-latin" | "upper-latin"
    | "armenian" | "georgian" | "lower-alpha" | "upper-alpha"
    | CSSGlobalValues | (string & {});

export type CSSListStylePosition = "inside" | "outside" | CSSGlobalValues;

export type CSSTransformOrigin = "center" | "top" | "bottom" | "left" | "right" | CSSGlobalValues | (string & {});

export type CSSTransitionTimingFunction =
    | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear" | "step-start" | "step-end"
    | CSSGlobalValues | (string & {});

export type CSSAnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse" | CSSGlobalValues;

export type CSSAnimationFillMode = "none" | "forwards" | "backwards" | "both" | CSSGlobalValues;

export type CSSAnimationPlayState = "running" | "paused" | CSSGlobalValues;

export type CSSResize = "none" | "both" | "horizontal" | "vertical" | "block" | "inline" | CSSGlobalValues;

export type CSSTextOverflow = "clip" | "ellipsis" | CSSGlobalValues | (string & {});

export type CSSVerticalAlign =
    | "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom"
    | CSSGlobalValues | (string & {});

export type CSSLineHeight = "normal" | CSSGlobalValues | (string & {}) | number;

export type CSSLetterSpacing = "normal" | CSSGlobalValues | (string & {});

export type CSSZIndex = "auto" | CSSGlobalValues | number | (string & {});

export type CSSOpacity = CSSGlobalValues | number | (string & {});

export type CSSFlexBasis = "auto" | "content" | "fit-content" | "max-content" | "min-content" | CSSGlobalValues | (string & {});

export type CSSFlexGrowShrink = CSSGlobalValues | number | (string & {});

export type CSSOrder = CSSGlobalValues | number;

export type CSSGap = "normal" | CSSGlobalValues | (string & {});

export type CSSGridAutoFlow = "row" | "column" | "dense" | "row dense" | "column dense" | CSSGlobalValues;

export type CSSGridTemplate = "none" | "auto" | "max-content" | "min-content" | CSSGlobalValues | (string & {});

export type CSSPlaceItems = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "baseline" | CSSGlobalValues | (string & {});

export type CSSPlaceContent = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | CSSGlobalValues | (string & {});

export type CSSPlaceSelf = "auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "baseline" | CSSGlobalValues | (string & {});

export type CSSLengthUnit = "px" | "rem" | "em" | "vw" | "vh" | "%" | "cm" | "mm" | "in" | "pt" | "pc" | "ex" | "ch" | "vmin" | "vmax";

export type CSSLength =
    | "0"
    | "auto"
    | `${number}${CSSLengthUnit}`
    | `calc(${string})`
    | `var(--${string})`
    | `${string} ${string}`
    | "fit-content"
    | "max-content"
    | "min-content"
    | CSSGlobalValues;

// =============================================================================
// CSS COLORS - STRICT & OBJECT BASED
// =============================================================================

export interface ColorRGB {
    type: "rgb";
    r: number;
    g: number;
    b: number;
    a?: number;
}

export interface ColorHSL {
    type: "hsl";
    h: number;
    s: number;
    l: number;
    a?: number;
}

export interface ColorHWB {
    type: "hwb";
    h: number;
    w: number;
    b: number;
    a?: number;
}

export interface ColorOKLCH {
    type: "oklch";
    l: number;
    c: number;
    h: number;
    a?: number;
}

export interface ColorLab {
    type: "lab";
    l: number;
    a: number;
    b: number;
    alpha?: number;
}

export interface ColorLCH {
    type: "lch";
    l: number;
    c: number;
    h: number;
    alpha?: number;
}

export interface ColorOKLab {
    type: "oklab";
    l: number;
    a: number;
    b: number;
    alpha?: number;
}

export interface ColorHex {
    type: "hex";
    value: string;
}

export interface ColorFunction {
    type: "color";
    space: "srgb" | "srgb-linear" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020" | "xyz" | "xyz-d50" | "xyz-d65" | (string & {});
    components: [number, number, number];
    alpha?: number;
}

export interface ColorMix {
    type: "color-mix";
    method: string; // e.g., "in lch", "in srgb"
    color1: CSSColor | string;
    percentage1?: number;
    color2: CSSColor | string;
    percentage2?: number;
}

export type CSSNamedColor =
    | "aliceblue" | "antiquewhite" | "aqua" | "aquamarine" | "azure"
    | "beige" | "bisque" | "black" | "blanchedalmond" | "blue"
    | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse"
    | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson"
    | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray"
    | "darkgreen" | "darkgrey" | "darkkhaki" | "darkmagenta" | "darkolivegreen"
    | "darkorange" | "darkorchid" | "darkred" | "darksalmon" | "darkseagreen"
    | "darkslateblue" | "darkslategray" | "darkslategrey" | "darkturquoise" | "darkviolet"
    | "deeppink" | "deepskyblue" | "dimgray" | "dimgrey" | "dodgerblue"
    | "firebrick" | "floralwhite" | "forestgreen" | "fuchsia" | "gainsboro"
    | "ghostwhite" | "gold" | "goldenrod" | "gray" | "green"
    | "greenyellow" | "grey" | "honeydew" | "hotpink" | "indianred"
    | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderblush"
    | "lawngreen" | "lemonchiffon" | "lightblue" | "lightcoral" | "lightcyan"
    | "lightgoldenrodyellow" | "lightgray" | "lightgreen" | "lightgrey" | "lightpink"
    | "lightsalmon" | "lightseagreen" | "lightskyblue" | "lightslategray" | "lightslategrey"
    | "lightsteelblue" | "lightyellow" | "lime" | "limegreen" | "linen"
    | "magenta" | "maroon" | "mediumaquamarine" | "mediumblue" | "mediumorchid"
    | "mediumpurple" | "mediumseagreen" | "mediumslateblue" | "mediumspringgreen" | "mediumturquoise"
    | "mediumvioletred" | "midnightblue" | "mintcream" | "mistyrose" | "moccasin"
    | "navajowhite" | "navy" | "oldlace" | "olive" | "olivedrab"
    | "orange" | "orangered" | "orchid" | "palegoldenrod" | "palegreen"
    | "paleturquoise" | "palevioletred" | "papayawhip" | "peachpuff" | "peru"
    | "pink" | "plum" | "powderblue" | "purple" | "rebeccapurple"
    | "red" | "rosybrown" | "royalblue" | "saddlebrown" | "salmon"
    | "sandybrown" | "seagreen" | "seashell" | "sienna" | "silver"
    | "skyblue" | "slateblue" | "slategray" | "slategrey" | "snow"
    | "springgreen" | "steelblue" | "tan" | "teal" | "thistle"
    | "tomato" | "transparent" | "turquoise" | "violet" | "wheat"
    | "white" | "whitesmoke" | "yellow" | "yellowgreen"
    | "currentColor";

/**
 * Strict CSS Color type.
 * Supports:
 * - Named colors (autocomplete)
 * - Object literals ({ type: 'rgb', ... })
 * - Any string (hex, var, etc.)
 */
export type CSSColor =
    | CSSNamedColor
    | ColorRGB
    | ColorHSL
    | ColorHWB
    | ColorOKLCH
    | ColorLab
    | ColorLCH
    | ColorOKLab
    | ColorHex
    | ColorFunction
    | ColorMix
    | CSSGlobalValues
    | (string & {});

/**
 * Strict CSS properties interface with autocomplete
 */
export interface StrictCSSProperties {
    // Display & Visibility
    display?: CSSDisplay;
    visibility?: CSSVisibility;
    opacity?: CSSOpacity;

    // Positioning
    position?: CSSPosition;
    top?: CSSLength;
    right?: CSSLength;
    bottom?: CSSLength;
    left?: CSSLength;
    zIndex?: CSSZIndex;
    float?: CSSFloat;
    clear?: CSSClear;

    // Box Model
    width?: CSSLength;
    height?: CSSLength;
    minWidth?: CSSLength;
    maxWidth?: CSSLength;
    minHeight?: CSSLength;
    maxHeight?: CSSLength;
    margin?: CSSLength;
    marginTop?: CSSLength;
    marginRight?: CSSLength;
    marginBottom?: CSSLength;
    marginLeft?: CSSLength;
    marginBlock?: CSSLength;
    marginBlockStart?: CSSLength;
    marginBlockEnd?: CSSLength;
    marginInline?: CSSLength;
    marginInlineStart?: CSSLength;
    marginInlineEnd?: CSSLength;
    padding?: CSSLength;
    paddingTop?: CSSLength;
    paddingRight?: CSSLength;
    paddingBottom?: CSSLength;
    paddingLeft?: CSSLength;
    paddingBlock?: CSSLength;
    paddingBlockStart?: CSSLength;
    paddingBlockEnd?: CSSLength;
    paddingInline?: CSSLength;
    paddingInlineStart?: CSSLength;
    paddingInlineEnd?: CSSLength;
    boxSizing?: CSSBoxSizing;
    overflow?: CSSOverflow;
    overflowX?: CSSOverflow;
    overflowY?: CSSOverflow;

    // Flexbox
    flexDirection?: CSSFlexDirection;
    flexWrap?: CSSFlexWrap;
    flexFlow?: string;
    justifyContent?: CSSJustifyContent;
    alignItems?: CSSAlignItems;
    alignContent?: CSSAlignContent;
    alignSelf?: CSSAlignSelf;
    flex?: string | number;
    flexGrow?: CSSFlexGrowShrink;
    flexShrink?: CSSFlexGrowShrink;
    flexBasis?: CSSFlexBasis;
    order?: CSSOrder;
    gap?: CSSGap;
    rowGap?: CSSGap;
    columnGap?: CSSGap;

    // Grid
    gridTemplateColumns?: CSSGridTemplate;
    gridTemplateRows?: CSSGridTemplate;
    gridTemplateAreas?: string;
    gridTemplate?: string;
    gridAutoColumns?: CSSGridTemplate;
    gridAutoRows?: CSSGridTemplate;
    gridAutoFlow?: CSSGridAutoFlow;
    grid?: string;
    gridColumn?: string;
    gridColumnStart?: string | number;
    gridColumnEnd?: string | number;
    gridRow?: string;
    gridRowStart?: string | number;
    gridRowEnd?: string | number;
    gridArea?: string;
    placeItems?: CSSPlaceItems;
    placeContent?: CSSPlaceContent;
    placeSelf?: CSSPlaceSelf;
    justifyItems?: CSSAlignItems;
    justifySelf?: CSSAlignSelf;

    // Typography
    color?: CSSColor;
    fontFamily?: string;
    fontSize?: CSSLength;
    fontWeight?: CSSFontWeight;
    fontStyle?: CSSFontStyle;
    fontVariant?: string;
    lineHeight?: CSSLineHeight;
    letterSpacing?: CSSLetterSpacing;
    textAlign?: CSSTextAlign;
    textDecoration?: CSSTextDecoration;
    textDecorationLine?: string;
    textDecorationColor?: CSSColor;
    textDecorationStyle?: CSSBorderStyle;
    textDecorationThickness?: CSSLength;
    textTransform?: CSSTextTransform;
    textIndent?: CSSLength;
    textShadow?: string;
    textOverflow?: CSSTextOverflow;
    whiteSpace?: CSSWhiteSpace;
    wordBreak?: CSSWordBreak;
    wordWrap?: CSSWordWrap;
    overflowWrap?: CSSWordWrap;
    wordSpacing?: CSSLength;
    verticalAlign?: CSSVerticalAlign;

    // Background
    background?: string;
    backgroundColor?: CSSColor;
    backgroundImage?: string;
    backgroundSize?: CSSBackgroundSize;
    backgroundRepeat?: CSSBackgroundRepeat;
    backgroundPosition?: CSSBackgroundPosition;
    backgroundAttachment?: CSSBackgroundAttachment;
    backgroundClip?: CSSBackgroundClip;
    backgroundOrigin?: CSSBackgroundClip;

    // Border
    border?: string;
    borderWidth?: CSSLength;
    borderStyle?: CSSBorderStyle;
    borderColor?: CSSColor;
    borderTop?: string;
    borderTopWidth?: CSSLength;
    borderTopStyle?: CSSBorderStyle;
    borderTopColor?: CSSColor;
    borderRight?: string;
    borderRightWidth?: CSSLength;
    borderRightStyle?: CSSBorderStyle;
    borderRightColor?: CSSColor;
    borderBottom?: string;
    borderBottomWidth?: CSSLength;
    borderBottomStyle?: CSSBorderStyle;
    borderBottomColor?: CSSColor;
    borderLeft?: string;
    borderLeftWidth?: CSSLength;
    borderLeftStyle?: CSSBorderStyle;
    borderLeftColor?: CSSColor;
    borderRadius?: CSSLength;
    borderTopLeftRadius?: CSSLength;
    borderTopRightRadius?: CSSLength;
    borderBottomLeftRadius?: CSSLength;
    borderBottomRightRadius?: CSSLength;
    borderCollapse?: "collapse" | "separate" | CSSGlobalValues;
    borderSpacing?: CSSLength;

    // Outline
    outline?: string;
    outlineWidth?: CSSLength;
    outlineStyle?: CSSBorderStyle;
    outlineColor?: CSSColor;
    outlineOffset?: CSSLength;

    // List
    listStyle?: string;
    listStyleType?: CSSListStyleType;
    listStylePosition?: CSSListStylePosition;
    listStyleImage?: string;

    // Table
    tableLayout?: "auto" | "fixed" | CSSGlobalValues;
    captionSide?: "top" | "bottom" | CSSGlobalValues;
    emptyCells?: "show" | "hide" | CSSGlobalValues;

    // Transform
    transform?: CSSTransform;
    transformOrigin?: CSSTransformOrigin;
    transformStyle?: "flat" | "preserve-3d" | CSSGlobalValues;
    perspective?: CSSLength;
    perspectiveOrigin?: CSSTransformOrigin;
    backfaceVisibility?: "visible" | "hidden" | CSSGlobalValues;

    // Transition
    transition?: string;
    transitionProperty?: string;
    transitionDuration?: string;
    transitionTimingFunction?: CSSTransitionTimingFunction;
    transitionDelay?: string;

    // Animation
    animation?: string;
    animationName?: string;
    animationDuration?: string;
    animationTimingFunction?: CSSTransitionTimingFunction;
    animationDelay?: string;
    animationIterationCount?: "infinite" | number | CSSGlobalValues;
    animationDirection?: CSSAnimationDirection;
    animationFillMode?: CSSAnimationFillMode;
    animationPlayState?: CSSAnimationPlayState;

    // Interaction
    cursor?: CSSCursor;
    pointerEvents?: CSSPointerEvents;
    userSelect?: CSSUserSelect;
    resize?: CSSResize;
    touchAction?: "auto" | "none" | "pan-x" | "pan-y" | "manipulation" | "pinch-zoom" | CSSGlobalValues | (string & {});
    scrollBehavior?: "auto" | "smooth" | CSSGlobalValues;

    // Object (for images, videos)
    objectFit?: CSSObjectFit;
    objectPosition?: CSSObjectPosition;

    // Filters & Effects
    filter?: CSSFilter;
    backdropFilter?: CSSFilter;
    mixBlendMode?: CSSMixBlendMode;
    boxShadow?: CSSBoxShadow;

    // Columns
    columns?: string;
    columnCount?: "auto" | number | CSSGlobalValues;
    columnWidth?: CSSLength;
    columnRule?: string;
    columnRuleWidth?: CSSLength;
    columnRuleStyle?: CSSBorderStyle;
    columnRuleColor?: CSSColor;
    columnSpan?: "none" | "all" | CSSGlobalValues;
    columnFill?: "auto" | "balance" | CSSGlobalValues;

    // Misc
    content?: string;
    quotes?: string;
    counterIncrement?: string;
    counterReset?: string;
    willChange?: CSSWillChange;
    contain?: CSSContain;
    isolation?: "auto" | "isolate" | CSSGlobalValues;
    aspectRatio?: "auto" | string | number | CSSGlobalValues;
    accentColor?: CSSColor;
    caretColor?: CSSColor;
    scrollMargin?: CSSLength;
    scrollPadding?: CSSLength;
    scrollSnapType?: string;
    scrollSnapAlign?: string;
}

/**
 * Reactive CSS properties allowing signals for any value
 */
export type ReactiveCSSProperties = {
    [K in keyof StrictCSSProperties]: MaybeSignal<StrictCSSProperties[K]>;
};
