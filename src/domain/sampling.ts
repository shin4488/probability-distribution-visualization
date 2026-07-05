import { mulberry32 } from './random';
import type { DistributionDef, ParamValues } from './types';

export interface HistogramBin {
  /** ビンの中心(グラフのx座標に使う) */
  center: number;
  /** 連続分布では密度(PDFと同じ縦軸で重ねられる)、離散分布では相対度数 */
  height: number;
}

export interface HistogramResult {
  bins: HistogramBin[];
  /** 連続分布のビン幅。離散分布では1 */
  binWidth: number;
}

/**
 * 標本を生成してヒストグラムに集計する。
 * シードを固定しているため、パラメータをスライダーで動かしている間も
 * ヒストグラムが毎フレーム別物にならず、形の変化だけが滑らかに見える。
 */
export function buildHistogram(
  def: DistributionDef,
  params: ParamValues,
  sampleSize: number,
  seed: number,
): HistogramResult {
  const rng = mulberry32(seed);
  const { min, max } = def.plotRange(params);

  if (def.kind === 'discrete') {
    // 整数ごとに数えて相対度数にする(PMFと同じ縦軸になる)
    const counts = new Map<number, number>();
    for (let i = 0; i < sampleSize; i++) {
      const k = def.sample(rng, params);
      counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    const bins: HistogramBin[] = [];
    for (let k = Math.floor(min); k <= Math.ceil(max); k++) {
      bins.push({ center: k, height: (counts.get(k) ?? 0) / sampleSize });
    }
    return { bins, binWidth: 1 };
  }

  // 連続分布: プロット範囲を等幅ビンに分割し、密度(count / (n * binWidth))に正規化。
  // ビン数は標本数の平方根を目安に10〜40へクランプ(少なすぎても多すぎても形が読めない)
  const binCount = Math.min(40, Math.max(10, Math.round(Math.sqrt(sampleSize))));
  const binWidth = (max - min) / binCount;
  const counts = new Array<number>(binCount).fill(0);
  for (let i = 0; i < sampleSize; i++) {
    const x = def.sample(rng, params);
    const idx = Math.floor((x - min) / binWidth);
    // プロット範囲の外(裾)に落ちた標本は捨てる。密度の高さ比較には影響が小さい
    if (idx >= 0 && idx < binCount) counts[idx] += 1;
  }
  const bins = counts.map((count, i) => ({
    center: min + (i + 0.5) * binWidth,
    height: count / (sampleSize * binWidth),
  }));
  return { bins, binWidth };
}

/** PDF/PMFの折れ線・棒グラフ用の点列を作る */
export function buildDensityPoints(
  def: DistributionDef,
  params: ParamValues,
): { x: number; y: number }[] {
  const { min, max } = def.plotRange(params);
  if (def.kind === 'discrete') {
    const points: { x: number; y: number }[] = [];
    for (let k = Math.floor(min); k <= Math.ceil(max); k++) {
      points.push({ x: k, y: def.density(k, params) });
    }
    return points;
  }
  // 200点あれば折れ線が滑らかに見える。端点は発散し得る(ベータ分布のα<1など)ため
  // わずかに内側から評価する
  const steps = 200;
  const epsilon = (max - min) / 10000;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = min + ((max - min) * i) / steps;
    const xSafe = Math.min(max - epsilon, Math.max(min + epsilon, x));
    points.push({ x, y: def.density(xSafe, params) });
  }
  return points;
}
