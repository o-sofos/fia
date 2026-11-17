import type { Bindable } from "../../reactivity/reactivity.ts";
import type { GlobalAttributes, StrictUnion } from "./common.ts";
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
    name?: Bindable<string>;
    /** The control is unavailable for interaction. */
    disabled?: Bindable<boolean>;
    /** ID of the form the element belongs to. */
    form?: Bindable<string>;
    /** Automatically focus the element when the page loads. */
    autofocus?: Bindable<boolean>;
    /** Hint for form autofill feature. */
    autocomplete?: Bindable<Autocomplete>;
    /** ID of a `<datalist>` element. */
    list?: Bindable<string>;
}

// Text-like inputs
/**
 * Attributes for text-based inputs (text, password, search, tel, url).
 */
export interface InputTextAttrs extends BaseInputAttrs {
    /** Type of the input control. Defaults to "text". */
    type?: Bindable<"text" | "password" | "search" | "tel" | "url">;
    /** Current value of the control. */
    value?: Bindable<string | number>;
    /** Initial value of the control. */
    defaultValue?: Bindable<string>;
    /** Text that appears in the form control when it has no value set. */
    placeholder?: Bindable<string>;
    /** The user cannot edit the value. */
    readOnly?: Bindable<boolean>;
    /** The value is required for form submission. */
    required?: Bindable<boolean>;
    /** Minimum length of value. */
    minLength?: Bindable<number>;
    /** Maximum length of value. */
    maxLength?: Bindable<number>;
    /** Regex pattern the value must match. */
    pattern?: Bindable<string>;
    /** Size of the control. */
    size?: Bindable<number>;
    /** Directionality of the element's text. */
    dirname?: Bindable<string>;
}

/**
 * Attributes for email inputs.
 */
export interface InputEmailAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: Bindable<"email">;
    /** Current value of the control. */
    value?: Bindable<string>;
    /** Initial value of the control. */
    defaultValue?: Bindable<string>;
    /** Text that appears in the form control when it has no value set. */
    placeholder?: Bindable<string>;
    /** The user cannot edit the value. */
    readOnly?: Bindable<boolean>;
    /** The value is required for form submission. */
    required?: Bindable<boolean>;
    /** Minimum length of value. */
    minLength?: Bindable<number>;
    /** Maximum length of value. */
    maxLength?: Bindable<number>;
    /** Regex pattern the value must match. */
    pattern?: Bindable<string>;
    /** Size of the control. */
    size?: Bindable<number>;
    /** Whether to allow multiple values. */
    multiple?: Bindable<boolean>;
}

// Numeric
/**
 * Attributes for numeric inputs.
 */
export interface InputNumberAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: Bindable<"number">;
    /** Current value of the control. */
    value?: Bindable<number | string>;
    /** Initial value of the control. */
    defaultValue?: Bindable<number | string>;
    /** Text that appears in the form control when it has no value set. */
    placeholder?: Bindable<string>;
    /** The user cannot edit the value. */
    readOnly?: Bindable<boolean>;
    /** The value is required for form submission. */
    required?: Bindable<boolean>;
    /** Minimum value. */
    min?: Bindable<string | number>;
    /** Maximum value. */
    max?: Bindable<string | number>;
    /** Incremental bounds for numeric values. */
    step?: Bindable<string | number>;
}

/**
 * Attributes for range inputs (sliders).
 */
export interface InputRangeAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: Bindable<"range">;
    /** Current value of the control. */
    value?: Bindable<number | string>;
    /** Initial value of the control. */
    defaultValue?: Bindable<number | string>;
    /** Minimum value. */
    min?: Bindable<string | number>;
    /** Maximum value. */
    max?: Bindable<string | number>;
    /** Incremental bounds. */
    step?: Bindable<string | number>;
}

// Time/Date
/**
 * Attributes for date and time inputs.
 */
export interface InputDateAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: Bindable<"date" | "datetime-local" | "month" | "time" | "week">;
    /** Current value of the control. */
    value?: Bindable<string>;
    /** Initial value of the control. */
    defaultValue?: Bindable<string>;
    /** The user cannot edit the value. */
    readOnly?: Bindable<boolean>;
    /** The value is required for form submission. */
    required?: Bindable<boolean>;
    /** Minimum value. */
    min?: Bindable<string>;
    /** Maximum value. */
    max?: Bindable<string>;
    /** Incremental bounds. */
    step?: Bindable<string | number>;
}

// Boolean
/**
 * Attributes for checkbox and radio inputs.
 */
export interface InputCheckboxAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: Bindable<"checkbox" | "radio">;
    /** Whether the control is checked. */
    checked?: Bindable<boolean>;
    /** The initial checked state. */
    defaultChecked?: Bindable<boolean>;
    /** Visual indeterminate state for checkboxes. */
    indeterminate?: Bindable<boolean>;
    /** The value is required (must be checked). */
    required?: Bindable<boolean>;
    /** Value submitted when checked. */
    value?: Bindable<string>;
}

