import {
  DISTRIBUTION_IDS,
  DISTRIBUTIONS,
  getDistribution,
  isDistributionId,
} from '../domain/distributions';
import type { DistributionId } from '../domain/types';
import { clampParam } from '../domain/types';
import { isLocale } from '../i18n';
import type { AppState, CardState } from './appState';
import { clampSampleSize, defaultCardState, SAMPLE_SIZE } from './appState';

/**
 * URLクエリの形式(人間が読めるよう、値の文字集合を [0-9.,-hs] に限定して
 * パーセントエンコードを避けている):
 *
 *   ?lang=en&theme=dark
 *    &order=poisson,normal,...   デフォルト順と違うときだけ
 *    &hide=beta,gamma            非表示があるときだけ
 *    &normal=0,1,h,s500          分布ごと: パラメータ値(定義順) + h(ヒストグラムON)
 *                                + s標本数(1000以外のとき)。デフォルトと同じなら省略
 *
 * デフォルト値を省略するのは、URLを短く保ち「何を変えたか」が
 * URLを見ただけで分かるようにするため。
 *
 * 【互換性の契約】パラメータ列は定義順の位置ベースなので、公開後は
 * 各分布のparamsを「末尾への追加」以外で変更してはならない(並べ替え・削除・
 * 途中挿入をすると、過去の共有URLがエラーなく別のグラフとして開いてしまう)。
 * それが避けられない変更をする場合は、バージョンパラメータ(例: v=2)を導入して
 * 旧形式を無視するようにすること。
 */

function encodeCard(id: DistributionId, card: CardState): string | null {
  const def = getDistribution(id);
  const defaults = defaultCardState(id);
  const tokens: string[] = [];

  const paramsChanged = def.params.some((p) => card.params[p.key] !== defaults.params[p.key]);
  const sizeChanged = card.sampleSize !== SAMPLE_SIZE.defaultValue;
  if (!paramsChanged && !card.showHistogram && !sizeChanged) return null;

  for (const p of def.params) {
    tokens.push(String(card.params[p.key]));
  }
  if (card.showHistogram) tokens.push('h');
  if (sizeChanged) tokens.push(`s${card.sampleSize}`);
  return tokens.join(',');
}

function decodeCard(id: DistributionId, raw: string): CardState {
  const def = getDistribution(id);
  const card = defaultCardState(id);
  const tokens = raw.split(',');
  let paramIndex = 0;
  for (const token of tokens) {
    if (token === 'h') {
      card.showHistogram = true;
    } else if (token !== '' && token.startsWith('s')) {
      card.sampleSize = clampSampleSize(Number(token.slice(1)));
    } else if (paramIndex < def.params.length) {
      // 空トークン(?normal=,2 など)はNumber('')===0に化けて最小値へ丸まってしまうため、
      // 位置だけ消費してデフォルト値のまま残す
      if (token !== '') {
        const paramDef = def.params[paramIndex];
        card.params[paramDef.key] = clampParam(paramDef, Number(token));
      }
      paramIndex += 1;
    }
  }
  return card;
}

export function encodeAppState(state: AppState): string {
  const parts: string[] = [];
  if (state.localeExplicit) parts.push(`lang=${state.locale}`);
  if (state.themeExplicit) parts.push(`theme=${state.theme}`);

  const isDefaultOrder = state.order.every((id, i) => id === DISTRIBUTION_IDS[i]);
  if (!isDefaultOrder) parts.push(`order=${state.order.join(',')}`);
  if (state.hidden.length > 0) parts.push(`hide=${state.hidden.join(',')}`);

  for (const def of DISTRIBUTIONS) {
    const encoded = encodeCard(def.id, state.cards[def.id]);
    if (encoded !== null) parts.push(`${def.id}=${encoded}`);
  }
  return parts.join('&');
}

export interface DecodedUrlState {
  locale?: 'ja' | 'en';
  theme?: 'light' | 'dark';
  order: DistributionId[];
  hidden: DistributionId[];
  cards: Record<DistributionId, CardState>;
}

/** 不正な値はすべて黙ってデフォルトに落とす(共有URLの手編集や改変に耐える) */
export function decodeAppState(search: string): DecodedUrlState {
  const params = new URLSearchParams(search);

  const result: DecodedUrlState = {
    order: [...DISTRIBUTION_IDS],
    hidden: [],
    cards: {} as Record<DistributionId, CardState>,
  };

  const lang = params.get('lang');
  if (lang !== null && isLocale(lang)) result.locale = lang;

  const theme = params.get('theme');
  if (theme === 'light' || theme === 'dark') result.theme = theme;

  const orderRaw = params.get('order');
  if (orderRaw) {
    const seen = orderRaw.split(',').filter(isDistributionId);
    const unique = [...new Set(seen)];
    // URLに現れなかった分布は、デフォルト順を保って末尾に足す
    // (将来分布を追加しても古い共有URLが壊れない)
    const missing = DISTRIBUTION_IDS.filter((id) => !unique.includes(id));
    result.order = [...unique, ...missing];
  }

  const hideRaw = params.get('hide');
  if (hideRaw) {
    result.hidden = [...new Set(hideRaw.split(',').filter(isDistributionId))];
  }

  for (const def of DISTRIBUTIONS) {
    const raw = params.get(def.id);
    result.cards[def.id] = raw !== null ? decodeCard(def.id, raw) : defaultCardState(def.id);
  }

  return result;
}
