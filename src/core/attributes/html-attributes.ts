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

// =============================================================================
// PRECISE EVENT HANDLER TYPES
// =============================================================================

/**
 * Precise event handler types with exact event types for better IntelliSense.
 * Instead of generic Event types, each handler receives its specific event type.
 *
 * Benefits:
 * - onClick receives MouseEvent with clientX, clientY, etc.
 * - onKeydown receives KeyboardEvent with key, code, etc.
 * - onInput receives InputEvent with data, inputType, etc.
 * - Much better autocomplete and type safety than generic Event
 */
type PreciseEventHandlers<E extends Element> = {
  // Mouse events
  onclick?: (event: MouseEvent) => void;
  oncontextmenu?: (event: MouseEvent) => void;
  ondblclick?: (event: MouseEvent) => void;
  onmousedown?: (event: MouseEvent) => void;
  onmouseenter?: (event: MouseEvent) => void;
  onmouseleave?: (event: MouseEvent) => void;
  onmousemove?: (event: MouseEvent) => void;
  onmouseout?: (event: MouseEvent) => void;
  onmouseover?: (event: MouseEvent) => void;
  onmouseup?: (event: MouseEvent) => void;

  // Keyboard events
  onkeydown?: (event: KeyboardEvent) => void;
  onkeypress?: (event: KeyboardEvent) => void;
  onkeyup?: (event: KeyboardEvent) => void;

  // Focus events
  onblur?: (event: FocusEvent) => void;
  onfocus?: (event: FocusEvent) => void;
  onfocusin?: (event: FocusEvent) => void;
  onfocusout?: (event: FocusEvent) => void;

  // Form events
  onchange?: (event: Event) => void;
  oninput?: (event: InputEvent) => void;
  oninvalid?: (event: Event) => void;
  onreset?: (event: Event) => void;
  onsubmit?: (event: SubmitEvent) => void;

  // Drag events
  ondrag?: (event: DragEvent) => void;
  ondragend?: (event: DragEvent) => void;
  ondragenter?: (event: DragEvent) => void;
  ondragleave?: (event: DragEvent) => void;
  ondragover?: (event: DragEvent) => void;
  ondragstart?: (event: DragEvent) => void;
  ondrop?: (event: DragEvent) => void;

  // Touch events
  ontouchcancel?: (event: TouchEvent) => void;
  ontouchend?: (event: TouchEvent) => void;
  ontouchmove?: (event: TouchEvent) => void;
  ontouchstart?: (event: TouchEvent) => void;

  // Pointer events
  onpointercancel?: (event: PointerEvent) => void;
  onpointerdown?: (event: PointerEvent) => void;
  onpointerenter?: (event: PointerEvent) => void;
  onpointerleave?: (event: PointerEvent) => void;
  onpointermove?: (event: PointerEvent) => void;
  onpointerout?: (event: PointerEvent) => void;
  onpointerover?: (event: PointerEvent) => void;
  onpointerup?: (event: PointerEvent) => void;

  // Wheel events
  onwheel?: (event: WheelEvent) => void;

  // Clipboard events
  oncopy?: (event: ClipboardEvent) => void;
  oncut?: (event: ClipboardEvent) => void;
  onpaste?: (event: ClipboardEvent) => void;

  // Animation events
  onanimationcancel?: (event: AnimationEvent) => void;
  onanimationend?: (event: AnimationEvent) => void;
  onanimationiteration?: (event: AnimationEvent) => void;
  onanimationstart?: (event: AnimationEvent) => void;

  // Transition events
  ontransitioncancel?: (event: TransitionEvent) => void;
  ontransitionend?: (event: TransitionEvent) => void;
  ontransitionrun?: (event: TransitionEvent) => void;
  ontransitionstart?: (event: TransitionEvent) => void;

  // Selection events
  onselect?: (event: Event) => void;
  onselectionchange?: (event: Event) => void;
  onselectstart?: (event: Event) => void;

  // Composition events (IME)
  oncompositionend?: (event: CompositionEvent) => void;
  oncompositionstart?: (event: CompositionEvent) => void;
  oncompositionupdate?: (event: CompositionEvent) => void;

  // Media events
  onabort?: (event: Event) => void;
  oncanplay?: (event: Event) => void;
  oncanplaythrough?: (event: Event) => void;
  ondurationchange?: (event: Event) => void;
  onemptied?: (event: Event) => void;
  onended?: (event: Event) => void;
  onerror?: (event: ErrorEvent) => void;
  onloadeddata?: (event: Event) => void;
  onloadedmetadata?: (event: Event) => void;
  onloadstart?: (event: Event) => void;
  onpause?: (event: Event) => void;
  onplay?: (event: Event) => void;
  onplaying?: (event: Event) => void;
  onprogress?: (event: ProgressEvent) => void;
  onratechange?: (event: Event) => void;
  onseeked?: (event: Event) => void;
  onseeking?: (event: Event) => void;
  onstalled?: (event: Event) => void;
  onsuspend?: (event: Event) => void;
  ontimeupdate?: (event: Event) => void;
  onvolumechange?: (event: Event) => void;
  onwaiting?: (event: Event) => void;

  // Loading events
  onload?: (event: Event) => void;
  onloadend?: (event: ProgressEvent) => void;

  // Scroll events
  onscroll?: (event: Event) => void;
  onscrollend?: (event: Event) => void;

  // Resize events
  onresize?: (event: UIEvent) => void;

  // Toggle events
  ontoggle?: (event: Event) => void;
};

/**
 * Alias for backward compatibility
 * @deprecated Use PreciseEventHandlers for better type inference
 */
type EventHandlers<E extends Element> = PreciseEventHandlers<E>;

/**
 * Union of all attributes and event handlers for a given element.
 */
export type ElementProps<K extends keyof HTMLElementTagNameMap> =
    & (K extends keyof ElementPropsMap ? ElementPropsMap[K] : GlobalAttributes)
    & EventHandlers<HTMLElementTagNameMap[K]>
    & DataAttributes
    & AriaAttributes;
