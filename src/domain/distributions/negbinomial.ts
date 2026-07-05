import { lnChoose } from '../math';
import type { DistributionDef } from '../types';

/**
 * 負の二項分布: r回目の成功が出るまでの「失敗回数」k。
 * NB(r, p) = 幾何分布Geo(p)(1回成功するまでの失敗数)をr個足し合わせたもの。
 * サンプラーもその合成をそのまま実装している(再生性)。
 */
export const negbinomial: DistributionDef = {
  id: 'negbinomial',
  kind: 'discrete',
  params: [
    { key: 'r', min: 1, max: 10, step: 1, defaultValue: 3 },
    { key: 'p', min: 0.1, max: 1, step: 0.01, defaultValue: 0.4 },
  ],
  density(x, { r, p }) {
    const k = Math.round(x);
    if (k < 0) return 0;
    // p=1では常に失敗0回(k=0に全確率)。ln(1-p)=ln(0)を避けるため直接返す
    if (p === 1) return k === 0 ? 1 : 0;
    return Math.exp(lnChoose(k + r - 1, k) + r * Math.log(p) + k * Math.log(1 - p));
  },
  mean: ({ r, p }) => (r * (1 - p)) / p,
  variance: ({ r, p }) => (r * (1 - p)) / (p * p),
  // 幾何分布(逆関数法: floor(ln(1-u)/ln(1-p)))をr回繰り返して合計する
  sample(rng, { r, p }) {
    if (p === 1) return 0;
    const lnQ = Math.log(1 - p);
    let failures = 0;
    for (let i = 0; i < r; i++) {
      failures += Math.floor(Math.log(1 - rng()) / lnQ);
    }
    return failures;
  },
  plotRange({ r, p }) {
    const mean = (r * (1 - p)) / p;
    const sd = Math.sqrt(r * (1 - p)) / p;
    return { min: 0, max: Math.ceil(mean + 4 * sd) + 1 };
  },
  notation: ({ r, p }, fmt) => `NB(${fmt(r)}, ${fmt(p)})`,
  useCaseValues({ r, p }) {
    const mean = (r * (1 - p)) / p;
    return {
      r,
      pPct: p * 100,
      mean,
      // 失敗の期待値 + 成功r回 = 期待総試行数
      totalTrials: mean + r,
    };
  },
};
