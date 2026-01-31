/**
 * Flick Branded CSS Value Types
 *
 * Type-safe CSS value construction using branded types to prevent unit confusion.
 * These types provide compile-time safety for CSS values with units, preventing
 * common bugs like mixing pixels and percentages.
 *
 * @example
 * // Type-safe CSS values
 * div({
 *   style: {
 *     width: toPx(px(300)),      // "300px"
 *     height: toPct(pct(50)),    // "50%"
 *     rotate: toDeg(deg(45)),    // "45deg"
 *   }
 * });
 *
 * @example
 * // Prevents unit confusion at compile time
 * const width = px(300);
 * const height = pct(50);
 * // Cannot mix: width + height would be a type error
 */

// =============================================================================
// BRAND INFRASTRUCTURE
// =============================================================================

/**
 * Internal brand symbol for nominal typing.
 * This creates a unique symbol that TypeScript uses to distinguish branded types.
 */
declare const brand: unique symbol;

/**
 * Brand a type T with a unique identifier B.
 * This creates nominal types that prevent accidental mixing.
 *
 * @template T - The base type (usually number)
 * @template B - The brand identifier (string literal)
 */
type Brand<T, B> = T & { readonly [brand]: B };

// =============================================================================
// CSS LENGTH UNITS
// =============================================================================

/**
 * Pixels - Absolute length unit.
 * @example const width = px(300);
 */
export type Pixels = Brand<number, "px">;

/**
 * Percentage - Relative length unit.
 * @example const height = pct(50);
 */
export type Percentage = Brand<number, "%">;

/**
 * Ems - Relative to font-size of the element.
 * @example const padding = em(1.5);
 */
export type Ems = Brand<number, "em">;

/**
 * Rems - Relative to font-size of the root element.
 * @example const fontSize = rem(1.2);
 */
export type Rems = Brand<number, "rem">;

/**
 * Viewport width - 1% of viewport width.
 * @example const width = vw(50);
 */
export type ViewportWidth = Brand<number, "vw">;

/**
 * Viewport height - 1% of viewport height.
 * @example const height = vh(100);
 */
export type ViewportHeight = Brand<number, "vh">;

/**
 * Viewport minimum - Smaller of vw or vh.
 * @example const size = vmin(10);
 */
export type ViewportMin = Brand<number, "vmin">;

/**
 * Viewport maximum - Larger of vw or vh.
 * @example const size = vmax(10);
 */
export type ViewportMax = Brand<number, "vmax">;

// =============================================================================
// CSS ANGLE UNITS
// =============================================================================

/**
 * Degrees - Angle unit (0-360).
 * @example const rotation = deg(45);
 */
export type Degrees = Brand<number, "deg">;

/**
 * Radians - Angle unit (0-2π).
 * @example const rotation = rad(Math.PI / 4);
 */
export type Radians = Brand<number, "rad">;

/**
 * Gradians - Angle unit (0-400).
 * @example const rotation = grad(50);
 */
export type Gradians = Brand<number, "grad">;

/**
 * Turns - Angle unit (0-1 = full rotation).
 * @example const rotation = turn(0.5); // 180 degrees
 */
export type Turns = Brand<number, "turn">;

// =============================================================================
// CSS TIME UNITS
// =============================================================================

/**
 * Seconds - Time unit for animations and transitions.
 * @example const duration = sec(0.3);
 */
export type Seconds = Brand<number, "s">;

/**
 * Milliseconds - Time unit for animations and transitions.
 * @example const duration = ms(300);
 */
export type Milliseconds = Brand<number, "ms">;

// =============================================================================
// CONSTRUCTOR FUNCTIONS
// =============================================================================

/**
 * Create a pixel value.
 * @param value - The numeric value
 * @returns Branded Pixels type
 */
export const px = (value: number): Pixels => value as Pixels;

/**
 * Create a percentage value.
 * @param value - The numeric value (e.g., 50 for 50%)
 * @returns Branded Percentage type
 */
export const pct = (value: number): Percentage => value as Percentage;

/**
 * Create an em value.
 * @param value - The numeric value
 * @returns Branded Ems type
 */
export const em = (value: number): Ems => value as Ems;

/**
 * Create a rem value.
 * @param value - The numeric value
 * @returns Branded Rems type
 */
export const rem = (value: number): Rems => value as Rems;

/**
 * Create a viewport width value.
 * @param value - The numeric value (e.g., 50 for 50vw)
 * @returns Branded ViewportWidth type
 */
export const vw = (value: number): ViewportWidth => value as ViewportWidth;

/**
 * Create a viewport height value.
 * @param value - The numeric value (e.g., 100 for 100vh)
 * @returns Branded ViewportHeight type
 */
export const vh = (value: number): ViewportHeight => value as ViewportHeight;

/**
 * Create a viewport minimum value.
 * @param value - The numeric value
 * @returns Branded ViewportMin type
 */
export const vmin = (value: number): ViewportMin => value as ViewportMin;

/**
 * Create a viewport maximum value.
 * @param value - The numeric value
 * @returns Branded ViewportMax type
 */
export const vmax = (value: number): ViewportMax => value as ViewportMax;

/**
 * Create a degree value.
 * @param value - The numeric value (0-360)
 * @returns Branded Degrees type
 */
export const deg = (value: number): Degrees => value as Degrees;

/**
 * Create a radian value.
 * @param value - The numeric value (0-2π)
 * @returns Branded Radians type
 */
export const rad = (value: number): Radians => value as Radians;

