/**
 * Flick Element Functions
 *
 * Factory functions for all HTML elements that auto-mount to parent context.
 * Full TypeScript autocomplete with strict attribute types.
 */

import { pushExecutionContext, popExecutionContext, getCurrentExecutionContext, type ExecutionContext } from "./context";
import { effect, type Signal } from "./reactivity";

// =============================================================================
// CAPTURE CONTEXT
// =============================================================================

class CaptureContext implements ExecutionContext {
  nodes: Node[] = [];
  appendChild(node: Node): Node {
    this.nodes.push(node);
    return node;
  }
}

// =============================================================================
// TYPE UTILITIES
// =============================================================================

export function isSignal(value: unknown): value is Signal<unknown> {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value !== "function") {
    return false;
  }
  const descriptor = Object.getOwnPropertyDescriptor(value, "value");
  return descriptor !== undefined && descriptor.get !== undefined;
}

export type MaybeSignal<T> = T | Signal<T>;

export type Renderable = string | number | boolean | null | undefined;

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

type InputType =
  | "text" | "password" | "email" | "number" | "tel" | "url"
  | "search" | "date" | "time" | "datetime-local" | "month" | "week"
  | "color" | "file" | "hidden" | "checkbox" | "radio"
  | "range" | "submit" | "reset" | "button" | "image";

type InputMode = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

type AutoCapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";

type EnterKeyHint = "enter" | "done" | "go" | "next" | "previous" | "search" | "send";

type ButtonType = "submit" | "reset" | "button";

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
  id?: MaybeSignal<string>;
  class?: MaybeSignal<string> | Record<string, MaybeSignal<boolean>>;
  style?: MaybeSignal<string> | MaybeSignal<StrictCSSProperties>;
  title?: MaybeSignal<string>;
  lang?: MaybeSignal<string>;
  dir?: MaybeSignal<Dir>;

  // Content
  textContent?: MaybeSignal<string | number>;
  innerText?: MaybeSignal<string | number>;

  // Accessibility
  role?: MaybeSignal<string>;
  tabIndex?: MaybeSignal<number>;

  // Editing
  contentEditable?: MaybeSignal<"true" | "false" | "plaintext-only">;
  spellcheck?: MaybeSignal<boolean>;
  draggable?: MaybeSignal<boolean>;

  // Input hints
  inputMode?: MaybeSignal<InputMode>;
  enterKeyHint?: MaybeSignal<EnterKeyHint>;
  autoCapitalize?: MaybeSignal<AutoCapitalize>;

  // Boolean
  hidden?: MaybeSignal<boolean | "until-found">;
  inert?: MaybeSignal<boolean>;

  // Popover
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

interface InputAttrs extends GlobalAttributes {
  type?: MaybeSignal<InputType>;
  name?: MaybeSignal<string>;
  value?: MaybeSignal<string | number>;
  defaultValue?: MaybeSignal<string>;
  placeholder?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  readOnly?: MaybeSignal<boolean>;
  required?: MaybeSignal<boolean>;
  autofocus?: MaybeSignal<boolean>;
  autocomplete?: MaybeSignal<Autocomplete>;
  min?: MaybeSignal<string | number>;
  max?: MaybeSignal<string | number>;
  step?: MaybeSignal<string | number>;
  minLength?: MaybeSignal<number>;
  maxLength?: MaybeSignal<number>;
  pattern?: MaybeSignal<string>;
  multiple?: MaybeSignal<boolean>;
  accept?: MaybeSignal<string>;
  checked?: MaybeSignal<boolean>;
  defaultChecked?: MaybeSignal<boolean>;
  indeterminate?: MaybeSignal<boolean>;
  size?: MaybeSignal<number>;
  list?: MaybeSignal<string>;
  form?: MaybeSignal<string>;
  formAction?: MaybeSignal<string>;
  formMethod?: MaybeSignal<FormMethod>;
  formEnctype?: MaybeSignal<FormEnctype>;
  formNoValidate?: MaybeSignal<boolean>;
  formTarget?: MaybeSignal<Target>;
  width?: MaybeSignal<number>;
  height?: MaybeSignal<number>;
  src?: MaybeSignal<string>;
  alt?: MaybeSignal<string>;
  capture?: MaybeSignal<"user" | "environment" | boolean>;
  dirname?: MaybeSignal<string>;
}

