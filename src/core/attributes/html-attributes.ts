
import type { MaybeSignal } from "../reactivity";
import type { ReactiveCSSProperties } from "../css/css-types";
import type { DomEvents } from "../events";
import type { AriaValueFor, AriaStateValue, AriaRole } from "../aria";

// =============================================================================
// GLOBAL ATTRIBUTES (shared by all elements)
// =============================================================================

export interface GlobalAttributes {
    // Core
    /** Unique identifier for the element. */
    id?: MaybeSignal<string>;
    /** CSS class(es) for the element. Can be a string or an object of { className: boolean }. */
    class?: MaybeSignal<string> | Record<string, MaybeSignal<boolean>>;
    /** Inline CSS styles. Can be a string or an object of strict style properties. */
    style?: MaybeSignal<string> | MaybeSignal<ReactiveCSSProperties>;
    /** Advisory information for the element (tooltip). */
    title?: MaybeSignal<string>;
    /** Language of the element's content. */
    lang?: MaybeSignal<string>;
    /** Text directionality. */
    dir?: MaybeSignal<Dir>;

    // Content
    /** The text content of the element and its descendants. */
    textContent?: MaybeSignal<string | number>;
    /** The rendered text content of the element. */
    innerText?: MaybeSignal<string | number>;

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

export type DataAttributes = { [K in `data-${string}`]?: MaybeSignal<string | number | boolean> };
export type AriaAttributes = { [K in `aria-${string}`]?: MaybeSignal<string | number | boolean> };

export type InputMode = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

export type AutoCapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";

export type EnterKeyHint = "enter" | "done" | "go" | "next" | "previous" | "search" | "send";

export type FormMethod = "get" | "post" | "dialog";

export type FormEnctype = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";

export type CrossOrigin = "anonymous" | "use-credentials" | "";

export type Decoding = "sync" | "async" | "auto";

export type Loading = "eager" | "lazy";

export type FetchPriority = "high" | "low" | "auto";

export type Preload = "none" | "metadata" | "auto" | "";

export type ReferrerPolicy =
    | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin"
    | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | "";

export type Target = "_self" | "_blank" | "_parent" | "_top" | (string & {});

export type Dir = "ltr" | "rtl" | "auto";

export type Wrap = "soft" | "hard";

export type ThScope = "row" | "col" | "rowgroup" | "colgroup";

export type Autocomplete =
    | "off" | "on"
    // Name
    | "name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname"
    | "username" | "new-password" | "current-password" | "one-time-code" | "webauthn"
    | "organization-title" | "organization" | "street-address"
    // Address
    | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1"
    | "country" | "country-name" | "postal-code"
    // Payment
    | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type"
    | "transaction-currency" | "transaction-amount"
    // Contact
    | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "url" | "photo"
    | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-local-prefix" | "tel-local-suffix" | "tel-extension"
    | "email" | "impp"
    // Scoped (common)
    | "shipping street-address" | "billing street-address" | "shipping postal-code" | "billing postal-code"
    | (string & {});



export type LinkAs = "audio" | "document" | "embed" | "fetch" | "font" | "image" | "object" | "script" | "style" | "track" | "video" | "worker";

export type HttpEquiv = "content-type" | "default-style" | "refresh" | "x-ua-compatible" | "content-security-policy";

export type LinkRel =
    | "alternate" | "author" | "canonical" | "help" | "icon" | "license"
    | "manifest" | "modulepreload" | "next" | "pingback" | "preconnect"
    | "prefetch" | "preload" | "prerender" | "prev" | "search" | "stylesheet"
    | (string & {});

export type AnchorRel =
    | "alternate" | "author" | "bookmark" | "external" | "help" | "license"
    | "next" | "nofollow" | "noopener" | "noreferrer" | "opener" | "prev"
    | "search" | "tag"
    | (string & {});

export type ControlsList =
    | "nodownload" | "nofullscreen" | "noremoteplayback"
    | "nodownload nofullscreen" | "nodownload noremoteplayback"
    | "nofullscreen noremoteplayback" | "nodownload nofullscreen noremoteplayback"
    | (string & {});

export type Sandbox =
    | "allow-downloads" | "allow-forms" | "allow-modals" | "allow-orientation-lock"
    | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox"
    | "allow-presentation" | "allow-same-origin" | "allow-scripts"
    | "allow-top-navigation" | "allow-top-navigation-by-user-activation"
    | "allow-top-navigation-to-custom-protocols";

// =============================================================================
// ELEMENT-SPECIFIC ATTRIBUTES
// =============================================================================

/**
 * Base attributes shared by all input types.
 */
export interface BaseInputAttrs extends GlobalAttributes {
    /** Name of the form control. Submitted with the form. */
    name?: MaybeSignal<string>;
    /** The control is unavailable for interaction. */
    disabled?: MaybeSignal<boolean>;
    /** ID of the form the element belongs to. */
    form?: MaybeSignal<string>;
    /** Automatically focus the element when the page loads. */
    autofocus?: MaybeSignal<boolean>;
    /** Hint for form autofill feature. */
    autocomplete?: MaybeSignal<Autocomplete>;
    /** ID of a `<datalist>` element. */
    list?: MaybeSignal<string>; // Most support list, except file/hidden/button
}

// Text-like inputs
/**
 * Attributes for text-based inputs (text, password, search, tel, url).
 */
export interface InputTextAttrs extends BaseInputAttrs {
    /** Type of the input control. Defaults to "text". */
    type?: MaybeSignal<"text" | "password" | "search" | "tel" | "url">;
    /** Current value of the control. */
    value?: MaybeSignal<string | number>;
    /** Initial value of the control. */
    defaultValue?: MaybeSignal<string>;
    /** Text that appears in the form control when it has no value set. */
    placeholder?: MaybeSignal<string>;
    /** The user cannot edit the value. */
    readOnly?: MaybeSignal<boolean>;
    /** The value is required for form submission. */
    required?: MaybeSignal<boolean>;
    /** Minimum length of value. */
    minLength?: MaybeSignal<number>;
    /** Maximum length of value. */
    maxLength?: MaybeSignal<number>;
    /** Regex pattern the value must match. */
    pattern?: MaybeSignal<string>;
    /** Size of the control. */
    size?: MaybeSignal<number>;
    /** Directionality of the element's text. */
    dirname?: MaybeSignal<string>;
}

/**
 * Attributes for email inputs.
 */
export interface InputEmailAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: MaybeSignal<"email">;
    /** Current value of the control. */
    value?: MaybeSignal<string>;
    /** Initial value of the control. */
    defaultValue?: MaybeSignal<string>;
    /** Text that appears in the form control when it has no value set. */
    placeholder?: MaybeSignal<string>;
    /** The user cannot edit the value. */
    readOnly?: MaybeSignal<boolean>;
    /** The value is required for form submission. */
    required?: MaybeSignal<boolean>;
    /** Minimum length of value. */
    minLength?: MaybeSignal<number>;
    /** Maximum length of value. */
    maxLength?: MaybeSignal<number>;
    /** Regex pattern the value must match. */
    pattern?: MaybeSignal<string>;
    /** Size of the control. */
    size?: MaybeSignal<number>;
    /** Whether to allow multiple values. */
    multiple?: MaybeSignal<boolean>;
}

