import { DISTRIBUTION_IDS, DISTRIBUTIONS, getDistribution } from '../domain/distributions';
import type { DistributionId, ParamValues } from '../domain/types';
import { clampParam, defaultParams } from '../domain/types';
import type { Locale } from '../i18n';

export type Theme = 'light' | 'dark';

export const SAMPLE_SIZE = { min: 100, max: 10000, step: 100, defaultValue: 1000 } as const;

export interface CardState {
  params: ParamValues;
  showHistogram: boolean;
  sampleSize: number;
}

export interface AppState {
  locale: Locale;
  /** URL・localStorage・UI操作のいずれかで明示された場合true。trueのときURLに書く */
  localeExplicit: boolean;
  /** このセッションで本人がUIから変更した場合のみtrue。trueのときだけlocalStorageへ保存する */
  localeTouched: boolean;
  theme: Theme;
  themeExplicit: boolean;
  themeTouched: boolean;
  /** 全分布の表示順(非表示のものも順序は保持する) */
  order: DistributionId[];
  hidden: DistributionId[];
  /** 活用例セクションを全カードで表示するか(右上のトグルで切替) */
  showUseCases: boolean;
  cards: Record<DistributionId, CardState>;
}

export function defaultCardState(id: DistributionId): CardState {
  return {
    params: defaultParams(getDistribution(id)),
    showHistogram: false,
    sampleSize: SAMPLE_SIZE.defaultValue,
  };
}

export function defaultCards(): Record<DistributionId, CardState> {
  const cards = {} as Record<DistributionId, CardState>;
  for (const def of DISTRIBUTIONS) {
    cards[def.id] = defaultCardState(def.id);
  }
  return cards;
}

/** 標本サイズもパラメータと同じ丸め規則(範囲+step格子)に乗せる */
export function clampSampleSize(value: number): number {
  return clampParam(
    {
      key: 'sampleSize',
      min: SAMPLE_SIZE.min,
      max: SAMPLE_SIZE.max,
      step: SAMPLE_SIZE.step,
      defaultValue: SAMPLE_SIZE.defaultValue,
    },
    value,
  );
}

export type Action =
  | { type: 'setParam'; id: DistributionId; key: string; value: number }
  | { type: 'toggleHistogram'; id: DistributionId }
  | { type: 'setSampleSize'; id: DistributionId; value: number }
  | { type: 'toggleVisibility'; id: DistributionId }
  | { type: 'showAll' }
  | { type: 'toggleUseCases' }
  | { type: 'moveCard'; sourceId: DistributionId; targetId: DistributionId }
  | { type: 'setLocale'; locale: Locale }
  | { type: 'toggleTheme' }
  | { type: 'reset' };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'setParam': {
      const def = getDistribution(action.id);
      const paramDef = def.params.find((p) => p.key === action.key);
      if (!paramDef) return state;
      const card = state.cards[action.id];
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.id]: {
            ...card,
            params: { ...card.params, [action.key]: clampParam(paramDef, action.value) },
          },
        },
      };
    }
    case 'toggleHistogram': {
      const card = state.cards[action.id];
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.id]: { ...card, showHistogram: !card.showHistogram },
        },
      };
    }
    case 'setSampleSize': {
      const card = state.cards[action.id];
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.id]: { ...card, sampleSize: clampSampleSize(action.value) },
        },
      };
    }
    case 'toggleVisibility': {
      const hidden = state.hidden.includes(action.id)
        ? state.hidden.filter((id) => id !== action.id)
        : [...state.hidden, action.id];
      return { ...state, hidden };
    }
    case 'showAll':
      return { ...state, hidden: [] };
    case 'toggleUseCases':
      return { ...state, showUseCases: !state.showUseCases };
    case 'moveCard': {
      if (action.sourceId === action.targetId) return state;
      const order = state.order.filter((id) => id !== action.sourceId);
      const targetIndex = order.indexOf(action.targetId);
      if (targetIndex < 0) return state;
      // ドラッグ中カードを、重なった相手の位置に挿入する(live reorder)。
      // 元の位置より前に動かすか後ろに動かすかで挿入位置を変え、往復してもズレないようにする
      const sourceIndexBefore = state.order.indexOf(action.sourceId);
      const insertAt =
        sourceIndexBefore < state.order.indexOf(action.targetId) ? targetIndex + 1 : targetIndex;
      order.splice(insertAt, 0, action.sourceId);
      return { ...state, order };
    }
    case 'setLocale':
      return { ...state, locale: action.locale, localeExplicit: true, localeTouched: true };
    case 'toggleTheme':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
        themeExplicit: true,
        themeTouched: true,
      };
    case 'reset':
      // 言語・テーマは「本人の好み」なのでリセット対象にしない
      return {
        ...state,
        order: [...DISTRIBUTION_IDS],
        hidden: [],
        showUseCases: true,
        cards: defaultCards(),
      };
  }
}
