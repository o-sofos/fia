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

    content?: string;
    quotes?: string;
    counterIncrement?: string;
    counterReset?: string;
}
