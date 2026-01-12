/**
 * Flick Element Functions
 *
 * Factory functions for all HTML elements that auto-mount to parent context.
 * Full TypeScript autocomplete with strict attribute types.
 * 
 * Unified API - all elements follow the same pattern.
 * 
 * Overloads:
 * 1. element()
 * 2. element(content)
 * 3. element(props)
 * 4. element(children)
 * 5. element(props, children)
 * 6. element(content, props)
 * 7. element(content, children)
 * 8. element(content, props, children)
 */

import { pushExecutionContext, popExecutionContext, getCurrentExecutionContext } from "./context";
import { effect, type Signal } from "./reactivity";



// =============================================================================
// TYPE UTILITIES
// =============================================================================

/**
 * Checks if a value is a Signal.
 * @param value - The value to check
 * @returns True if the value is a Signal
 */
export function isSignal(value: unknown): value is Signal<unknown> {
  if (value === null || value === undefined) return false;
  if (typeof value !== "function") return false;
  const descriptor = Object.getOwnPropertyDescriptor(value, "value");
  return descriptor !== undefined && descriptor.get !== undefined;
}

/**
 * A value that can be either a static value `T` or a `Signal<T>`.
 * Used for reactive properties and content.
 */
export type MaybeSignal<T> = T | Signal<T>;

export type Renderable = string | number | boolean | null | undefined;

/** Children callback - receives element reference, creates children inside */
type ChildrenCallback<E extends HTMLElement> = (el: E) => void;

export type Child =
  | string
  | number
  | boolean
  | Signal<Renderable>
  | (() => void)
  | HTMLElement
  | Child[]
  | null
  | undefined;

// =============================================================================
// STRICT ATTRIBUTE TYPES
// =============================================================================

type InputMode = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

type AutoCapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";

type EnterKeyHint = "enter" | "done" | "go" | "next" | "previous" | "search" | "send";



type FormMethod = "get" | "post" | "dialog";

type FormEnctype = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";

type CrossOrigin = "anonymous" | "use-credentials" | "";

type Decoding = "sync" | "async" | "auto";

type Loading = "eager" | "lazy";

type FetchPriority = "high" | "low" | "auto";

type Preload = "none" | "metadata" | "auto" | "";

type ReferrerPolicy =
  | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin"
  | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | "";

type Target = "_self" | "_blank" | "_parent" | "_top" | (string & {});

type Dir = "ltr" | "rtl" | "auto";

type Wrap = "soft" | "hard";

type ThScope = "row" | "col" | "rowgroup" | "colgroup";

type Autocomplete =
  | "off" | "on" | "name" | "email" | "username" | "new-password" | "current-password"
  | "one-time-code" | "organization" | "street-address" | "country" | "country-name"
  | "postal-code" | "cc-name" | "cc-number" | "cc-exp" | "cc-csc" | "tel" | "url"
  | (string & {});

type TrackKind = "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";

type LinkAs = "audio" | "document" | "embed" | "fetch" | "font" | "image" | "object" | "script" | "style" | "track" | "video" | "worker";

type HttpEquiv = "content-type" | "default-style" | "refresh" | "x-ua-compatible" | "content-security-policy";

type AreaShape = "rect" | "circle" | "poly" | "default";

type Sandbox =
  | "allow-downloads" | "allow-forms" | "allow-modals" | "allow-orientation-lock"
  | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox"
  | "allow-presentation" | "allow-same-origin" | "allow-scripts"
  | "allow-top-navigation" | "allow-top-navigation-by-user-activation"
  | "allow-top-navigation-to-custom-protocols"
  | (string & {});

// =============================================================================
// STRICT CSS TYPES
// =============================================================================

type CSSGlobalValues = "inherit" | "initial" | "revert" | "revert-layer" | "unset";

type CSSDisplay =
  | "block" | "inline" | "inline-block" | "flex" | "inline-flex"
  | "grid" | "inline-grid" | "flow-root" | "none" | "contents"
  | "table" | "table-row" | "table-cell" | "table-column" | "table-column-group"
  | "table-footer-group" | "table-header-group" | "table-row-group" | "table-caption"
  | "list-item" | "run-in"
  | CSSGlobalValues;

type CSSPosition = "static" | "relative" | "absolute" | "fixed" | "sticky" | CSSGlobalValues;

type CSSFlexDirection = "row" | "row-reverse" | "column" | "column-reverse" | CSSGlobalValues;

type CSSFlexWrap = "nowrap" | "wrap" | "wrap-reverse" | CSSGlobalValues;

type CSSJustifyContent =
  | "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
  | "start" | "end" | "left" | "right" | "normal" | "stretch"
  | CSSGlobalValues;

type CSSAlignItems =
  | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
  | "start" | "end" | "self-start" | "self-end" | "normal"
  | CSSGlobalValues;

type CSSAlignContent =
  | "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "stretch"
  | "start" | "end" | "normal" | "baseline"
  | CSSGlobalValues;

type CSSAlignSelf =
  | "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
  | "start" | "end" | "self-start" | "self-end" | "normal"
  | CSSGlobalValues;

type CSSOverflow = "visible" | "hidden" | "clip" | "scroll" | "auto" | CSSGlobalValues;

type CSSVisibility = "visible" | "hidden" | "collapse" | CSSGlobalValues;

type CSSBoxSizing = "content-box" | "border-box" | CSSGlobalValues;

type CSSTextAlign = "left" | "right" | "center" | "justify" | "start" | "end" | "match-parent" | CSSGlobalValues;

type CSSTextDecoration = "none" | "underline" | "overline" | "line-through" | "blink" | CSSGlobalValues | (string & {});

type CSSTextTransform = "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana" | CSSGlobalValues;

type CSSWhiteSpace = "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | "break-spaces" | CSSGlobalValues;

type CSSWordBreak = "normal" | "break-all" | "keep-all" | "break-word" | CSSGlobalValues;

type CSSWordWrap = "normal" | "break-word" | "anywhere" | CSSGlobalValues;

type CSSFontWeight =
  | "normal" | "bold" | "bolder" | "lighter"
  | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
  | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  | CSSGlobalValues;

type CSSFontStyle = "normal" | "italic" | "oblique" | CSSGlobalValues | (string & {});

type CSSCursor =
  | "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" | "wait"
  | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" | "no-drop"
  | "not-allowed" | "grab" | "grabbing" | "all-scroll" | "col-resize" | "row-resize"
  | "n-resize" | "e-resize" | "s-resize" | "w-resize" | "ne-resize" | "nw-resize" | "se-resize" | "sw-resize"
  | "ew-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "zoom-in" | "zoom-out"
  | CSSGlobalValues | (string & {});

type CSSPointerEvents =
  | "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible"
  | "painted" | "fill" | "stroke" | "all"
  | CSSGlobalValues;

type CSSUserSelect = "auto" | "none" | "text" | "all" | "contain" | CSSGlobalValues;

type CSSFloat = "left" | "right" | "none" | "inline-start" | "inline-end" | CSSGlobalValues;

type CSSClear = "none" | "left" | "right" | "both" | "inline-start" | "inline-end" | CSSGlobalValues;

type CSSObjectFit = "contain" | "cover" | "fill" | "none" | "scale-down" | CSSGlobalValues;

type CSSObjectPosition = "top" | "bottom" | "left" | "right" | "center" | CSSGlobalValues | (string & {});

type CSSBackgroundSize = "auto" | "cover" | "contain" | CSSGlobalValues | (string & {});

type CSSBackgroundRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | "space" | "round" | CSSGlobalValues | (string & {});

type CSSBackgroundPosition = "top" | "bottom" | "left" | "right" | "center" | CSSGlobalValues | (string & {});

type CSSBackgroundAttachment = "scroll" | "fixed" | "local" | CSSGlobalValues;

type CSSBackgroundClip = "border-box" | "padding-box" | "content-box" | "text" | CSSGlobalValues;

type CSSBorderStyle = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | CSSGlobalValues;

type CSSListStyleType =
  | "none" | "disc" | "circle" | "square" | "decimal" | "decimal-leading-zero"
  | "lower-roman" | "upper-roman" | "lower-greek" | "lower-latin" | "upper-latin"
  | "armenian" | "georgian" | "lower-alpha" | "upper-alpha"
  | CSSGlobalValues | (string & {});

type CSSListStylePosition = "inside" | "outside" | CSSGlobalValues;

type CSSTransformOrigin = "center" | "top" | "bottom" | "left" | "right" | CSSGlobalValues | (string & {});

type CSSTransitionTimingFunction =
  | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear" | "step-start" | "step-end"
  | CSSGlobalValues | (string & {});

type CSSAnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse" | CSSGlobalValues;

type CSSAnimationFillMode = "none" | "forwards" | "backwards" | "both" | CSSGlobalValues;

type CSSAnimationPlayState = "running" | "paused" | CSSGlobalValues;

type CSSResize = "none" | "both" | "horizontal" | "vertical" | "block" | "inline" | CSSGlobalValues;

