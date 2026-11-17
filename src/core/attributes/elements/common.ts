import type { Bindable } from "../../reactivity/reactivity.ts";
import type { ReactiveCSSProperties } from "../../css/css-types.ts";
import type {
    AriaAttributeName,
    AriaAttributeValue,
    AriaInput,
    AriaKebabAttributes,
    ConcreteAriaRole,
} from "../../a11y/aria.ts";

/** A camelCase ARIA prop: the attribute's tokens, booleans where valid, or a signal of either */
type AriaProp<N extends AriaAttributeName> = Bindable<AriaInput<AriaAttributeValue<N>>>;
import type {
    InputMode,
    AutoCapitalize,
    EnterKeyHint,
    Dir
} from "./enums.ts";

/**
 * All keys present on any member of a union.
 */
export type UnionKeys<T> = T extends unknown ? keyof T : never;

/**
 * Pads each member of a discriminated union with `?: never` for keys that
 * only exist on other members. Keeps the union discriminated while making
 * `keyof` yield every key across all members — required so excess-property
 * validation can see variant-specific keys, and so cross-variant props
 * (e.g. `checked` on a text input) are rejected instead of silently allowed.
 */
export type StrictUnion<T, All extends PropertyKey = UnionKeys<T>> =
    T extends unknown ? T & Partial<Record<Exclude<All, keyof T>, never>> : never;

/**
 * Global attributes shared by all HTML elements
 */
export interface GlobalAttributes {
    // Core
    /** Unique identifier for the element. */
    id?: Bindable<string>;
    /** CSS class(es) for the element. Can be a string, an array of strings, or an object of { className: boolean }. */
    class?: Bindable<string> | Bindable<string[]> | Record<string, Bindable<boolean>>;
    /** Alias for class to support React-style className. */
    className?: Bindable<string> | Bindable<string[]> | Record<string, Bindable<boolean>>;
    /** Array of class names to apply. */
    classList?: Bindable<string[]>;
    /**
     * Inline CSS styles. Can be:
     * - A CSS string: "color: red; font-size: 16px"
     * - A reactive string: $(myStyleString)
     * - A style object with mixed reactive/static: { color: $(c), fontSize: "16px" }
     */
    style?: Bindable<string> | ReactiveCSSProperties;
    /** Advisory information for the element (tooltip). */
    title?: Bindable<string>;
    /** Language of the element's content. */
    lang?: Bindable<string>;
    /** Text directionality. */
    dir?: Bindable<Dir>;

    // Content
    /** The text content of the element and its descendants. */
    textContent?: Bindable<string | number | null | undefined>;
    /** The rendered text content of the element. */
    innerText?: Bindable<string | number | null | undefined>;