// Numeric
/**
 * Attributes for numeric inputs.
 */
export interface InputNumberAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: MaybeSignal<"number">;
    /** Current value of the control. */
    value?: MaybeSignal<number | string>;
    /** Initial value of the control. */
    defaultValue?: MaybeSignal<number | string>;
    /** Text that appears in the form control when it has no value set. */
    placeholder?: MaybeSignal<string>;
    /** The user cannot edit the value. */
    readOnly?: MaybeSignal<boolean>;
    /** The value is required for form submission. */
    required?: MaybeSignal<boolean>;
    /** Minimum value. */
    min?: MaybeSignal<string | number>;
    /** Maximum value. */
    max?: MaybeSignal<string | number>;
    /** Incremental bounds for numeric values. */
    step?: MaybeSignal<string | number>;
}

/**
 * Attributes for range inputs (sliders).
 */
export interface InputRangeAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: MaybeSignal<"range">;
    /** Current value of the control. */
    value?: MaybeSignal<number | string>;
    /** Initial value of the control. */
    defaultValue?: MaybeSignal<number | string>;
    /** Minimum value. */
    min?: MaybeSignal<string | number>;
    /** Maximum value. */
    max?: MaybeSignal<string | number>;
    /** Incremental bounds. */
    step?: MaybeSignal<string | number>;
}

// Time/Date
/**
 * Attributes for date and time inputs.
 */
export interface InputDateAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: MaybeSignal<"date" | "datetime-local" | "month" | "time" | "week">;
    /** Current value of the control. */
    value?: MaybeSignal<string>;
    /** Initial value of the control. */
    defaultValue?: MaybeSignal<string>;
    /** The user cannot edit the value. */
    readOnly?: MaybeSignal<boolean>;
    /** The value is required for form submission. */
    required?: MaybeSignal<boolean>;
    /** Minimum value. */
    min?: MaybeSignal<string>;
    /** Maximum value. */
    max?: MaybeSignal<string>;
    /** Incremental bounds. */
    step?: MaybeSignal<string | number>;
}

// Boolean
/**
 * Attributes for checkbox and radio inputs.
 */
export interface InputCheckboxAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: MaybeSignal<"checkbox" | "radio">;
    /** Whether the control is checked. */
    checked?: MaybeSignal<boolean>;
    /** The initial checked state. */
    defaultChecked?: MaybeSignal<boolean>;
    /** Visual indeterminate state for checkboxes. */
    indeterminate?: MaybeSignal<boolean>; // Only for checkbox but harmless for radio
    /** The value is required (must be checked). */
    required?: MaybeSignal<boolean>; // Required means "must be checked"
    /** Value submitted when checked. */
    value?: MaybeSignal<string>; // Value submitted when checked
}

// File
/**
 * Attributes for file inputs.
 */
export interface InputFileAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: MaybeSignal<"file">;
    /** File types accepted by the file upload. */
    accept?: MaybeSignal<string>;
    /** Whether to allow multiple files. */
    multiple?: MaybeSignal<boolean>;
    /** The value is required. */
    required?: MaybeSignal<boolean>;
    /** Media capture source. */
    capture?: MaybeSignal<"user" | "environment" | boolean>;
    /** File input value is uncontrolled/read-only via value prop. */
    value?: never; // Uncontrolled
}

// Color
/**
 * Attributes for color input.
 */
export interface InputColorAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: MaybeSignal<"color">;
    /** Current value of the control (hex color). */
    value?: MaybeSignal<string>;
    /** Initial value of the control. */
    defaultValue?: MaybeSignal<string>;
}

// Hidden
/**
 * Attributes for hidden input.
 */
export interface InputHiddenAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: MaybeSignal<"hidden">;
    /** Current value of the control. */
    value?: MaybeSignal<string | number>;
}

// Buttons
/**
 * Attributes for input buttons (submit, reset, button).
 */
export interface InputButtonAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: MaybeSignal<"submit" | "reset" | "button">;
    /** Button label. */
    value?: MaybeSignal<string>; // Button label
    /** URL for form submission. */
    formAction?: MaybeSignal<string>;
    /** HTTP method for form submission. */
    formMethod?: MaybeSignal<FormMethod>;
    /** Encoding type for form submission. */
    formEnctype?: MaybeSignal<FormEnctype>;
    /** Bypasses form validation. */
    formNoValidate?: MaybeSignal<boolean>;
    /** Browsing context for form submission. */
    formTarget?: MaybeSignal<Target>;
}

/**
 * Attributes for image inputs.
 */