type CSSTextOverflow = "clip" | "ellipsis" | CSSGlobalValues | (string & {});

type CSSVerticalAlign =
  | "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom"
  | CSSGlobalValues | (string & {});

type CSSLineHeight = "normal" | CSSGlobalValues | (string & {}) | number;

type CSSLetterSpacing = "normal" | CSSGlobalValues | (string & {});

type CSSZIndex = "auto" | CSSGlobalValues | number | (string & {});

type CSSOpacity = CSSGlobalValues | number | (string & {});

type CSSFlexBasis = "auto" | "content" | "fit-content" | "max-content" | "min-content" | CSSGlobalValues | (string & {});

type CSSFlexGrowShrink = CSSGlobalValues | number | (string & {});

type CSSOrder = CSSGlobalValues | number;

type CSSGap = "normal" | CSSGlobalValues | (string & {});

type CSSGridAutoFlow = "row" | "column" | "dense" | "row dense" | "column dense" | CSSGlobalValues;

type CSSGridTemplate = "none" | "auto" | "max-content" | "min-content" | CSSGlobalValues | (string & {});

type CSSPlaceItems = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "baseline" | CSSGlobalValues | (string & {});

type CSSPlaceContent = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | CSSGlobalValues | (string & {});

type CSSPlaceSelf = "auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "baseline" | CSSGlobalValues | (string & {});

type CSSLength = string | number | CSSGlobalValues;

type CSSColor = string | CSSGlobalValues;

/**
 * Strict CSS properties interface with autocomplete
 */
interface StrictCSSProperties {
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
  transform?: string;
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
  filter?: string;
  backdropFilter?: string;
  mixBlendMode?: string;
  boxShadow?: string;

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
  willChange?: string;
  contain?: string;
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
type ReactiveCSSProperties = {
  [K in keyof StrictCSSProperties]: MaybeSignal<StrictCSSProperties[K]>;
};

// =============================================================================
// EVENT HANDLER TYPES
// =============================================================================

type EventHandlers<E extends Element> = {
  [K in keyof HTMLElementEventMap as `on${K}`]?: (
    this: E,
    event: Omit<HTMLElementEventMap[K], "currentTarget"> & { currentTarget: E }
  ) => void;
};

// =============================================================================
// GLOBAL ATTRIBUTES (shared by all elements)
// =============================================================================

interface GlobalAttributes {
  // Core
  /** Unique identifier for the element. */
  id?: MaybeSignal<string>;
  /** CSS class(es) for the element. Can be a string or an object of { className: boolean }. */
  class?: MaybeSignal<string> | Record<string, MaybeSignal<boolean>>;
  /** Inline CSS styles. Can be a string or an object of strict style properties. */
  style?: MaybeSignal<string> | MaybeSignal<ReactiveCSSProperties>;
  /** Advisory information for the element (tooltip). */
  title?: MaybeSignal<string>;
  /** Language of the element's content. */
  lang?: MaybeSignal<string>;
  /** Text directionality. */
  dir?: MaybeSignal<Dir>;

  // Content
  /** The text content of the element and its descendants. */
  textContent?: MaybeSignal<string | number>;
  /** The rendered text content of the element. */
  innerText?: MaybeSignal<string | number>;

  // Accessibility
  /** ARIA role indicating the semantic purpose of the element. */
  role?: MaybeSignal<string>;
  /** Indicates if the element can take input focus. */
  tabIndex?: MaybeSignal<number>;

  // Editing
  /** Indicates whether the element is editable. */
  contentEditable?: MaybeSignal<"true" | "false" | "plaintext-only">;
  /** Indicates whether spell checking is allowed. */
  spellcheck?: MaybeSignal<boolean>;
  /** Indicates whether the element is draggable. */
  draggable?: MaybeSignal<boolean>;

  // Input hints
  /** Hint for the type of data that might be entered by the user. */
  inputMode?: MaybeSignal<InputMode>;
  /** Hint for the action label (or icon) to present for the enter key on virtual keyboards. */
  enterKeyHint?: MaybeSignal<EnterKeyHint>;
  /** Controls whether and how text input is automatically capitalized. */
  autoCapitalize?: MaybeSignal<AutoCapitalize>;

  // Boolean
  /** Indicates whether the element is not yet, or is no longer, relevant. */
  hidden?: MaybeSignal<boolean | "until-found">;
  /** Indicates that the browser should ignore this section. */
  inert?: MaybeSignal<boolean>;

  // Popover
  /** Designates an element as a popover element. */
  popover?: MaybeSignal<"auto" | "manual">;

  // Security
  nonce?: MaybeSignal<string>;

  // Translation
  translate?: MaybeSignal<"yes" | "no">;

  // Microdata
  itemScope?: MaybeSignal<boolean>;
  itemType?: MaybeSignal<string>;
  itemId?: MaybeSignal<string>;
  itemProp?: MaybeSignal<string>;
  itemRef?: MaybeSignal<string>;

  // Custom element
  is?: MaybeSignal<string>;

  // Part (for shadow DOM styling)
  part?: MaybeSignal<string>;

  // Slot
  slot?: MaybeSignal<string>;

  // Export parts
  exportparts?: MaybeSignal<string>;

