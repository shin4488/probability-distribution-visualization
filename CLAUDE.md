# Development guide

A React/TypeScript SPA for interactive probability distributions, with Japanese/English, themes, and URL sharing. Requirements: [docs/specification.md](docs/specification.md); design rationale: [docs/tech-selection.md](docs/tech-selection.md); improvement candidates: [docs/improvement-backlog.md](docs/improvement-backlog.md). Read the sections relevant to the change.

## Environment and verification

- **Run all npm commands, including installation, inside Docker.** Host `node_modules` is for editor type resolution only; its native binaries are Linux builds. Setup details: [README Development](README.md#development).
- Development: `docker compose up`. Checks:

```bash
docker compose run --rm app npm test
docker compose run --rm app npm run typecheck
docker compose run --rm app npm run lint
docker compose run --rm app npm run build
```

- **Do not add dependencies** unless justified. Pin additions exactly using `docker compose run --rm app npm install --save-exact <pkg>` and record the reason in `docs/tech-selection.md`. Runtime versions and scripts come from the Docker/package definitions; check compatibility when upgrading.
- Scratch notes/scripts/output belong in ignored `tmp/` or `scratch/`. Verify clean installs in an isolated container/worktree, without replacing dependencies beneath a running server.
- **Never commit secrets or personal email addresses.** Public site identifiers (GA measurement ID, verification meta tag, public form URL) are not secrets. Use `verify-changes` for pre-commit checks. If a credential reaches the remote, rotate/invalidate it and remove it in a follow-up commit; never rewrite published history.

## Architecture and required design constraints

- Keep `src/domain/` pure TypeScript, independent of React/Chart.js. Start at `types.ts` and `distributions/index.ts` for definitions/registration, `math.ts` for numerical utilities, and `random.ts` / `sampling.ts` for samples and series. Keep prerequisite distributions before dependents and closely related ones adjacent.
- Before changes involving UI, interaction, or architecture decisions, follow [.claude/skills/design-principles/SKILL.md](.claude/skills/design-principles/SKILL.md). When adding a distribution, follow [.claude/skills/add-distribution/SKILL.md](.claude/skills/add-distribution/SKILL.md), including translations and verification.
- Calculate overflow-prone probability expressions in log space. Keep histogram seeds fixed while parameters change; only Resample changes the seed, which is not shared in the URL.
- All shareable state belongs in `src/state/urlCodec.ts` and is continuously synced via `replaceState`. Omit defaults and fall back for invalid values. Sharing uses the address bar; do not add a share button. State transitions belong in `src/state/appState.ts`.
- Theme/language precedence is URL > localStorage > OS/browser. Preserve the pre-paint script in `index.html`. `src/i18n/ja.ts` defines the keys; English must satisfy the same set.
- Use Tailwind utilities for layout/components; `src/styles.css` holds tokens and dark-theme overrides, including chart colors. Do not add bespoke CSS classes. Restrict Tailwind scanning to `src/` and `index.html`, excluding docs.
- Register only needed Chart.js components and update charts with `update('none')`, without destroy/recreate on slider changes. For configuration changes and trade-offs, read [technical rationale](docs/tech-selection.md#configuration-boundaries).

## Git, deployment, and shared tooling

- Work from the latest `origin/main` on a topic branch and submit a PR. Use English Conventional Commits, a GitHub noreply author address, and an accurate AI `Co-Authored-By` trailer.
- Before committing, run container lint, typecheck, and tests. CI also requires a build and rejects lint warnings via `lint:ci`; exact jobs/triggers are in `.github/workflows/`. Never force-push, including `--force-with-lease`.
- A push to main deploys GitHub Pages. **Keep asset paths relative (`base: './'`); never use absolute `/...` asset paths.** Pin workflow actions to commit hashes; use the update procedure in `.github/workflows/deploy.yml`.
- After merge, confirm CI and Pages deployment for the commit; verify user-visible changes at [the published site](https://shin4488.github.io/probability-distribution-visualization/). Deployment setup is in [README](README.md#deployment).
- Shared skills live in the plugin; local skills are edited under `.claude/skills` (`.agents/skills` is its relative symlink). Select the relevant skills without duplicating their procedures.
- The plugin invokes `.claude/hooks/post-edit.sh` for Docker Biome checks, replacing host checks. Do not register the same edit hook locally. Claude permissions do not carry over to Codex. Installation and hook approval: [README](README.md#agent-setup).

## Focused reading and maintenance

- `AGENTS.md` links to `CLAUDE.md`; read the shared text once and edit the original.
- Scope `rg` to relevant directories and names/headings/symbols. Use `-g` to omit dependencies, build output, logs, lockfiles, and generated code; read them directly for dependency, generation, type, or failure investigations. Widen paths or relax exclusions when needed.
- Run required checks, report failures/key results, and reuse results only with the same diff, dependencies, configuration, and execution conditions.
- Keep lasting rules, required conditions, key commands, and references here. Progress belongs in the task or existing issues/PRs; inventories and current values belong in their original definitions. Update this guide for changed rules/conditions, moved references, or newly essential guidance.
- Choose skills by their descriptions and follow the relevant `SKILL.md`. Preserve mandatory skill conditions here without copying catalogs or procedures.
