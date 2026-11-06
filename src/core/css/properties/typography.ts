import type { CSSGlobalValues } from "./common";
import type { CSSLength } from "./units";

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
    | CSSGlobalValues
    | (string & {});

export type CSSFontStyle = "normal" | "italic" | "oblique" | CSSGlobalValues | (string & {});

export type CSSTextOverflow = "clip" | "ellipsis" | CSSGlobalValues | (string & {});

export type CSSVerticalAlign =
    | "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom"
    | CSSGlobalValues | (string & {});

export type CSSLineHeight = "normal" | CSSGlobalValues | (string & {}) | number;

export type CSSLetterSpacing = "normal" | CSSGlobalValues | (string & {});

export type CSSWritingMode =
    | "horizontal-tb" | "vertical-rl" | "vertical-lr" | "sideways-rl" | "sideways-lr"
    | CSSGlobalValues;

export type CSSTextWrap = "wrap" | "nowrap" | "balance" | "pretty" | "stable" | CSSGlobalValues;

export type CSSHyphens = "none" | "manual" | "auto" | CSSGlobalValues;

/** `normal`, or comma-separated `"liga" 1, "tnum"` / `"wght" 650` settings */
export type CSSFontSettings = "normal" | CSSGlobalValues | (string & {});

export interface TypographyProperties {
    // We treat color as a string here to avoid circular dep with visual.ts which handles Color types fully
    // Detailed Color type is exported from visual.ts
    color?: string | object | CSSGlobalValues; // 'any' or 'string' mainly to allow imports in css-types.ts to bind strict Color later

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
    textDecorationColor?: string | CSSGlobalValues;
    textDecorationStyle?: string | CSSGlobalValues;
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

    textAlignLast?: "auto" | "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent" | CSSGlobalValues;
    textJustify?: "none" | "auto" | "inter-word" | "inter-character" | CSSGlobalValues;
    textWrap?: CSSTextWrap;
    textWrapMode?: "wrap" | "nowrap" | CSSGlobalValues;
    textWrapStyle?: "auto" | "balance" | "pretty" | "stable" | CSSGlobalValues;
    whiteSpaceCollapse?: "collapse" | "preserve" | "preserve-breaks" | "preserve-spaces" | "break-spaces" | CSSGlobalValues;
    lineBreak?: "auto" | "loose" | "normal" | "strict" | "anywhere" | CSSGlobalValues;
    hyphens?: CSSHyphens;
    hyphenateCharacter?: "auto" | CSSGlobalValues | (string & {});
    textUnderlineOffset?: CSSLength;
    textUnderlinePosition?: "auto" | "from-font" | "under" | "left" | "right" | CSSGlobalValues | (string & {});
    textDecorationSkipInk?: "auto" | "none" | "all" | CSSGlobalValues;
    textRendering?: "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision" | CSSGlobalValues;
    /** Bare numbers are a count of spaces (unitless), not pixels */
    tabSize?: number | CSSLength;
    /** Bare numbers are a line count */
    lineClamp?: "none" | number | `${number}` | CSSGlobalValues;
    /** Bare numbers are a line count. Pair with `display: "-webkit-box"` and `webkitBoxOrient: "vertical"`. */
    webkitLineClamp?: "none" | number | `${number}` | CSSGlobalValues;

    // Writing modes & bidi
    writingMode?: CSSWritingMode;
    direction?: "ltr" | "rtl" | CSSGlobalValues;
    textOrientation?: "mixed" | "upright" | "sideways" | CSSGlobalValues;
    unicodeBidi?: "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext" | CSSGlobalValues;
    textCombineUpright?: "none" | "all" | CSSGlobalValues | (string & {});

    // Font features
    fontKerning?: "auto" | "normal" | "none" | CSSGlobalValues;
    fontOpticalSizing?: "auto" | "none" | CSSGlobalValues;
    fontStretch?:
        | "normal" | "ultra-condensed" | "extra-condensed" | "condensed" | "semi-condensed"
        | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded"
        | `${number}%` | CSSGlobalValues;
    /** Bare numbers are a unitless ratio */
    fontSizeAdjust?: "none" | number | CSSGlobalValues | (string & {});
    fontFeatureSettings?: CSSFontSettings;
    fontVariationSettings?: CSSFontSettings;
    fontVariantNumeric?:
        | "normal" | "lining-nums" | "oldstyle-nums" | "proportional-nums" | "tabular-nums"
        | "diagonal-fractions" | "stacked-fractions" | "ordinal" | "slashed-zero"
        | CSSGlobalValues | (string & {});
    fontVariantCaps?:
        | "normal" | "small-caps" | "all-small-caps" | "petite-caps" | "all-petite-caps"
        | "unicase" | "titling-caps" | CSSGlobalValues;
    fontVariantLigatures?:
        | "normal" | "none" | "common-ligatures" | "no-common-ligatures"
        | "discretionary-ligatures" | "no-discretionary-ligatures" | "contextual" | "no-contextual"
        | CSSGlobalValues | (string & {});
    fontSynthesis?: "none" | "weight" | "style" | "small-caps" | "position" | CSSGlobalValues | (string & {});

    content?: string;
    quotes?: string;
    counterIncrement?: string;
    counterReset?: string;
}