interface TextAreaAttrs extends GlobalAttributes {
  name?: MaybeSignal<string>;
  value?: MaybeSignal<string>;
  defaultValue?: MaybeSignal<string>;
  placeholder?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  readOnly?: MaybeSignal<boolean>;
  required?: MaybeSignal<boolean>;
  autofocus?: MaybeSignal<boolean>;
  autocomplete?: MaybeSignal<Autocomplete>;
  rows?: MaybeSignal<number>;
  cols?: MaybeSignal<number>;
  minLength?: MaybeSignal<number>;
  maxLength?: MaybeSignal<number>;
  wrap?: MaybeSignal<Wrap>;
  form?: MaybeSignal<string>;
  dirname?: MaybeSignal<string>;
}

interface SelectAttrs extends GlobalAttributes {
  name?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  required?: MaybeSignal<boolean>;
  autofocus?: MaybeSignal<boolean>;
  multiple?: MaybeSignal<boolean>;
  size?: MaybeSignal<number>;
  form?: MaybeSignal<string>;
  autocomplete?: MaybeSignal<Autocomplete>;
}

interface OptionAttrs extends GlobalAttributes {
  value?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  selected?: MaybeSignal<boolean>;
  label?: MaybeSignal<string>;
}

interface OptgroupAttrs extends GlobalAttributes {
  label?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
}

interface ButtonAttrs extends GlobalAttributes {
  type?: MaybeSignal<ButtonType>;
  name?: MaybeSignal<string>;
  value?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  autofocus?: MaybeSignal<boolean>;
  form?: MaybeSignal<string>;
  formAction?: MaybeSignal<string>;
  formMethod?: MaybeSignal<FormMethod>;
  formEnctype?: MaybeSignal<FormEnctype>;
  formNoValidate?: MaybeSignal<boolean>;
  formTarget?: MaybeSignal<Target>;
  popoverTarget?: MaybeSignal<string>;
  popoverTargetAction?: MaybeSignal<"toggle" | "show" | "hide">;
  commandfor?: MaybeSignal<string>;
  command?: MaybeSignal<string>;
}

interface FormAttrs extends GlobalAttributes {
  action?: MaybeSignal<string>;
  method?: MaybeSignal<FormMethod>;
  enctype?: MaybeSignal<FormEnctype>;
  target?: MaybeSignal<Target>;
  noValidate?: MaybeSignal<boolean>;
  autocomplete?: MaybeSignal<"on" | "off">;
  name?: MaybeSignal<string>;
  acceptCharset?: MaybeSignal<string>;
  rel?: MaybeSignal<string>;
}

interface LabelAttrs extends GlobalAttributes {
  htmlFor?: MaybeSignal<string>;
  for?: MaybeSignal<string>;
}

interface FieldsetAttrs extends GlobalAttributes {
  disabled?: MaybeSignal<boolean>;
  form?: MaybeSignal<string>;
  name?: MaybeSignal<string>;
}

interface OutputAttrs extends GlobalAttributes {
  htmlFor?: MaybeSignal<string>;
  for?: MaybeSignal<string>;
  form?: MaybeSignal<string>;
  name?: MaybeSignal<string>;
}

interface AnchorAttrs extends GlobalAttributes {
  href?: MaybeSignal<string>;
  target?: MaybeSignal<Target>;
  rel?: MaybeSignal<string>;
  download?: MaybeSignal<string | boolean>;
  hreflang?: MaybeSignal<string>;
  type?: MaybeSignal<string>;
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  ping?: MaybeSignal<string>;
  attributionSrc?: MaybeSignal<string>;
}

