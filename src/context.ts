/**
 * Flick Context System
 *
 * Manages the parent element stack for automatic child mounting.
 * Elements created inside a parent's callback are automatically appended.
 */

/** Stack of parent elements for context-based mounting */
const contextStack: HTMLElement[] = [];

/**
 * Push an element onto the context stack
 * @internal
 */
export function pushContext(element: HTMLElement): void {
  contextStack.push(element);
}

/**
 * Pop an element from the context stack
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
export function getCurrentContext(): HTMLElement {
  return contextStack[contextStack.length - 1] ?? document.body;
}

/**
 * Check if we're inside a context (not at root level)
 * @internal
 */
export function hasContext(): boolean {
  return contextStack.length > 0;
}
