---
name: fuzz-repro
description: Reproduce, minimise and fix a failing Fia property test (a "[fia fuzz] property ... failed" message, a red CI deep-fuzz job, or a FIA_FUZZ_SEED), or write a new property test with the harness. Use when a fuzz failure shows up or when adding a property for new reactive/control-flow behavior.
---

# Fuzz failures: reproduce → minimise → regression test → fix

The property runner is in `src/testing/fuzz.ts`. Properties live in `*.fuzz.test.ts` files, and each one calls `checkProperty(name, spec)`.

## 1. Replay the exact case

A failure message contains everything you need:

```
[fia fuzz] property "Each matches array model" failed on case 2/200 (seed 3867).
Replay: FIA_FUZZ_SEED=3867 FIA_FUZZ_RUNS=1 bun test -t "Each matches array model"
Minimal case (5 shrink steps):
  mode: store, initial items: 5
  {"t":"move","from":35,"to":47}
Failure: step 0 (move): item 1 stayed in the list but was re-rendered
```

Run the replay line as-is. `FIA_FUZZ_SEED` is the case seed, so `FIA_FUZZ_RUNS=1` replays that one case and shrinks it again. For a CI failure, the seed is in the job summary. Re-run with that base seed and the same `FIA_FUZZ_SCALE=50`, then use the case seed from the message.

## 2. Decide whether it's a library bug or a model bug

The minimal case is usually small enough to reason about by hand. Write a standalone repro script in the scratchpad that uses only the public API (`$`, `$e`, `batch`, `Mut`, `Each`...) and run it with `bun`. If the library does what the property expects, the reference model or the check is wrong. Fix the test and say so. Don't weaken a property just to make it pass.

## 3. Lock it in with a focused regression test

Before fixing, add a small deterministic test next to the existing ones (for example `src/core/reactivity/tests/store.test.ts` or `src/core/control/control.test.ts`) that fails for the same reason. Confirm it fails, then fix the bug, then confirm both that test and the property pass:

```bash
bun test <regression test file>
FIA_FUZZ_SCALE=20 bun test src/core -t property
```

Commit the fix and its regression test together. Mention in the body that the property test found it.

## Writing a new property

```ts
import { checkProperty, shrinkArray, type Rng } from "../../testing/mod";

checkProperty("short descriptive name", {
  runs: 200,                                   // scaled by FIA_FUZZ_SCALE in CI
  generate: (r: Rng) => ({ ops: Array.from({ length: r.range(1, 40) }, () => genOp(r)) }),
  check: (c) => { /* build the real thing + a plain model, apply ops, throw on divergence */ },
  shrink: (c) => (function* () { for (const ops of shrinkArray(c.ops)) yield { ...c, ops }; })(),
  show: (c) => c.ops.map((o) => JSON.stringify(o)).join("\n"),
});
```

Guidelines:
- Compare against an obviously correct model, such as an eager recompute or a plain array, not against the implementation's own logic.
- Store positions as raw ints and reduce them modulo the current length when applying, so shrunk cases stay valid.
- Check after every op, not only at the end, so the failing step is named.
- Give the test name the word "property". `bun run test:fuzz` and CI select tests by that word (`-t property`).
- `checkProperty` calls `resetDom()` before every attempt. Tear down what you render (`view.dispose()`), and use `trackLeaks()` to assert that disposal released everything.