/**
 * Create a gradian value.
 * @param value - The numeric value (0-400)
 * @returns Branded Gradians type
 */
export const grad = (value: number): Gradians => value as Gradians;

/**
 * Create a turn value.
 * @param value - The numeric value (0-1 for full rotation)
 * @returns Branded Turns type
 */
export const turn = (value: number): Turns => value as Turns;

/**
 * Create a seconds value.
 * @param value - The numeric value in seconds
 * @returns Branded Seconds type
 */
export const sec = (value: number): Seconds => value as Seconds;

/**
 * Create a milliseconds value.
 * @param value - The numeric value in milliseconds
 * @returns Branded Milliseconds type
 */
export const ms = (value: number): Milliseconds => value as Milliseconds;

// =============================================================================
// CONVERTER FUNCTIONS (TO CSS STRINGS)
// =============================================================================

/**
 * Convert Pixels to CSS string.
 * @param value - Branded Pixels value
 * @returns CSS string (e.g., "300px")
 */
export const toPx = (value: Pixels): string => `${value}px`;

/**
 * Convert Percentage to CSS string.
 * @param value - Branded Percentage value
 * @returns CSS string (e.g., "50%")
 */
export const toPct = (value: Percentage): string => `${value}%`;

/**
 * Convert Ems to CSS string.
 * @param value - Branded Ems value
 * @returns CSS string (e.g., "1.5em")
 */
export const toEm = (value: Ems): string => `${value}em`;

/**
 * Convert Rems to CSS string.
 * @param value - Branded Rems value
 * @returns CSS string (e.g., "1.2rem")
 */
export const toRem = (value: Rems): string => `${value}rem`;

/**
 * Convert ViewportWidth to CSS string.
 * @param value - Branded ViewportWidth value
 * @returns CSS string (e.g., "50vw")
 */
export const toVw = (value: ViewportWidth): string => `${value}vw`;

/**
 * Convert ViewportHeight to CSS string.
 * @param value - Branded ViewportHeight value
 * @returns CSS string (e.g., "100vh")
 */
export const toVh = (value: ViewportHeight): string => `${value}vh`;

/**
 * Convert ViewportMin to CSS string.
 * @param value - Branded ViewportMin value
 * @returns CSS string (e.g., "10vmin")
 */
export const toVmin = (value: ViewportMin): string => `${value}vmin`;

/**
 * Convert ViewportMax to CSS string.
 * @param value - Branded ViewportMax value
 * @returns CSS string (e.g., "10vmax")
 */
export const toVmax = (value: ViewportMax): string => `${value}vmax`;

/**
 * Convert Degrees to CSS string.
 * @param value - Branded Degrees value
 * @returns CSS string (e.g., "45deg")
 */
export const toDeg = (value: Degrees): string => `${value}deg`;

/**
 * Convert Radians to CSS string.
 * @param value - Branded Radians value
 * @returns CSS string (e.g., "1.5708rad")
 */
export const toRad = (value: Radians): string => `${value}rad`;

/**
 * Convert Gradians to CSS string.
 * @param value - Branded Gradians value
 * @returns CSS string (e.g., "50grad")
 */
export const toGrad = (value: Gradians): string => `${value}grad`;

/**
 * Convert Turns to CSS string.
 * @param value - Branded Turns value
 * @returns CSS string (e.g., "0.5turn")
 */
export const toTurn = (value: Turns): string => `${value}turn`;

/**
 * Convert Seconds to CSS string.
 * @param value - Branded Seconds value
 * @returns CSS string (e.g., "0.3s")
 */
export const toSec = (value: Seconds): string => `${value}s`;

/**
 * Convert Milliseconds to CSS string.
 * @param value - Branded Milliseconds value
 * @returns CSS string (e.g., "300ms")
 */
export const toMs = (value: Milliseconds): string => `${value}ms`;

// =============================================================================
// UNIT CONVERSION UTILITIES
// =============================================================================

/**
 * Convert degrees to radians.
 * @param degrees - Degrees value
 * @returns Radians value
 */
export const degToRad = (degrees: Degrees): Radians =>
  rad((degrees * Math.PI) / 180);

/**
 * Convert radians to degrees.
 * @param radians - Radians value
 * @returns Degrees value
 */
export const radToDeg = (radians: Radians): Degrees =>
  deg((radians * 180) / Math.PI);

/**
 * Convert seconds to milliseconds.
 * @param seconds - Seconds value
 * @returns Milliseconds value
 */
export const secToMs = (seconds: Seconds): Milliseconds =>
  ms(seconds * 1000);

/**
 * Convert milliseconds to seconds.
 * @param milliseconds - Milliseconds value
 * @returns Seconds value
 */
export const msToSec = (milliseconds: Milliseconds): Seconds =>
  sec(milliseconds / 1000);

// =============================================================================
// UNION TYPES FOR FLEXIBILITY
// =============================================================================

/**
 * Any CSS length value (branded or string escape hatch).
 * Use this for props that accept multiple length types.
 */
export type CSSLength =
  | Pixels
  | Percentage
  | Ems
  | Rems
  | ViewportWidth
  | ViewportHeight
  | ViewportMin
  | ViewportMax
  | string;

/**
 * Any CSS angle value (branded or string escape hatch).
 * Use this for rotation, skew, and other angle props.
 */
export type CSSAngle = Degrees | Radians | Gradians | Turns | string;

/**
 * Any CSS time value (branded or string escape hatch).
 * Use this for animation and transition durations.
 */
export type CSSTime = Seconds | Milliseconds | string;
