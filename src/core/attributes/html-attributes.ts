/**
 * HTML Attributes - Modular Type Definitions
 * 
 * This file aggregates all HTML attribute type definitions from modular files.
 */

// =============================================================================
// RE-EXPORTS FROM MODULES
// =============================================================================

// Common attributes and enums
export type {
    GlobalAttributes,
    DataAttributes,
    AriaAttributes
} from "./elements/common.ts";

export type {
    InputMode,
    AutoCapitalize,
    EnterKeyHint,
    FormMethod,
    FormEnctype,
    CrossOrigin,
    Decoding,
    Loading,
    FetchPriority,
    Preload,
    ReferrerPolicy,
    Target,
    Dir,
    Wrap,
    ThScope,
    Autocomplete,
    LinkAs,
    HttpEquiv,
    LinkRel,
    AnchorRel,
    ControlsList,
    Sandbox
} from "./elements/enums.ts";

// Form elements
export type {
    BaseInputAttrs,
    InputTextAttrs,
    InputEmailAttrs,
    InputNumberAttrs,
    InputRangeAttrs,
    InputDateAttrs,
    InputCheckboxAttrs,
    InputFileAttrs,
    InputColorAttrs,
    InputHiddenAttrs,
    InputButtonAttrs,
    InputImageAttrs,
    InputAttrs,
    TextAreaAttrs,
    SelectAttrs,
    OptionAttrs,
    OptgroupAttrs,
    BaseButtonAttrs,
    ButtonSubmitAttrs,
    ButtonRestAttrs,
    ButtonAttrs,
    BaseFormAttrs,
    FormPostAttrs,
    FormGetAttrs,
    FormAttrs,
    LabelAttrs,
    FieldsetAttrs,
    OutputAttrs
} from "./elements/form.ts";

// Media and embedded content
export type {
    AnchorAttrs,
    ImgAttrs,
    VideoAttrs,
    AudioAttrs,
    BaseSourceAttrs,
    SourceMediaAttrs,
    SourceImageAttrs,
    SourceAttrs,
    BaseTrackAttrs,
    TrackSubtitlesAttrs,
    TrackOtherAttrs,
    TrackAttrs,
    CanvasAttrs,
    IframeAttrs,
    EmbedAttrs,
    ObjectAttrs
} from "./elements/media-embedded.ts";

// Miscellaneous elements
export type {
    MapAttrs,
    BaseAreaAttrs,
    AreaDefaultAttrs,
    AreaGeometricAttrs,
    AreaAttrs,
    ProgressAttrs,
    MeterAttrs,
    TimeAttrs,
    DataElemAttrs,
    DialogAttrs,
    DetailsAttrs,
    TableCellAttrs,
    ThAttrs,
    ColAttrs,
    ColgroupAttrs,
    BlockquoteAttrs,
    QAttrs,
    ModAttrs,
    OlAttrs,
    LiAttrs,
    BaseLinkAttrs,
    LinkPreloadAttrs,
    LinkStylesheetAttrs,
    LinkIconAttrs,
    LinkOtherAttrs,
    LinkAttrs,
    BaseMetaAttrs,
    MetaNameAttrs,
    MetaHttpEquivAttrs,
    MetaCharsetAttrs,
    MetaAttrs,
    BaseScriptAttrs,
    ScriptClassicAttrs,
    ScriptModuleAttrs,
    ScriptImportMapAttrs,
    ScriptAttrs,
    StyleAttrs,
    SlotAttrs,
    TemplateAttrs
} from "./elements/misc.ts";

// Import for use in ElementPropsMap
import type { GlobalAttributes, DataAttributes, AriaAttributes } from "./elements/common.ts";
import type {
    AnchorAttrs,
    ImgAttrs,
    VideoAttrs,
    AudioAttrs,
    SourceAttrs,
    TrackAttrs,
    CanvasAttrs,
    IframeAttrs,
    EmbedAttrs,
    ObjectAttrs
} from "./elements/media-embedded.ts";
import type {
    BaseInputAttrs,
    InputAttrs,
    TextAreaAttrs,
    SelectAttrs,
    OptionAttrs,
    OptgroupAttrs,
    ButtonAttrs,
    FormAttrs,
    LabelAttrs,
    FieldsetAttrs,
    OutputAttrs
} from "./elements/form.ts";
import type {
    MapAttrs,
    AreaAttrs,
    ProgressAttrs,
    MeterAttrs,
    TimeAttrs,
    DataElemAttrs,
    DialogAttrs,
    DetailsAttrs,
    TableCellAttrs,
    ThAttrs,
    ColAttrs,
    ColgroupAttrs,
    BlockquoteAttrs,
    QAttrs,
    ModAttrs,
    OlAttrs,
    LiAttrs,
    LinkAttrs,
    MetaAttrs,
    ScriptAttrs,
    StyleAttrs,
    SlotAttrs,
    TemplateAttrs
} from "./elements/misc.ts";

// =============================================================================
// ELEMENT PROPS MAP
// =============================================================================

/**
 * Maps element tag names to their specific attributes interface.
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
    base: GlobalAttributes;
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

// Event handlers - mapped type for all on* event properties
type EventHandlers<E extends Element> = {
    [K in keyof GlobalEventHandlersEventMap as `on${K}`]?: (event: GlobalEventHandlersEventMap[K]) => void;
};

/**
 * Union of all attributes and event handlers for a given element.
 */
export type ElementProps<K extends keyof HTMLElementTagNameMap> =
    & (K extends keyof ElementPropsMap ? ElementPropsMap[K] : GlobalAttributes)
    & EventHandlers<HTMLElementTagNameMap[K]>
    & DataAttributes
    & AriaAttributes;
