import type { DistributionId } from './domain/types';
import type { Category } from './guide/catalog';
import type { AppState } from './state/appState';

/** Production-only GA4. Local verification uses a spy; no test hits go to GA. */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Params = Record<string, string | number>;
type ViewState = Pick<AppState, 'page' | 'selectedCase' | 'category'>;
let context: Params = {};
let previousLocation: string | undefined;
const explored = new Set<DistributionId>();
const helpOpened = new Set<string>();
const pending = new Map<string, { timer: ReturnType<typeof setTimeout>; send: () => void }>();

export function trackEvent(name: string, params: Params = {}): void {
  window.gtag?.('event', name, { ...context, ...params });
}

/** Only content navigation is a page view. Filters, language and numerical values are not. */
export function trackPageView(state: ViewState): void {
  const pageType =
    state.page === 'charts' ? 'charts' : state.selectedCase ? 'guide_detail' : 'guide_list';
  const suffix =
    state.page === 'guide'
      ? `?page=guide${state.selectedCase ? `&case=${state.selectedCase}` : ''}`
      : '';
  const pageLocation = `${window.location.origin}${window.location.pathname}${suffix}`;
  context = { page_type: pageType, measurement_version: '2' };
  if (pageLocation === previousLocation) return;
  flushPendingEvents();
  const pageTitle =
    pageType === 'charts'
      ? 'Distribution charts'
      : state.selectedCase
        ? `Use case: ${state.selectedCase}`
        : 'Find by use case';
  const params: Params = { ...context, page_location: pageLocation, page_title: pageTitle };
  // Keep standard campaign attribution when removing app settings from page_location.
  if (!previousLocation) {
    const query = new URLSearchParams(window.location.search);
    for (const [key, field] of Object.entries({
      utm_id: 'campaign_id',
      utm_source: 'campaign_source',
      utm_medium: 'campaign_medium',
      utm_campaign: 'campaign_name',
      utm_term: 'campaign_term',
      utm_content: 'campaign_content',
    })) {
      const value = query.get(key);
      if (value) params[field] = value;
    }
  }
  if (previousLocation) params.page_referrer = previousLocation;
  window.gtag?.('set', params);
  previousLocation = pageLocation;
  trackEvent('page_view', params);
  if (state.page === 'guide') {
    trackEvent(state.selectedCase ? 'guide_case_view' : 'guide_view', {
      guide_category: state.category,
      ...(state.selectedCase ? { distribution: state.selectedCase } : {}),
    });
  }
}

export function trackCategorySelect(category: Category): void {
  trackEvent('guide_category_select', { guide_category: category });
}

/** A real action, once per distribution per document. This does not imply understanding. */
export function trackExplore(distribution: DistributionId, action: string): void {
  if (explored.has(distribution)) return;
  explored.add(distribution);
  trackEvent('distribution_explore', { distribution, action });
}

/** One settled change per burst; snapshot context so navigation cannot misattribute it. */
export function trackParamChange(distribution: DistributionId, parameter: string): void {
  trackExplore(distribution, parameter === 'sample_size' ? 'sample_size' : 'parameter');
  const event = parameter === 'sample_size' ? 'sample_size_change' : 'param_change';
  const key = `${event}:${distribution}:${parameter}`;
  const existing = pending.get(key);
  if (existing) clearTimeout(existing.timer);
  const params = { ...context, distribution, parameter };
  const send = () => window.gtag?.('event', event, params);
  pending.set(key, {
    send,
    timer: setTimeout(() => {
      pending.delete(key);
      send();
    }, 1000),
  });
}

/** Flush on pagehide/hidden, including quick exits immediately after dragging. */
export function flushPendingEvents(): void {
  for (const { timer, send } of pending.values()) {
    clearTimeout(timer);
    send();
  }
  pending.clear();
}

export function trackHelpOpen(topic: string): void {
  if (helpOpened.has(topic)) return;
  helpOpened.add(topic);
  trackEvent('help_open', { topic });
}
