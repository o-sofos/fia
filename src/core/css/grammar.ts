/**
 * Type-level CSS value grammars.
 *
 * Parses the *literal* string written in a style object and resolves to `true`
 * when it is valid CSS for that property. Zero runtime — types only.
 *
 * Policy:
 * - Literal values are parsed strictly against the property's grammar.
 * - Widened `string` values (runtime data) can't be checked and pass through.
 * - `var()`/`env()` stand in for any token; `calc()`-family math functions are
 *   accepted wherever a number, length, percentage, time or angle is.
 * - Math/`var()`/color function arguments are not parsed further.
 */

import type { CSSGlobalValues } from "./properties/common";
import type { CSSNamedColor } from "./properties/visual";
import type { StrictCSSProperties } from "./css-types";

// =============================================================================
// HIGHER-KINDED HELPERS
// =============================================================================

/** A type-level predicate over a string token */
interface Pred {
  input: string;
  output: boolean;
}

type Apply<F extends Pred, X extends string> = (F & { input: X })["output"];

/** Every token satisfies F (and there is at least one token) */
type Every<T extends string[], F extends Pred> = T extends []
  ? false
  : EveryRest<T, F>;
type EveryRest<T extends string[], F extends Pred> = T extends [
  infer H extends string,
  ...infer R extends string[],
]
  ? Apply<F, H> extends true
    ? EveryRest<R, F>
    : false
  : true;

// =============================================================================
// TOKENIZING
// =============================================================================

type WS = " " | "\n" | "\t";

type TrimStart<S extends string> = S extends `${WS}${infer R}` ? TrimStart<R> : S;
type TrimEnd<S extends string> = S extends `${infer R} `
  ? TrimEnd<R>
  : S extends `${infer R}\n`
  ? TrimEnd<R>
  : S extends `${infer R}\t`
  ? TrimEnd<R>
  : S;
type Trim<S extends string> = TrimEnd<TrimStart<S>>;

/** Never matches any predicate — marks unbalanced brackets */
type Invalid = "\u0000";

/**
 * Split at top-level separators, respecting (...) and [...] nesting.
 * Unbalanced input yields a single invalid token.
 */
type Split<
  S extends string,
  Sep extends string,
  Depth extends 0[] = [],
  Cur extends string = "",
  Out extends string[] = [],
> = S extends `${infer C}${infer R}`
  ? C extends "(" | "["
    ? Split<R, Sep, [...Depth, 0], `${Cur}${C}`, Out>
    : C extends ")" | "]"
    ? Depth extends [0, ...infer D extends 0[]]
      ? Split<R, Sep, D, `${Cur}${C}`, Out>
      : [Invalid]
    : C extends Sep
    ? Depth extends []
      ? Split<R, Sep, Depth, "", [...Out, Cur]>
      : Split<R, Sep, Depth, `${Cur}${C}`, Out>
    : Split<R, Sep, Depth, `${Cur}${C}`, Out>
  : Depth extends []
  ? [...Out, Cur]
  : [Invalid];

type DropEmpty<T extends string[], Out extends string[] = []> = T extends [
  infer H extends string,
  ...infer R extends string[],
]
  ? DropEmpty<R, H extends "" ? Out : [...Out, H]>
  : Out;

type TrimAll<T extends string[], Out extends string[] = []> = T extends [
  infer H extends string,
  ...infer R extends string[],
]
  ? TrimAll<R, [...Out, Trim<H>]>
  : Out;

/** Space-separated tokens */
type Words<S extends string> = DropEmpty<Split<S, WS>>;

/** Comma-separated items, trimmed (empty items stay, and fail) */
type Commas<S extends string> = TrimAll<Split<S, ",">>;

// =============================================================================
// PRIMITIVES
// =============================================================================

type Lower =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m"
  | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type IdentStart = Lower | Uppercase<Lower> | "_" | "-";
type IdentChar = IdentStart | Digit;
type HexChar = Digit | "a" | "b" | "c" | "d" | "e" | "f" | "A" | "B" | "C" | "D" | "E" | "F";

/** `var()`/`env()` may expand to anything, so they match any token */
type Substitution = `var(--${string})` | `env(${string})`;
type MathFn = `${"calc" | "min" | "max" | "clamp" | "round" | "mod" | "rem" | "abs" | "sign"}(${string})`;
type Numeric = MathFn | Substitution;

