# Technology selection record

## Constraints (from [specification.md](specification.md))

- Use TypeScript
- Choose technology so as to avoid damage from npm supply-chain attacks
- Make the site fast to render
- Design for loose coupling and high cohesion

"Avoid npm supply-chain damage" was operationalized as:

1. **Keep direct dependencies to a minimum** (only 3 runtime dependencies)
2. **Pin versions exactly** (`--save-exact`) and commit `package-lock.json`
3. **Prefer packages maintained by large organizations with many users and watchers** (compromises are detected fastest there)
4. Run `npm install` **only inside the Docker container**, isolating the host environment

## Framework

| Candidate | Assessment |
|---|---|
| **React (chosen)** | Runtime dependencies are just `react`/`react-dom`, maintained by Meta. Among the most heavily watched packages on npm, so supply-chain problems are detected fastest. Largest ecosystem and body of documentation |
| Preact | Attractive at 3KB with zero dependencies, but passed over due to the debugging cost of subtle differences in the React-compat layer and the smaller body of documentation |
| Svelte | Small runtime, but its compiler devDependency tree is comparatively large. At this site's scale the performance difference vs React is imperceptible |
| Vue | Technically sufficient. React vs Vue is a toss-up; React was chosen for its simpler dependency footprint |
| Plain TS + Vite | Minimal dependencies, but hand-writing state synchronization for 8 cards (URL, theme, language, ordering) is not worth the cost and maintenance burden |

Build tool: **Vite** (the de-facto standard; devDependency only, never ships at runtime).
Pinned to Vite 6 so it runs on both Node 20.18 (local host) and Node 22 (container).

## Charting library (requirement: evaluate multiple candidates and record the rationale)

| Candidate | Size (gzip) | Dependencies | Assessment |
|---|---|---|---|
| **Chart.js (chosen)** | ~60KB | only `@kurkle/color` | Canvas rendering keeps up with slider dragging. Tree-shakable: only the components you register are bundled. Mixing/overlaying line (PDF) and bar (PMF/histogram) charts is built in. Millions of weekly downloads means heavy scrutiny |
| D3 | varies | many d3-* micro-packages | Maximum flexibility, but sharply increases the number of direct dependencies, against the minimal-dependency policy. Building axes, tooltips, etc. by hand is also excessive effort |
| ECharts | ~320KB | zrender | Feature-rich but the bundle is large, hurting the initial-render speed requirement. Everything this site needs is covered by Chart.js |
| Plotly.js | >1MB | many | Powerful statistical charts, but an order of magnitude larger, and weaker at real-time parameter interaction |
| uPlot | ~12KB | zero | The lightest and fastest — the strongest challenger. But its API is low-level: overlaid bars, tooltips, and axis handling would have to be hand-built, trading more code and bug surface |
| Hand-rolled SVG | 0 | zero | Zero dependencies, but implementing and maintaining tooltips, resize handling, and axis ticks is effort spent off the core problem |

**Summary of the decision**: Chart.js best fits the requirements on four counts: effectively a single dependency, canvas update performance, built-in PDF-line + histogram-bar overlays, and heavy community scrutiny.
If bundle size were the top priority uPlot would win, but Chart.js was chosen for the balance of implementation effort and maintainability.

Measured (vite build): ~389KB total JS (~131KB gzip), essentially all React + Chart.js.
Tree shaking is enabled by registering only the chart components in use via `Chart.register()`.

## CSS / styling

| Candidate | Assessment |
|---|---|
| **Tailwind CSS v4 (chosen)** | Utility classes co-located with the markup, so there is almost no hand-written CSS to maintain. devDependency only — nothing ships at runtime beyond the generated CSS, and unused utilities are never emitted. v4 exposes `@theme` tokens as native CSS variables, which keeps this project's theming mechanism intact: dark mode still just overrides variables under `[data-theme='dark']`, and Chart.js still reads `--chart-*` via getComputedStyle |
| Hand-written CSS (initial choice) | Zero dependencies — the initial pick under the supply-chain-minimization policy. Rejected on review: a growing stylesheet of bespoke class names is harder to maintain, and styles live far from the markup they affect |
| CSS Modules | Solves scoping but everything is still hand-written CSS; maintainability gain is small |
| Component libraries (MUI, Mantine, ...) | Large runtime dependency trees — directly against the dependency-minimization policy, and heavier bundles |

The remaining [src/styles.css](../src/styles.css) contains only design tokens (colors, shadow, fonts), the dark-theme variable overrides, and a minimal `body` base — no layout/component CSS.

## Linter / formatter

| Candidate | Assessment |
|---|---|
| **Biome (chosen)** | Lint and format in a single package. A single Rust binary with **zero transitive npm dependencies** (platform binaries ship as optionalDependencies). Fast, and `--write` auto-fixes are labeled by safety. Best fit for the npm-supply-chain-minimization policy |
| ESLint + Prettier | The de-facto standard with the largest body of documentation, but typescript-eslint, assorted plugins, and Prettier add **dozens of packages**, plus multiple config files |
| oxlint | Fast, but lint-only (a separate formatter is needed) and its rule set is less mature than Biome's |

Configuration lives in [biome.json](../biome.json). `npm run lint` (check) / `npm run lint:fix` (auto-fix) / `npm run format` (format). CI runs `lint` as well.

## Pinning GitHub Actions to commit hashes

Actions used in workflows are pinned to **commit hashes**, not tags like `@v4` (a confirmed requirement in [specification.md](specification.md)).
Tags can be re-pointed to a different commit later, so tag pinning can execute tampered code if the upstream is compromised.
See the comment at the top of [deploy.yml](../.github/workflows/deploy.yml) for how to look up the hashes.

## Deliberately hand-rolled pieces

Implemented without external libraries (each fits in a few dozen lines, not worth another dependency):

- **i18n**: dictionary objects + `{placeholder}` interpolation ([src/i18n/index.ts](../src/i18n/index.ts)). Missing keys are caught at compile time via TypeScript's `satisfies`
- **Drag-and-drop reordering**: HTML5 Drag and Drop API (libraries like dnd-kit would cover this, but add dependencies)
- **URL state sync**: `URLSearchParams` + `history.replaceState`
- **RNG & samplers**: mulberry32 (seedable) + Box-Muller / Marsaglia-Tsang / Knuth methods. Statistics libraries (jstat etc.) are weakly maintained and were not adopted

## Known trade-offs

- HTML5 drag-and-drop does not work on touch devices (no reordering on touch; browsing and parameter controls are unaffected)
- The RNG is not cryptographic quality (fine for visualization; a fixed seed prioritizes reproducibility)
