import { useId, useState } from 'react';

interface Props {
  /** ツールチップに表示する説明文 */
  text: string;
  /** ヘルプボタンのaria-label */
  label: string;
}

/**
 * (?)アイコンのヘルプツールチップ。
 * PCはホバー/キーボードフォーカスで、タッチ端末は
 * タップ(クリック)でトグルして表示する。
 */
export function HelpTip({ text, label }: Props) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-muted text-[0.65rem] font-bold text-muted hover:border-accent hover:text-accent"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
      >
        ?
      </button>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-card p-2.5 text-xs leading-relaxed font-normal shadow-card"
        >
          {text}
        </span>
      )}
    </span>
  );
}
