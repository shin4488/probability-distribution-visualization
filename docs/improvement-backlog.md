# Improvement backlog

Ideas for future work, with enough context and procedure that anyone (human or AI)
can pick one up cold. Nothing here is committed to — treat each item as a proposal
whose first step is a design conversation, not code.

How to work an item:

1. One item = one branch = one PR (see the `create-branch` skill)
2. For anything non-trivial, read `.claude/skills/design-principles/SKILL.md` first
3. Decisions confirmed with the product owner go into docs/specification.md (`spec-sync` skill)
4. The no-new-dependencies policy applies: prefer hand-rolled solutions; when a
   dependency is unavoidable, pin exactly and record the rationale in docs/tech-selection.md
5. When an item ships (or is rejected), delete it from this file in the same PR

Every item ends the same way, so it is not repeated in each Steps list below:
run the full gate (`docker compose run --rm app sh -c "npm run lint:ci && npm run
typecheck && npm test && npm run build"`), verify in the browser when UI-visible,
update affected docs, then commit → push → PR per the `commit` skill.

Effort: **S** = hours, **M** = a day or two, **L** = a week-scale project.

---

## Features / UX

### Touch-device reordering (fixes a known limitation) — M

Card reordering uses the HTML5 Drag and Drop API, which does not fire on touch
devices — the one feature mobile users lack (README/CLAUDE.md "Known limitations").

Steps:

1. Read the current implementation: `src/components/DistributionCard.tsx` is the
   only file touching `draggable`/`dataTransfer` (handle-armed dragging so card
   text stays selectable; `setData` needed for Firefox). The reorder action lives
   in `src/state/appState.ts` and is dispatched from `src/App.tsx`
2. Confirm the approach with the product owner: Pointer Events drag (better UX,
   more work) vs. move-up/down buttons (ships in an afternoon, also solves
   keyboard reordering — see the accessibility item)
3. For Pointer Events: in `DistributionCard.tsx`, replace the
   `dragstart`/`dragover`/`drop` handlers with `pointerdown` on the drag handle
   (`setPointerCapture`), `pointermove` resolving the hovered card via
   `document.elementFromPoint` against card midpoints, and `pointerup` dispatching
   the existing reorder action. Delete the `draggable` attribute and all
   `dataTransfer` code — one code path for mouse and touch
4. Add Tailwind `touch-none` on the handle so the browser doesn't hijack the
   gesture for scrolling
5. Keep URL sync untouched — the order token in `src/state/urlCodec.ts` doesn't
   care where the reorder came from
6. Verify on real devices (iOS Safari, Android Chrome) — DevTools touch emulation
   is not trustworthy for pointer events — plus a desktop mouse regression pass
7. Delete the Known-limitations bullet from README.md and CLAUDE.md; `spec-sync`
   the confirmed interaction

### CDF view toggle — M

Each card shows the PDF/PMF. A cumulative view answers questions the density
cannot ("what is P(X ≤ x)?") and is what many textbooks quiz on.

Steps:

1. `src/domain/math.ts`: implement `erf(x)` (Abramowitz–Stegun approximation is
   enough), the regularized incomplete gamma `P(a, x)` (series for small x,
   continued fraction for large), and the regularized incomplete beta `I_x(a, b)`
   (continued fraction). Work in log space like the existing helpers; add spot
   tests against known table values in `src/domain/math.test.ts`
2. `src/domain/types.ts`: add `cdf(x, params)` to `DistributionDef`
3. Implement per distribution in `src/domain/distributions/*.ts`: discrete = prefix
   sums of the PMF; normal/log-normal via `erf`; exponential closed form;
   gamma via `P(k, x/θ)`; beta via `I_x(α, β)`; binomial/negative-binomial can use
   prefix sums (simplest) or the incomplete-beta identities
4. Registry-sweeping tests alongside the existing density tests: CDF is monotone
   non-decreasing, → 0 and → 1 at the support edges; spot values (standard normal
   CDF(0) = 0.5, exponential CDF(1/λ) = 1 − 1/e)
5. `src/domain/sampling.ts`: add a CDF point-series generator reusing the PDF grid
6. State/URL: per-card toggle in `src/state/appState.ts`; new token **appended at
   the end** of each distribution's positional format in `src/state/urlCodec.ts`
   (the append-only contract — update the format comment there)
