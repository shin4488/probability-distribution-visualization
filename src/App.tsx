import { useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';
import { BackToTop } from './components/BackToTop';
import { DistributionCard } from './components/DistributionCard';
import { FilterChips } from './components/FilterChips';
import { Toolbar } from './components/Toolbar';
import { DISTRIBUTION_IDS, getDistribution } from './domain/distributions';
import { randomSeed } from './domain/random';
import type { DistributionId } from './domain/types';
import { detectLocale, isLocale, translate } from './i18n';
import type { AppState, Theme } from './state/appState';
import { reducer } from './state/appState';
import { decodeAppState, encodeAppState } from './state/urlCodec';

const THEME_STORAGE_KEY = 'pdv-theme';
const LANG_STORAGE_KEY = 'pdv-lang';

// Cookie全ブロックやプライベートモードではlocalStorageへのアクセス自体が
// SecurityErrorを投げる環境があるため、読み書きは必ずこの安全版を通す
// (保存できなくてもアプリは動き続けるのが正しい挙動)
function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // 保存不可の環境では単に永続化をあきらめる
  }
}

/** 初期状態の優先順位: URL(共有リンク) > localStorage(前回の自分の設定) > ブラウザ/OS環境 */
function initAppState(): AppState {
  const decoded = decodeAppState(window.location.search);

  const storedLang = readStorage(LANG_STORAGE_KEY);
  const locale =
    decoded.locale ?? (storedLang !== null && isLocale(storedLang) ? storedLang : detectLocale());
  const localeExplicit = decoded.locale !== undefined || storedLang !== null;

  const storedTheme = readStorage(THEME_STORAGE_KEY);
  // index.htmlのインラインスクリプトがURL/localStorage/OS設定から決めた値を引き継ぐ
  const effectiveTheme = (document.documentElement.dataset.theme as Theme | undefined) ?? 'light';
  const theme = decoded.theme ?? effectiveTheme;
  const themeExplicit =
    decoded.theme !== undefined || storedTheme === 'light' || storedTheme === 'dark';

  return {
    locale,
    localeExplicit,
    // touched=このセッションで本人がUI操作したか。共有URL経由の値をlocalStorageへ
    // 永続化して相手の設定を上書きしないよう、explicit(URL表示用)と区別する
    localeTouched: false,
    theme,
    themeExplicit,
    themeTouched: false,
    order: decoded.order,
    hidden: decoded.hidden,
    showUseCases: decoded.showUseCases,
    cards: decoded.cards,
  };
}

function initSeeds(): Record<DistributionId, number> {
  const seeds = {} as Record<DistributionId, number>;
  for (const id of DISTRIBUTION_IDS) {
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
  // ハンドラをカードごとに固定参照で持つ(React.memoを効かせる)ため、
  // ドラッグ中IDはstateと並行してrefでも追いかける
  const draggingIdRef = useRef<DistributionId | null>(null);

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

  // テーマの反映。useLayoutEffectなのは、子(チャート)の再着色エフェクトより先に
  // data-themeを書き換える必要があるため(親のlayout effectは子のpassive effectより先に走る)。
  // 通常のuseEffectだとチャートが旧テーマのCSS変数を読んでしまう
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = state.theme;
  }, [state.theme]);

  // 保存は「このセッションで本人が操作した」場合のみ。
  // 共有URL(?theme=...)を開いただけで相手のlocalStorageを上書きしない
  useEffect(() => {
    if (state.themeTouched) writeStorage(THEME_STORAGE_KEY, state.theme);
  }, [state.theme, state.themeTouched]);

  useEffect(() => {
    document.documentElement.lang = state.locale;
    if (state.localeTouched) writeStorage(LANG_STORAGE_KEY, state.locale);
  }, [state.locale, state.localeTouched]);

  // カードに渡すコールバック群。dispatch/setSeedsは参照が安定しているので
  // 一度だけ作れば済み、React.memoしたカードの不要な再レンダリングを防げる
  const handlersById = useMemo(() => {
    const map = {} as Record<
      DistributionId,
      {
        onParamChange: (key: string, value: number) => void;
        onToggleHistogram: () => void;
        onSampleSizeChange: (value: number) => void;
        onResample: () => void;
        onHide: () => void;
        onDragStart: () => void;
        onDragEnd: () => void;
        onDragEnterCard: () => void;
      }
    >;
    for (const id of DISTRIBUTION_IDS) {
      map[id] = {
        onParamChange: (key, value) => dispatch({ type: 'setParam', id, key, value }),
        onToggleHistogram: () => dispatch({ type: 'toggleHistogram', id }),
        onSampleSizeChange: (value) => dispatch({ type: 'setSampleSize', id, value }),
        onResample: () => setSeeds((prev) => ({ ...prev, [id]: randomSeed() })),
        onHide: () => dispatch({ type: 'toggleVisibility', id }),
        onDragStart: () => {
          draggingIdRef.current = id;
          setDraggingId(id);
        },
        onDragEnd: () => {
          draggingIdRef.current = null;
          setDraggingId(null);
        },
        onDragEnterCard: () => {
          const sourceId = draggingIdRef.current;
          if (sourceId && sourceId !== id) {
            dispatch({ type: 'moveCard', sourceId, targetId: id });
          }
        },
      };
    }
    return map;
  }, []);

  const visibleOrder = useMemo(
    () => state.order.filter((id) => !state.hidden.includes(id)),
    [state.order, state.hidden],
  );

  return (
    <div className="mx-auto max-w-[1240px] px-6 pt-5 pb-16">
      <Toolbar
        locale={state.locale}
        theme={state.theme}
        onLocaleChange={(locale) => dispatch({ type: 'setLocale', locale })}
        onThemeToggle={() => dispatch({ type: 'toggleTheme' })}
        showUseCases={state.showUseCases}
        onToggleUseCases={() => dispatch({ type: 'toggleUseCases' })}
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
        <p className="py-15 text-center text-muted">{translate(state.locale, 'ui.allHidden')}</p>
      ) : (
        <main className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-5 max-[420px]:grid-cols-1">
          {visibleOrder.map((id) => (
            <DistributionCard
              key={id}
              def={getDistribution(id)}
              card={state.cards[id]}
              seed={seeds[id]}
              locale={state.locale}
              theme={state.theme}
              showUseCase={state.showUseCases}
              isDragging={draggingId === id}
              {...handlersById[id]}
            />
          ))}
        </main>
      )}

      <BackToTop label={translate(state.locale, 'ui.backToTop')} />
    </div>
  );
}
