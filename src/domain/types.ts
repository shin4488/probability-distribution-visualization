import type { Rng } from './random';

/** パラメータ値の集合。キーはDistributionDef.paramsで宣言したkey */
export type ParamValues = Record<string, number>;

export interface ParamDef {
  key: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export type DistributionId =
  | 'normal'
  | 'binomial'
  | 'poisson'
  | 'bernoulli'
  | 'exponential'
  | 'beta'
  | 'gamma'
  | 'lognormal'
  | 'negbinomial';

export type DistributionKind = 'continuous' | 'discrete';

/**
 * 1つの確率分布を表す自己完結した定義。
 * UI層はこのインターフェースだけに依存し、個々の分布の数式は知らない。
 * 新しい分布の追加 = このインターフェースの実装を1ファイル追加し、registryに登録するだけ。
 */
export interface DistributionDef {
  id: DistributionId;
  kind: DistributionKind;
  params: ParamDef[];
  /** 連続分布は確率密度、離散分布は確率質量を返す */
  density(x: number, p: ParamValues): number;
  mean(p: ParamValues): number;
  variance(p: ParamValues): number;
  /** 与えられた一様乱数源から1標本を生成する */
  sample(rng: Rng, p: ParamValues): number;
  /** グラフに描くx軸の範囲。離散分布では整数の下限・上限 */
  plotRange(p: ParamValues): { min: number; max: number };
  /**
   * "N(0, 1²)" のような数式表記。
   * 数値の整形はロケール依存のためフォーマッタを外から注入する
   */
  notation(p: ParamValues, fmt: (n: number) => string): string;
  /**
   * 活用例の文章(i18n)にプレースホルダとして埋め込む派生値。
   * 例: 正規分布なら「約68%が収まる範囲」の下限・上限など
   */
  useCaseValues(p: ParamValues): Record<string, number>;
}

/** ParamDefのデフォルト値からParamValuesを組み立てる */
export function defaultParams(def: DistributionDef): ParamValues {
  const values: ParamValues = {};
  for (const param of def.params) {
    values[param.key] = param.defaultValue;
  }
  return values;
}

/** 値をParamDefの範囲に丸める(URLから来た不正値の防御に使う) */
export function clampParam(param: ParamDef, value: number): number {
  if (!Number.isFinite(value)) return param.defaultValue;
  const clamped = Math.min(param.max, Math.max(param.min, value));
  // stepの格子に乗せる。浮動小数点の誤差はtoPrecisionで吸収する
  const snapped = param.min + Math.round((clamped - param.min) / param.step) * param.step;
  return Number(snapped.toPrecision(12));
}
