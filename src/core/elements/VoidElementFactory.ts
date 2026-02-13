import { getCurrentExecutionContext } from "../context/context";
import { applyProps, type E, type ElementProps } from "./elements";

/**
 * Factory function for void elements (no children).
 */
export interface VoidElementFactory<K extends keyof HTMLElementTagNameMap> {
  /**
   * Create a void element (e.g., <input>, <br>).
   * @param props - Element attributes and event handlers
   */
  (props?: ElementProps<K>): HTMLElementTagNameMap[K];
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
  return (props?: ElementProps<K>): E<K> => {
    const element = document.createElement(tag);
    if (props) applyProps(element, props);
    getCurrentExecutionContext().appendChild(element);
    return element;
  };
}
