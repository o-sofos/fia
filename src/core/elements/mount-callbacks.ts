/**
 * Scheduling for the `onMount` helper passed to children callbacks.
 */

import { getOwner, onCleanup, runWithOwner, untrack } from "../reactivity/reactivity";

/** A mount callback may return a cleanup, run when the element's scope is torn down. */
export type MountCallback = () => void | (() => void);

/**
 * Run `callbacks` once the element is in the document: on the microtask
 * after the synchronous render (the usual case: the tree was attached in the
 * same task), or on the next frame if it wasn't connected yet.
 *
 * Callbacks run in the scope that created the element, so effects they
 * create and cleanups they return are disposed with it. If that scope is
 * disposed first (the element was removed), they never run.
 */
export function scheduleMount(element: Element, callbacks: MountCallback[]): void {
    const owner = getOwner();
    let cancelled = false;
    if (owner) onCleanup(() => (cancelled = true));

    const run = (): void => {
        if (cancelled) return;
        cancelled = true; // run at most once
        const go = (): void => {
            for (const cb of callbacks) {
                const cleanup = cb();
                if (typeof cleanup === "function") onCleanup(cleanup);
            }
        };
        if (owner) runWithOwner(owner, () => untrack(go));
        else untrack(go);
    };

    queueMicrotask(() => {
        if (cancelled) return;
        if (element.isConnected) run();
        else requestAnimationFrame(run);
    });
}
