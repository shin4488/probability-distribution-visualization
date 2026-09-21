import { type Dispatch, useEffect, useRef } from 'react';
import { trackCategorySelect, trackEvent } from '../analytics';
import { DISTRIBUTION_IDS } from '../domain/distributions';
import type { DistributionId } from '../domain/types';
import { CATEGORIES, type Category, GUIDE_CASES } from '../guide/catalog';
import { type MessageKey, translate } from '../i18n';
import type { Action, AppState } from '../state/appState';
import { encodeAppState } from '../state/urlCodec';
import { CaseIllustration } from './CaseIllustration';
import { textButtonClass } from './ui';

const CATEGORY_PICTURES: Record<Exclude<Category, 'all'>, DistributionId> = {
  outcome: 'bernoulli',
  count: 'binomial',
  waiting: 'exponential',
  measurement: 'normal',
  proportion: 'beta',
};

export function CaseGuide({ state, dispatch }: { state: AppState; dispatch: Dispatch<Action> }) {
  const t = (key: MessageKey) => translate(state.locale, key);
  const selected = GUIDE_CASES.find((item) => item.id === state.selectedCase);
  const cases = GUIDE_CASES.filter(
    (item) => state.category === 'all' || item.category === state.category,
  );
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousCase = useRef(state.selectedCase);
  const previousCategory = useRef(state.category);
  useEffect(() => {
    if (
      previousCase.current !== state.selectedCase ||
      previousCategory.current !== state.category
    ) {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({ block: 'start' });
      previousCase.current = state.selectedCase;
      previousCategory.current = state.category;
    }
  }, [state.selectedCase, state.category]);
  const chartHref = (id: DistributionId) =>
    `?${encodeAppState({
      ...state,
      page: 'charts',
      hidden: DISTRIBUTION_IDS.filter((other) => other !== id),
      showUseCases: true,
    })}`;
  return (
    <main>
      {!selected ? (
        <>
          <section className="mb-8 rounded-2xl border border-border bg-card px-6 py-7 shadow-card sm:px-9 sm:py-9">
            <p className="mb-3 text-xs font-bold tracking-widest text-accent">
              {t('guide.eyebrow')}
            </p>
            <h2 className="text-2xl font-bold leading-relaxed tracking-tight sm:text-3xl">
              {t('guide.title')}
            </h2>
            <ol className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm">
              {(['step1', 'step2', 'step3'] as const).map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  {t(`guide.${step}`)}
                </li>
              ))}
            </ol>
          </section>
          <section aria-labelledby="guide-categories" className="mb-9">
            <h2 id="guide-categories" className="mb-4 text-lg font-bold">
              {t('guide.categoryLabel')}
            </h2>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
              {CATEGORIES.filter((category) => category !== 'all').map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={state.category === category}
                  onClick={() => {
                    if (state.category !== category) trackCategorySelect(category);
                    dispatch({ type: 'selectCategory', category });
                  }}
                  className={`cursor-pointer rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${state.category === category ? 'border-accent bg-accent-soft ring-1 ring-accent' : 'border-border bg-card hover:border-accent'}`}
                >
                  <div className="mb-3 h-16">
                    <CaseIllustration id={CATEGORY_PICTURES[category]} locale={state.locale} />
                  </div>
                  <span className="block text-sm font-bold">{t(`guide.category.${category}`)}</span>
                  <span className="mt-1.5 block text-xs leading-5 text-muted">
                    {t(`guide.category.${category}.hint`)}
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section aria-labelledby="guide-cases">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2
                id="guide-cases"
                ref={headingRef}
                tabIndex={-1}
                className="scroll-mt-6 text-lg font-bold outline-none"
              >
                {t('guide.caseLabel')}
              </h2>
              {state.category !== 'all' && (
                <button
                  type="button"
                  className={textButtonClass}
                  onClick={() => {
                    trackCategorySelect('all');
                    dispatch({ type: 'selectCategory', category: 'all' });
                  }}
                >
                  {t('guide.showAll')}
                </button>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {cases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => dispatch({ type: 'selectCase', id: item.id })}
                  className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-border bg-card p-5 text-left shadow-card transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:flex-row sm:items-center"
                >
                  <div className="h-24 w-full shrink-0 rounded-lg bg-accent-soft p-2 sm:w-36">
                    <CaseIllustration id={item.id} locale={state.locale} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold leading-7 group-hover:text-accent">
                      {t(`guide.case.${item.id}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {t(`guide.case.${item.id}.summary`)}
                    </p>
                    <span className="mt-3 block text-xs font-semibold text-accent">
                      {t('guide.next')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <header className="mb-6 flex flex-col gap-4 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-8">
            <button
              type="button"
              className={`${textButtonClass} shrink-0 self-start lg:self-center`}
              onClick={() => dispatch({ type: 'selectCase', id: null })}
            >
              ← {t('guide.back')}
            </button>
            <div className="min-w-0">
              <p className="mb-2 text-xs font-bold tracking-wider text-accent">
                {t('guide.detailLabel')}
              </p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="scroll-mt-6 text-2xl font-bold leading-relaxed outline-none sm:text-3xl"
              >
                {t(`guide.case.${selected.id}.title`)}
              </h2>
            </div>
          </header>
          <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <figure className="rounded-xl bg-accent-soft p-5">
                <div className="mx-auto h-36 max-w-sm">
                  <CaseIllustration id={selected.id} locale={state.locale} />
                </div>
                <figcaption className="mt-3 text-center text-sm font-semibold leading-6">
                  {t(`guide.scene.${selected.id}`)}
                </figcaption>
              </figure>
              <div className="py-4 text-center text-xl text-accent" aria-hidden="true">
                ↓
              </div>
              <p className="text-xs font-semibold text-muted">{t('guide.candidate')}</p>
              <h3 className="mt-2 text-2xl font-bold text-accent">
                {t(`dist.${selected.id}.name`)}
              </h3>
              <p className="mt-3 text-sm leading-7">{t(`guide.case.${selected.id}.why`)}</p>
              <a
                href={chartHref(selected.id)}
                onClick={() =>
                  trackEvent('guide_chart_open', {
                    distribution: selected.id,
                    guide_category: state.category,
                  })
                }
                className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-accent px-4 py-3 text-sm font-bold text-on-accent hover:opacity-90"
              >
                {t('guide.open')} <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="space-y-4">
              <section className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold">{t('guide.conditions')}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {t(`guide.case.${selected.id}.conditions`)}
                </p>
                <h3 className="mt-5 font-bold">{t('guide.caution')}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {t(`guide.case.${selected.id}.caution`)}
                </p>
              </section>
              <section className="rounded-xl border border-accent/30 bg-accent-soft p-5">
                <h3 className="text-xs font-bold text-muted">{t('guide.alternative')}</h3>
                <p className="mt-2 text-sm leading-6">
                  {t(`guide.case.${selected.id}.alternative`)}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('guide_alternative_select', {
                      distribution: selected.alternative,
                      from_distribution: selected.id,
                    });
                    dispatch({ type: 'selectCase', id: selected.alternative });
                  }}
                  className="mt-3 cursor-pointer text-sm font-bold text-accent underline underline-offset-4"
                >
                  {t(`dist.${selected.alternative}.name`)} →
                </button>
              </section>
            </div>
          </div>
          <section className="mt-5 text-sm text-muted" aria-labelledby="guide-references">
            <h3 id="guide-references" className="font-semibold">
              {t('guide.references')}
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  className="underline"
                  href="https://www.itl.nist.gov/div898/handbook/eda/section3/eda366.htm"
                >
                  NIST: Gallery of Distributions
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://stat.ethz.ch/R-manual/R-devel/library/stats/html/NegBinomial.html"
                >
                  R: Negative Binomial Distribution
                </a>
              </li>
            </ul>
          </section>
        </>
      )}
    </main>
  );
}
