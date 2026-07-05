import { sampleStandardNormal } from '../random';
import type { DistributionDef } from '../types';

export const normal: DistributionDef = {
  id: 'normal',
  kind: 'continuous',
  params: [
    { key: 'mu', min: -10, max: 10, step: 0.1, defaultValue: 0 },
    { key: 'sigma', min: 0.1, max: 5, step: 0.1, defaultValue: 1 },
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