  // Anchor positioning (new)
  anchor?: MaybeSignal<string>;
}

type DataAttributes = { [K in `data-${string}`]?: MaybeSignal<string | number | boolean> };
type AriaAttributes = { [K in `aria-${string}`]?: MaybeSignal<string | number | boolean> };

// =============================================================================
// ELEMENT-SPECIFIC ATTRIBUTES
// =============================================================================

/**
 * Base attributes shared by all input types.
 */
interface BaseInputAttrs extends GlobalAttributes {
  /** Name of the form control. Submitted with the form. */
  name?: MaybeSignal<string>;
  /** The control is unavailable for interaction. */
  disabled?: MaybeSignal<boolean>;
  /** ID of the form the element belongs to. */
  form?: MaybeSignal<string>;
  /** Automatically focus the element when the page loads. */
  autofocus?: MaybeSignal<boolean>;
  /** Hint for form autofill feature. */
  autocomplete?: MaybeSignal<Autocomplete>;
  /** ID of a `<datalist>` element. */
  list?: MaybeSignal<string>; // Most support list, except file/hidden/button
}

// Text-like inputs
/**
 * Attributes for text-based inputs (text, password, search, tel, url).
 */
interface InputTextAttrs extends BaseInputAttrs {
  /** Type of the input control. Defaults to "text". */
  type?: MaybeSignal<"text" | "password" | "search" | "tel" | "url">;
  /** Current value of the control. */
  value?: MaybeSignal<string | number>;
  /** Initial value of the control. */
  defaultValue?: MaybeSignal<string>;
  /** Text that appears in the form control when it has no value set. */
  placeholder?: MaybeSignal<string>;
  /** The user cannot edit the value. */
  readOnly?: MaybeSignal<boolean>;
  /** The value is required for form submission. */
  required?: MaybeSignal<boolean>;
  /** Minimum length of value. */
  minLength?: MaybeSignal<number>;
  /** Maximum length of value. */
  maxLength?: MaybeSignal<number>;
  /** Regex pattern the value must match. */
  pattern?: MaybeSignal<string>;
  /** Size of the control. */
  size?: MaybeSignal<number>;
  /** Directionality of the element's text. */
  dirname?: MaybeSignal<string>;
}

/**
 * Attributes for email inputs.
 */
interface InputEmailAttrs extends BaseInputAttrs {
  /** Type of the input control. */
  type: MaybeSignal<"email">;
  /** Current value of the control. */
  value?: MaybeSignal<string>;
  /** Initial value of the control. */
  defaultValue?: MaybeSignal<string>;
  /** Text that appears in the form control when it has no value set. */
  placeholder?: MaybeSignal<string>;
  /** The user cannot edit the value. */
  readOnly?: MaybeSignal<boolean>;
  /** The value is required for form submission. */
  required?: MaybeSignal<boolean>;
  /** Minimum length of value. */
  minLength?: MaybeSignal<number>;
  /** Maximum length of value. */
  maxLength?: MaybeSignal<number>;
  /** Regex pattern the value must match. */
  pattern?: MaybeSignal<string>;
  /** Size of the control. */
  size?: MaybeSignal<number>;
  /** Whether to allow multiple values. */
  multiple?: MaybeSignal<boolean>;
}

// Numeric
/**
 * Attributes for numeric inputs.
 */
interface InputNumberAttrs extends BaseInputAttrs {
  /** Type of the input control. */
  type: MaybeSignal<"number">;
  /** Current value of the control. */
  value?: MaybeSignal<number | string>;
  /** Initial value of the control. */
  defaultValue?: MaybeSignal<number | string>;
  /** Text that appears in the form control when it has no value set. */
  placeholder?: MaybeSignal<string>;
  /** The user cannot edit the value. */
  readOnly?: MaybeSignal<boolean>;
  /** The value is required for form submission. */
  required?: MaybeSignal<boolean>;
  /** Minimum value. */
  min?: MaybeSignal<string | number>;
  /** Maximum value. */
  max?: MaybeSignal<string | number>;
  /** Incremental bounds for numeric values. */
  step?: MaybeSignal<string | number>;
}

/**
 * Attributes for range inputs (sliders).
 */
interface InputRangeAttrs extends BaseInputAttrs {
  /** Type of the input control. */
  type: MaybeSignal<"range">;
  /** Current value of the control. */
  value?: MaybeSignal<number | string>;
  /** Initial value of the control. */
  defaultValue?: MaybeSignal<number | string>;
  /** Minimum value. */
  min?: MaybeSignal<string | number>;
  /** Maximum value. */
  max?: MaybeSignal<string | number>;
  /** Incremental bounds. */
  step?: MaybeSignal<string | number>;
}

// Time/Date
/**
 * Attributes for date and time inputs.
 */
interface InputDateAttrs extends BaseInputAttrs {
  /** Type of the input control. */
  type: MaybeSignal<"date" | "datetime-local" | "month" | "time" | "week">;
  /** Current value of the control. */
  value?: MaybeSignal<string>;
  /** Initial value of the control. */
  defaultValue?: MaybeSignal<string>;
  /** The user cannot edit the value. */
  readOnly?: MaybeSignal<boolean>;
  /** The value is required for form submission. */
  required?: MaybeSignal<boolean>;
  /** Minimum value. */
  min?: MaybeSignal<string>;
  /** Maximum value. */
  max?: MaybeSignal<string>;
  /** Incremental bounds. */
  step?: MaybeSignal<string | number>;
}

// Boolean
/**
 * Attributes for checkbox and radio inputs.
 */
interface InputCheckboxAttrs extends BaseInputAttrs {
  /** Type of the input control. */
  type: MaybeSignal<"checkbox" | "radio">;
  /** Whether the control is checked. */
  checked?: MaybeSignal<boolean>;
  /** The initial checked state. */
  defaultChecked?: MaybeSignal<boolean>;
  /** Visual indeterminate state for checkboxes. */
  indeterminate?: MaybeSignal<boolean>; // Only for checkbox but harmless for radio
  /** The value is required (must be checked). */
  required?: MaybeSignal<boolean>; // Required means "must be checked"
  /** Value submitted when checked. */
  value?: MaybeSignal<string>; // Value submitted when checked
}

// File
/**
 * Attributes for file inputs.
 */
interface InputFileAttrs extends BaseInputAttrs {
  /** Type of the input control. */
  type: MaybeSignal<"file">;
  /** File types accepted by the file upload. */
  accept?: MaybeSignal<string>;
  /** Whether to allow multiple files. */
  multiple?: MaybeSignal<boolean>;
  /** The value is required. */
  required?: MaybeSignal<boolean>;
  /** Media capture source. */
  capture?: MaybeSignal<"user" | "environment" | boolean>;
  /** File input value is uncontrolled/read-only via value prop. */
  value?: never; // Uncontrolled
}

// Color
/**
 * Attributes for color input.
 */
interface InputColorAttrs extends BaseInputAttrs {
  /** Type of the input control. */
  type: MaybeSignal<"color">;
  /** Current value of the control (hex color). */
  value?: MaybeSignal<string>;
  /** Initial value of the control. */
  defaultValue?: MaybeSignal<string>;
}

// Hidden
/**
 * Attributes for hidden input.
 */
interface InputHiddenAttrs extends BaseInputAttrs {
  /** Type of the input control. */
  type: MaybeSignal<"hidden">;
  /** Current value of the control. */
  value?: MaybeSignal<string | number>;
}

// Buttons
/**
 * Attributes for input buttons (submit, reset, button).
 */
interface InputButtonAttrs extends BaseInputAttrs {
  /** Type of the input control. */
  type: MaybeSignal<"submit" | "reset" | "button">;
  /** Button label. */
  value?: MaybeSignal<string>; // Button label
  /** URL for form submission. */
  formAction?: MaybeSignal<string>;
  /** HTTP method for form submission. */
  formMethod?: MaybeSignal<FormMethod>;
  /** Encoding type for form submission. */
  formEnctype?: MaybeSignal<FormEnctype>;
  /** Bypasses form validation. */
  formNoValidate?: MaybeSignal<boolean>;
  /** Browsing context for form submission. */
  formTarget?: MaybeSignal<Target>;
}

/**
 * Attributes for image inputs.
 */
interface InputImageAttrs extends BaseInputAttrs {
  /** Type of the input control. */
  type: MaybeSignal<"image">;
  /** Source URL of the image. */
  src?: MaybeSignal<string>;
  /** Alternate text for the image. */
  alt?: MaybeSignal<string>;
  /** Width of the image. */
  width?: MaybeSignal<number>;
  /** Height of the image. */
  height?: MaybeSignal<number>;
  /** URL for form submission. */
  formAction?: MaybeSignal<string>;
  /** HTTP method for form submission. */
  formMethod?: MaybeSignal<FormMethod>;
  /** Encoding type for form submission. */
  formEnctype?: MaybeSignal<FormEnctype>;
  /** Bypasses form validation. */
  formNoValidate?: MaybeSignal<boolean>;
  /** Browsing context for form submission. */
  formTarget?: MaybeSignal<Target>;
}

/**
 * discriminated Union of all possible Input attribute types.
 * Narrows properties based on the `type` attribute.
 */
type InputAttrs =
  | InputTextAttrs
  | InputEmailAttrs
  | InputNumberAttrs
  | InputRangeAttrs
  | InputDateAttrs
  | InputCheckboxAttrs
  | InputFileAttrs
  | InputColorAttrs
  | InputHiddenAttrs
  | InputButtonAttrs
  | InputImageAttrs;

/**
 * Attributes for textarea elements.
 */
interface TextAreaAttrs extends GlobalAttributes {
  /** Name of the control. */
  name?: MaybeSignal<string>;
  /** Current value of the control. */
  value?: MaybeSignal<string>;
  /** Initial value of the control. */
  defaultValue?: MaybeSignal<string>;
  /** Placeholder text. */
  placeholder?: MaybeSignal<string>;
  /** The control is unavailable for interaction. */
  disabled?: MaybeSignal<boolean>;
  /** The user cannot edit the value. */
  readOnly?: MaybeSignal<boolean>;
  /** The value is required. */
  required?: MaybeSignal<boolean>;
  /** Automatically focus the element when the page loads. */
  autofocus?: MaybeSignal<boolean>;
  /** Hint for form autofill feature. */
  autocomplete?: MaybeSignal<Autocomplete>;
  /** Visible height in text lines. */
  rows?: MaybeSignal<number>;
  /** Visible width in average character widths. */
  cols?: MaybeSignal<number>;
  /** Minimum length of value. */
  minLength?: MaybeSignal<number>;
  /** Maximum length of value. */
  maxLength?: MaybeSignal<number>;
  /** How the text should be wrapped. */
  wrap?: MaybeSignal<Wrap>;
  /** ID of the form the element belongs to. */
  form?: MaybeSignal<string>;
  /** Directionality of the element's text. */
  dirname?: MaybeSignal<string>;
}

/**
 * Attributes for select elements.
 */
interface SelectAttrs extends GlobalAttributes {
  /** Name of the control. */
  name?: MaybeSignal<string>;
  /** The control is unavailable for interaction. */
  disabled?: MaybeSignal<boolean>;
  /** The value is required. */
  required?: MaybeSignal<boolean>;
  /** Automatically focus the element when the page loads. */
  autofocus?: MaybeSignal<boolean>;
  /** Whether to allow multiple values. */
  multiple?: MaybeSignal<boolean>;
  /** Number of visible options. */
  size?: MaybeSignal<number>;
  /** ID of the form the element belongs to. */
  form?: MaybeSignal<string>;
  /** Hint for form autofill feature. */
  autocomplete?: MaybeSignal<Autocomplete>;
}

/**
 * Attributes for option elements.
 */
interface OptionAttrs extends GlobalAttributes {
  /** Value submitted with the form. */
  value?: MaybeSignal<string>;
  /** The option is unavailable for interaction. */
  disabled?: MaybeSignal<boolean>;
  /** Whether the option is selected. */
  selected?: MaybeSignal<boolean>;
  /** Shorter label for the option. */
  label?: MaybeSignal<string>;
}

/**
 * Attributes for optgroup elements.
 */
interface OptgroupAttrs extends GlobalAttributes {
  /** Label for the group of options. */
  label?: MaybeSignal<string>;
  /** The group is unavailable for interaction. */
  disabled?: MaybeSignal<boolean>;
}

/**
 * Attributes for button elements.
 */
interface BaseButtonAttrs extends GlobalAttributes {
  /** Name of the button. Submitted with the form. */
  name?: MaybeSignal<string>;
  /** Value associated with the button. */
  value?: MaybeSignal<string>;
  /** The control is unavailable for interaction. */
  disabled?: MaybeSignal<boolean>;
  /** Automatically focus the element when the page loads. */
  autofocus?: MaybeSignal<boolean>;
  /** ID of the form the element belongs to. */
  form?: MaybeSignal<string>;
  /** ID of the element to control via popover API. */
  popoverTarget?: MaybeSignal<string>;
  /** Action to perform on the popover target. */
  popoverTargetAction?: MaybeSignal<"toggle" | "show" | "hide">;
  /** (Experimental) ID of element this button commands. */
  commandfor?: MaybeSignal<string>;
  /** (Experimental) Command to execute. */
  command?: MaybeSignal<string>;
}

/**
 * Attributes for submit buttons (default).
 */
interface ButtonSubmitAttrs extends BaseButtonAttrs {
  /** The behavior of the button. Defaults to "submit". */
  type?: MaybeSignal<"submit">;
  /** URL for form submission. */
  formAction?: MaybeSignal<string>;
  /** HTTP method for form submission. */
  formMethod?: MaybeSignal<FormMethod>;
  /** Encoding type for form submission. */
  formEnctype?: MaybeSignal<FormEnctype>;
  /** Bypasses form validation. */
  formNoValidate?: MaybeSignal<boolean>;
  /** Browsing context for form submission. */
  formTarget?: MaybeSignal<Target>;
}

/**
 * Attributes for reset and standard buttons.
 */
interface ButtonRestAttrs extends BaseButtonAttrs {
  /** The behavior of the button. */
  type: MaybeSignal<"reset" | "button">;
  // These attributes are not valid on type="button" / "reset"
  formAction?: never;
  formMethod?: never;
  formEnctype?: never;
  formNoValidate?: never;
  formTarget?: never;
}

/**
 * Attributes for button elements.
 * Discriminated union based on `type`.
 */
type ButtonAttrs = ButtonSubmitAttrs | ButtonRestAttrs;

/**
 * Attributes for form elements.
 */
interface FormAttrs extends GlobalAttributes {
  /** URL to use for form submission. */
  action?: MaybeSignal<string>;
  /** HTTP method to use for form submission. */
  method?: MaybeSignal<FormMethod>;
  /** Encoding type to use for form submission. */
  enctype?: MaybeSignal<FormEnctype>;
  /** Browsing context for form submission. */
  target?: MaybeSignal<Target>;
  /** Bypasses form validation. */
  noValidate?: MaybeSignal<boolean>;
  /** Hint for form autofill feature. */
  autocomplete?: MaybeSignal<"on" | "off">;
  /** Name of the form. */
  name?: MaybeSignal<string>;
  /** Character encodings allowed for submission. */
  acceptCharset?: MaybeSignal<string>;
  /** Relationship to the target resource. */
  rel?: MaybeSignal<string>;
}

/**
 * Attributes for label elements.
 */
interface LabelAttrs extends GlobalAttributes {
  /** ID of the element the label is bound to. */
  htmlFor?: MaybeSignal<string>;
  /** Alias for htmlFor. */
  for?: MaybeSignal<string>;
}

/**
 * Attributes for fieldset elements.
 */
interface FieldsetAttrs extends GlobalAttributes {
  /** The group is unavailable for interaction. */
  disabled?: MaybeSignal<boolean>;
  /** ID of the form the element belongs to. */
  form?: MaybeSignal<string>;
  /** Name of the group. */
  name?: MaybeSignal<string>;
}

/**
 * Attributes for output elements.
 */
interface OutputAttrs extends GlobalAttributes {
  /** ID of the element the output is bound to. */
  htmlFor?: MaybeSignal<string>;
  /** Alias for htmlFor. */
  for?: MaybeSignal<string>;
  /** ID of the form the element belongs to. */
  form?: MaybeSignal<string>;
  /** Name of the control. */
  name?: MaybeSignal<string>;
}

/**
 * Attributes for anchor elements.
 */
interface AnchorAttrs extends GlobalAttributes {
  /** URL of the linked resource. */
  href?: MaybeSignal<string>;
  /** Browsing context for the linked resource. */
  target?: MaybeSignal<Target>;
  /** Relationship to the linked resource. */
  rel?: MaybeSignal<string>;
  /** Prompts the user to download the linked resource. */
  download?: MaybeSignal<string | boolean>;
  /** Language of the linked resource. */
  hreflang?: MaybeSignal<string>;
  /** Media type of the linked resource. */
  type?: MaybeSignal<string>;
  /** Referrer policy for fetches initiated by the element. */
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  /** URLs to ping for tracking. */
  ping?: MaybeSignal<string>;
  /** Experimental attribution source. */
  attributionSrc?: MaybeSignal<string>;
}

/**
 * Attributes for image elements.
 */
interface ImgAttrs extends GlobalAttributes {
  /** Source URL of the image. */
  src?: MaybeSignal<string>;
  /** Alternate text for the image. */
  alt?: MaybeSignal<string>;
  /** Intrinsic width of the image. */
  width?: MaybeSignal<number | string>;
  /** Intrinsic height of the image. */
  height?: MaybeSignal<number | string>;
  /** How the browser should load the image. */
  loading?: MaybeSignal<Loading>;
  /** Image decoding hint. */
  decoding?: MaybeSignal<Decoding>;
  /** CORS settings for the image. */
  crossOrigin?: MaybeSignal<CrossOrigin>;
  /** Set of source URLs for responsive display. */
  srcset?: MaybeSignal<string>;
  /** Media conditions for selecting a source. */
  sizes?: MaybeSignal<string>;
  /** Name of an image map to use. */
  useMap?: MaybeSignal<string>;
  /** Whether the image is a server-side image map. */
  isMap?: MaybeSignal<boolean>;
  /** Referrer policy for fetches. */
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  /** Fetch priority hint. */
  fetchPriority?: MaybeSignal<FetchPriority>;
  /** Experimental element timing. */
  elementTiming?: MaybeSignal<string>;
  /** Experimental attribution source. */
  attributionSrc?: MaybeSignal<string>;
}

/**
 * Attributes for video elements.
 */
interface VideoAttrs extends GlobalAttributes {
  /** Source URL of the video. */
  src?: MaybeSignal<string>;
  /** Display width of the video. */
  width?: MaybeSignal<number | string>;
  /** Display height of the video. */
  height?: MaybeSignal<number | string>;
  /** URL of an image to show while downloading. */
  poster?: MaybeSignal<string>;
  /** Hint for how much of the video to preload. */
  preload?: MaybeSignal<Preload>;
  /** Whether to play automatically. */
  autoplay?: MaybeSignal<boolean>;
  /** Whether to loop the video. */
  loop?: MaybeSignal<boolean>;
  /** Whether to mute the audio. */
  muted?: MaybeSignal<boolean>;
  /** Whether to show playback controls. */
  controls?: MaybeSignal<boolean>;
  /** Whether to play inline on mobile. */
  playsInline?: MaybeSignal<boolean>;
  /** CORS settings for valid requests. */
  crossOrigin?: MaybeSignal<CrossOrigin>;
  /** Initial playback position. */
  currentTime?: MaybeSignal<number>;
  /** Audio volume (0.0 to 1.0). */
  volume?: MaybeSignal<number>;
  /** Prevents Picture-in-Picture mode. */
  disablePictureInPicture?: MaybeSignal<boolean>;
  /** Prevents remote playback (casting). */
  disableRemotePlayback?: MaybeSignal<boolean>;
  /** Controls to display/hide (nodownload, nofullscreen, noremoteplayback). */
  controlsList?: MaybeSignal<string>;
}

/**
 * Attributes for audio elements.
 */
interface AudioAttrs extends GlobalAttributes {
  /** Source URL of the audio. */
  src?: MaybeSignal<string>;
  /** Hint for how much of the audio to preload. */
  preload?: MaybeSignal<Preload>;
  /** Whether to play automatically. */
  autoplay?: MaybeSignal<boolean>;
  /** Whether to loop the audio. */
  loop?: MaybeSignal<boolean>;
  /** Whether to mute the audio. */
  muted?: MaybeSignal<boolean>;
  /** Whether to show playback controls. */
  controls?: MaybeSignal<boolean>;
  /** CORS settings. */
  crossOrigin?: MaybeSignal<CrossOrigin>;
  /** Initial playback position. */
  currentTime?: MaybeSignal<number>;
  /** Audio volume (0.0 to 1.0). */
  volume?: MaybeSignal<number>;
  /** Prevents remote playback. */
  disableRemotePlayback?: MaybeSignal<boolean>;
  /** Controls to display/hide. */
  controlsList?: MaybeSignal<string>;
}

/**
 * Attributes for source elements (in video, audio, picture).
 */
interface SourceAttrs extends GlobalAttributes {
  /** Address of the media resource. */
  src?: MaybeSignal<string>;
  /** MIME type of the resource. */
  type?: MaybeSignal<string>;
  /** Source set for responsive images. */
  srcset?: MaybeSignal<string>;
  /** Media conditions for image sources. */
  sizes?: MaybeSignal<string>;
  /** Media query for the resource. */
  media?: MaybeSignal<string>;
  /** Width of the image resource. */
  width?: MaybeSignal<number>;
  /** Height of the image resource. */
  height?: MaybeSignal<number>;
}

/**
 * Attributes for track elements (subtitles, captions).
 */
interface TrackAttrs extends GlobalAttributes {
  /** Address of the track. */
  src?: MaybeSignal<string>;
  /** Kind of text track. */
  kind?: MaybeSignal<TrackKind>;
  /** Language of the track text. */
  srclang?: MaybeSignal<string>;
  /** User-readable title of the track. */
  label?: MaybeSignal<string>;
  /** Whether to enable the track by default. */
  default?: MaybeSignal<boolean>;
}

/**
 * Attributes for canvas elements.
 */
interface CanvasAttrs extends GlobalAttributes {
  /** Coordinate space width. */
  width?: MaybeSignal<number>;
  /** Coordinate space height. */
  height?: MaybeSignal<number>;
}

/**
 * Attributes for iframe elements.
 */
interface IframeAttrs extends GlobalAttributes {
  /** Address of the resource. */
  src?: MaybeSignal<string>;
  /** HTML content of the page to show. */
  srcdoc?: MaybeSignal<string>;
  /** Name of the browsing context. */
  name?: MaybeSignal<string>;
  /** Width of the frame. */
  width?: MaybeSignal<number | string>;
  /** Height of the frame. */
  height?: MaybeSignal<number | string>;
  /** How the browser should load the iframe. */
  loading?: MaybeSignal<Loading>;
  /** Security rules for nested content. */
  sandbox?: MaybeSignal<Sandbox | string>;
  /** Feature policy to apply. */
  allow?: MaybeSignal<string>;
  /** Referrer policy for fetches. */
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  /** Whether to allow fullscreen mode. */
  allowFullscreen?: MaybeSignal<boolean>;
  /** Whether to load without specific credentials. */
  credentialless?: MaybeSignal<boolean>;
  /** Content Security Policy to apply. */
  csp?: MaybeSignal<string>;
}

/**
 * Attributes for embed elements.
 */
interface EmbedAttrs extends GlobalAttributes {
  /** Address of the resource. */
  src?: MaybeSignal<string>;
  /** MIME type of the resource. */
  type?: MaybeSignal<string>;
  /** Display width. */
  width?: MaybeSignal<number | string>;
  /** Display height. */
  height?: MaybeSignal<number | string>;
}

/**
 * Attributes for object elements.
 */
interface ObjectAttrs extends GlobalAttributes {
  /** Address of the resource. */
  data?: MaybeSignal<string>;
  /** MIME type of the resource. */
  type?: MaybeSignal<string>;
  /** Name of the browsing context. */
  name?: MaybeSignal<string>;
  /** Display width. */
  width?: MaybeSignal<number | string>;
  /** Display height. */
  height?: MaybeSignal<number | string>;
  /** ID of the form the element belongs to. */
  form?: MaybeSignal<string>;
  /** Name of image map to use. */
  useMap?: MaybeSignal<string>;
}

/**
 * Attributes for map elements.
 */
interface MapAttrs extends GlobalAttributes {
  /** Name of the image map. */
  name?: MaybeSignal<string>;
}

/**
 * Attributes for area elements.
 */
interface AreaAttrs extends GlobalAttributes {
  /** Alternate text for the area. */
  alt?: MaybeSignal<string>;
  /** Coordinates for the shape. */
  coords?: MaybeSignal<string>;
  /** Prompts the user to download the resource. */
  download?: MaybeSignal<string | boolean>;
  /** Hyperlink target. */
  href?: MaybeSignal<string>;
  /** Language of the linked resource. */
  hreflang?: MaybeSignal<string>;
  /** URLs to ping for tracking. */
  ping?: MaybeSignal<string>;
  /** Referrer policy for fetches. */
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  /** Relationship to the linked resource. */
  rel?: MaybeSignal<string>;
  /** Shape of the area. */
  shape?: MaybeSignal<AreaShape>;
  /** Browsing context for the link. */
  target?: MaybeSignal<Target>;
}

/**
 * Attributes for progress elements.
 */
interface ProgressAttrs extends GlobalAttributes {
  /** Current value of the progress. */
  value?: MaybeSignal<number>;
  /** Maximum value of the progress. */
  max?: MaybeSignal<number>;
}

/**
 * Attributes for meter elements.
 */
interface MeterAttrs extends GlobalAttributes {
  /** Current value of the meter. */
  value?: MaybeSignal<number>;
  /** Minimum value. */
  min?: MaybeSignal<number>;
  /** Maximum value. */
  max?: MaybeSignal<number>;
  /** Upper bound of the low end of the range. */
  low?: MaybeSignal<number>;
  /** Lower bound of the high end of the range. */
  high?: MaybeSignal<number>;
  /** Optimum value in the range. */
  optimum?: MaybeSignal<number>;
}

/**
 * Attributes for time elements.
 */
interface TimeAttrs extends GlobalAttributes {
  /** Machine-readable equivalent of the time. */
  dateTime?: MaybeSignal<string>;
}

/**
 * Attributes for data elements.
 */
interface DataElemAttrs extends GlobalAttributes {
  /** Machine-readable value. */
  value?: MaybeSignal<string>;
}

/**
 * Attributes for dialog elements.
 */
interface DialogAttrs extends GlobalAttributes {
  /** Whether the dialog is open. */
  open?: MaybeSignal<boolean>;
}

/**
 * Attributes for details elements.
 */
interface DetailsAttrs extends GlobalAttributes {
  /** Whether the details are visible. */
  open?: MaybeSignal<boolean>;
  /** Name of the details group. */
  name?: MaybeSignal<string>;
}

/**
 * Attributes for table cell elements (td).
 */
interface TableCellAttrs extends GlobalAttributes {
  /** Number of columns to span. */
  colSpan?: MaybeSignal<number>;
  /** Number of rows to span. */
  rowSpan?: MaybeSignal<number>;
  /** IDs of headers for this cell. */
  headers?: MaybeSignal<string>;
}

/**
 * Attributes for table header elements (th).
 */
interface ThAttrs extends TableCellAttrs {
  /** Scope of the header. */
  scope?: MaybeSignal<ThScope>;
  /** Abbreviation for the header content. */
  abbr?: MaybeSignal<string>;
}

/**
 * Attributes for table column elements.
 */
interface ColAttrs extends GlobalAttributes {
  /** Number of columns to span. */
  span?: MaybeSignal<number>;
}

/**
 * Attributes for table column group elements.
 */
interface ColgroupAttrs extends GlobalAttributes {
  /** Number of columns to span. */
  span?: MaybeSignal<number>;
}

/**
 * Attributes for blockquote elements.
 */
interface BlockquoteAttrs extends GlobalAttributes {
  /** URL of the source. */
  cite?: MaybeSignal<string>;
}

/**
 * Attributes for quote elements (q).
 */
interface QAttrs extends GlobalAttributes {
  /** URL of the source. */
  cite?: MaybeSignal<string>;
}

/**
 * Attributes for modification elements (ins, del).
 */
interface ModAttrs extends GlobalAttributes {
  /** URL of the source explaining the change. */
  cite?: MaybeSignal<string>;
  /** Date and time of the change. */
  dateTime?: MaybeSignal<string>;
}

/**
 * Attributes for ordered list elements.
 */
interface OlAttrs extends GlobalAttributes {
  /** Starting value of the list. */
  start?: MaybeSignal<number>;
  /** Whether the list is reversed. */
  reversed?: MaybeSignal<boolean>;
  /** Type of list marker. */
  type?: MaybeSignal<"1" | "a" | "A" | "i" | "I">;
}

/**
 * Attributes for list item elements.
 */
interface LiAttrs extends GlobalAttributes {
  /** Value of the list item. */
  value?: MaybeSignal<number>;
}

/**
 * Attributes for link elements.
 */
interface BaseLinkAttrs extends GlobalAttributes {
  /** URL of the linked resource. */
  href?: MaybeSignal<string>;
  /** Media type of the linked resource. */
  type?: MaybeSignal<string>;
  /** CORS settings. */
  crossOrigin?: MaybeSignal<CrossOrigin>;
  /** Integrity metadata. */
  integrity?: MaybeSignal<string>;
  /** Referrer policy for fetches. */
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  /** Language of the linked resource. */
  hreflang?: MaybeSignal<string>;
  /** Fetch priority hint. */
  fetchPriority?: MaybeSignal<FetchPriority>;
  /** Whether the element is blocking. */
  blocking?: MaybeSignal<"render">;
  /** Color for mask-icon. */
  color?: MaybeSignal<string>;
  /** Whether the link is disabled. */
  disabled?: MaybeSignal<boolean>;
}

interface LinkPreloadAttrs extends BaseLinkAttrs {
  /** Relationship to the linked resource. */
  rel: MaybeSignal<"preload" | "modulepreload">;
  /** Potential destination for a preload request. Required for preload. */
  as: MaybeSignal<LinkAs>;
  /** Media query for the resource. */
  media?: MaybeSignal<string>;
  /** Source set for responsive images. */
  imageSrcset?: MaybeSignal<string>;
  /** Sizes for responsive images. */
  imageSizes?: MaybeSignal<string>;
  /** Sizes for icons. */
  sizes?: never;
}

interface LinkStylesheetAttrs extends BaseLinkAttrs {
  /** Relationship to the linked resource. */
  rel: MaybeSignal<"stylesheet">;
  /** Media query for the resource. */
  media?: MaybeSignal<string>;
  /** Preload destination. */
  as?: never;
  /** Sizes for icons. */
  sizes?: never;
}

interface LinkIconAttrs extends BaseLinkAttrs {
  /** Relationship to the linked resource. */
  rel: MaybeSignal<"icon" | "apple-touch-icon">;
  /** Sizes for icons. */
  sizes?: MaybeSignal<string>;
  /** Media query. */
  media?: MaybeSignal<string>;
  /** Preload destination. */
  as?: never;
}

interface LinkBaseAttrs extends BaseLinkAttrs {
  /** Relationship to the linked resource. */
  rel?: MaybeSignal<string>; // Catch-all for other rels
  /** Media query. */
  media?: MaybeSignal<string>;
  /** Preload destination. */
  as?: MaybeSignal<LinkAs>;
  /** Sizes for icons. */
  sizes?: MaybeSignal<string>;
  /** Source set for responsive images. */
  imageSrcset?: MaybeSignal<string>;
  /** Sizes for responsive images. */
  imageSizes?: MaybeSignal<string>;
}

/**
 * Attributes for link elements.
 * Discriminated union based on `rel`.
 */
type LinkAttrs =
  | LinkPreloadAttrs
  | LinkStylesheetAttrs
  | LinkIconAttrs
  | LinkBaseAttrs;

/**
 * Attributes for meta elements.
 */
// Base attributes for all meta tags
interface BaseMetaAttrs extends GlobalAttributes {
  /** Media query. */
  media?: MaybeSignal<string>;
}

// 1. Standard Metadata: name + content
interface MetaNameAttrs extends BaseMetaAttrs {
  /** Metadata name. */
  name: MaybeSignal<string>;
  /** Metadata value. */
  content: MaybeSignal<string>;

