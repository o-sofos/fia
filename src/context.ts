/**
 * Flick Context System
 *
 * Manages the parent element stack for automatic child mounting.
 * Elements created inside a parent's callback are automatically appended.
 */

/**
 * Interface for any object that can act as a parent context.
 * Usually an HTMLElement, but can be a proxy for reactive blocks.
 */
export interface Context {
  appendChild(node: Node): Node;
}

/** Stack of parent elements/contexts */
const contextStack: Context[] = [];

/**
 * Push a context onto the stack
 * @internal
 */
export function pushContext(context: Context): void {
  contextStack.push(context);
}

/**
 * Pop the top context
 * @internal
 */
export function popContext(): void {
  contextStack.pop();
}

/**
 * Get the current parent context
 * Returns document.body if no context is set
 * @internal
 */
export function getCurrentContext(): Context {
  return contextStack[contextStack.length - 1] ?? document.body;
}

/**
 * Check if we're inside a context (not at root level)
 * @internal
 */
export function hasContext(): boolean {
  return contextStack.length > 0;
}
