import { controlsList } from "happy-dom/lib/PropertySymbol";
import type { MaybeSignal } from "../../reactivity/reactivity.ts";
import type { GlobalAttributes } from "./common.ts";
import type {
    Target,
    AnchorRel,
    ReferrerPolicy,
    Loading,
    Decoding,
    CrossOrigin,
    FetchPriority,
    Preload,
    ControlsList,
    Sandbox
} from "./enums.ts";

// =============================================================================
// LINKS & NAVIGATION
// =============================================================================

/**
 * Attributes for anchor elements.
 */
export interface AnchorAttrs extends GlobalAttributes {
    /** URL of the linked resource. */
    href?: MaybeSignal<string>;
    /** Browsing context for the linked resource. */
    target?: MaybeSignal<Target>;
    /** Relationship to the linked resource. */
    rel?: MaybeSignal<AnchorRel>;
    /** Prompts the user to download the linked resource. */
    download?: MaybeSignal<string | boolean>;
    /** Language of the linked resource. */
    hreflang?: MaybeSignal<string>;
    /** Media type of the linked resource. */
    type?: MaybeSignal<string>;
    /** Referrer policy for fetches initiated by the element. */
    referrerPolicy?: MaybeSignal<ReferrerPolicy>;
    /** URLs to ping for tracking. */
    ping?: MaybeSignal<string>;
    /** Experimental attribution source. */
    attributionSrc?: MaybeSignal<string>;
}

// =============================================================================
// MEDIA ELEMENTS
// =============================================================================

/**
 * Attributes for image elements.
 */
export interface ImgAttrs extends GlobalAttributes {
    /** Source URL of the image. */
    src?: MaybeSignal<string>;
    /** Alternate text for the image. */
    alt?: MaybeSignal<string>;
    /** Intrinsic width of the image. */
    width?: MaybeSignal<number | string>;
    /** Intrinsic height of the image. */
    height?: MaybeSignal<number | string>;
    /** How the browser should load the image. */
    loading?: MaybeSignal<Loading>;
    /** Image decoding hint. */
    decoding?: MaybeSignal<Decoding>;
    /** CORS settings for the image. */
    crossOrigin?: MaybeSignal<CrossOrigin>;
    /** Set of source URLs for responsive display. */
    srcset?: MaybeSignal<string>;
    /** Media conditions for selecting a source. */
    sizes?: MaybeSignal<string>;
    /** Name of an image map to use. */
    useMap?: MaybeSignal<string>;
    /** Whether the image is a server-side image map. */
    isMap?: MaybeSignal<boolean>;
    /** Referrer policy for fetches. */
    referrerPolicy?: MaybeSignal<ReferrerPolicy>;
    /** Fetch priority hint. */
    fetchPriority?: MaybeSignal<FetchPriority>;
    /** Experimental element timing. */
    elementTiming?: MaybeSignal<string>;
    /** Experimental attribution source. */
    attributionSrc?: MaybeSignal<string>;
}

/**
 * Attributes for video elements.
 */
export interface VideoAttrs extends GlobalAttributes {
    /** Source URL of the video. */
    src?: MaybeSignal<string>;
    /** Display width of the video. */
    width?: MaybeSignal<number | string>;
    /** Display height of the video. */
    height?: MaybeSignal<number | string>;
    /** URL of an image to show while downloading. */
    poster?: MaybeSignal<string>;
    /** Hint for how much of the video to preload. */
    preload?: MaybeSignal<Preload>;
    /** Whether to play automatically. */
    autoplay?: MaybeSignal<boolean>;
    /** Whether to loop the video. */
    loop?: MaybeSignal<boolean>;
    /** Whether to mute the audio. */
    muted?: MaybeSignal<boolean>;
    /** Whether to show playback controls. */
    controls?: MaybeSignal<boolean>;
    /** Whether to play inline on mobile. */
    playsInline?: MaybeSignal<boolean>;
    /** CORS settings for valid requests. */
    crossOrigin?: MaybeSignal<CrossOrigin>;
    /** Initial playback position. */
    currentTime?: MaybeSignal<number>;
    /** Audio volume (0.0 to 1.0). */
    volume?: MaybeSignal<number>;
    /** Prevents Picture-in-Picture mode. */
    disablePictureInPicture?: MaybeSignal<boolean>;
    /** Prevents remote playback (casting). */
    disableRemotePlayback?: MaybeSignal<boolean>;
    /** Controls to display/hide. */
    controlsList?: MaybeSignal<ControlsList>;
}

/**
 * Attributes for audio elements.
 */
