import { useId, useState } from 'react';

interface Props {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

/** スライダー+数値入力の複合コントロール。粗く動かすのはスライダー、正確な値は数値入力で */
export function ParamSlider({ label, min, max, step, value, onChange }: Props) {
  const id = useId();
  // 数値入力は「編集中の下書き」を持ち、確定(blur/Enter)時にだけonChangeへ流す。
  // キーストロークごとにclamp済みの値を書き戻すと、フィールドを空にした瞬間に
  // 最小値へスナップして「0.5」の先頭の「0」やマイナス記号すら打てなくなるため
  const [draft, setDraft] = useState<string | null>(null);

  const commitDraft = () => {
    if (draft === null) return;
    const next = Number(draft);
    if (draft.trim() !== '' && Number.isFinite(next)) onChange(next);
    setDraft(null);
  };

  return (
    <div className="grid grid-cols-[minmax(110px,auto)_1fr_78px] items-center gap-2.5">
      <label className="text-[0.82rem] whitespace-nowrap text-muted" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="m-0 w-full cursor-pointer accent-accent"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        className="w-full rounded-md border border-border bg-bg px-1.5 py-1 font-mono text-[0.82rem] text-fg focus:border-transparent focus:outline-2 focus:-outline-offset-1 focus:outline-accent"
        type="number"
        min={min}
        max={max}
        step={step}
        value={draft ?? value}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commitDraft}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commitDraft();
        }}
        aria-label={label}
      />
    </div>
  );
}
