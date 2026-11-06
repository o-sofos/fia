
import type { Signal } from "../reactivity/reactivity.ts";
import type { CSSGlobalValues } from "./properties/common.ts";
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
    CSSOverscrollBehavior,
    CSSScrollSnapType,
    CSSScrollSnapAlign,
    InteractionProperties,
    TableProperties
} from "./properties/interaction.ts";

// =============================================================================
// STANDARD CSS PROPERTIES (lib.dom fallback)
// =============================================================================

/** Properties with hand-written value types (literal unions, lengths, colors). */
type TypedCSSProperties =
    & LayoutProperties
    & BoxModelProperties
    & FlexGridProperties
    & TypographyProperties
    & VisualProperties
    & TransformProperties
    & InteractionProperties
    & TableProperties;

/**
 * Every other CSS property the DOM lib knows about, accepted as a string.
 *
 * Derived from `CSSStyleDeclaration` so coverage tracks the TypeScript lib
 * (including `webkit*` vendor properties), and homomorphic so editors keep
 * the lib's MDN docs on hover. Numbers are deliberately not accepted here:
 * auto-px is only safe where a property is known to take a length.
 */
export type StandardCSSProperties = {
    -readonly [K in keyof CSSStyleDeclaration as K extends keyof TypedCSSProperties | "cssText"
        ? never
        : K extends string
        ? CSSStyleDeclaration[K] extends string ? K : never
        : never]?: CSSGlobalValues | (string & {});
};

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
    TableProperties,
    StandardCSSProperties {
    // Color is defined in TypographyProperties but we override with strict CSSColor type
    color?: CSSColor;
    /**
     * CSS custom properties (variables). Values pass through as-is —
     * numbers are NOT auto-suffixed with "px" here.
     * @example { "--brand": "oklch(0.7 0.1 200)", "--columns": 3 }
     */
    [customProperty: `--${string}`]: string | number | undefined;
}

// =============================================================================
// REACTIVE CSS UTILITIES
// =============================================================================

/**
 * Allows mixing of static and signal values in property objects.
 * Each property can be either its original static type OR a Signal of that type.
 *
 * For best DX, signals with widened types (Signal<string>, Signal<number>) are also
 * accepted for CSS properties, so developers never need type annotations.
 */
export type MixedReactiveProperties<T> = {
    [K in keyof T]:
    | T[K]
    | Signal<NonNullable<T[K]>>
    // Accept Signal<string> for string-based properties (allows widened signals)
    | (NonNullable<T[K]> extends string ? Signal<string> : never)
    // Accept Signal<number> for number-based properties
    | (NonNullable<T[K]> extends number ? Signal<number> : never);
};

/**
 * Reactive CSS properties allowing signals OR static values for any property.
 * This is the main type for style objects in Flick - it supports mixing reactive
 * and static values in the same object.
 */
export type ReactiveCSSProperties = MixedReactiveProperties<StrictCSSProperties>;
// export type ReactiveCSSProperties = Partial<StrictCSSProperties>;
