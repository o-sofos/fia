import type { MaybeSignal } from "../../reactivity/reactivity.ts";
import type { GlobalAttributes } from "./common.ts";
import type {
    Autocomplete,
    FormMethod,
    FormEnctype,
    Target,
    Wrap,
    AnchorRel
} from "./enums.ts";

// =============================================================================
// FORM ELEMENTS - All form-related attributes
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
    list?: MaybeSignal<string>;
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
    indeterminate?: MaybeSignal<boolean>;
    /** The value is required (must be checked). */
    required?: MaybeSignal<boolean>;
    /** Value submitted when checked. */
    value?: MaybeSignal<string>;
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
    value?: never;
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
    value?: MaybeSignal<string>;
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
 * Discriminated union of all possible Input attribute types.
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
 * Base attributes for button elements.
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
    formAction?: never;
    formMethod?: never;
    formEnctype?: never;
    formNoValidate?: never;
    formTarget?: never;
}

/**
 * Attributes for button elements (discriminated union).
 */
export type ButtonAttrs = ButtonSubmitAttrs | ButtonRestAttrs;

/**
 * Base attributes for form elements.
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

export interface FormPostAttrs extends BaseFormAttrs {
    /** HTTP method to use for form submission. */
    method: MaybeSignal<"post">;
    /** Encoding type to use for form submission. */
    enctype?: MaybeSignal<FormEnctype>;
}

export interface FormGetAttrs extends BaseFormAttrs {
    /** HTTP method to use for form submission. */
    method?: MaybeSignal<"get" | "dialog">;
    enctype?: never;
}

/**
 * Attributes for form elements (discriminated union).
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
    /** Name of the fieldset. */
    name?: MaybeSignal<string>;
}

/**
 * Attributes for output elements.
 */
export interface OutputAttrs extends GlobalAttributes {
    /** Name of the control. */
    name?: MaybeSignal<string>;
    /** ID of the form the element belongs to. */
    form?: MaybeSignal<string>;
    /** IDs of elements that contributed to the calculation. */
    htmlFor?: MaybeSignal<string>;
    /** Alias for htmlFor. */
    for?: MaybeSignal<string>;
}
