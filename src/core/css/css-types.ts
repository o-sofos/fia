import type { Signal } from "../reactivity/reactivity.ts";
import type { BoxModelProperties } from "./properties/box-model.ts";
import type { FlexGridProperties } from "./properties/flex-grid.ts";
import type { InteractionProperties, TableProperties } from "./properties/interaction.ts";
import type { LayoutProperties } from "./properties/layout.ts";
import type { TransformProperties } from "./properties/transform.ts";
import type { TypographyProperties } from "./properties/typography.ts";
import type { CSSColor, VisualProperties } from "./properties/visual.ts";

// =============================================================================
// RE-EXPORTS FROM MODULAR FILES
// =============================================================================

// Common & Units
export type { CSSGlobalValues } from "./properties/common.ts";
export type { CSSLength, CSSLengthUnit, CSSZIndex } from "./properties/units.ts";

// Layout
export type {
    CSSDisplay,
    CSSPosition,
    CSSOverflow,
    CSSFloat,
    CSSClear,
    CSSVisibility,
    LayoutProperties
} from "./properties/layout.ts";

// Box Model
export type {
    CSSBoxSizing,
    BoxModelProperties
} from "./properties/box-model.ts";

// Flex & Grid
export type {
    CSSFlexDirection,
    CSSFlexWrap,
    CSSJustifyContent,
    CSSAlignItems,
    CSSAlignContent,
    CSSAlignSelf,
    CSSFlexBasis,
    CSSFlexGrowShrink,
    CSSOrder,
    CSSGap,
    CSSGridAutoFlow,
    CSSGridTemplate,
    CSSPlaceItems,
    CSSPlaceContent,
    CSSPlaceSelf,
    FlexGridProperties
} from "./properties/flex-grid.ts";

// Typography
export type {
    CSSTextAlign,
    CSSTextDecoration,
    CSSTextTransform,
    CSSWhiteSpace,
    CSSWordBreak,
    CSSWordWrap,
    CSSFontWeight,
    CSSFontStyle,
    CSSTextOverflow,
    CSSVerticalAlign,
    CSSLineHeight,
    CSSLetterSpacing,
    TypographyProperties
} from "./properties/typography.ts";

// Visual (Colors, Backgrounds, Borders, Effects)
export type {
    ColorRGB,
    ColorHSL,
    ColorHWB,
    ColorOKLCH,
    ColorLab,
    ColorLCH,
    ColorOKLab,
    ColorHex,
    ColorFunction,
    ColorMix,
    CSSNamedColor,
    CSSColor,
    CSSObjectFit,
    CSSObjectPosition,
    CSSBackgroundSize,
    CSSBackgroundRepeat,
    CSSBackgroundPosition,
    CSSBackgroundAttachment,
    CSSBackgroundClip,
    CSSBorderStyle,
    CSSListStyleType,
    CSSListStylePosition,
    CSSFilter,
    CSSMixBlendMode,
    CSSBoxShadow,
    CSSOpacity,
    VisualProperties
} from "./properties/visual.ts";

// Transform & Animation
export type {
    CSSTransform,
    CSSTransformOrigin,
    CSSTransitionTimingFunction,
    CSSAnimationDirection,
    CSSAnimationFillMode,
    CSSAnimationPlayState,
    CSSWillChange,
    TransformProperties
} from "./properties/transform.ts";

// Interaction & Misc
export type {
    CSSCursor,
    CSSPointerEvents,
    CSSUserSelect,
    CSSResize,
    InteractionProperties,
    TableProperties
} from "./properties/interaction.ts";

// =============================================================================
// STRICT CSS PROPERTIES INTERFACE
// =============================================================================

/**
 * Strict CSS properties interface with autocomplete.
 * Aggregates all modular CSS property interfaces.
 */
export interface StrictCSSProperties extends
    LayoutProperties,
    BoxModelProperties,
    FlexGridProperties,
    TypographyProperties,
    VisualProperties,
    TransformProperties,
    InteractionProperties,
    TableProperties {
    // Color is defined in TypographyProperties but we override with strict CSSColor type
    color?: CSSColor;
}

// =============================================================================
// REACTIVE CSS UTILITIES
// =============================================================================

/**
 * Allows mixing of static and signal values in property objects.
 * Each property can be either its original static type OR a Signal of that type.
 *
 * @example
 * const color = $("red");
 * div({
 *   style: {
 *     color: color,        // Signal<string> ✓
 *     fontSize: "16px",    // string ✓
 *     padding: $(padding), // Signal<string> ✓
 *   }
 * });
 */
export type MixedReactiveProperties<T> = {
    [K in keyof T]: T[K] | Signal<NonNullable<T[K]>>;
};

/**
 * Reactive CSS properties allowing signals OR static values for any property.
 * This is the main type for style objects in Flick - it supports mixing reactive
 * and static values in the same object.
 *
 * @example
 * // All of these work:
 * { color: "red" }                           // All static
 * { color: $(myColor) }                      // All signals
 * { color: $(myColor), fontSize: "16px" }    // Mixed! ✓
 */
export type ReactiveCSSProperties = MixedReactiveProperties<StrictCSSProperties>;
