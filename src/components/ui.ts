/**
 * 複数コンポーネントで共有するTailwindユーティリティクラスの組。
 * 自作CSSクラスを増やさずに見た目を統一するための置き場
 * (1箇所でしか使わないスタイルは各コンポーネントに直接書く)。
 */

/** 枠線+ホバーでアクセント色になる汎用テキストボタン */
export const textButtonClass =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-card ' +
  'px-3 py-[7px] text-sm text-muted transition-colors hover:border-accent hover:text-accent';

/** 正方形のアイコンボタン(テーマ切替・カード非表示) */
export const iconButtonClass =
  'inline-flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-lg ' +
  'border border-border bg-card text-muted transition-colors hover:border-accent hover:text-accent';
