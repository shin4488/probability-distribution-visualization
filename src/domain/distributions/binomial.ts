import { lnChoose } from '../math';
import type { DistributionDef } from '../types';

export const binomial: DistributionDef = {
  id: 'binomial',
  kind: 'discrete',
  params: [
    { key: 'n', min: 1, max: 100, step: 1, defaultValue: 20 },
    { key: 'p', min: 0, max: 1, step: 0.01, defaultValue: 0.3 },
  ],
  density(x, { n, p }) {
    const k = Math.round(x);
    if (k < 0 || k > n) return 0;
    // p=0, p=1で ln(0) が出ないよう端は直接返す
    if (p === 0) return k === 0 ? 1 : 0;
    if (p === 1) return k === n ? 1 : 0;
    return Math.exp(lnChoose(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
  },
  mean: ({ n, p }) => n * p,
  variance: ({ n, p }) => n * p * (1 - p),
  // nは高々100なのでベルヌーイ試行の合計で十分速い
  sample(rng, { n, p }) {
    let successes = 0;
    for (let i = 0; i < n; i++) {
      if (rng() < p) successes += 1;
    }
    return successes;
  },
  plotRange: ({ n }) => ({ min: 0, max: n }),
  notation: ({ n, p }, fmt) => `B(${fmt(n)}, ${fmt(p)})`,
  useCaseValues({ n, p }) {
    const sd = Math.sqrt(n * p * (1 - p));
    return {
      n,
      pPct: p * 100,
      mean: n * p,
      // 「だいたいこの範囲」として平均±2σ(約95%)を例文に使う
      lo: Math.max(0, Math.floor(n * p - 2 * sd)),
      hi: Math.min(n, Math.ceil(n * p + 2 * sd)),
    };
  },
};
