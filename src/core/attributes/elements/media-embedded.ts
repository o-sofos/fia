
import type { Bindable } from "../../reactivity/reactivity.ts";
import type { GlobalAttributes, StrictUnion } from "./common.ts";
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
    href?: Bindable<string>;
    /** Browsing context for the linked resource. */
    target?: Bindable<Target>;
    /** Relationship to the linked resource. */
    rel?: Bindable<AnchorRel>;
    /** Prompts the user to download the linked resource. */
    download?: Bindable<string | boolean>;
    /** Language of the linked resource. */
    hreflang?: Bindable<string>;
    /** Media type of the linked resource. */
    type?: Bindable<string>;
    /** Referrer policy for fetches initiated by the element. */
    referrerPolicy?: Bindable<ReferrerPolicy>;
    /** URLs to ping for tracking. */
    ping?: Bindable<string>;
    /** Experimental attribution source. */
    attributionSrc?: Bindable<string>;
}

// =============================================================================
// MEDIA ELEMENTS
// =============================================================================

/**
 * Attributes for image elements.
 */
export interface ImgAttrs extends GlobalAttributes {
    /** Source URL of the image. */
    src?: Bindable<string>;
    /** Alternate text for the image. */
    alt?: Bindable<string>;
    /** Intrinsic width of the image. */
    width?: Bindable<number | string>;
    /** Intrinsic height of the image. */
    height?: Bindable<number | string>;
    /** How the browser should load the image. */
    loading?: Bindable<Loading>;
    /** Image decoding hint. */
    decoding?: Bindable<Decoding>;
    /** CORS settings for the image. */
    crossOrigin?: Bindable<CrossOrigin>;
    /** Set of source URLs for responsive display. */
    srcset?: Bindable<string>;
    /** Media conditions for selecting a source. */
    sizes?: Bindable<string>;
    /** Name of an image map to use. */
    useMap?: Bindable<string>;
    /** Whether the image is a server-side image map. */
    isMap?: Bindable<boolean>;
    /** Referrer policy for fetches. */
    referrerPolicy?: Bindable<ReferrerPolicy>;
    /** Fetch priority hint. */
    fetchPriority?: Bindable<FetchPriority>;
    /** Experimental element timing. */
    elementTiming?: Bindable<string>;
    /** Experimental attribution source. */
    attributionSrc?: Bindable<string>;
}

/**
 * Attributes for video elements.
 */
export interface VideoAttrs extends GlobalAttributes {
    /** Source URL of the video. */
    src?: Bindable<string>;
    /** Display width of the video. */
    width?: Bindable<number | string>;
    /** Display height of the video. */
    height?: Bindable<number | string>;
    /** URL of an image to show while downloading. */
    poster?: Bindable<string>;
    /** Hint for how much of the video to preload. */
    preload?: Bindable<Preload>;
    /** Whether to play automatically. */
    autoplay?: Bindable<boolean>;
    /** Whether to loop the video. */
    loop?: Bindable<boolean>;
    /** Whether to mute the audio. */
    muted?: Bindable<boolean>;
    /** Whether to show playback controls. */
    controls?: Bindable<boolean>;
    /** Whether to play inline on mobile. */
    playsInline?: Bindable<boolean>;
    /** CORS settings for valid requests. */
    crossOrigin?: Bindable<CrossOrigin>;
    /** Initial playback position. */
    currentTime?: Bindable<number>;
    /** Audio volume (0.0 to 1.0). */
    volume?: Bindable<number>;
    /** Prevents Picture-in-Picture mode. */
    disablePictureInPicture?: Bindable<boolean>;
    /** Prevents remote playback (casting). */
    disableRemotePlayback?: Bindable<boolean>;
    /** Controls to display/hide. */
    controlsList?: Bindable<ControlsList>;
}

/**
 * Attributes for audio elements.
 */
export interface AudioAttrs extends GlobalAttributes {
    /** Source URL of the audio. */
    src?: Bindable<string>;
    /** Hint for how much of the audio to preload. */
    preload?: Bindable<Preload>;
    /** Whether to play automatically. */
    autoplay?: Bindable<boolean>;
    /** Whether to loop the audio. */
    loop?: Bindable<boolean>;
    /** Whether to mute the audio. */
    muted?: Bindable<boolean>;
    /** Whether to show playback controls. */
    controls?: Bindable<boolean>;
    /** CORS settings. */
    crossOrigin?: Bindable<CrossOrigin>;
    /** Initial playback position. */
    currentTime?: Bindable<number>;
    /** Audio volume (0.0 to 1.0). */
    volume?: Bindable<number>;
    /** Prevents remote playback. */
    disableRemotePlayback?: Bindable<boolean>;
    /** Controls to display/hide. */
    controlsList?: Bindable<ControlsList>;
}

