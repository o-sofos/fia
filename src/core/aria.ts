export type AccessibilityOptions =
	| { __type: "role"; role: AriaRole }
	| { __type: "state"; state: AriaState; value: AriaStateValue<AriaState> }
	| { __type: "property"; property: AriaProperty; value: AriaPropertyValue<AriaProperty> };

// Value type definitions
type AriaBoolean = "true" | "false";
type AriaTristate = AriaBoolean | "mixed";
type AriaIdReference = string;
type AriaIdReferenceList = string;
type AriaUndefineable<T extends string> = T | "undefined";

export type AriaHasPopupValue = AriaBoolean | "menu" | "listbox" | "tree" | "grid" | "dialog" | "non-modal-dialog";

interface AriaStateValueMap {
	// Simple boolean
	"aria-busy": AriaBoolean;
	"aria-disabled": AriaBoolean;
	"aria-selected": AriaBoolean | "undefined";

	// Tristate (true/false/mixed)
	"aria-checked": AriaUndefineable<AriaTristate>;
	"aria-pressed": AriaUndefineable<AriaTristate>;

	// Boolean with undefined
	"aria-expanded": AriaUndefineable<AriaBoolean>;
	"aria-grabbed": AriaUndefineable<AriaBoolean> | "deprecated";
	"aria-hidden": AriaUndefineable<AriaBoolean>;

	// Enumerated
	"aria-invalid": AriaBoolean | "grammar" | "spelling";
	"aria-current": AriaBoolean | "page" | "step" | "location" | "date" | "time";
}

// Property to value type mapping
interface AriaPropertyValueMap {
	// ID References
	"aria-activedescendant": AriaIdReference;
	"aria-controls": AriaIdReferenceList;
	"aria-describedby": AriaIdReferenceList;
	"aria-details": AriaIdReference;
	"aria-errormessage": AriaIdReference;
	"aria-flowto": AriaIdReferenceList;
	"aria-labelledby": AriaIdReferenceList;
	"aria-owns": AriaIdReferenceList;

	// Boolean
	"aria-atomic": AriaBoolean;
	"aria-modal": AriaBoolean;
	"aria-multiline": AriaBoolean;
	"aria-multiselectable": AriaBoolean;
	"aria-readonly": AriaBoolean;
	"aria-required": AriaBoolean;

	// Tristate
	"aria-expanded": AriaBoolean | "undefined";
	"aria-hidden": AriaBoolean | "undefined";

	// Enumerated
	"aria-autocomplete": "none" | "inline" | "list" | "both";
	"aria-dropEffect": "none" | "copy" | "execute" | "link" | "move" | "popup";
	"aria-haspopup": AriaHasPopupValue;
	"aria-live": "off" | "polite" | "assertive";
	"aria-orientation": "horizontal" | "vertical" | "undefined";
	"aria-relevant": "additions" | "removals" | "text" | "all" | "additions text";
	"aria-sort": "none" | "ascending" | "descending" | "other";

	// Numeric (integers)
	"aria-colcount": number;
	"aria-colindex": number;
	"aria-colspan": number;
	"aria-level": number;
	"aria-posinset": number;
	"aria-rowcount": number;
	"aria-rowspan": number;
	"aria-setsize": number;

	// Numeric (float)
	"aria-valuemax": number;
	"aria-valuemin": number;
	"aria-valuenow": number;

	// String
	"aria-label": string;
	"aria-valuetext": string;
	"aria-keyshortcuts": string;
	"aria-roledescription": string;
	"aria-placeholder": string;

	// Custom/data attribute
	"data-controls": string;
}

// Derive the union type from the map keys
export type AriaProperty = keyof AriaPropertyValueMap;
export type AriaPropertyValue<P extends AriaProperty> = AriaPropertyValueMap[P];

// Derive the union type from the map keys
export type AriaState = keyof AriaStateValueMap;

// Type-safe getter for property values
export type AriaValueFor<P extends AriaProperty> = AriaPropertyValueMap[P];

// Type-safe getter for state values
export type AriaStateValueFor<S extends AriaState> = AriaStateValueMap[S];
export type AriaStateValue<S extends AriaState> = AriaStateValueMap[S];

// Type-safe ARIA attributes object
export type AriaAttributes = {
	[P in AriaProperty]?: AriaValueFor<P>;
};
// Type-safe ARIA states object
export type AriaStates = {
	[S in AriaState]?: AriaStateValueFor<S>;
};