/**
 * TS's `${number}` also accepts hex/binary/octal and surrounding whitespace;
 * CSS numbers are decimal only.
 */
type IsNumber<S extends string> = S extends `${number}`
  ? S extends `${string}${"x" | "X" | "b" | "B" | "o" | "O" | WS}${string}`
    ? false
    : true
  : S extends Numeric
  ? true
  : false;

type IsInteger<S extends string> = S extends `${bigint}` ? true : S extends Numeric ? true : false;

/**
 * `<number><unit>` where the number part is a valid CSS number. Each unit is
 * tried separately: matching against a union suffix would let "10ms" infer
 * "10m" for unit "s".
 */
type HasUnit<S extends string, U extends string> = true extends HasUnitEach<S, U> ? true : false;
type HasUnitEach<S extends string, U extends string> = U extends string
  ? S extends `${infer N}${U}`
    ? N extends Numeric ? false : IsNumber<N>
    : false
  : never;

type LengthUnit =
  | "px" | "em" | "rem" | "ex" | "rex" | "ch" | "rch" | "cap" | "rcap" | "ic" | "ric" | "lh" | "rlh"
  | "vw" | "vh" | "vi" | "vb" | "vmin" | "vmax"
  | "svw" | "svh" | "svi" | "svb" | "svmin" | "svmax"
  | "lvw" | "lvh" | "lvi" | "lvb" | "lvmin" | "lvmax"
  | "dvw" | "dvh" | "dvi" | "dvb" | "dvmin" | "dvmax"
  | "cqw" | "cqh" | "cqi" | "cqb" | "cqmin" | "cqmax"
  | "cm" | "mm" | "Q" | "in" | "pt" | "pc";

type IsLength<S extends string> = S extends "0" | Numeric ? true : HasUnit<S, LengthUnit>;
type IsPercentage<S extends string> = S extends Numeric ? true : HasUnit<S, "%">;
type IsLengthPercentage<S extends string> = IsLength<S> extends true ? true : IsPercentage<S>;
type IsTime<S extends string> = S extends Numeric ? true : HasUnit<S, "s" | "ms">;
type IsAngle<S extends string> = S extends "0" | Numeric ? true : HasUnit<S, "deg" | "rad" | "grad" | "turn">;
type IsAnglePercentage<S extends string> = IsAngle<S> extends true ? true : IsPercentage<S>;
type IsFlex<S extends string> = HasUnit<S, "fr">;

type AllChars<S extends string, C extends string> = S extends `${infer H}${infer R}`
  ? H extends C ? AllChars<R, C> : false
  : true;

type IsIdent<S extends string> = S extends `${infer H}${infer R}`
  ? H extends IdentStart
    ? S extends "-" ? false : AllChars<R, IdentChar>
    : false
  : false;

type Length<S extends string, N extends 0[] = []> = S extends `${string}${infer R}`
  ? Length<R, [...N, 0]>
  : N["length"];

type IsHexColor<S extends string> = S extends `#${infer H}`
  ? AllChars<H, HexChar> extends true
    ? Length<H> extends 3 | 4 | 6 | 8 ? true : false
    : false
  : false;

type ColorFn = `${
  | "rgb" | "rgba" | "hsl" | "hsla" | "hwb" | "lab" | "lch" | "oklab" | "oklch"
  | "color" | "color-mix" | "light-dark" | "contrast-color"
}(${string})`;

type IsColor<S extends string> = S extends CSSNamedColor | "currentcolor" | ColorFn | Substitution
  ? true
  : IsHexColor<S>;

interface IsIdentFn extends Pred { output: IsIdent<this["input"]> }
interface IsNumberFn extends Pred { output: IsNumber<this["input"]> }
interface IsTimeFn extends Pred { output: IsTime<this["input"]> }

// =============================================================================
// GRID TRACKS
// =============================================================================

type IsInflexibleBreadth<S extends string> = S extends "auto" | "min-content" | "max-content"
  ? true
  : IsLengthPercentage<S>;

type IsTrackBreadth<S extends string> = IsInflexibleBreadth<S> extends true ? true : IsFlex<S>;

