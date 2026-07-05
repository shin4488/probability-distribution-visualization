import type { DistributionId } from '../domain/types';
import type { Locale, MessageKey } from '../i18n';
import { translate } from '../i18n';
import { textButtonClass } from './ui';

interface Props {
  locale: Locale;
  /** 現在の表示順に従って並べる(カードの並びと一致させて迷わせない) */
  order: DistributionId[];
  hidden: DistributionId[];
  onToggle: (id: DistributionId) => void;
  onShowAll: () => void;
}

export function FilterChips({ locale, order, hidden, onToggle, onShowAll }: Props) {
  const t = (key: MessageKey) => translate(locale, key);
  return (
    <fieldset
      className="flex flex-wrap items-center gap-2 pt-1 pb-5"
      aria-label={t('ui.filterLabel')}
    >
      <span className="text-sm text-muted">{t('ui.filterLabel')}:</span>
      {order.map((id) => {
        const visible = !hidden.includes(id);
        return (
          <button
            key={id}
            type="button"
            className={`cursor-pointer rounded-full border px-[13px] py-[5px] text-[0.83rem] transition-colors ${
              visible
                ? 'border-accent bg-accent-soft font-semibold text-accent'
                : 'border-border bg-card text-muted'
            }`}
            onClick={() => onToggle(id)}
            aria-pressed={visible}
          >
            {t(`dist.${id}.name` as MessageKey)}
          </button>
        );
      })}
      {hidden.length > 0 && (
        <button type="button" className={textButtonClass} onClick={onShowAll}>
          {t('ui.showAll')}
        </button>
      )}
    </fieldset>
  );
}
