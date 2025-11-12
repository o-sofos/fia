import type { Reactive } from "./reactivity";

/**
 * The plain object that our CSS functions return.
 */
export type StyleRule = {
  prop: string;
  value: Reactive<string | number>;
  unit?: "px";
};

// --- 1. Type Definitions ---

type Length = string | number;
type Keyword = "auto" | "inherit" | "initial" | "unset";

type DisplayValue =
  | "block"
  | "inline"
  | "inline-block"
  | "flex"
  | "inline-flex"
  | "grid"
  | "inline-grid"
  | "flow-root"
  | "none"
  | "contents"
  | "list-item";

type PositionValue = "static" | "relative" | "absolute" | "fixed" | "sticky";

type FlexDirectionValue = "row" | "row-reverse" | "column" | "column-reverse";
type FlexWrapValue = "nowrap" | "wrap" | "wrap-reverse";
type JustifyContentValue =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type AlignItemsValue =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline";

type TextAlignValue = "left" | "right" | "center" | "justify";
type FontStyleValue = "normal" | "italic" | "oblique";
type FontWeightValue =
  | "normal"
  | "bold"
  | "lighter"
  | "bolder"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

// --- 2. Helper Functions ---

/** Helper for properties that take a simple string or number (e.g., color, zIndex, fontWeight) */
const s =
  (prop: string) =>
  (value: Reactive<string | number>): StyleRule => ({
    prop,
    value,
  });

/** Helper for properties that only accept specific keywords */
const k =
  <T extends string | number>(prop: string) =>
  (value: Reactive<T | Keyword>): StyleRule => ({
    prop,
    value: value as Reactive<string | number>,
  });

/** Helper for properties that should get 'px' units OR keywords OR a full string */
const px =
  (prop: string) =>
  (value: Reactive<Length | Keyword>): StyleRule => ({
    prop,
    value,
    // Only apply 'px' unit if it's a non-zero number
    unit: typeof value === "number" && value !== 0 ? "px" : undefined,
  });

/** Helper for complex, multi-value string properties (e.g., '1px solid red') */
const multi =
  (prop: string) =>
  (...args: (string | number)[]): StyleRule => ({
    prop,
    value: args.join(" "), // Joins args, e.g., (1, 'solid', 'red') -> "1 solid red"
    unit: undefined, // Assumes units are in the args
  });

// --- 3. Strongly-Typed Properties ---

// --- Typography & Text ---
/** Sets the CSS `color` property. */
export const color = s("color");
/** Sets the CSS `direction` property. */
export const direction = k<"ltr" | "rtl">("direction");
/** Sets the CSS `fontFamily` property. */
export const fontFamily = s("fontFamily");
/** Sets the CSS `fontSize` property. Auto-applies 'px' to numbers. */
export const fontSize = px("fontSize");
/** Sets the CSS `fontWeight` property. */
export const fontWeight = k<FontWeightValue>("fontWeight");
/** Sets the CSS `fontStyle` property. */
export const fontStyle = k<FontStyleValue>("fontStyle");
/** Sets the CSS `fontVariant` property. */
export const fontVariant = s("fontVariant");
/** Sets the CSS `letterSpacing` property. Auto-applies 'px' to numbers. */
export const letterSpacing = px("letterSpacing");
/** Sets the CSS `lineHeight` property. */
export const lineHeight = s("lineHeight"); // Unitless or string
/** Sets the CSS `textAlign` property. */
export const textAlign = k<TextAlignValue>("textAlign");
/** Sets the CSS `textDecoration` property. */
export const textDecoration = s("textDecoration");
/** Sets the CSS `textIndent` property. Auto-applies 'px' to numbers. */
export const textIndent = px("textIndent");
/** Sets the CSS `textTransform` property. */
export const textTransform = k<
  "none" | "capitalize" | "uppercase" | "lowercase"
>("textTransform");
/** Sets the CSS `whiteSpace` property. */
export const whiteSpace = k<
  "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line"
>("whiteSpace");
/** Sets the CSS `wordSpacing` property. Auto-applies 'px' to numbers. */
export const wordSpacing = px("wordSpacing");

