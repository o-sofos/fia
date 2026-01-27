/**
 * Common enum types used across HTML attributes
 */

export type InputMode = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

export type AutoCapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";

export type EnterKeyHint = "enter" | "done" | "go" | "next" | "previous" | "search" | "send";

export type FormMethod = "get" | "post" | "dialog";

export type FormEnctype = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";

export type CrossOrigin = "anonymous" | "use-credentials" | "";

export type Decoding = "sync" | "async" | "auto";

export type Loading = "eager" | "lazy";

export type FetchPriority = "high" | "low" | "auto";

export type Preload = "none" | "metadata" | "auto" | "";

export type ReferrerPolicy =
    | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin"
    | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url" | "";

export type Target = "_self" | "_blank" | "_parent" | "_top" | (string & {});

export type Dir = "ltr" | "rtl" | "auto";

export type Wrap = "soft" | "hard";

export type ThScope = "row" | "col" | "rowgroup" | "colgroup";

export type Autocomplete =
    | "off" | "on"
    // Name
    | "name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname"
    | "username" | "new-password" | "current-password" | "one-time-code" | "webauthn"
    | "organization-title" | "organization" | "street-address"
    // Address
    | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1"
    | "country" | "country-name" | "postal-code"
    // Payment
    | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type"
    | "transaction-currency" | "transaction-amount"
    // Contact
    | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "url" | "photo"
    | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-local-prefix" | "tel-local-suffix" | "tel-extension"
    | "email" | "impp"
    // Scoped (common)
    | "shipping street-address" | "billing street-address" | "shipping postal-code" | "billing postal-code"
    | (string & {});

export type LinkAs = "audio" | "document" | "embed" | "fetch" | "font" | "image" | "object" | "script" | "style" | "track" | "video" | "worker";

export type HttpEquiv = "content-type" | "default-style" | "refresh" | "x-ua-compatible" | "content-security-policy";

export type LinkRel =
    | "alternate" | "author" | "canonical" | "help" | "icon" | "license"
    | "manifest" | "modulepreload" | "next" | "pingback" | "preconnect"
    | "prefetch" | "preload" | "prerender" | "prev" | "search" | "stylesheet"
    | (string & {});

export type AnchorRel =
    | "alternate" | "author" | "bookmark" | "external" | "help" | "license"
    | "next" | "nofollow" | "noopener" | "noreferrer" | "opener" | "prev"
    | "search" | "tag"
    | (string & {});

export type ControlsList =
    | "nodownload" | "nofullscreen" | "noremoteplayback"
    | "nodownload nofullscreen" | "nodownload noremoteplayback"
    | "nofullscreen noremoteplayback" | "nodownload nofullscreen noremoteplayback"
    | (string & {});

export type Sandbox =
    | "allow-downloads" | "allow-forms" | "allow-modals" | "allow-orientation-lock"
    | "allow-pointer-lock" | "allow-popups" | "allow-popups-to-escape-sandbox"
    | "allow-presentation" | "allow-same-origin" | "allow-scripts"
    | "allow-top-navigation" | "allow-top-navigation-by-user-activation"
    | "allow-top-navigation-to-custom-protocols";
