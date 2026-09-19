---
name: add-distribution
description: Add a probability distribution, its registry entry, translations, and verification.
---

# Adding a new probability distribution

Each distribution lives in one domain file and uses the shared UI.

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

```
dist.<id>.name          distribution name
dist.<id>.tagline       one-line description: generic/abstract, including how it
                        relates to other distributions (derivation/limit/composition)
dist.<id>.param.<key>   label per parameter (include the symbol, e.g. 'Mean μ')
dist.<id>.usecase       use-case text: concrete/practical scenarios;
                        {placeholders} are keys of useCaseValues()
```

ja.ts is the source of truth; en.ts uses `satisfies`, so **a missing key is a compile error** (the type error points at the omission).

The usecase text must always include both a concrete everyday/work scenario and concrete numbers computed from the current parameter values.

## 4. Verify

```bash
docker compose run --rm app sh -c "npm run typecheck && npm test"
```

The existing tests automatically sweep the whole registry:

- sum/integral of the density ≈ 1 (math.test.ts)
- sample mean/variance of the sampler converges to theory (random.test.ts)

Add spot checks against independently known values (e.g. `P(X=2) = 0.375`) and any boundaries the registry-wide tests do not cover. Avoid duplicating those sweeps.

Also run the required lint and build checks from the root guide. Then run `docker compose up` and visually check the new card's chart, histogram, use-case text, and URL sharing (`?<id>=...`).
