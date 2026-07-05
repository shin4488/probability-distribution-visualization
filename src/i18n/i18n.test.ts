import { describe, expect, it } from 'vitest';
import { DISTRIBUTIONS } from '../domain/distributions';
import { defaultParams } from '../domain/types';
import { en } from './en';
import { ja } from './ja';

/**
 * UI側は `dist.${id}.${suffix}` を文字列連結+キャストで引くため、
 * 型システムだけでは「分布を追加したのに辞書キーを忘れた」ことを検出できない。
 * このテストがレジストリと辞書を突き合わせて、その穴を塞ぐ。
 */
describe('分布レジストリとi18n辞書の整合', () => {
  const dictionaries = { ja, en } as const;

  for (const [localeName, dict] of Object.entries(dictionaries)) {
    const lookup = dict as Record<string, string>;

    it(`${localeName}: 全分布のname/tagline/usecase/paramラベルが定義されている`, () => {
      for (const def of DISTRIBUTIONS) {
        for (const suffix of ['name', 'tagline', 'usecase']) {
          expect(lookup[`dist.${def.id}.${suffix}`], `dist.${def.id}.${suffix}`).toBeTypeOf(
            'string',
          );
        }
        for (const param of def.params) {
          expect(
            lookup[`dist.${def.id}.param.${param.key}`],
            `dist.${def.id}.param.${param.key}`,
          ).toBeTypeOf('string');
        }
      }
    });

    it(`${localeName}: usecaseの{プレースホルダ}がすべてuseCaseValues()に存在する`, () => {
      for (const def of DISTRIBUTIONS) {
        // biome-ignore lint/correctness/useHookAtTopLevel: useCaseValuesはuse接頭辞だがReactフックではない(テスト内の純関数呼び出し)
        const values = def.useCaseValues(defaultParams(def));
        const template = lookup[`dist.${def.id}.usecase`] ?? '';
        for (const match of template.matchAll(/\{(\w+)\}/g)) {
          expect(values, `dist.${def.id}.usecase の {${match[1]}}`).toHaveProperty(match[1]);
        }
      }
    });
  }
});