  httpEquiv?: never;
  charset?: never;
  property?: never;
}

// 2. Pragma Directives: http-equiv + content
interface MetaHttpEquivAttrs extends BaseMetaAttrs {
  /** Pragma directive. */
  httpEquiv: MaybeSignal<HttpEquiv | string>;
  /** Metadata value. */
  content: MaybeSignal<string>;

  name?: never;
  charset?: never;
  property?: never;
}

// 3. Character Encoding: charset only
interface MetaCharsetAttrs extends BaseMetaAttrs {
  /** Character encoding. */
  charset: MaybeSignal<string>;

  name?: never;
  httpEquiv?: never;
  content?: never;
  property?: never;
}

// 4. OpenGraph / RDFa: property + content
interface MetaPropertyAttrs extends BaseMetaAttrs {
  /** Property name (e.g. "og:title"). */
  property: MaybeSignal<string>;
  /** Metadata value. */
  content: MaybeSignal<string>;

  name?: never;
  httpEquiv?: never;
  charset?: never;
}

/**
 * Attributes for meta elements.
 * Discriminated union based on usage mode.
 */
type MetaAttrs =
  | MetaNameAttrs
  | MetaHttpEquivAttrs
  | MetaCharsetAttrs
  | MetaPropertyAttrs;

/**
 * Attributes for base element.
 */
interface BaseAttrs extends GlobalAttributes {
  /** Base URL for relative URLs. */
  href?: MaybeSignal<string>;
  /** Default browsing context. */
  target?: MaybeSignal<Target>;
}

/**
 * Attributes for script elements.
 */
interface ScriptAttrs extends GlobalAttributes {
  /** Address of the resource. */
  src?: MaybeSignal<string>;
  /** Type of script. */
  type?: MaybeSignal<string>;
  /** Execute asynchronously. */
  async?: MaybeSignal<boolean>;
  /** Defer execution. */
  defer?: MaybeSignal<boolean>;
  /** CORS settings. */
  crossOrigin?: MaybeSignal<CrossOrigin>;
  /** Integrity metadata. */
  integrity?: MaybeSignal<string>;
  /** Disallow execution in module systems. */
  noModule?: MaybeSignal<boolean>;
  /** Referrer policy for fetches. */
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  /** Fetch priority hint. */
  fetchPriority?: MaybeSignal<FetchPriority>;
  /** Whether the element is blocking. */
  blocking?: MaybeSignal<"render">;
  /** Experimental attribution source. */
  attributionSrc?: MaybeSignal<string>;
}

/**
 * Attributes for style elements.
 */
interface StyleAttrs extends GlobalAttributes {
  /** Media query for the style. */
  media?: MaybeSignal<string>;
  /** Whether the element is blocking. */
  blocking?: MaybeSignal<"render">;
}

/**
 * Attributes for slot elements.
 */
interface SlotAttrs extends GlobalAttributes {
  /** Name of the slot. */
  name?: MaybeSignal<string>;
}

/**
 * Attributes for template elements.
 */
interface TemplateAttrs extends GlobalAttributes {
  /** Shadow DOM mode. */
  shadowrootmode?: MaybeSignal<"open" | "closed">;
  /** Whether to delegate focus. */
  shadowrootdelegatesfocus?: MaybeSignal<boolean>;
  /** Whether the shadow root is clonable. */
  shadowrootclonable?: MaybeSignal<boolean>;
  /** Whether the shadow root is serializable. */
  shadowrootserializable?: MaybeSignal<boolean>;
}

// =============================================================================
// ELEMENT PROPS MAP
// =============================================================================

/**
 * Mapping of HTML tag names to their specific attribute interfaces.
 * Used to infer strict prop types for each element.
 */
interface ElementPropsMap {
  // Form elements
  input: InputAttrs;
  textarea: TextAreaAttrs;
  select: SelectAttrs;
  option: OptionAttrs;
  optgroup: OptgroupAttrs;
  button: ButtonAttrs;
  form: FormAttrs;
  label: LabelAttrs;
  fieldset: FieldsetAttrs;
  output: OutputAttrs;

