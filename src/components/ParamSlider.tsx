import { useId } from 'react';

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
  return (
    <div className="param-slider">
      <label className="param-slider-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        className="param-slider-number"
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isFinite(next)) onChange(next);
        }}
        aria-label={label}
      />
    </div>
  );
}
