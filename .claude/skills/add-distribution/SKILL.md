---
name: add-distribution
description: Procedure for adding a new probability distribution to this project. Use when the user asks to "add the ~ distribution".
---

# Adding a new probability distribution

In this project one distribution = one file, and no UI code changes are needed. The whole task is these 4 steps.

## 1. Write the domain definition

Create `src/domain/distributions/<id>.ts` implementing `DistributionDef` (src/domain/types.ts).
Use `normal.ts` as the template for a continuous distribution, `poisson.ts` for a discrete one.

Rules:

- **Do probability math in log space**: products of factorials, gamma functions, and powers overflow double precision, so use `lnGamma`/`lnChoose`/`lnBeta` from `math.ts` and write `Math.exp(ln...)`
- **`sample` must use only the `Rng` argument (the uniform random source)**. Never call `Math.random()` directly (it breaks seed reproducibility). First check whether existing samplers (`sampleStandardNormal`/`sampleStandardGamma`/`samplePoisson`) can be composed
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
dist.<id>.tagline       one-line description
dist.<id>.param.<key>   label per parameter (include the symbol, e.g. 'Mean μ')
dist.<id>.usecase       use-case text; {placeholders} are keys of useCaseValues()
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

The only tests you should add are 1–2 spot checks against known values (e.g. `P(X=2) = 0.375`).

Finally run `docker compose up` and visually check the new card's chart, histogram, use-case text, and URL sharing (`?<id>=...`).
