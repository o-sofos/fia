import type { CSSGlobalValues } from "./common";
import type { CSSAngle, CSSLength } from "./units";

export type { CSSAngle };

export type CSSTransform =
    | "none"
    | `matrix(${string})`
    | `translate(${string})`
    | `translateX(${string})`
    | `translateY(${string})`
    | `scale(${string})`
    | `scaleX(${string})`
    | `scaleY(${string})`
    | `rotate(${string})`
    | `skew(${string})`
    | `skewX(${string})`
    | `skewY(${string})`
    | `matrix3d(${string})`
    | `translate3d(${string})`
    | `translateZ(${string})`
    | `scale3d(${string})`
    | `scaleZ(${string})`
    | `rotate3d(${string})`
    | `rotateX(${string})`
    | `rotateY(${string})`
    | `rotateZ(${string})`
    | `perspective(${string})`
    | (string & {});

export type CSSTransformOrigin = "center" | "top" | "bottom" | "left" | "right" | CSSGlobalValues | (string & {});

export type CSSTransitionTimingFunction =
    | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear" | "step-start" | "step-end"
    | CSSGlobalValues | (string & {});

export type CSSAnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse" | CSSGlobalValues;

export type CSSAnimationFillMode = "none" | "forwards" | "backwards" | "both" | CSSGlobalValues;

export type CSSAnimationPlayState = "running" | "paused" | CSSGlobalValues;

export type CSSWillChange =
    | "auto"
    | "scroll-position"
    | "contents"
    | "transform"
    | "opacity"
    | "left"
    | "top"
    | "right"
    | "bottom"
    | (string & {});

export interface TransformProperties {
    // Transform
    transform?: CSSTransform;
    transformOrigin?: CSSTransformOrigin;
    transformStyle?: "flat" | "preserve-3d" | CSSGlobalValues;
    perspective?: CSSLength;
    perspectiveOrigin?: CSSTransformOrigin;
    backfaceVisibility?: "visible" | "hidden" | CSSGlobalValues;
    transformBox?: "content-box" | "border-box" | "fill-box" | "stroke-box" | "view-box" | CSSGlobalValues;

    // Individual transforms (applied before the transform property)
    /** One to three lengths: `x [y [z]]`. Bare numbers are px. */
    translate?: "none" | CSSLength;
    /**
     * An angle, optionally preceded by an axis: `"45deg"`, `"x 90deg"`, `"1 1 0 45deg"`.
     * Bare numbers are not accepted — an angle needs a unit.
     */
    rotate?: "none" | CSSAngle | `${"x" | "y" | "z"} ${CSSAngle}` | CSSGlobalValues | (string & {});
    /** One to three unitless factors or percentages: `1.5`, `"2 0.5"`, `"150%"`. */
    scale?: "none" | number | `${number}` | `${number}%` | CSSGlobalValues | (string & {});

    // Transition
    transition?: string;
    transitionProperty?: string;
    transitionDuration?: string;
    transitionTimingFunction?: CSSTransitionTimingFunction;
    transitionDelay?: string;
    transitionBehavior?: "normal" | "allow-discrete" | CSSGlobalValues;

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

    // Optimization
    willChange?: CSSWillChange;
    contain?: "none" | "strict" | "content" | "size" | "layout" | "style" | "paint" | "inline-size" | "block-size" | (string & {});

}