7. UI: toggle next to the histogram switch in `DistributionCard.tsx`, second
   dataset (or dataset swap) in `DistributionChart.tsx`, i18n keys
   (`ui.cdfToggle` etc.) in `src/i18n/ja.ts` first, then `en.ts`

### More distributions: uniform, chi-square, Student t, Weibull — S each

The registry design makes each one a bounded, mechanical addition.

Steps (per distribution):

1. Confirm with the product owner: placement in the learning order and the
   tagline/use-case angle. Suggested placements — uniform before bernoulli (the
   simplest distribution of all); chi-square and t after gamma (chi-square is
   gamma with k/2, 2; t motivates small-sample inference); Weibull after
   exponential (its generalization)
2. Follow `.claude/skills/add-distribution/SKILL.md`: new
   `src/domain/distributions/<id>.ts` copied from the closest existing shape,
   add the id to `DistributionId` in `types.ts`, register in `DISTRIBUTIONS` in
   `distributions/index.ts` at the confirmed position (and extend its
   learning-order comment)
3. Samplers in `src/domain/random.ts` if missing: chi-square = gamma(k/2, 2);
   t = normal / sqrt(chi-square/ν); Weibull = inverse-transform `λ(−ln U)^{1/k}`
4. i18n: `dist.<id>.name / tagline / param.<key> / usecase` in `ja.ts` then
   `en.ts` (usecase must embed parameter placeholders — spec requirement)
5. The registry-sweeping tests (density ≈ 1, sampler convergence, i18n coverage)
   pick the new entry up automatically; add spot-value tests only for the new
   math helpers

### Embed mode for lectures and blog posts — S

Teachers and bloggers are the natural amplifiers of this site, but embedding the
full app in an iframe drags the toolbar and footer along.

Steps:

1. Confirm scope with the product owner: which chrome disappears (proposal:
   Toolbar, FilterChips, FeedbackFooter, BackToTop — cards and their controls stay)
2. `src/state/urlCodec.ts`: add a global `embed` flag, omitted when off (default-
   omission rule); decode into state in `src/state/appState.ts`
3. `src/App.tsx`: skip rendering the hidden chrome when `state.embed` is set;
   verify the continuous `replaceState` URL sync round-trips the flag
4. README: add an "Embedding" section with a copy-paste snippet, e.g.
   `<iframe src="https://shin4488.github.io/probability-distribution-visualization/?normal=170,5.5&embed=1" width="480" height="520"></iframe>`
5. Verify: `?embed=1` in the dev server, plus a local HTML file iframing the dev
   server to check real iframe behavior; `spec-sync` the confirmed spec

### Accessibility pass — M

Not audited so far. Likely gaps, in rough order of user impact.

Steps:

1. Baseline: run Lighthouse (Chrome DevTools → Lighthouse → Accessibility) against
   the dev server in both themes; keep the report
2. `src/components/ParamSlider.tsx`: ensure the range input has an `aria-label`
   from the i18n param name and `aria-valuetext` (value + parameter meaning);
   the numeric twin input needs its own label association
3. Keyboard reordering: solved for free if the touch-reordering item ships with
   buttons; otherwise add visually-hidden up/down buttons to the card header
4. Contrast: check text/background and chart colors in both themes against WCAG
   AA (tokens live in `src/styles.css` under `@theme` and
   `:root[data-theme='dark']` — chart colors included, so fixes are one-line)
5. Check `HelpTip.tsx` is reachable and dismissible by keyboard (focus, Escape)
6. Re-run Lighthouse; record remaining known exceptions (if any) in this file

## Development / code quality

### Dependabot for pinned deps and hash-pinned actions — S

Exact-pinned npm deps and SHA-pinned actions are the supply-chain policy, but both
go stale silently; today updates depend on someone remembering.

Steps:

1. Create `.github/dependabot.yml`:

   ```yaml
   version: 2
   updates:
     - package-ecosystem: npm
       directory: "/"
       schedule:
         interval: weekly
       open-pull-requests-limit: 5
     - package-ecosystem: github-actions
       directory: "/"
       schedule:
         interval: weekly
   ```