// --- Box Model ---
/** Sets the CSS `margin` property. Pass a number (for px) or a full string (e.g., '10px 20px'). */
export const margin = px("margin"); //  FIX: Use 'px'
/** Sets the CSS `marginTop` property. Auto-applies 'px' to numbers. */
export const marginTop = px("marginTop");
/** Sets the CSS `marginRight` property. Auto-applies 'px' to numbers. */
export const marginRight = px("marginRight");
/** Sets the CSS `marginBottom` property. Auto-applies 'px' to numbers. */
export const marginBottom = px("marginBottom");
/** Sets the CSS `marginLeft` property. Auto-applies 'px' to numbers. */
export const marginLeft = px("marginLeft");
/** Sets the CSS `padding` property. Pass a number (for px) or a full string (e.g., '10px 20px'). */
export const padding = px("padding"); //  FIX: Use 'px'
/** Sets the CSS `paddingTop` property. Auto-applies 'px' to numbers. */
export const paddingTop = px("paddingTop");
/** Sets the CSS `paddingRight` property. Auto-applies 'px' to numbers. */
export const paddingRight = px("paddingRight");
/** Sets the CSS `paddingBottom` property. Auto-applies 'px' to numbers. */
export const paddingBottom = px("paddingBottom");
/** Sets the CSS `paddingLeft` property. Auto-applies 'px' to numbers. */
export const paddingLeft = px("paddingLeft");
/** Sets the CSS `width` property. Auto-applies 'px' to numbers. */
export const width = px("width");
/** Sets the CSS `minWidth` property. Auto-applies 'px' to numbers. */
export const minWidth = px("minWidth");
/** Sets the CSS `maxWidth` property. Auto-applies 'px' to numbers. */
export const maxWidth = px("maxWidth");
/** Sets the CSS `height` property. Auto-applies 'px' to numbers. */
export const height = px("height");
/** Sets the CSS `minHeight` property. Auto-applies 'px' to numbers. */
export const minHeight = px("minHeight");
/** Sets the CSS `maxHeight` property. Auto-applies 'px' to numbers. */
export const maxHeight = px("maxHeight");

// --- Layout (Positioning & Display) ---
/** Sets the CSS `display` property. */
export const display = k<DisplayValue>("display");
/** Sets the CSS `position` property. */
export const position = k<PositionValue>("position");
/** Sets the CSS `top` property. Auto-applies 'px' to numbers. */
export const top = px("top");
/** Sets the CSS `right` property. Auto-applies 'px' to numbers. */
export const right = px("right");
/** Sets the CSS `bottom` property. Auto-applies 'px' to numbers. */
export const bottom = px("bottom");
/** Sets the CSS `left` property. Auto-applies 'px' to numbers. */
export const left = px("left");
/** Sets the CSS `zIndex` property. */
export const zIndex = s("zIndex");
/** Sets the CSS `overflow` property. */
export const overflow = k<"visible" | "hidden" | "scroll" | "auto">("overflow");
/** Sets the CSS `overflowX` property. */
export const overflowX = k<"visible" | "hidden" | "scroll" | "auto">(
  "overflowX"
);
/** Sets the CSS `overflowY` property. */
export const overflowY = k<"visible" | "hidden" | "scroll" | "auto">(
  "overflowY"
);
/** Sets the CSS `float` property. */
export const float = k<"left" | "right" | "none">("float");
/** Sets the CSS `clear` property. */
export const clear = k<"none" | "left" | "right" | "both">("clear");
/** Sets the CSS `visibility` property. */
export const visibility = k<"visible" | "hidden" | "collapse">("visibility");

// --- Background & Borders ---
/** Sets the CSS `background` property. */
export const background = s("background");
/** Sets the CSS `backgroundColor` property. */
export const backgroundColor = s("backgroundColor");
/** Sets the CSS `backgroundImage` property. */
export const backgroundImage = s("backgroundImage");
/** Sets the CSS `backgroundPosition` property. */
export const backgroundPosition = s("backgroundPosition");
/** Sets the CSS `backgroundRepeat` property. */
export const backgroundRepeat = s("backgroundRepeat");
/** Sets the CSS `backgroundSize` property. */
export const backgroundSize = s("backgroundSize");
/** Sets the CSS `border` property. (e.g., border('1px solid red')) */
export const border = multi("border");
/** Sets the CSS `borderWidth` property. Auto-applies 'px' to numbers. */
export const borderWidth = px("borderWidth");
/** Sets the CSS `borderColor` property. */
export const borderColor = s("borderColor");
/** Sets the CSS `borderStyle` property. */
export const borderStyle = s("borderStyle");
/** Sets the CSS `borderRadius` property. Auto-applies 'px' to numbers. */
export const borderRadius = px("borderRadius");
/** Sets the CSS `borderTop` property. (e.g., borderTop('1px solid red')) */
export const borderTop = multi("borderTop");
/** Sets the CSS `borderRight` property. (e.g., borderRight('1px solid red')) */
export const borderRight = multi("borderRight");
/** Sets the CSS `borderBottom` property. (e.g., borderBottom('1px solid red')) */
export const borderBottom = multi("borderBottom");
/** Sets the CSS `borderLeft` property. (e.g., borderLeft('1px solid red')) */
export const borderLeft = multi("borderLeft");
/** Sets the CSS `outline` property. */
export const outline = s("outline");
/** Sets the CSS `boxShadow` property. */
export const boxShadow = s("boxShadow");

// --- Flexbox ---
/** Sets the CSS `flexDirection` property. */
export const flexDirection = k<FlexDirectionValue>("flexDirection");
/** Sets the CSS `flexWrap` property. */
export const flexWrap = k<FlexWrapValue>("flexWrap");
/** Sets the CSS `flexFlow` property. */
export const flexFlow = s("flexFlow");
/** Sets the CSS `justifyContent` property. */
export const justifyContent = k<JustifyContentValue>("justifyContent");
/** Sets the CSS `alignItems` property. */
export const alignItems = k<AlignItemsValue>("alignItems");
/** Sets the CSS `alignContent` property. */
export const alignContent = k<JustifyContentValue>("alignContent");
/** Sets the CSS `flex` property. */
export const flex = s("flex");
/** Sets the CSS `flexGrow` property. */
export const flexGrow = s("flexGrow");
/** Sets the CSS `flexShrink` property. */
export const flexShrink = s("flexShrink");
/** Sets the CSS `flexBasis` property. Auto-applies 'px' to numbers. */
export const flexBasis = px("flexBasis");
/** Sets the CSS `order` property. */
export const order = s("order");
/** Sets the CSS `alignSelf` property. */
export const alignSelf = k<AlignItemsValue | "auto">("alignSelf");

