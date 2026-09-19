---
name: spec-sync
description: Update docs/specification.md when requirements, user-visible behavior, defaults, or recorded policies change.
---

# Keep docs/specification.md in sync with the code

`docs/specification.md` is the source of truth for requirements. Update it alongside changes to those requirements.

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

Update any affected descriptions in CLAUDE.md and README.md in the same change.
