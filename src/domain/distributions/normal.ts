import { sampleStandardNormal } from '../random';
import type { DistributionDef } from '../types';

export const normal: DistributionDef = {
  id: 'normal',
  kind: 'continuous',
  // デフォルトは標準正規分布N(0,1)ではなく「テストの点数」として現実的なN(60, 10²)。
  // 活用例には現在のパラメータ値がそのまま埋め込まれるため、初期表示で
  // 「平均60点・標準偏差10点なら約68%が50〜70点」という実感の湧く文章になる
  params: [
    { key: 'mu', min: 0, max: 100, step: 1, defaultValue: 60 },
    { key: 'sigma', min: 1, max: 30, step: 1, defaultValue: 10 },
  ],
  density(x, { mu, sigma }) {
    const z = (x - mu) / sigma;
    return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
  },
  mean: ({ mu }) => mu,
  variance: ({ sigma }) => sigma * sigma,
  sample: (rng, { mu, sigma }) => mu + sigma * sampleStandardNormal(rng),
  // ±4σで密度の99.99%をカバーできる
  plotRange: ({ mu, sigma }) => ({ min: mu - 4 * sigma, max: mu + 4 * sigma }),
  notation: ({ mu, sigma }, fmt) => `N(${fmt(mu)}, ${fmt(sigma)}²)`,
  useCaseValues({ mu, sigma }) {
    return {
      mu,
      sigma,
      // 68-95ルール: ±1σに約68%、±2σに約95%が収まる
      lo1: mu - sigma,
      hi1: mu + sigma,
      lo2: mu - 2 * sigma,
      hi2: mu + 2 * sigma,
    };
  },
};
