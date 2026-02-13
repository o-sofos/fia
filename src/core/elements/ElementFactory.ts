import {
  getCurrentExecutionContext,
  popExecutionContext,
  pushExecutionContext,
} from "../context/context";
import {
  isProps,
  applyProps,
  isChildrenCallback,
  type ChildrenCallback,
  type ContextualValidateProps,
  type E,
  type ElementProps,
  type LooseElementProps,
  type OnMountCallback,
} from "./elements";
import type { SmartElement } from "./SmartElement";

/**
 * Factory function for creating HTML elements with auto-mounting to parent context.
 *
 * Provides 8 flexible overloads covering all common element creation patterns.
 * Supports reactive content, type-safe props, and nested children.
 *
 * @template K - The HTML tag name key from HTMLElementTagNameMap
 *
 * @example
 * // 1. Empty element
 * div();
 *
 * @example
 * // 2. Text content (static or reactive)
 * h1("Hello World");
 * h1($(() => `Count: ${count.value}`));
 *
 * @example
 * // 3. Props only (with full type safety and IntelliSense)
 * div({
 *   id: "main",
 *   class: "container",
 *   style: { color: "red", padding: "1rem" }
 * });
 *
 * @example
 * // 4. Children callback (automatic parent context)
 * div(() => {
 *   h2("Nested heading");
 *   p("Nested paragraph");
 * });
 *
 * @example
 * // 5. Props + children (most common pattern)
 * div({ class: "card" }, () => {
 *   h3("Card Title");
 *   p("Card content");
 * });
 *
 * // 6. Content + props - Use textContent prop
 * button({
 *   textContent: "Click me",
 *   onclick: () => alert("Clicked!"),
 *   class: "btn-primary"
 * });
 *
 * @example
 * // 7. Content + children - Use textContent prop
 * section({ textContent: "Header" }, () => {
 *   p({ textContent: "Additional content" });
 * });
 *
 * @example
 * // 8. All three: content + props + children - Use textContent prop
 * article({ textContent: "Title", class: "post" }, () => {
 *   p({ textContent: "Post body" });
 *   span({ textContent: "Footer" });
 * });
 */
export interface ElementFactory<K extends keyof HTMLElementTagNameMap> {
  /**
   * Create an empty element.
   * @example div()
   */
  (): E<K>;

  /**
   * Create element with props only.
   * @param props - Element attributes, styles, and event handlers
   * @example div({ style: { color: "red" } })
   * @example input({ type: "email", placeholder: "Enter email" })
   */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
  ): SmartElement<K, P>;

  /**
   * Create element with children callback only.
   * @param children - Function that creates child elements (runs in parent context)
   * @example div(() => { h2("Title"); p("Content"); })
   */
  (children: ChildrenCallback<E<K>>): E<K>;

  /**
   * Create element with props and children (most common pattern).
   * @param props - Element attributes, styles, and event handlers
   * @param children - Function that creates child elements
   * @example div({ class: "card" }, () => { h3("Title"); p("Body"); })
   */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
    children: ChildrenCallback<SmartElement<K, P>>,
  ): SmartElement<K, P>;
}

// =============================================================================
// ELEMENT FACTORY
// =============================================================================

/**
 * Creates an element factory for a specific HTML tag.
 *
 * Simplified API with 4 overloads:
 * 1. el() - empty element
 * 2. el({ props }) - props only
 * 3. el(() => {}) - children only
 * 4. el({ props }, () => {}) - props + children
 *
 * @param tag - The HTML tag name (e.g., "div", "span")
 * @returns An `ElementFactory` function for creating elements of that type
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
): (
  propsOrChildren?: ElementProps<K> | ChildrenCallback<E<K>>,
  children?: ChildrenCallback<E<K>>,
) => E<K> {
  return (
    arg1?: ElementProps<K> | ChildrenCallback<E<K>>,
    arg2?: ChildrenCallback<E<K>>,
  ): E<K> => {
    const element = document.createElement(tag);

    // Parse arguments - strict 4 patterns
    let props: ElementProps<K> | undefined;
    let children: ChildrenCallback<E<K>> | undefined;

    if (arg1 === undefined) {
      // 1. element()
    } else if (isChildrenCallback<E<K>>(arg1)) {
      // 3. element(children)
      children = arg1;
    } else if (isProps<K>(arg1)) {
      // 2. element(props) or 4. element(props, children)
      props = arg1;
      if (arg2 !== undefined) {
        children = arg2;
      }
    }

    // Apply props
    if (props) {
      applyProps(element, props);
    }

    // Execute children with implicit fragment batching
    let mountCallbacks: (() => void)[] = [];
    const onMount: OnMountCallback = (cb) => mountCallbacks.push(cb);

    if (children) {
      const frag = document.createDocumentFragment();
      pushExecutionContext(frag);
      try {
        children(element, onMount);
      } finally {
        popExecutionContext();
      }
      element.appendChild(frag);
    }

    // Mount to current context
    getCurrentExecutionContext().appendChild(element);

    // Execute onMount callbacks after element is in DOM
    if (mountCallbacks.length > 0) {
      requestAnimationFrame(() => {
        for (const cb of mountCallbacks) {
          cb();
        }
      });
    }

    return element;
  };
}