2. Dependabot is GitHub-native (no npm dependency) and understands SHA pinning:
   it bumps the commit hash and the version comment together, matching the
   deploy.yml convention
3. After merging, check the repo's Insights → Dependency graph → Dependabot tab
   shows both ecosystems; the first update PRs flow through normal CI + review
4. Record the decision in docs/tech-selection.md

### Vite 6 → 7 upgrade — S

Vite is held at v6 "for compatibility with Node 20.18 on the host". But the
container already runs `node:22-alpine` (docker-compose.yml) and the host never
executes Vite — host node_modules exists only for tsserver type resolution.

Steps:

1. Verify the premise: confirm nothing on the host actually *runs* Vite (tsserver
   only reads `.d.ts`). If so, the host-Node constraint is obsolete
2. Check Vite 7's Node requirement in its release notes against the container's
   Node version (`docker compose run --rm app node --version`)
3. Upgrade inside the container:
   `docker compose run --rm app npm install --save-exact vite@<exact 7.x.y>`
   (also bump `@vitejs/plugin-react` if its peer range requires it)
4. Read the v7 migration guide for breaking changes touching this repo's config
   surface: `base: './'`, `server.host: true`, the `test` block (Vitest
   compatibility)
5. Verify beyond the gate: `docker compose up` dev-server HMR works from the
   host; `npm run build` then inspect `dist/index.html` — all asset URLs must
   still be relative (GitHub Pages subpath serving)
6. Update the Known-limitations note in README.md/CLAUDE.md and the Vite entry in
   docs/tech-selection.md

### Smoke-test the built output in CI — S

CI proves the build *succeeds* but never inspects what it produced. A base-path or
index.html regression would deploy green today.

Steps:

1. Add a step to `.github/workflows/ci.yml` and `deploy.yml` right after
   `npm run build`:

   ```yaml
   - name: Smoke-test build output
     run: |
       test -f dist/index.html
       # GitHub Pages subpath serving: absolute asset paths would 404
       ! grep -E '(src|href)="/' dist/index.html
       # GA must stay guarded by the production hostname
       grep -q "shin4488.github.io" dist/index.html
       # SEO invariants
       grep -q "<title>" dist/index.html
       [ "$(grep -c 'hreflang' dist/index.html)" -eq 3 ]
       test -f dist/robots.txt && test -f dist/sitemap.xml
   ```

2. Break it on purpose once (e.g. temporarily set `base: '/'`) to prove the step
   fails loud, then revert
3. Pure shell — no new dependency, no new action to hash-pin

### Bundle-size guard — S

The main JS bundle is ~406 KB (~137 KB gzip), dominated by Chart.js. Fine today,
but growth is invisible until someone looks.

Steps:

1. Add after the smoke-test step (same workflows):

   ```yaml
   - name: Check gzip bundle size
     run: |
       size=$(gzip -c dist/assets/index-*.js | wc -c)
       echo "main bundle gzip size: ${size} bytes"
       [ "$size" -le 163840 ]  # 160 KB — headroom over today's ~137 KB
   ```

2. If the threshold is ever hit honestly, the known lever is lazy-initializing
   Chart.js so first paint doesn't wait on it — that is design work; decide then,
   not now. Raising the number requires the same justification as adding a
   dependency: written rationale in the PR

### Component-level tests — decision needed before any work

Domain and state are well covered (49 tests); components are verified manually in
the browser. React Testing Library + jsdom would add several dev dependencies —
a real trade against the supply-chain policy.

Steps (a decision procedure, deliberately not an implementation recipe):

1. Default stance: keep pushing logic down into `src/domain/` and `src/state/`
   where vitest reaches it without a DOM — the components are intentionally thin
2. Trigger for revisiting: a regression escapes to production that manual browser
   verification missed, twice, in component-only code
3. If adopting: install `@testing-library/react`, `@testing-library/user-event`,
   `jsdom` with `--save-exact` in the container; vitest currently runs with
   `environment: 'node'` (vite.config.ts), so component test files need a
   per-file `// @vitest-environment jsdom` pragma rather than a global switch;
   record the rationale and the pinned versions in docs/tech-selection.md

## SEO / growth

### Per-distribution landing pages (prerendering) — L

