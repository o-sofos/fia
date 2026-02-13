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
  looksLikeHref,
  type ChildrenCallback,
  type ContextualValidateProps,
  type ElementProps,
  type LooseElementProps,
  type OnMountCallback,
  type TextContent,
} from "./elements";
import type { SmartElement } from "./SmartElement";

/**
 * Factory for anchor elements with href/text shorthand.
 * Overloads: a(), a(href), a(href, text), a(href, text, props), plus existing patterns
 */
export interface AnchorElementFactory {
  /** Create an empty anchor */
  (): HTMLAnchorElement;

  /** Create anchor with props only (non-generic, for overload resolution) */
  (props: LooseElementProps<"a">): HTMLAnchorElement;

  /** Create anchor with children callback only */
  (children: ChildrenCallback<HTMLAnchorElement>): HTMLAnchorElement;

  /** Create anchor with props and children (non-generic) */
  (
    props: LooseElementProps<"a">,
    children: ChildrenCallback<HTMLAnchorElement>,
  ): HTMLAnchorElement;

  /** Create anchor with href shorthand */
  (href: string): HTMLAnchorElement;

  /** Create anchor with href and text shorthand */
  (href: string, text: TextContent): HTMLAnchorElement;

  /** Create anchor with props only (generic, for SmartElement inference) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<"a">, "a">,
  ): SmartElement<"a", P>;

  /** Create anchor with props and children (generic) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<"a">, "a">,
    children: ChildrenCallback<SmartElement<"a", P>>,
  ): SmartElement<"a", P>;

  /** Create anchor with href, text, and additional props */
  <const P extends Record<string, unknown>>(
    href: string,
    text: TextContent,
    props: P &
      ContextualValidateProps<P, Omit<LooseElementProps<"a">, "href">, "a">,
  ): SmartElement<"a", P & { href: string }>;
}

/**
 * Creates the anchor element factory with href/text shorthand.
 * Supports: a(), a(href), a(href, text), a(href, text, props),
 *           a(props), a(children), a(props, children)
 */
export function createAnchorElement(): AnchorElementFactory {
  return ((
    arg1?: string | ElementProps<"a"> | ChildrenCallback<HTMLAnchorElement>,
    arg2?:
      | TextContent
      | ElementProps<"a">
      | ChildrenCallback<HTMLAnchorElement>,
    arg3?: ElementProps<"a">,
  ): HTMLAnchorElement => {
    const element = document.createElement("a");

    let href: string | undefined;
    let text: TextContent | undefined;
    let props: ElementProps<"a"> | undefined;
    let children: ChildrenCallback<HTMLAnchorElement> | undefined;

    if (arg1 === undefined) {
      // a() - empty
    } else if (typeof arg1 === "string" && looksLikeHref(arg1)) {
      // First arg is href
      href = arg1;

      if (arg2 === undefined) {
        // a(href)
      } else if (isTextContent(arg2)) {
        // a(href, text) or a(href, text, props)
        text = arg2;
        if (arg3 !== undefined) {
          props = arg3;
        }
      } else if (isProps<"a">(arg2)) {
        // a(href, props)
        props = arg2;
      }
    } else if (isChildrenCallback<HTMLAnchorElement>(arg1)) {
      // a(children)
      children = arg1;
    } else if (isProps<"a">(arg1)) {
      // a(props) or a(props, children)
      props = arg1;
      if (arg2 !== undefined && isChildrenCallback<HTMLAnchorElement>(arg2)) {
        children = arg2;
      }
    }

    // Apply href
    if (href !== undefined) {
      element.href = href;
    }

    // Apply text content
    if (text !== undefined) {
      applyTextContent(element, text);
    }

    // Apply props
    if (props) {
      applyProps(element, props);
    }

    // Execute children
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

    getCurrentExecutionContext().appendChild(element);

    if (mountCallbacks.length > 0) {
      requestAnimationFrame(() => {
        for (const cb of mountCallbacks) {
          cb();
        }
      });
    }

    return element;
  }) as AnchorElementFactory;
}
