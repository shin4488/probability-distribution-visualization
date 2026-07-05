import { lnBeta } from '../math';
import { sampleStandardGamma } from '../random';
import type { DistributionDef } from '../types';

export const beta: DistributionDef = {
  id: 'beta',
  kind: 'continuous',
  params: [
    { key: 'alpha', min: 0.1, max: 10, step: 0.1, defaultValue: 2 },
    { key: 'beta', min: 0.1, max: 10, step: 0.1, defaultValue: 5 },
  ],
  density(x, { alpha, beta: b }) {
    if (x <= 0 || x >= 1) {
      // α<1やβ<1では端点で密度が発散するが、グラフ・積分の用途では0扱いで問題ない
      return 0;
    }
    return Math.exp((alpha - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - lnBeta(alpha, b));
  },
  mean: ({ alpha, beta: b }) => alpha / (alpha + b),
  variance: ({ alpha, beta: b }) => (alpha * b) / ((alpha + b) * (alpha + b) * (alpha + b + 1)),
  // Beta(α,β) = X/(X+Y), X~Gamma(α), Y~Gamma(β) の関係を使う
  sample(rng, { alpha, beta: b }) {
    const x = sampleStandardGamma(rng, alpha);
    const y = sampleStandardGamma(rng, b);
    return x / (x + y);
  },
  plotRange: () => ({ min: 0, max: 1 }),
  notation: ({ alpha, beta: b }, fmt) => `Beta(${fmt(alpha)}, ${fmt(b)})`,
  useCaseValues({ alpha, beta: b }) {
    return {
      alpha,
      beta: b,
      // Beta(α,β)は「成功α-1回・失敗β-1回を観測した後の成功率の信念」と読める
      successes: Math.max(0, Math.round(alpha - 1)),
      failures: Math.max(0, Math.round(b - 1)),
      meanPct: (alpha / (alpha + b)) * 100,
    };
  },
};
