import type { DistributionId } from '../domain/types';
import type { Locale, MessageKey } from '../i18n';
import { translate } from '../i18n';

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
    <fieldset className="filter-bar" aria-label={t('ui.filterLabel')}>
      <span className="filter-label">{t('ui.filterLabel')}:</span>
      {order.map((id) => {
        const visible = !hidden.includes(id);
        return (
          <button
            key={id}
            type="button"
            className={`chip${visible ? ' chip-active' : ''}`}
            onClick={() => onToggle(id)}
            aria-pressed={visible}
          >
            {t(`dist.${id}.name` as MessageKey)}
          </button>
        );
      })}
      {hidden.length > 0 && (
        <button type="button" className="text-button" onClick={onShowAll}>
          {t('ui.showAll')}
        </button>
      )}
    </fieldset>
  );
}
