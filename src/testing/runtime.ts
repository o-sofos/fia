/**
 * Global-state reset and invariant checks shared by every test.
 *
 * Fia keeps a little module-level state (the execution-context stack and the
 * scheduler). A test that leaves it dirty silently breaks the next one, so the
 * preload resets it before each test and fails the test that dirtied it.
 */

import { hasExecutionContext, popExecutionContext } from "../core/context/context";
import { inspectRuntime } from "../core/reactivity/reactivity";

/** Drain the execution-context stack and empty the document. */
export function resetDom(): void {
    while (hasExecutionContext()) popExecutionContext();
    document.body.innerHTML = "";
    document.head.innerHTML = "";
}

/**
 * Throw if the runtime isn't idle: an unbalanced push/pop of the execution
 * context, an unclosed batch, queued effects, or a leaked tracking/owner
 * scope. Always leaves the context stack drained so one failure doesn't
 * cascade into the following tests.
 */
export function assertRuntimeIdle(): void {
    const problems: string[] = [];

    let depth = 0;
    while (hasExecutionContext()) {
        popExecutionContext();
        depth++;
    }
    if (depth > 0) problems.push(`execution-context stack left ${depth} deep (unbalanced push/pop)`);

    const rt = inspectRuntime();
    if (rt.batchDepth !== 0) problems.push(`batch depth is ${rt.batchDepth}`);
    if (rt.flushing) problems.push("scheduler is still flushing");
    if (rt.queued !== 0) problems.push(`${rt.queued} effect(s) still queued`);
    if (rt.tracking) problems.push("a tracking scope was not restored (activeSubscriber leaked)");
    if (rt.owned) problems.push("an owner scope was not restored (currentOwner leaked)");

    if (problems.length > 0) {
        throw new Error(`[fia harness] runtime not idle after test:\n  - ${problems.join("\n  - ")}`);
    }
}
