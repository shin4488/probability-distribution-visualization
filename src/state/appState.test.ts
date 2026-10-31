import { describe, expect, it } from 'vitest';
import { GUIDE_CASES } from '../guide/catalog';
import { type AppState, reducer } from './appState';
import { decodeAppState } from './urlCodec';

function state(): AppState {
  return {
    ...decodeAppState('?page=guide&category=count&case=poisson&poisson=7'),
    locale: 'ja',
    localeExplicit: false,
    localeTouched: false,
    theme: 'light',
    themeExplicit: false,
    themeTouched: false,
  };
}

describe('ケース選択の遷移', () => {
  it('別カテゴリを選ぶと候補を閉じ、グラフの値は保つ', () => {
    const next = reducer(state(), { type: 'selectCategory', category: 'waiting' });
    expect(next.category).toBe('waiting');
    expect(next.selectedCase).toBeNull();
    expect(next.cards.poisson.params.lambda).toBe(7);
  });
  it('別候補を開いた後、選んでいたカテゴリの一覧に戻れる', () => {
    const next = reducer(state(), { type: 'selectCase', id: 'negbinomial' });
    expect(next.selectedCase).toBe('negbinomial');
    const back = reducer(next, { type: 'selectCase', id: null });
    expect(back.selectedCase).toBeNull();
    expect(back.category).toBe('count');
  });
  it('すべての分布へケースから到達でき、別候補に行き止まりがない', () => {
    expect(new Set(GUIDE_CASES.map((item) => item.id))).toEqual(new Set(state().order));
    for (const item of GUIDE_CASES) {
      expect(GUIDE_CASES.some((other) => other.id === item.alternative)).toBe(true);
    }
  });
});

describe('カードの並び替え', () => {
  // 仕様で決まっている初期の表示順
  const DEFAULT_ORDER = [
    'bernoulli',
    'binomial',
    'poisson',
    'geometric',
    'negbinomial',
    'normal',
    'lognormal',
    'exponential',
    'gamma',
    'beta',
  ];

  it('後ろのカードに重ねると、ドラッグ中のカードがその位置に入る', () => {
    const next = reducer(state(), { type: 'moveCard', sourceId: 'bernoulli', targetId: 'poisson' });
    expect(next.order).toEqual(['binomial', 'poisson', 'bernoulli', ...DEFAULT_ORDER.slice(3)]);
  });

  it('前のカードに重ねると、ドラッグ中のカードがその位置に入る', () => {
    const next = reducer(state(), { type: 'moveCard', sourceId: 'poisson', targetId: 'bernoulli' });
    expect(next.order).toEqual(['poisson', 'bernoulli', 'binomial', ...DEFAULT_ORDER.slice(3)]);
  });

  it('隣のカードに重ねて入れ替わった後、同じカードにもう一度重ねると元の順に戻る', () => {
    const moved = reducer(state(), {
      type: 'moveCard',
      sourceId: 'bernoulli',
      targetId: 'binomial',
    });
    expect(moved.order.slice(0, 2)).toEqual(['binomial', 'bernoulli']);
    const back = reducer(moved, { type: 'moveCard', sourceId: 'bernoulli', targetId: 'binomial' });
    expect(back.order).toEqual(DEFAULT_ORDER);
  });
});

describe('リセット', () => {
  it('表示・パラメータ・ケースの選択を初期状態に戻し、言語とテーマは保つ', () => {
    let changed: AppState = {
      ...state(),
      locale: 'en',
      localeExplicit: true,
      theme: 'dark',
      themeExplicit: true,
    };
    changed = reducer(changed, { type: 'moveCard', sourceId: 'beta', targetId: 'bernoulli' });
    changed = reducer(changed, { type: 'toggleVisibility', id: 'gamma' });
    changed = reducer(changed, { type: 'toggleUseCases' });
    changed = reducer(changed, { type: 'toggleHistogram', id: 'normal' });
    changed = reducer(changed, { type: 'setParam', id: 'normal', key: 'mu', value: 30 });

    const reset = reducer(changed, { type: 'reset' });
    expect(reset.locale).toBe('en');
    expect(reset.localeExplicit).toBe(true);
    expect(reset.theme).toBe('dark');
    expect(reset.themeExplicit).toBe(true);
    expect(reset.order[0]).toBe('bernoulli');
    expect(reset.order.at(-1)).toBe('beta');
    expect(reset.hidden).toEqual([]);
    expect(reset.showUseCases).toBe(true);
    expect(reset.category).toBe('all');
    expect(reset.selectedCase).toBeNull();
    // 仕様で決まっている初期値(正規分布はN(60, 10²)、標本シミュレーションOFF、標本サイズ1000)
    expect(reset.cards.normal).toEqual({
      params: { mu: 60, sigma: 10 },
      showHistogram: false,
      sampleSize: 1000,
    });
    expect(reset.cards.poisson.params.lambda).toBe(4);
  });
});
