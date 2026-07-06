import { useState } from 'react';
import { trackEvent } from '../analytics';
import type { Locale, MessageKey } from '../i18n';
import { translate } from '../i18n';
import { readStorage, writeStorage } from '../storage';
import { textButtonClass } from './ui';

// ご意見フォーム(Googleフォーム)のURL。
// URL未設定(プレースホルダ)の間はリンクを表示しない(死にリンクを出さない)
const FEEDBACK_FORM_URL = 'https://forms.gle/K17hDfJhBRAfTXbX6';
const formReady = !FEEDBACK_FORM_URL.includes('PLACEHOLDER');

// 回答をいつ・どう答えたかの保存キー。回答直後はお礼表示にし、
// 1日経ったら再び質問する(仕様: 改善後の評価変化を追いつつ、しつこくしない)
const FEEDBACK_STORAGE_KEY = 'pdv-feedback';
const REASK_AFTER_MS = 24 * 60 * 60 * 1000;

/** 保存済み回答が「まだ再質問しない期間内」ならtrue */
function hasRecentAnswer(): boolean {
  const raw = readStorage(FEEDBACK_STORAGE_KEY);
  if (raw === null) return false;
  try {
    const saved = JSON.parse(raw) as { at?: number };
    return typeof saved.at === 'number' && Date.now() - saved.at < REASK_AFTER_MS;
  } catch {
    // 旧形式や壊れた値は「未回答」として扱い、質問を出し直す
    return false;
  }
}

interface Props {
  locale: Locale;
}

/**
 * ページ下部の満足度アンケート(👍/👎の2択)+要望フォームへの導線。
 * 評価はGA4のfeedback_ratingイベントとして送る(本番のみ・匿名)。
 * 静的サイトのため自由記述の受け皿は外部のGoogleフォームに委ねる。
 */
export function FeedbackFooter({ locale }: Props) {
  const t = (key: MessageKey) => translate(locale, key);
  const [rated, setRated] = useState(hasRecentAnswer);

  const rate = (rating: 'up' | 'down') => {
    trackEvent('feedback_rating', { rating });
    writeStorage(FEEDBACK_STORAGE_KEY, JSON.stringify({ rating, at: Date.now() }));
    setRated(true);
  };

  return (
    <footer className="mt-10 flex flex-col items-center gap-3 border-t border-border pt-6 text-sm text-muted">
      {rated ? (
        <p>{t('ui.feedbackThanks')}</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span>{t('ui.feedbackQuestion')}</span>
          <button type="button" className={textButtonClass} onClick={() => rate('up')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 10v11m0-11 4-7c1.5 0 2.5 1 2.5 2.5V9H19a2 2 0 0 1 2 2.4l-1.4 7A2 2 0 0 1 17.6 21H7m0-11H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('ui.feedbackYes')}
          </button>
          <button type="button" className={textButtonClass} onClick={() => rate('down')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M17 14V3m0 11-4 7c-1.5 0-2.5-1-2.5-2.5V15H5a2 2 0 0 1-2-2.4l1.4-7A2 2 0 0 1 6.4 3H17m0 11h3a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('ui.feedbackNo')}
          </button>
        </div>
      )}
      {formReady && (
        <a
          className="underline decoration-dotted underline-offset-4 transition-colors hover:text-accent"
          href={FEEDBACK_FORM_URL}
          target="_blank"
          rel="noreferrer"
        >
          {t('ui.feedbackFormLink')}
        </a>
      )}
    </footer>
  );
}
