import { describe, expect, it } from 'vitest';
import { DISTRIBUTION_IDS } from '../domain/distributions';
import type { AppState } from './appState';
import { defaultCards } from './appState';
import { decodeAppState, encodeAppState } from './urlCodec';

function baseState(): AppState {
  return {
    locale: 'ja',
    localeExplicit: false,
    localeTouched: false,
    theme: 'light',
    themeExplicit: false,
    themeTouched: false,
    order: [...DISTRIBUTION_IDS],
    hidden: [],
    cards: defaultCards(),
  };
}

describe('encodeAppState', () => {
  it('すべてデフォルトなら空文字(共有URLが素のURLになる)', () => {
    expect(encodeAppState(baseState())).toBe('');
  });

  it('変更したパラメータだけがURLに現れる', () => {
    const state = baseState();
    state.cards.normal = { ...state.cards.normal, params: { mu: 2, sigma: 1.5 } };
    expect(encodeAppState(state)).toBe('normal=2,1.5');
  });

  it('ヒストグラムONと標本サイズを含む', () => {
    const state = baseState();
    state.cards.poisson = { params: { lambda: 4 }, showHistogram: true, sampleSize: 500 };
    expect(encodeAppState(state)).toBe('poisson=4,h,s500');
  });

  it('明示的に選んだ言語・テーマはURLに入る(アドレスバーのコピーで共有できる)', () => {
    const state = baseState();
    state.localeExplicit = true;
    state.themeExplicit = true;
    const encoded = encodeAppState(state);
    expect(encoded).toContain('lang=ja');
    expect(encoded).toContain('theme=light');
  });
});

describe('decodeAppState', () => {
  it('encodeとroundtripする', () => {
    const state = baseState();
    state.locale = 'en';
    state.localeExplicit = true;
    state.theme = 'dark';
    state.themeExplicit = true;
    state.order = ['poisson', ...DISTRIBUTION_IDS.filter((id) => id !== 'poisson')];
    state.hidden = ['beta'];
    state.cards.normal = {
      params: { mu: -1.5, sigma: 2 },
      showHistogram: true,
      sampleSize: 2000,
    };

    const decoded = decodeAppState(`?${encodeAppState(state)}`);
    expect(decoded.locale).toBe('en');
    expect(decoded.theme).toBe('dark');
    expect(decoded.order).toEqual(state.order);
    expect(decoded.hidden).toEqual(['beta']);
    expect(decoded.cards.normal).toEqual(state.cards.normal);
    expect(decoded.cards.gamma).toEqual(baseState().cards.gamma);
  });

  it('範囲外の値はクランプされる', () => {
    const decoded = decodeAppState('?normal=9999,-5');
    expect(decoded.cards.normal.params.mu).toBe(10); // max
    expect(decoded.cards.normal.params.sigma).toBe(0.1); // min
  });

  it('壊れた値はデフォルトに落ちる', () => {
    const decoded = decodeAppState(
      '?normal=abc,def&order=bogus,normal&hide=nope&lang=fr&theme=neon',
    );
    expect(decoded.cards.normal.params).toEqual({ mu: 0, sigma: 1 });
    expect(decoded.locale).toBeUndefined();
    expect(decoded.theme).toBeUndefined();
    expect(decoded.hidden).toEqual([]);
    // orderに現れなかった分布は末尾に補完され、全分布が揃う
    expect(decoded.order[0]).toBe('normal');
    expect([...decoded.order].sort()).toEqual([...DISTRIBUTION_IDS].sort());
  });

  it('空の値はデフォルトに落ちる(最小値へクランプしない)', () => {
    // ?poisson= のような空値: Number('')===0で最小0.1に丸まってしまわないこと
    const emptyValue = decodeAppState('?poisson=');
    expect(emptyValue.cards.poisson.params.lambda).toBe(4);

    // 空トークンは位置だけ消費し、後続のパラメータはずれない
    const emptyToken = decodeAppState('?normal=,2');
    expect(emptyToken.cards.normal.params).toEqual({ mu: 0, sigma: 2 });
  });

  it('標本サイズは範囲にクランプされる', () => {
    const decoded = decodeAppState('?normal=0,1,h,s999999');
    expect(decoded.cards.normal.sampleSize).toBe(10000);
    expect(decoded.cards.normal.showHistogram).toBe(true);
  });
});