interface ImgAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  alt?: MaybeSignal<string>;
  width?: MaybeSignal<number | string>;
  height?: MaybeSignal<number | string>;
  loading?: MaybeSignal<Loading>;
  decoding?: MaybeSignal<Decoding>;
  crossOrigin?: MaybeSignal<CrossOrigin>;
  srcset?: MaybeSignal<string>;
  sizes?: MaybeSignal<string>;
  useMap?: MaybeSignal<string>;
  isMap?: MaybeSignal<boolean>;
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  fetchPriority?: MaybeSignal<FetchPriority>;
  elementTiming?: MaybeSignal<string>;
  attributionSrc?: MaybeSignal<string>;
}

interface VideoAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  width?: MaybeSignal<number | string>;
  height?: MaybeSignal<number | string>;
  poster?: MaybeSignal<string>;
  preload?: MaybeSignal<Preload>;
  autoplay?: MaybeSignal<boolean>;
  loop?: MaybeSignal<boolean>;
  muted?: MaybeSignal<boolean>;
  controls?: MaybeSignal<boolean>;
  playsInline?: MaybeSignal<boolean>;
  crossOrigin?: MaybeSignal<CrossOrigin>;
  currentTime?: MaybeSignal<number>;
  volume?: MaybeSignal<number>;
  disablePictureInPicture?: MaybeSignal<boolean>;
  disableRemotePlayback?: MaybeSignal<boolean>;
  controlsList?: MaybeSignal<string>;
}

interface AudioAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  preload?: MaybeSignal<Preload>;
  autoplay?: MaybeSignal<boolean>;
  loop?: MaybeSignal<boolean>;
  muted?: MaybeSignal<boolean>;
  controls?: MaybeSignal<boolean>;
  crossOrigin?: MaybeSignal<CrossOrigin>;
  currentTime?: MaybeSignal<number>;
  volume?: MaybeSignal<number>;
  disableRemotePlayback?: MaybeSignal<boolean>;
  controlsList?: MaybeSignal<string>;
}

interface SourceAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  type?: MaybeSignal<string>;
  srcset?: MaybeSignal<string>;
  sizes?: MaybeSignal<string>;
  media?: MaybeSignal<string>;
  width?: MaybeSignal<number>;
  height?: MaybeSignal<number>;
}

interface TrackAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  kind?: MaybeSignal<TrackKind>;
  srclang?: MaybeSignal<string>;
  label?: MaybeSignal<string>;
  default?: MaybeSignal<boolean>;
}

interface CanvasAttrs extends GlobalAttributes {
  width?: MaybeSignal<number>;
  height?: MaybeSignal<number>;
}

interface IframeAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  srcdoc?: MaybeSignal<string>;
  name?: MaybeSignal<string>;
  width?: MaybeSignal<number | string>;
  height?: MaybeSignal<number | string>;
  loading?: MaybeSignal<Loading>;
  sandbox?: MaybeSignal<Sandbox | string>;
  allow?: MaybeSignal<string>;
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  allowFullscreen?: MaybeSignal<boolean>;
  credentialless?: MaybeSignal<boolean>;
  csp?: MaybeSignal<string>;
}

interface EmbedAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  type?: MaybeSignal<string>;
  width?: MaybeSignal<number | string>;
  height?: MaybeSignal<number | string>;
}

interface ObjectAttrs extends GlobalAttributes {
  data?: MaybeSignal<string>;
  type?: MaybeSignal<string>;
  name?: MaybeSignal<string>;
  width?: MaybeSignal<number | string>;
  height?: MaybeSignal<number | string>;
  form?: MaybeSignal<string>;
  useMap?: MaybeSignal<string>;
}

interface MapAttrs extends GlobalAttributes {
  name?: MaybeSignal<string>;
}

interface AreaAttrs extends GlobalAttributes {
  alt?: MaybeSignal<string>;
  coords?: MaybeSignal<string>;
  download?: MaybeSignal<string | boolean>;
  href?: MaybeSignal<string>;
  hreflang?: MaybeSignal<string>;
  ping?: MaybeSignal<string>;
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  rel?: MaybeSignal<string>;
  shape?: MaybeSignal<AreaShape>;
  target?: MaybeSignal<Target>;
}

