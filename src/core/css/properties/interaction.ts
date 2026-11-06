import type { CSSGlobalValues } from "./common.ts";
import type { CSSLength } from "./units.ts";

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

export type CSSResize = "none" | "both" | "horizontal" | "vertical" | "block" | "inline" | CSSGlobalValues;

export type CSSOverscrollBehavior = "auto" | "contain" | "none" | CSSGlobalValues;

type CSSScrollSnapAxis = "x" | "y" | "block" | "inline" | "both";
export type CSSScrollSnapType =
    | "none"
    | CSSScrollSnapAxis
    | `${CSSScrollSnapAxis} ${"mandatory" | "proximity"}`
    | CSSGlobalValues;

type CSSScrollSnapPosition = "none" | "start" | "end" | "center";
export type CSSScrollSnapAlign =
    | CSSScrollSnapPosition
    | `${CSSScrollSnapPosition} ${CSSScrollSnapPosition}`
    | CSSGlobalValues;

export interface InteractionProperties {
    cursor?: CSSCursor;
    pointerEvents?: CSSPointerEvents;
    userSelect?: CSSUserSelect;
    resize?: CSSResize;
    touchAction?: "auto" | "none" | "pan-x" | "pan-y" | "manipulation" | "pinch-zoom" | CSSGlobalValues | (string & {});
    scrollBehavior?: "auto" | "smooth" | CSSGlobalValues;
    scrollMargin?: CSSLength;
    scrollMarginTop?: CSSLength;
    scrollMarginRight?: CSSLength;
    scrollMarginBottom?: CSSLength;
    scrollMarginLeft?: CSSLength;
    scrollMarginBlock?: CSSLength;
    scrollMarginBlockStart?: CSSLength;
    scrollMarginBlockEnd?: CSSLength;
    scrollMarginInline?: CSSLength;
    scrollMarginInlineStart?: CSSLength;
    scrollMarginInlineEnd?: CSSLength;
    scrollPadding?: CSSLength;
    scrollPaddingTop?: CSSLength;
    scrollPaddingRight?: CSSLength;
    scrollPaddingBottom?: CSSLength;
    scrollPaddingLeft?: CSSLength;
    scrollPaddingBlock?: CSSLength;
    scrollPaddingBlockStart?: CSSLength;
    scrollPaddingBlockEnd?: CSSLength;
    scrollPaddingInline?: CSSLength;
    scrollPaddingInlineStart?: CSSLength;
    scrollPaddingInlineEnd?: CSSLength;
    scrollSnapType?: CSSScrollSnapType;
    scrollSnapAlign?: CSSScrollSnapAlign;
    scrollSnapStop?: "normal" | "always" | CSSGlobalValues;
    overscrollBehavior?: CSSOverscrollBehavior | `${CSSOverscrollBehavior} ${CSSOverscrollBehavior}`;
    overscrollBehaviorX?: CSSOverscrollBehavior;
    overscrollBehaviorY?: CSSOverscrollBehavior;
    overscrollBehaviorBlock?: CSSOverscrollBehavior;
    overscrollBehaviorInline?: CSSOverscrollBehavior;
    scrollbarWidth?: "auto" | "thin" | "none" | CSSGlobalValues;
    scrollbarGutter?: "auto" | "stable" | "stable both-edges" | CSSGlobalValues;
    /** `auto`, or `<thumb-color> <track-color>` */
    scrollbarColor?: "auto" | CSSGlobalValues | (string & {});
}

export interface TableProperties {
    tableLayout?: "auto" | "fixed" | CSSGlobalValues;
    captionSide?: "top" | "bottom" | CSSGlobalValues;
    emptyCells?: "show" | "hide" | CSSGlobalValues;
}