  // Links & navigation
  a: AnchorAttrs;

  // Media
  img: ImgAttrs;
  video: VideoAttrs;
  audio: AudioAttrs;
  source: SourceAttrs;
  track: TrackAttrs;
  canvas: CanvasAttrs;

  // Embedded content
  iframe: IframeAttrs;
  embed: EmbedAttrs;
  object: ObjectAttrs;
  map: MapAttrs;
  area: AreaAttrs;

  // Progress & Meter
  progress: ProgressAttrs;
  meter: MeterAttrs;

  // Time & Data
  time: TimeAttrs;
  data: DataElemAttrs;

  // Interactive
  dialog: DialogAttrs;
  details: DetailsAttrs;

  // Table
  td: TableCellAttrs;
  th: ThAttrs;
  col: ColAttrs;
  colgroup: ColgroupAttrs;

  // Quotes & modifications
  blockquote: BlockquoteAttrs;
  q: QAttrs;
  ins: ModAttrs;
  del: ModAttrs;

  // Lists
  ol: OlAttrs;
  li: LiAttrs;

  // Document metadata
  link: LinkAttrs;
  meta: MetaAttrs;
  base: BaseAttrs;
  script: ScriptAttrs;
  style: StyleAttrs;

  // Web components
  slot: SlotAttrs;
  template: TemplateAttrs;
}

// =============================================================================
// ELEMENT PROPS TYPE
// =============================================================================

/**
 * The specific props object for a given HTML tag `K`.
 * Combines element-specific attributes, global attributes, event handlers, data attributes, and ARIA attributes.
 * 
 * @template K - The HTML tag name key
 */
export type ElementProps<K extends keyof HTMLElementTagNameMap> =
  (K extends keyof ElementPropsMap ? ElementPropsMap[K] : GlobalAttributes)
  & EventHandlers<HTMLElementTagNameMap[K]>
  & DataAttributes
  & AriaAttributes;

// =============================================================================
// ELEMENT FACTORY TYPES - UNIFIED API
// =============================================================================

type E<K extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[K];

/**
 * Factory function for creating HTML elements.
 * Supports signal content, properties, and children overloads.
 * 
 * @template K - The HTML tag name key from HTMLElementTagNameMap
 */
export interface ElementFactory<K extends keyof HTMLElementTagNameMap> {
  /** 1. Empty element */
  (): E<K>;
  /** 2. Text content only */
  (content: MaybeSignal<string | number>): E<K>;
  /** 3. Props only */
  (props: ElementProps<K>): E<K>;
  /** 4. Children callback only */
  (children: ChildrenCallback<E<K>>): E<K>;
  /** 5. Props + children */
  (props: ElementProps<K>, children: ChildrenCallback<E<K>>): E<K>;
  /** 6. Content + props */
  (content: MaybeSignal<string | number>, props: ElementProps<K>): E<K>;
  /** 7. Content + children */
  (content: MaybeSignal<string | number>, children: ChildrenCallback<E<K>>): E<K>;
  /** 8. Content + props + children */
  (content: MaybeSignal<string | number>, props: ElementProps<K>, children: ChildrenCallback<E<K>>): E<K>;
}

/**
 * Factory function for creating void HTML elements (no children).
 * 
 * @template K - The HTML tag name key from HTMLElementTagNameMap
 */
export interface VoidElementFactory<K extends keyof HTMLElementTagNameMap> {
  /**
   * Create a void element (e.g., <input>, <br>).
   * @param props - Element attributes and event handlers
   */
  (props?: ElementProps<K>): HTMLElementTagNameMap[K];
}

// =============================================================================
// PROP APPLICATION - PROP TO ATTRIBUTE MAP
// =============================================================================

/**
 * Map of camelCase prop names to their HTML attribute equivalents
 */
const PROP_TO_ATTR: Record<string, string> = {
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv",
  acceptCharset: "accept-charset",
  accessKey: "accesskey",
  autoCapitalize: "autocapitalize",
  autoComplete: "autocomplete",
  autoFocus: "autofocus",
  autoPlay: "autoplay",
  colSpan: "colspan",
  contentEditable: "contenteditable",
  crossOrigin: "crossorigin",
  dateTime: "datetime",
  defaultChecked: "checked",
  defaultValue: "value",
  encType: "enctype",
  enterKeyHint: "enterkeyhint",
  fetchPriority: "fetchpriority",
  formAction: "formaction",
  formEnctype: "formenctype",
  formMethod: "formmethod",
  formNoValidate: "formnovalidate",
  formTarget: "formtarget",
  hrefLang: "hreflang",
  inputMode: "inputmode",
  isMap: "ismap",
  maxLength: "maxlength",
  minLength: "minlength",
  noModule: "nomodule",
  noValidate: "novalidate",
  playsInline: "playsinline",
  readOnly: "readonly",
  referrerPolicy: "referrerpolicy",
  rowSpan: "rowspan",
  srcDoc: "srcdoc",
  srcLang: "srclang",
  srcSet: "srcset",
  tabIndex: "tabindex",
  useMap: "usemap",
  itemScope: "itemscope",
  itemType: "itemtype",
  itemId: "itemid",
  itemProp: "itemprop",
  itemRef: "itemref",
  popoverTarget: "popovertarget",
  popoverTargetAction: "popovertargetaction",
  shadowRootMode: "shadowrootmode",
  shadowRootDelegatesFocus: "shadowrootdelegatesfocus",
  shadowRootClonable: "shadowrootclonable",
  shadowRootSerializable: "shadowrootserializable",
  controlsList: "controlslist",
  disablePictureInPicture: "disablepictureinpicture",
  disableRemotePlayback: "disableremoteplayback",
  allowFullscreen: "allowfullscreen",
  attributionSrc: "attributionsrc",
  elementTiming: "elementtiming",
};

function assignProp(element: HTMLElement, key: string, value: unknown): void {
  if (key === "class") {
    applyClass(element, value);
  } else if (key === "style") {
    applyStyle(element, value);
  } else if (
    key === "value" ||
    key === "checked" ||
    key === "selected" ||
    key === "muted" ||
    key === "currentTime" ||
    key === "volume" ||
    key === "indeterminate" ||
    key === "defaultValue" ||
    key === "defaultChecked" ||
    key === "textContent" ||
    key === "innerText"
  ) {
    (element as any)[key] = value;
  } else if (typeof value === "boolean") {
    if (value) {
      element.setAttribute(PROP_TO_ATTR[key] ?? key, "");
    } else {
      element.removeAttribute(PROP_TO_ATTR[key] ?? key);
    }
  } else {
    element.setAttribute(PROP_TO_ATTR[key] ?? key, String(value));
  }
}

function applyProps<K extends keyof HTMLElementTagNameMap>(
  element: HTMLElementTagNameMap[K],
  props: ElementProps<K>
): void {
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined) continue;

    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value as EventListener);
    } else if (isSignal(value)) {
      effect(() => assignProp(element, key, value.value));
    } else {
      assignProp(element, key, value);
    }
  }
}

