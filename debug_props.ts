
import type { ElementProps } from "./src/core/attributes/html-attributes";
import type { ButtonAttrs } from "./src/core/attributes/elements/form";

type LooseElementProps<K extends keyof HTMLElementTagNameMap> =
    Omit<ElementProps<K>, "style"> & { style?: any };

type BProps = ElementProps<"button">;
type BKeys = keyof BProps;

// Check if 'disabled' is in keys
type HasDisabled = "disabled" extends BKeys ? true : false;
const hasDisabled: HasDisabled = true;

type LooseBProps = LooseElementProps<"button">;
type LooseBKeys = keyof LooseBProps;
type LooseHasDisabled = "disabled" extends LooseBKeys ? true : false;
const looseHasDisabled: LooseHasDisabled = true;

// Check union distribution
// ButtonAttrs is Union
type UnionKeys = keyof ButtonAttrs;
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
type BetterLooseProps = DistributiveOmit<ElementProps<"button">, "style">;

type BetterHasDisabled = "disabled" extends keyof BetterLooseProps ? true : false;
const betterHasDisabled: BetterHasDisabled = true;
