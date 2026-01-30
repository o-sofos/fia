/**
 * Fia Context Execution System
 *
 * Manages the parent element stack for automatic child mounting.
 * Elements created inside a parent's callback are automatically appended.
 *
 * Stack based LIFO system
 */

/**
 * Interface for any object that can act as a parent context.
 * Usually an HTMLElement, but can be a proxy for reactive blocks.
 */
export interface ExecutionContext {
  appendChild(node: Node): Node;
}

/** Stack of parent elements/contexts */
const executionContextStack: ExecutionContext[] = [];

/**
 * Push an execution context onto the stack
 * @internal
 */
export function pushExecutionContext(context: ExecutionContext): void {
  executionContextStack.push(context);
}

/**
 * Pop the top execution context
 * @internal
 */
export function popExecutionContext(): void {
  executionContextStack.pop();
}

/**
 * Get the current execution context
 * Returns document.body if no context is set
 * @internal
 */
export function getCurrentExecutionContext(): ExecutionContext {
  return (
    executionContextStack[executionContextStack.length - 1] ?? document.body
  );
}

/**
 * Check if we're inside an execution context (not at root level)
 * @internal
 */
export function hasExecutionContext(): boolean {
  return executionContextStack.length > 0;
}
