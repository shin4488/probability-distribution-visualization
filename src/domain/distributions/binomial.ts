import { lnChoose } from '../math';
import type { DistributionDef } from '../types';

function pmf(k: number, n: number, p: number): number {
  if (k < 0 || k > n) return 0;
  // p=0, p=1で ln(0) が出ないよう端は直接返す
  if (p === 0) return k === 0 ? 1 : 0;
  if (p === 1) return k === n ? 1 : 0;
  return Math.exp(lnChoose(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
}

export const binomial: DistributionDef = {
  id: 'binomial',
  kind: 'discrete',
  params: [
    { key: 'n', min: 1, max: 100, step: 1, defaultValue: 20 },
    { key: 'p', min: 0, max: 1, step: 0.01, defaultValue: 0.3 },
  ],
  density: (x, { n, p }) => pmf(Math.round(x), n, p),
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
    // 「だいたいこの範囲」として、平均±2σを外側の整数に丸めた範囲を例文に使う。
    // 丸めと離散性のため範囲に入る確率は95%にならないので、実際の確率を計算して示す
    const lo = Math.max(0, Math.floor(n * p - 2 * sd));
    const hi = Math.min(n, Math.ceil(n * p + 2 * sd));
    let rangeProbability = 0;
    for (let k = lo; k <= hi; k++) {
      rangeProbability += pmf(k, n, p);
    }
    return {
      n,
      pPct: p * 100,
      mean: n * p,
      lo,
      hi,
      rangePct: rangeProbability * 100,
    };
  },
};
