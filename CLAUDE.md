# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

Fia (`@fia/core` on JSR) is a zero-dependency, type-safe reactive UI library: fine-grained signals + direct DOM manipulation, no VDOM, no JSX, no compiler. The library ships as TypeScript source (JSR publishes `src/` directly; there is no build step for the library itself). Bun is the runtime for everything — dev server, tests, bundling, benchmarks.

## Commands

| Task | Command |
|---|---|
| Dev server (port 4000, HMR) | `bun run dev` |
| Run all tests | `bun run test` (= `bun test src/core src/testing`) |
| Run a single test file | `bun test src/core/elements/elements.test.ts` |
| Run tests matching a name | `bun test src/core -t "should create empty element"` |
| Type-check (lib + tests + tooling) | `bun run test:types` — incremental; ~1–5s warm, ~100s cold |
| Coverage gate (totals vs coverage-thresholds.json) | `bun run test:coverage` (`--update` ratchets up) |
| Deep fuzz (property tests ×20) | `bun run test:fuzz` · replay: `FIA_FUZZ_SEED=<seed> FIA_FUZZ_RUNS=1 bun test -t "<name>"` |
| Benchmarks | `bun run bench` · A/B vs HEAD: `bun run bench:ab` · vs any ref: `bun run bench --against <ref>` |
| Bundle size budgets (gzip, size-limits.json) | `bun run size` (`--update` to accept growth) |
| Tree-shaking guard | `bun run check:pure` |
| Build docs site | `bun run build:docs` (src/docs/main.ts → docs/) |
| js-framework-benchmark (real browser) | `bun run benchmark` (requires the gitignored `benchmark_repo/` clone; see benchmark_repo/INSTALL_DEPS.md) |

Note: `**/*.test.ts` is excluded in tsconfig.json; `tsconfig.tests.json` type-checks them (this is what makes `@ts-expect-error` in `*.types.test.ts` a gate — `bun test` strips types), and `tsconfig.tools.json` covers `bench/`, `scripts/` gates and `.claude/hooks/`. `test:types` runs all three.

CI (`.github/workflows/ci.yml`, every push/PR): types, tests+coverage, size, check:pure; a deep-fuzz job with a random seed (printed in the job summary); an informational A/B bench vs the base ref.

## Publishing

