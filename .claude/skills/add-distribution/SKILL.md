---
name: add-distribution
description: Add a probability distribution, its registry entry, translations, use-case guide entry, and verification.
---

# Adding a new probability distribution

Each distribution's math lives in one domain file, and its chart card uses the shared UI. Only the use-case guide needs a per-distribution case and illustration (step 4).

## 1. Write the domain definition

Create `src/domain/distributions/<id>.ts` implementing `DistributionDef` (src/domain/types.ts).
Use `normal.ts` as the template for a continuous distribution, `poisson.ts` for a discrete one.

Rules:

- **Do probability math in log space**: products of factorials, gamma functions, and powers overflow double precision, so use `lnGamma`/`lnChoose`/`lnBeta` from `math.ts` and write `Math.exp(ln...)`
- **`sample` must use only the `Rng` argument (the uniform random source)**. Never call `Math.random()` directly (it breaks seed reproducibility). First check whether existing samplers (`sampleStandardNormal`/`sampleStandardGamma`/`samplePoisson`/`sampleGeometric`) can be composed
- **`plotRange` must cover at least 99% of the distribution** (e.g. mean ± 4σ). For heavy right tails use a quantile-based range (see lognormal.ts)
- **`useCaseValues`** returns derived values interpolated into the use-case text. Embedding "concrete numbers computed from the current parameters" is this site's core concept (a spec requirement)
- Keep each parameter's `min`/`max`/`step` within a range where dragging the slider produces a visible change in shape

## 2. Register it

- Add the id to the `DistributionId` union in `src/domain/types.ts`
- Add it to the `DISTRIBUTIONS` array in `src/domain/distributions/index.ts`. **Array position = default display order = the order statistics is learned.** Insert it after its prerequisite distributions and near those it is derived from or composed with, and update the ordering comment in index.ts

## 3. Add the 4 i18n keys

To both `src/i18n/ja.ts` and `src/i18n/en.ts`:

| Key | Content |
| --- | --- |
| `dist.<id>.name` | Distribution name |
| `dist.<id>.tagline` | One-line generic/abstract description, including how it relates to other distributions (derivation, limit, or composition) |
| `dist.<id>.param.<key>` | Label for each parameter, including the symbol (e.g. `Mean μ`) |
| `dist.<id>.usecase` | Concrete, practical scenarios. `{placeholders}` are keys of `useCaseValues()` |

ja.ts defines the keys; en.ts uses `satisfies`, so **a key missing from en.ts is a compile error** (the type error points at the omission). Keys missing from both files are caught by `i18n.test.ts`.

The usecase text must always include both a concrete everyday/work scenario and concrete numbers computed from the current parameter values.

## 4. Add a use-case guide entry

- Add `{ id, category, alternative }` to `GUIDE_CASES` in `src/guide/catalog.ts`. Every distribution needs a case, and every alternative must point to an existing case.
- Add `guide.case.<id>.title` / `summary` / `why` / `conditions` / `caution` / `alternative` and `guide.scene.<id>` to `src/i18n/guide.ja.ts` and `src/i18n/guide.en.ts`. The guide builds these keys from `DistributionId`, so a missing key is a type error.
- Draw the schematic illustration for `<id>` in `src/components/CaseIllustration.tsx`.

## 5. Verify

```bash
docker compose run --rm app sh -c "npm run typecheck && npm test"
```

The existing tests automatically sweep the whole registry:

- sum/integral of the density ≈ 1 (math.test.ts)
- sample mean/variance of the sampler converges to theory (random.test.ts)
- the `dist.<id>.*` keys exist in both languages, and every use-case placeholder exists in `useCaseValues()` (i18n.test.ts)
- every distribution has a guide case and every alternative exists (appState.test.ts)

Add spot checks against independently known values (e.g. `P(X=2) = 0.375`) and any boundaries the registry-wide tests do not cover. Avoid duplicating those sweeps.

Also run the required lint and build checks from the root guide. Then run `docker compose up` and visually check the new card's chart, histogram, use-case text, URL sharing (`?<id>=...`), and its guide case.
