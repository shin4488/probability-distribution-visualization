import { useEffect, useState } from 'react';

interface Props {
  /** ボタンのaria-label(翻訳済み文字列を受け取る) */
  label: string;
}

/** 表示のしきい値。1画面弱スクロールしてから出す(最上部付近では邪魔なだけなので) */
const SHOW_AFTER_PX = 400;

/** 画面右下に固定表示する「ページ最上部へ戻る」ボタン */
export function BackToTop({ label }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    // passive: スクロールを妨げない(preventDefaultしないことをブラウザに宣言)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="fixed right-6 bottom-6 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted shadow-card transition-colors hover:border-accent hover:text-accent"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title={label}
      aria-label={label}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5m0 0-6 6m6-6 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