function applyClass(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.className = value;
  } else if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value as Record<string, unknown>);
    const hasSignal = entries.some(([_, v]) => isSignal(v));

    const updateClasses = () => {
      const classes: string[] = [];
      for (const [className, condition] of entries) {
        const isActive = isSignal(condition) ? condition.value : condition;
        if (isActive) classes.push(className);
      }
      element.className = classes.join(" ");
    };

    if (hasSignal) {
      effect(updateClasses);
    } else {
      updateClasses();
    }
  }
}

function applyStyle(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.setAttribute("style", value);
  } else if (typeof value === "object" && value !== null) {
    for (const [prop, val] of Object.entries(value as Record<string, unknown>)) {
      if (isSignal(val)) {
        effect(() => {
          (element.style as any)[prop] = val.value;
        });
      } else {
        (element.style as any)[prop] = val;
      }
    }
  }
}

// =============================================================================
// CONTENT APPLICATION
// =============================================================================

function applyContent(
  element: HTMLElement,
  content: MaybeSignal<string | number>
): void {
  if (isSignal(content)) {
    const textNode = document.createTextNode("");
    effect(() => {
      const v = content.value;
      textNode.textContent = v == null ? "" : String(v);
    });
    element.appendChild(textNode);
  } else {
    element.appendChild(document.createTextNode(String(content)));
  }
}

