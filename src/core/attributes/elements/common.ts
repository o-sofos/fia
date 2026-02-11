import type { MaybeSignal } from "../../reactivity/reactivity.ts";
import type { ReactiveCSSProperties } from "../../css/css-types.ts";
import type { AriaValueFor, AriaStateValue, AriaRole } from "../../a11y/aria.ts";
import type {
    InputMode,
    AutoCapitalize,
    EnterKeyHint,
    Dir
} from "./enums.ts";

/**
 * Global attributes shared by all HTML elements
 */
export interface GlobalAttributes {
    // Core
    /** Unique identifier for the element. */
    id?: MaybeSignal<string>;
    /** CSS class(es) for the element. Can be a string, an array of strings, or an object of { className: boolean }. */
    class?: MaybeSignal<string> | MaybeSignal<string[]> | Record<string, MaybeSignal<boolean>>;
    /** Alias for class to support React-style className. */
    className?: MaybeSignal<string> | MaybeSignal<string[]> | Record<string, MaybeSignal<boolean>>;
    /** Array of class names to apply. */
    classList?: MaybeSignal<string[]>;
    /**
     * Inline CSS styles. Can be:
     * - A CSS string: "color: red; font-size: 16px"
     * - A reactive string: $(myStyleString)
     * - A style object with mixed reactive/static: { color: $(c), fontSize: "16px" }
     */
    style?: MaybeSignal<string> | ReactiveCSSProperties;
    /** Advisory information for the element (tooltip). */
    title?: MaybeSignal<string>;
    /** Language of the element's content. */
    lang?: MaybeSignal<string>;
    /** Text directionality. */
    dir?: MaybeSignal<Dir>;

    // Content
    /** The text content of the element and its descendants. */
    textContent?: MaybeSignal<string | number | null | undefined>;
    /** The rendered text content of the element. */
    innerText?: MaybeSignal<string | number | null | undefined>;

    // Accessibility (Strict Types)
    /** ARIA role indicating the semantic purpose of the element. */
    role?: MaybeSignal<AriaRole>;
    /** Identifies the currently active element when focus is on a composite widget, combobox, textbox, group, or application. */
    ariaActiveDescendant?: MaybeSignal<AriaValueFor<"aria-activedescendant">>;
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    ariaAtomic?: MaybeSignal<AriaValueFor<"aria-atomic">>;
    /** Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they were made. */
    ariaAutoComplete?: MaybeSignal<AriaValueFor<"aria-autocomplete">>;
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    ariaBusy?: MaybeSignal<AriaStateValue<"aria-busy">>;
    /** Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. */
    ariaChecked?: MaybeSignal<AriaStateValue<"aria-checked">>;
    /** Defines the total number of columns in a table, grid, or treegrid. */
    ariaColCount?: MaybeSignal<AriaValueFor<"aria-colcount">>;
    /** Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. */
    ariaColIndex?: MaybeSignal<AriaValueFor<"aria-colindex">>;
    /** Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. */
    ariaColSpan?: MaybeSignal<AriaValueFor<"aria-colspan">>;
    /** Identifies the element (or elements) that controls the current element. */
    ariaControls?: MaybeSignal<AriaValueFor<"aria-controls">>;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    ariaCurrent?: MaybeSignal<AriaStateValue<"aria-current">>;
    /** Identifies the element (or elements) that describes the object. */
    ariaDescribedBy?: MaybeSignal<AriaValueFor<"aria-describedby">>;
    /** Identifies the element that provides a detailed, extended description for the object. */
    ariaDetails?: MaybeSignal<AriaValueFor<"aria-details">>;
    /** Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. */
    ariaDisabled?: MaybeSignal<AriaStateValue<"aria-disabled">>;
    /** Indicates what functions can be performed when a dragged object is released on the drop target. */
    ariaDropEffect?: MaybeSignal<AriaValueFor<"aria-dropEffect">>;
    /** Identifies the element that provides an error message for the object. */
    ariaErrorMessage?: MaybeSignal<AriaValueFor<"aria-errormessage">>;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    ariaExpanded?: MaybeSignal<AriaStateValue<"aria-expanded">>;
    /** Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order. */
    ariaFlowTo?: MaybeSignal<AriaValueFor<"aria-flowto">>;
    /** Indicates an element's "grabbed" state in a drag-and-drop operation. */
    ariaGrabbed?: MaybeSignal<AriaStateValue<"aria-grabbed">>;
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    ariaHasPopup?: MaybeSignal<AriaValueFor<"aria-haspopup">>;
    /** Indicates whether the element is exposed to an accessibility API. */
    ariaHidden?: MaybeSignal<AriaStateValue<"aria-hidden">>;
    /** Indicates the entered value does not conform to the format expected by the application. */
    ariaInvalid?: MaybeSignal<AriaStateValue<"aria-invalid">>;
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    ariaKeyShortcuts?: MaybeSignal<AriaValueFor<"aria-keyshortcuts">>;
    /** Defines a string value that labels the current element. */
    ariaLabel?: MaybeSignal<AriaValueFor<"aria-label">>;
    /** Identifies the element (or elements) that labels the current element. */
    ariaLabelledBy?: MaybeSignal<AriaValueFor<"aria-labelledby">>;
    /** Defines the hierarchical level of an element within a structure. */
    ariaLevel?: MaybeSignal<AriaValueFor<"aria-level">>;
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    ariaLive?: MaybeSignal<AriaValueFor<"aria-live">>;
    /** Indicates whether an element is modal when displayed. */
    ariaModal?: MaybeSignal<AriaValueFor<"aria-modal">>;
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    ariaMultiLine?: MaybeSignal<AriaValueFor<"aria-multiline">>;
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    ariaMultiSelectable?: MaybeSignal<AriaValueFor<"aria-multiselectable">>;
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    ariaOrientation?: MaybeSignal<AriaValueFor<"aria-orientation">>;
    /** Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. */
    ariaOwns?: MaybeSignal<AriaValueFor<"aria-owns">>;
    /** Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format. */
    ariaPlaceholder?: MaybeSignal<AriaValueFor<"aria-placeholder">>;
    /** Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. */
    ariaPosInSet?: MaybeSignal<AriaValueFor<"aria-posinset">>;
    /** Indicates the current "pressed" state of toggle buttons. */
    ariaPressed?: MaybeSignal<AriaStateValue<"aria-pressed">>;
    /** Indicates that the element is not editable, but is otherwise operable. */
    ariaReadOnly?: MaybeSignal<AriaValueFor<"aria-readonly">>;
    /** Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. */
    ariaRelevant?: MaybeSignal<AriaValueFor<"aria-relevant">>;
    /** Indicates that user input is required on the element before a form may be submitted. */
    ariaRequired?: MaybeSignal<AriaValueFor<"aria-required">>;
    /** Defines a human-readable, author-localized description for the role of an element. */
    ariaRoleDescription?: MaybeSignal<AriaValueFor<"aria-roledescription">>;
    /** Defines the total number of rows in a table, grid, or treegrid. */
    ariaRowCount?: MaybeSignal<AriaValueFor<"aria-rowcount">>;
    /** Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. */
    ariaRowIndex?: MaybeSignal<AriaValueFor<"aria-colindex">>;
    /** Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. */
    ariaRowSpan?: MaybeSignal<AriaValueFor<"aria-rowspan">>;
    /** Indicates the current "selected" state of various widgets. */
    ariaSelected?: MaybeSignal<AriaStateValue<"aria-selected">>;
    /** Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. */
    ariaSetSize?: MaybeSignal<AriaValueFor<"aria-setsize">>;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    ariaSort?: MaybeSignal<AriaValueFor<"aria-sort">>;
    /** Defines the maximum allowed value for a range widget. */
    ariaValueMax?: MaybeSignal<AriaValueFor<"aria-valuemax">>;
    /** Defines the minimum allowed value for a range widget. */
    ariaValueMin?: MaybeSignal<AriaValueFor<"aria-valuemin">>;
    /** Defines the current value for a range widget. */
    ariaValueNow?: MaybeSignal<AriaValueFor<"aria-valuenow">>;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    ariaValueText?: MaybeSignal<AriaValueFor<"aria-valuetext">>;

