---
name: spec-sync
description: Whenever a change alters what the app is specified to do (features, behavior, defaults, ordering, policies), docs/specification.md MUST be updated in the same unit of work. Use before finishing any spec-affecting change.
---

# Keep docs/specification.md in sync with the code

`docs/specification.md` is the source of truth for requirements. Code that changes what the
app is *specified* to do without updating the spec silently turns the spec into fiction.

## When this applies

Update the spec **in the same unit of work** (same commit or its sibling docs commit) when a change:

- adds/removes a feature or a distribution
- changes user-visible behavior or wording policy (e.g. "taglines are abstract, use cases are concrete")
- changes a default (initial visibility, sample size, ordering, theme resolution, ...)
- changes a recorded policy (dependency rules, supply-chain rules, commit rules, ...)
- resolves an ambiguity by asking the product owner — record the answer

Pure refactors, bug fixes that restore already-specified behavior, and internal tooling
changes do **not** need a spec entry (record notable ones in docs/tech-selection.md instead
if they are technology decisions).

## How to record

Append a bullet to the **"Confirmed additions"** section of `docs/specification.md`:

- Under **"Settled by answers to questions"** if the product owner answered a question
- Under **"Settled by follow-up instructions"** if it came as a new instruction or a
  decision made during implementation

Keep each bullet one or two lines: **what was decided** and, when not obvious, **why**.
Update existing bullets instead of appending contradictory new ones (e.g. when the
distribution ordering changes, rewrite the ordering bullet).

## Checklist before finishing a task

1. Did the change alter any behavior a user or contributor would consider "the spec"?
2. If yes: is `docs/specification.md` updated to match, with stale bullets rewritten?
3. Do CLAUDE.md / README.md mention the old behavior anywhere? Update them too.
