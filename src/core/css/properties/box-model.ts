import type { CSSGlobalValues } from "./common";
import type { CSSLength } from "./units";

export type CSSBoxSizing = "content-box" | "border-box" | CSSGlobalValues;

export interface BoxModelProperties {
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
}
