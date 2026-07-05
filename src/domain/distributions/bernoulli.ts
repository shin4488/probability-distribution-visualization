import type { DistributionDef } from '../types';

export const bernoulli: DistributionDef = {
  id: 'bernoulli',
  kind: 'discrete',
  // デフォルトpは二項分布と同じ0.3に揃える。隣り合う2枚のカードが
  // 「同じ試行を1回だけ見るか、n回まとめて見るか」という1つの物語として読めるように
  params: [{ key: 'p', min: 0, max: 1, step: 0.01, defaultValue: 0.3 }],
  density(x, { p }) {
    const k = Math.round(x);
    if (k === 1) return p;
    if (k === 0) return 1 - p;
    return 0;
  },
  mean: ({ p }) => p,
  variance: ({ p }) => p * (1 - p),
  sample: (rng, { p }) => (rng() < p ? 1 : 0),
  plotRange: () => ({ min: 0, max: 1 }),
  notation: ({ p }, fmt) => `Bernoulli(${fmt(p)})`,
  useCaseValues({ p }) {
    return {
      pPct: p * 100,
      qPct: (1 - p) * 100,
      per100: p * 100,
    };
  },
};
