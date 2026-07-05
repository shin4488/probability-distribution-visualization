import {
  BarController,
  BarElement,
  Chart,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

// Chart.js v4はツリーシェイキング前提の設計のため、使う部品だけ登録して
// バンドルサイズを抑える(auto importだと全コントローラが入る)
Chart.register(
  LineController,
  BarController,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
);

export { Chart };

export interface ChartColors {
  line: string;
  fill: string;
  histogram: string;
  grid: string;
  ticks: string;
}

/**
 * グラフの色はCSSカスタムプロパティから読む。
 * テーマの定義箇所をstyles.cssの1箇所に保つため、JS側に色を直書きしない。
 */
export function readChartColors(): ChartColors {
  const style = getComputedStyle(document.documentElement);
  const v = (name: string) => style.getPropertyValue(name).trim();
  return {
    line: v('--chart-line'),
    fill: v('--chart-fill'),
    histogram: v('--chart-histogram'),
    grid: v('--chart-grid'),
    ticks: v('--chart-ticks'),
  };
}
