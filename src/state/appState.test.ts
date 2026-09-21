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
