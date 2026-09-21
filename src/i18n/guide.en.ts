export const guideEn = {
  'nav.charts': 'Explore distributions',
  'nav.guide': 'Find by use case',
  'guide.eyebrow': 'A PRACTICAL STARTING POINT',
  'guide.title': 'Start with your question. Find a distribution.',
  'guide.step1': 'Choose what to measure',
  'guide.step2': 'Pick a similar case',
  'guide.step3': 'Check the fit and explore',
  'guide.category.all': 'All cases',
  'guide.category.outcome': 'Yes or no',
  'guide.category.count': 'Counts',
  'guide.category.waiting': 'Waiting',
  'guide.category.measurement': 'Measurements',
  'guide.category.proportion': 'Uncertain rates',
  'guide.choose': 'Explore case',
  'guide.back': 'Back to cases',
  'guide.candidate': 'A candidate for this case',
  'guide.why': 'Why this distribution?',
  'guide.conditions': 'When this is a useful model',
  'guide.caution': 'When to consider another model',
  'guide.parameters': 'What to change in the chart',
  'guide.open': 'Explore this distribution',
  'guide.alternative': 'If you have a different question',
  'guide.references': 'Read more about the distributions',
  'guide.docTitle': 'Find by use case | Probability Distribution Visualizer',
  'guide.metaDescription':
    'Find candidate probability distributions for counts, waiting times, conversion rates and more. Check assumptions and explore interactive charts.',
  'guide.case.bernoulli.title': 'Will someone click a single ad?',
  'guide.case.bernoulli.summary':
    'A click or no click, a pass or a fail: one observation with two outcomes.',
  'guide.case.bernoulli.why': 'Represent one outcome as 1 if it happens and 0 if it does not.',
  'guide.case.bernoulli.conditions':
    'Use this when one observation has two possible outcomes, such as a click or no click. Set the chance of a click to describe how likely each outcome is.',
  'guide.case.bernoulli.caution':
    'This does not directly describe three or more outcomes. To count clicks across several impressions, take a look at the binomial distribution.',
  'guide.case.bernoulli.alternative': 'To count clicks across a fixed number of impressions',
  'guide.case.bernoulli.parameters':
    'p is the chance of a click: p = 0.3 means 30%. Increase p and the bar for a click gets taller.',
  'guide.case.binomial.title': 'How many of 10 sales calls will convert?',
  'guide.case.binomial.summary':
    'Sales conversions, opened emails, or defective items in a batch of 100.',
  'guide.case.binomial.why': 'Count how many of a fixed number of trials meet a condition.',
  'guide.case.binomial.conditions':
    'Use this when you know how many calls you will make and each has the same chance of converting. One call’s outcome must not affect the others.',
  'guide.case.binomial.caution':
    'If some customers are much more likely to convert, or referrals link the outcomes, check whether these assumptions still fit.',
  'guide.case.binomial.alternative': 'To describe uncertainty about the conversion rate itself',
  'guide.case.binomial.parameters':
    'n is the number of calls and p is the chance of a conversion on each call. Try n = 10 and p = 0.3 for ten calls with a 30% conversion rate.',
  'guide.case.poisson.title': 'How many enquiries arrive in an hour?',
  'guide.case.poisson.summary': 'Enquiries, customer arrivals, or defects within a fixed interval.',
  'guide.case.poisson.why': 'Model the number of events within a fixed time or area.',
  'guide.case.poisson.conditions':
    'Use the same interval for each count, such as one hour. Enquiries should occur independently, at a steady average rate during that interval.',
  'guide.case.poisson.caution':
    'If enquiries are busier by day, treat day and night separately. If counts vary much more than this model predicts, consider the negative binomial distribution too.',
  'guide.case.poisson.alternative': 'When event rates vary between people or places',
  'guide.case.poisson.parameters':
    'λ is the average number of enquiries in your chosen interval. For five per hour, set λ = 5. Increasing it moves the peak towards larger counts.',
  'guide.case.negbinomial.title': 'Visit counts vary a lot between customers',
  'guide.case.negbinomial.summary':
    'Visits, purchases, or posts, with some people much more active than others.',
  'guide.case.negbinomial.why':
    'Model counts with differing event rates and more variability than a Poisson distribution.',
  'guide.case.negbinomial.conditions':
    'Consider this when some customers visit often and others rarely, even over the same period. One model uses Poisson counts for each customer and a gamma distribution for the differences in their visit rates.',
  'guide.case.negbinomial.caution':
    'If many people never visit for a separate reason, or visit rates change over time, you may need to account for those processes too.',
  'guide.case.negbinomial.alternative': 'When everyone has approximately the same event rate',
  'guide.case.negbinomial.parameters':
    'This chart uses r and p to change the shape. The mean count is r(1−p)/p. A smaller p gives a larger variance relative to the mean.',
  'guide.case.geometric.title': 'How many misses before the first hit?',
  'guide.case.geometric.summary': 'Unsuccessful draws or sales attempts before the first success.',
  'guide.case.geometric.why': 'Count failures before the first success.',
  'guide.case.geometric.conditions':
    'Use this when every attempt has the same chance of success and earlier outcomes do not affect later ones. A string of misses must not make the next attempt more likely to succeed.',
  'guide.case.geometric.caution':
    'The chart counts misses before the first hit. Add 1 to include the successful attempt. Guaranteed wins or improving odds need a different model.',
  'guide.case.geometric.alternative': 'To model time until the next event instead of attempts',
  'guide.case.geometric.parameters':
    'p is the chance of a hit on each attempt; p = 0.3 means 30%. Zero on the horizontal axis means no misses: a hit on the first attempt.',
  'guide.case.exponential.title': 'How long until the next enquiry?',
  'guide.case.exponential.summary': 'Time until the next customer or request arrives.',
  'guide.case.exponential.why':
    'Model the waiting time to the next event in a constant-rate Poisson process.',
  'guide.case.exponential.conditions':
    'Use this when enquiries occur independently at a steady average rate. In this model, time already spent waiting does not change the outlook for the remaining wait.',
  'guide.case.exponential.caution':
    'This is not suitable for scheduled arrivals. For equipment lifetimes, consider another model if failure becomes more likely as the equipment ages.',
  'guide.case.exponential.alternative': 'To model the total wait until several events occur',
  'guide.case.exponential.parameters':
    'λ is the average number of events per minute. At λ = 0.5, the mean wait is two minutes. Increasing λ makes the wait shorter.',
  'guide.case.gamma.title': 'How long will three tasks take in total?',
  'guide.case.gamma.summary': 'Total time for a sequence of similar tasks.',
  'guide.case.gamma.why':
    'A sum of independent exponential durations with the same rate follows a gamma distribution.',
  'guide.case.gamma.conditions':
    'Use this for a sequence of tasks with independent durations that share the same exponential distribution. The model adds those durations together.',
  'guide.case.gamma.caution':
    'Reconsider this if tasks take nearly fixed times or one delay affects the next task. You can read k as a task count only when it is a positive integer.',
  'guide.case.gamma.alternative': 'When durations grow through multiplicative effects',
  'guide.case.gamma.parameters':
    'For three tasks, set k = 3. If each takes two minutes on average, set θ = 2. The total mean is then 3 × 2 = 6 minutes.',
  'guide.case.normal.title': 'How much do product dimensions vary?',
  'guide.case.normal.summary':
    'Dimensions or measurement errors concentrated around a centre with roughly symmetric spread.',
  'guide.case.normal.why': 'Describe a symmetric, bell-shaped spread around a central value.',
  'guide.case.normal.conditions':
    'Consider this if repeated measurements cluster near the mean and spread out roughly symmetrically. Look for one peak and relatively few extreme values.',
  'guide.case.normal.caution':
    'This distribution includes negative values. For quantities that cannot be negative, or have a few very large values, check whether the model predicts unrealistic outcomes.',
  'guide.case.normal.alternative': 'For positive values with a long right tail',
  'guide.case.normal.parameters':
    'μ is the mean and σ controls the spread. Changing μ moves the peak; increasing σ makes it wider. The chart’s initial values and example use test scores.',
  'guide.case.lognormal.title': 'Response times are usually short, sometimes very long',
  'guide.case.lognormal.summary':
    'Positive quantities such as response times or prices with a long right tail.',
  'guide.case.lognormal.why':
    'Model values whose logarithms are normally distributed, sometimes arising through multiplicative effects.',
  'guide.case.lognormal.conditions':
    'Consider this for values that are always positive, such as durations or prices. Check that taking their logarithms produces an approximately symmetric bell shape.',
  'guide.case.lognormal.caution':
    'Mostly small values with a few large ones do not uniquely identify this distribution. Compare it with alternatives such as gamma against your actual data.',
  'guide.case.lognormal.alternative':
    'If the duration is better explained as a sum of waiting times',
  'guide.case.lognormal.parameters':
    'Increasing μ shifts values upwards; increasing σ stretches the right tail. These parameters describe the mean and standard deviation of the logarithms, not the original durations.',
  'guide.case.beta.title': 'How certain are we about the conversion rate?',
  'guide.case.beta.summary':
    'Uncertainty about a success rate from limited observations, including A/B tests.',
  'guide.case.beta.why': 'Represent uncertainty about a probability between 0 and 1.',
  'guide.case.beta.conditions':
    'Use this to learn about an unknown conversion rate from successes and failures. Assume independent calls with the same conversion probability, and express your initial belief about that probability as a beta distribution.',
  'guide.case.beta.caution':
    'This describes your belief about a rate, not a count. The result also depends on your initial belief, so this chart alone does not decide which version wins an A/B test.',
  'guide.case.beta.alternative': 'To model conversion counts for a specified success probability',
  'guide.case.beta.parameters':
    'If all rates initially seem equally plausible, start with α = β = 1. After one success and four failures, try α = 2 and β = 5.',
  'guide.categoryLabel': '01　What would you like to measure?',
  'guide.caseLabel': '02　Choose a situation like yours',
  'guide.detailLabel': '03　Connect your case to a distribution',
  'guide.category.outcome.hint': 'One trial, two possible outcomes',
  'guide.category.count.hint': 'Count events within a given scope',
  'guide.category.waiting.hint': 'Measure the wait until an event',
  'guide.category.measurement.hint': 'Explore how measured values spread',
  'guide.category.proportion.hint': 'Explore uncertainty about a rate',
  'guide.illustration': 'Illustration of the idea, not observed data',
  'guide.scene.bernoulli': 'One impression → click / no click',
  'guide.scene.binomial': '3 successes out of 10 → count successes',
  'guide.scene.poisson': '5 events in 1 hour → count within an interval',
  'guide.scene.negbinomial': 'Same period, different counts for each person',
  'guide.scene.geometric': 'Miss → miss → hit: 2 failures',
  'guide.scene.exponential': 'Measure the time from now until the next event',
  'guide.scene.gamma': 'Add the durations of tasks 1, 2 and 3',
  'guide.scene.normal': 'Most values near the centre, symmetric spread',
  'guide.scene.lognormal': 'Mostly smaller values, with a few very large ones',
  'guide.scene.beta': 'Explore plausible rates between 0% and 100%',
  'guide.next': 'See candidate and assumptions →',
  'guide.showAll': 'View all cases',
} as const;
