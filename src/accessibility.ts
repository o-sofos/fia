// We can re-use the AttributeRule type since it's structurally identical
import type { AttributeRule } from "./core";
import type { Reactive } from "./reactivity";

// Helper function (same as in svg-attributes.ts)
const a =
  (name: string) =>
  (value: Reactive<string | number | boolean>): AttributeRule => ({
    name,
    //  FIX: Pass the reactive value (or plain value) through directly.
    // The .attr() method will handle unwrapping and casting.
    value: value as Reactive<string | number>,
  });

// --- Widget Roles & Attributes ---
export const role = a("role");
export const ariaLabel = a("aria-label");
export const ariaLabelledBy = a("aria-labelledby");
export const ariaDescribedBy = a("aria-describedby");
export const ariaDetails = a("aria-details");

// --- State & Properties ---
export const ariaHidden = a("aria-hidden");
export const ariaDisabled = a("aria-disabled");
export const ariaReadonly = a("aria-readonly");
export const ariaRequired = a("aria-required");
export const ariaInvalid = a("aria-invalid");
export const ariaPressed = a("aria-pressed");
export const ariaChecked = a("aria-checked");
export const ariaSelected = a("aria-selected");
export const ariaExpanded = a("aria-expanded");
export const ariaCurrent = a("aria-current");

// --- Values ---
export const ariaValueNow = a("aria-valuenow");
export const ariaValueMin = a("aria-valuemin");
export const ariaValueMax = a("aria-valuemax");
export const ariaValueText = a("aria-valuetext");

// ---  Live Regions & Updates ---
export const ariaLive = a("aria-live");
export const ariaRelevant = a("aria-relevant");
export const ariaAtomic = a("aria-atomic");
export const ariaBusy = a("aria-busy");

// --- Relationships & Hierarchy ---
export const ariaControls = a("aria-controls");
export const ariaOwns = a("aria-owns");
export const ariaActiveDescendant = a("aria-activedescendant");
export const ariaPosInSet = a("aria-posinset");
export const ariaSetSize = a("aria-setsize");
export const ariaLevel = a("aria-level");

// --- Drag & Drop ---
export const ariaGrabbed = a("aria-grabbed");
export const ariaDropEffect = a("aria-dropeffect");

// --- Other/Global ---
export const ariaHasPopup = a("aria-haspopup");
export const ariaKeyShortcuts = a("aria-keyshortcuts");
export const ariaModal = a("aria-modal");
export const ariaMultiline = a("aria-multiline");
export const ariaMultiSelectable = a("aria-multiselectable");
export const ariaOrientation = a("aria-orientation");
export const ariaPlaceholder = a("aria-placeholder");
export const ariaRoleDescription = a("aria-roledescription");
export const ariaSort = a("aria-sort");

// --- New in ARIA 1.2+ ---
export const ariaColCount = a("aria-colcount");
export const ariaColIndex = a("aria-colindex");
export const ariaColSpan = a("aria-colspan");
export const ariaRowCount = a("aria-rowcount");
export const ariaRowIndex = a("aria-rowindex");
export const ariaRowSpan = a("aria-rowspan");
export const ariaErrormessage = a("aria-errormessage");
