import { en } from './en';
import { ja, type MessageKey } from './ja';

export type Locale = 'ja' | 'en';
export type { MessageKey };

export const LOCALES: readonly Locale[] = ['ja', 'en'];

const dictionaries: Record<Locale, Record<MessageKey, string>> = { ja, en };

const BCP47: Record<Locale, string> = { ja: 'ja-JP', en: 'en-US' };

// Intl.NumberFormatの生成は比較的重く、スライダー操作のたびに大量に呼ばれるためキャッシュする
const numberFormats = new Map<Locale, Intl.NumberFormat>();

/**
 * 桁数はここで一括制御する。統計量は有効2桁の小数で十分読め、
 * それ以上は例文の中でノイズになる。
 */
export function formatNumber(locale: Locale, value: number): string {
  let format = numberFormats.get(locale);
  if (!format) {
    format = new Intl.NumberFormat(BCP47[locale], { maximumFractionDigits: 2 });
    numberFormats.set(locale, format);
  }
  return format.format(value);
}

/**
 * 翻訳 + {placeholder} 補間。
 * 外部i18nライブラリを使わないのは、必要機能がこの数十行で足りることと、
 * 依存を増やさない方針(npm supply chain対策)のため。
 */
export function translate(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, number | string>,
): string {
  const template = dictionaries[locale][key];
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = vars[name];
    if (value === undefined) return match;
    return typeof value === 'number' ? formatNumber(locale, value) : value;
  });
}

/** ブラウザの言語設定から初期ロケールを推定する */
export function detectLocale(): Locale {
  const lang = typeof navigator !== 'undefined' ? navigator.language : 'ja';
  return lang.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

export function isLocale(value: string): value is Locale {
  return value === 'ja' || value === 'en';
}
