/**
 * Property test: Each's keyed reconciliation against a plain array model.
 *
 * Random list edits (insert/remove/move/swap/reverse/shuffle/replace/clear/
 * filter/re-add/clone/relabel) are applied to a model and to the reactive
 * source, in three source modes. After every step:
 *
 * - DOM order and text match the model, with no stray nodes
 * - an item that stays in the list keeps its exact DOM node (no re-render)
 * - a new object (or a re-added one after removal) gets a fresh render
 * - per-item scopes: live renders == items in the list (removed items are
 *   disposed, nothing is rendered twice)
 * - fine-grained label updates patch text in place
 * - after disposing the view nothing stays subscribed (leak check)
 */

import { describe, test } from "bun:test";
import { $, batch, Mut, onCleanup, type WritableSignal } from "../reactivity/reactivity";
import { li, span, ul } from "../elements/elements";
import { Each, Show } from "./control";
import { checkProperty, render, shrinkArray, trackLeaks, type Rng } from "../../testing/mod";

type Mode = "signal" | "keyFn" | "store";

/** Positions are raw ints, normalised modulo length at apply time, so shrunk cases stay valid. */
type Op =
    | { t: "insert"; at: number }
    | { t: "remove"; at: number }
    | { t: "move"; from: number; to: number }
    | { t: "swap"; a: number; b: number }
    | { t: "reverse" }
    | { t: "shuffle"; seed: number }
    | { t: "replace"; count: number }
    | { t: "clear" }
    | { t: "filter"; mask: number }
    | { t: "readd"; which: number; at: number }
    | { t: "clone"; at: number }
    | { t: "relabel"; at: number }
    /** Flip a top-level Show inside every item (nested block extents) */
    | { t: "marks" };

interface Case {
    mode: Mode;
    initial: number;
    ops: Op[];
}

interface Item {
    id: number;
    label: WritableSignal<string>;
}

function genCase(r: Rng): Case {
    const pos = () => r.int(64);
    return {
        mode: r.pick(["signal", "keyFn", "store"] as const),
        initial: r.int(8),
        ops: Array.from({ length: r.range(1, 40) }, (): Op =>
            r.weighted<() => Op>([
                [5, () => ({ t: "insert", at: pos() })],
                [4, () => ({ t: "remove", at: pos() })],
                [3, () => ({ t: "move", from: pos(), to: pos() })],
                [2, () => ({ t: "swap", a: pos(), b: pos() })],
                [1, () => ({ t: "reverse" })],
                [1, () => ({ t: "shuffle", seed: r.int(1e6) })],
                [1, () => ({ t: "replace", count: r.int(6) })],
                [1, () => ({ t: "clear" })],
                [1, () => ({ t: "filter", mask: r.int(1 << 16) })],
                [2, () => ({ t: "readd", which: pos(), at: pos() })],
                [1, () => ({ t: "clone", at: pos() })],
                [2, () => ({ t: "relabel", at: pos() })],
                [2, () => ({ t: "marks" })],
            ])(),
        ),
    };
}

