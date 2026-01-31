/**
 * Flick Reactivity Utility Types
 *
 * Helper types for common reactive patterns that make working with signals
 * more ergonomic and expressive. These types help reduce boilerplate and
 * document common use cases directly in the type system.
 */

import type { Signal, WritableSignal, MaybeSignal } from "./reactivity";
import type { ReactiveCSSProperties } from "../css/css-types";

// =============================================================================
// SIGNAL UNWRAPPING UTILITIES
// =============================================================================

/**
 * Extract the inner type from a Signal<T>.
 * If the type is not a signal, returns it unchanged.
 *
 * @example
 * type Num = UnwrapSignal<Signal<number>>;        // number
 * type Str = UnwrapSignal<string>;                // string
 * type Val = UnwrapSignal<Signal<string> | null>; // string | null
 */
export type UnwrapSignal<T> = T extends Signal<infer U> ? U : T;

/**
 * Convert all Signal<T> properties in an object to T.
 * Useful for extracting plain data from reactive state.
 *
 * @example
 * type ReactiveUser = {
 *   name: Signal<string>;
 *   age: Signal<number>;
 * };
 * type User = UnwrapSignals<ReactiveUser>;
 * // { name: string; age: number }
 */
export type UnwrapSignals<T> = {
  [K in keyof T]: UnwrapSignal<T[K]>;
};

// =============================================================================
// SIGNAL CREATION UTILITIES
// =============================================================================

/**
 * Make all properties in an object Signal<T>.
 * Converts a plain object type to a reactive object type.
 *
 * @example
 * type User = { name: string; age: number };
 * type ReactiveUser = Signalize<User>;
 * // { name: Signal<string>; age: Signal<number> }
 */
export type Signalize<T> = {
  [K in keyof T]: Signal<NonNullable<T[K]>>;
};

/**
 * Make specific properties reactive while keeping others static.
 * Useful for partial reactivity in component state.
 *
 * @example
 * type User = { name: string; age: number; id: string };
 * type PartialReactive = SignalizeKeys<User, "name" | "age">;
 * // { name: Signal<string>; age: Signal<number>; id: string }
 */
export type SignalizeKeys<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? Signal<NonNullable<T[P]>> : T[P];
};

/**
 * Make all properties writable signals.
 * For state that needs to be both read and written.
 *
 * @example
 * type FormData = { email: string; password: string };
 * type WritableForm = WritableSignals<FormData>;
 * // { email: WritableSignal<string>; password: WritableSignal<string> }
 */
export type WritableSignals<T> = {
  [K in keyof T]: WritableSignal<NonNullable<T[K]>>;
};

// =============================================================================
// READONLY UTILITIES
// =============================================================================

/**
 * Convert WritableSignal<T> properties to readonly Signal<T>.
 * Useful for exposing state publicly without allowing external mutations.
 *
 * @example
 * type State = {
 *   count: WritableSignal<number>;
 *   name: WritableSignal<string>;
 * };
 * type ReadonlyState = ReadonlySignals<State>;
 * // { readonly count: Signal<number>; readonly name: Signal<string> }
 */
export type ReadonlySignals<T> = {
  readonly [K in keyof T]: T[K] extends WritableSignal<infer U> ? Signal<U> : T[K];
};

// =============================================================================
// PROP HELPER TYPES
// =============================================================================

/**
 * Helper type for style props that accept both object and string forms.
 * Simplifies component prop definitions.
 *
 * @example
 * interface MyComponentProps {
 *   style?: StyleProp;
 * }
 * // Accepts: "color: red", $(styleString), { color: "red" }, { color: $(c) }
 */
export type StyleProp = MaybeSignal<string> | ReactiveCSSProperties;

/**
 * Helper type for class props that accept string or conditional object forms.
 *
 * @example
 * interface MyComponentProps {
 *   class?: ClassProp;
 * }
 * // Accepts: "active", $(className), { active: true, disabled: $(isDisabled) }
 */
export type ClassProp = MaybeSignal<string> | Record<string, MaybeSignal<boolean>>;

// =============================================================================
// SIGNAL COLLECTION UTILITIES
// =============================================================================

/**
 * Helper for arrays of signals.
 *
 * @example
 * const items: SignalArray<string> = [
 *   $("one"),
 *   $("two"),
 *   $("three")
 * ];
 */
export type SignalArray<T> = Array<Signal<T>>;

/**
 * Helper for arrays that can contain either values or signals.
 *
 * @example
 * const mixed: MaybeSignalArray<number> = [
 *   1,
 *   $(2),
 *   3,
 *   $(4)
 * ];
 */
export type MaybeSignalArray<T> = Array<MaybeSignal<T>>;

// =============================================================================
// CONDITIONAL SIGNAL TYPES
// =============================================================================

/**
 * Makes properties conditionally reactive based on a boolean flag.
 * Useful for components that can work with or without reactivity.
 *
 * @example
 * type Props<R extends boolean> = ConditionallyReactive<{
 *   count: number;
 *   name: string;
 * }, R>;
 * // When R = true: { count: Signal<number>; name: Signal<string> }
 * // When R = false: { count: number; name: string }
 */
export type ConditionallyReactive<T, Reactive extends boolean> = Reactive extends true
  ? Signalize<T>
  : T;

// =============================================================================
// DEEP SIGNAL UTILITIES (ADVANCED)
// =============================================================================

/**
 * Deep unwrap signals from nested objects.
 * Recursively unwraps Signal<T> at any depth.
 *
 * @example
 * type NestedReactive = {
 *   user: Signal<{
 *     profile: Signal<{ name: Signal<string> }>;
 *   }>;
 * };
 * type Plain = DeepUnwrapSignals<NestedReactive>;
 * // { user: { profile: { name: string } } }
 */
export type DeepUnwrapSignals<T> = T extends Signal<infer U>
  ? DeepUnwrapSignals<U>
  : T extends object
    ? { [K in keyof T]: DeepUnwrapSignals<T[K]> }
    : T;

// =============================================================================
// TYPE GUARDS
// =============================================================================

/**
 * Type guard to check if a value is a WritableSignal.
 * Note: This is a type-level helper. For runtime checks, use isSignal() from reactivity.ts
 *
 * @example
 * function processSignal<T>(sig: Signal<T> | WritableSignal<T>) {
 *   if (isWritableSignal(sig)) {
 *     sig.value = newValue; // Type-safe write
 *   }
 * }
 */
export type IsWritableSignal<T> = T extends WritableSignal<unknown> ? true : false;

/**
 * Filter object properties to only those that are signals.
 *
 * @example
 * type Mixed = {
 *   count: Signal<number>;
 *   name: string;
 *   age: Signal<number>;
 * };
 * type OnlySignals = SignalsOnly<Mixed>;
 * // { count: Signal<number>; age: Signal<number> }
 */
export type SignalsOnly<T> = {
  [K in keyof T as T[K] extends Signal<unknown> ? K : never]: T[K];
};

/**
 * Filter object properties to only those that are NOT signals.
 *
 * @example
 * type Mixed = {
 *   count: Signal<number>;
 *   name: string;
 *   age: Signal<number>;
 * };
 * type NoSignals = StaticsOnly<Mixed>;
 * // { name: string }
 */
export type StaticsOnly<T> = {
  [K in keyof T as T[K] extends Signal<unknown> ? never : K]: T[K];
};
