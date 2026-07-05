import { sampleStandardNormal } from '../random';
import type { DistributionDef } from '../types';

export const lognormal: DistributionDef = {
  id: 'lognormal',
  kind: 'continuous',
  params: [
    { key: 'mu', min: -1, max: 3, step: 0.1, defaultValue: 0 },
    { key: 'sigma', min: 0.1, max: 1.5, step: 0.05, defaultValue: 0.5 },
  ],
  density(x, { mu, sigma }) {
    if (x <= 0) return 0;
    const z = (Math.log(x) - mu) / sigma;
    return Math.exp(-0.5 * z * z) / (x * sigma * Math.sqrt(2 * Math.PI));
  },
  mean: ({ mu, sigma }) => Math.exp(mu + (sigma * sigma) / 2),
  variance({ mu, sigma }) {
    const s2 = sigma * sigma;
    return (Math.exp(s2) - 1) * Math.exp(2 * mu + s2);
  },
  sample: (rng, { mu, sigma }) => Math.exp(mu + sigma * sampleStandardNormal(rng)),
  // 99.4%分位点(μ+2.5σ)まで描く。右裾が長いため±nσ方式は使えない
  plotRange: ({ mu, sigma }) => ({ min: 0, max: Math.exp(mu + 2.5 * sigma) }),
  notation: ({ mu, sigma }, fmt) => `LogN(${fmt(mu)}, ${fmt(sigma)}²)`,
  useCaseValues({ mu, sigma }) {
    return {
      mu,
      sigma,
      median: Math.exp(mu),
      mean: Math.exp(mu + (sigma * sigma) / 2),
    };
  },
};
