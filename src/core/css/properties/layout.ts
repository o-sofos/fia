import type { CSSGlobalValues } from "./common";
import type { CSSLength, CSSZIndex } from "./units";

export type CSSDisplay =
    | "block" | "inline" | "inline-block" | "flex" | "inline-flex"
    | "grid" | "inline-grid" | "flow-root" | "none" | "contents"
    | "table" | "table-row" | "table-cell" | "table-column" | "table-column-group"
    | "table-footer-group" | "table-header-group" | "table-row-group" | "table-caption"
    | "list-item" | "run-in"
    | CSSGlobalValues;

export type CSSPosition = "static" | "relative" | "absolute" | "fixed" | "sticky" | CSSGlobalValues;

export type CSSOverflow = "visible" | "hidden" | "clip" | "scroll" | "auto" | CSSGlobalValues;

export type CSSFloat = "left" | "right" | "none" | "inline-start" | "inline-end" | CSSGlobalValues;

export type CSSClear = "none" | "left" | "right" | "both" | "inline-start" | "inline-end" | CSSGlobalValues;

export type CSSVisibility = "visible" | "hidden" | "collapse" | CSSGlobalValues;

export interface LayoutProperties {
    display?: CSSDisplay;
    position?: CSSPosition;
    top?: CSSLength;
    right?: CSSLength;
    bottom?: CSSLength;
    left?: CSSLength;
    zIndex?: CSSZIndex;
    float?: CSSFloat;
    clear?: CSSClear;
    visibility?: CSSVisibility;
    overflow?: CSSOverflow;
    overflowX?: CSSOverflow;
    overflowY?: CSSOverflow;
    isolation?: "auto" | "isolate" | CSSGlobalValues;
    aspectRatio?: "auto" | string | number | CSSGlobalValues;
}

// Re-export ZIndex from here as it's layout related, even if base type in units/common
export type { CSSZIndex };