Push a `v*` tag → GitHub Actions (`.github/workflows/publish.yml`) runs `tsc --noEmit`, `bun test`, then `bunx jsr publish`. **The published version lives in `jsr.json`** — bump it there (package.json's `version` is not what JSR publishes and has drifted). `jsr.json` only exposes `.` and `./svg` and excludes `benchmark_repo`, `bench`, `src/examples`, `src/playground`, `src/testing`. The `release` skill walks through it.

## Architecture

All library code is in `src/core/`. Everything else (`src/docs`, `src/examples`, `src/playground`, `dev.ts`, `scripts/`) consumes it.

### Reactivity (`src/core/reactivity/reactivity.ts`)

The heart of the library. One polymorphic function `$` (aliased as `signal`) dispatches on its argument:

- `$(primitive)` → **read-only** `Signal<T>` — immutable by default; writing throws
- `$(Mut(primitive))` → `WritableSignal<T>` (`.value` setter or call-as-function to write)
- `$(() => ...)` → computed `Signal` with version-based dirty checking (lazy recompute on read)
- `$(object)` → Proxy-based `ReactiveStore` with per-property `ReactiveNode` tracking — shallowly **immutable by default**; strictly-immutable stores are frozen
- `$(object, "key1", "key2")` → store with only those keys mutable; `$(Mut(object))` → fully mutable store; `Mut()`-wrapped individual properties become mutable

**Immutable-by-default is a deliberate design pillar** (see README "Immutability") enforced both at the type level (readonly/`Widen`/`Readable` mapped types) and at runtime (Proxy set/delete traps, `Object.freeze`). Don't add mutation paths that bypass it. `store.$raw` is the escape hatch.

Effects are `$e(fn)` (returns a dispose function); `batch(fn)` coalesces effect runs; `signal.peek()` reads without tracking. Dependency tracking is the standard active-subscriber pattern (`track`/`trigger`) with SolidJS-style subscriber cleanup before each re-run. Hot paths deliberately use arrays instead of Sets/Maps — this file is performance-tuned; keep allocations minimal.

### Execution context (`src/core/context/context.ts`)

A module-level LIFO stack of parent contexts (anything with `appendChild`). Element factories append themselves to the current top of stack; a `children` callback pushes the new element, runs, and pops. This is how nesting works without JSX — falls back to `document.body` when the stack is empty. `fragment()` batches many siblings into one DOM insertion. Control-flow components push DocumentFragments/comment anchors as contexts. Tests must drain this stack in `beforeEach` (see existing tests).

### Elements (`src/core/elements/`)

`elements.ts` exports one factory per HTML tag, each created by a factory-of-factories (`ElementFactory`, `TextElementFactory`, `InteractiveElementFactory`, `VoidElementFactory`, plus specialized `AnchorElementFactory`/`ImgElementFactory`). The unified call convention across all elements:

```ts
el()                       // empty
el({ props })              // props only
el(() => { ... })          // children callback
el({ props }, () => {})    // props + children
```

Text/interactive elements add overloads for text content, signals as content, and shorthand handlers (e.g. `button("Save", onClick)`); heuristics like `looksLikeHref` disambiguate `a("text", "/url")`. Signals passed as content or prop values are bound reactively via effects. Prop application (`applyProps`/`assignProp`/`applyStyle`/`applyClass`) handles the property-vs-attribute distinction (`PROP_TO_ATTR` map).

**Every element export carries a `/*#__PURE__*/` annotation** — this is what makes tree-shaking work (20–24% bundle reduction, see TREE_SHAKING_RESULTS.md). New element exports must keep this pattern, and `package.json` declares `sideEffects: false` — don't introduce module-level side effects in `src/core`.

### Events (`src/core/events/events.ts`)

Global event delegation: one `document`-level listener per event type in `DELEGATED_EVENTS`, handlers stored in a `WeakMap<Element, ...>`, bubbling simulated manually (with `currentTarget` patched via `defineProperty`). Non-delegated events fall back to native `addEventListener`.

### Control flow (`src/core/control/control.ts`)

`Show`, `Each`, `Match` — each drops a comment-node anchor into the current context and re-renders via `$e`. `Each` does keyed reconciliation: automatic stable keys (objects get identity-based ids, unique primitives key by value), with an optional third `keyFn` argument for duplicates/DB ids. `each-optimized.ts` and `reconcile.ts` hold an alternative keyed implementation and the list-diffing algorithm. Philosophy (from README): use plain `if`/`forEach` for static structure; `Show`/`Each` are only for *reactive* DOM updates.

### Type-only layers

`src/core/css/` (branded CSS value types, per-property typing), `src/core/attributes/` (per-element HTML attribute types), and `src/core/a11y/aria.ts` are almost entirely type-level — they exist for autocomplete/safety and must not add runtime weight.

### Entry points

`src/core/mod.ts` (full), `signals.ts` (reactivity only), `elements-entry.ts`, `control-entry.ts`, `svg/svg.ts` (separate namespace; also re-exported from mod.ts with `svg`-prefixed names to avoid HTML collisions). package.json `exports` maps these to `fia`, `fia/signals`, `fia/elements`, `fia/control`, `fia/svg`. If you add a public API, wire it through the appropriate entry point(s).

## Dev server & sandbox

`bun run dev` runs `dev.ts`: a Bun server that transpiles `.ts` on the fly, injects an import map (`fia` → `/src/core/mod.ts`) plus a reload-on-change websocket into `index.html`, and serves `/src/example.ts` → `src/examples_launcher.ts` → `src/playground/index.ts`. Use `src/playground/` as the scratch area for manual testing; `src/examples/` holds the larger demo pages.

## Tests

`bun:test` with happy-dom, via the harness in `src/testing/` (not published). `bunfig.toml` preloads `src/testing/setup.ts`, which registers happy-dom, resets the DOM + execution-context stack before **every** test, and **fails any test that leaves the runtime dirty** (unbalanced push/pop, open batch, queued effects, leaked tracking/owner scope). New test files need no setup boilerplate.

Fixtures (`import { ... } from "../../testing/mod"`):

- `render(() => ui)` → `{ container, dispose, text, html, get, query, all }`. Runs the UI under a root owner so `dispose()` tears down every binding.
- `fire.click/input/change/keydown/submit/...` — bubbling events that reach Fia's document-level delegation.
- `trackLeaks()` / `expectNoLeaks(fn)` — records every effect/computed created (via the internal `setDevHook` in reactivity.ts) and reports any still subscribed after disposal, with creation stacks. Create long-lived signals *before* starting the tracker.
- `checkProperty(name, { generate, check, shrink, show })` + `rng`/`shrinkArray`/`shrinkInt` — seeded property tests with greedy shrinking; failures print a replay command. Name such tests with "property" (CI's deep fuzz selects them with `-t property`). Existing: `reactivity/tests/graph.fuzz.test.ts` (DAG vs eager model), `control/each.fuzz.test.ts` (keyed reconciliation vs array model).

When a property fails: replay the seed, decide library bug vs model bug, add a focused regression test, then fix (the `fuzz-repro` skill has the full procedure).

## Claude Code harness (`.claude/`)

- Hooks (`.claude/hooks/`, registered in `.claude/settings.json`): `guard.ts` blocks edits to generated/ratcheted files (docs/, dist/, coverage/, size-limits.json, coverage-thresholds.json); `related-tests.ts` runs the tests related to an edited `src/core`/`src/testing` file (plus check-pure) and feeds failures back; `stop-gate.ts` runs types/tests/size/check-pure before a turn ends when code changed (cached by diff hash, gives up after 3 blocked attempts).
- Agents: `reactivity-reviewer` (scheduling/ownership/leaks/hot paths), `api-surface-reviewer` (entry points, type tests, tree-shaking, size).
- Skills: `fuzz-repro`, `perf-check`, `release`.

## Other notes

- `docs/` is the **built** GitHub Pages site (generated by `bun run build:docs` from `src/docs/`, which is itself written in Fia). Edit `src/docs/`, not `docs/main.js`.
- `dist/`, `benchmark_repo/`, `*.tsbuildinfo` are gitignored build/benchmark artifacts.
- `*:Zone.Identifier` files scattered through the tree are WSL download-metadata artifacts — ignore them and never commit them.
- tsconfig is full-strict with `erasableSyntaxOnly` and `verbatimModuleSyntax`: no enums/namespaces/parameter properties, and type imports must use `import type`.