interface ProgressAttrs extends GlobalAttributes {
  value?: MaybeSignal<number>;
  max?: MaybeSignal<number>;
}

interface MeterAttrs extends GlobalAttributes {
  value?: MaybeSignal<number>;
  min?: MaybeSignal<number>;
  max?: MaybeSignal<number>;
  low?: MaybeSignal<number>;
  high?: MaybeSignal<number>;
  optimum?: MaybeSignal<number>;
}

interface TimeAttrs extends GlobalAttributes {
  dateTime?: MaybeSignal<string>;
}

interface DataElemAttrs extends GlobalAttributes {
  value?: MaybeSignal<string>;
}

interface DialogAttrs extends GlobalAttributes {
  open?: MaybeSignal<boolean>;
}

interface DetailsAttrs extends GlobalAttributes {
  open?: MaybeSignal<boolean>;
  name?: MaybeSignal<string>;
}

interface TableCellAttrs extends GlobalAttributes {
  colSpan?: MaybeSignal<number>;
  rowSpan?: MaybeSignal<number>;
  headers?: MaybeSignal<string>;
}

interface ThAttrs extends TableCellAttrs {
  scope?: MaybeSignal<ThScope>;
  abbr?: MaybeSignal<string>;
}

interface ColAttrs extends GlobalAttributes {
  span?: MaybeSignal<number>;
}

interface ColgroupAttrs extends GlobalAttributes {
  span?: MaybeSignal<number>;
}

interface BlockquoteAttrs extends GlobalAttributes {
  cite?: MaybeSignal<string>;
}

interface QAttrs extends GlobalAttributes {
  cite?: MaybeSignal<string>;
}

interface ModAttrs extends GlobalAttributes {
  cite?: MaybeSignal<string>;
  dateTime?: MaybeSignal<string>;
}

interface OlAttrs extends GlobalAttributes {
  start?: MaybeSignal<number>;
  reversed?: MaybeSignal<boolean>;
  type?: MaybeSignal<"1" | "a" | "A" | "i" | "I">;
}

interface LiAttrs extends GlobalAttributes {
  value?: MaybeSignal<number>;
}

interface LinkAttrs extends GlobalAttributes {
  href?: MaybeSignal<string>;
  rel?: MaybeSignal<string>;
  type?: MaybeSignal<string>;
  media?: MaybeSignal<string>;
  as?: MaybeSignal<LinkAs>;
  crossOrigin?: MaybeSignal<CrossOrigin>;
  integrity?: MaybeSignal<string>;
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  sizes?: MaybeSignal<string>;
  disabled?: MaybeSignal<boolean>;
  hreflang?: MaybeSignal<string>;
  fetchPriority?: MaybeSignal<FetchPriority>;
  imageSrcset?: MaybeSignal<string>;
  imageSizes?: MaybeSignal<string>;
  blocking?: MaybeSignal<"render">;
  color?: MaybeSignal<string>;
}

interface MetaAttrs extends GlobalAttributes {
  name?: MaybeSignal<string>;
  content?: MaybeSignal<string>;
  charset?: MaybeSignal<string>;
  httpEquiv?: MaybeSignal<HttpEquiv | string>;
  media?: MaybeSignal<string>;
}

interface BaseAttrs extends GlobalAttributes {
  href?: MaybeSignal<string>;
  target?: MaybeSignal<Target>;
}

interface ScriptAttrs extends GlobalAttributes {
  src?: MaybeSignal<string>;
  type?: MaybeSignal<string>;
  async?: MaybeSignal<boolean>;
  defer?: MaybeSignal<boolean>;
  crossOrigin?: MaybeSignal<CrossOrigin>;
  integrity?: MaybeSignal<string>;
  noModule?: MaybeSignal<boolean>;
  referrerPolicy?: MaybeSignal<ReferrerPolicy>;
  fetchPriority?: MaybeSignal<FetchPriority>;
  blocking?: MaybeSignal<"render">;
  attributionSrc?: MaybeSignal<string>;
}

