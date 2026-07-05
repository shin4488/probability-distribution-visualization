import type { MessageKey } from './ja';

// satisfiesにより、日本語辞書とキー集合がずれるとコンパイルエラーになる
export const en = {
  'ui.title': 'Probability Distribution Visualizer',
  'ui.tagline': 'Play with the parameters and see how each distribution behaves',
  'ui.themeToDark': 'Switch to dark mode',
  'ui.themeToLight': 'Switch to light mode',
  'ui.filterLabel': 'Distributions',
  'ui.showAll': 'Show all',
  'ui.reset': 'Reset',
  'ui.resetTitle': 'Reset all settings to defaults',
  'ui.allHidden': 'All distributions are hidden. Pick some from the buttons above.',
  'ui.dragHint': 'Drag to reorder',
  'ui.hideCard': 'Hide this card',
  'ui.mean': 'Mean',
  'ui.sd': 'Std dev',
  'ui.histogram': 'Sample histogram',
  'ui.sampleSize': 'Sample size',
  'ui.regenerate': 'Resample',
  'ui.usecaseTitle': 'How it is used',
  'ui.chartDensity': 'Density',
  'ui.chartMass': 'Probability',
  'ui.chartHistogram': 'Samples',
  'ui.langLabel': 'Language',

  'dist.normal.name': 'Normal',
  'dist.normal.tagline': 'The classic bell curve: symmetric spread around a mean',
  'dist.normal.param.mu': 'Mean μ',
  'dist.normal.param.sigma': 'Std dev σ',
  'dist.normal.usecase':
    'Quantities built from many small additive effects — test scores, heights, measurement errors — tend to be normal. With mean {mu} and standard deviation {sigma}, about 68% of values fall between {lo1} and {hi1}, and about 95% between {lo2} and {hi2}. Standardized scores and ±3σ quality-control limits rely on exactly this.',

  'dist.binomial.name': 'Binomial',
  'dist.binomial.tagline': 'Number of successes in n independent trials',
  'dist.binomial.param.n': 'Trials n',
  'dist.binomial.param.p': 'Success probability p',
  'dist.binomial.usecase':
    'Run {n} sales meetings with a {pPct}% close rate and you close {mean} deals on average, with about a 95% chance of landing between {lo} and {hi}. Use it to estimate the plausible range of email opens, defective items in a lot, or A/B-test conversions.',

  'dist.poisson.name': 'Poisson',
  'dist.poisson.tagline': 'How many rare events happen in a fixed window',
  'dist.poisson.param.lambda': 'Average rate λ',
  'dist.poisson.usecase':
    'A call center receiving {lambda} inquiries per hour on average can staff for {capacity} calls and still be overwhelmed about {overflowPct}% of the time. It is the go-to model for counts: server requests, traffic accidents, incident reports.',

  'dist.bernoulli.name': 'Bernoulli',
  'dist.bernoulli.tagline': 'A single yes (1) / no (0) trial',
  'dist.bernoulli.param.p': 'Success probability p',
  'dist.bernoulli.usecase':
    'Show an ad with a {pPct}% click rate once: it gets clicked (1) with probability {pPct}% and ignored (0) with probability {qPct}%. It is the atomic unit of every binary event — coin flips, pass/fail, purchase/no purchase. Repeat it 100 times and you expect {per100} clicks (summing these gives the binomial).',

  'dist.exponential.name': 'Exponential',
  'dist.exponential.tagline': 'Waiting time until the next event',
  'dist.exponential.param.lambda': 'Rate λ (per minute)',
  'dist.exponential.usecase':
    'For events occurring {lambda} times per minute on average (mean gap {mean} min), the chance of waiting more than {waitLimit} minutes for the next one is about {waitPct}%. It models arrival gaps at a counter, time to hardware failure, and intervals between requests — the backbone of queueing and reliability design.',

  'dist.beta.name': 'Beta',
  'dist.beta.tagline': 'A distribution over rates and probabilities (0 to 1)',
  'dist.beta.param.alpha': 'Shape α',
  'dist.beta.param.beta': 'Shape β',
  'dist.beta.usecase':
    'α={alpha}, β={beta} reads as your belief about a conversion rate after seeing {successes} successes and {failures} failures, with an estimated mean of {meanPct}%. It powers Bayesian A/B testing and expresses uncertainty about rates when data is scarce — watch the peak sharpen as observations grow.',

  'dist.gamma.name': 'Gamma',
  'dist.gamma.tagline': 'Total waiting time; positive with a right tail',
  'dist.gamma.param.shape': 'Shape k (count)',
  'dist.gamma.param.scale': 'Scale θ (mean per task)',
  'dist.gamma.usecase':
    'The total time to finish {count} tasks that each take {scale} minutes on average follows this shape, with mean {mean} and standard deviation {sd} minutes. It fits call-center handle time totals, insurance claim totals, rainfall — anything positive and right-skewed.',

  'dist.lognormal.name': 'Log-normal',
  'dist.lognormal.tagline': 'Quantities that grow multiplicatively; long right tail',
  'dist.lognormal.param.mu': 'Log-mean μ',
  'dist.lognormal.param.sigma': 'Log-std dev σ',
  'dist.lognormal.usecase':
    'Incomes, house prices, and web response times arise from compounding multiplicative factors. With μ={mu} and σ={sigma}, the median is {median} but the mean is {mean} — dragged upward by the long right tail. This is why the average salary always sounds higher than what most people earn.',
  'dist.negbinomial.name': 'Negative binomial',
  'dist.negbinomial.tagline':
    'Failures until the r-th success — the sum (composition) of r geometric distributions',
  'dist.negbinomial.param.r': 'Successes r',
  'dist.negbinomial.param.p': 'Success probability p',
  'dist.negbinomial.usecase':
    'With a {pPct}% close rate, this models how many rejections you take before landing {r} deals: {mean} rejections on average, or {totalTrials} visits including the successes. It is built by summing {r} geometric distributions, each counting the failures of repeated {pPct}%-Bernoulli trials until one success (the binomial fixes the number of trials and counts successes; this fixes the successes and counts trials — the mirror image). It is also the standard model for overdispersed count data that the Poisson cannot fit.',
} as const satisfies Record<MessageKey, string>;
