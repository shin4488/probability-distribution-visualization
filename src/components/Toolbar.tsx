import type { Locale, MessageKey } from '../i18n';
import { LOCALES, translate } from '../i18n';
import type { Theme } from '../state/appState';

interface Props {
  locale: Locale;
  theme: Theme;
  onLocaleChange: (locale: Locale) => void;
  onThemeToggle: () => void;
  onReset: () => void;
}

const LOCALE_LABELS: Record<Locale, string> = { ja: '日本語', en: 'EN' };

export function Toolbar({ locale, theme, onLocaleChange, onThemeToggle, onReset }: Props) {
  const t = (key: MessageKey) => translate(locale, key);
  return (
    <header className="toolbar">
      <div className="toolbar-titles">
        <h1>{t('ui.title')}</h1>
        <p>{t('ui.tagline')}</p>
      </div>
      <div className="toolbar-actions">
        <fieldset className="segmented" aria-label={t('ui.langLabel')}>
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              className={l === locale ? 'active' : ''}
              onClick={() => onLocaleChange(l)}
              aria-pressed={l === locale}
            >
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </fieldset>
        <button
          type="button"
          className="icon-button"
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
        <button type="button" className="text-button" onClick={onReset} title={t('ui.resetTitle')}>
          {t('ui.reset')}
        </button>
      </div>
    </header>
  );
}
