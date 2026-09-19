---
name: design-principles
description: Guide changes to UI behavior, shared state, component boundaries, or dependency choices in this app.
---

# Design decisions

Use the relevant section when a change requires a design decision. Routine edits that preserve the design do not need this skill.

## Requirements and boundaries

- `docs/specification.md` defines the requirements. Ask about unresolved requirements before implementing them; record answers with `spec-sync`. Update superseded decisions rather than leaving contradictory instructions.
- Keep `domain` independent of React and Chart.js; `state` may use domain code, and components may use both. A distribution belongs in one domain file and the registry, without distribution-specific UI wiring. Use `add-distribution` when extending the registry.
- Use types and registry-wide tests for cross-file contracts. Follow the root guide for numerical, dependency, environment, and Git constraints.
- For dependency decisions, compare suitable options and record the rationale in `docs/tech-selection.md`. Consider a small local implementation where practical, but assess maintenance cost as well as transitive dependencies.

## State and interaction

- Shareable state belongs in the URL. Preference precedence is URL > localStorage > OS/browser, but persist a preference only after the user changes it in this session. Opening a shared link must not overwrite saved preferences; preserve the distinction between `explicit` and `touched`.
- Positional URL formats are append-only; incompatible changes need a version marker. Omit defaults and fall back on invalid input. Keep sample seeds out of the URL and stable while parameters change.
- For editable numeric fields, allow a draft while typing and commit on blur/Enter. Arm dragging only from its handle so card text remains selectable.
- Apply theme attributes before charts read their colors. Preserve the pre-paint script and avoid rebuilding charts for slider updates.

## Explanations and copy

- Taglines explain the distribution and its relationships. Use cases describe a real situation with numbers computed from the current parameters. Explain why the distribution fits rather than merely naming an example.
- Choose defaults that make the initial examples coherent. Preserve recorded defaults such as matching Bernoulli/binomial probabilities and the normal test-score example unless the requirement changes.
- Keep Japanese and English complete and natural for their readers. Japanese defines the translation keys.

## Evidence and completion

- Fix the cause of diagnostics. Suppression is allowed only for a verified false positive with an explanation; editor configuration or dependency visibility problems are not reasons to suppress source checks.
- Verify user-visible changes in a browser, including relevant negative cases. Check DOM order, text, attributes, or URL values as appropriate. Cross-check changed numerical outputs against independently calculated known values.
- Follow the root guide's required container checks and reuse unchanged verification results. Report concrete evidence and any remaining limitations.
- Update affected requirements, README guidance, and design rationale in the same change. Keep configuration details beside their definitions; the root guide should link to them when needed.
- Commit only when the user asks. Group changes by purpose; do not temporarily discard unrelated work merely to split a commit. Use selective staging where possible.