function check(c: Case): void {
    let nextId = 0;
    let nextLabel = 0;
    const make = (id = nextId++): Item => ({ id, label: $(Mut(`L${nextLabel++}`)) });

    let model: Item[] = Array.from({ length: c.initial }, () => make());
    const removed: Item[] = [];

    // Bookkeeping filled in by the render function
    const liveRenders = new Map<Item, number>();
    const nodeOf = new Map<Item, Element>();

    const marks = $(Mut(false));

    // Reactive source per mode
    const version = $(Mut(0));
    const store = $(Mut([...model]));
    const source = c.mode === "store"
        ? () => store as unknown as Item[]
        : () => {
            version.value;
            return model.slice();
        };

    /** Raw item behind a (possibly store-proxied) item */
    const raw = (item: Item): Item => ((item as unknown as { $raw?: Item }).$raw ?? item);

    const leaks = trackLeaks({ stacks: false });
    const view = render(() =>
        ul(() =>
            Each(
                source,
                (item) => {
                    const it = raw(item);
                    liveRenders.set(it, (liveRenders.get(it) ?? 0) + 1);
                    onCleanup(() => {
                        const n = (liveRenders.get(it) ?? 0) - 1;
                        if (n === 0) liveRenders.delete(it);
                        else liveRenders.set(it, n);
                    });
                    nodeOf.set(it, li(item.label));
                    // Top-level nested block: its nodes appear after render
                    Show(() => marks.value, () => span({ class: "mark", textContent: `#${it.id}` }));
                },
                c.mode === "keyFn" ? (item) => raw(item).id : undefined,
            ),
        ),
    );

    const commit = (next: Item[]) => {
        model = next;
        if (c.mode === "store") {
            batch(() => {
                (store as unknown as Item[]).splice(0, (store as unknown as Item[]).length, ...next);
            });
        } else {
            version.value++;
        }
    };

    const ul_ = view.get("ul");
    let prevNodes = new Map<Item, Element>();
    const verify = (where: string) => {
        const lis = Array.from(ul_.children).filter((el) => el.tagName === "LI");
        const expectedText = model.map((m) => m.label.peek());
        const actualText = lis.map((el) => el.textContent);
        if (JSON.stringify(actualText) !== JSON.stringify(expectedText)) {
            throw new Error(`${where}: DOM ${JSON.stringify(actualText)} != model ${JSON.stringify(expectedText)}`);
        }
        // Each's two markers plus two per item (its Show), nothing else
        const stray = Array.from(ul_.childNodes).filter((n) => n.nodeType !== 1 && n.nodeType !== 8);
        const comments = Array.from(ul_.childNodes).filter((n) => n.nodeType === 8);
        if (stray.length > 0 || comments.length !== 2 + 2 * model.length) {
            throw new Error(`${where}: stray nodes in list: ${ul_.innerHTML}`);
        }
        const markEls = ul_.querySelectorAll("span.mark");
        if (markEls.length !== (marks.peek() ? model.length : 0)) {
            throw new Error(`${where}: ${markEls.length} marks for ${model.length} items (marks ${marks.peek() ? "on" : "off"}): ${ul_.innerHTML}`);
        }
        if (marks.peek()) {
            for (let i = 0; i < model.length; i++) {
                // li, <!--Show-->, span.mark, <!--/Show-->
                const mark = lis[i].nextSibling?.nextSibling as Element | null;
                if (mark?.textContent !== `#${model[i].id}`) {
                    throw new Error(`${where}: item ${model[i].id}'s mark is "${mark?.textContent}" (nested Show didn't move with its item)`);
                }
            }
        }
        for (let i = 0; i < model.length; i++) {
            const item = model[i];
            if (nodeOf.get(item) !== lis[i]) throw new Error(`${where}: position ${i} isn't the node rendered for item ${item.id}`);
            const prev = prevNodes.get(item);
            if (prev && prev !== lis[i]) throw new Error(`${where}: item ${item.id} stayed in the list but was re-rendered`);
        }
        const inList = new Set(model);
        for (const [item, n] of liveRenders) {
            if (!inList.has(item)) throw new Error(`${where}: removed item ${item.id} still has ${n} live render scope(s)`);
            if (n !== 1) throw new Error(`${where}: item ${item.id} has ${n} live render scopes`);
        }
        if (liveRenders.size !== inList.size) throw new Error(`${where}: ${liveRenders.size} live scopes for ${inList.size} items`);
        prevNodes = new Map(model.map((m) => [m, lis[model.indexOf(m)]]));
    };

    verify("initial");

    for (let step = 0; step < c.ops.length; step++) {
        const op = c.ops[step];
        const where = `step ${step} (${op.t})`;
        const n = model.length;
        const next = model.slice();
        const drop = (items: Item[]) => {
            for (const it of items) {
                if (!next.includes(it)) removed.push(it);
                // A dropped item's node may be legitimately recreated if re-added later
                prevNodes.delete(it);
            }
        };

        switch (op.t) {
            case "insert":
                next.splice(op.at % (n + 1), 0, make());
                break;
            case "remove":
                if (n) drop(next.splice(op.at % n, 1));
                break;
            case "move":
                if (n) next.splice(op.to % n, 0, next.splice(op.from % n, 1)[0]);
                break;
            case "swap":
                if (n) {
                    const a = op.a % n, b = op.b % n;
                    [next[a], next[b]] = [next[b], next[a]];
                }
                break;
            case "reverse":
                next.reverse();
                break;
            case "shuffle": {
                let s = op.seed;
                for (let i = next.length - 1; i > 0; i--) {
                    s = (s * 1103515245 + 12345) >>> 0;
                    const j = s % (i + 1);
                    [next[i], next[j]] = [next[j], next[i]];
                }
                break;
            }
            case "replace":
                drop(next.splice(0, n, ...Array.from({ length: op.count }, () => make())));
                break;
            case "clear":
                drop(next.splice(0, n));
                break;
            case "filter": {
                const kept = next.filter((_, i) => (op.mask >> (i % 16)) & 1);
                drop(next.filter((it) => !kept.includes(it)));
                next.splice(0, next.length, ...kept);
                break;
            }
            case "readd": {
                const candidates = removed.filter((it) => !next.includes(it));
                if (!candidates.length) continue;
                next.splice(op.at % (n + 1), 0, candidates[op.which % candidates.length]);
                break;
            }
            case "clone":
                // Same id, new object: identity keying and keyFn (item check) both re-render
                if (n) {
                    const at = op.at % n;
                    drop(next.splice(at, 1, make(next[at].id)));
                }
                break;
            case "marks":
                marks.value = !marks.value;
                verify(where);
                continue;
            case "relabel":
                if (n) {
                    const item = next[op.at % n];
                    item.label.value = `L${nextLabel++}`;
                }
                verify(where);
                continue;
        }
        // keyFn mode needs unique ids: skip edits that would duplicate one
        if (c.mode === "keyFn" && new Set(next.map((m) => m.id)).size !== next.length) continue;
        commit(next);
        verify(where);
    }

    view.dispose();
    if (liveRenders.size !== 0) throw new Error(`after dispose: ${liveRenders.size} item scope(s) still live`);
    leaks.expectNone();
}

function show(c: Case): string {
    return [`  mode: ${c.mode}, initial items: ${c.initial}`, ...c.ops.map((op) => `  ${JSON.stringify(op)}`)].join("\n");
}

describe("Each (property)", () => {
    test("keyed reconciliation matches the array model", () => {
        checkProperty("Each matches array model", {
            runs: 200,
            generate: genCase,
            check,
            shrink: (c) => (function* () {
                for (const ops of shrinkArray(c.ops)) yield { ...c, ops };
                if (c.initial > 0) yield { ...c, initial: c.initial - 1 };
                if (c.mode !== "signal") yield { ...c, mode: "signal" as const };
            })(),
            show,
        });
    });
});