    // Accessibility (Legacy)
    /** Indicates if the element can take input focus. */
    tabIndex?: MaybeSignal<number>;

    // Editing
    /** Indicates whether the element is editable. */
    contentEditable?: MaybeSignal<"true" | "false" | "plaintext-only">;
    /** Indicates whether spell checking is allowed. */
    spellcheck?: MaybeSignal<boolean>;
    /** Indicates whether the element is draggable. */
    draggable?: MaybeSignal<boolean>;

    // Input hints
    /** Hint for the type of data that might be entered by the user. */
    inputMode?: MaybeSignal<InputMode>;
    /** Hint for the action label (or icon) to present for the enter key on virtual keyboards. */
    enterKeyHint?: MaybeSignal<EnterKeyHint>;
    /** Controls whether and how text input is automatically capitalized. */
    autoCapitalize?: MaybeSignal<AutoCapitalize>;

    // Boolean
    /** Indicates whether the element is not yet, or is no longer, relevant. */
    hidden?: MaybeSignal<boolean | "until-found">;
    /** Indicates that the browser should ignore this section. */
    inert?: MaybeSignal<boolean>;

    // Popover
    /** Designates an element as a popover element. */
    popover?: MaybeSignal<"auto" | "manual">;

    // Security
    nonce?: MaybeSignal<string>;

    // Translation
    translate?: MaybeSignal<"yes" | "no">;

    // Microdata
    itemScope?: MaybeSignal<boolean>;
    itemType?: MaybeSignal<string>;
    itemId?: MaybeSignal<string>;
    itemProp?: MaybeSignal<string>;
    itemRef?: MaybeSignal<string>;

    // Custom element
    is?: MaybeSignal<string>;

    // Part (for shadow DOM styling)
    part?: MaybeSignal<string>;

    // Slot
    slot?: MaybeSignal<string>;

    // Export parts
    exportparts?: MaybeSignal<string>;

    // Anchor positioning (new)
    anchor?: MaybeSignal<string>;
}

/**
 * Data attributes (data-*) - allows any custom data attributes
 */
export interface DataAttributes {
    [key: `data-${string}`]: MaybeSignal<string | number | boolean>;
}

/**
 * Aria attributes - re-export placeholder for backward compatibility
 */
export interface AriaAttributes {
    // Intentionally empty - ARIA attributes are in GlobalAttributes
}
