import type { Bindable } from "../../reactivity/reactivity.ts";
import type { GlobalAttributes, StrictUnion } from "./common.ts";
import type {
    ThScope,
    Target,
    AnchorRel,
    ReferrerPolicy,
    CrossOrigin,
    FetchPriority,
    LinkAs,
    LinkRel,
    HttpEquiv
} from "./enums.ts";

// =============================================================================
// IMAGE MAPS
// =============================================================================

/**
 * Attributes for map elements.
 */
export interface MapAttrs extends GlobalAttributes {
    /** Name of the image map. */
    name?: Bindable<string>;
}

/**
 * Base attributes for area elements.
 */
export interface BaseAreaAttrs extends GlobalAttributes {
    /** Alternate text for the area. */
    alt?: Bindable<string>;
    /** Prompts the user to download the resource. */
    download?: Bindable<string | boolean>;
    /** Hyperlink target. */
    href?: Bindable<string>;
    /** Language of the linked resource. */
    hreflang?: Bindable<string>;
    /** URLs to ping for tracking. */
    ping?: Bindable<string>;
    /** Referrer policy for fetches. */
    referrerPolicy?: Bindable<ReferrerPolicy>;
    /** Relationship to the linked resource. */
    rel?: Bindable<AnchorRel>;
    /** Browsing context for the link. */
    target?: Bindable<Target>;
}

export interface AreaDefaultAttrs extends BaseAreaAttrs {
    /** Shape of the area. */
    shape: Bindable<"default">;
    coords?: never;
}

export interface AreaGeometricAttrs extends BaseAreaAttrs {
    /** Shape of the area. */
    shape?: Bindable<"rect" | "circle" | "poly">;
    /** Coordinates for the shape. */
    coords: Bindable<string>;
}

/**
 * Attributes for area elements (discriminated union).
 */
export type AreaAttrs = StrictUnion<AreaDefaultAttrs | AreaGeometricAttrs>;

// =============================================================================
// PROGRESS & METER
// =============================================================================

/**
 * Attributes for progress elements.
 */
export interface ProgressAttrs extends GlobalAttributes {
    /** Current value of the progress. */
    value?: Bindable<number>;
    /** Maximum value of the progress. */
    max?: Bindable<number>;
}

/**
 * Attributes for meter elements.
 */
export interface MeterAttrs extends GlobalAttributes {
    /** Current value of the meter. */
    value?: Bindable<number>;
    /** Minimum value. */
    min?: Bindable<number>;
    /** Maximum value. */
    max?: Bindable<number>;
    /** Upper bound of the low end of the range. */
    low?: Bindable<number>;
    /** Lower bound of the high end of the range. */
    high?: Bindable<number>;
    /** Optimum value in the range. */
    optimum?: Bindable<number>;
}

// =============================================================================
// SEMANTIC TEXT ELEMENTS
// =============================================================================

/**
 * Attributes for time elements.
 */
export interface TimeAttrs extends GlobalAttributes {
    /** Machine-readable equivalent of the time. */
    dateTime?: Bindable<string>;
}

/**
 * Attributes for data elements.
 */
export interface DataElemAttrs extends GlobalAttributes {
    /** Machine-readable value. */
    value?: Bindable<string>;
}

// =============================================================================
// INTERACTIVE ELEMENTS
// =============================================================================

/**
 * Attributes for dialog elements.
 */
export interface DialogAttrs extends GlobalAttributes {
    /** Whether the dialog is open. */
    open?: Bindable<boolean>;
}

/**
 * Attributes for details elements.
 */
export interface DetailsAttrs extends GlobalAttributes {
    /** Whether the details are visible. */
    open?: Bindable<boolean>;
    /** Name of the details group. */
    name?: Bindable<string>;
}

// =============================================================================
// TABLE ELEMENTS
// =============================================================================

/**
 * Attributes for table cell elements (td).
 */
export interface TableCellAttrs extends GlobalAttributes {
    /** Number of columns to span. */
    colSpan?: Bindable<number>;
    /** Number of rows to span. */
    rowSpan?: Bindable<number>;
    /** IDs of headers for this cell. */
    headers?: Bindable<string>;
}

