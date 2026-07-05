import { useEffect, useMemo, useReducer, useState } from 'react';
import { DistributionCard } from './components/DistributionCard';
import { FilterChips } from './components/FilterChips';
import { Toolbar } from './components/Toolbar';
import { getDistribution } from './domain/distributions';
import { randomSeed } from './domain/random';
import type { DistributionId } from './domain/types';
import { detectLocale, isLocale, translate } from './i18n';
import type { AppState, Theme } from './state/appState';
import { defaultCards, reducer } from './state/appState';
import { decodeAppState, encodeAppState } from './state/urlCodec';

const THEME_STORAGE_KEY = 'pdv-theme';
const LANG_STORAGE_KEY = 'pdv-lang';

/** 初期状態の優先順位: URL(共有リンク) > localStorage(前回の自分の設定) > ブラウザ/OS環境 */
function initAppState(): AppState {
  const decoded = decodeAppState(window.location.search);

  const storedLang = localStorage.getItem(LANG_STORAGE_KEY);
  const locale =
    decoded.locale ?? (storedLang !== null && isLocale(storedLang) ? storedLang : detectLocale());
  const localeExplicit = decoded.locale !== undefined || storedLang !== null;

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  // index.htmlのインラインスクリプトがURL/localStorage/OS設定から決めた値を引き継ぐ
  const effectiveTheme = (document.documentElement.dataset.theme as Theme | undefined) ?? 'light';
  const theme = decoded.theme ?? effectiveTheme;
  const themeExplicit =
    decoded.theme !== undefined || storedTheme === 'light' || storedTheme === 'dark';

  return {
    locale,
    localeExplicit,
    theme,
    themeExplicit,
    order: decoded.order,
    hidden: decoded.hidden,
    cards: decoded.cards,
  };
}

function initSeeds(): Record<DistributionId, number> {
  const seeds = {} as Record<DistributionId, number>;
  for (const id of Object.keys(defaultCards()) as DistributionId[]) {
    seeds[id] = randomSeed();
  }
  return seeds;
}

export function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initAppState);
  // ヒストグラムの乱数シード。URLには含めない(共有するのはパラメータであって標本ではない)。
  // 「標本を引き直す」でシードを更新すると新しい標本になる
  const [seeds, setSeeds] = useState<Record<DistributionId, number>>(initSeeds);
  const [draggingId, setDraggingId] = useState<DistributionId | null>(null);

  // 状態→URLの同期。アドレスバーのURLをコピーすればそのまま共有リンクになる。
  // replaceStateは高頻度呼び出しでブラウザに拒否されることがあるため
  // 少し間引く(スライダー操作中は最後の値だけ書ければよい)
  useEffect(() => {
    const timer = setTimeout(() => {
      const query = encodeAppState(state);
      const url = query ? `${location.pathname}?${query}` : location.pathname;
      history.replaceState(null, '', url);
    }, 150);
    return () => clearTimeout(timer);
  }, [state]);

  // テーマと言語の反映・保存
  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    if (state.themeExplicit) localStorage.setItem(THEME_STORAGE_KEY, state.theme);
  }, [state.theme, state.themeExplicit]);

  useEffect(() => {
    document.documentElement.lang = state.locale;
    if (state.localeExplicit) localStorage.setItem(LANG_STORAGE_KEY, state.locale);
  }, [state.locale, state.localeExplicit]);

  const visibleOrder = useMemo(
    () => state.order.filter((id) => !state.hidden.includes(id)),
    [state.order, state.hidden],
  );

  return (
    <div className="app">
      <Toolbar
        locale={state.locale}
        theme={state.theme}
        onLocaleChange={(locale) => dispatch({ type: 'setLocale', locale })}
        onThemeToggle={() => dispatch({ type: 'toggleTheme' })}
        onReset={() => dispatch({ type: 'reset' })}
      />

      <FilterChips
        locale={state.locale}
        order={state.order}
        hidden={state.hidden}
        onToggle={(id) => dispatch({ type: 'toggleVisibility', id })}
        onShowAll={() => dispatch({ type: 'showAll' })}
      />

      {visibleOrder.length === 0 ? (
        <p className="empty-state">{translate(state.locale, 'ui.allHidden')}</p>
      ) : (
        <main className="card-grid">
          {visibleOrder.map((id) => (
            <DistributionCard
              key={id}
              def={getDistribution(id)}
              card={state.cards[id]}
              seed={seeds[id]}
              locale={state.locale}
              theme={state.theme}
              isDragging={draggingId === id}
              onParamChange={(key, value) => dispatch({ type: 'setParam', id, key, value })}
              onToggleHistogram={() => dispatch({ type: 'toggleHistogram', id })}
              onSampleSizeChange={(value) => dispatch({ type: 'setSampleSize', id, value })}
              onResample={() => setSeeds((prev) => ({ ...prev, [id]: randomSeed() }))}
              onHide={() => dispatch({ type: 'toggleVisibility', id })}
              onDragStart={() => setDraggingId(id)}
              onDragEnd={() => setDraggingId(null)}
              onDragEnterCard={() => {
                if (draggingId && draggingId !== id) {
                  dispatch({ type: 'moveCard', sourceId: draggingId, targetId: id });
                }
              }}
            />
          ))}
        </main>
      )}
    </div>
  );
}
