import { lnGamma } from '../math';
import { samplePoisson } from '../random';
import type { DistributionDef } from '../types';

function pmf(k: number, lambda: number): number {
  if (k < 0) return 0;
  return Math.exp(k * Math.log(lambda) - lambda - lnGamma(k + 1));
}

export const poisson: DistributionDef = {
  id: 'poisson',
  kind: 'discrete',
  params: [{ key: 'lambda', min: 0.1, max: 30, step: 0.1, defaultValue: 4 }],
  density: (x, { lambda }) => pmf(Math.round(x), lambda),
  mean: ({ lambda }) => lambda,
  variance: ({ lambda }) => lambda,
  sample: (rng, { lambda }) => samplePoisson(rng, lambda),
  // 平均+4σまで描けば裾はほぼ0
  plotRange: ({ lambda }) => ({
    min: 0,
    max: Math.ceil(lambda + 4 * Math.sqrt(lambda)) + 1,
  }),
  notation: ({ lambda }, fmt) => `Po(${fmt(lambda)})`,
  useCaseValues({ lambda }) {
    // 例文: 「平均+2σ件の枠を用意してもあふれる確率」を実際に計算して見せる
    const capacity = Math.ceil(lambda + 2 * Math.sqrt(lambda));
    let cdf = 0;
    for (let k = 0; k <= capacity; k++) {
      cdf += pmf(k, lambda);
    }
    return {
      lambda,
      capacity,
      overflowPct: Math.max(0, (1 - cdf) * 100),
    };
  },
};
