# CLAUDE.md

An SPA that visualizes probability distributions interactively. Ten distributions, each with parameter sliders driving real-time rendering of the PDF/PMF plus a sample histogram. Japanese/English, dark mode, and shareable-URL support.

The source of truth for requirements is [docs/specification.md](docs/specification.md); the rationale for technology choices is in [docs/tech-selection.md](docs/tech-selection.md).
Before designing or implementing anything non-trivial, read
[.claude/skills/design-principles/SKILL.md](.claude/skills/design-principles/SKILL.md) —
the decision-making principles this repository is built on.

## Development environment (Docker only — no Node.js needed on the host)

```bash
docker compose up                          # dev server at http://localhost:5173
docker compose run --rm app npm test       # tests (vitest)
docker compose run --rm app npm run typecheck
docker compose run --rm app npm run lint   # Biome (check only)
docker compose run --rm app npm run lint:fix  # Biome (auto-fix)
docker compose run --rm app npm run build  # production build → dist/
```

With VS Code or any devcontainer-capable editor you can also open the repo via "Reopen in Container" from `.devcontainer/`
(run `npm run dev` inside the container; port 5173 is auto-forwarded).

- `node_modules` is bind-mounted, so it also physically exists on the host. This is required for the host editor (tsserver) to resolve type declarations like `@types/react` (isolating it in a named volume causes ts(2307)/ts(2875)/ts(7026) in the editor)
- However, **all npm commands (including install) must run inside the container**: `docker compose run --rm app npm install --save-exact <pkg>`. Never run npm on the host
- The container is Linux, so native binaries in node_modules (esbuild etc.) are Linux builds. The host uses node_modules only for type resolution; build and test in the container
- Scratch work (notes, experiment scripts, temporary output) goes in `tmp/` or `scratch/` — both are gitignored, so nothing there ever needs to be committed or cleaned out of a diff
- **Policy: do not add dependencies** (npm supply-chain protection). When one must be added, pin the version exactly (`--save-exact`) and record the rationale in docs/tech-selection.md
- **Policy: never commit secrets** — API keys, access tokens, private keys, passwords, `.env` contents, personal email addresses. Identifiers the site already serves to every visitor are *not* secrets (the GA4 measurement ID, the Search Console verification meta tag, the public Google Form URL). Force-push is denied here, so pushed history cannot be scrubbed: if a secret reaches the remote, rotate/invalidate the credential immediately and remove it with a follow-up commit. The pre-commit check lives in the `commit` skill

## Architecture

Layers depend strictly upward. The domain layer knows nothing about React or Chart.js.

```
src/domain/     math, RNG, distribution definitions (pure TS, UI-agnostic → tested with vitest)
  types.ts        the DistributionDef interface (the abstraction for a distribution)
  math.ts         log-space utilities such as lnGamma
  random.ts       seedable PRNG (mulberry32) and samplers
  sampling.ts     histogram binning and PDF/PMF point-series generation
  distributions/  one file per distribution. DISTRIBUTIONS in index.ts is the display-order registry
                  (order = the order statistics is learned: prerequisites first, closely
                  related distributions adjacent. See the comment in index.ts)
src/i18n/       ja.ts is the source of truth for all keys; en.ts is forced to the same key set via satisfies
src/state/      appState.ts (reducer) and urlCodec.ts (URL ⇔ state conversion)
src/components/ React + Chart.js, styled with Tailwind utility classes (shared button
                class strings live in components/ui.ts). Chart colors are read from CSS variables
src/styles.css  design tokens only (Tailwind @theme + dark-theme variable overrides +
                chart colors). No layout/component CSS — write Tailwind utilities instead
```

### Design decisions to keep in mind