    // Accessibility (Strict Types)
    /** ARIA role indicating the semantic purpose of the element. */
    role?: Bindable<ConcreteAriaRole>;
    /** Identifies the currently active element when focus is on a composite widget, combobox, textbox, group, or application. */
    ariaActiveDescendant?: AriaProp<"aria-activedescendant">;
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    ariaAtomic?: AriaProp<"aria-atomic">;
    /** Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they were made. */
    ariaAutoComplete?: AriaProp<"aria-autocomplete">;
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    ariaBusy?: AriaProp<"aria-busy">;
    /** Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. */
    ariaChecked?: AriaProp<"aria-checked">;
    /** Defines the total number of columns in a table, grid, or treegrid. */
    ariaColCount?: AriaProp<"aria-colcount">;
    /** Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. */
    ariaColIndex?: AriaProp<"aria-colindex">;
    /** Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. */
    ariaColSpan?: AriaProp<"aria-colspan">;
    /** Identifies the element (or elements) that controls the current element. */
    ariaControls?: AriaProp<"aria-controls">;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    ariaCurrent?: AriaProp<"aria-current">;
    /** Identifies the element (or elements) that describes the object. */
    ariaDescribedBy?: AriaProp<"aria-describedby">;
    /** Identifies the element that provides a detailed, extended description for the object. */
    ariaDetails?: AriaProp<"aria-details">;
    /** Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. */
    ariaDisabled?: AriaProp<"aria-disabled">;
    /** Indicates what functions can be performed when a dragged object is released on the drop target. */
    ariaDropEffect?: AriaProp<"aria-dropeffect">;
    /** Identifies the element that provides an error message for the object. */
    ariaErrorMessage?: AriaProp<"aria-errormessage">;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    ariaExpanded?: AriaProp<"aria-expanded">;
    /** Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order. */
    ariaFlowTo?: AriaProp<"aria-flowto">;
    /** Indicates an element's "grabbed" state in a drag-and-drop operation. */
    ariaGrabbed?: AriaProp<"aria-grabbed">;
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    ariaHasPopup?: AriaProp<"aria-haspopup">;
    /** Indicates whether the element is exposed to an accessibility API. */
    ariaHidden?: AriaProp<"aria-hidden">;
    /** Indicates the entered value does not conform to the format expected by the application. */
    ariaInvalid?: AriaProp<"aria-invalid">;
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    ariaKeyShortcuts?: AriaProp<"aria-keyshortcuts">;
    /** Defines a string value that labels the current element. */
    ariaLabel?: AriaProp<"aria-label">;
    /** Identifies the element (or elements) that labels the current element. */
    ariaLabelledBy?: AriaProp<"aria-labelledby">;
    /** Defines the hierarchical level of an element within a structure. */
    ariaLevel?: AriaProp<"aria-level">;
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    ariaLive?: AriaProp<"aria-live">;
    /** Indicates whether an element is modal when displayed. */
    ariaModal?: AriaProp<"aria-modal">;
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    ariaMultiLine?: AriaProp<"aria-multiline">;
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    ariaMultiSelectable?: AriaProp<"aria-multiselectable">;
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    ariaOrientation?: AriaProp<"aria-orientation">;
    /** Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. */
    ariaOwns?: AriaProp<"aria-owns">;
    /** Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format. */
    ariaPlaceholder?: AriaProp<"aria-placeholder">;
    /** Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. */
    ariaPosInSet?: AriaProp<"aria-posinset">;
    /** Indicates the current "pressed" state of toggle buttons. */
    ariaPressed?: AriaProp<"aria-pressed">;
    /** Indicates that the element is not editable, but is otherwise operable. */
    ariaReadOnly?: AriaProp<"aria-readonly">;
    /** Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. */
    ariaRelevant?: AriaProp<"aria-relevant">;
    /** Indicates that user input is required on the element before a form may be submitted. */
    ariaRequired?: AriaProp<"aria-required">;
    /** Defines a human-readable, author-localized description for the role of an element. */
    ariaRoleDescription?: AriaProp<"aria-roledescription">;
    /** Defines the total number of rows in a table, grid, or treegrid. */
    ariaRowCount?: AriaProp<"aria-rowcount">;
    /** Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. */
    ariaRowIndex?: AriaProp<"aria-rowindex">;
    /** Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. */
    ariaRowSpan?: AriaProp<"aria-rowspan">;
    /** Indicates the current "selected" state of various widgets. */
    ariaSelected?: AriaProp<"aria-selected">;
    /** Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. */
    ariaSetSize?: AriaProp<"aria-setsize">;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    ariaSort?: AriaProp<"aria-sort">;
    /** Defines the maximum allowed value for a range widget. */
    ariaValueMax?: AriaProp<"aria-valuemax">;
    /** Defines the minimum allowed value for a range widget. */
    ariaValueMin?: AriaProp<"aria-valuemin">;
    /** Defines the current value for a range widget. */
    ariaValueNow?: AriaProp<"aria-valuenow">;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    ariaValueText?: AriaProp<"aria-valuetext">;
    /** Defines a string value that describes or annotates the current element. */
    ariaDescription?: AriaProp<"aria-description">;
    /** Defines a string value that labels the current element, intended to be converted into Braille. */
    ariaBrailleLabel?: AriaProp<"aria-braillelabel">;
    /** Defines a human-readable, author-localized abbreviated description for the role of an element, intended to be converted into Braille. */
    ariaBrailleRoleDescription?: AriaProp<"aria-brailleroledescription">;
    /** Defines a human readable text alternative of aria-colindex. */
    ariaColIndexText?: AriaProp<"aria-colindextext">;
    /** Defines a human readable text alternative of aria-rowindex. */
    ariaRowIndexText?: AriaProp<"aria-rowindextext">;

    // Accessibility (Legacy)
    /** Indicates if the element can take input focus. */
    tabIndex?: Bindable<number>;

    // Editing
    /** Indicates whether the element is editable. */
    contentEditable?: Bindable<"true" | "false" | "plaintext-only">;
    /** Indicates whether spell checking is allowed. Enumerated: serializes as "true"/"false". */
    spellcheck?: Bindable<boolean | "true" | "false">;
    /** Indicates whether the element is draggable. Enumerated: serializes as "true"/"false". */
    draggable?: Bindable<boolean | "true" | "false">;

    // Input hints
    /** Hint for the type of data that might be entered by the user. */
    inputMode?: Bindable<InputMode>;
    /** Hint for the action label (or icon) to present for the enter key on virtual keyboards. */
    enterKeyHint?: Bindable<EnterKeyHint>;
    /** Controls whether and how text input is automatically capitalized. */
    autoCapitalize?: Bindable<AutoCapitalize>;

    // Boolean
    /** Indicates whether the element is not yet, or is no longer, relevant. */
    hidden?: Bindable<boolean | "until-found">;
    /** Indicates that the browser should ignore this section. */
    inert?: Bindable<boolean>;

    // Popover
    /** Designates an element as a popover element. */
    popover?: Bindable<"auto" | "manual">;

    // Security
    nonce?: Bindable<string>;

    // Translation
    translate?: Bindable<"yes" | "no">;

    // Microdata
    itemScope?: Bindable<boolean>;
    itemType?: Bindable<string>;
    itemId?: Bindable<string>;
    itemProp?: Bindable<string>;
    itemRef?: Bindable<string>;

    // Custom element
    is?: Bindable<string>;

    // Part (for shadow DOM styling)
    part?: Bindable<string>;

    // Slot
    slot?: Bindable<string>;

    // Export parts
    exportparts?: Bindable<string>;

    // Anchor positioning (new)
    anchor?: Bindable<string>;
}

/**
 * Data attributes (data-*) - allows any custom data attributes
 */
export interface DataAttributes {
    [key: `data-${string}`]: Bindable<string | number | boolean>;
}

/**
 * Kebab-case ARIA attributes ("aria-label", "aria-expanded", ...), typed from
 * the same value maps as the camelCase props
 */
export interface AriaAttributes extends AriaKebabAttributes {
    // camelCase forms (ariaLabel, ...) live in GlobalAttributes
}
