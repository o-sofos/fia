import {
  pushExecutionContext,
  popExecutionContext,
  getCurrentExecutionContext,
} from "../context/context";
import { registerEventHandler } from "../events/events";
import {
  applyProps,
  applyTextContent,
  isChildrenCallback,
  isClickHandler,
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
 * Factory for interactive elements with text + handler shorthand.
 * Adds: el(text), el(text, onclick), el(text, props)
 *
 * Elements: button, summary, option, optgroup
 */
export interface InteractiveElementFactory<
  K extends keyof HTMLElementTagNameMap,
> {
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

  /** Create element with text and click handler shorthand */
  (text: TextContent, onclick: (e: MouseEvent) => void): E<K>;

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
 * Creates an interactive element factory with text + handler shorthand.
 * Supports: el(), el(text), el(text, onclick), el(text, props), el(text, children),
 *           el(text, props, children), el(props), el(children), el(props, children)
 */
export function createInteractiveElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
): InteractiveElementFactory<K> {
  return ((
    arg1?: TextContent | ElementProps<K> | ChildrenCallback<E<K>>,
    arg2?: ((e: MouseEvent) => void) | ElementProps<K> | ChildrenCallback<E<K>>,
    arg3?: ChildrenCallback<E<K>>,
  ): E<K> => {
    const element = document.createElement(tag);

    let text: TextContent | undefined;
    let onclick: ((e: MouseEvent) => void) | undefined;
    let props: ElementProps<K> | undefined;
    let children: ChildrenCallback<E<K>> | undefined;

    // Parse arguments
    if (arg1 === undefined) {
      // 1. element()
    } else if (isTextContent(arg1)) {
      text = arg1;

      if (arg2 === undefined) {
        // 2. element(text)
      } else if (isClickHandler(arg2)) {
        // 3. element(text, onclick)
        onclick = arg2;
      } else if (isChildrenCallback<E<K>>(arg2)) {
        // 5. element(text, children)
        children = arg2;
      } else if (isProps<K>(arg2)) {
        // 4 or 6. element(text, props) or element(text, props, children)
        props = arg2;
        if (arg3 !== undefined) {
          children = arg3;
        }
      }
    } else if (isChildrenCallback<E<K>>(arg1)) {
      // 8. element(children)
      children = arg1;
    } else if (isProps<K>(arg1)) {
      // 7 or 9. element(props) or element(props, children)
      props = arg1;
      if (arg2 !== undefined && isChildrenCallback<E<K>>(arg2)) {
        children = arg2;
      }
    }

    // Apply text content
    if (text !== undefined) {
      applyTextContent(element, text);
    }

    // Apply click handler shorthand
    if (onclick) {
      registerEventHandler(element, "click", onclick as EventListener);
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
  }) as InteractiveElementFactory<K>;
}