// Helper to build aria attributes
export function buildAriaAttributes(attrs: AriaAttributes): Record<string, string> {
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(attrs)) {
		if (value !== undefined) {
			result[key] = String(value);
		}
	}
	return result;
}

export function buildAriaStates(states: AriaStates): Record<string, string> {
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(states)) {
		if (value !== undefined) {
			result[key] = String(value);
		}
	}
	return result;
}

// Abstract roles - not to be used directly in markup
type AbstractRole = "command" | "composite" | "input" | "landmark" | "range" | "roletype" | "section" | "sectionhead" | "select" | "structure" | "widget" | "window";

// Landmark roles
type LandmarkRole = "banner" | "complementary" | "contentinfo" | "form" | "main" | "navigation" | "region" | "search";

// Widget roles
type WidgetRole =
	| "button"
	| "checkbox"
	| "gridcell"
	| "link"
	| "menuitem"
	| "menuitemcheckbox"
	| "menuitemradio"
	| "option"
	| "progressbar"
	| "radio"
	| "scrollbar"
	| "searchbox"
	| "separator"
	| "slider"
	| "spinbutton"
	| "switch"
	| "tab"
	| "tabpanel"
	| "textbox"
	| "treeitem";

// Composite widget roles
type CompositeWidgetRole = "combobox" | "grid" | "listbox" | "menu" | "menubar" | "radiogroup" | "tablist" | "tree" | "treegrid";

// Document structure roles
type DocumentStructureRole =
	| "application"
	| "article"
	| "cell"
	| "columnheader"
	| "definition"
	| "directory"
	| "document"
	| "feed"
	| "figure"
	| "group"
	| "heading"
	| "img"
	| "list"
	| "listitem"
	| "math"
	| "none"
	| "note"
	| "presentation"
	| "row"
	| "rowgroup"
	| "rowheader"
	| "table"
	| "term"
	| "text"
	| "toolbar"
	| "tooltip";

// Live region roles
type LiveRegionRole = "alert" | "log" | "marquee" | "status" | "timer";

// Window roles
type WindowRole = "alertdialog" | "dialog";

// ============================================================
// Concrete roles (usable in markup)
// ============================================================

export type ConcreteAriaRole = LandmarkRole | WidgetRole | CompositeWidgetRole | DocumentStructureRole | LiveRegionRole | WindowRole;

// All roles including abstract (for type checking/validation)
export type AriaRole = ConcreteAriaRole | AbstractRole;

// ============================================================
// Role to Required/Supported Attributes Mapping
// ============================================================

type AriaAttributeRequirement = "required" | "supported" | "prohibited";

interface RoleAttributeConfig {
	states?: Partial<Record<AriaState, AriaAttributeRequirement>>;
	properties?: Partial<Record<AriaProperty, AriaAttributeRequirement>>;
	requiredParent?: AriaRole[];
	requiredChildren?: AriaRole[];
	nameFrom?: ("author" | "contents")[];
	nameRequired?: boolean;
}

// Partial mapping - expand as needed
type AriaRoleAttributeMap = {
	[R in AriaRole]?: RoleAttributeConfig;
};

