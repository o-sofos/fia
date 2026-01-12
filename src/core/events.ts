
/**
 * Strict Event Types for Flick
 *
 * Provides type-narrowed event handlers for better DX.
 */


// Actually MaybeSignal is in elements.ts.
// To avoid cycles, we might need to be careful.
// But types usually don't cause runtime cycles.

export type EventHandler<E extends Event, T extends EventTarget> =
    | ((this: T, event: Omit<E, "currentTarget"> & { currentTarget: T }) => void)
    | ((this: T, event: Omit<E, "currentTarget"> & { currentTarget: T }) => Promise<void>);

export interface TypedEvent<D = any> extends Event {
    detail: D;
}

export interface StrictClipboardEvent extends ClipboardEvent {
    clipboardData: DataTransfer;
}

export interface StrictDragEvent extends DragEvent {
    dataTransfer: DataTransfer;
}

export type ClipboardEventHandler<T extends EventTarget> = EventHandler<StrictClipboardEvent, T>;
export type CompositionEventHandler<T extends EventTarget> = EventHandler<CompositionEvent, T>;
export type DragEventHandler<T extends EventTarget> = EventHandler<StrictDragEvent, T>;

export type FocusEventHandler<T extends EventTarget> = EventHandler<FocusEvent, T>;
export type FormEventHandler<T extends EventTarget> = EventHandler<Event, T>;
export type KeyboardEventHandler<T extends EventTarget> = EventHandler<KeyboardEvent, T>;
export type MouseEventHandler<T extends EventTarget> = EventHandler<MouseEvent, T>;
export type TouchEventHandler<T extends EventTarget> = EventHandler<TouchEvent, T>;
export type PointerEventHandler<T extends EventTarget> = EventHandler<PointerEvent, T>;
export type UIEventHandler<T extends EventTarget> = EventHandler<UIEvent, T>;
export type WheelEventHandler<T extends EventTarget> = EventHandler<WheelEvent, T>;
export type AnimationEventHandler<T extends EventTarget> = EventHandler<AnimationEvent, T>;
export type TransitionEventHandler<T extends EventTarget> = EventHandler<TransitionEvent, T>;

// =============================================================================
// CLIPBOARD EVENTS
// =============================================================================

export interface ClipboardEventHandlers<T extends EventTarget> {
    /** Fires when the user copies the content of an element or text selection. */
    onCopy?: ClipboardEventHandler<T>;
    /** Fires when the user cuts the content of an element or text selection. */
    onCut?: ClipboardEventHandler<T>;
    /** Fires when the user pastes some content in an element or text selection. */
    onPaste?: ClipboardEventHandler<T>;
}

// =============================================================================
// COMPOSITION EVENTS
// =============================================================================

export interface CompositionEventHandlers<T extends EventTarget> {
    /** Fires when a text composition system such as an IME starts a new composition session. */
    onCompositionStart?: CompositionEventHandler<T>;
    /** Fires when a new character is received in the context of a text composition session. */
    onCompositionUpdate?: CompositionEventHandler<T>;
    /** Fires when a text composition system such as an IME completes or cancels the current composition session. */
    onCompositionEnd?: CompositionEventHandler<T>;
}

// =============================================================================
// FOCUS EVENTS
// =============================================================================

export interface FocusEventHandlers<T extends EventTarget> {
    /** Fires when the element receives focus. */
    onFocus?: FocusEventHandler<T>;
    /** Fires when the element loses focus. */
    onBlur?: FocusEventHandler<T>;
    /** Fires when the element is about to receive focus. */
    onFocusIn?: FocusEventHandler<T>;
    /** Fires when the element is about to lose focus. */
    onFocusOut?: FocusEventHandler<T>;
}

// =============================================================================
// FORM EVENTS
// =============================================================================

