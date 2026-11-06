import { getCurrentExecutionContext } from "../context/context";
import {
  applyProps,
  type ContextualValidateProps,
  type E,
  type ElementProps,
  type LooseElementProps,
} from "./elements";
import type { SmartElement } from "./SmartElement";

/**
 * Factory function for void elements (no children).
 *
 * Uses the same smart-props typing as `ElementFactory`: literal props are
 * captured (`const P`), excess keys are rejected, event handlers are
 * contextually typed with the concrete element, and the returned element
 * reflects the narrowed props.
 *
 * The `P extends LooseElementProps<K>` constraint (unlike the rich factories)
 * is what enforces discriminated-union checking for elements like `input` —
 * e.g. `input({ type: "checkbox", checked: true })` narrows to the checkbox
 * variant, while `input({ type: "email", value: 123 })` is rejected.
 */
export interface VoidElementFactory<K extends keyof HTMLElementTagNameMap> {
  /**
   * Create an empty void element.
   * @example br()
   */
  (): E<K>;

  /**
   * Create a void element with props.
   * @param props - Element attributes and event handlers
   * @example input({ type: "email", placeholder: "you@example.com" })
   */
  <const P extends LooseElementProps<K>>(
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
  ): SmartElement<K, P>;
}

/**
 * Creates a void element factory (no children allowed).
 *
 * @param tag - The HTML tag name (e.g., "input", "br")
 * @returns A `VoidElementFactory` function
 */
export function createVoidElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
): VoidElementFactory<K> {
  return ((props?: ElementProps<K>): E<K> => {
    const element = document.createElement(tag);
    if (props) applyProps(element, props);
    getCurrentExecutionContext().appendChild(element);
    return element;
  }) as VoidElementFactory<K>;
}
