import { describe, expect, it } from 'vitest';
import { DISTRIBUTIONS, getDistribution } from './distributions';
import { lnBeta, lnChoose, lnGamma } from './math';
import { defaultParams } from './types';

describe('lnGamma', () => {
  it('整数でΓ(n) = (n-1)!に一致する', () => {
    expect(Math.exp(lnGamma(5))).toBeCloseTo(24, 8); // 4! = 24
    expect(Math.exp(lnGamma(10))).toBeCloseTo(362880, 2); // 9!
  });

  it('Γ(1/2) = √π', () => {
    expect(Math.exp(lnGamma(0.5))).toBeCloseTo(Math.sqrt(Math.PI), 10);
  });
});

describe('lnChoose', () => {
  it('C(10, 3) = 120', () => {
    expect(Math.exp(lnChoose(10, 3))).toBeCloseTo(120, 8);
  });
});

describe('lnBeta', () => {
  it('B(2, 3) = 1/12', () => {
    expect(Math.exp(lnBeta(2, 3))).toBeCloseTo(1 / 12, 10);
  });
});

describe('density（既知の値との突き合わせ）', () => {
  it('標準正規分布の密度は x=0 で 1/√(2π)', () => {
    const normal = getDistribution('normal');
    expect(normal.density(0, { mu: 0, sigma: 1 })).toBeCloseTo(1 / Math.sqrt(2 * Math.PI), 10);
  });

  it('二項分布 B(4, 0.5) の P(X=2) = 0.375', () => {
    const binomial = getDistribution('binomial');
    expect(binomial.density(2, { n: 4, p: 0.5 })).toBeCloseTo(0.375, 10);
  });

  it('二項分布は p=0, p=1 の端でも壊れない', () => {
    const binomial = getDistribution('binomial');
    expect(binomial.density(0, { n: 10, p: 0 })).toBe(1);
    expect(binomial.density(10, { n: 10, p: 1 })).toBe(1);
    expect(binomial.density(5, { n: 10, p: 0 })).toBe(0);
  });

  it('ポアソン分布の P(X=0) = e^(-λ)', () => {
    const poisson = getDistribution('poisson');
    expect(poisson.density(0, { lambda: 3 })).toBeCloseTo(Math.exp(-3), 10);
  });

  it('指数分布の密度は x=0 で λ', () => {
    const exponential = getDistribution('exponential');
    expect(exponential.density(0, { lambda: 2.5 })).toBeCloseTo(2.5, 10);
  });

  it('負の二項分布 NB(2, 0.5) の P(X=1) = 0.25', () => {
    const negbinomial = getDistribution('negbinomial');
    // C(2,1) * 0.5^2 * 0.5^1 = 2 * 0.125
    expect(negbinomial.density(1, { r: 2, p: 0.5 })).toBeCloseTo(0.25, 10);
  });

  it('負の二項分布は p=1 で全確率がk=0に集中する', () => {
    const negbinomial = getDistribution('negbinomial');
    expect(negbinomial.density(0, { r: 3, p: 1 })).toBe(1);
    expect(negbinomial.density(1, { r: 3, p: 1 })).toBe(0);
  });

  it('Beta(2,2)の密度は x=0.5 で 1.5', () => {
    const beta = getDistribution('beta');
    expect(beta.density(0.5, { alpha: 2, beta: 2 })).toBeCloseTo(1.5, 10);
  });
});

describe('全分布の密度の合計・積分がほぼ1になる', () => {
  for (const def of DISTRIBUTIONS) {
    it(def.id, () => {
      const params = defaultParams(def);
      const { min, max } = def.plotRange(params);
      if (def.kind === 'discrete') {
        let total = 0;
        for (let k = Math.floor(min); k <= Math.ceil(max); k++) {
          total += def.density(k, params);
        }
        expect(total).toBeGreaterThan(0.99);
        expect(total).toBeLessThanOrEqual(1.000001);
      } else {
        // 台形則。plotRangeは裾を少し切るので0.98以上なら妥当
        const steps = 2000;
        const h = (max - min) / steps;
        let total = 0;
        for (let i = 0; i <= steps; i++) {
          const x = min + i * h;
          const w = i === 0 || i === steps ? 0.5 : 1;
          total += w * def.density(x, params) * h;
        }
        expect(total).toBeGreaterThan(0.98);
        expect(total).toBeLessThanOrEqual(1.000001);
      }
    });
  }
});