export interface InputImageAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: MaybeSignal<"image">;
    /** Source URL of the image. */
    src?: MaybeSignal<string>;
    /** Alternate text for the image. */
    alt?: MaybeSignal<string>;
    /** Width of the image. */
    width?: MaybeSignal<number>;
    /** Height of the image. */
    height?: MaybeSignal<number>;
    /** URL for form submission. */
    formAction?: MaybeSignal<string>;
    /** HTTP method for form submission. */
    formMethod?: MaybeSignal<FormMethod>;
    /** Encoding type for form submission. */
    formEnctype?: MaybeSignal<FormEnctype>;
    /** Bypasses form validation. */
    formNoValidate?: MaybeSignal<boolean>;
    /** Browsing context for form submission. */
    formTarget?: MaybeSignal<Target>;
}

/**
 * discriminated Union of all possible Input attribute types.
 * Narrows properties based on the `type` attribute.
 */
export type InputAttrs =
    | InputTextAttrs
    | InputEmailAttrs
    | InputNumberAttrs
    | InputRangeAttrs
    | InputDateAttrs
    | InputCheckboxAttrs
    | InputFileAttrs
    | InputColorAttrs
    | InputHiddenAttrs
    | InputButtonAttrs
    | InputImageAttrs;

/**
 * Attributes for textarea elements.
 */
export interface TextAreaAttrs extends GlobalAttributes {
    /** Name of the control. */
    name?: MaybeSignal<string>;
    /** Current value of the control. */
    value?: MaybeSignal<string>;
    /** Initial value of the control. */
    defaultValue?: MaybeSignal<string>;
    /** Placeholder text. */
    placeholder?: MaybeSignal<string>;
    /** The control is unavailable for interaction. */
    disabled?: MaybeSignal<boolean>;
    /** The user cannot edit the value. */
    readOnly?: MaybeSignal<boolean>;
    /** The value is required. */
    required?: MaybeSignal<boolean>;
    /** Automatically focus the element when the page loads. */
    autofocus?: MaybeSignal<boolean>;
    /** Hint for form autofill feature. */
    autocomplete?: MaybeSignal<Autocomplete>;
    /** Visible height in text lines. */
    rows?: MaybeSignal<number>;
    /** Visible width in average character widths. */
    cols?: MaybeSignal<number>;
    /** Minimum length of value. */
    minLength?: MaybeSignal<number>;
    /** Maximum length of value. */
    maxLength?: MaybeSignal<number>;
    /** How the text should be wrapped. */
    wrap?: MaybeSignal<Wrap>;
    /** ID of the form the element belongs to. */
    form?: MaybeSignal<string>;
    /** Directionality of the element's text. */
    dirname?: MaybeSignal<string>;
}

/**
 * Attributes for select elements.
 */
export interface SelectAttrs extends GlobalAttributes {
    /** Name of the control. */
    name?: MaybeSignal<string>;
    /** The control is unavailable for interaction. */
    disabled?: MaybeSignal<boolean>;
    /** The value is required. */
    required?: MaybeSignal<boolean>;
    /** Automatically focus the element when the page loads. */
    autofocus?: MaybeSignal<boolean>;
    /** Whether to allow multiple values. */
    multiple?: MaybeSignal<boolean>;
    /** Number of visible options. */
    size?: MaybeSignal<number>;
    /** ID of the form the element belongs to. */
    form?: MaybeSignal<string>;
    /** Hint for form autofill feature. */
    autocomplete?: MaybeSignal<Autocomplete>;
}

/**
 * Attributes for option elements.
 */
export interface OptionAttrs extends GlobalAttributes {
    /** Value submitted with the form. */
    value?: MaybeSignal<string>;
    /** The option is unavailable for interaction. */
    disabled?: MaybeSignal<boolean>;
    /** Whether the option is selected. */
    selected?: MaybeSignal<boolean>;
    /** Shorter label for the option. */
    label?: MaybeSignal<string>;
}

/**
 * Attributes for optgroup elements.
 */
export interface OptgroupAttrs extends GlobalAttributes {
    /** Label for the group of options. */
    label?: MaybeSignal<string>;
    /** The group is unavailable for interaction. */
    disabled?: MaybeSignal<boolean>;
}

/**
 * Attributes for button elements.
 */
export interface BaseButtonAttrs extends GlobalAttributes {
    /** Name of the button. Submitted with the form. */
    name?: MaybeSignal<string>;
    /** Value associated with the button. */
    value?: MaybeSignal<string>;
    /** The control is unavailable for interaction. */
    disabled?: MaybeSignal<boolean>;
    /** Automatically focus the element when the page loads. */
    autofocus?: MaybeSignal<boolean>;
    /** ID of the form the element belongs to. */
    form?: MaybeSignal<string>;
    /** ID of the element to control via popover API. */
    popoverTarget?: MaybeSignal<string>;
    /** Action to perform on the popover target. */
    popoverTargetAction?: MaybeSignal<"toggle" | "show" | "hide">;
    /** (Experimental) ID of element this button commands. */
    commandfor?: MaybeSignal<string>;
    /** (Experimental) Command to execute. */
    command?: MaybeSignal<string>;
}

/**
 * Attributes for submit buttons (default).
 */
export interface ButtonSubmitAttrs extends BaseButtonAttrs {
    /** The behavior of the button. Defaults to "submit". */
    type?: MaybeSignal<"submit">;
    /** URL for form submission. */
    formAction?: MaybeSignal<string>;
    /** HTTP method for form submission. */
    formMethod?: MaybeSignal<FormMethod>;
    /** Encoding type for form submission. */
    formEnctype?: MaybeSignal<FormEnctype>;
    /** Bypasses form validation. */
    formNoValidate?: MaybeSignal<boolean>;
    /** Browsing context for form submission. */
    formTarget?: MaybeSignal<Target>;
}

/**
 * Attributes for reset and standard buttons.
 */
export interface ButtonRestAttrs extends BaseButtonAttrs {
    /** The behavior of the button. */
    type: MaybeSignal<"reset" | "button">;
    // These attributes are not valid on type="button" / "reset"
    formAction?: never;
    formMethod?: never;
    formEnctype?: never;
    formNoValidate?: never;
    formTarget?: never;
}