interface StyleAttrs extends GlobalAttributes {
  media?: MaybeSignal<string>;
  blocking?: MaybeSignal<"render">;
}

interface SlotAttrs extends GlobalAttributes {
  name?: MaybeSignal<string>;
}

interface TemplateAttrs extends GlobalAttributes {
  shadowrootmode?: MaybeSignal<"open" | "closed">;
  shadowrootdelegatesfocus?: MaybeSignal<boolean>;
  shadowrootclonable?: MaybeSignal<boolean>;
  shadowrootserializable?: MaybeSignal<boolean>;
}

// =============================================================================
// ELEMENT PROPS MAP
// =============================================================================

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

export type ElementProps<K extends keyof HTMLElementTagNameMap> =
  (K extends keyof ElementPropsMap ? ElementPropsMap[K] : GlobalAttributes)
  & EventHandlers<HTMLElementTagNameMap[K]>
  & DataAttributes
  & AriaAttributes;

// =============================================================================
// ELEMENT FACTORY TYPES
// =============================================================================

export interface ElementFactory<K extends keyof HTMLElementTagNameMap> {
  (content: MaybeSignal<string | number>, onclick: (event: MouseEvent) => void): HTMLElementTagNameMap[K];
  (content: MaybeSignal<string | number>, props: ElementProps<K>): HTMLElementTagNameMap[K];
  (props: ElementProps<K>, ...children: (Child | ((ref: HTMLElementTagNameMap[K]) => void))[]): HTMLElementTagNameMap[K];
  (...children: (Child | ((ref: HTMLElementTagNameMap[K]) => void))[]): HTMLElementTagNameMap[K];
}

export interface VoidElementFactory<K extends keyof HTMLElementTagNameMap> {
  (props?: ElementProps<K>): HTMLElementTagNameMap[K];
}

// =============================================================================
// CHILD HANDLING
// =============================================================================

function appendChild(parent: HTMLElement | ExecutionContext, child: Child | ((el: any) => void)): void {
  if (child === null || child === undefined || child === false || child === true) {
    return;
  }

  if (Array.isArray(child)) {
    for (const c of child) {
      appendChild(parent, c);
    }
    return;
  }

  const target = parent;

  if (typeof child === "string" || typeof child === "number") {
    target.appendChild(document.createTextNode(String(child)));
  } else if (child instanceof HTMLElement) {
    target.appendChild(child);
  } else if (isSignal(child)) {
    const textNode = document.createTextNode("");
    effect(() => {
      const v = child.value;
      textNode.textContent = (v === null || v === undefined) ? "" : String(v);
    });
    target.appendChild(textNode);
  } else if (typeof child === "function") {
    if (child.length > 0) {
      (child as (el: any) => void)(target);
      return;
    }
    const anchor = document.createTextNode("");
    target.appendChild(anchor);

    let activeNodes: Node[] = [];

    effect(() => {
      for (const node of activeNodes) {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
      activeNodes = [];

      const captureCtx = new CaptureContext();
      pushExecutionContext(captureCtx);
      try {
        (child as () => void)();
      } finally {
        popExecutionContext();
      }

      if (typeof (target as HTMLElement).insertBefore === "function") {
        const realParent = target as HTMLElement;
        const referenceNode = anchor.nextSibling;

        for (const node of captureCtx.nodes) {
          realParent.insertBefore(node, referenceNode);
          activeNodes.push(node);
        }
      } else {
        const captureParent = target as CaptureContext;
        const index = captureParent.nodes.indexOf(anchor);
        if (index !== -1) {
          captureParent.nodes.splice(index + 1, 0, ...captureCtx.nodes);
        } else {
          captureParent.nodes.push(...captureCtx.nodes);
        }
        activeNodes.push(...captureCtx.nodes);
      }
    });
  }
}

// =============================================================================
// PROP APPLICATION
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
    if (value === null || value === undefined) {
      continue;
    }

    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value as EventListener);
    } else if (isSignal(value)) {
      effect(() => {
        assignProp(element, key, value.value);
      });
    } else {
      assignProp(element, key, value);
    }
  }
}