// File
/**
 * Attributes for file inputs.
 */
export interface InputFileAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: Bindable<"file">;
    /** File types accepted by the file upload. */
    accept?: Bindable<string>;
    /** Whether to allow multiple files. */
    multiple?: Bindable<boolean>;
    /** The value is required. */
    required?: Bindable<boolean>;
    /** Media capture source. */
    capture?: Bindable<"user" | "environment" | boolean>;
    /** File input value is uncontrolled/read-only via value prop. */
    value?: never;
}

// Color
/**
 * Attributes for color input.
 */
export interface InputColorAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: Bindable<"color">;
    /** Current value of the control (hex color). */
    value?: Bindable<string>;
    /** Initial value of the control. */
    defaultValue?: Bindable<string>;
}

// Hidden
/**
 * Attributes for hidden input.
 */
export interface InputHiddenAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: Bindable<"hidden">;
    /** Current value of the control. */
    value?: Bindable<string | number>;
}

// Buttons
/**
 * Attributes for input buttons (submit, reset, button).
 */
export interface InputButtonAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: Bindable<"submit" | "reset" | "button">;
    /** Button label. */
    value?: Bindable<string>;
    /** URL for form submission. */
    formAction?: Bindable<string>;
    /** HTTP method for form submission. */
    formMethod?: Bindable<FormMethod>;
    /** Encoding type for form submission. */
    formEnctype?: Bindable<FormEnctype>;
    /** Bypasses form validation. */
    formNoValidate?: Bindable<boolean>;
    /** Browsing context for form submission. */
    formTarget?: Bindable<Target>;
}

/**
 * Attributes for image inputs.
 */
export interface InputImageAttrs extends BaseInputAttrs {
    /** Type of the input control. */
    type: Bindable<"image">;
    /** Source URL of the image. */
    src?: Bindable<string>;
    /** Alternate text for the image. */
    alt?: Bindable<string>;
    /** Width of the image. */
    width?: Bindable<number>;
    /** Height of the image. */
    height?: Bindable<number>;
    /** URL for form submission. */
    formAction?: Bindable<string>;
    /** HTTP method for form submission. */
    formMethod?: Bindable<FormMethod>;
    /** Encoding type for form submission. */
    formEnctype?: Bindable<FormEnctype>;
    /** Bypasses form validation. */
    formNoValidate?: Bindable<boolean>;
    /** Browsing context for form submission. */
    formTarget?: Bindable<Target>;
}

/**
 * Discriminated union of all possible Input attribute types.
 */
export type InputAttrs = StrictUnion<
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
    | InputImageAttrs
>;

/**
 * Attributes for textarea elements.
 */
export interface TextAreaAttrs extends GlobalAttributes {
    /** Name of the control. */
    name?: Bindable<string>;
    /** Current value of the control. */
    value?: Bindable<string>;
    /** Initial value of the control. */
    defaultValue?: Bindable<string>;
    /** Placeholder text. */
    placeholder?: Bindable<string>;
    /** The control is unavailable for interaction. */
    disabled?: Bindable<boolean>;
    /** The user cannot edit the value. */
    readOnly?: Bindable<boolean>;
    /** The value is required. */
    required?: Bindable<boolean>;
    /** Automatically focus the element when the page loads. */
    autofocus?: Bindable<boolean>;
    /** Hint for form autofill feature. */
    autocomplete?: Bindable<Autocomplete>;
    /** Visible height in text lines. */
    rows?: Bindable<number>;
    /** Visible width in average character widths. */
    cols?: Bindable<number>;
    /** Minimum length of value. */
    minLength?: Bindable<number>;
    /** Maximum length of value. */
    maxLength?: Bindable<number>;
    /** How the text should be wrapped. */
    wrap?: Bindable<Wrap>;
    /** ID of the form the element belongs to. */
    form?: Bindable<string>;
    /** Directionality of the element's text. */
    dirname?: Bindable<string>;
}

/**
 * Attributes for select elements.
 */
export interface SelectAttrs extends GlobalAttributes {
    /** Name of the control. */
    name?: Bindable<string>;
    /** The current value of the select (reflects the selected option's value). */
    value?: Bindable<string>;
    /** The control is unavailable for interaction. */
    disabled?: Bindable<boolean>;
    /** The value is required. */
    required?: Bindable<boolean>;
    /** Automatically focus the element when the page loads. */
    autofocus?: Bindable<boolean>;
    /** Whether to allow multiple values. */
    multiple?: Bindable<boolean>;
    /** Number of visible options. */
    size?: Bindable<number>;
    /** ID of the form the element belongs to. */
    form?: Bindable<string>;
    /** Hint for form autofill feature. */
    autocomplete?: Bindable<Autocomplete>;
}

/**
 * Attributes for option elements.
 */