/**
 * Attributes for button elements.
 * Discriminated union based on `type`.
 */
export type ButtonAttrs = ButtonSubmitAttrs | ButtonRestAttrs;

/**
 * Attributes for form elements.
 */
export interface BaseFormAttrs extends GlobalAttributes {
    /** URL to use for form submission. */
    action?: MaybeSignal<string>;
    /** Browsing context for form submission. */
    target?: MaybeSignal<Target>;
    /** Bypasses form validation. */
    noValidate?: MaybeSignal<boolean>;
    /** Hint for form autofill feature. */
    autocomplete?: MaybeSignal<"on" | "off">;
    /** Name of the form. */
    name?: MaybeSignal<string>;
    /** Character encodings allowed for submission. */
    acceptCharset?: MaybeSignal<string>;
    /** Relationship to the target resource. */
    rel?: MaybeSignal<AnchorRel>;
}

// 1. Post: method="post" allows enctype
export interface FormPostAttrs extends BaseFormAttrs {
    /** HTTP method to use for form submission. */
    method: MaybeSignal<"post">;
    /** Encoding type to use for form submission. */
    enctype?: MaybeSignal<FormEnctype>;
}

// 2. Get/Dialog: enctype is ignored/invalid
export interface FormGetAttrs extends BaseFormAttrs {
    /** HTTP method to use for form submission. */
    method?: MaybeSignal<"get" | "dialog">;
    /** Encoding type to use for form submission. */
    enctype?: never;
}

/**
 * Attributes for form elements.
 * Discriminated union based on `method`.
 */
export type FormAttrs = FormPostAttrs | FormGetAttrs;

/**
 * Attributes for label elements.
 */
export interface LabelAttrs extends GlobalAttributes {
    /** ID of the element the label is bound to. */
    htmlFor?: MaybeSignal<string>;
    /** Alias for htmlFor. */
    for?: MaybeSignal<string>;
}

/**
 * Attributes for fieldset elements.
 */
export interface FieldsetAttrs extends GlobalAttributes {
    /** The group is unavailable for interaction. */
    disabled?: MaybeSignal<boolean>;
    /** ID of the form the element belongs to. */
    form?: MaybeSignal<string>;
    /** Name of the group. */
    name?: MaybeSignal<string>;
}

/**
 * Attributes for output elements.
 */
export interface OutputAttrs extends GlobalAttributes {
    /** ID of the element the output is bound to. */
    htmlFor?: MaybeSignal<string>;
    /** Alias for htmlFor. */
    for?: MaybeSignal<string>;
    /** ID of the form the element belongs to. */
    form?: MaybeSignal<string>;
    /** Name of the control. */
    name?: MaybeSignal<string>;
}

/**
 * Attributes for anchor elements.
 */
export interface AnchorAttrs extends GlobalAttributes {
    /** URL of the linked resource. */
    href?: MaybeSignal<string>;
    /** Browsing context for the linked resource. */
    target?: MaybeSignal<Target>;
    /** Relationship to the linked resource. */
    rel?: MaybeSignal<AnchorRel>;
    /** Prompts the user to download the linked resource. */
    download?: MaybeSignal<string | boolean>;
    /** Language of the linked resource. */
    hreflang?: MaybeSignal<string>;
    /** Media type of the linked resource. */
    type?: MaybeSignal<string>;
    /** Referrer policy for fetches initiated by the element. */
    referrerPolicy?: MaybeSignal<ReferrerPolicy>;
    /** URLs to ping for tracking. */
    ping?: MaybeSignal<string>;
    /** Experimental attribution source. */
    attributionSrc?: MaybeSignal<string>;
}

/**
 * Attributes for image elements.
 */
export interface ImgAttrs extends GlobalAttributes {
    /** Source URL of the image. */
    src?: MaybeSignal<string>;
    /** Alternate text for the image. */
    alt?: MaybeSignal<string>;
    /** Intrinsic width of the image. */
    width?: MaybeSignal<number | string>;
    /** Intrinsic height of the image. */
    height?: MaybeSignal<number | string>;
    /** How the browser should load the image. */
    loading?: MaybeSignal<Loading>;
    /** Image decoding hint. */
    decoding?: MaybeSignal<Decoding>;
    /** CORS settings for the image. */
    crossOrigin?: MaybeSignal<CrossOrigin>;
    /** Set of source URLs for responsive display. */
    srcset?: MaybeSignal<string>;
    /** Media conditions for selecting a source. */
    sizes?: MaybeSignal<string>;
    /** Name of an image map to use. */
    useMap?: MaybeSignal<string>;
    /** Whether the image is a server-side image map. */
    isMap?: MaybeSignal<boolean>;
    /** Referrer policy for fetches. */
    referrerPolicy?: MaybeSignal<ReferrerPolicy>;
    /** Fetch priority hint. */
    fetchPriority?: MaybeSignal<FetchPriority>;
    /** Experimental element timing. */
    elementTiming?: MaybeSignal<string>;
    /** Experimental attribution source. */
    attributionSrc?: MaybeSignal<string>;
}

/**
 * Attributes for video elements.
 */
export interface VideoAttrs extends GlobalAttributes {
    /** Source URL of the video. */
    src?: MaybeSignal<string>;
    /** Display width of the video. */
    width?: MaybeSignal<number | string>;
    /** Display height of the video. */
    height?: MaybeSignal<number | string>;
    /** URL of an image to show while downloading. */
    poster?: MaybeSignal<string>;
    /** Hint for how much of the video to preload. */
    preload?: MaybeSignal<Preload>;
    /** Whether to play automatically. */
    autoplay?: MaybeSignal<boolean>;
    /** Whether to loop the video. */
    loop?: MaybeSignal<boolean>;
    /** Whether to mute the audio. */
    muted?: MaybeSignal<boolean>;
    /** Whether to show playback controls. */
    controls?: MaybeSignal<boolean>;
    /** Whether to play inline on mobile. */
    playsInline?: MaybeSignal<boolean>;
    /** CORS settings for valid requests. */
    crossOrigin?: MaybeSignal<CrossOrigin>;
    /** Initial playback position. */
    currentTime?: MaybeSignal<number>;
    /** Audio volume (0.0 to 1.0). */
    volume?: MaybeSignal<number>;
    /** Prevents Picture-in-Picture mode. */
    disablePictureInPicture?: MaybeSignal<boolean>;
    /** Prevents remote playback (casting). */
    disableRemotePlayback?: MaybeSignal<boolean>;
    /** Controls to display/hide (nodownload, nofullscreen, noremoteplayback). */
    controlsList?: MaybeSignal<ControlsList>;
}

