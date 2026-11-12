/**
 * Leak detection for effects and computeds.
 *
 * While a tracker is active every effect/computed created is recorded with its
 * creation stack. After the code under test has been torn down, any recorded
 * node that still holds subscriptions is a leak: it will keep running (or keep
 * its sources' subscriber lists growing) for as long as those sources live.
 *
 * ```ts
 * const leaks = trackLeaks();
 * const view = render(() => App());
 * fire.click(view.get("button"));
 * view.dispose();
 * leaks.expectNone();
 * ```
 *
 * Create long-lived state (signals/stores) *before* calling `trackLeaks()`,
 * or create computeds inside the rendered tree — a root-level computed made
 * while tracking has no owner and is (correctly) reported.
 */

import { setDevHook, type DevHook } from "../core/reactivity/reactivity";

export interface LeakedNode {
    kind: "effect" | "computed";
    /** Remaining subscription count */
    deps: number;
    /** Creation stack, harness/runtime frames removed */
    stack: string;
}

export interface LeakTracker {
    /** Nodes created since tracking started that are still subscribed. */
    leaked(): LeakedNode[];
    /** Total nodes recorded. */
    readonly created: number;
    /** Stop recording (idempotent). Already-recorded nodes are kept. */
    stop(): void;
    /** Stop, then throw a descriptive error if anything leaked. */
    expectNone(): void;
}

const INTERNAL_FRAME = /\/src\/core\/reactivity\/|\/src\/testing\/(leaks|render|fuzz|fire|runtime|setup)\.ts|node:|bun:|native/;

function userStack(): string {
    const raw = new Error().stack ?? "";
    return raw
        .split("\n")
        .slice(1)
        .filter((line) => !INTERNAL_FRAME.test(line))
        .slice(0, 6)
        .map((l) => l.trim())
        .join("\n      ");
}

/**
 * Start recording reactive nodes. Trackers nest: an inner tracker forwards to
 * the outer one, so both see the nodes created while it's active.
 */
export function trackLeaks(options: { stacks?: boolean } = {}): LeakTracker {
    const captureStacks = options.stacks ?? true;
    const nodes: { kind: "effect" | "computed"; node: { readonly deps: readonly unknown[] }; stack: string }[] = [];
    let active = true;

    const hook: DevHook = (kind, node) => {
        nodes.push({ kind, node, stack: captureStacks ? userStack() : "" });
        prev?.(kind, node);
    };
    const prev = setDevHook(hook);

    const tracker: LeakTracker = {
        get created() {
            return nodes.length;
        },
        leaked() {
            return nodes
                .filter((n) => n.node.deps.length > 0)
                .map((n) => ({ kind: n.kind, deps: n.node.deps.length, stack: n.stack }));
        },
        stop() {
            if (!active) return;
            active = false;
            // Only unwind if we're still the innermost hook
            const current = setDevHook(prev);
            if (current !== hook) setDevHook(current);
        },
        expectNone() {
            tracker.stop();
            const leaked = tracker.leaked();
            if (leaked.length === 0) return;
            const detail = leaked
                .map((l, i) => `  ${i + 1}. ${l.kind} still subscribed to ${l.deps} source(s), created at\n      ${l.stack || "(no stack)"}`)
                .join("\n");
            throw new Error(
                `[fia harness] ${leaked.length} of ${nodes.length} reactive node(s) leaked after disposal:\n${detail}`,
            );
        },
    };
    return tracker;
}

/**
 * Run `fn` with leak tracking, then assert nothing leaked. `fn` must tear
 * down what it created (e.g. call `view.dispose()`).
 */
export function expectNoLeaks(fn: () => void): void {
    const tracker = trackLeaks();
    try {
        fn();
    } finally {
        tracker.stop();
    }
    tracker.expectNone();
}