export interface AudioAttrs extends GlobalAttributes {
    /** Source URL of the audio. */
    src?: MaybeSignal<string>;
    /** Hint for how much of the audio to preload. */
    preload?: MaybeSignal<Preload>;
    /** Whether to play automatically. */
    autoplay?: MaybeSignal<boolean>;
    /** Whether to loop the audio. */
    loop?: MaybeSignal<boolean>;
    /** Whether to mute the audio. */
    muted?: MaybeSignal<boolean>;
    /** Whether to show playback controls. */
    controls?: MaybeSignal<boolean>;
    /** CORS settings. */
    crossOrigin?: MaybeSignal<CrossOrigin>;
    /** Initial playback position. */
    currentTime?: MaybeSignal<number>;
    /** Audio volume (0.0 to 1.0). */
    volume?: MaybeSignal<number>;
    /** Prevents remote playback. */
    disableRemotePlayback?: MaybeSignal<boolean>;
    /** Controls to display/hide. */
    controlsList?: MaybeSignal<ControlsList>;
}

/**
 * Base attributes for source elements.
 */
export interface BaseSourceAttrs extends GlobalAttributes {
    /** MIME type of the resource. */
    type?: MaybeSignal<string>;
    /** Width of the image resource. */
    width?: MaybeSignal<number>;
    /** Height of the image resource. */
    height?: MaybeSignal<number>;
}

export interface SourceMediaAttrs extends BaseSourceAttrs {
    /** Address of the media resource. */
    src: MaybeSignal<string>;
    srcset?: never;
    sizes?: never;
    media?: never;
}

export interface SourceImageAttrs extends BaseSourceAttrs {
    src?: never;
    /** Source set for responsive images. */
    srcset: MaybeSignal<string>;
    /** Media conditions for image sources. */
    sizes?: MaybeSignal<string>;
    /** Media query for the resource. */
    media?: MaybeSignal<string>;
}

/**
 * Attributes for source elements (discriminated union).
 */
export type SourceAttrs = SourceMediaAttrs | SourceImageAttrs;

/**
 * Base attributes for track elements.
 */
export interface BaseTrackAttrs extends GlobalAttributes {
    /** Address of the track. */
    src?: MaybeSignal<string>;
    /** User-readable title of the track. */
    label?: MaybeSignal<string>;
    /** Whether to enable the track by default. */
    default?: MaybeSignal<boolean>;
}

export interface TrackSubtitlesAttrs extends BaseTrackAttrs {
    /** Kind of text track. */
    kind: MaybeSignal<"subtitles">;
    /** Language of the track text. */
    srclang: MaybeSignal<string>;
}

export interface TrackOtherAttrs extends BaseTrackAttrs {
    /** Kind of text track. */
    kind?: MaybeSignal<"captions" | "descriptions" | "chapters" | "metadata">;
    /** Language of the track text. */
    srclang?: MaybeSignal<string>;
}

/**
 * Attributes for track elements (discriminated union).
 */
export type TrackAttrs = TrackSubtitlesAttrs | TrackOtherAttrs;

/**
 * Attributes for canvas elements.
 */
export interface CanvasAttrs extends GlobalAttributes {
    /** Coordinate space width. */
    width?: MaybeSignal<number>;
    /** Coordinate space height. */
    height?: MaybeSignal<number>;
}

// =============================================================================
// EMBEDDED CONTENT
// =============================================================================

/**
 * Attributes for iframe elements.
 */
export interface IframeAttrs extends GlobalAttributes {
    /** Address of the resource. */
    src?: MaybeSignal<string>;
    /** HTML content of the page to show. */
    srcdoc?: MaybeSignal<string>;
    /** Name of the browsing context. */
    name?: MaybeSignal<string>;
    /** Width of the frame. */
    width?: MaybeSignal<number | string>;
    /** Height of the frame. */
    height?: MaybeSignal<number | string>;
    /** How the browser should load the iframe. */
    loading?: MaybeSignal<Loading>;
    /** Security rules for nested content. */
    sandbox?: MaybeSignal<Sandbox>;
    /** Feature policy to apply. */
    allow?: MaybeSignal<string>;
    /** Referrer policy for fetches. */
    referrerPolicy?: MaybeSignal<ReferrerPolicy>;
    /** Whether to allow fullscreen mode. */
    allowFullscreen?: MaybeSignal<boolean>;
    /** Whether to load without specific credentials. */
    credentialless?: MaybeSignal<boolean>;
    /** Content Security Policy to apply. */
    csp?: MaybeSignal<string>;
}

/**
 * Attributes for embed elements.
 */
export interface EmbedAttrs extends GlobalAttributes {
    /** Address of the resource. */
    src?: MaybeSignal<string>;
    /** MIME type of the resource. */
    type?: MaybeSignal<string>;
    /** Display width. */
    width?: MaybeSignal<number | string>;
    /** Display height. */
    height?: MaybeSignal<number | string>;
}

/**
 * Attributes for object elements.
 */
export interface ObjectAttrs extends GlobalAttributes {
    /** Address of the resource. */
    data?: MaybeSignal<string>;
    /** MIME type of the resource. */
    type?: MaybeSignal<string>;
    /** Name of the browsing context. */
    name?: MaybeSignal<string>;
    /** Display width. */
    width?: MaybeSignal<number | string>;
    /** Display height. */
    height?: MaybeSignal<number | string>;
    /** ID of the form the element belongs to. */
    form?: MaybeSignal<string>;
    /** Name of image map to use. */
    useMap?: MaybeSignal<string>;
}