/**
 * Attributes for table header elements (th).
 */
export interface ThAttrs extends TableCellAttrs {
    /** Scope of the header. */
    scope?: Bindable<ThScope>;
    /** Abbreviation for the header content. */
    abbr?: Bindable<string>;
}

/**
 * Attributes for table column elements.
 */
export interface ColAttrs extends GlobalAttributes {
    /** Number of columns to span. */
    span?: Bindable<number>;
}

/**
 * Attributes for table column group elements.
 */
export interface ColgroupAttrs extends GlobalAttributes {
    /** Number of columns to span. */
    span?: Bindable<number>;
}

// =============================================================================
// QUOTE & MODIFICATION ELEMENTS
// =============================================================================

/**
 * Attributes for blockquote elements.
 */
export interface BlockquoteAttrs extends GlobalAttributes {
    /** URL of the source. */
    cite?: Bindable<string>;
}

/**
 * Attributes for quote elements (q).
 */
export interface QAttrs extends GlobalAttributes {
    /** URL of the source. */
    cite?: Bindable<string>;
}

/**
 * Attributes for modification elements (ins, del).
 */
export interface ModAttrs extends GlobalAttributes {
    /** URL of the source explaining the change. */
    cite?: Bindable<string>;
    /** Date and time of the change. */
    dateTime?: Bindable<string>;
}

// =============================================================================
// LIST ELEMENTS
// =============================================================================

/**
 * Attributes for ordered list elements.
 */
export interface OlAttrs extends GlobalAttributes {
    /** Starting value of the list. */
    start?: Bindable<number>;
    /** Whether the list is reversed. */
    reversed?: Bindable<boolean>;
    /** Type of list marker. */
    type?: Bindable<"1" | "a" | "A" | "i" | "I">;
}

/**
 * Attributes for list item elements.
 */
export interface LiAttrs extends GlobalAttributes {
    /** Value of the list item. */
    value?: Bindable<number>;
}

// =============================================================================
// DOCUMENT METADATA (link, meta, script, style)
// =============================================================================

/**
 * Base attributes for link elements.
 */
export interface BaseLinkAttrs extends GlobalAttributes {
    /** URL of the linked resource. */
    href?: Bindable<string>;
    /** Media type of the linked resource. */
    type?: Bindable<string>;
    /** CORS settings. */
    crossOrigin?: Bindable<CrossOrigin>;
    /** Integrity metadata. */
    integrity?: Bindable<string>;
    /** Referrer policy for fetches. */
    referrerPolicy?: Bindable<ReferrerPolicy>;
    /** Language of the linked resource. */
    hreflang?: Bindable<string>;
    /** Fetch priority hint. */
    fetchPriority?: Bindable<FetchPriority>;
    /** Whether the element is blocking. */
    blocking?: Bindable<"render">;
    /** Color for mask-icon. */
    color?: Bindable<string>;
    /** Whether the link is disabled. */
    disabled?: Bindable<boolean>;
}

export interface LinkPreloadAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel: Bindable<"preload" | "modulepreload">;
    /** Potential destination for a preload request. */
    as: Bindable<LinkAs>;
    /** Media query for the resource. */
    media?: Bindable<string>;
    /** Source set for responsive images. */
    imageSrcset?: Bindable<string>;
    /** Sizes for responsive images. */
    imageSizes?: Bindable<string>;
    sizes?: never;
}

export interface LinkStylesheetAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel: Bindable<"stylesheet">;
    imageSrcset?: never;
    imageSizes?: never;
    sizes?: never;
    as?: never;
    /** Media query for the resource. */
    media?: Bindable<string>;
}

export interface LinkIconAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel: Bindable<"icon" | "apple-touch-icon">;
    /** Sizes for icons. */
    sizes?: Bindable<string>;
    imageSrcset?: never;
    imageSizes?: never;
    as?: never;
    media?: Bindable<string>;
}

export interface LinkOtherAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel?: Bindable<LinkRel>;
    sizes?: never;
    imageSrcset?: never;
    imageSizes?: never;
    as?: never;
    media?: Bindable<string>;
}