/**
 * Attributes for audio elements.
 */
export interface AudioAttrs extends GlobalAttributes {
    /** Source URL of the audio. */
    src?: MaybeSignal<string>;
    /** Hint for how much of the audio to preload. */
    preload?: MaybeSignal<Preload>;
    /** Whether to play automatically. */
    autoplay?: MaybeSignal<boolean>;
    /** Whether to loop the audio. */
    loop?: MaybeSignal<boolean>;
    /** Whether to mute the audio. */
    muted?: MaybeSignal<boolean>;
    /** Whether to show playback controls. */
    controls?: MaybeSignal<boolean>;
    /** CORS settings. */
    crossOrigin?: MaybeSignal<CrossOrigin>;
    /** Initial playback position. */
    currentTime?: MaybeSignal<number>;
    /** Audio volume (0.0 to 1.0). */
    volume?: MaybeSignal<number>;
    /** Prevents remote playback. */
    disableRemotePlayback?: MaybeSignal<boolean>;
    /** Controls to display/hide. */
    controlsList?: MaybeSignal<ControlsList>;
}

/**
 * Attributes for source elements (in video, audio, picture).
 */
export interface BaseSourceAttrs extends GlobalAttributes {
    /** MIME type of the resource. */
    type?: MaybeSignal<string>;
    /** Width of the image resource. */
    width?: MaybeSignal<number>;
    /** Height of the image resource. */
    height?: MaybeSignal<number>;
}

// 1. Media Source (video/audio): src required, no srcset/sizes
export interface SourceMediaAttrs extends BaseSourceAttrs {
    /** Address of the media resource. */
    src: MaybeSignal<string>;
    /** Source set for responsive images. */
    srcset?: never;
    /** Media conditions for image sources. */
    sizes?: never;
    /** Media query for the resource. */
    media?: never; // Often not used in simple audio/video source selection, but spec allows it. strictness here separates it from picture.
}

// 2. Image Source (picture): srcset required, no src
export interface SourceImageAttrs extends BaseSourceAttrs {
    /** Address of the media resource. */
    src?: never;
    /** Source set for responsive images. Required for picture sources. */
    srcset: MaybeSignal<string>;
    /** Media conditions for image sources. */
    sizes?: MaybeSignal<string>;
    /** Media query for the resource. */
    media?: MaybeSignal<string>;
}

/**
 * Attributes for source elements (in video, audio, picture).
 * Discriminated union based on context (src vs srcset).
 */
export type SourceAttrs = SourceMediaAttrs | SourceImageAttrs;

/**
 * Attributes for track elements (subtitles, captions).
 */
export interface BaseTrackAttrs extends GlobalAttributes {
    /** Address of the track. */
    src?: MaybeSignal<string>;
    /** User-readable title of the track. */
    label?: MaybeSignal<string>;
    /** Whether to enable the track by default. */
    default?: MaybeSignal<boolean>;
}

// 1. Subtitles: kind="subtitles" requires srclang
export interface TrackSubtitlesAttrs extends BaseTrackAttrs {
    /** Kind of text track. */
    kind: MaybeSignal<"subtitles">;
    /** Language of the track text. Required for subtitles. */
    srclang: MaybeSignal<string>;
}

// 2. Other Tracks: srclang optional
export interface TrackOtherAttrs extends BaseTrackAttrs {
    /** Kind of text track. */
    kind?: MaybeSignal<"captions" | "descriptions" | "chapters" | "metadata">;
    /** Language of the track text. */
    srclang?: MaybeSignal<string>;
}

/**
 * Attributes for track elements (subtitles, captions).
 * Discriminated union based on `kind`.
 */
export type TrackAttrs = TrackSubtitlesAttrs | TrackOtherAttrs;

/**
 * Attributes for canvas elements.
 */
export interface CanvasAttrs extends GlobalAttributes {
    /** Coordinate space width. */
    width?: MaybeSignal<number>;
    /** Coordinate space height. */
    height?: MaybeSignal<number>;
}

/**
 * Attributes for iframe elements.
 */
export interface IframeAttrs extends GlobalAttributes {
    /** Address of the resource. */
    src?: MaybeSignal<string>;
    /** HTML content of the page to show. */
    srcdoc?: MaybeSignal<string>;
    /** Name of the browsing context. */
    name?: MaybeSignal<string>;
    /** Width of the frame. */
    width?: MaybeSignal<number | string>;
    /** Height of the frame. */
    height?: MaybeSignal<number | string>;
    /** How the browser should load the iframe. */
    loading?: MaybeSignal<Loading>;
    /** Security rules for nested content. */
    sandbox?: MaybeSignal<Sandbox>;
    /** Feature policy to apply. */
    allow?: MaybeSignal<string>;
    /** Referrer policy for fetches. */
    referrerPolicy?: MaybeSignal<ReferrerPolicy>;
    /** Whether to allow fullscreen mode. */
    allowFullscreen?: MaybeSignal<boolean>;
    /** Whether to load without specific credentials. */
    credentialless?: MaybeSignal<boolean>;
    /** Content Security Policy to apply. */
    csp?: MaybeSignal<string>;
}

/**
 * Attributes for embed elements.
 */
