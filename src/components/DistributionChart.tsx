import { useEffect, useRef } from 'react';
import type { HistogramResult } from '../domain/sampling';
import { buildDensityPoints, buildHistogram } from '../domain/sampling';
import type { DistributionDef, ParamValues } from '../domain/types';
import type { Theme } from '../state/appState';
import { Chart, readChartColors } from './chartTheme';

interface Props {
  def: DistributionDef;
  params: ParamValues;
  /** nullならヒストグラム非表示 */
  histogram: { sampleSize: number; seed: number } | null;
  theme: Theme;
  labels: { density: string; histogram: string };
}

type XY = { x: number; y: number };

/**
 * ベータ分布のα<1などで端点近くの密度が発散すると、山の本体が潰れて読めなくなる。
 * 大部分の点に対して桁違いに大きい値があるときだけy軸の上限を抑える。
 */
/**
 * 離散分布のx軸をちょうど整数位置の目盛にする。
 * 棒が軸端で切れないようmin/maxを±0.5ずらしているため、Chart.js標準の
 * 目盛生成に任せると-0.5, 0.5, …と半端な位置に目盛が振られてしまう。
 */
function integerTicks(scale: { min: number; max: number; ticks: { value: number }[] }): void {
  const lo = Math.ceil(scale.min);
  const hi = Math.floor(scale.max);
  const step = Math.max(1, Math.ceil((hi - lo + 1) / 11));
  const ticks: { value: number }[] = [];
  for (let v = lo; v <= hi; v += step) ticks.push({ value: v });
  scale.ticks = ticks;
}

function yAxisMax(points: XY[]): number | undefined {
  const ys = points.map((p) => p.y).filter((y) => Number.isFinite(y));
  if (ys.length === 0) return undefined;
  const sorted = [...ys].sort((a, b) => a - b);
  const p98 = sorted[Math.floor(sorted.length * 0.98)];
  const max = sorted[sorted.length - 1];
  return max > p98 * 3 ? p98 * 1.5 : undefined;
}

export function DistributionChart({ def, params, histogram, theme, labels }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const colors = readChartColors();
    const densityPoints = buildDensityPoints(def, params);
    const hist: HistogramResult | null = histogram
      ? buildHistogram(def, params, histogram.sampleSize, histogram.seed)
      : null;
    const histPoints: XY[] = hist ? hist.bins.map((b) => ({ x: b.center, y: b.height })) : [];

    const { min, max } = def.plotRange(params);
    const isDiscrete = def.kind === 'discrete';
    const suggestedMax = yAxisMax(densityPoints);

    const densityDataset = isDiscrete
      ? {
          type: 'bar' as const,
          label: labels.density,
          data: densityPoints,
          backgroundColor: colors.line,
          barThickness: 'flex' as const,
          order: 1,
        }
      : {
          type: 'line' as const,
          label: labels.density,
          data: densityPoints,
          borderColor: colors.line,
          backgroundColor: colors.fill,
          fill: true,
          pointRadius: 0,
          borderWidth: 2,
          order: 1,
        };

    const histDataset = {
      type: 'bar' as const,
      label: labels.histogram,
      data: histPoints,
      backgroundColor: colors.histogram,
      barThickness: 'flex' as const,
      order: 2,
    };

    const datasets = hist ? [densityDataset, histDataset] : [densityDataset];

    if (chartRef.current) {
      // 再生成せずデータ差し替え+update('none')にすることで、
      // スライダー操作中も60fps近くで追従する
      const chart = chartRef.current;
      chart.data.datasets = datasets;
      const scales = chart.options.scales as Record<string, Record<string, unknown>>;
      scales.x.min = isDiscrete ? min - 0.5 : min;
      scales.x.max = isDiscrete ? max + 0.5 : max;
      scales.y.max = suggestedMax;
      chart.update('none');
      return;
    }

    chartRef.current = new Chart(canvas, {
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'nearest', axis: 'x', intersect: false },
        plugins: {
          tooltip: {
            callbacks: {
              title: (items) =>
                items.length > 0 ? `x = ${Number(Number(items[0].parsed.x).toFixed(4))}` : '',
              label: (item) => `${item.dataset.label}: ${Number(Number(item.parsed.y).toFixed(4))}`,
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: isDiscrete ? min - 0.5 : min,
            max: isDiscrete ? max + 0.5 : max,
            grid: { color: colors.grid },
            ticks: { color: colors.ticks, maxTicksLimit: 11 },
            ...(isDiscrete ? { afterBuildTicks: integerTicks } : {}),
          },
          y: {
            beginAtZero: true,
            max: suggestedMax,
            grid: { color: colors.grid },
            ticks: { color: colors.ticks, maxTicksLimit: 6 },
          },
        },
      },
    });
  }, [def, params, histogram, labels.density, labels.histogram]);

  // テーマ切り替え時は色だけ差し替える(データ再計算は不要)。
  // themeは本体で参照しないが、CSS変数の値が変わったことを知る唯一のシグナルなので依存に含める
  // biome-ignore lint/correctness/useExhaustiveDependencies(theme): 上記コメント参照
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const colors = readChartColors();
    for (const dataset of chart.data.datasets) {
      if (dataset.type === 'line') {
        dataset.borderColor = colors.line;
        dataset.backgroundColor = colors.fill;
      } else if (dataset.label === labels.histogram) {
        dataset.backgroundColor = colors.histogram;
      } else {
        dataset.backgroundColor = colors.line;
      }
    }
    const scales = chart.options.scales as Record<
      string,
      { grid?: { color?: string }; ticks?: { color?: string } }
    >;
    for (const axis of ['x', 'y'] as const) {
      const scale = scales[axis];
      if (scale.grid) scale.grid.color = colors.grid;
      if (scale.ticks) scale.ticks.color = colors.ticks;
    }
    chart.update('none');
  }, [theme, labels.histogram]);

  useEffect(
    () => () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    },
    [],
  );

  return (
    <div className="relative h-[220px]">
      <canvas ref={canvasRef} role="img" />
    </div>
  );
}
