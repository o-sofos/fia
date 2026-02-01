import type { CSSGlobalValues } from "./common";

export type CSSLengthUnit = "px" | "rem" | "em" | "vw" | "vh" | "%" | "cm" | "mm" | "in" | "pt" | "pc" | "ex" | "ch" | "vmin" | "vmax";

export type CSSLength =
    | "0"
    | "auto"
    | `${number}${CSSLengthUnit}`
    | `calc(${string})`
    | `var(--${string})`
    | `${string} ${string}`
    | "fit-content"
    | "max-content"
    | "min-content"
    | CSSGlobalValues
    | (string & {}); // Allows widened strings while preserving autocomplete

export type CSSZIndex = "auto" | CSSGlobalValues | number | (string & {});
