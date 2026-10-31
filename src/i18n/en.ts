import { guideEn } from './guide.en';
import type { MessageKey } from './ja';

// satisfiesにより、日本語辞書とキー集合がずれるとコンパイルエラーになる
export const en = {
  ...guideEn,
  'ui.title': 'Probability Distribution Visualizer',
  'ui.docTitle': 'Probability Distribution Visualizer | Interactive Statistics',
  'ui.metaDescription':
    'Visualize 10 probability distributions — normal, binomial, Poisson, and more — with interactive parameter sliders, sample simulations, and practical real-world use cases.',
  'ui.tagline': "Move the parameters to get a feel for each distribution's shape and uses",
  'ui.homeTitle': 'Back to top (resets the parameters)',
  'ui.backToTop': 'Scroll back to the top',
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
    'Draws as many random samples from this distribution as the sample size and overlays their histogram on the theoretical curve. As the sample size grows, the histogram gets closer to the theoretical shape (the law of large numbers).',
  'ui.helpLabel': 'Help',
  'ui.sampleSize': 'Sample size',
  'ui.regenerate': 'Resample',
  'ui.usecaseTitle': 'How it is used',
  'ui.usecaseShow': 'Show use cases',
  'ui.usecaseHide': 'Hide use cases',
  'ui.chartDensity': 'Density',
  'ui.chartMass': 'Probability',
  'ui.chartHistogram': 'Samples',
  'ui.langLabel': 'Language',
  'ui.feedbackQuestion': 'Was this site helpful?',
  'ui.feedbackYes': 'Helpful',
  'ui.feedbackNo': 'Not really',
  'ui.feedbackThanks': 'Thanks for your feedback! It helps us improve.',
  'ui.feedbackFormLink': 'Send a request or comment (1 min)',

  'dist.bernoulli.name': 'Bernoulli',
  'dist.bernoulli.tagline':
    'The basic unit of every yes/no event: a single trial in which the event happens (1) with probability p or does not (0) with probability 1-p',
  'dist.bernoulli.param.p': 'Success probability p',
  'dist.bernoulli.usecase':
    'Show an ad with a {pPct}% click rate once: it gets clicked (1) with probability {pPct}% and ignored (0) with probability {qPct}%. Show it 100 times and you expect {per100} clicks. It applies to any yes/no outcome that happens by chance, such as coin flips, pass/fail inspections, or whether a deal closes.',

  'dist.binomial.name': 'Binomial',
  'dist.binomial.tagline':
    'Number of successes in n repeated trials — the sum of n Bernoulli trials',
  'dist.binomial.param.n': 'Trials n',
  'dist.binomial.param.p': 'Success probability p',
  'dist.binomial.usecase':
    'Run {n} sales meetings with a {pPct}% close rate and you close {mean} deals on average, with about a {rangePct}% chance of landing between {lo} and {hi}. Use it to estimate the plausible range of email opens, defective items in a lot, or A/B-test conversions.',

  'dist.geometric.name': 'Geometric',
  'dist.geometric.tagline':
    'Failures before the first success in repeated Bernoulli trials — the discrete counterpart of the exponential',
  'dist.geometric.param.p': 'Success probability p',
  'dist.geometric.usecase':
    'With a {pPct}% drop rate in a gacha game, you miss {mean} times on average before the first hit, so the hit comes on try {trials} on average. Even so, the chance of missing {streak} times in a row is {streakPct}%. Use it to estimate when the first success will come, such as sales visits until the first deal or inspections until the first defect.',

  'dist.poisson.name': 'Poisson',
  'dist.poisson.tagline':
    'How many rare events happen in a fixed window: the limit of a binomial with a very large number of trials n and a very small probability p, determined by the mean λ=np alone',
  'dist.poisson.param.lambda': 'Average rate λ',
  'dist.poisson.usecase':
    'A call center receiving {lambda} inquiries per hour on average can staff for {capacity} calls and still be overwhelmed about {overflowPct}% of the time. Even in the binomial situation "many customers, each calling with a tiny probability", knowing just the average λ={lambda} lets you estimate how likely each possible count is. It is widely used for planning counts: server requests, traffic accidents, incident reports.',

  'dist.exponential.name': 'Exponential',
  'dist.exponential.tagline':
    'Waiting time until the next event — the flip side of the Poisson and the continuous counterpart of the geometric',
  'dist.exponential.param.lambda': 'Rate λ (per minute)',
  'dist.exponential.usecase':
    'For events occurring at an average rate of {lambda} per minute (mean gap {mean} min), the chance of waiting more than {waitLimit} minutes for the next one is about {waitPct}%. It models arrival gaps at a counter, time to hardware failure, and intervals between requests, and is a standard model in queueing and reliability design.',

  'dist.gamma.name': 'Gamma',
  'dist.gamma.tagline':
    'A distribution for positive quantities. For positive integer k, it is the sum of k independent exponentials with the same rate: the total wait until k events occur',
  'dist.gamma.param.shape': 'Shape k',
  'dist.gamma.param.scale': 'Scale θ',
  'dist.gamma.usecase':
    'A gamma model for duration with k={shape} and θ={scale} minutes has mean {mean} and standard deviation {sd} minutes. For positive integer k, it can describe the total duration of k independent tasks whose times share the same exponential distribution. Non-integer k is also valid for positive quantities, but is not a task count. Rainfall and claim amounts are other potential uses; a long right tail alone does not establish a good fit.',

  'dist.negbinomial.name': 'Negative binomial',
  'dist.negbinomial.tagline':
    'Failures before the r-th success (the sum of r geometrics). It is also a Poisson whose rate λ follows a gamma distribution, so it models counts that vary between individuals',
  'dist.negbinomial.param.r': 'Successes r',
  'dist.negbinomial.param.p': 'Success probability p',
  'dist.negbinomial.usecase':
    'If everyone purchased at the same pace, counts would be Poisson, but paces differ from person to person. When each customer’s rate λ follows a gamma distribution, the purchase counts you observe overall follow this negative binomial. With r={r}, p={p} the mean is {mean} and the variance is {overdispersion}× the mean (a Poisson is always 1×). It is a standard model for counts that vary more than a Poisson allows, such as store visits, accidents, or social-media posts. It is also the number of failures before {r} successes at a {pPct}% success rate, which is the sum of {r} geometric distributions (with r=1, it is the geometric distribution itself).',

  'dist.beta.name': 'Beta',
  'dist.beta.tagline':
    'A distribution over values in 0–1 (rates and probabilities themselves). It is the distribution of X/(X+Y), X’s share of the total, for two independent gammas X and Y with the same scale',
  'dist.beta.param.alpha': 'Shape α',
  'dist.beta.param.beta': 'Shape β',
  'dist.beta.usecase':
    'A Beta(α={alpha}, β={beta}) belief about a conversion rate has mean {meanPct}%. Starting from a uniform prior (α=β=1), each observed success adds 1 to α and each failure adds 1 to β. Fractional shapes and values below 1 are also valid, but the current shapes cannot in general be read as observed counts. This is one way to describe uncertainty about a rate in settings such as A/B testing.',

  'dist.normal.name': 'Normal',
  'dist.normal.tagline':
    'Where sums of many independent effects end up (the central limit theorem) — the symmetric bell curve',
  'dist.normal.param.mu': 'Mean μ',
  'dist.normal.param.sigma': 'Std dev σ',
  'dist.normal.usecase':
    'On a test with mean {mu} and standard deviation {sigma}, about 68% of people score between {lo1} and {hi1}, and about 95% between {lo2} and {hi2}. Scores form a bell because many small factors — right or wrong on each question — add up (the central limit theorem). By the same logic, even when individual sales are skewed, a day’s total sales are approximately normal, so you can estimate tomorrow’s sales as "roughly within mean ±2σ". The ±3σ control limits of quality control use the same idea: a normal distribution keeps 99.7% of values within mean ±3σ, so a value outside them points to a real problem rather than random variation.',

  'dist.lognormal.name': 'Log-normal',
  'dist.lognormal.tagline':
    'A quantity whose logarithm is normal — driven by compounding multiplicative factors, with a long right tail',
  'dist.lognormal.param.mu': 'Log-mean μ',
  'dist.lognormal.param.sigma': 'Log-std dev σ',
  'dist.lognormal.usecase':
    'A salary is built by multiplying yearly raise rates (×1.05 and so on), and a house price by factors like location, size, and age acting as percentage premiums or discounts. Web page response times work the same way: network conditions and payload size stretch them by some factor. Quantities built from compounding multipliers like these tend to be log-normal. With μ={mu} and σ={sigma}, the median is {median} but the mean is {mean}, pulled upward by the long right tail. This is why average salaries often seem higher than what most people earn.',
} as const satisfies Record<MessageKey, string>;