type IsTrackSize<S extends string> = IsTrackBreadth<S> extends true
  ? true
  : S extends `minmax(${infer A})`
  ? Commas<A> extends [infer Min extends string, infer Max extends string]
    ? IsInflexibleBreadth<Min> extends true ? IsTrackBreadth<Max> : false
    : false
  : S extends `fit-content(${infer A})`
  ? IsLengthPercentage<Trim<A>>
  : false;

/** `[name1 name2]` */
type IsLineNames<S extends string> = S extends `[${infer Inner}]`
  ? Words<Inner> extends [] ? true : Every<Words<Inner>, IsIdentFn>
  : false;

type IsTrackListItem<S extends string> = IsTrackSize<S> extends true
  ? true
  : IsLineNames<S> extends true
  ? true
  : S extends `repeat(${infer A})`
  ? Commas<A> extends [infer Count extends string, infer Tracks extends string]
    ? (Count extends "auto-fill" | "auto-fit" ? true : IsInteger<Count>) extends true
      ? Every<Words<Tracks>, IsTrackListItemFn>
      : false
    : false
  : S extends Substitution
  ? true
  : false;

interface IsTrackListItemFn extends Pred { output: IsTrackListItem<this["input"]> }
interface IsTrackSizeFn extends Pred { output: IsTrackSize<this["input"]> }

/** grid-template-columns / grid-template-rows */
type IsTrackList<S extends string> = S extends "none" | "masonry"
  ? true
  : Words<S> extends ["subgrid", ...infer Names extends string[]]
  ? Names extends [] ? true : Every<Names, IsLineNamesFn>
  : Every<Words<S>, IsTrackListItemFn>;

interface IsLineNamesFn extends Pred { output: IsLineNames<this["input"]> }

// =============================================================================
// EASING
// =============================================================================

type EasingKeyword = "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out" | "step-start" | "step-end";
type StepPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both" | "start" | "end";

/** `linear()` stop: `<number> [<percentage>{1,2}]` */
type IsLinearStop<S extends string> = Words<S> extends [infer N extends string, ...infer P extends string[]]
  ? IsNumber<N> extends true
    ? P extends [] ? true
    : P extends [infer A extends string] ? IsPercentage<A>
    : P extends [infer A extends string, infer B extends string]
    ? IsPercentage<A> extends true ? IsPercentage<B> : false
    : false
    : false
  : false;
interface IsLinearStopFn extends Pred { output: IsLinearStop<this["input"]> }

type IsEasing<S extends string> = S extends EasingKeyword | Substitution
  ? true
  : S extends `cubic-bezier(${infer A})`
  ? Commas<A> extends [string, string, string, string] ? Every<Commas<A>, IsNumberFn> : false
  : S extends `steps(${infer A})`
  ? Commas<A> extends [infer N extends string]
    ? IsInteger<N>
    : Commas<A> extends [infer N extends string, infer P]
    ? P extends StepPosition ? IsInteger<N> : false
    : false
  : S extends `linear(${infer A})`
  ? Every<Commas<A>, IsLinearStopFn>
  : false;
interface IsEasingFn extends Pred { output: IsEasing<this["input"]> }

// =============================================================================
// TRANSITIONS
// =============================================================================

type CamelToKebab<S extends string> = S extends `${infer C}${infer R}`
  ? C extends Lowercase<C>
    ? `${C}${CamelToKebab<R>}`
    : `-${Lowercase<C>}${CamelToKebab<R>}`
  : "";

type StartsUpper<S extends string> = S extends `${infer F}${string}`
  ? F extends Lowercase<F> ? false : true
  : false;

/** `webkitLineClamp` → `-webkit-line-clamp`, but `msFoo`-like standard names stay */
type IsVendor<K extends string> = true extends (
  "webkit" | "moz" | "ms" extends infer P extends string
    ? P extends string
      ? K extends `${P}${infer R}` ? StartsUpper<R> : false
      : never
    : never
) ? true : false;

type KebabProperty<K extends string> = K extends "cssFloat"
  ? "float"
  : IsVendor<K> extends true
  ? `-${CamelToKebab<K>}`
  : CamelToKebab<K>;

/** Every CSS property name in kebab-case, e.g. "background-color", "-webkit-line-clamp" */
export type CSSPropertyName = KebabProperty<
  Exclude<keyof StrictCSSProperties, `--${string}` | number | symbol>
