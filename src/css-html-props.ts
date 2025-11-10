import type { Reactive } from "./reactivity";

/**
 * The plain object that our CSS functions return.
 */
export type StyleRule = {
  prop: string;
  value: Reactive<string | number>;
  unit?: "px";
};

// Helper for properties that take a simple string/number (color, zIndex)
const s =
  (prop: string) =>
  (value: Reactive<string | number>): StyleRule => ({
    prop,
    value,
  });

// Helper for properties that should get 'px' units (width, margin)
const px =
  (prop: string) =>
  (value: Reactive<string | number>): StyleRule => ({
    prop,
    value,
    unit: "px",
  });

// --- Typography & Text ---
export const color = s("color");
export const direction = s("direction");
export const fontFamily = s("fontFamily");
export const fontSize = px("fontSize");
export const fontWeight = s("fontWeight");
export const fontStyle = s("fontStyle");
export const fontVariant = s("fontVariant");
export const letterSpacing = px("letterSpacing");
export const lineHeight = s("lineHeight");
export const textAlign = s("textAlign");
export const textDecoration = s("textDecoration");
export const textIndent = px("textIndent");
export const textTransform = s("textTransform");
export const whiteSpace = s("whiteSpace");
export const wordSpacing = px("wordSpacing");

// --- Box Model ---
export const margin = px("margin");
export const marginTop = px("marginTop");
export const marginRight = px("marginRight");
export const marginBottom = px("marginBottom");
export const marginLeft = px("marginLeft");
export const padding = px("padding");
export const paddingTop = px("paddingTop");
export const paddingRight = px("paddingRight");
export const paddingBottom = px("paddingBottom");
export const paddingLeft = px("paddingLeft");
export const width = px("width");
export const minWidth = px("minWidth");
export const maxWidth = px("maxWidth");
export const height = px("height");
export const minHeight = px("minHeight");
export const maxHeight = px("maxHeight");

// --- Layout (Positioning & Display) ---
export const display = s("display");
export const position = s("position");
export const top = px("top");
export const right = px("right");
export const bottom = px("bottom");
export const left = px("left");
export const zIndex = s("zIndex");
export const overflow = s("overflow");
export const overflowX = s("overflowX");
export const overflowY = s("overflowY");
export const float = s("float");
export const clear = s("clear");
export const visibility = s("visibility");

// --- Background & Borders ---
export const background = s("background");
export const backgroundColor = s("backgroundColor");
export const backgroundImage = s("backgroundImage");
export const backgroundPosition = s("backgroundPosition");
export const backgroundRepeat = s("backgroundRepeat");
export const backgroundSize = s("backgroundSize");
export const border = s("border");
export const borderWidth = px("borderWidth");
export const borderColor = s("borderColor");
export const borderStyle = s("borderStyle");
export const borderRadius = px("borderRadius");
export const borderTop = s("borderTop");
export const borderRight = s("borderRight");
export const borderBottom = s("borderBottom");
export const borderLeft = s("borderLeft");
export const outline = s("outline");
export const boxShadow = s("boxShadow");

// --- Flexbox ---
export const flexDirection = s("flexDirection");
export const flexWrap = s("flexWrap");
export const flexFlow = s("flexFlow");
export const justifyContent = s("justifyContent");
export const alignItems = s("alignItems");
export const alignContent = s("alignContent");
export const flex = s("flex");
export const flexGrow = s("flexGrow");
export const flexShrink = s("flexShrink");
export const flexBasis = px("flexBasis");
export const order = s("order");
export const alignSelf = s("alignSelf");

// --- Grid ---
export const grid = s("grid");
export const gridTemplate = s("gridTemplate");
export const gridTemplateColumns = s("gridTemplateColumns");
export const gridTemplateRows = s("gridTemplateRows");
export const gridTemplateAreas = s("gridTemplateAreas");
export const gridAutoColumns = s("gridAutoColumns");
export const gridAutoRows = s("gridAutoRows");
export const gridAutoFlow = s("gridAutoFlow");
export const gridGap = px("gridGap");
export const gridColumnGap = px("gridColumnGap");
export const gridRowGap = px("gridRowGap");
export const gridColumn = s("gridColumn");
export const gridColumnStart = s("gridColumnStart");
export const gridColumnEnd = s("gridColumnEnd");
export const gridRow = s("gridRow");
export const gridRowStart = s("gridRowStart");
export const gridRowEnd = s("gridRowEnd");
export const gridArea = s("gridArea");

// ---  Other ---
export const opacity = s("opacity");
export const cursor = s("cursor");

// --- Animation & Transitions ---
export const transition = s("transition");
export const transitionProperty = s("transitionProperty");
export const transitionDuration = s("transitionDuration");
export const transitionTimingFunction = s("transitionTimingFunction");
export const transitionDelay = s("transitionDelay");

export const animation = s("animation");
export const animationName = s("animationName");
export const animationDuration = s("animationDuration");
export const animationTimingFunction = s("animationTimingFunction");
export const animationDelay = s("animationDelay");
export const animationIterationCount = s("animationIterationCount");
export const animationDirection = s("animationDirection");
export const animationFillMode = s("animationFillMode");
export const animationPlayState = s("animationPlayState");

export const transform = s("transform");
export const transformOrigin = s("transformOrigin");
export const transformStyle = s("transformStyle");
export const perspective = px("perspective");
export const perspectiveOrigin = s("perspectiveOrigin");
export const backfaceVisibility = s("backfaceVisibility");