/**
 * Base attributes for source elements.
 */
export interface BaseSourceAttrs extends GlobalAttributes {
    /** MIME type of the resource. */
    type?: Bindable<string>;
    /** Width of the image resource. */
    width?: Bindable<number>;
    /** Height of the image resource. */
    height?: Bindable<number>;
}

export interface SourceMediaAttrs extends BaseSourceAttrs {
    /** Address of the media resource. */
    src: Bindable<string>;
    srcset?: never;
    sizes?: never;
    media?: never;
}

export interface SourceImageAttrs extends BaseSourceAttrs {
    src?: never;
    /** Source set for responsive images. */
    srcset: Bindable<string>;
    /** Media conditions for image sources. */
    sizes?: Bindable<string>;
    /** Media query for the resource. */
    media?: Bindable<string>;
}

/**
 * Attributes for source elements (discriminated union).
 */
export type SourceAttrs = StrictUnion<SourceMediaAttrs | SourceImageAttrs>;

/**
 * Base attributes for track elements.
 */
export interface BaseTrackAttrs extends GlobalAttributes {
    /** Address of the track. */
    src?: Bindable<string>;
    /** User-readable title of the track. */
    label?: Bindable<string>;
    /** Whether to enable the track by default. */
    default?: Bindable<boolean>;
}

export interface TrackSubtitlesAttrs extends BaseTrackAttrs {
    /** Kind of text track. */
    kind: Bindable<"subtitles">;
    /** Language of the track text. */
    srclang: Bindable<string>;
}

export interface TrackOtherAttrs extends BaseTrackAttrs {
    /** Kind of text track. */
    kind?: Bindable<"captions" | "descriptions" | "chapters" | "metadata">;
    /** Language of the track text. */
    srclang?: Bindable<string>;
}

/**
 * Attributes for track elements (discriminated union).
 */
export type TrackAttrs = StrictUnion<TrackSubtitlesAttrs | TrackOtherAttrs>;

/**
 * Attributes for canvas elements.
 */
export interface CanvasAttrs extends GlobalAttributes {
    /** Coordinate space width. */
    width?: Bindable<number>;
    /** Coordinate space height. */
    height?: Bindable<number>;
}

// =============================================================================
// EMBEDDED CONTENT
// =============================================================================

/**
 * Attributes for iframe elements.
 */
export interface IframeAttrs extends GlobalAttributes {
    /** Address of the resource. */
    src?: Bindable<string>;
    /** HTML content of the page to show. */
    srcdoc?: Bindable<string>;
    /** Name of the browsing context. */
    name?: Bindable<string>;
    /** Width of the frame. */
    width?: Bindable<number | string>;
    /** Height of the frame. */
    height?: Bindable<number | string>;
    /** How the browser should load the iframe. */
    loading?: Bindable<Loading>;
    /** Security rules for nested content. */
    sandbox?: Bindable<Sandbox>;
    /** Feature policy to apply. */
    allow?: Bindable<string>;
    /** Referrer policy for fetches. */
    referrerPolicy?: Bindable<ReferrerPolicy>;
    /** Whether to allow fullscreen mode. */
    allowFullscreen?: Bindable<boolean>;
    /** Whether to load without specific credentials. */
    credentialless?: Bindable<boolean>;
    /** Content Security Policy to apply. */
    csp?: Bindable<string>;
}

/**
 * Attributes for embed elements.
 */
export interface EmbedAttrs extends GlobalAttributes {
    /** Address of the resource. */
    src?: Bindable<string>;
    /** MIME type of the resource. */
    type?: Bindable<string>;
    /** Display width. */
    width?: Bindable<number | string>;
    /** Display height. */
    height?: Bindable<number | string>;
}

/**
 * Attributes for object elements.
 */
export interface ObjectAttrs extends GlobalAttributes {
    /** Address of the resource. */
    data?: Bindable<string>;
    /** MIME type of the resource. */
    type?: Bindable<string>;
    /** Name of the browsing context. */
    name?: Bindable<string>;
    /** Display width. */
    width?: Bindable<number | string>;
    /** Display height. */
    height?: Bindable<number | string>;
    /** ID of the form the element belongs to. */
    form?: Bindable<string>;
    /** Name of image map to use. */
    useMap?: Bindable<string>;
}
