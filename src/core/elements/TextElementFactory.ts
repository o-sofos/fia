import {
  pushExecutionContext,
  popExecutionContext,
  getCurrentExecutionContext,
} from "../context/context";
import {
  applyProps,
  applyTextContent,
  isChildrenCallback,
  isProps,
  isTextContent,
  type ChildrenCallback,
  type ContextualValidateProps,
  type E,
  type ElementProps,
  type LooseElementProps,
  type OnMountCallback,
  type TextContent,
} from "./elements";
import type { SmartElement } from "./SmartElement";

/**
 * Factory for elements that commonly hold text content.
 * Adds text shorthand overloads: el(text), el(text, props), el(text, children), el(text, props, children)
 *
 * Elements: h1-h6, p, div, span, article, section, aside, header, footer,
 *           main, blockquote, figcaption, label, legend, caption, strong,
 *           em, small, mark, code, pre, samp, kbd, var_, i, b, u, s, del,
 *           ins, sub, sup, li, td, th, output
 */
export interface TextElementFactory<K extends keyof HTMLElementTagNameMap> {
  /** Create an empty element */
  (): E<K>;

  /** Create element with props only (non-generic, for overload resolution) */
  (props: LooseElementProps<K>): E<K>;

  /** Create element with children callback only */
  (children: ChildrenCallback<E<K>>): E<K>;

  /** Create element with props and children (non-generic) */
  (props: LooseElementProps<K>, children: ChildrenCallback<E<K>>): E<K>;

  /** Create element with text content */
  (text: TextContent): E<K>;

  /** Create element with text content and children */
  (text: TextContent, children: ChildrenCallback<E<K>>): E<K>;

  /** Create element with props only (generic, for SmartElement inference) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
  ): SmartElement<K, P>;

  /** Create element with props and children (generic) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
    children: ChildrenCallback<SmartElement<K, P>>,
  ): SmartElement<K, P>;

  /** Create element with text content and props */
  <const P extends Record<string, unknown>>(
    text: TextContent,
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
  ): SmartElement<K, P>;

  /** Create element with text content, props, and children */
  <const P extends Record<string, unknown>>(
    text: TextContent,
    props: P & ContextualValidateProps<P, LooseElementProps<K>, K>,
    children: ChildrenCallback<SmartElement<K, P>>,
  ): SmartElement<K, P>;
}

/**
 * Creates a text element factory with text shorthand support.
 * Supports: el(), el(text), el(text, props), el(text, children), el(text, props, children),
 *           el(props), el(children), el(props, children)
 */
export function createTextElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
): TextElementFactory<K> {
  return ((
    arg1?: TextContent | ElementProps<K> | ChildrenCallback<E<K>>,
    arg2?: ElementProps<K> | ChildrenCallback<E<K>>,
    arg3?: ChildrenCallback<E<K>>,
  ): E<K> => {
    const element = document.createElement(tag);

    let text: TextContent | undefined;
    let props: ElementProps<K> | undefined;
    let children: ChildrenCallback<E<K>> | undefined;

    // Parse arguments based on type
    if (arg1 === undefined) {
      // 1. element()
    } else if (isTextContent(arg1)) {
      // First arg is text
      text = arg1;

      if (arg2 === undefined) {
        // 2. element(text)
      } else if (isChildrenCallback<E<K>>(arg2)) {
        // 4. element(text, children)
        children = arg2;
      } else if (isProps<K>(arg2)) {
        // 3 or 5. element(text, props) or element(text, props, children)
        props = arg2;
        if (arg3 !== undefined) {
          children = arg3;
        }
      }
    } else if (isChildrenCallback<E<K>>(arg1)) {
      // 7. element(children)
      children = arg1;
    } else if (isProps<K>(arg1)) {
      // 6 or 8. element(props) or element(props, children)
      props = arg1;
      if (arg2 !== undefined && isChildrenCallback<E<K>>(arg2)) {
        children = arg2;
      }
    }

    // Apply text content (reactive or static)
    if (text !== undefined) {
      applyTextContent(element, text);
    }

    // Apply props
    if (props) {
      applyProps(element, props);
    }

    // Execute children with implicit fragment batching
    const mountCallbacks: (() => void)[] = [];
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
  }) as TextElementFactory<K>;
}