export interface FormEventHandlers<T extends EventTarget> {
    /** Fires when the value of an element has been changed. */
    onChange?: FormEventHandler<T>;
    /** Fires when the value of an element has been changed. */
    onInput?: FormEventHandler<T>;
    /** Fires when a form is reset. */
    onReset?: FormEventHandler<T>;
    /** Fires when a form is submitted. */
    onSubmit?: FormEventHandler<T>;
    /** Fires when an element is invalid. */
    onInvalid?: FormEventHandler<T>;
    /** Fires before the value of an element is changed. */
    onBeforeInput?: EventHandler<InputEvent, T>;
    /** Fires when the user initiates a search. */
    onSearch?: FormEventHandler<T>;
    /** Fires when a FormData object is constructed. */
    onFormData?: EventHandler<FormDataEvent, T>;
}

// =============================================================================
// KEYBOARD EVENTS
// =============================================================================

export interface KeyboardEventHandlers<T extends EventTarget> {
    /** Fires when a key is pressed. */
    onKeyDown?: KeyboardEventHandler<T>;
    /** Fires when a key is pressed. */
    onKeyPress?: KeyboardEventHandler<T>;
    /** Fires when a key is released. */
    onKeyUp?: KeyboardEventHandler<T>;
}

// =============================================================================
// MOUSE EVENTS
// =============================================================================

export interface MouseEventHandlers<T extends EventTarget> {
    /** Fires when the user clicks on an element. */
    onClick?: MouseEventHandler<T>;
    /** Fires when the user right-clicks on an element. */
    onContextMenu?: MouseEventHandler<T>;
    /** Fires when the user double-clicks on an element. */
    onDoubleClick?: MouseEventHandler<T>;
    /** Fires when a mouse button is pressed on an element. */
    onMouseDown?: MouseEventHandler<T>;
    /** Fires when the mouse pointer enters an element. */
    onMouseEnter?: MouseEventHandler<T>;
    /** Fires when the mouse pointer leaves an element. */
    onMouseLeave?: MouseEventHandler<T>;
    /** Fires when the mouse pointer is moving over an element. */
    onMouseMove?: MouseEventHandler<T>;
    /** Fires when the mouse pointer moves out of an element. */
    onMouseOut?: MouseEventHandler<T>;
    /** Fires when the mouse pointer moves onto an element. */
    onMouseOver?: MouseEventHandler<T>;
    /** Fires when a mouse button is released over an element. */
    onMouseUp?: MouseEventHandler<T>;
    /** Fires when a non-primary mouse button has been pressed and released. */
    onAuxClick?: MouseEventHandler<T>;
}

// =============================================================================
// DRAG & DROP EVENTS
// =============================================================================

export interface DragEventHandlers<T extends EventTarget> {
    /** Fires when an element or text selection is being dragged. */
    onDrag?: DragEventHandler<T>;
    /** Fires when a drag operation is being ended (by releasing a mouse button or the escape key). */
    onDragEnd?: DragEventHandler<T>;
    /** Fires when a dragged element or text selection enters a valid drop target. */
    onDragEnter?: DragEventHandler<T>;
    /** Fires when a dragged element or text selection leaves a valid drop target. */
    onDragLeave?: DragEventHandler<T>;
    /** Fires when an element or text selection is being dragged over a valid drop target. */
    onDragOver?: DragEventHandler<T>;
    /** Fires when the user starts dragging an element or text selection. */
    onDragStart?: DragEventHandler<T>;
    /** Fires when an element or text selection is dropped on a valid drop target. */
    onDrop?: DragEventHandler<T>;
}

// =============================================================================
// TOUCH EVENTS
// =============================================================================

export interface TouchEventHandlers<T extends EventTarget> {
    onTouchCancel?: TouchEventHandler<T>;
    onTouchEnd?: TouchEventHandler<T>;
    onTouchMove?: TouchEventHandler<T>;
    onTouchStart?: TouchEventHandler<T>;
}

// =============================================================================
// POINTER EVENTS
// =============================================================================

export interface PointerEventHandlers<T extends EventTarget> {
    onPointerDown?: PointerEventHandler<T>;
    onPointerMove?: PointerEventHandler<T>;
    onPointerUp?: PointerEventHandler<T>;
    onPointerCancel?: PointerEventHandler<T>;
    onPointerEnter?: PointerEventHandler<T>;
    onPointerLeave?: PointerEventHandler<T>;
    onPointerOver?: PointerEventHandler<T>;
    onPointerOut?: PointerEventHandler<T>;
    onGotPointerCapture?: PointerEventHandler<T>;
    onLostPointerCapture?: PointerEventHandler<T>;
}