export interface EmbedAttrs extends GlobalAttributes {
    /** Address of the resource. */
    src?: MaybeSignal<string>;
    /** MIME type of the resource. */
    type?: MaybeSignal<string>;
    /** Display width. */
    width?: MaybeSignal<number | string>;
    /** Display height. */
    height?: MaybeSignal<number | string>;
}

/**
 * Attributes for object elements.
 */
export interface ObjectAttrs extends GlobalAttributes {
    /** Address of the resource. */
    data?: MaybeSignal<string>;
    /** MIME type of the resource. */
    type?: MaybeSignal<string>;
    /** Name of the browsing context. */
    name?: MaybeSignal<string>;
    /** Display width. */
    width?: MaybeSignal<number | string>;
    /** Display height. */
    height?: MaybeSignal<number | string>;
    /** ID of the form the element belongs to. */
    form?: MaybeSignal<string>;
    /** Name of image map to use. */
    useMap?: MaybeSignal<string>;
}

/**
 * Attributes for map elements.
 */
export interface MapAttrs extends GlobalAttributes {
    /** Name of the image map. */
    name?: MaybeSignal<string>;
}

/**
 * Attributes for area elements.
 */
export interface BaseAreaAttrs extends GlobalAttributes {
    /** Alternate text for the area. */
    alt?: MaybeSignal<string>;
    /** Prompts the user to download the resource. */
    download?: MaybeSignal<string | boolean>;
    /** Hyperlink target. */
    href?: MaybeSignal<string>;
    /** Language of the linked resource. */
    hreflang?: MaybeSignal<string>;
    /** URLs to ping for tracking. */
    ping?: MaybeSignal<string>;
    /** Referrer policy for fetches. */
    referrerPolicy?: MaybeSignal<ReferrerPolicy>;
    /** Relationship to the linked resource. */
    rel?: MaybeSignal<AnchorRel>;
    /** Browsing context for the link. */
    target?: MaybeSignal<Target>;
}

// 1. Default Shape: Covers entire image, no coords allowed
export interface AreaDefaultAttrs extends BaseAreaAttrs {
    /** Shape of the area. */
    shape: MaybeSignal<"default">;
    /** Coordinates for the shape. */
    coords?: never;
}

// 2. Geometric Shapes: coords required
export interface AreaGeometricAttrs extends BaseAreaAttrs {
    /** Shape of the area. */
    shape?: MaybeSignal<"rect" | "circle" | "poly">;
    /** Coordinates for the shape. */
    coords: MaybeSignal<string>;
}

/**
 * Attributes for area elements.
 * Discriminated union based on `shape`.
 */
export type AreaAttrs = AreaDefaultAttrs | AreaGeometricAttrs;

/**
 * Attributes for progress elements.
 */
export interface ProgressAttrs extends GlobalAttributes {
    /** Current value of the progress. */
    value?: MaybeSignal<number>;
    /** Maximum value of the progress. */
    max?: MaybeSignal<number>;
}

/**
 * Attributes for meter elements.
 */
export interface MeterAttrs extends GlobalAttributes {
    /** Current value of the meter. */
    value?: MaybeSignal<number>;
    /** Minimum value. */
    min?: MaybeSignal<number>;
    /** Maximum value. */
    max?: MaybeSignal<number>;
    /** Upper bound of the low end of the range. */
    low?: MaybeSignal<number>;
    /** Lower bound of the high end of the range. */
    high?: MaybeSignal<number>;
    /** Optimum value in the range. */
    optimum?: MaybeSignal<number>;
}

/**
 * Attributes for time elements.
 */
export interface TimeAttrs extends GlobalAttributes {
    /** Machine-readable equivalent of the time. */
    dateTime?: MaybeSignal<string>;
}

/**
 * Attributes for data elements.
 */
export interface DataElemAttrs extends GlobalAttributes {
    /** Machine-readable value. */
    value?: MaybeSignal<string>;
}

/**
 * Attributes for dialog elements.
 */
export interface DialogAttrs extends GlobalAttributes {
    /** Whether the dialog is open. */
    open?: MaybeSignal<boolean>;
}

/**
 * Attributes for details elements.
 */
export interface DetailsAttrs extends GlobalAttributes {
    /** Whether the details are visible. */
    open?: MaybeSignal<boolean>;
    /** Name of the details group. */
    name?: MaybeSignal<string>;
}

/**
 * Attributes for table cell elements (td).
 */
export interface TableCellAttrs extends GlobalAttributes {
    /** Number of columns to span. */
    colSpan?: MaybeSignal<number>;
    /** Number of rows to span. */
    rowSpan?: MaybeSignal<number>;
    /** IDs of headers for this cell. */
    headers?: MaybeSignal<string>;
}

/**
 * Attributes for table header elements (th).
 */
export interface ThAttrs extends TableCellAttrs {
    /** Scope of the header. */
    scope?: MaybeSignal<ThScope>;
    /** Abbreviation for the header content. */
    abbr?: MaybeSignal<string>;
}

/**
 * Attributes for table column elements.
 */
export interface ColAttrs extends GlobalAttributes {
    /** Number of columns to span. */
    span?: MaybeSignal<number>;
}

/**
 * Attributes for table column group elements.
 */
export interface ColgroupAttrs extends GlobalAttributes {
    /** Number of columns to span. */
    span?: MaybeSignal<number>;
}

/**
 * Attributes for blockquote elements.
 */
export interface BlockquoteAttrs extends GlobalAttributes {
    /** URL of the source. */
    cite?: MaybeSignal<string>;
}

/**
 * Attributes for quote elements (q).
 */
export interface QAttrs extends GlobalAttributes {
    /** URL of the source. */
    cite?: MaybeSignal<string>;
}

/**
 * Attributes for modification elements (ins, del).
 */
export interface ModAttrs extends GlobalAttributes {
    /** URL of the source explaining the change. */
    cite?: MaybeSignal<string>;
    /** Date and time of the change. */
    dateTime?: MaybeSignal<string>;
}

