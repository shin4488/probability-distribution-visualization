import { describe, expect, it } from 'vitest';
import { DISTRIBUTIONS } from './distributions';
import { mulberry32 } from './random';
import { defaultParams } from './types';

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

describe('サンプラーの標本平均・分散が理論値に収束する', () => {
  const SAMPLE_COUNT = 40000;

  for (const def of DISTRIBUTIONS) {
    it(def.id, () => {
      const params = defaultParams(def);
      const rng = mulberry32(20260705);
      let sum = 0;
      let sumSq = 0;
      for (let i = 0; i < SAMPLE_COUNT; i++) {
        const x = def.sample(rng, params);
        sum += x;
        sumSq += x * x;
      }
      const sampleMean = sum / SAMPLE_COUNT;
      const sampleVar = sumSq / SAMPLE_COUNT - sampleMean * sampleMean;

      const mean = def.mean(params);
      const sd = Math.sqrt(def.variance(params));
      // 標本平均の標準誤差はsd/√n。5σならフレーク率は無視できる
      const tolerance = (5 * sd) / Math.sqrt(SAMPLE_COUNT);
      expect(Math.abs(sampleMean - mean)).toBeLessThan(tolerance);
      // 分散は精度が出にくいため相対15%の緩い検査に留める
      expect(sampleVar).toBeGreaterThan(def.variance(params) * 0.85);
      expect(sampleVar).toBeLessThan(def.variance(params) * 1.15);
    });
  }
});
