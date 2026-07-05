---
name: design-principles
description: The decision-making principles this repository is built on — spec discipline, dependency policy, architecture, URL-as-state, UX copy rules, root-cause fixing, and layered verification. Read BEFORE designing or implementing any non-trivial change so your reasoning matches the project's.
---

# Design & implementation principles

How to think when changing this codebase. The companion skills cover the mechanical
procedures (`commit`, `spec-sync`, `add-distribution`); this one covers the judgment calls.

## 1. The spec is the contract

- `docs/specification.md` is the source of truth. Code that contradicts it is a bug,
  no matter how reasonable the code is.
- **Never resolve an ambiguity by silently picking an interpretation.** Ask the product
  owner, then record the answer in the spec (see the `spec-sync` skill). This project's
  history is full of decisions that looked obvious and weren't (ordering changed three
  times; the "share button" everyone would add was explicitly rejected).
- When an instruction conflicts with an earlier decision, the newest instruction wins —
  update the recorded decision instead of appending a contradiction.

## 2. Dependencies are a liability (supply-chain first)

- Every dependency is an attack surface. Before adding one: can a few dozen lines of
  hand-rolled code do the job? (This repo hand-rolls i18n, drag-and-drop, URL sync, and
  samplers for exactly this reason.)
- If a dependency is justified: compare multiple candidates, record the rationale in
  `docs/tech-selection.md`, install with `--save-exact`, and prefer tools with zero
  transitive npm dependencies (Biome) or massive scrutiny (React, Chart.js).
- npm never runs on the host — only inside the Docker container. GitHub Actions are
  pinned to commit hashes, never tags.

## 3. Architecture: strict layers and registry-shaped extension points

- Layers depend strictly upward: `domain` (pure TS, framework-free) → `state` →
  `components`. If a domain file imports React, the design is wrong.
- One concept = one file; a registry array (`DISTRIBUTIONS`) is simultaneously the
  catalog, the display order, and the test sweep target. Adding a concept must require
  zero UI changes — if it doesn't, the abstraction (`DistributionDef`) is missing a member.
- Enforce cross-file consistency with the type system where it reaches (`satisfies` pins
  en.ts to ja.ts's key set) and with registry-sweeping tests where it doesn't (i18n keys ×
  registry, density sums ≈ 1, sampler convergence). A guard that only exists in a code
  review comment does not exist.
- Numerics: probability math runs in log space (`exp(lnΓ(...) + ...)`); samplers take an
  injected seedable `Rng`, never `Math.random()` directly.

## 4. State: the URL is the entirety of shareable state

- Anything a user would want to share lives in the query string, synced continuously via
  `replaceState`. Defaults are omitted (short URLs that show what changed); invalid values
  fall back silently (shared links never crash).
- Personal preferences resolve URL > localStorage > OS, and are **persisted only when the
  user touched them this session** — opening someone's shared link must never overwrite
  your own settings (`explicit` vs `touched` flags).
- Positional URL formats are append-only. A breaking change needs a version marker.
- What you share is the parameters, not the samples: histogram seeds stay out of the URL,
  and stay fixed while sliders move so shape changes are readable.

## 5. UX copy rules

- **Tagline (above the chart) = abstract**: what the distribution is, and how it relates
  to the others (limit, sum, mixture, continuous counterpart). **Use case = concrete**:
  a real scenario with the *current parameter values* interpolated into the text.
- Choose defaults so the numbers tell one coherent story on first paint: Bernoulli and
  binomial share p=0.3; the normal defaults to a test-score N(60, 10²) rather than the
  academically-pure N(0, 1). Realistic beats canonical.
- Explain mechanisms, not just examples. "Incomes are log-normal" is a claim; "a salary
  is built by multiplying yearly raise rates" is an explanation. Avoid jargon when plain
  words carry the same content ("what a binomial becomes when..." instead of "the limit").
- Everything ships in both ja and en, and Japanese is the source dictionary.

## 6. Fix root causes; never suppress

When a tool complains or a behavior is wrong, find the mechanism before choosing the fix.
Precedents from this repo:

| Symptom | Wrong fix | Actual fix |
|---|---|---|
| ts(2307/2875/7026) in the host editor | ts-ignore / disable checks | node_modules was in a named volume the host couldn't see → bind mount |
| `@theme` unknownAtRules warnings | disable CSS validation | teach the validator the at-rules via `css.customData` |
| card text not selectable | `user-select` hacks | `draggable` was always on → arm it only while the handle is pressed |
| number input unusable | looser clamping | controlled-input-per-keystroke was the bug → draft while editing, commit on blur/Enter |
| charts keep stale theme colors | re-render everything | child effects run before parent effects → apply `data-theme` in a layout effect |

A suppression comment (`biome-ignore` etc.) is acceptable **only** for a verified false
positive (e.g. `useCaseValues` matching the `use*` hook heuristic), and must say why.

## 7. Verify in layers, prove the change

1. Container checks before every commit: `npm run lint:ci` (warnings fail) →
   `typecheck` → `test`. Never commit red.
2. Any user-visible change gets verified in a real browser — assert the DOM (order,
   text, attribute values), not just "it compiled". Test the negative case too (the
   drag that must NOT start, the empty URL token that must NOT clamp).
3. Numbers get cross-checked against theory: spot tests with known values
   (P(X=2)=0.375), and displayed dynamic values recomputed by hand at least once.
4. When you claim something works, show the evidence (before/after values, tick labels,
   URL contents) — "should work" is not a verification.

## 8. Commits are semantic units

- One commit = one meaning: a feature, a fix, a layer, a decision — never a mixed bag.
  The unit of review is the commit; a reader must be able to state what a commit does
  in one sentence.
- When a single file accumulates two meanings (it happens — i18n dictionaries, the spec),
  **split it instead of shipping a mixed diff**: temporarily revert one part, commit the
  other, restore, commit. Ten extra minutes of surgery beats a permanently muddled history.
- Conventional Commits in English with a why-focused body, the Co-Authored-By trailer on
  every commit, and green checks before committing — mechanics in the `commit` skill.
- Commit when the product owner says to; until then, finished work waits in the working
  tree for review.

## 9. Comments and docs carry what the code cannot

- Code comments state constraints, reasons, and rejected alternatives — never narrate
  what the next line does. If a value looks arbitrary (±4σ, bin count, p=0.3), the
  comment says why it was chosen.
- Config files get "who reads this and why it exists" documentation (inline if the
  format allows comments; in CLAUDE.md if it doesn't).
- CLAUDE.md, README.md, and the spec are updated in the same unit of work as the change
  they describe. Documentation written later is documentation never written.
