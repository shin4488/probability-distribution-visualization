import type { DistributionDef, DistributionId } from '../types';
import { bernoulli } from './bernoulli';
import { beta } from './beta';
import { binomial } from './binomial';
import { exponential } from './exponential';
import { gamma } from './gamma';
import { lognormal } from './lognormal';
import { negbinomial } from './negbinomial';
import { normal } from './normal';
import { poisson } from './poisson';

/**
 * デフォルトの表示順 = 統計学の学習順。
 * 「ある分布の前提となる分布を先に」「導出・合成の関係が強い分布同士を隣に」並べる:
 *
 *   ベルヌーイ     すべての土台(1回の二値試行)
 *   └ 二項         ベルヌーイのn回の和
 *   └ 負の二項     同じベルヌーイ試行の裏返し(成功数を固定して回数を数える)
 *   └ ポアソン     二項のn→∞極限(まれな事象の回数)
 *     └ 指数       ポアソン過程の待ち時間(離散→連続への橋渡し)
 *       └ ガンマ   指数の和(r件分の待ち時間)
 *         └ ベータ ガンマ2つの比。ベルヌーイの成功確率pそのものの分布
 *   正規           あらゆる和の極限(中心極限定理)。二項の形が近づく先
 *   └ 対数正規     正規の指数変換(掛け算の積み重ね)
 *
 * ユーザーはドラッグ&ドロップで並び替え可能で、その結果はURLに保存される。
 */
export const DISTRIBUTIONS: readonly DistributionDef[] = [
  bernoulli,
  binomial,
  negbinomial,
  poisson,
  exponential,
  gamma,
  beta,
  normal,
  lognormal,
];

export const DISTRIBUTION_IDS: readonly DistributionId[] = DISTRIBUTIONS.map((d) => d.id);

const byId = new Map(DISTRIBUTIONS.map((d) => [d.id, d]));

export function getDistribution(id: DistributionId): DistributionDef {
  const def = byId.get(id);
  if (!def) throw new Error(`Unknown distribution: ${id}`);
  return def;
}

export function isDistributionId(value: string): value is DistributionId {
  return byId.has(value as DistributionId);
}
