---
name: release
description: Cut a Fia release to JSR — bump the version in jsr.json, run every gate, tag v<version> and (after explicit confirmation) push the tag that triggers the publish workflow. Use when the user asks to release, publish or bump the version.
---

# Releasing @fia/core

Publishing happens in `.github/workflows/publish.yml` when a `v*` tag is pushed. **The version that gets published is `jsr.json`'s `version`.** `package.json`'s `version` isn't published and has drifted, so leave it alone.

## Steps

1. **Pick the version.** Read `jsr.json` and the commits since the last release. Git tags and `jsr.json` have drifted apart (the tags stop at v0.2.x while jsr.json is at 0.3.x), so compare against the published version and don't assume the latest tag is current:
   ```bash
   git describe --tags --abbrev=0; grep '"version"' jsr.json
   git log --oneline <last-release-ref>..HEAD
   ```
   Propose patch, minor or major from the changes (the API is pre-1.0, so a breaking change means a minor bump) and confirm the number with the user.

2. **Run every gate.** These are the same checks CI runs. All must pass:
   ```bash
   bun run test:types && bun run test:coverage && bun run size && bun run check:pure \
     && FIA_FUZZ_SCALE=20 bun test src/core -t property
   ```
   Also check what will be published: `bunx jsr publish --dry-run` should list only library files. `src/testing`, `bench`, `src/examples` and `src/playground` are excluded in `jsr.json`.

3. **Bump and commit.** Edit only the `version` in `jsr.json`, then commit with the message `release <version>`, following the repo style (lowercase, no prefix).

4. **Tag locally:** `git tag v<version>`.

5. **Stop and confirm before pushing.** Pushing the tag publishes to JSR, and that can't be undone: JSR versions are immutable. Show the user the commit, the tag and the gate results, and ask before running:
   ```bash
   git push origin main && git push origin v<version>
   ```
   Then point them at the Actions run for the publish workflow.