>;

type IsTransitionProperty<S extends string> = S extends "all" | CSSPropertyName | `--${string}` | Substitution
  ? true
  : false;
interface IsTransitionPropertyFn extends Pred {
  output: this["input"] extends "none" ? true : IsTransitionProperty<this["input"]>;
}

type Count<T extends unknown[], N extends number> = T["length"] extends N ? true : false;

/**
 * One `transition` layer: `[property] [duration] [easing] [delay] [behavior]`
 * in any order — at most one of each, durations before delays.
 */
type IsSingleTransition<
  T extends string[],
  Times extends 0[] = [],
  Ease extends 0[] = [],
  Prop extends 0[] = [],
  Behavior extends 0[] = [],
> = T extends [infer H extends string, ...infer R extends string[]]
  ? H extends Substitution
    ? IsSingleTransition<R, Times, Ease, Prop, Behavior>
    : IsTime<H> extends true
    ? Count<Times, 2> extends true ? false : IsSingleTransition<R, [...Times, 0], Ease, Prop, Behavior>
    : IsEasing<H> extends true
    ? Count<Ease, 1> extends true ? false : IsSingleTransition<R, Times, [...Ease, 0], Prop, Behavior>
    : H extends "normal" | "allow-discrete"
    ? Count<Behavior, 1> extends true ? false : IsSingleTransition<R, Times, Ease, Prop, [...Behavior, 0]>
    : (H extends "none" ? true : IsTransitionProperty<H>) extends true
    ? Count<Prop, 1> extends true ? false : IsSingleTransition<R, Times, Ease, [...Prop, 0], Behavior>
    : false
  : true;
interface IsSingleTransitionFn extends Pred {
  output: Words<this["input"]> extends [] ? false : IsSingleTransition<Words<this["input"]>>;
}

// =============================================================================
// ANIMATIONS
// =============================================================================

type AnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse";
type AnimationFillMode = "none" | "forwards" | "backwards" | "both";
type AnimationPlayState = "running" | "paused";

type IsIterationCount<S extends string> = S extends "infinite" ? true : IsNumber<S>;
interface IsIterationCountFn extends Pred { output: IsIterationCount<this["input"]> }
interface IsAnimationNameFn extends Pred {
  output: this["input"] extends "none" ? true : IsIdent<this["input"]>;
}
interface IsAnimationDurationFn extends Pred {
  output: this["input"] extends "auto" ? true : IsTime<this["input"]>;
}

/** One `animation` layer: keywords classify first; an identifier left over is the name */
type IsSingleAnimation<
  T extends string[],
  Times extends 0[] = [],
  Ease extends 0[] = [],
  Iter extends 0[] = [],
  Dir extends 0[] = [],
  Fill extends 0[] = [],
  Play extends 0[] = [],
  Name extends 0[] = [],
> = T extends [infer H extends string, ...infer R extends string[]]
  ? H extends Substitution
    ? IsSingleAnimation<R, Times, Ease, Iter, Dir, Fill, Play, Name>
    : IsTime<H> extends true
    ? Count<Times, 2> extends true ? false : IsSingleAnimation<R, [...Times, 0], Ease, Iter, Dir, Fill, Play, Name>
    : IsEasing<H> extends true
    ? Count<Ease, 1> extends true ? false : IsSingleAnimation<R, Times, [...Ease, 0], Iter, Dir, Fill, Play, Name>
    : IsIterationCount<H> extends true
    ? Count<Iter, 1> extends true ? false : IsSingleAnimation<R, Times, Ease, [...Iter, 0], Dir, Fill, Play, Name>
    : H extends AnimationDirection
    ? Count<Dir, 1> extends true ? false : IsSingleAnimation<R, Times, Ease, Iter, [...Dir, 0], Fill, Play, Name>
    : H extends AnimationFillMode
    ? Count<Fill, 1> extends true ? false : IsSingleAnimation<R, Times, Ease, Iter, Dir, [...Fill, 0], Play, Name>
    : H extends AnimationPlayState
    ? Count<Play, 1> extends true ? false : IsSingleAnimation<R, Times, Ease, Iter, Dir, Fill, [...Play, 0], Name>
    : IsIdent<H> extends true
    ? Count<Name, 1> extends true ? false : IsSingleAnimation<R, Times, Ease, Iter, Dir, Fill, Play, [...Name, 0]>
    : false
  : true;