const roleAttributeMap: AriaRoleAttributeMap = {
	button: {
		states: {
			"aria-disabled": "supported",
			"aria-expanded": "supported",
			"aria-pressed": "supported"
		},
		properties: {
			"aria-haspopup": "supported"
		},
		nameFrom: ["author", "contents"],
		nameRequired: true
	},

	checkbox: {
		states: {
			"aria-checked": "required",
			"aria-disabled": "supported",
			"aria-invalid": "supported"
		},
		properties: {
			"aria-readonly": "supported",
			"aria-required": "supported"
		},
		nameFrom: ["author", "contents"],
		nameRequired: true
	},

	combobox: {
		states: {
			"aria-expanded": "required",
			"aria-disabled": "supported",
			"aria-invalid": "supported"
		},
		properties: {
			"aria-autocomplete": "supported",
			"aria-controls": "required",
			"aria-activedescendant": "supported"
		},
		nameFrom: ["author"],
		nameRequired: true
	},

	dialog: {
		properties: {
			"aria-label": "supported",
			"aria-labelledby": "supported",
			"aria-describedby": "supported",
			"aria-modal": "supported"
		},
		nameFrom: ["author"],
		nameRequired: true
	},

	grid: {
		states: {
			"aria-disabled": "supported"
		},
		properties: {
			"aria-activedescendant": "supported",
			"aria-colcount": "supported",
			"aria-multiselectable": "supported",
			"aria-readonly": "supported",
			"aria-rowcount": "supported"
		},
		requiredChildren: ["row", "rowgroup"],
		nameFrom: ["author"],
		nameRequired: true
	},

	listbox: {
		states: {
			"aria-disabled": "supported",
			"aria-expanded": "supported",
			"aria-invalid": "supported"
		},
		properties: {
			"aria-activedescendant": "supported",
			"aria-multiselectable": "supported",
			"aria-orientation": "supported",
			"aria-readonly": "supported",
			"aria-required": "supported"
		},
		requiredChildren: ["option"],
		nameFrom: ["author"],
		nameRequired: true
	},

	option: {
		states: {
			"aria-checked": "supported",
			"aria-disabled": "supported",
			"aria-selected": "supported"
		},
		properties: {
			"aria-posinset": "supported",
			"aria-setsize": "supported"
		},
		requiredParent: ["listbox", "group"],
		nameFrom: ["author", "contents"],
		nameRequired: true
	},

	tab: {
		states: {
			"aria-disabled": "supported",
			"aria-expanded": "supported",
			"aria-selected": "supported"
		},
		properties: {
			"aria-controls": "supported",
			"aria-haspopup": "supported",
			"aria-posinset": "supported",
			"aria-setsize": "supported"
		},
		requiredParent: ["tablist"],
		nameFrom: ["author", "contents"],
		nameRequired: true
	},

	tablist: {
		properties: {
			"aria-activedescendant": "supported",
			"aria-multiselectable": "supported",
			"aria-orientation": "supported"
		},
		requiredChildren: ["tab"],
		nameFrom: ["author"]
	},

	tabpanel: {
		properties: {
			"aria-labelledby": "supported"
		},
		nameFrom: ["author"],
		nameRequired: true
	},

	tree: {
		states: {
			"aria-disabled": "supported"
		},
		properties: {
			"aria-activedescendant": "supported",
			"aria-multiselectable": "supported",
			"aria-orientation": "supported",
			"aria-required": "supported"
		},
		requiredChildren: ["treeitem", "group"],
		nameFrom: ["author"],
		nameRequired: true
	},

	treeitem: {
		states: {
			"aria-checked": "supported",
			"aria-disabled": "supported",
			"aria-expanded": "supported",
			"aria-selected": "supported"
		},
		properties: {
			"aria-haspopup": "supported",
			"aria-level": "supported",
			"aria-posinset": "supported",
			"aria-setsize": "supported"
		},
		requiredParent: ["tree", "group"],
		nameFrom: ["author", "contents"],
		nameRequired: true
	},

	// Presentation/none - prohibits all aria
	presentation: {
		states: {},
		properties: {}
	},
	none: {
		states: {},
		properties: {}
	}
};

// ============================================================
// Type-safe Role Utilities
// ============================================================

export function isAbstractRole(role: AriaRole): role is AbstractRole {
	const abstractRoles: Set<string> = new Set(["command", "composite", "input", "landmark", "range", "roletype", "section", "sectionhead", "select", "structure", "widget", "window"]);
	return abstractRoles.has(role);
}

export function isLandmarkRole(role: AriaRole): role is LandmarkRole {
	const landmarks: Set<string> = new Set(["banner", "complementary", "contentinfo", "form", "main", "navigation", "region", "search"]);
	return landmarks.has(role);
}

export function getRoleConfig(role: AriaRole): RoleAttributeConfig | undefined {
	return roleAttributeMap[role];
}

export function getRequiredAttributes(role: AriaRole): {
	states: AriaState[];
	properties: AriaProperty[];
} {
	const config = roleAttributeMap[role];
	if (!config) return { states: [], properties: [] };

	const states = Object.entries(config.states ?? {})
		.filter(([, req]) => req === "required")
		.map(([state]) => state as AriaState);

	const properties = Object.entries(config.properties ?? {})
		.filter(([, req]) => req === "required")
		.map(([prop]) => prop as AriaProperty);

	return { states, properties };
}