// =============================================================================
// UI EVENTS
// =============================================================================

export interface UIEventHandlers<T extends EventTarget> {
    /** Fires when an element's scrollbar is being scrolled. */
    onScroll?: UIEventHandler<T>;
    /** Fires when scrolling has completed. */
    onScrollEnd?: EventHandler<Event, T>;
    /** Fires when the element has been resized. */
    onResize?: UIEventHandler<T>;
    /** Fires when the mouse wheel rolls up or down over an element. */
    onWheel?: WheelEventHandler<T>;
}

// =============================================================================
// MEDIA EVENTS
// =============================================================================

export interface MediaEventHandlers<T extends EventTarget> {
    onAbort?: EventHandler<Event, T>;
    onCanPlay?: EventHandler<Event, T>;
    onCanPlayThrough?: EventHandler<Event, T>;
    onCueChange?: EventHandler<Event, T>; // Added
    onDurationChange?: EventHandler<Event, T>;
    onEmptied?: EventHandler<Event, T>;
    onEncrypted?: EventHandler<Event, T>;
    onEnded?: EventHandler<Event, T>;
    onLoadedData?: EventHandler<Event, T>;
    onLoadedMetadata?: EventHandler<Event, T>;
    onLoadStart?: EventHandler<Event, T>;
    onPause?: EventHandler<Event, T>;
    onPlay?: EventHandler<Event, T>;
    onPlaying?: EventHandler<Event, T>;
    onProgress?: EventHandler<Event, T>;
    onRateChange?: EventHandler<Event, T>;
    onSeeked?: EventHandler<Event, T>;
    onSeeking?: EventHandler<Event, T>;
    onStalled?: EventHandler<Event, T>;
    onSuspend?: EventHandler<Event, T>;
    onTimeUpdate?: EventHandler<Event, T>;
    onVolumeChange?: EventHandler<Event, T>;
    onWaiting?: EventHandler<Event, T>;
}

// =============================================================================
// ANIMATION & TRANSITION EVENTS
// =============================================================================

export interface AnimationEventHandlers<T extends EventTarget> {
    onAnimationStart?: AnimationEventHandler<T>;
    onAnimationEnd?: AnimationEventHandler<T>;
    onAnimationIteration?: AnimationEventHandler<T>;
    onTransitionEnd?: TransitionEventHandler<T>;
    onTransitionStart?: TransitionEventHandler<T>;
    onTransitionCancel?: TransitionEventHandler<T>;
    onTransitionRun?: TransitionEventHandler<T>;
}

// =============================================================================
// GENERIC EVENTS
// =============================================================================

export interface GenericEventHandlers<T extends EventTarget> {
    onLoad?: EventHandler<Event, T>;
    onError?: EventHandler<Event, T>;
    onSelect?: EventHandler<Event, T>;
    onToggle?: EventHandler<Event, T>;
    onCancel?: EventHandler<Event, T>;
    onClose?: EventHandler<Event, T>;
    onSecurityPolicyViolation?: EventHandler<SecurityPolicyViolationEvent, T>;
    onSelectionChange?: EventHandler<Event, T>;
    onSelectStart?: EventHandler<Event, T>;
    onSlotChange?: EventHandler<Event, T>;
}

// =============================================================================
// ALL DOM EVENTS
// =============================================================================

export type DomEvents<T extends EventTarget> =
    & ClipboardEventHandlers<T>
    & CompositionEventHandlers<T>
    & FocusEventHandlers<T>
    & FormEventHandlers<T>
    & KeyboardEventHandlers<T>
    & MouseEventHandlers<T>
    & DragEventHandlers<T>
    & TouchEventHandlers<T>
    & PointerEventHandlers<T>
    & UIEventHandlers<T>
    & MediaEventHandlers<T>
    & AnimationEventHandlers<T>
    & GenericEventHandlers<T>;
