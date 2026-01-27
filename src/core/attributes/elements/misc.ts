import type { MaybeSignal } from "../../reactivity/reactivity.ts";
import type { GlobalAttributes } from "./common.ts";
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
    name?: MaybeSignal<string>;
}

/**
 * Base attributes for area elements.
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

export interface AreaDefaultAttrs extends BaseAreaAttrs {
    /** Shape of the area. */
    shape: MaybeSignal<"default">;
    coords?: never;
}

export interface AreaGeometricAttrs extends BaseAreaAttrs {
    /** Shape of the area. */
    shape?: MaybeSignal<"rect" | "circle" | "poly">;
    /** Coordinates for the shape. */
    coords: MaybeSignal<string>;
}

/**
 * Attributes for area elements (discriminated union).
 */
export type AreaAttrs = AreaDefaultAttrs | AreaGeometricAttrs;

// =============================================================================
// PROGRESS & METER
// =============================================================================

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

// =============================================================================
// SEMANTIC TEXT ELEMENTS
// =============================================================================

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

// =============================================================================
// INTERACTIVE ELEMENTS
// =============================================================================

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

// =============================================================================
// TABLE ELEMENTS
// =============================================================================

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

// =============================================================================
// QUOTE & MODIFICATION ELEMENTS
// =============================================================================

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

// =============================================================================
// LIST ELEMENTS
// =============================================================================

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

// =============================================================================
// DOCUMENT METADATA (link, meta, script, style)
// =============================================================================

/**
 * Base attributes for link elements.
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
    /** Potential destination for a preload request. */
    as: MaybeSignal<LinkAs>;
    /** Media query for the resource. */
    media?: MaybeSignal<string>;
    /** Source set for responsive images. */
    imageSrcset?: MaybeSignal<string>;
    /** Sizes for responsive images. */
    imageSizes?: MaybeSignal<string>;
    sizes?: never;
}

export interface LinkStylesheetAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel: MaybeSignal<"stylesheet">;
    imageSrcset?: never;
    imageSizes?: never;
    sizes?: never;
    as?: never;
    /** Media query for the resource. */
    media?: MaybeSignal<string>;
}

export interface LinkIconAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel: MaybeSignal<"icon" | "apple-touch-icon">;
    /** Sizes for icons. */
    sizes?: MaybeSignal<string>;
    imageSrcset?: never;
    imageSizes?: never;
    as?: never;
    media?: MaybeSignal<string>;
}

export interface LinkOtherAttrs extends BaseLinkAttrs {
    /** Relationship to the linked resource. */
    rel?: MaybeSignal<LinkRel>;
    sizes?: never;
    imageSrcset?: never;
    imageSizes?: never;
    as?: never;
    media?: MaybeSignal<string>;
}

/**
 * Attributes for link elements (discriminated union).
 */
export type LinkAttrs = LinkPreloadAttrs | LinkStylesheetAttrs | LinkIconAttrs | LinkOtherAttrs;

/**
 * Base attributes for meta elements.
 */
export interface BaseMetaAttrs extends GlobalAttributes {
    /** Metadata content. */
    content: MaybeSignal<string>;
}

export interface MetaNameAttrs extends BaseMetaAttrs {
    /** Name of the metadata. */
    name: MaybeSignal<string>;
    httpEquiv?: never;
    charset?: never;
}

export interface MetaHttpEquivAttrs extends BaseMetaAttrs {
    name?: never;
    /** Pragma directive. */
    httpEquiv: MaybeSignal<HttpEquiv>;
    charset?: never;
}

export interface MetaCharsetAttrs extends GlobalAttributes {
    /** Character encoding. */
    charset: MaybeSignal<"utf-8">;
    name?: never;
    httpEquiv?: never;
    content?: never;
}

/**
 * Attributes for meta elements (discriminated union).
 */
export type MetaAttrs = MetaNameAttrs | MetaHttpEquivAttrs | MetaCharsetAttrs;

/**
 * Base attributes for script elements.
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

export interface ScriptClassicAttrs extends BaseScriptAttrs {
    /** Type of the script. */
    type?: MaybeSignal<"text/javascript" | "application/javascript">;
}

export interface ScriptModuleAttrs extends BaseScriptAttrs {
    /** Type of the script. */
    type: MaybeSignal<"module">;
}

export interface ScriptImportMapAttrs extends BaseScriptAttrs {
    /** Type of the script. */
    type: MaybeSignal<"importmap">;
    src?: never;
    async?: never;
    defer?: never;
}

/**
 * Attributes for script elements (discriminated union).
 */
export type ScriptAttrs = ScriptClassicAttrs | ScriptModuleAttrs | ScriptImportMapAttrs;

/**
 * Attributes for style elements.
 */
export interface StyleAttrs extends GlobalAttributes {
    /** Media query for the style. */
    media?: MaybeSignal<string>;
    /** Whether the style is blocking. */
    blocking?: MaybeSignal<"render">;
}

// =============================================================================
// WEB COMPONENTS
// =============================================================================

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
