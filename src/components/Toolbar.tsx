import type { Locale, MessageKey } from '../i18n';
import { LOCALES, translate } from '../i18n';
import type { Theme } from '../state/appState';
import { iconButtonClass, textButtonClass } from './ui';

interface Props {
  locale: Locale;
  theme: Theme;
  onLocaleChange: (locale: Locale) => void;
  onThemeToggle: () => void;
  showUseCases: boolean;
  onToggleUseCases: () => void;
  onReset: () => void;
}

const LOCALE_LABELS: Record<Locale, string> = { ja: '日本語', en: 'EN' };

export function Toolbar({
  locale,
  theme,
  onLocaleChange,
  onThemeToggle,
  showUseCases,
  onToggleUseCases,
  onReset,
}: Props) {
  const t = (key: MessageKey) => translate(locale, key);
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-4">
      <div>
        <h1 className="text-[1.35rem] font-bold tracking-[0.01em]">
          {/* href="."は「クエリを落とした現在のパス」に解決される。GitHub Pagesの
              サブパス配信(/repo/)でも壊れないよう、絶対パス"/"は使わない。
              クエリ=共有可能な状態のすべてなので、遷移すれば実質リセットになる */}
          <a className="transition-colors hover:text-accent" href="." title={t('ui.homeTitle')}>
            {t('ui.title')}
          </a>
        </h1>
        <p className="mt-0.5 text-sm text-muted">{t('ui.tagline')}</p>
      </div>
      <div className="flex items-center gap-2.5">
        <fieldset
          className="inline-flex overflow-hidden rounded-lg border border-border bg-card"
          aria-label={t('ui.langLabel')}
        >
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              className={`cursor-pointer px-3 py-1.5 text-sm ${
                l === locale ? 'bg-accent text-white' : 'text-muted'
              }`}
              onClick={() => onLocaleChange(l)}
              aria-pressed={l === locale}
            >
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </fieldset>
        <button
          type="button"
          className={iconButtonClass}
          onClick={onThemeToggle}
          title={t(theme === 'dark' ? 'ui.themeToLight' : 'ui.themeToDark')}
          aria-label={t(theme === 'dark' ? 'ui.themeToLight' : 'ui.themeToDark')}
        >
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <button
          type="button"
          className={`${iconButtonClass} ${showUseCases ? 'border-accent bg-accent-soft text-accent' : ''}`}
          onClick={onToggleUseCases}
          title={t(showUseCases ? 'ui.usecaseHide' : 'ui.usecaseShow')}
          aria-label={t(showUseCases ? 'ui.usecaseHide' : 'ui.usecaseShow')}
          aria-pressed={showUseCases}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 6.3C10.6 4.9 8.7 4.2 6.5 4.2c-1.6 0-3.1.4-4.5 1v13.6c1.4-.6 2.9-1 4.5-1 2.2 0 4.1.7 5.5 2.1 1.4-1.4 3.3-2.1 5.5-2.1 1.6 0 3.1.4 4.5 1V5.2c-1.4-.6-2.9-1-4.5-1-2.2 0-4.1.7-5.5 2.1Zm0 0v13.6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 非表示中は斜線を重ねる(カードの非表示ボタンと同じ「隠している」の視覚言語) */}
            {!showUseCases && (
              <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
        <button
          type="button"
          className={textButtonClass}
          onClick={onReset}
          title={t('ui.resetTitle')}
        >
          {t('ui.reset')}
        </button>
      </div>
    </header>
  );
}