// =============================================================================
// CHILDREN EXECUTION
// =============================================================================

function executeChildren<E extends HTMLElement>(
  element: E,
  children: ChildrenCallback<E>
): void {
  pushExecutionContext(element);
  try {
    children(element);
  } finally {
    popExecutionContext();
  }
}

// =============================================================================
// ELEMENT FACTORY
// =============================================================================

/**
 * Creates an element factory for a specific HTML tag.
 * 
 * @param tag - The HTML tag name (e.g., "div", "span")
 * @returns An `ElementFactory` function for creating elements of that type
 */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
): ElementFactory<K> {
  return (
    arg1?: MaybeSignal<string | number> | ElementProps<K> | ChildrenCallback<E<K>>,
    arg2?: ElementProps<K> | ChildrenCallback<E<K>>,
    arg3?: ChildrenCallback<E<K>>
  ): E<K> => {
    const element = document.createElement(tag);

    // Parse arguments based on types
    let content: MaybeSignal<string | number> | undefined;
    let props: ElementProps<K> | undefined;
    let children: ChildrenCallback<E<K>> | undefined;

    if (arg1 === undefined) {
      // 1. element()
    } else if (isContent(arg1)) {
      content = arg1;
      if (arg2 === undefined) {
        // 2. element(content)
      } else if (isProps<K>(arg2)) {
        props = arg2;
        if (arg3 !== undefined) {
          // 8. element(content, props, children)
          children = arg3;
        }
        // else 6. element(content, props)
      } else if (isChildrenCallback<E<K>>(arg2)) {
        // 7. element(content, children)
        children = arg2;
      }
    } else if (isProps<K>(arg1)) {
      props = arg1;
      if (isChildrenCallback<E<K>>(arg2)) {
        // 5. element(props, children)
        children = arg2;
      }
      // else 3. element(props)
    } else if (isChildrenCallback<E<K>>(arg1)) {
      // 4. element(children)
      children = arg1;
    }

    // Apply in order: props, content, children
    if (props) {
      applyProps(element, props);
    }

    if (content !== undefined) {
      applyContent(element, content);
    }

    if (children) {
      executeChildren(element, children);
    }

    // Mount to current context
    getCurrentExecutionContext().appendChild(element);

    return element;
  };
}

/**
 * Creates a void element factory (no children allowed).
 * 
 * @param tag - The HTML tag name (e.g., "input", "br")
 * @returns A `VoidElementFactory` function
 */
function createVoidElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
): VoidElementFactory<K> {
  return (props?: ElementProps<K>): E<K> => {
    const element = document.createElement(tag);
    if (props) applyProps(element, props);
    getCurrentExecutionContext().appendChild(element);
    return element;
  };
}

// =============================================================================
// HELPER: TYPE GUARDS
// =============================================================================

function isProps<K extends keyof HTMLElementTagNameMap>(
  value: unknown
): value is ElementProps<K> {
  return (
    typeof value === "object" &&
    value !== null &&
    !isSignal(value) &&
    !Array.isArray(value)
  );
}

