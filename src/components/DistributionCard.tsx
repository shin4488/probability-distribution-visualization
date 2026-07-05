import type { DragEvent } from 'react';
import { useMemo, useRef } from 'react';
import type { DistributionDef } from '../domain/types';
import type { Locale, MessageKey } from '../i18n';
import { formatNumber, translate } from '../i18n';
import type { CardState, Theme } from '../state/appState';
import { SAMPLE_SIZE } from '../state/appState';
import { DistributionChart } from './DistributionChart';
import { ParamSlider } from './ParamSlider';

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

export function DistributionCard({
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
    e.dataTransfer.effectAllowed = 'move';
    onDragStart();
  };

  return (
    <article
      className={`card${isDragging ? ' card-dragging' : ''}`}
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
      <header className="card-header">
        <button
          type="button"
          className="drag-handle"
          title={t('ui.dragHint')}
          aria-label={t('ui.dragHint')}
          onPointerDown={() => {
            dragArmed.current = true;
          }}
          onPointerUp={() => {
            dragArmed.current = false;
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
        <div className="card-title">
          <h2>{t(dk('name'))}</h2>
          <span className="card-notation">{def.notation(card.params, fmt)}</span>
        </div>
        <button
          type="button"
          className="icon-button"
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

      <p className="card-tagline">{t(dk('tagline'))}</p>

      <div className="card-stats">
        <span>
          {t('ui.mean')}: <strong>{fmt(def.mean(card.params))}</strong>
        </span>
        <span>
          {t('ui.sd')}: <strong>{fmt(Math.sqrt(def.variance(card.params)))}</strong>
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

      <div className="card-params">
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

      <div className="card-histogram">
        <label className="switch">
          <input type="checkbox" checked={card.showHistogram} onChange={onToggleHistogram} />
          <span className="switch-track" aria-hidden="true" />
          {t('ui.histogram')}
        </label>
        {card.showHistogram && (
          <div className="histogram-controls">
            <ParamSlider
              label={t('ui.sampleSize')}
              min={SAMPLE_SIZE.min}
              max={SAMPLE_SIZE.max}
              step={SAMPLE_SIZE.step}
              value={card.sampleSize}
              onChange={onSampleSizeChange}
            />
            <button type="button" className="text-button" onClick={onResample}>
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

      <div className="card-usecase">
        <h3>{t('ui.usecaseTitle')}</h3>
        <p>{t(dk('usecase'), def.useCaseValues(card.params))}</p>
      </div>
    </article>
  );
}
