/**
 * Google Analytics 4へのカスタムイベント送信。
 * gtagは本番ホストでのみ読み込まれる(index.htmlのガード参照)ため、
 * 未定義なら黙って何もしない = 開発中の操作は一切計測されない。
 * 分析の目的: どの分布が触られているか / 各機能(標本シミュレーション・
 * ヘルプ・言語/テーマ切替)がどれだけ使われているか。
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string>): void {
  window.gtag?.('event', name, params);
}

// param_changeはスライダー操作のたびに呼ばれるため、分布ごとにデバウンスして
// 「ひと続きの操作 = 1イベント」に丸める(1ドラッグで数十イベント送らない)
const paramChangeTimers = new Map<string, ReturnType<typeof setTimeout>>();

export function trackParamChange(distribution: string): void {
  const existing = paramChangeTimers.get(distribution);
  if (existing) clearTimeout(existing);
  paramChangeTimers.set(
    distribution,
    setTimeout(() => {
      paramChangeTimers.delete(distribution);
      trackEvent('param_change', { distribution });
    }, 1000),
  );
}

// ヘルプは「開いたことがあるか(発見されたか)」が知りたいので、
// ホバーの出入りで連発しないようページ表示ごとに1回だけ送る
const helpOpened = new Set<string>();

export function trackHelpOpen(topic: string): void {
  if (helpOpened.has(topic)) return;
  helpOpened.add(topic);
  trackEvent('help_open', { topic });
}
