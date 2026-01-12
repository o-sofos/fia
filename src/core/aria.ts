/**
 * strict ARIA types for Flick
 * Based on WAI-ARIA 1.2
 */

// =============================================================================
// ARIA ROLES
// =============================================================================

export type AriaRole =
    | "alert"
    | "alertdialog"
    | "application"
    | "article"
    | "banner"
    | "button"
    | "cell"
    | "checkbox"
    | "columnheader"
    | "combobox"
    | "command"
    | "complementary"
    | "composite"
    | "contentinfo"
    | "definition"
    | "dialog"
    | "directory"
    | "document"
    | "feed"
    | "figure"
    | "form"
    | "grid"
    | "gridcell"
    | "group"
    | "heading"
    | "img"
    | "input"
    | "landmark"
    | "link"
    | "list"
    | "listbox"
    | "listitem"
    | "log"
    | "main"
    | "marquee"
    | "math"
    | "menu"
    | "menubar"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "navigation"
    | "note"
    | "option"
    | "presentation"
    | "progressbar"
    | "radio"
    | "radiogroup"
    | "range"
    | "region"
    | "roletype"
    | "row"
    | "rowgroup"
    | "rowheader"
    | "scrollbar"
    | "search"
    | "searchbox"
    | "section"
    | "sectionhead"
    | "select"
    | "separator"
    | "slider"
    | "spinbutton"
    | "status"
    | "structure"
    | "switch"
    | "tab"
    | "table"
    | "tablist"
    | "tabpanel"
    | "term"
    | "text"
    | "textbox"
    | "timer"
    | "toolbar"
    | "tooltip"
    | "tree"
    | "treegrid"
    | "treeitem"
    | "widget"
    | "window"
    | "none"
    | (string & {}); // Allow custom roles but preserve autocomplete

// =============================================================================
// ARIA ATTRIBUTES
// =============================================================================

export interface FlickAriaAttributes {
    /** Identifies the currently active element when focus is on a composite widget, combobox, textbox, group, or application. */
    ariaActiveDescendant?: string;
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    ariaAtomic?: boolean | "false" | "true";
    /** Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they were made. */
    ariaAutoComplete?: "none" | "inline" | "list" | "both";
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    ariaBusy?: boolean | "false" | "true";
    /** Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. */
    ariaChecked?: boolean | "false" | "mixed" | "true";
    /** Defines the total number of columns in a table, grid, or treegrid. */
    ariaColCount?: number;
    /** Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. */
    ariaColIndex?: number;
    /** Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. */
    ariaColSpan?: number;
    /** Identifies the element (or elements) that controls the current element. */
    ariaControls?: string;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    ariaCurrent?: boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time";
    /** Identifies the element (or elements) that describes the object. */
    ariaDescribedBy?: string;
    /** Identifies the element that provides a detailed, extended description for the object. */
    ariaDetails?: string;
    /** Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. */
    ariaDisabled?: boolean | "false" | "true";
    /** Indicates what functions can be performed when a dragged object is released on the drop target. */
    ariaDropEffect?: "none" | "copy" | "execute" | "link" | "move" | "popup";
    /** Identifies the element that provides an error message for the object. */
    ariaErrorMessage?: string;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    ariaExpanded?: boolean | "false" | "true";
    /** Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order. */
    ariaFlowTo?: string;
    /** Indicates an element's "grabbed" state in a drag-and-drop operation. */
    ariaGrabbed?: boolean | "false" | "true";
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    ariaHasPopup?: boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog";
    /** Indicates whether the element is exposed to an accessibility API. */
    ariaHidden?: boolean | "false" | "true";
    /** Indicates the entered value does not conform to the format expected by the application. */
    ariaInvalid?: boolean | "false" | "true" | "grammar" | "spelling";
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    ariaKeyShortcuts?: string;
    /** Defines a string value that labels the current element. */
    ariaLabel?: string;
    /** Identifies the element (or elements) that labels the current element. */
    ariaLabelledBy?: string;
    /** Defines the hierarchical level of an element within a structure. */
    ariaLevel?: number;
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    ariaLive?: "off" | "assertive" | "polite";
    /** Indicates whether an element is modal when displayed. */
    ariaModal?: boolean | "false" | "true";
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    ariaMultiLine?: boolean | "false" | "true";
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    ariaMultiSelectable?: boolean | "false" | "true";
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    ariaOrientation?: "horizontal" | "vertical";
    /** Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. */
    ariaOwns?: string;
    /** Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format. */
    ariaPlaceholder?: string;
    /** Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. */
    ariaPosInSet?: number;
    /** Indicates the current "pressed" state of toggle buttons. */
    ariaPressed?: boolean | "false" | "mixed" | "true";
    /** Indicates that the element is not editable, but is otherwise operable. */
    ariaReadOnly?: boolean | "false" | "true";
    /** Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. */
    ariaRelevant?: "additions" | "removals" | "text" | "all" | "additions text";
    /** Indicates that user input is required on the element before a form may be submitted. */
    ariaRequired?: boolean | "false" | "true";
    /** Defines a human-readable, author-localized description for the role of an element. */
    ariaRoleDescription?: string;
    /** Defines the total number of rows in a table, grid, or treegrid. */
    ariaRowCount?: number;
    /** Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. */
    ariaRowIndex?: number;
    /** Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. */
    ariaRowSpan?: number;
    /** Indicates the current "selected" state of various widgets. */
    ariaSelected?: boolean | "false" | "true";
    /** Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. */
    ariaSetSize?: number;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    ariaSort?: "none" | "ascending" | "descending" | "other";
    /** Defines the maximum allowed value for a range widget. */
    ariaValueMax?: number;
    /** Defines the minimum allowed value for a range widget. */
    ariaValueMin?: number;
    /** Defines the current value for a range widget. */
    ariaValueNow?: number;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    ariaValueText?: string;
}

export type AriaState = "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-grabbed" | "aria-hidden" | "aria-invalid" | "aria-pressed" | "aria-selected" | "aria-current";
