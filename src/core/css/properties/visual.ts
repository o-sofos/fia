import type { CSSGlobalValues } from "./common";
import type { CSSLength } from "./units";

// =============================================================================
// CSS COLORS
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

// =============================================================================
// TEMPLATE LITERAL TYPES FOR CSS FUNCTIONS
// =============================================================================

/**
 * Template literal helper types for CSS values with compile-time validation
 */
type CSSNumber = number | `${number}`;
type CSSPercentage = `${number}%`;
type CSSAngle = `${number}deg` | `${number}rad` | `${number}grad` | `${number}turn`;

/**
 * RGB/RGBA color function types with proper syntax validation.
 * Supports both comma-separated and space-separated modern syntax.
 *
 * @example
 * "rgb(255, 0, 0)"              // Legacy comma syntax ✓
 * "rgb(255 0 0)"                // Modern space syntax ✓
 * "rgba(255, 0, 0, 0.5)"        // Legacy with alpha ✓
 * "rgba(255 0 0 / 0.5)"         // Modern with alpha ✓
 */
export type CSSRgbFunction =
  | `rgb(${CSSNumber}, ${CSSNumber}, ${CSSNumber})`
  | `rgb(${CSSNumber} ${CSSNumber} ${CSSNumber})`
  | `rgba(${CSSNumber}, ${CSSNumber}, ${CSSNumber}, ${CSSNumber})`
  | `rgba(${CSSNumber} ${CSSNumber} ${CSSNumber} / ${CSSNumber})`;

/**
 * HSL/HSLA color function types.
 * Supports both comma-separated and space-separated modern syntax.
 *
 * @example
 * "hsl(120, 100%, 50%)"         // Legacy comma syntax ✓
 * "hsl(120deg 100% 50%)"        // Modern space syntax ✓
 * "hsla(120, 100%, 50%, 0.5)"   // Legacy with alpha ✓
 * "hsla(120deg 100% 50% / 0.5)" // Modern with alpha ✓
 */
export type CSSHslFunction =
  | `hsl(${CSSAngle}, ${CSSPercentage}, ${CSSPercentage})`
  | `hsl(${CSSAngle} ${CSSPercentage} ${CSSPercentage})`
  | `hsla(${CSSAngle}, ${CSSPercentage}, ${CSSPercentage}, ${CSSNumber})`
  | `hsla(${CSSAngle} ${CSSPercentage} ${CSSPercentage} / ${CSSNumber})`;

/**
 * HWB color function type (modern CSS Colors Level 4).
 *
 * @example
 * "hwb(120deg 0% 0%)"           // Without alpha ✓
 * "hwb(120deg 0% 0% / 0.5)"     // With alpha ✓
 */
export type CSSHwbFunction =
  | `hwb(${CSSAngle} ${CSSPercentage} ${CSSPercentage})`
  | `hwb(${CSSAngle} ${CSSPercentage} ${CSSPercentage} / ${CSSNumber})`;

/**
 * Strict CSS Color type with template literal validation for function syntax.
 * Provides IntelliSense hints for proper color format while maintaining flexibility.
 */
export type CSSColor =
    | CSSNamedColor
    | ColorRGB          // Object notation
    | ColorHSL          // Object notation
    | ColorHWB          // Object notation
    | ColorOKLCH        // Object notation
    | ColorLab          // Object notation
    | ColorLCH          // Object notation
    | ColorOKLab        // Object notation
    | ColorHex          // Object notation
    | ColorFunction     // Object notation
    | ColorMix          // Object notation
    | CSSRgbFunction    // Template literal validation
    | CSSHslFunction    // Template literal validation
    | CSSHwbFunction    // Template literal validation
    | `#${string}`      // Hex colors
    | `var(--${string})`// CSS variables
    | CSSGlobalValues
    | (string & {});    // Escape hatch for edge cases

// =============================================================================
// BACKGROUNDS & BORDERS & EFFECTS
// =============================================================================

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

export type CSSOpacity = CSSGlobalValues | number | (string & {});

export interface VisualProperties {
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

    // Object
    objectFit?: CSSObjectFit;
    objectPosition?: CSSObjectPosition;

    // Filters & Effects
    filter?: CSSFilter;
    backdropFilter?: CSSFilter;
    mixBlendMode?: CSSMixBlendMode;
    boxShadow?: CSSBoxShadow;
    opacity?: CSSOpacity;

    // List
    listStyle?: string;
    listStyleType?: CSSListStyleType;
    listStylePosition?: CSSListStylePosition;
    listStyleImage?: string;

    // Misc Vis
    accentColor?: CSSColor;
    caretColor?: CSSColor;
}