/**
 * Attributes for ordered list elements.
 */
export interface OlAttrs extends GlobalAttributes {
    /** Starting value of the list. */
    start?: MaybeSignal<number>;
    /** Whether the list is reversed. */
    reversed?: MaybeSignal<boolean>;
    /** Type of list marker. */
    type?: MaybeSignal<"1" | "a" | "A" | "i" | "I">;
}

/**
 * Attributes for list item elements.
 */
export interface LiAttrs extends GlobalAttributes {
    /** Value of the list item. */
    value?: MaybeSignal<number>;
}

/**
 * Attributes for link elements.
 */
export interface BaseLinkAttrs extends GlobalAttributes {
    /** URL of the linked resource. */
    href?: MaybeSignal<string>;
    /** Media type of the linked resource. */
    type?: MaybeSignal<string>;
    /** CORS settings. */
    crossOrigin?: MaybeSignal<CrossOrigin>;
    /** Integrity metadata. */
    integrity?: MaybeSignal<string>;
    /** Referrer policy for fetches. */
    referrerPolicy?: MaybeSignal<ReferrerPolicy>;
    /** Language of the linked resource. */
    hreflang?: MaybeSignal<string>;
    /** Fetch priority hint. */
    fetchPriority?: MaybeSignal<FetchPriority>;
    /** Whether the element is blocking. */
    blocking?: MaybeSignal<"render">;
    /** Color for mask-icon. */
    color?: MaybeSignal<string>;
    /** Whether the link is disabled. */
    disabled?: MaybeSignal<boolean>;
}

export interface LinkPreloadAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel: MaybeSignal<"preload" | "modulepreload">;
    /** Potential destination for a preload request. Required for preload. */
    as: MaybeSignal<LinkAs>;
    /** Media query for the resource. */
    media?: MaybeSignal<string>;
    /** Source set for responsive images. */
    imageSrcset?: MaybeSignal<string>;
    /** Sizes for responsive images. */
    imageSizes?: MaybeSignal<string>;
    /** Sizes for icons. */
    sizes?: never;
}

export interface LinkStylesheetAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel: MaybeSignal<"stylesheet">;
    /** Source set for responsive images. */
    imageSrcset?: never;
    /** Sizes for responsive images. */
    imageSizes?: never;
    /** Sizes for icons. */
    sizes?: never;
    /** Potential destination for a preload request. */
    as?: never;
    /** Media query for the resource. */
    media?: MaybeSignal<string>;
}

export interface LinkIconAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel: MaybeSignal<"icon" | "apple-touch-icon">;
    /** Sizes for icons. */
    sizes?: MaybeSignal<string>;
    /** Source set for responsive images. */
    imageSrcset?: never;
    /** Sizes for responsive images. */
    imageSizes?: never;
    as?: never;
    media?: MaybeSignal<string>;
}

export interface LinkOtherAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel?: MaybeSignal<LinkRel>;
    /** Sizes for icons. */
    sizes?: never;
    /** Source set for responsive images. */
    imageSrcset?: never;
    /** Sizes for responsive images. */
    imageSizes?: never;
    as?: never;
    media?: MaybeSignal<string>;
}

/**
 * Attributes for link elements.
 * Discriminated union based on `rel`.
 */
export type LinkAttrs = LinkPreloadAttrs | LinkStylesheetAttrs | LinkIconAttrs | LinkOtherAttrs;

/**
 * Attributes for meta elements.
 */
export interface BaseMetaAttrs extends GlobalAttributes {
    /** Metadata content. */
    content: MaybeSignal<string>;
}

// 1. Name metadata
export interface MetaNameAttrs extends BaseMetaAttrs {
    /** Name of the metadata. */
    name: MaybeSignal<string>;
    /** Pragma directive. */
    httpEquiv?: never;
    /** Character encoding. */
    charset?: never;
}

// 2. Pragma directive
export interface MetaHttpEquivAttrs extends BaseMetaAttrs {
    /** Name of the metadata. */
    name?: never;
    /** Pragma directive. */
    httpEquiv: MaybeSignal<HttpEquiv>;
    /** Character encoding. */
    charset?: never;
}

// 3. Charset (content optional/ignored)
export interface MetaCharsetAttrs extends GlobalAttributes {
    /** Character encoding. */
    charset: MaybeSignal<"utf-8">;
    /** Name of the metadata. */
    name?: never;
    /** Pragma directive. */
    httpEquiv?: never;
    /** Metadata content. */
    content?: never;
}

/**
 * Attributes for meta elements.
 * Discriminated union.
 */
export type MetaAttrs = MetaNameAttrs | MetaHttpEquivAttrs | MetaCharsetAttrs;

/**
 * Attributes for script elements.
 */
export interface BaseScriptAttrs extends GlobalAttributes {
    /** URL of the script. */
    src?: MaybeSignal<string>;
    /** Type of the script. */
    type?: MaybeSignal<string>;
    /** Whether to execute asynchronously. */
    async?: MaybeSignal<boolean>;
    /** Whether to defer execution. */
    defer?: MaybeSignal<boolean>;
    /** CORS settings. */
    crossOrigin?: MaybeSignal<CrossOrigin>;
    /** Integrity metadata. */
    integrity?: MaybeSignal<string>;
    /** Referrer policy for fetches. */
    referrerPolicy?: MaybeSignal<ReferrerPolicy>;
    /** Whether the element is blocking. */
    blocking?: MaybeSignal<"render">;
    /** Fetch priority hint. */
    fetchPriority?: MaybeSignal<FetchPriority>;
    /** Whether to execute without blocking parser. */
    noModule?: MaybeSignal<boolean>;
}

// 1. Classic script
export interface ScriptClassicAttrs extends BaseScriptAttrs {
    /** Type of the script. */
    type?: MaybeSignal<"text/javascript" | "application/javascript">;
}

// 2. Module script
export interface ScriptModuleAttrs extends BaseScriptAttrs {
    /** Type of the script. */
    type: MaybeSignal<"module">;
}

