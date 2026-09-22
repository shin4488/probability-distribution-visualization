# Development guide

React/TypeScript probability visualizations with Japanese/English UI and URL sharing. Read relevant sections of [requirements](docs/specification.md), [technical rationale](docs/tech-selection.md), or the [improvement backlog](docs/improvement-backlog.md) as needed.

## Environment and checks

- Run all npm commands, including installation, inside Docker. Host `node_modules` provides editor types but contains Linux binaries. Start with `docker compose up`; see [local development](README.md#local-development).
- For code, dependency, or build/test configuration changes, run the following before committing. CI treats lint warnings as failures; fix remaining findings with `npm run lint:fix` inside the container and rerun affected checks.

```bash
docker compose run --rm app npm run lint:ci
docker compose run --rm app npm run typecheck
docker compose run --rm app npm test
docker compose run --rm app npm run build
```

- For documentation/skill-only changes, check instructions, links, and metadata. Run application checks if runtime behavior is affected.
- Justify new dependencies in `docs/tech-selection.md` and pin them with `docker compose run --rm app npm install --save-exact <pkg>`. Runtime versions and scripts come from Docker/package definitions.
- Put scratch output in ignored `tmp/` or `scratch/`. Use an isolated container/worktree for clean-install checks; preserve dependencies used by running servers.

## Design constraints and references

- Keep `src/domain/` pure TypeScript. `types.ts` and `distributions/index.ts` define the registry; `math.ts`, `random.ts`, and `sampling.ts` implement calculations. Use log space for overflow-prone expressions. Only Resample changes histogram seeds; seeds stay out of the URL.
- For decisions about UI behavior, state, architecture, or dependencies, use [design-principles](.claude/skills/design-principles/SKILL.md). Routine edits that preserve these decisions do not need it. Add distributions with [add-distribution](.claude/skills/add-distribution/SKILL.md).
- Shareable state lives in `src/state/urlCodec.ts`, synced with `replaceState`; omit defaults and fall back on invalid values. Share through the address bar, without a share button. Transitions belong in `src/state/appState.ts`.
- Theme/language precedence is URL > localStorage > OS/browser. Preserve the pre-paint script in `index.html`. `src/i18n/ja.ts` defines translation keys; English must match.
- Use Tailwind utilities for layout/components; `src/styles.css` holds tokens and theme/chart colors. Do not add bespoke classes. Scan only `src/` and `index.html` with Tailwind.
- Register only needed Chart.js components. Use `update('none')` instead of recreating charts on slider changes. See [configuration boundaries](docs/tech-selection.md#configuration-boundaries) for configuration trade-offs.

## Git and deployment

- Start from latest `origin/main` on a topic branch. Commit and submit a PR when requested; use English Conventional Commits, a GitHub noreply author address, and an accurate AI `Co-Authored-By` trailer. Never force-push, including `--force-with-lease`.
- Never commit secrets or personal email addresses. Public site identifiers are not secrets. Use `verify-changes` before committing. Rotate leaked credentials and remove them in a follow-up commit; do not rewrite published history.
- Main deploys GitHub Pages. Keep `base: './'` and relative asset paths. Pin workflow actions to commit hashes; the update procedure is in `.github/workflows/deploy.yml`.
- After merge, confirm CI/Pages for that commit and check user-visible changes at [the published site](https://shin4488.github.io/probability-distribution-visualization/). See [deployment](README.md#deployment) for setup.
- Shared skills belong to the plugin; `.agents/skills` links to `.claude/skills`. The plugin invokes `.claude/hooks/post-edit.sh` for Docker Biome checks; do not register it twice. Claude permissions do not carry over to Codex.

## Working approach

- Start with the relevant files, headings, or symbols; expand the search as needed. Load only the documentation and skills that apply to the task.
- Ask about unresolved questions before proceeding with work that depends on the answer. Do not reconfirm decisions already made.
- Preserve each document's language. Write natural Japanese for Japanese readers and idiomatic English for English-speaking readers.
- Run mandatory checks when their conditions apply. Reuse results while the diff, dependencies, configuration, and execution conditions remain unchanged. Fix issues and briefly report results and anything unverified.
- Keep lasting rules and useful references here. Do not duplicate progress notes, configuration values, or procedures maintained in other documents or skills.
