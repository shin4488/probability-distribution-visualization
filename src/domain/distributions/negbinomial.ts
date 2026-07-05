import { lnChoose } from '../math';
import { sampleGeometric } from '../random';
import type { DistributionDef } from '../types';

/**
 * 負の二項分布。同じ分布に2つの見方がある:
 *
 * 1. ガンマ・ポアソン混合: ポアソン分布のレートλ自体がガンマ分布に従って
 *    ばらつくときの回数の周辺分布。「発生ペースに個人差がある回数データ」の
 *    モデルで、分散が平均の1/p倍に膨らむ(過分散)
 * 2. ベルヌーイ試行の見方: r回目の成功が出るまでの失敗回数
 *    = 幾何分布をr個足したもの(r=1なら幾何分布そのもの)
 *
 * サンプラーは見方2をそのまま実装している(幾何分布r個の合計)。
 */
export const negbinomial: DistributionDef = {
  id: 'negbinomial',
  kind: 'discrete',
  params: [
    { key: 'r', min: 1, max: 10, step: 1, defaultValue: 3 },
    { key: 'p', min: 0.1, max: 1, step: 0.01, defaultValue: 0.4 },
  ],
  density(x, { r, p }) {
    const k = Math.round(x);
    if (k < 0) return 0;
    // p=1では常に失敗0回(k=0に全確率)。ln(1-p)=ln(0)を避けるため直接返す
    if (p === 1) return k === 0 ? 1 : 0;
    return Math.exp(lnChoose(k + r - 1, k) + r * Math.log(p) + k * Math.log(1 - p));
  },
  mean: ({ r, p }) => (r * (1 - p)) / p,
  variance: ({ r, p }) => (r * (1 - p)) / (p * p),
  sample(rng, { r, p }) {
    let failures = 0;
    for (let i = 0; i < r; i++) {
      failures += sampleGeometric(rng, p);
    }
    return failures;
  },
  plotRange({ r, p }) {
    const mean = (r * (1 - p)) / p;
    const sd = Math.sqrt(r * (1 - p)) / p;
    return { min: 0, max: Math.ceil(mean + 4 * sd) + 1 };
  },
  notation: ({ r, p }, fmt) => `NB(${fmt(r)}, ${fmt(p)})`,
  useCaseValues({ r, p }) {
    return {
      r,
      p,
      pPct: p * 100,
      mean: (r * (1 - p)) / p,
      // 分散/平均 = 1/p。ポアソン分布(=1)からどれだけ過分散かを例文で見せる
      overdispersion: 1 / p,
    };
  },
};
