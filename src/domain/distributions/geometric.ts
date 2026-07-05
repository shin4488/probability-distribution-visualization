import { sampleGeometric } from '../random';
import type { DistributionDef } from '../types';

/**
 * 幾何分布: 最初の成功が出るまでの「失敗回数」k(k = 0, 1, 2, ...の規約を採用)。
 * 指数分布の離散版にあたり、負の二項分布のr=1の特別な場合でもある。
 */
export const geometric: DistributionDef = {
  id: 'geometric',
  kind: 'discrete',
  params: [{ key: 'p', min: 0.1, max: 1, step: 0.01, defaultValue: 0.3 }],
  density(x, { p }) {
    const k = Math.round(x);
    if (k < 0) return 0;
    // p=1では常に失敗0回(k=0に全確率)
    if (p === 1) return k === 0 ? 1 : 0;
    return p * (1 - p) ** k;
  },
  mean: ({ p }) => (1 - p) / p,
  variance: ({ p }) => (1 - p) / (p * p),
  sample: (rng, { p }) => sampleGeometric(rng, p),
  plotRange({ p }) {
    const mean = (1 - p) / p;
    const sd = Math.sqrt(1 - p) / p;
    return { min: 0, max: Math.ceil(mean + 4 * sd) + 1 };
  },
  notation: ({ p }, fmt) => `Geo(${fmt(p)})`,
  useCaseValues({ p }) {
    const mean = (1 - p) / p;
    // 例文用: 平均の2倍を超えて外れ続ける確率 P(X ≥ k) = (1-p)^k
    const streak = Math.max(1, Math.ceil(2 * (mean + 1)));
    return {
      pPct: p * 100,
      mean,
      trials: mean + 1,
      streak,
      streakPct: (1 - p) ** streak * 100,
    };
  },
};