function applyClass(element: HTMLElement, value: unknown): void {
  if (typeof value === "string") {
    element.className = value;
  } else if (typeof value === "object" && value !== null) {
    // If any value in the object is a signal, we need to re-run the whole class string generation
    // OR we can make individual classes toggle reactively.
    // The previous implementation was static. We make it reactive.

    // Check if any property value is a signal
    const entries = Object.entries(value as Record<string, unknown>);
    const hasSignal = entries.some(([_, v]) => isSignal(v));

    const updateClasses = () => {
      const classes: string[] = [];
      for (const [className, condition] of entries) {
        const isActive = isSignal(condition) ? condition.value : condition;
        if (isActive) {
          classes.push(className);
        }
      }
      element.className = classes.join(" "); // This overwrites existing classes? 
      // Note: `element.className = ...` overwrites. The `class` prop usually controls the whole attribute.
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
          // @ts-ignore
          element.style[prop] = val.value;
        });
      } else {
        // @ts-ignore
        element.style[prop] = val;
      }
    }
  }
}

// =============================================================================
// ELEMENT FACTORY
// =============================================================================

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
): ElementFactory<K> {
  // @ts-ignore - Dynamic definition
  return (
    arg1?: ElementProps<K> | Child | MaybeSignal<string | number>,
    arg2?: Child | ElementProps<K> | ((e: MouseEvent) => void),
    ...rest: Child[]
  ): HTMLElementTagNameMap[K] => {
    const element = document.createElement(tag);

    let props: ElementProps<K> | null = null;
    let allChildren: (Child | ((el: any) => void))[] = [];

    const isSimpleContent = typeof arg1 === "string" || typeof arg1 === "number" || isSignal(arg1);

    if (isSimpleContent) {
      const content = arg1 as Child;

      if (typeof arg2 === "object" && arg2 !== null && !(arg2 instanceof HTMLElement) && !isSignal(arg2) && !Array.isArray(arg2)) {
        props = arg2 as ElementProps<K>;
        allChildren = [content, ...rest];
      } else if (typeof arg2 === "function" && !isSignal(arg2) && (tag === "button" || tag === "a")) {
        props = { onclick: arg2 } as unknown as ElementProps<K>;
        allChildren = [content, ...rest];
      } else {
        allChildren = [content, arg2 as Child, ...rest];
      }
    } else if (
      typeof arg1 === "object" &&
      arg1 !== null &&
      !(arg1 instanceof HTMLElement) &&
      !isSignal(arg1) &&
      typeof arg1 !== "function" &&
      !Array.isArray(arg1)
    ) {
      props = arg1 as ElementProps<K>;
      allChildren = [arg2 as Child, ...rest];
    } else {
      allChildren = [arg1 as Child, arg2 as Child, ...rest];
    }

    if (props) {
      applyProps(element, props);
    }

    for (const child of allChildren) {
      appendChild(element, child);
    }

    getCurrentExecutionContext().appendChild(element);

    return element;
  };
}

function createVoidElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
): VoidElementFactory<K> {
  return (props?: ElementProps<K>): HTMLElementTagNameMap[K] => {
    const element = document.createElement(tag);

    if (props) {
      applyProps(element, props);
    }

    getCurrentExecutionContext().appendChild(element);

    return element;
  };
}

// =============================================================================
// ELEMENT EXPORTS
// =============================================================================

// Text elements
export const div = createElement("div");
export const span = createElement("span");
export const p = createElement("p");
export const h1 = createElement("h1");
export const h2 = createElement("h2");
export const h3 = createElement("h3");
export const h4 = createElement("h4");
export const h5 = createElement("h5");
export const h6 = createElement("h6");
export const a = createElement("a");
export const strong = createElement("strong");
export const em = createElement("em");
export const code = createElement("code");
export const pre = createElement("pre");

