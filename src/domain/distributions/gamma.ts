import { lnGamma } from '../math';
import { sampleStandardGamma } from '../random';
import type { DistributionDef } from '../types';

// shape-scale(k, θ)パラメータ化を採用。「1件平均θ分の作業がk件終わるまでの時間」
// という活用例の読み方が最も直感的になるため(rateパラメータ化より説明しやすい)
export const gamma: DistributionDef = {
  id: 'gamma',
  kind: 'continuous',
  params: [
    { key: 'shape', min: 0.1, max: 20, step: 0.1, defaultValue: 2 },
    { key: 'scale', min: 0.1, max: 5, step: 0.1, defaultValue: 2 },
  ],
  density(x, { shape, scale }) {
    if (x <= 0) return 0;
    return Math.exp(
      (shape - 1) * Math.log(x) - x / scale - lnGamma(shape) - shape * Math.log(scale),
    );
  },
  mean: ({ shape, scale }) => shape * scale,
  variance: ({ shape, scale }) => shape * scale * scale,
  sample: (rng, { shape, scale }) => sampleStandardGamma(rng, shape) * scale,
  plotRange({ shape, scale }) {
    const mean = shape * scale;
    const sd = Math.sqrt(shape) * scale;
    return { min: 0, max: mean + 4 * sd };
  },
  notation: ({ shape, scale }, fmt) => `Gamma(${fmt(shape)}, ${fmt(scale)})`,
  useCaseValues({ shape, scale }) {
    return {
      shape,
      scale,
      // 例文は「k={shape}件分」と生の値を使う。丸めた整数を使うと
      // k×θと{mean}が食い違う(shape=2.5, θ=2で「3件×2分=平均5分」)ため
      mean: shape * scale,
      sd: Math.sqrt(shape) * scale,
    };
  },
};
