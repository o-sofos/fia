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
 * Event type with properly typed currentTarget.
 * This ensures event handlers know exactly which element type they're on.
 *
 * @example
 * button({
 *   onclick: (e) => {
 *     e.currentTarget.disabled = true;  // Works! currentTarget is HTMLButtonElement
 *   }
 * });
 */
type TypedEvent<E extends Element, Ev extends Event> = Ev & {
  readonly currentTarget: E;
};

/**
 * Precise event handler types with exact event types AND element-typed currentTarget.
 *
 * Benefits:
 * - onClick receives MouseEvent with clientX, clientY, etc.
 * - onKeydown receives KeyboardEvent with key, code, etc.
 * - onInput receives InputEvent with data, inputType, etc.
 * - e.currentTarget is typed to the specific element (no casting needed!)
 */
type PreciseEventHandlers<E extends Element> = {
  // Mouse events
  onclick?: (event: TypedEvent<E, MouseEvent>) => void;
  oncontextmenu?: (event: TypedEvent<E, MouseEvent>) => void;
  ondblclick?: (event: TypedEvent<E, MouseEvent>) => void;
  onmousedown?: (event: TypedEvent<E, MouseEvent>) => void;
  onmouseenter?: (event: TypedEvent<E, MouseEvent>) => void;
  onmouseleave?: (event: TypedEvent<E, MouseEvent>) => void;
  onmousemove?: (event: TypedEvent<E, MouseEvent>) => void;
  onmouseout?: (event: TypedEvent<E, MouseEvent>) => void;
  onmouseover?: (event: TypedEvent<E, MouseEvent>) => void;
  onmouseup?: (event: TypedEvent<E, MouseEvent>) => void;

  // Keyboard events
  onkeydown?: (event: TypedEvent<E, KeyboardEvent>) => void;
  onkeypress?: (event: TypedEvent<E, KeyboardEvent>) => void;
  onkeyup?: (event: TypedEvent<E, KeyboardEvent>) => void;

  // Focus events
  onblur?: (event: TypedEvent<E, FocusEvent>) => void;
  onfocus?: (event: TypedEvent<E, FocusEvent>) => void;
  onfocusin?: (event: TypedEvent<E, FocusEvent>) => void;
  onfocusout?: (event: TypedEvent<E, FocusEvent>) => void;

  // Form events
  onchange?: (event: TypedEvent<E, Event>) => void;
  oninput?: (event: TypedEvent<E, InputEvent>) => void;
  oninvalid?: (event: TypedEvent<E, Event>) => void;
  onreset?: (event: TypedEvent<E, Event>) => void;
  onsubmit?: (event: TypedEvent<E, SubmitEvent>) => void;

  // Drag events
  ondrag?: (event: TypedEvent<E, DragEvent>) => void;
  ondragend?: (event: TypedEvent<E, DragEvent>) => void;
  ondragenter?: (event: TypedEvent<E, DragEvent>) => void;
  ondragleave?: (event: TypedEvent<E, DragEvent>) => void;
  ondragover?: (event: TypedEvent<E, DragEvent>) => void;
  ondragstart?: (event: TypedEvent<E, DragEvent>) => void;
  ondrop?: (event: TypedEvent<E, DragEvent>) => void;

  // Touch events
  ontouchcancel?: (event: TypedEvent<E, TouchEvent>) => void;
  ontouchend?: (event: TypedEvent<E, TouchEvent>) => void;
  ontouchmove?: (event: TypedEvent<E, TouchEvent>) => void;
  ontouchstart?: (event: TypedEvent<E, TouchEvent>) => void;

  // Pointer events
  onpointercancel?: (event: TypedEvent<E, PointerEvent>) => void;
  onpointerdown?: (event: TypedEvent<E, PointerEvent>) => void;
  onpointerenter?: (event: TypedEvent<E, PointerEvent>) => void;
  onpointerleave?: (event: TypedEvent<E, PointerEvent>) => void;
  onpointermove?: (event: TypedEvent<E, PointerEvent>) => void;
  onpointerout?: (event: TypedEvent<E, PointerEvent>) => void;
  onpointerover?: (event: TypedEvent<E, PointerEvent>) => void;
  onpointerup?: (event: TypedEvent<E, PointerEvent>) => void;

  // Wheel events
  onwheel?: (event: TypedEvent<E, WheelEvent>) => void;

  // Clipboard events
  oncopy?: (event: TypedEvent<E, ClipboardEvent>) => void;
  oncut?: (event: TypedEvent<E, ClipboardEvent>) => void;
  onpaste?: (event: TypedEvent<E, ClipboardEvent>) => void;

  // Animation events
  onanimationcancel?: (event: TypedEvent<E, AnimationEvent>) => void;
  onanimationend?: (event: TypedEvent<E, AnimationEvent>) => void;
  onanimationiteration?: (event: TypedEvent<E, AnimationEvent>) => void;
  onanimationstart?: (event: TypedEvent<E, AnimationEvent>) => void;

  // Transition events
  ontransitioncancel?: (event: TypedEvent<E, TransitionEvent>) => void;
  ontransitionend?: (event: TypedEvent<E, TransitionEvent>) => void;
  ontransitionrun?: (event: TypedEvent<E, TransitionEvent>) => void;
  ontransitionstart?: (event: TypedEvent<E, TransitionEvent>) => void;

  // Selection events
  onselect?: (event: TypedEvent<E, Event>) => void;
  onselectionchange?: (event: TypedEvent<E, Event>) => void;
  onselectstart?: (event: TypedEvent<E, Event>) => void;

  // Composition events (IME)
  oncompositionend?: (event: TypedEvent<E, CompositionEvent>) => void;
  oncompositionstart?: (event: TypedEvent<E, CompositionEvent>) => void;
  oncompositionupdate?: (event: TypedEvent<E, CompositionEvent>) => void;

  // Media events
  onabort?: (event: TypedEvent<E, Event>) => void;
  oncanplay?: (event: TypedEvent<E, Event>) => void;
  oncanplaythrough?: (event: TypedEvent<E, Event>) => void;
  ondurationchange?: (event: TypedEvent<E, Event>) => void;
  onemptied?: (event: TypedEvent<E, Event>) => void;
  onended?: (event: TypedEvent<E, Event>) => void;
  onerror?: (event: TypedEvent<E, ErrorEvent>) => void;
  onloadeddata?: (event: TypedEvent<E, Event>) => void;
  onloadedmetadata?: (event: TypedEvent<E, Event>) => void;
  onloadstart?: (event: TypedEvent<E, Event>) => void;
  onpause?: (event: TypedEvent<E, Event>) => void;
  onplay?: (event: TypedEvent<E, Event>) => void;
  onplaying?: (event: TypedEvent<E, Event>) => void;
  onprogress?: (event: TypedEvent<E, ProgressEvent>) => void;
  onratechange?: (event: TypedEvent<E, Event>) => void;
  onseeked?: (event: TypedEvent<E, Event>) => void;
  onseeking?: (event: TypedEvent<E, Event>) => void;
  onstalled?: (event: TypedEvent<E, Event>) => void;
  onsuspend?: (event: TypedEvent<E, Event>) => void;
  ontimeupdate?: (event: TypedEvent<E, Event>) => void;
  onvolumechange?: (event: TypedEvent<E, Event>) => void;
  onwaiting?: (event: TypedEvent<E, Event>) => void;

  // Loading events
  onload?: (event: TypedEvent<E, Event>) => void;
  onloadend?: (event: TypedEvent<E, ProgressEvent>) => void;

  // Scroll events
  onscroll?: (event: TypedEvent<E, Event>) => void;
  onscrollend?: (event: TypedEvent<E, Event>) => void;

  // Resize events
  onresize?: (event: TypedEvent<E, UIEvent>) => void;

  // Toggle events
  ontoggle?: (event: TypedEvent<E, Event>) => void;
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