// Form elements
export const form = createElement("form");
export const input: VoidElementFactory<"input"> = createVoidElement("input");
export const textarea = createElement("textarea");
export const select = createElement("select");
export const option = createElement("option");
export const optgroup = createElement("optgroup");
export const button = createElement("button");
export const label = createElement("label");
export const fieldset = createElement("fieldset");
export const legend = createElement("legend");
export const datalist = createElement("datalist");
export const output = createElement("output");

// List elements
export const ul = createElement("ul");
export const ol = createElement("ol");
export const li = createElement("li");
export const dl = createElement("dl");
export const dt = createElement("dt");
export const dd = createElement("dd");

// Table elements
export const table = createElement("table");
export const thead = createElement("thead");
export const tbody = createElement("tbody");
export const tfoot = createElement("tfoot");
export const tr = createElement("tr");
export const td = createElement("td");
export const th = createElement("th");
export const caption = createElement("caption");
export const colgroup = createElement("colgroup");
export const col: VoidElementFactory<"col"> = createVoidElement("col");

// Semantic elements
export const header = createElement("header");
export const footer = createElement("footer");
export const nav = createElement("nav");
export const main = createElement("main");
export const section = createElement("section");
export const article = createElement("article");
export const aside = createElement("aside");
export const figure = createElement("figure");
export const figcaption = createElement("figcaption");
export const hgroup = createElement("hgroup");
export const search = createElement("search");
export const address = createElement("address");

// Media elements
export const img: VoidElementFactory<"img"> = createVoidElement("img");
export const video = createElement("video");
export const audio = createElement("audio");
export const canvas = createElement("canvas");
export const picture = createElement("picture");
export const source: VoidElementFactory<"source"> = createVoidElement("source");
export const track: VoidElementFactory<"track"> = createVoidElement("track");
export const iframe = createElement("iframe");
export const embed: VoidElementFactory<"embed"> = createVoidElement("embed");
export const object = createElement("object");
export const map = createElement("map");

// Interactive elements
export const details = createElement("details");
export const summary = createElement("summary");
export const dialog = createElement("dialog");
export const menu = createElement("menu");

// Text-level elements
export const br: VoidElementFactory<"br"> = createVoidElement("br");
export const hr: VoidElementFactory<"hr"> = createVoidElement("hr");
export const wbr: VoidElementFactory<"wbr"> = createVoidElement("wbr");
export const blockquote = createElement("blockquote");
export const q = createElement("q");
export const cite = createElement("cite");
export const abbr = createElement("abbr");
export const time = createElement("time");
export const small = createElement("small");
export const sub = createElement("sub");
export const sup = createElement("sup");
export const mark = createElement("mark");
export const del = createElement("del");
export const ins = createElement("ins");
export const kbd = createElement("kbd");
export const samp = createElement("samp");
export const var_ = createElement("var");
export const dfn = createElement("dfn");
export const bdi = createElement("bdi");
export const bdo = createElement("bdo");
export const ruby = createElement("ruby");
export const rt = createElement("rt");
export const rp = createElement("rp");
export const data = createElement("data");

// Progress/Meter
export const progress = createElement("progress");
export const meter = createElement("meter");

// Template/Slot
export const template = createElement("template");
export const slot = createElement("slot");

// Document metadata (void elements)
export const area: VoidElementFactory<"area"> = createVoidElement("area");
export const base: VoidElementFactory<"base"> = createVoidElement("base");
export const link: VoidElementFactory<"link"> = createVoidElement("link");
export const meta: VoidElementFactory<"meta"> = createVoidElement("meta");

// Script/Style (typically used differently but included for completeness)
export const script = createElement("script");
export const style = createElement("style");
export const noscript = createElement("noscript");

// Deprecated but sometimes needed
export const b = createElement("b");
export const i = createElement("i");
export const u = createElement("u");
export const s = createElement("s");

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