interface IsSingleAnimationFn extends Pred {
  output: Words<this["input"]> extends [] ? false : IsSingleAnimation<Words<this["input"]>>;
}

// =============================================================================
// GRADIENTS & IMAGES
// =============================================================================

type Side = "left" | "right" | "top" | "bottom";
type ColorSpace =
  | "srgb" | "srgb-linear" | "display-p3" | "a98-rgb" | "prophoto-rgb" | "rec2020"
  | "lab" | "oklab" | "xyz" | "xyz-d50" | "xyz-d65"
  | "hsl" | "hwb" | "lch" | "oklch";
type HueMethod = "shorter" | "longer" | "increasing" | "decreasing";

/** Remove an `in <color-space> [<hue-method> hue]` run, or mark failure */
type StripInterpolation<T extends string[], Out extends string[] = []> = T extends [
  infer H extends string,
  ...infer R extends string[],
]
  ? H extends "in"
    ? R extends [infer Space extends string, ...infer R2 extends string[]]
      ? Space extends ColorSpace
        ? R2 extends [HueMethod, "hue", ...infer R3 extends string[]]
          ? [...Out, ...R3]
          : [...Out, ...R2]
        : [Invalid]
      : [Invalid]
    : StripInterpolation<R, [...Out, H]>
  : Out;

type IsPositionToken<S extends string> = S extends Side | "center" ? true : IsLengthPercentage<S>;
interface IsPositionTokenFn extends Pred { output: IsPositionToken<this["input"]> }
type IsPosition<T extends string[]> = T extends [] ? false
  : T["length"] extends 1 | 2 | 3 | 4 ? Every<T, IsPositionTokenFn> : false;

/** `to <side> [<side>]` or an angle */
type IsLinearPrelude<T extends string[]> = T extends [infer A extends string]
  ? IsAngle<A>
  : T extends ["to", Side]
  ? true
  : T extends ["to", infer A extends Side, infer B extends Side]
  ? [A, B] extends ["left" | "right", "top" | "bottom"] | ["top" | "bottom", "left" | "right"] ? true : false
  : false;

type RadialSize = "closest-side" | "closest-corner" | "farthest-side" | "farthest-corner";
type IsRadialShapeToken<S extends string> = S extends "circle" | "ellipse" | RadialSize ? true : IsLengthPercentage<S>;
interface IsRadialShapeTokenFn extends Pred { output: IsRadialShapeToken<this["input"]> }

/** Split a token list at the first `at`: [before, after] or [all] when absent */
type SplitAt<T extends string[], Before extends string[] = []> = T extends [
  infer H extends string,
  ...infer R extends string[],
]
  ? H extends "at" ? [Before, R] : SplitAt<R, [...Before, H]>
  : [Before];

/** `[<shape> <size>] [at <position>]` */
type IsRadialPrelude<T extends string[]> = SplitAt<T> extends [
  infer Shape extends string[],
  infer Pos extends string[],
]
  ? (Shape extends [] ? true : Every<Shape, IsRadialShapeTokenFn>) extends true ? IsPosition<Pos> : false
  : Every<T, IsRadialShapeTokenFn>;

/** `[from <angle>] [at <position>]` */
type IsConicPrelude<T extends string[]> = T extends ["from", infer A extends string, ...infer R extends string[]]
  ? IsAngle<A> extends true ? (R extends [] ? true : R extends ["at", ...infer P extends string[]] ? IsPosition<P> : false) : false
  : T extends ["at", ...infer P extends string[]]
  ? IsPosition<P>
  : false;

/** `<color> [<pos> [<pos>]]` or a bare `<pos>` transition hint */
type IsColorStop<S extends string, Conic extends boolean> = Words<S> extends [infer C extends string, ...infer P extends string[]]
  ? IsColor<C> extends true
    ? P extends [] ? true
    : P extends [infer A extends string] ? IsStopPosition<A, Conic>
    : P extends [infer A extends string, infer B extends string]
    ? IsStopPosition<A, Conic> extends true ? IsStopPosition<B, Conic> : false
    : false
    : P extends [] ? IsStopPosition<C, Conic> : false
  : false;