function isChildrenCallback<E extends HTMLElement>(
  value: unknown
): value is ChildrenCallback<E> {
  return typeof value === "function" && !isSignal(value);
}

function isContent(value: unknown): value is MaybeSignal<string | number> {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    isSignal(value)
  );
}

// =============================================================================
// ELEMENT EXPORTS
// =============================================================================

// Text elements
export const div: ElementFactory<"div"> = createElement("div");
export const span: ElementFactory<"span"> = createElement("span");
export const p: ElementFactory<"p"> = createElement("p");
export const h1: ElementFactory<"h1"> = createElement("h1");
export const h2: ElementFactory<"h2"> = createElement("h2");
export const h3: ElementFactory<"h3"> = createElement("h3");
export const h4: ElementFactory<"h4"> = createElement("h4");
export const h5: ElementFactory<"h5"> = createElement("h5");
export const h6: ElementFactory<"h6"> = createElement("h6");
export const a: ElementFactory<"a"> = createElement("a");
export const strong: ElementFactory<"strong"> = createElement("strong");
export const em: ElementFactory<"em"> = createElement("em");
export const code: ElementFactory<"code"> = createElement("code");
export const pre: ElementFactory<"pre"> = createElement("pre");

// Form elements
export const form: ElementFactory<"form"> = createElement("form");
export const input: VoidElementFactory<"input"> = createVoidElement("input");
export const textarea: ElementFactory<"textarea"> = createElement("textarea");
export const select: ElementFactory<"select"> = createElement("select");
export const option: ElementFactory<"option"> = createElement("option");
export const optgroup: ElementFactory<"optgroup"> = createElement("optgroup");
export const button: ElementFactory<"button"> = createElement("button");
export const label: ElementFactory<"label"> = createElement("label");
export const fieldset: ElementFactory<"fieldset"> = createElement("fieldset");
export const legend: ElementFactory<"legend"> = createElement("legend");
export const datalist: ElementFactory<"datalist"> = createElement("datalist");
export const output: ElementFactory<"output"> = createElement("output");

// List elements
export const ul: ElementFactory<"ul"> = createElement("ul");
export const ol: ElementFactory<"ol"> = createElement("ol");
export const li: ElementFactory<"li"> = createElement("li");
export const dl: ElementFactory<"dl"> = createElement("dl");
export const dt: ElementFactory<"dt"> = createElement("dt");
export const dd: ElementFactory<"dd"> = createElement("dd");

// Table elements
export const table: ElementFactory<"table"> = createElement("table");
export const thead: ElementFactory<"thead"> = createElement("thead");
export const tbody: ElementFactory<"tbody"> = createElement("tbody");
export const tfoot: ElementFactory<"tfoot"> = createElement("tfoot");
export const tr: ElementFactory<"tr"> = createElement("tr");
export const td: ElementFactory<"td"> = createElement("td");
export const th: ElementFactory<"th"> = createElement("th");
export const caption: ElementFactory<"caption"> = createElement("caption");
export const colgroup: ElementFactory<"colgroup"> = createElement("colgroup");
export const col: VoidElementFactory<"col"> = createVoidElement("col");

// Semantic elements
export const header: ElementFactory<"header"> = createElement("header");
export const footer: ElementFactory<"footer"> = createElement("footer");
export const nav: ElementFactory<"nav"> = createElement("nav");
export const main: ElementFactory<"main"> = createElement("main");
export const section: ElementFactory<"section"> = createElement("section");
export const article: ElementFactory<"article"> = createElement("article");
export const aside: ElementFactory<"aside"> = createElement("aside");
export const figure: ElementFactory<"figure"> = createElement("figure");
export const figcaption: ElementFactory<"figcaption"> = createElement("figcaption");
export const hgroup: ElementFactory<"hgroup"> = createElement("hgroup");
export const search: ElementFactory<"search"> = createElement("search");
export const address: ElementFactory<"address"> = createElement("address");

// Media elements
export const img: VoidElementFactory<"img"> = createVoidElement("img");
export const video: ElementFactory<"video"> = createElement("video");
export const audio: ElementFactory<"audio"> = createElement("audio");
export const canvas: ElementFactory<"canvas"> = createElement("canvas");
export const picture: ElementFactory<"picture"> = createElement("picture");
export const source: VoidElementFactory<"source"> = createVoidElement("source");
export const track: VoidElementFactory<"track"> = createVoidElement("track");
export const iframe: ElementFactory<"iframe"> = createElement("iframe");
export const embed: VoidElementFactory<"embed"> = createVoidElement("embed");
export const object: ElementFactory<"object"> = createElement("object");
export const map: ElementFactory<"map"> = createElement("map");

// Interactive elements
export const details: ElementFactory<"details"> = createElement("details");
export const summary: ElementFactory<"summary"> = createElement("summary");
export const dialog: ElementFactory<"dialog"> = createElement("dialog");
export const menu: ElementFactory<"menu"> = createElement("menu");

// Text-level elements
export const br: VoidElementFactory<"br"> = createVoidElement("br");
export const hr: VoidElementFactory<"hr"> = createVoidElement("hr");
export const wbr: VoidElementFactory<"wbr"> = createVoidElement("wbr");
export const blockquote: ElementFactory<"blockquote"> = createElement("blockquote");
export const q: ElementFactory<"q"> = createElement("q");
export const cite: ElementFactory<"cite"> = createElement("cite");
export const abbr: ElementFactory<"abbr"> = createElement("abbr");
export const time: ElementFactory<"time"> = createElement("time");
export const small: ElementFactory<"small"> = createElement("small");
export const sub: ElementFactory<"sub"> = createElement("sub");
export const sup: ElementFactory<"sup"> = createElement("sup");
export const mark: ElementFactory<"mark"> = createElement("mark");
export const del: ElementFactory<"del"> = createElement("del");
export const ins: ElementFactory<"ins"> = createElement("ins");
export const kbd: ElementFactory<"kbd"> = createElement("kbd");
export const samp: ElementFactory<"samp"> = createElement("samp");
export const var_: ElementFactory<"var"> = createElement("var");
export const dfn: ElementFactory<"dfn"> = createElement("dfn");
export const bdi: ElementFactory<"bdi"> = createElement("bdi");
export const bdo: ElementFactory<"bdo"> = createElement("bdo");
export const ruby: ElementFactory<"ruby"> = createElement("ruby");
export const rt: ElementFactory<"rt"> = createElement("rt");
export const rp: ElementFactory<"rp"> = createElement("rp");
export const data: ElementFactory<"data"> = createElement("data");

// Progress/Meter
export const progress: ElementFactory<"progress"> = createElement("progress");
export const meter: ElementFactory<"meter"> = createElement("meter");

// Template/Slot
export const template: ElementFactory<"template"> = createElement("template");
export const slot: ElementFactory<"slot"> = createElement("slot");

// Document metadata (void elements)
export const area: VoidElementFactory<"area"> = createVoidElement("area");
export const base: VoidElementFactory<"base"> = createVoidElement("base");
export const link: VoidElementFactory<"link"> = createVoidElement("link");
export const meta: VoidElementFactory<"meta"> = createVoidElement("meta");

// Script/Style (typically used differently but included for completeness)
export const script: ElementFactory<"script"> = createElement("script");
export const style: ElementFactory<"style"> = createElement("style");
export const noscript: ElementFactory<"noscript"> = createElement("noscript");

// Deprecated but sometimes needed
export const b: ElementFactory<"b"> = createElement("b");
export const i: ElementFactory<"i"> = createElement("i");
export const u: ElementFactory<"u"> = createElement("u");
export const s: ElementFactory<"s"> = createElement("s");

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type {
  // Attribute interfaces
  GlobalAttributes,
  InputAttrs,
  TextAreaAttrs,
  SelectAttrs,
  OptionAttrs,
  OptgroupAttrs,
  ButtonAttrs,
  FormAttrs,
  LabelAttrs,
  FieldsetAttrs,
  OutputAttrs,
  AnchorAttrs,
  ImgAttrs,
  VideoAttrs,
  AudioAttrs,
  SourceAttrs,
  TrackAttrs,
  CanvasAttrs,
  IframeAttrs,
  EmbedAttrs,
  ObjectAttrs,
  MapAttrs,
  AreaAttrs,
  ProgressAttrs,
  MeterAttrs,
  TimeAttrs,
  DataElemAttrs,
  DialogAttrs,
  DetailsAttrs,
  TableCellAttrs,
  ThAttrs,
  ColAttrs,
  ColgroupAttrs,
  BlockquoteAttrs,
  QAttrs,
  ModAttrs,
  OlAttrs,
  LiAttrs,
  LinkAttrs,
  MetaAttrs,
  BaseAttrs,
  ScriptAttrs,
  StyleAttrs,
  SlotAttrs,
  TemplateAttrs,

  // CSS
  StrictCSSProperties,

  // Utility types
  EventHandlers,
  DataAttributes,
  AriaAttributes,
};