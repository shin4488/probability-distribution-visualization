import type { DistributionId } from '../domain/types';

export const CATEGORIES = [
  'all',
  'outcome',
  'count',
  'waiting',
  'measurement',
  'proportion',
] as const;
export type Category = (typeof CATEGORIES)[number];
export interface GuideCase {
  id: DistributionId;
  category: Exclude<Category, 'all'>;
  alternative: DistributionId;
}
export const GUIDE_CASES: readonly GuideCase[] = [
  { id: 'bernoulli', category: 'outcome', alternative: 'binomial' },
  { id: 'binomial', category: 'count', alternative: 'beta' },
  { id: 'poisson', category: 'count', alternative: 'negbinomial' },
  { id: 'negbinomial', category: 'count', alternative: 'poisson' },
  { id: 'geometric', category: 'waiting', alternative: 'exponential' },
  { id: 'exponential', category: 'waiting', alternative: 'gamma' },
  { id: 'gamma', category: 'waiting', alternative: 'lognormal' },
  { id: 'normal', category: 'measurement', alternative: 'lognormal' },
  { id: 'lognormal', category: 'measurement', alternative: 'gamma' },
  { id: 'beta', category: 'proportion', alternative: 'binomial' },
];

export function isCategory(value: string): value is Category {
  return CATEGORIES.some((category) => category === value);
}
