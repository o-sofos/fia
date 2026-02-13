import type { Signal } from "fia";
import type { ReactiveCSSProperties } from "../css/css-types";
import type { AssignableString } from "./elements";

/**
 * Smart Element type that properly narrows properties from props.
 * Uses Omit to remove overlapping properties from the base element,
 * then merges with props to ensure narrower types (like literal strings) are preserved.
 *
 * Special handling for `style`: merges with ReactiveCSSProperties so all CSS
 * properties are available, while keeping defined properties narrowed.
 */
export type SmartElement<K extends keyof HTMLElementTagNameMap, P> = Omit<
  HTMLElementTagNameMap[K],
  keyof P
> &
  UnwrapSignalsInProps<ProcessedProps<P>>;

/**
 * Style type preserving literal types for defined properties.
 * Shows the exact literal value AND allows assignment of other strings.
 * The branded string type prevents TypeScript from simplifying the union.
 */
export type NarrowedStyle<S> = {
  -readonly [K in keyof S]: S[K] | AssignableString;
};

/**
 * Combined style type: narrowed defined props + full CSS for others.
 */
export type MergedStyle<S> = S extends object
  ? NarrowedStyle<S> & Omit<ReactiveCSSProperties, keyof S>
  : ReactiveCSSProperties;

/**
 * Processes props to merge style property with full CSS types.
 * Directly accesses P["style"] to preserve literal types from the input.
 */
export type ProcessedProps<P> = P extends { style: infer S }
  ? S extends object
    ? Omit<P, "style"> & { style: MergedStyle<S> }
    : P
  : P;

/**
 * Unwraps Signal types in properties to their inner values.
 * This ensures that if a prop is passed as a Signal (e.g. textContent: Signal<string>),
 * the resulting element property is typed as the value (string), not the Signal.
 */
export type UnwrapSignalsInProps<P> = {
  [K in keyof P]: P[K] extends Signal<infer U> ? U : P[K];
};
