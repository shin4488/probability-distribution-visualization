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
  'ui.histogram': 'Sample simulation',
  'ui.histogramHelp':
    'Generates as many random numbers following this distribution as the sample size, and overlays their histogram on the theoretical curve. Increase the sample size to watch it converge to the theory (the law of large numbers).',
  'ui.helpLabel': 'Help',
  'ui.sampleSize': 'Sample size',
  'ui.regenerate': 'Resample',
  'ui.usecaseTitle': 'How it is used',
  'ui.chartDensity': 'Density',
  'ui.chartMass': 'Probability',
  'ui.chartHistogram': 'Samples',
  'ui.langLabel': 'Language',

  'dist.bernoulli.name': 'Bernoulli',
  'dist.bernoulli.tagline':
    'The atomic unit of every binary event: a single trial that happens (1) with probability p or not (0) with 1-p',
  'dist.bernoulli.param.p': 'Success probability p',
  'dist.bernoulli.usecase':
    'Show an ad with a {pPct}% click rate once: it gets clicked (1) with probability {pPct}% and ignored (0) with probability {qPct}%. Show it 100 times and you expect {per100} clicks. It appears in every probabilistic yes/no situation — coin flips, pass/fail inspections, closing a deal or not.',

  'dist.binomial.name': 'Binomial',
  'dist.binomial.tagline':
    'Number of successes in n repeated trials — the sum of n Bernoulli trials',
  'dist.binomial.param.n': 'Trials n',
  'dist.binomial.param.p': 'Success probability p',
  'dist.binomial.usecase':
    'Run {n} sales meetings with a {pPct}% close rate and you close {mean} deals on average, with about a 95% chance of landing between {lo} and {hi}. Use it to estimate the plausible range of email opens, defective items in a lot, or A/B-test conversions.',

  'dist.geometric.name': 'Geometric',
  'dist.geometric.tagline':
    'Failures before the first success in repeated Bernoulli trials — the discrete counterpart of the exponential',
  'dist.geometric.param.p': 'Success probability p',
  'dist.geometric.usecase':
    'With a {pPct}% drop rate in a gacha game, you miss {mean} times on average before the first hit (which arrives on try {trials} on average) — yet a {streak}-miss streak still has a {streakPct}% chance. Use it to estimate sales visits until the first deal or inspections until the first defect: "when does the first success come?"',

  'dist.poisson.name': 'Poisson',
  'dist.poisson.tagline':
    'How many rare events happen in a fixed window — the limit of a binomial with large n and small p (λ≈np)',
  'dist.poisson.param.lambda': 'Average rate λ',
  'dist.poisson.usecase':
    'A call center receiving {lambda} inquiries per hour on average can staff for {capacity} calls and still be overwhelmed about {overflowPct}% of the time. The binomial situation "many customers, each calling with a tiny probability" collapses into a single number, λ={lambda} — which is what makes it so practical for planning server requests, traffic accidents, and other counts.',

  'dist.exponential.name': 'Exponential',
  'dist.exponential.tagline':
    'Waiting time until the next event — the flip side of the Poisson and the continuous counterpart of the geometric',
  'dist.exponential.param.lambda': 'Rate λ (per minute)',
  'dist.exponential.usecase':
    'For events occurring {lambda} times per minute on average (mean gap {mean} min), the chance of waiting more than {waitLimit} minutes for the next one is about {waitPct}%. It models arrival gaps at a counter, time to hardware failure, and intervals between requests — the backbone of queueing and reliability design.',

  'dist.gamma.name': 'Gamma',
  'dist.gamma.tagline':
    'Total waiting time until k events occur at a constant rate — the sum of k exponentials',
  'dist.gamma.param.shape': 'Shape k (count)',
  'dist.gamma.param.scale': 'Scale θ (mean per task)',
  'dist.gamma.usecase':
    'The total time to handle k={shape} tasks that each take {scale} minutes on average, with mean {mean} and standard deviation {sd} minutes. It fits call-center handle-time totals, insurance claim totals, rainfall — anything positive and right-skewed.',

  'dist.negbinomial.name': 'Negative binomial',
  'dist.negbinomial.tagline':
    'A Poisson whose rate λ itself varies by a gamma distribution (a mixture) — counts with individual differences',
  'dist.negbinomial.param.r': 'Successes r',
  'dist.negbinomial.param.p': 'Success probability p',
  'dist.negbinomial.usecase':
    'If everyone purchased at the same pace, counts would be Poisson — but paces differ from person to person. When each customer’s rate λ follows a gamma distribution, the purchase counts you observe overall follow this negative binomial. With r={r}, p={p} the mean is {mean} and the variance is {overdispersion}× the mean (a Poisson is always 1×), making it the standard model for store visits, accidents, or social-media posts — count data noisier than Poisson. Equivalently it is the number of failures before {r} successes at a {pPct}% success rate: the sum of {r} geometric distributions (with r=1 it IS the geometric).',

  'dist.beta.name': 'Beta',
  'dist.beta.tagline':
    'A distribution over values in 0–1 (rates and probabilities themselves), built as the ratio X/(X+Y) of two gammas',
  'dist.beta.param.alpha': 'Shape α',
  'dist.beta.param.beta': 'Shape β',
  'dist.beta.usecase':
    'α={alpha}, β={beta} reads as your belief about a conversion rate after seeing {successes} successes and {failures} failures, with an estimated mean of {meanPct}%. It powers Bayesian A/B testing and expresses uncertainty about rates when data is scarce — watch the peak sharpen as observations grow.',

  'dist.normal.name': 'Normal',
  'dist.normal.tagline':
    'Where sums of many independent effects end up (the central limit theorem) — the symmetric bell curve',
  'dist.normal.param.mu': 'Mean μ',
  'dist.normal.param.sigma': 'Std dev σ',
  'dist.normal.usecase':
    'On a test with mean {mu} and standard deviation {sigma}, about 68% of people score between {lo1} and {hi1}, and about 95% between {lo2} and {hi2}. Heights, measurement errors, standardized scores, and ±3σ quality-control limits all build on this.',

  'dist.lognormal.name': 'Log-normal',
  'dist.lognormal.tagline':
    'A quantity whose logarithm is normal — driven by compounding multiplicative factors, with a long right tail',
  'dist.lognormal.param.mu': 'Log-mean μ',
  'dist.lognormal.param.sigma': 'Log-std dev σ',
  'dist.lognormal.usecase':
    'A model for incomes, house prices, and web response times. With μ={mu} and σ={sigma}, the median is {median} but the mean is {mean} — dragged upward by the long right tail. This is why the average salary always sounds higher than what most people earn.',
} as const satisfies Record<MessageKey, string>;
