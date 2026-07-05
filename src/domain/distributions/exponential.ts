import type { DistributionDef } from '../types';

export const exponential: DistributionDef = {
  id: 'exponential',
  kind: 'continuous',
  params: [{ key: 'lambda', min: 0.1, max: 5, step: 0.1, defaultValue: 1 }],
  density(x, { lambda }) {
    if (x < 0) return 0;
    return lambda * Math.exp(-lambda * x);
  },
  mean: ({ lambda }) => 1 / lambda,
  variance: ({ lambda }) => 1 / (lambda * lambda),
  // 逆関数法。1-rng()で(0,1]にしてlog(0)を避ける
  sample: (rng, { lambda }) => -Math.log(1 - rng()) / lambda,
  // 平均の6倍 = 累積で99.75%をカバー
  plotRange: ({ lambda }) => ({ min: 0, max: 6 / lambda }),
  notation: ({ lambda }, fmt) => `Exp(${fmt(lambda)})`,
  useCaseValues({ lambda }) {
    const mean = 1 / lambda;
    const waitLimit = 2 * mean;
    return {
      lambda,
      mean,
      waitLimit,
      // 平均の2倍以上待つ確率 P(X > 2/λ) = e^(-2) ≈ 13.5%(λに依らず一定なのが面白い点)
      waitPct: Math.exp(-lambda * waitLimit) * 100,
    };
  },
};
