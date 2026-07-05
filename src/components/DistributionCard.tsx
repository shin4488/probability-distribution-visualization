import type { DragEvent } from 'react';
import { memo, useEffect, useMemo, useRef } from 'react';
import type { DistributionDef } from '../domain/types';
import type { Locale, MessageKey } from '../i18n';
import { formatNumber, translate } from '../i18n';
import type { CardState, Theme } from '../state/appState';
import { SAMPLE_SIZE } from '../state/appState';
import { DistributionChart } from './DistributionChart';
import { HelpTip } from './HelpTip';
import { ParamSlider } from './ParamSlider';
import { iconButtonClass, textButtonClass } from './ui';

interface Props {
  def: DistributionDef;
  card: CardState;
  seed: number;
  locale: Locale;
  theme: Theme;
  isDragging: boolean;
  onParamChange: (key: string, value: number) => void;
  onToggleHistogram: () => void;
  onSampleSizeChange: (value: number) => void;
  onResample: () => void;
  onHide: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragEnterCard: () => void;
}

function DistributionCardBase({
  def,
  card,
  seed,
  locale,
  theme,
  isDragging,
  onParamChange,
  onToggleHistogram,
  onSampleSizeChange,
  onResample,
  onHide,
  onDragStart,
  onDragEnd,
  onDragEnterCard,
}: Props) {
  const t = (key: MessageKey, vars?: Record<string, number | string>) =>
    translate(locale, key, vars);
  const fmt = (n: number) => formatNumber(locale, n);
  const dk = (suffix: string) => `dist.${def.id}.${suffix}` as MessageKey;

  // カード全体をドラッグのゴーストにしたいが、draggableをカード全体に付けると
  // スライダー操作までドラッグ扱いになるブラウザがある。
  // そこで「ハンドル上でpointerdownしたときだけ」dragstartを許可する
  const dragArmed = useRef(false);

  // ハンドルの外でボタンを離すとハンドルのpointerupが来ずフラグが残り、
  // その後のテキスト選択ドラッグが並べ替えに化ける。どこで離してもwindowで必ず解除する
  useEffect(() => {
    const disarm = () => {
      dragArmed.current = false;
    };
    window.addEventListener('pointerup', disarm);
    window.addEventListener('pointercancel', disarm);
    return () => {
      window.removeEventListener('pointerup', disarm);
      window.removeEventListener('pointercancel', disarm);
    };
  }, []);

  // チャート側のuseEffectがオブジェクト同一性で再描画を判定するため、
  // 中身が変わらない限り同じ参照を保つ
  const histogram = useMemo(
    () => (card.showHistogram ? { sampleSize: card.sampleSize, seed } : null),
    [card.showHistogram, card.sampleSize, seed],
  );

  const handleDragStart = (e: DragEvent) => {
    if (!dragArmed.current) {
      e.preventDefault();
      return;
    }
    // ドラッグ成立時点でフラグは役目を終える(残すと次の意図しないドラッグを許可してしまう)
    dragArmed.current = false;
    // Firefoxはデータ未設定のHTML5ドラッグを開始しないため、ダミーでもsetDataが必須
    e.dataTransfer.setData('text/plain', def.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart();
  };

  return (
    <article
      className={`flex flex-col gap-2.5 rounded-[14px] border bg-card px-[18px] py-4 shadow-card transition-opacity ${
        isDragging ? 'border-dashed border-accent opacity-45' : 'border-border'
      }`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => {
        dragArmed.current = false;
        onDragEnd();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }}
      onDragEnter={onDragEnterCard}
      onDrop={(e) => e.preventDefault()}
    >
      <header className="flex items-center gap-2">
        <button
          type="button"
          className="cursor-grab rounded-md p-1 text-muted hover:bg-accent-soft hover:text-accent"
          title={t('ui.dragHint')}
          aria-label={t('ui.dragHint')}
          onPointerDown={() => {
            dragArmed.current = true;
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="5" cy="3" r="1.5" fill="currentColor" />
            <circle cx="11" cy="3" r="1.5" fill="currentColor" />
            <circle cx="5" cy="8" r="1.5" fill="currentColor" />
            <circle cx="11" cy="8" r="1.5" fill="currentColor" />
            <circle cx="5" cy="13" r="1.5" fill="currentColor" />
            <circle cx="11" cy="13" r="1.5" fill="currentColor" />
          </svg>
        </button>
        <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-2.5">
          <h2 className="text-[1.05rem] font-bold">{t(dk('name'))}</h2>
          <span className="font-mono text-sm text-muted">{def.notation(card.params, fmt)}</span>
        </div>
        <button
          type="button"
          className={iconButtonClass}
          onClick={onHide}
          title={t('ui.hideCard')}
          aria-label={t('ui.hideCard')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 3l18 18M10.6 5.1A9.8 9.8 0 0 1 12 5c7 0 10 7 10 7a16.3 16.3 0 0 1-3.2 4.2M6.6 6.6A16 16 0 0 0 2 12s3 7 10 7a9.9 9.9 0 0 0 4.4-1M9.9 9.9a3 3 0 1 0 4.2 4.2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <p className="text-[0.82rem] text-muted">{t(dk('tagline'))}</p>

      <div className="flex gap-4 text-[0.8rem] text-muted">
        <span>
          {t('ui.mean')}:{' '}
          <strong className="font-semibold text-fg">{fmt(def.mean(card.params))}</strong>
        </span>
        <span>
          {t('ui.sd')}:{' '}
          <strong className="font-semibold text-fg">
            {fmt(Math.sqrt(def.variance(card.params)))}
          </strong>
        </span>
      </div>

      <DistributionChart
        def={def}
        params={card.params}
        histogram={histogram}
        theme={theme}
        labels={{
          density: t(def.kind === 'continuous' ? 'ui.chartDensity' : 'ui.chartMass'),
          histogram: t('ui.chartHistogram'),
        }}
      />

      <div className="flex flex-col gap-2">
        {def.params.map((p) => (
          <ParamSlider
            key={p.key}
            label={t(dk(`param.${p.key}`))}
            min={p.min}
            max={p.max}
            step={p.step}
            value={card.params[p.key]}
            onChange={(value) => onParamChange(p.key, value)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-dashed border-border pt-2.5">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm select-none">
          <input
            className="peer sr-only"
            type="checkbox"
            checked={card.showHistogram}
            onChange={onToggleHistogram}
          />
          <span
            className="relative h-5 w-[34px] shrink-0 rounded-full bg-border transition-colors after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-card after:shadow-[0_1px_2px_rgb(0_0_0/0.25)] after:transition-transform after:content-[''] peer-checked:bg-accent peer-checked:after:translate-x-3.5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
            aria-hidden="true"
          />
          {t('ui.histogram')}
          <HelpTip text={t('ui.histogramHelp')} label={t('ui.helpLabel')} />
        </label>
        {card.showHistogram && (
          <div className="flex flex-col gap-2">
            <ParamSlider
              label={t('ui.sampleSize')}
              min={SAMPLE_SIZE.min}
              max={SAMPLE_SIZE.max}
              step={SAMPLE_SIZE.step}
              value={card.sampleSize}
              onChange={onSampleSizeChange}
            />
            <button type="button" className={`${textButtonClass} self-start`} onClick={onResample}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 8a8 8 0 1 0 1.7 6M21 3v6h-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t('ui.regenerate')}
            </button>
          </div>
        )}
      </div>

      <div className="rounded-r-lg border-l-[3px] border-accent bg-accent-soft px-3 py-2.5">
        <h3 className="mb-1 text-[0.78rem] font-bold tracking-[0.06em] text-accent uppercase">
          {t('ui.usecaseTitle')}
        </h3>
        <p className="text-[0.84rem] leading-[1.65]">
          {t(dk('usecase'), def.useCaseValues(card.params))}
        </p>
      </div>
    </article>
  );
}

/**
 * スライダー操作のたびに全カードが再レンダリングされるのを防ぐ。
 * コールバック群はApp側でIDごとに固定参照になっているため、
 * 変化したカードのprops(card/seed等)だけが比較で引っかかる
 */
export const DistributionCard = memo(DistributionCardBase);