type IsStopPosition<S extends string, Conic extends boolean> = Conic extends true
  ? IsAnglePercentage<S>
  : IsLengthPercentage<S>;
interface IsLinearStopItemFn extends Pred { output: IsColorStop<this["input"], false> }
interface IsConicStopItemFn extends Pred { output: IsColorStop<this["input"], true> }

/** First argument may be a prelude; otherwise everything is a color stop */
type IsGradientArgs<Items extends string[], Kind extends "linear" | "radial" | "conic"> = Items extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? IsPrelude<StripInterpolation<Words<First>>, Kind, Words<First>> extends true
    ? Every<Rest, Kind extends "conic" ? IsConicStopItemFn : IsLinearStopItemFn>
    : Every<Items, Kind extends "conic" ? IsConicStopItemFn : IsLinearStopItemFn>
  : false;

type IsPrelude<T extends string[], Kind, Original extends string[]> =
  // A bare `in <space>` prelude strips to nothing
  T extends [] ? (Original extends [] ? false : true)
  : T extends [Invalid] ? false
  : Kind extends "linear" ? IsLinearPrelude<T>
  : Kind extends "radial" ? IsRadialPrelude<T>
  : IsConicPrelude<T>;

type IsImage<S extends string> = S extends `url(${string})` | Substitution
  ? true
  : S extends `${"" | "repeating-"}linear-gradient(${infer A})`
  ? IsGradientArgs<Commas<A>, "linear">
  : S extends `${"" | "repeating-"}radial-gradient(${infer A})`
  ? IsGradientArgs<Commas<A>, "radial">
  : S extends `${"" | "repeating-"}conic-gradient(${infer A})`
  ? IsGradientArgs<Commas<A>, "conic">
  : S extends `${"image-set" | "cross-fade" | "element" | "paint"}(${string})`
  ? true
  : false;
interface IsImageLayerFn extends Pred {
  output: this["input"] extends "none" ? true : IsImage<this["input"]>;
}

// =============================================================================
// PROPERTY → GRAMMAR TABLE
// =============================================================================

interface TrackListFn extends Pred { output: IsTrackList<Trim<this["input"]>> }
interface AutoTracksFn extends Pred { output: Every<Words<this["input"]>, IsTrackSizeFn> }
interface ListOf<F extends Pred> extends Pred { output: Every<Commas<this["input"]>, F> }
interface TransitionPropertyListFn extends Pred {
  output: Trim<this["input"]> extends "none" ? true : Every<Commas<this["input"]>, IsTransitionPropertyFn>;
}

/** Properties whose literal values are parsed. Everything else uses its declared type. */
interface StyleGrammars {
  gridTemplateColumns: TrackListFn;
  gridTemplateRows: TrackListFn;
  gridAutoColumns: AutoTracksFn;
  gridAutoRows: AutoTracksFn;

  transition: ListOf<IsSingleTransitionFn>;
  transitionProperty: TransitionPropertyListFn;
  transitionDuration: ListOf<IsTimeFn>;
  transitionDelay: ListOf<IsTimeFn>;
  transitionTimingFunction: ListOf<IsEasingFn>;

  animation: ListOf<IsSingleAnimationFn>;
  animationName: ListOf<IsAnimationNameFn>;
  animationDuration: ListOf<IsAnimationDurationFn>;
  animationDelay: ListOf<IsTimeFn>;
  animationTimingFunction: ListOf<IsEasingFn>;
  animationIterationCount: ListOf<IsIterationCountFn>;

  backgroundImage: ListOf<IsImageLayerFn>;
  maskImage: ListOf<IsImageLayerFn>;
}

/**
 * Whether a style value is valid for property K. Distributes over unions, so
 * `cond ? "1fr" : "2fx"` fails on the bad branch.
 */
export type IsValidStyleValue<K, V> = V extends string
  ? string extends V
    ? true // widened at runtime — can't be checked
    : V extends CSSGlobalValues | Substitution
    ? true
    : K extends keyof StyleGrammars
    ? Apply<StyleGrammars[K], V>
    : true
  : true;

/** @internal exported for type tests */
export type { IsColor, IsTrackList, IsEasing, IsImage, IsLength, IsTime };
