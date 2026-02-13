import { getCurrentExecutionContext } from "../context/context";
import {
  isProps,
  applyProps,
  type ContextualValidateProps,
  type ElementProps,
  type LooseElementProps,
  looksLikeImgSrc,
} from "./elements";
import type { SmartElement } from "./SmartElement";

/**
 * Factory for img elements with src/alt shorthand.
 * Overloads: img(), img(props), img(src), img(src, alt), img(src, alt, props)
 */
export interface ImgElementFactory {
  /** Create empty img */
  (): HTMLImageElement;

  /** Create img with props only (non-generic, for overload resolution) */
  (props: LooseElementProps<"img">): HTMLImageElement;

  /** Create img with src shorthand */
  (src: string): HTMLImageElement;

  /** Create img with src and alt shorthand */
  (src: string, alt: string): HTMLImageElement;

  /** Create img with props only (generic, for SmartElement inference) */
  <const P extends Record<string, unknown>>(
    props: P & ContextualValidateProps<P, LooseElementProps<"img">, "img">,
  ): SmartElement<"img", P>;

  /** Create img with src, alt, and additional props */
  <const P extends Record<string, unknown>>(
    src: string,
    alt: string,
    props: P &
      ContextualValidateProps<
        P,
        Omit<LooseElementProps<"img">, "src" | "alt">,
        "img"
      >,
  ): SmartElement<"img", P & { src: string; alt: string }>;
}

/**
 * Creates the img element factory with src/alt shorthand.
 * Supports: img(), img(props), img(src), img(src, alt), img(src, alt, props)
 */
export function createImgElement(): ImgElementFactory {
  return ((
    arg1?: string | ElementProps<"img">,
    arg2?: string | ElementProps<"img">,
    arg3?: ElementProps<"img">,
  ): HTMLImageElement => {
    const element = document.createElement("img");

    let src: string | undefined;
    let alt: string | undefined;
    let props: ElementProps<"img"> | undefined;

    if (arg1 === undefined) {
      // img() - empty
    } else if (typeof arg1 === "string" && looksLikeImgSrc(arg1)) {
      // First arg is src
      src = arg1;

      if (arg2 === undefined) {
        // img(src)
      } else if (typeof arg2 === "string") {
        // img(src, alt) or img(src, alt, props)
        alt = arg2;
        if (arg3 !== undefined) {
          props = arg3;
        }
      } else if (isProps<"img">(arg2)) {
        // img(src, props) - src only with additional props
        props = arg2;
      }
    } else if (isProps<"img">(arg1)) {
      // img(props)
      props = arg1;
    }

    // Apply src
    if (src !== undefined) {
      element.src = src;
    }

    // Apply alt
    if (alt !== undefined) {
      element.alt = alt;
    }

    // Apply props
    if (props) {
      applyProps(element, props);
    }

    getCurrentExecutionContext().appendChild(element);
    return element;
  }) as ImgElementFactory;
}