/**
 * Attributes for link elements (discriminated union).
 */
export type LinkAttrs = StrictUnion<LinkPreloadAttrs | LinkStylesheetAttrs | LinkIconAttrs | LinkOtherAttrs>;

/**
 * Attributes for the base element (document base URL).
 */
export interface BaseElemAttrs extends GlobalAttributes {
    /** Base URL for relative URLs in the document. */
    href?: Bindable<string>;
    /** Default browsing context for navigations from the document. */
    target?: Bindable<Target>;
}

/**
 * Base attributes for meta elements.
 */
export interface BaseMetaAttrs extends GlobalAttributes {
    /** Metadata content. */
    content: Bindable<string>;
}

export interface MetaNameAttrs extends BaseMetaAttrs {
    /** Name of the metadata. */
    name: Bindable<string>;
    httpEquiv?: never;
    charset?: never;
}

export interface MetaHttpEquivAttrs extends BaseMetaAttrs {
    name?: never;
    /** Pragma directive. */
    httpEquiv: Bindable<HttpEquiv>;
    charset?: never;
}

export interface MetaCharsetAttrs extends GlobalAttributes {
    /** Character encoding. */
    charset: Bindable<"utf-8">;
    name?: never;
    httpEquiv?: never;
    content?: never;
}

/**
 * Attributes for meta elements (discriminated union).
 */
export type MetaAttrs = StrictUnion<MetaNameAttrs | MetaHttpEquivAttrs | MetaCharsetAttrs>;

/**
 * Base attributes for script elements.
 */
export interface BaseScriptAttrs extends GlobalAttributes {
    /** URL of the script. */
    src?: Bindable<string>;
    /** Type of the script. */
    type?: Bindable<string>;
    /** Whether to execute asynchronously. */
    async?: Bindable<boolean>;
    /** Whether to defer execution. */
    defer?: Bindable<boolean>;
    /** CORS settings. */
    crossOrigin?: Bindable<CrossOrigin>;
    /** Integrity metadata. */
    integrity?: Bindable<string>;
    /** Referrer policy for fetches. */
    referrerPolicy?: Bindable<ReferrerPolicy>;
    /** Whether the element is blocking. */
    blocking?: Bindable<"render">;
    /** Fetch priority hint. */
    fetchPriority?: Bindable<FetchPriority>;
    /** Whether to execute without blocking parser. */
    noModule?: Bindable<boolean>;
}

export interface ScriptClassicAttrs extends BaseScriptAttrs {
    /** Type of the script. */
    type?: Bindable<"text/javascript" | "application/javascript">;
}

export interface ScriptModuleAttrs extends BaseScriptAttrs {
    /** Type of the script. */
    type: Bindable<"module">;
}

export interface ScriptImportMapAttrs extends BaseScriptAttrs {
    /** Type of the script. */
    type: Bindable<"importmap">;
    src?: never;
    async?: never;
    defer?: never;
}

/**
 * Attributes for script elements (discriminated union).
 */
export type ScriptAttrs = StrictUnion<ScriptClassicAttrs | ScriptModuleAttrs | ScriptImportMapAttrs>;

/**
 * Attributes for style elements.
 */
export interface StyleAttrs extends GlobalAttributes {
    /** Media query for the style. */
    media?: Bindable<string>;
    /** Whether the style is blocking. */
    blocking?: Bindable<"render">;
}

// =============================================================================
// WEB COMPONENTS
// =============================================================================

/**
 * Attributes for slot elements.
 */
export interface SlotAttrs extends GlobalAttributes {
    /** Name of the slot. */
    name?: Bindable<string>;
}

/**
 * Attributes for template elements.
 */
export interface TemplateAttrs extends GlobalAttributes {
    /** Shadow root mode. */
    shadowRootMode?: Bindable<"open" | "closed">;
    /** Whether shadow root delegates focus. */
    shadowRootDelegatesFocus?: Bindable<boolean>;
    /** Whether shadow root is clonable. */
    shadowRootClonable?: Bindable<boolean>;
    /** Whether shadow root is serializable. */
    shadowRootSerializable?: Bindable<boolean>;
}