- **Probability math happens in log space**: binomial coefficients and Γ(x) overflow double precision, so write `exp(lnΓ(...) + ...)` (see the comments in math.ts)
- **The histogram seed is fixed**: if samples changed every frame while dragging a slider, the shape change would be unreadable. Only the "Resample" button updates the seed. The seed is not put in the URL (what you share is the parameters, not the samples)
- **The URL is the entirety of shareable state**: parameters, ordering, hidden cards, histogram on/off and sample size, language, and theme all live in the query string, continuously synced to the address bar via replaceState. There is deliberately no share button (per the spec — share by copying from the URL bar). Default values are omitted (see the format comment in urlCodec.ts). Invalid values silently fall back to defaults
- **Theme/language precedence**: URL > localStorage > OS/browser settings. The inline script in index.html prevents a flash before first paint
- **Styling is Tailwind-first**: do not add hand-written CSS classes (a spec requirement). Theme switching works by overriding the token variables under `:root[data-theme='dark']` in styles.css, which flips every utility and chart color at once
- **Chart.js registers only the components in use** (components/chartTheme.ts). Charts are updated with `update('none')` rather than destroy/recreate (for slider responsiveness)

## Configuration files

Who reads each file and why it exists. Files that allow comments also carry this explanation inline; `.claude/launch.json` is strict JSON (comments would break parsing), so it is documented only here.

| File | Read by | Purpose / why it exists |
|---|---|---|
| `.claude/launch.json` | Claude Code (browser preview) | Tells Claude Code how to start this project's dev server when it verifies changes in a browser: the `dev` configuration runs `docker compose up` and watches port 5173. Without it, Claude cannot launch/reuse the dev server for previews. Not read by Vite, tsc, or the app. Must stay strict JSON — no comments |
| `tsconfig.json` | `tsc -b`, editors | Solution-style root with no sources of its own; it only references the two sub-projects below so one `tsc -b` (used by `npm run typecheck` and `npm run build`) checks everything. Split projects are needed because browser code and Node code have different globals |
| `tsconfig.app.json` | `tsc -b`, editors (tsserver) | Type-checks the browser app (`src/`): DOM lib, `jsx: react-jsx`, `moduleResolution: bundler` to match Vite. `noEmit` — Vite's esbuild does the transpiling; tsc only validates types |
| `tsconfig.node.json` | `tsc -b`, editors (tsserver) | Type-checks `vite.config.ts`, which runs in Node, not the browser — so no DOM lib. Keeping it separate prevents browser types leaking into config code and vice versa |
| `vite.config.ts` | Vite dev server, Vite build, Vitest | One file shared by three consumers: `npm run dev` (dev server; `server.host: true` binds 0.0.0.0 so the Docker container is reachable from the host), `npm run build` (`base: './'` for GitHub Pages subpath serving), and `npm test` (the `test` block; node environment since domain/state tests need no DOM) |

Other config files document themselves with inline comments: `docker-compose.yml` (dev environment), `biome.json` (lint/format; see also docs/tech-selection.md), `.devcontainer/devcontainer.json` (editor-in-container), `.github/workflows/deploy.yml` (CI/CD and hash pinning).

## Adding a distribution

See `.claude/skills/add-distribution/SKILL.md` for the procedure (summary below):

1. Implement `DistributionDef` in `src/domain/distributions/<id>.ts` (use an existing file as the template)
2. Add the id to `DistributionId` in `types.ts` and register it in `DISTRIBUTIONS` in `distributions/index.ts` at its learning-order position (after its prerequisites, near strongly related distributions)
3. Add `dist.<id>.name / tagline / param.<key> / usecase` to both `i18n/ja.ts` and `en.ts` (the usecase text must contain parameter-value placeholders — a spec requirement)
4. Run the tests (the sum-of-density ≈ 1 and sampler-convergence tests automatically sweep the whole registry, so new tests are only needed for spot checks against known values)

## Deployment

- `.github/workflows/ci.yml` runs lint (warnings fail via `lint:ci`) → typecheck → test → build on every pull request and on pushes to non-main branches, so breakage shows up as PR status checks
- GitHub Pages (project page). A push to main runs `.github/workflows/deploy.yml`: the same checks → build → deploy
- **Workflow actions are pinned to commit hashes** (protection against tag-repointing supply-chain attacks). See the comment at the top of deploy.yml for the update procedure
- `base: './'` in `vite.config.ts` (relative paths) makes the build work under a subpath. **Never reference assets with absolute `/...` paths**
- One-time setup: repository Settings → Pages → Source must be set to "GitHub Actions"

## Known limitations

- Reordering uses the HTML5 Drag and Drop API, so it does not work on touch devices (everything else does)
- Vite is kept at v6 for compatibility with Node 20.18 on the host. Check the Node requirement before upgrading