// 3. Import map
export interface ScriptImportMapAttrs extends BaseScriptAttrs {
    /** Type of the script. */
    type: MaybeSignal<"importmap">;
    /** URL of the script. */
    src?: never; // Import maps must be inline
    /** Whether to execute asynchronously. */
    async?: never;
    /** Whether to defer execution. */
    defer?: never;
}

/**
 * Attributes for script elements.
 * Discriminated union based on `type`.
 */
export type ScriptAttrs = ScriptClassicAttrs | ScriptModuleAttrs | ScriptImportMapAttrs;

/**
 * Attributes for style elements.
 */
export interface StyleAttrs extends GlobalAttributes {
    /** Media query for the style. */
    media?: MaybeSignal<string>;
    /** Whether the style is disabled. */
    blocking?: MaybeSignal<"render">;
}

/**
 * Attributes for slot elements.
 */
export interface SlotAttrs extends GlobalAttributes {
    /** Name of the slot. */
    name?: MaybeSignal<string>;
}

/**
 * Attributes for template elements.
 */
export interface TemplateAttrs extends GlobalAttributes {
    /** Shadow root mode. */
    shadowRootMode?: MaybeSignal<"open" | "closed">;
    /** Whether shadow root delegates focus. */
    shadowRootDelegatesFocus?: MaybeSignal<boolean>;
    /** Whether shadow root is clonable. */
    shadowRootClonable?: MaybeSignal<boolean>;
    /** Whether shadow root is serializable. */
    shadowRootSerializable?: MaybeSignal<boolean>;
}

// =============================================================================
// ELEMENT PROPS MAP
// =============================================================================

/**
 * Use types references to maps element tag names to their specific attributes interface.
 */
export interface ElementPropsMap {
    a: AnchorAttrs;
    abbr: GlobalAttributes;
    address: GlobalAttributes;
    area: AreaAttrs;
    article: GlobalAttributes;
    aside: GlobalAttributes;
    audio: AudioAttrs;
    b: GlobalAttributes;
    base: GlobalAttributes; // base only has href/target, global attrs not valid
    bdi: GlobalAttributes;
    bdo: GlobalAttributes;
    blockquote: BlockquoteAttrs;
    body: GlobalAttributes;
    br: GlobalAttributes;
    button: ButtonAttrs;
    canvas: CanvasAttrs;
    caption: GlobalAttributes;
    cite: GlobalAttributes;
    code: GlobalAttributes;
    col: ColAttrs;
    colgroup: ColgroupAttrs;
    data: DataElemAttrs;
    datalist: GlobalAttributes;
    dd: GlobalAttributes;
    del: ModAttrs;
    details: DetailsAttrs;
    dfn: GlobalAttributes;
    dialog: DialogAttrs;
    div: GlobalAttributes;
    dl: GlobalAttributes;
    dt: GlobalAttributes;
    em: GlobalAttributes;
    embed: EmbedAttrs;
    fieldset: FieldsetAttrs;
    figcaption: GlobalAttributes;
    figure: GlobalAttributes;
    footer: GlobalAttributes;
    form: FormAttrs;
    h1: GlobalAttributes;
    h2: GlobalAttributes;
    h3: GlobalAttributes;
    h4: GlobalAttributes;
    h5: GlobalAttributes;
    h6: GlobalAttributes;
    head: GlobalAttributes;
    header: GlobalAttributes;
    hgroup: GlobalAttributes;
    hr: GlobalAttributes;
    html: GlobalAttributes;
    i: GlobalAttributes;
    iframe: IframeAttrs;
    img: ImgAttrs;
    input: InputAttrs;
    ins: ModAttrs;
    kbd: GlobalAttributes;
    label: LabelAttrs;
    legend: GlobalAttributes;
    li: LiAttrs;
    link: LinkAttrs;
    main: GlobalAttributes;
    map: MapAttrs;
    mark: GlobalAttributes;
    menu: GlobalAttributes;
    meta: MetaAttrs;
    meter: MeterAttrs;
    nav: GlobalAttributes;
    noscript: GlobalAttributes;
    object: ObjectAttrs;
    ol: OlAttrs;
    optgroup: OptgroupAttrs;
    option: OptionAttrs;
    output: OutputAttrs;
    p: GlobalAttributes;
    picture: GlobalAttributes;
    pre: GlobalAttributes;
    progress: ProgressAttrs;
    q: QAttrs;
    rp: GlobalAttributes;
    rt: GlobalAttributes;
    ruby: GlobalAttributes;
    s: GlobalAttributes;
    samp: GlobalAttributes;
    script: ScriptAttrs;
    search: GlobalAttributes;
    section: GlobalAttributes;
    select: SelectAttrs;
    slot: SlotAttrs;
    small: GlobalAttributes;
    source: SourceAttrs;
    span: GlobalAttributes;
    strong: GlobalAttributes;
    style: StyleAttrs;
    sub: GlobalAttributes;
    summary: GlobalAttributes;
    sup: GlobalAttributes;
    table: GlobalAttributes;
    tbody: GlobalAttributes;
    td: TableCellAttrs;
    template: TemplateAttrs;
    textarea: TextAreaAttrs;
    tfoot: GlobalAttributes;
    th: ThAttrs;
    thead: GlobalAttributes;
    time: TimeAttrs;
    title: GlobalAttributes;
    tr: GlobalAttributes;
    track: TrackAttrs;
    u: GlobalAttributes;
    ul: GlobalAttributes;
    var: GlobalAttributes;
    video: VideoAttrs;
    wbr: GlobalAttributes;
}

type EventHandlers<E extends Element> = DomEvents<E>;

/**
 * Union of all attributes and event handlers for a given element.
 */
export type ElementProps<K extends keyof HTMLElementTagNameMap> =
    & (K extends keyof ElementPropsMap ? ElementPropsMap[K] : GlobalAttributes)
    & EventHandlers<HTMLElementTagNameMap[K]>
    & DataAttributes
    & AriaAttributes;

