import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

let analytics: typeof import('./analytics');
const gtag = vi.fn();
const view = { page: 'charts', selectedCase: null, category: 'all' } as const;

beforeEach(async () => {
  vi.useFakeTimers();
  vi.resetModules();
  gtag.mockClear();
  vi.stubGlobal('window', {
    gtag,
    location: {
      origin: 'https://example.test',
      pathname: '/visualizer/',
      search: '?normal=90,12&lang=ja',
    },
  });
  analytics = await import('./analytics');
});
afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
const events = (name: string) =>
  gtag.mock.calls.filter(([command, event]) => command === 'event' && event === name);

describe('meaningful analytics', () => {
  it('counts initial content once even if effects repeat, without numerical or preference URLs', () => {
    analytics.trackPageView(view);
    analytics.trackPageView(view);
    analytics.trackPageView({ ...view, selectedCase: 'normal', category: 'measurement' });
    expect(events('page_view')).toHaveLength(1);
    expect(events('page_view')[0][2]).toMatchObject({
      page_type: 'charts',
      page_location: 'https://example.test/visualizer/',
    });
    expect(JSON.stringify(gtag.mock.calls)).not.toContain('normal=90');
  });
  it('counts detail changes and return visits, but not category filter changes as new pages', () => {
    analytics.trackPageView({ ...view, page: 'guide' });
    analytics.trackPageView({ ...view, page: 'guide', category: 'count' });
    analytics.trackPageView({ page: 'guide', selectedCase: 'poisson', category: 'count' });
    analytics.trackPageView({ page: 'guide', selectedCase: 'negbinomial', category: 'count' });
    analytics.trackPageView({ ...view, page: 'guide' });
    expect(events('page_view')).toHaveLength(4);
    expect(events('guide_view')).toHaveLength(2);
    expect(events('guide_case_view').map((call) => call[2].distribution)).toEqual([
      'poisson',
      'negbinomial',
    ]);
    expect(events('page_view')[2][2].page_referrer).toBe(
      'https://example.test/visualizer/?page=guide&case=poisson',
    );
  });
  it('records one exploration per distribution, and one settled change per control burst', () => {
    analytics.trackPageView(view);
    analytics.trackParamChange('normal', 'mu');
    vi.advanceTimersByTime(700);
    analytics.trackParamChange('normal', 'mu');
    analytics.trackExplore('normal', 'histogram');
    analytics.trackExplore('beta', 'histogram');
    vi.advanceTimersByTime(999);
    expect(events('param_change')).toHaveLength(0);
    vi.advanceTimersByTime(1);
    expect(events('param_change')).toHaveLength(1);
    expect(events('distribution_explore')).toHaveLength(2);
  });
  it('keeps independent controls separate and flushes on exit without duplicate timers', () => {
    analytics.trackPageView(view);
    analytics.trackParamChange('normal', 'mu');
    analytics.trackParamChange('normal', 'sigma');
    analytics.trackParamChange('normal', 'sample_size');
    analytics.flushPendingEvents();
    analytics.flushPendingEvents();
    vi.runAllTimers();
    expect(events('param_change')).toHaveLength(2);
    expect(events('sample_size_change')).toHaveLength(1);
  });
  it('attributes pending input to the originating page when navigating', () => {
    analytics.trackPageView(view);
    analytics.trackParamChange('normal', 'mu');
    analytics.trackPageView({ ...view, page: 'guide' });
    expect(events('param_change')[0][2].page_type).toBe('charts');
    analytics.trackEvent('feedback_rating', { rating: 'up' });
    expect(events('feedback_rating')[0][2].page_type).toBe('guide_list');
  });
  it('preserves standard campaign attribution without keeping app settings in page_location', () => {
    window.location.search =
      '?utm_source=newsletter&utm_medium=email&utm_campaign=autumn&normal=90,12';
    analytics.trackPageView(view);
    expect(events('page_view')[0][2]).toMatchObject({
      campaign_source: 'newsletter',
      campaign_medium: 'email',
      campaign_name: 'autumn',
      page_location: 'https://example.test/visualizer/',
    });
  });
  it('does not require a tag on localhost or when analytics is blocked', () => {
    window.gtag = undefined;
    expect(() => {
      analytics.trackPageView(view);
      analytics.trackParamChange('normal', 'mu');
      analytics.flushPendingEvents();
      analytics.trackHelpOpen('sample_simulation');
    }).not.toThrow();
    expect(gtag).not.toHaveBeenCalled();
  });
});
