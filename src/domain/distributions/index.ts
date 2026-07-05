import type { DistributionDef, DistributionId } from '../types';
import { bernoulli } from './bernoulli';
import { beta } from './beta';
import { binomial } from './binomial';
import { exponential } from './exponential';
import { gamma } from './gamma';
import { geometric } from './geometric';
import { lognormal } from './lognormal';
import { negbinomial } from './negbinomial';
import { normal } from './normal';
import { poisson } from './poisson';

/**
 * デフォルトの表示順 = 統計学の学習順。
 * 「ある分布の前提となる分布を先に」「導出・合成の関係が強い分布同士を隣に」並べる。
 * 離散分布5つ(ベルヌーイ→二項→ポアソン→幾何→負の二項)を先に、
 * 続けて連続分布5つ(正規→対数正規→指数→ガンマ→ベータ)(いずれも仕様で確定):
 *
 *   ベルヌーイ     すべての土台(1回の二値試行)
 *   └ 二項         ベルヌーイのn回の和(回数を固定して成功数を数える)
 *   └ ポアソン     二項のn→∞・p→0極限(まれな事象の回数)
 *   └ 幾何         最初の成功までの失敗数(成功数を固定して回数を数える)。指数分布の離散版
 *   └ 負の二項     幾何をr個足したもの(r=1なら幾何そのもの)。
 *                  ポアソン×ガンマの混合分布でもある(個人差のある回数)
 *   正規           あらゆる和の極限(中心極限定理)。二項の形が近づく先
 *   └ 対数正規     正規の指数変換(掛け算の積み重ね)
 *   指数           ポアソン過程の待ち時間。幾何の連続版
 *   └ ガンマ       指数の和(k回分の待ち時間)
 *     └ ベータ     独立な2つのガンマX, Yから作る割合X/(X+Y)。ベルヌーイの成功確率pそのものの分布
 *
 * ユーザーはドラッグ&ドロップで並び替え可能で、その結果はURLに保存される。
 */
export const DISTRIBUTIONS: readonly DistributionDef[] = [
  bernoulli,
  binomial,
  poisson,
  geometric,
  negbinomial,
  normal,
  lognormal,
  exponential,
  gamma,
  beta,
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
