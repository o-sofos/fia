import type { CSSGlobalValues } from "./common";
import type { CSSLength } from "./units";

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

export type CSSFlexBasis = "auto" | "content" | "fit-content" | "max-content" | "min-content" | CSSGlobalValues | (string & {});

export type CSSFlexGrowShrink = CSSGlobalValues | number | (string & {});

export type CSSOrder = CSSGlobalValues | number;

export type CSSGap = "normal" | CSSGlobalValues | (string & {});

export type CSSGridAutoFlow = "row" | "column" | "dense" | "row dense" | "column dense" | CSSGlobalValues;

export type CSSGridTemplate = "none" | "auto" | "max-content" | "min-content" | CSSGlobalValues | (string & {});

export type CSSPlaceItems = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "baseline" | CSSGlobalValues | (string & {});

export type CSSPlaceContent = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | CSSGlobalValues | (string & {});

export type CSSPlaceSelf = "auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "baseline" | CSSGlobalValues | (string & {});

export interface FlexGridProperties {
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

    // Columns (Multi-column layout) - putting here as it relates to layout distribution
    columns?: string;
    columnCount?: "auto" | number | CSSGlobalValues;
    columnWidth?: CSSLength;
    columnRule?: string;
    columnRuleWidth?: CSSLength;
    columnRuleStyle?: CSSGlobalValues | string; // Will refine if needed, visual types are in visual.ts
    columnRuleColor?: CSSGlobalValues | string; // Visual types import issue otherwise
    columnSpan?: "none" | "all" | CSSGlobalValues;
    columnFill?: "auto" | "balance" | CSSGlobalValues;
}
