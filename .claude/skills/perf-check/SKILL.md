---
name: perf-check
description: Measure whether a Fia change is faster or slower — A/B benchmarks against a git ref, reading the verdicts, adding a benchmark, and checking bundle size. Use before committing changes to reactivity/control/elements hot paths, when the user asks about performance, or when claiming an optimisation.
---

# Performance checks

Fia's README makes performance claims, so a change to a hot path needs numbers, not intuition.

## A/B against a ref (the default)

```bash
bun run bench:ab                                   # working tree vs HEAD (uncommitted changes)
bun run bench --against HEAD~1                     # last commit vs its parent
bun run bench --suite reactivity -f "chain|diamond" --against HEAD
bun run bench --against HEAD --fail-on-regression --threshold 5
```

The runner checks the ref out into a temporary git worktree and loads both versions in one process. It calibrates once and alternates samples, so machine drift affects both sides equally. Close heavy apps first: WSL and laptop power states add noise.

Reading a row:

```
reactivity/diamond 1→100→1   11.16 µs  ±5.4%  89,610/s   base 12.80 µs  -12.8% faster
```

- `±` is the median absolute deviation. Above ~15%, treat the row as noise and re-run.
- A verdict is **faster/SLOWER** only when the medians differ by more than `--threshold` (default 5%), a Mann–Whitney U test gives p < 0.01, *and* the absolute delta is at least 1 ns. Otherwise it shows `~`. An A/A run (`--against HEAD` with a clean tree) should show only `~`.
- The summary line's geomean is the one-number answer for "overall". A ±3% geomean drift is normal.
- `--quick` is for smoke tests and CI. Use the full run before claiming a result.

Report the verdict rows that matter and the geomean. Don't round a `~` up to "faster".

## Saved baselines (when A/B isn't possible)

`bun run bench --save` writes `bench/.results/baseline.json` (gitignored, machine-specific), and `bun run bench --compare` compares against it later. This is noisier than A/B because the samples come from different runs.

## Adding a benchmark

Suites in `bench/suites/*.bench.ts` receive the library as an argument (`benches: (lib) => [...]`), so the same suite runs against the old and new code. Use only APIs exported from `src/core/mod.ts`. The internals change between refs, and the A/B run skips a suite that can't load against the base.

- Micro: `{ name, fn }`. Build the graph once outside `fn`, write to a `sink`, and vary inputs (`++tick`) so the work isn't elided.
- Macro (DOM): `{ name, setup, run, teardown }`. Only `run` is timed. Set `dom: true` on the suite.
- To add a new suite file, also add it to `SUITE_FILES` in `bench/run.ts`.

happy-dom is much slower than a browser at DOM work. The DOM suite catches regressions in Fia's own overhead. For real browser numbers, use `bun run benchmark` (needs the gitignored `benchmark_repo/` checkout).

## Bundle size

```bash
bun run size            # gzip budgets in size-limits.json
bun run check:pure      # every exported factory call has /*#__PURE__*/
```

If growth is intended, run `bun run size --update` (this adds 3% headroom), and ask the user before committing a raised budget.
