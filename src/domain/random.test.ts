import { describe, expect, it } from 'vitest';
import { DISTRIBUTIONS } from './distributions';
import { mulberry32 } from './random';
import type { DistributionId, ParamValues } from './types';

describe('mulberry32', () => {
  it('同じシードから同じ列を生成する(ヒストグラムの再現性の前提)', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 100; i++) {
      expect(a()).toBe(b());
    }
  });

  it('[0, 1)の範囲に収まる', () => {
    const rng = mulberry32(7);
    for (let i = 0; i < 10000; i++) {
      const u = rng();
      expect(u).toBeGreaterThanOrEqual(0);
      expect(u).toBeLessThan(1);
    }
  });
});

/**
 * 平均・分散の理論値。教科書の公式から手で計算した値で、scipy.statsのmean()/var()とも一致する。
 * パラメータは、取り違えやすい式(λと1/λ、shapeとscale、失敗回数と試行回数など)で値が変わるように選ぶ。
 * キーをDistributionIdにしているため、分布を追加するとこの表の不足が型エラーになる。
 */
const KNOWN_MOMENTS: Record<
  DistributionId,
  { label: string; params: ParamValues; mean: number; variance: number }
> = {
  // 平均p、分散p(1-p)
  bernoulli: { label: 'Bernoulli(0.3)', params: { p: 0.3 }, mean: 0.3, variance: 0.21 },
  // 平均np、分散np(1-p)
  binomial: { label: 'B(20, 0.3)', params: { n: 20, p: 0.3 }, mean: 6, variance: 4.2 },
  // 平均・分散ともにλ
  poisson: { label: 'Po(4)', params: { lambda: 4 }, mean: 4, variance: 4 },
  // 最初の成功までの失敗回数: 平均(1-p)/p、分散(1-p)/p²
  geometric: { label: 'Geo(0.25)', params: { p: 0.25 }, mean: 3, variance: 12 },
  // r回目の成功までの失敗回数: 平均r(1-p)/p、分散r(1-p)/p²
  negbinomial: { label: 'NB(3, 0.4)', params: { r: 3, p: 0.4 }, mean: 4.5, variance: 11.25 },
  normal: { label: 'N(60, 10²)', params: { mu: 60, sigma: 10 }, mean: 60, variance: 100 },
  // 平均e^(μ+σ²/2) = e^1.125、分散(e^(σ²)-1)e^(2μ+σ²) = (e^0.25-1)e^2.25
  lognormal: {
    label: 'LogN(1, 0.5²)',
    params: { mu: 1, sigma: 0.5 },
    mean: 3.080216848918031,
    variance: 2.694758124344946,
  },
  // 平均1/λ、分散1/λ²
  exponential: { label: 'Exp(2)', params: { lambda: 2 }, mean: 0.5, variance: 0.25 },
  // shape k・scale θ: 平均kθ、分散kθ²
  gamma: { label: 'Gamma(3, 2)', params: { shape: 3, scale: 2 }, mean: 6, variance: 12 },
  // 平均α/(α+β)、分散αβ/((α+β)²(α+β+1))
  beta: { label: 'Beta(2, 5)', params: { alpha: 2, beta: 5 }, mean: 2 / 7, variance: 10 / 392 },
};

describe('カードに表示する平均・分散が理論値に一致する', () => {
  for (const def of DISTRIBUTIONS) {
    const known = KNOWN_MOMENTS[def.id];
    it(known.label, () => {
      expect(def.mean(known.params)).toBeCloseTo(known.mean, 10);
      expect(def.variance(known.params)).toBeCloseTo(known.variance, 10);
    });
  }
});

describe('サンプラーの標本平均・分散が理論値に収束する', () => {
  const SAMPLE_COUNT = 40000;

  for (const def of DISTRIBUTIONS) {
    const known = KNOWN_MOMENTS[def.id];
    it(known.label, () => {
      const rng = mulberry32(20260705);
      let sum = 0;
      let sumSq = 0;
      for (let i = 0; i < SAMPLE_COUNT; i++) {
        const x = def.sample(rng, known.params);
        sum += x;
        sumSq += x * x;
      }
      const sampleMean = sum / SAMPLE_COUNT;
      const sampleVar = sumSq / SAMPLE_COUNT - sampleMean * sampleMean;

      // 標本平均の標準誤差はsd/√n。5σならフレーク率は無視できる
      const tolerance = (5 * Math.sqrt(known.variance)) / Math.sqrt(SAMPLE_COUNT);
      expect(Math.abs(sampleMean - known.mean)).toBeLessThan(tolerance);
      // 分散は精度が出にくいため相対15%の緩い検査に留める
      expect(sampleVar).toBeGreaterThan(known.variance * 0.85);
      expect(sampleVar).toBeLessThan(known.variance * 1.15);
    });
  }
});
