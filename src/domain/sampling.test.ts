import { describe, expect, it } from 'vitest';
import { getDistribution } from './distributions';
import { buildDensityPoints, buildHistogram } from './sampling';

describe('標本ヒストグラム', () => {
  it('連続分布では密度として集計し、理論曲線と同じ縦軸で面積がほぼ1になる', () => {
    const normal = getDistribution('normal');
    // N(60, 10²)の描画範囲は平均±4σ(20〜100)で、確率の99.99%以上が入る
    const { bins } = buildHistogram(normal, { mu: 60, sigma: 10 }, 10000, 1);
    const binWidth = bins[1].center - bins[0].center;
    const area = bins.reduce((sum, bin) => sum + bin.height * binWidth, 0);
    expect(area).toBeGreaterThan(0.99);
    expect(area).toBeLessThanOrEqual(1.000001);
  });

  it('離散分布では整数ごとの相対度数にし、合計が1になる', () => {
    const binomial = getDistribution('binomial');
    const { bins } = buildHistogram(binomial, { n: 20, p: 0.3 }, 1000, 1);
    expect(bins.map((bin) => bin.center)).toEqual(Array.from({ length: 21 }, (_, k) => k));
    expect(bins.reduce((sum, bin) => sum + bin.height, 0)).toBeCloseTo(1, 10);
  });

  it('同じシードなら同じ標本になり、シードを変えると標本が変わる', () => {
    const poisson = getDistribution('poisson');
    const first = buildHistogram(poisson, { lambda: 4 }, 1000, 42);
    expect(buildHistogram(poisson, { lambda: 4 }, 1000, 42)).toEqual(first);
    expect(buildHistogram(poisson, { lambda: 4 }, 1000, 43)).not.toEqual(first);
  });
});

describe('理論曲線の点列', () => {
  it('端点で密度が発散するベータ分布でも、端点の値は0に落ちず有限の大きな値になる', () => {
    const beta = getDistribution('beta');
    const points = buildDensityPoints(beta, { alpha: 0.5, beta: 0.5 });
    const first = points[0];
    const last = points[points.length - 1];
    expect(first.x).toBe(0);
    expect(last.x).toBe(1);
    expect(points.every((point) => Number.isFinite(point.y))).toBe(true);
    // Beta(0.5, 0.5)はU字型なので、端点は内側の隣の点より高い
    expect(first.y).toBeGreaterThan(points[1].y);
    expect(last.y).toBeGreaterThan(points[points.length - 2].y);
  });
});