export interface OptionAttrs extends GlobalAttributes {
    /** Value submitted with the form. */
    value?: Bindable<string>;
    /** The option is unavailable for interaction. */
    disabled?: Bindable<boolean>;
    /** Whether the option is selected. */
    selected?: Bindable<boolean>;
    /** Shorter label for the option. */
    label?: Bindable<string>;
}

/**
 * Attributes for optgroup elements.
 */
export interface OptgroupAttrs extends GlobalAttributes {
    /** Label for the group of options. */
    label?: Bindable<string>;
    /** The group is unavailable for interaction. */
    disabled?: Bindable<boolean>;
}

/**
 * Base attributes for button elements.
 */
export interface BaseButtonAttrs extends GlobalAttributes {
    /** Name of the button. Submitted with the form. */
    name?: Bindable<string>;
    /** Value associated with the button. */
    value?: Bindable<string>;
    /** The control is unavailable for interaction. */
    disabled?: Bindable<boolean>;
    /** Automatically focus the element when the page loads. */
    autofocus?: Bindable<boolean>;
    /** ID of the form the element belongs to. */
    form?: Bindable<string>;
    /** ID of the element to control via popover API. */
    popoverTarget?: Bindable<string>;
    /** Action to perform on the popover target. */
    popoverTargetAction?: Bindable<"toggle" | "show" | "hide">;
    /** (Experimental) ID of element this button commands. */
    commandfor?: Bindable<string>;
    /** (Experimental) Command to execute. */
    command?: Bindable<string>;
}

/**
 * Attributes for submit buttons (default).
 */
export interface ButtonSubmitAttrs extends BaseButtonAttrs {
    /** The behavior of the button. Defaults to "submit". */
    type?: Bindable<"submit">;
    /** URL for form submission. */
    formAction?: Bindable<string>;
    /** HTTP method for form submission. */
    formMethod?: Bindable<FormMethod>;
    /** Encoding type for form submission. */
    formEnctype?: Bindable<FormEnctype>;
    /** Bypasses form validation. */
    formNoValidate?: Bindable<boolean>;
    /** Browsing context for form submission. */
    formTarget?: Bindable<Target>;
}

/**
 * Attributes for reset and standard buttons.
 */
export interface ButtonRestAttrs extends BaseButtonAttrs {
    /** The behavior of the button. */
    type: Bindable<"reset" | "button">;
    formAction?: never;
    formMethod?: never;
    formEnctype?: never;
    formNoValidate?: never;
    formTarget?: never;
}

/**
 * Attributes for button elements (discriminated union).
 */
export type ButtonAttrs = StrictUnion<ButtonSubmitAttrs | ButtonRestAttrs>;

/**
 * Base attributes for form elements.
 */
export interface BaseFormAttrs extends GlobalAttributes {
    /** URL to use for form submission. */
    action?: Bindable<string>;
    /** Browsing context for form submission. */
    target?: Bindable<Target>;
    /** Bypasses form validation. */
    noValidate?: Bindable<boolean>;
    /** Hint for form autofill feature. */
    autocomplete?: Bindable<"on" | "off">;
    /** Name of the form. */
    name?: Bindable<string>;
    /** Character encodings allowed for submission. */
    acceptCharset?: Bindable<string>;
    /** Relationship to the target resource. */
    rel?: Bindable<AnchorRel>;
}

export interface FormPostAttrs extends BaseFormAttrs {
    /** HTTP method to use for form submission. */
    method: Bindable<"post">;
    /** Encoding type to use for form submission. */
    enctype?: Bindable<FormEnctype>;
}

export interface FormGetAttrs extends BaseFormAttrs {
    /** HTTP method to use for form submission. */
    method?: Bindable<"get" | "dialog">;
    enctype?: never;
}

/**
 * Attributes for form elements (discriminated union).
 */
export type FormAttrs = StrictUnion<FormPostAttrs | FormGetAttrs>;

/**
 * Attributes for label elements.
 */
export interface LabelAttrs extends GlobalAttributes {
    /** ID of the element the label is bound to. */
    htmlFor?: Bindable<string>;
    /** Alias for htmlFor. */
    for?: Bindable<string>;
}

/**
 * Attributes for fieldset elements.
 */
export interface FieldsetAttrs extends GlobalAttributes {
    /** The group is unavailable for interaction. */
    disabled?: Bindable<boolean>;
    /** ID of the form the element belongs to. */
    form?: Bindable<string>;
    /** Name of the fieldset. */
    name?: Bindable<string>;
}

/**
 * Attributes for output elements.
 */
export interface OutputAttrs extends GlobalAttributes {
    /** Name of the control. */
    name?: Bindable<string>;
    /** ID of the form the element belongs to. */
    form?: Bindable<string>;
    /** IDs of elements that contributed to the calculation. */
    htmlFor?: Bindable<string>;
    /** Alias for htmlFor. */
    for?: Bindable<string>;
}