// --- Grid ---
// (Grid properties are complex strings, so 's' is best)
/** Sets the CSS `grid` property. */
export const grid = s("grid");
/** Sets the CSS `gridTemplate` property. */
export const gridTemplate = s("gridTemplate");
/** Sets the CSS `gridTemplateColumns` property. */
export const gridTemplateColumns = s("gridTemplateColumns");
/** Sets the CSS `gridTemplateRows` property. */
export const gridTemplateRows = s("gridTemplateRows"); //  FIX: Typo 'sB'
/** Sets the CSS `gridTemplateAreas` property. */
export const gridTemplateAreas = s("gridTemplateAreas");
/** Sets the CSS `gridAutoColumns` property. */
export const gridAutoColumns = s("gridAutoColumns");
/** Sets the CSS `gridAutoRows` property. */
export const gridAutoRows = s("gridAutoRows");
/** Sets the CSS `gridAutoFlow` property. */
export const gridAutoFlow = s("gridAutoFlow");
/** Sets the CSS `gap` property. Auto-applies 'px' to numbers. */
export const gap = px("gap");
/** Sets the CSS `gridGap` property (legacy). Auto-applies 'px' to numbers. */
export const gridGap = px("gridGap");
/** Sets the CSS `gridColumnGap` property. Auto-applies 'px' to numbers. */
export const gridColumnGap = px("gridColumnGap");
/** Sets the CSS `gridRowGap` property. Auto-applies 'px' to numbers. */
export const gridRowGap = px("gridRowGap");
/** Sets the CSS `gridColumn` property. */
export const gridColumn = s("gridColumn");
/** Sets the CSS `gridColumnStart` property. */
export const gridColumnStart = s("gridColumnStart");
/** Sets the CSS `gridColumnEnd` property. */
export const gridColumnEnd = s("gridColumnEnd");
/** Sets the CSS `gridRow` property. */
export const gridRow = s("gridRow");
/** Sets the CSS `gridRowStart` property. */
export const gridRowStart = s("gridRowStart");
/** Sets the CSS `gridRowEnd` property. */
export const gridRowEnd = s("gridRowEnd");
/** Sets the CSS `gridArea` property. */
export const gridArea = s("gridArea");

// --- Other ---
/** Sets the CSS `opacity` property. */
export const opacity = s("opacity");
/** Sets the CSS `cursor` property. */
export const cursor = k<
  "auto" | "default" | "pointer" | "wait" | "text" | "move" | "not-allowed"
>("cursor");

// --- Animation & Transitions ---
// (These are complex strings, 's' is best)
/** Sets the CSS `transition` property. */
export const transition = s("transition");
/** Sets the CSS `transitionProperty` property. */
export const transitionProperty = s("transitionProperty");
/** Sets the CSS `transitionDuration` property. */
export const transitionDuration = s("transitionDuration");
/** Sets the CSS `transitionTimingFunction` property. */
export const transitionTimingFunction = s("transitionTimingFunction");
/** Sets the CSS `transitionDelay` property. */
export const transitionDelay = s("transitionDelay");
/** Sets the CSS `animation` property. */
export const animation = s("animation");
/** Sets the CSS `animationName` property. */
export const animationName = s("animationName");
/** Sets the CSS `animationDuration` property. */
export const animationDuration = s("animationDuration");
/** Sets the CSS `animationTimingFunction` property. */
export const animationTimingFunction = s("animationTimingFunction");
/** Sets the CSS `animationDelay` property. */
export const animationDelay = s("animationDelay");
/** Sets the CSS `animationIterationCount` property. */
export const animationIterationCount = s("animationIterationCount");
/** Sets the CSS `animationDirection` property. */
export const animationDirection = s("animationDirection");
/** Sets the CSS `animationFillMode` property. */
export const animationFillMode = s("animationFillMode");
/** Sets the CSS `animationPlayState` property. */
export const animationPlayState = s("animationPlayState");
/** Sets the CSS `transform` property. */
export const transform = s("transform");
/** Sets the CSS `transformOrigin` property. */
export const transformOrigin = s("transformOrigin");
/** Sets the CSS `transformStyle` property. */
export const transformStyle = s("transformStyle");
/** Sets the CSS `perspective` property. Auto-applies 'px' to numbers. */
export const perspective = px("perspective");
/** Sets the CSS `perspectiveOrigin` property. */
export const perspectiveOrigin = s("perspectiveOrigin");
/** Sets the CSS `backfaceVisibility` property. */
export const backfaceVisibility = k<"visible" | "hidden">("backfaceVisibility");
