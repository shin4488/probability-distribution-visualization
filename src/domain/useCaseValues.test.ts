import { describe, expect, it } from 'vitest';
import { getDistribution } from './distributions';

describe('活用例に埋め込む確率', () => {
  it('二項分布: 例文の範囲に収まる確率は、その範囲の二項確率の合計に一致する', () => {
    const binomial = getDistribution('binomial');
    // 期待値はscipy.stats.binomのcdfで計算した P(lo ≤ X ≤ hi)
    const cases = [
      { params: { n: 20, p: 0.3 }, lo: 1, hi: 11, pct: 99.40639158019026 },
      { params: { n: 100, p: 0.5 }, lo: 40, hi: 60, pct: 96.47997997822952 },
    ];
    for (const { params, lo, hi, pct } of cases) {
      // biome-ignore lint/correctness/useHookAtTopLevel: useCaseValuesはuse接頭辞だがReactフックではない
      const values = binomial.useCaseValues(params);
      expect(values.lo).toBe(lo);
      expect(values.hi).toBe(hi);
      expect(values.rangePct).toBeCloseTo(pct, 8);
    }
  });
});