The SPA is one indexable page, so it can rank for "probability distribution
visualizer" but hardly for "正規分布 シミュレーション" or "gamma distribution
interactive". Ten distributions × two languages of search demand goes uncaptured.

Steps:

1. Design first, confirm with the product owner: URL shape
   (proposal: `/<id>/` serving ja with a link to `?lang=en`, matching the
   URL-parameter language precedence), what each page contains, and whether the
   page redirects into the SPA or is a standing page linking into it
2. Write `scripts/prerender.mjs` — zero dependencies: Node 22 (already the
   container version) can import the TypeScript i18n/registry modules directly
   via `--experimental-strip-types`, so names/taglines/usecases come from the
   single source of truth instead of a copy
3. For each distribution × locale, emit `dist/<id>/index.html` from a template:
   crawlable text (name, tagline, use-case copy), per-page `<title>` and meta
   description, JSON-LD, canonical, and a prominent link into the SPA with that
   distribution's URL state (e.g. `../?normal=170,5.5&lang=ja`)
4. Hook into the build: `"build": "tsc -b && vite build && node --experimental-strip-types scripts/prerender.mjs"`
   in package.json — CI and deploy pick it up with no workflow change
5. Make the script also regenerate `sitemap.xml` (currently a static file in
   `public/`) so the new URLs are listed with hreflang alternates
6. Verify: `npm run build` in the container, open the generated pages from
   `dist/`, check every asset/link resolves relatively; after deploy, request
   indexing for a couple of pages in Search Console and watch Coverage
7. `spec-sync` the confirmed design

### Companion articles on Zenn/Qiita — S per article, recurring

The visualizer's shareable URLs make it citable: an article can deep-link the
exact chart state under discussion.

Steps (per article):

1. Pick from search demand, highest first: normal → Poisson → binomial
2. Structure: a motivating real-world question → intuition built with 2–3
   parameterized deep links into the visualizer (e.g. `?normal=170,5.5` for
   heights) → when to reach for this distribution → its neighbors in the
   learning order, each with its own link
3. Append `&utm_source=zenn&utm_medium=article&utm_campaign=<slug>` to every
   deep link — GA4 attributes arrivals automatically, no code change needed
4. After a week, check GA4 → Reports → Acquisition → Traffic acquisition for the
   utm source; fold what you learn into the next article

### Community submissions — S, one-time

A checklist, not engineering. Do this *after* embed mode or the per-distribution
pages ship — arriving traffic converts better with a deep-linkable site.

Steps:

1. Prepare one short pitch per language with a deep-linked example URL, tailored
   per venue (never the same text twice)
2. English: Show HN ("Show HN: Interactive probability distribution visualizer"),
   r/statistics, r/AskStatistics, r/dataisbeautiful — read each sub's
   self-promotion rules first; HN prefers plain descriptions over marketing
3. Japanese: 統計WEB等のリンク集への掲載依頼、統計教育系コミュニティ、X(共有URL
   のOGPカードがそのまま宣伝素材になる)
4. Log each submission (where, when, link) at the bottom of this file, and watch
   GA4 referrers for a week after each

## Operations

### Monthly analytics & feedback review — S, recurring

The instrumentation exists (GA4 custom events and the Google Form → spreadsheet).
What's missing is the habit of reading it.

Steps:

1. One-time setup: GA4 Admin → Custom definitions → register event parameters as
   custom dimensions — `distribution` (scope: event), `rating`, `topic`. Without
   this, Explore cannot break events down by parameter. Data populates from
   registration onward (not retroactively), so do this first
2. Monthly, in GA4: Reports → Engagement → Events for volumes of `param_change`,
   `feedback_rating`, `help_open`, `histogram_on`, `lang_switch`, `theme_switch`;
   Explore → Free form with event name × the custom dimensions to see *which*
   distributions get touched and the 👍/👎 ratio trend
3. Reports → Acquisition → Traffic acquisition for referrers and utm campaigns
   (article/community items above)
4. Read new Google Form rows in the linked response spreadsheet
5. Convert anything actionable into an item in this file; delete items reality
   has answered. If 👎 spikes after a release, correlate with the deploy date
   before assuming causation — the 1-day re-ask means repeat visitors re-rate
