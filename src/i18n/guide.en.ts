export const guideEn = {
  'nav.charts': 'Explore distributions',
  'nav.guide': 'Find by use case',
  'guide.eyebrow': 'A PRACTICAL STARTING POINT',
  'guide.title': 'Start with your question. Find a distribution.',
  'guide.intro':
    'No formulas or distribution names needed. Explore familiar situations to find a candidate and understand why it might fit.',
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
  'guide.conditions': 'Check these assumptions',
  'guide.caution': 'When to reconsider',
  'guide.parameters': 'How to read the chart',
  'guide.open': 'Explore this distribution',
  'guide.alternative': 'If your question or assumptions differ',
  'guide.note':
    'These are starting points. Check the data and the process generating them before choosing a model.',
  'guide.references': 'Read more about the distributions',
  'guide.chartNote': 'Chart values are illustrative. Adjust them to match your situation.',
  'guide.docTitle': 'Find by use case | Probability Distribution Visualizer',
  'guide.metaDescription':
    'Find candidate probability distributions for counts, waiting times, conversion rates and more. Check assumptions and explore interactive charts.',
  'guide.case.bernoulli.title': 'Will someone click a single ad?',
  'guide.case.bernoulli.summary':
    'A click or no click, a pass or a fail: one observation with two outcomes.',
  'guide.case.bernoulli.why': 'Represent one outcome as 1 if it happens and 0 if it does not.',
  'guide.case.bernoulli.conditions':
    'There are two outcomes and you can specify the probability p of the event.',
  'guide.case.bernoulli.caution': 'This distribution alone cannot describe three or more outcomes.',
  'guide.case.bernoulli.alternative': 'To count clicks across a fixed number of impressions',
  'guide.case.bernoulli.parameters': 'p is the click probability; 0.3 means 30%.',
  'guide.case.binomial.title': 'How many of 10 sales calls will convert?',
  'guide.case.binomial.summary':
    'Sales conversions, opened emails, or defective items in a batch of 100.',
  'guide.case.binomial.why': 'Count how many of a fixed number of trials meet a condition.',
  'guide.case.binomial.conditions':
    'The number of trials is fixed, trials are independent, and each has the same success probability.',
  'guide.case.binomial.caution':
    'Reconsider this model if conversion rates vary greatly between customers or outcomes affect each other.',
  'guide.case.binomial.alternative': 'To describe uncertainty about the conversion rate itself',
  'guide.case.binomial.parameters':
    'n is the number of calls and p the conversion probability per call. Adjust both to your case.',
  'guide.case.poisson.title': 'How many enquiries arrive in an hour?',
  'guide.case.poisson.summary': 'Enquiries, customer arrivals, or defects within a fixed interval.',
  'guide.case.poisson.why': 'Model the number of events within a fixed time or area.',
  'guide.case.poisson.conditions':
    'Events occur independently at a constant average rate over the time or area considered.',
  'guide.case.poisson.caution':
    'Separate periods with different rates, such as day and night. If the count variance exceeds its mean, consider a negative binomial model.',
  'guide.case.poisson.alternative': 'When event rates vary between people or places',
  'guide.case.poisson.parameters':
    'λ is the average count in the chosen interval. For five enquiries per hour, set λ to 5.',
  'guide.case.negbinomial.title': 'Visit counts vary a lot between customers',
  'guide.case.negbinomial.summary':
    'Visits, purchases, or posts, with some people much more active than others.',
  'guide.case.negbinomial.why':
    'Model counts with differing event rates and more variability than a Poisson distribution.',
  'guide.case.negbinomial.conditions':
    'One model assumes Poisson counts for each person, with their rates varying according to a gamma distribution.',
  'guide.case.negbinomial.caution':
    'A separate mechanism creating extra zeros, or rates changing over time, may need another model.',
  'guide.case.negbinomial.alternative': 'When everyone has approximately the same event rate',
  'guide.case.negbinomial.parameters':
    'This chart uses r and p. The mean is r(1−p)/p; lowering p increases the variance-to-mean ratio.',
  'guide.case.geometric.title': 'How many misses before the first hit?',
  'guide.case.geometric.summary': 'Unsuccessful draws or sales attempts before the first success.',
  'guide.case.geometric.why': 'Count failures before the first success.',
  'guide.case.geometric.conditions':
    'Trials are independent and the success probability stays constant.',
  'guide.case.geometric.caution':
    'The horizontal axis counts failures; add 1 for total attempts. Guaranteed wins or changing odds break the model.',
  'guide.case.geometric.alternative': 'To model time until the next event instead of attempts',
  'guide.case.geometric.parameters':
    'p is the success probability per attempt. Zero failures means success on the first attempt.',
  'guide.case.exponential.title': 'How long until the next enquiry?',
  'guide.case.exponential.summary': 'Time until the next customer or request arrives.',
  'guide.case.exponential.why':
    'Model the waiting time to the next event in a constant-rate Poisson process.',
  'guide.case.exponential.conditions':
    'Events occur independently at a constant rate. Time already spent waiting does not change the remaining waiting-time distribution.',
  'guide.case.exponential.caution':
    'Scheduled arrivals or equipment whose failure risk rises with age do not satisfy this assumption.',
  'guide.case.exponential.alternative': 'To model the total wait until several events occur',
  'guide.case.exponential.parameters':
    'λ is the average number of events per minute. Mean waiting time is 1/λ minutes.',
  'guide.case.gamma.title': 'How long will three tasks take in total?',
  'guide.case.gamma.summary': 'Total time for a sequence of similar tasks.',
  'guide.case.gamma.why':
    'A sum of independent exponential durations with the same rate follows a gamma distribution.',
  'guide.case.gamma.conditions':
    'For integer k, the total-time interpretation assumes independent task durations with the same exponential distribution.',
  'guide.case.gamma.caution':
    'Check these assumptions if tasks take nearly fixed times or their durations influence each other.',
  'guide.case.gamma.alternative': 'When durations grow through multiplicative effects',
  'guide.case.gamma.parameters':
    'k is the task count and θ the mean duration per task. The total mean is k×θ.',
  'guide.case.normal.title': 'How much do product dimensions vary?',
  'guide.case.normal.summary':
    'Dimensions or measurement errors concentrated around a centre with roughly symmetric spread.',
  'guide.case.normal.why': 'Describe a symmetric, bell-shaped spread around a central value.',
  'guide.case.normal.conditions':
    'Check that data are roughly symmetric and unimodal, without many extreme outliers.',
  'guide.case.normal.caution':
    'The distribution allows negative values. It may be unsuitable near a zero boundary or for strongly skewed data.',
  'guide.case.normal.alternative': 'For positive values with a long right tail',
  'guide.case.normal.parameters':
    'μ is the mean and σ the standard deviation. The chart initially uses a test-score example.',
  'guide.case.lognormal.title': 'Response times are usually short, sometimes very long',
  'guide.case.lognormal.summary':
    'Positive quantities such as response times or prices with a long right tail.',
  'guide.case.lognormal.why':
    'Model values whose logarithms are normally distributed, sometimes arising through multiplicative effects.',
  'guide.case.lognormal.conditions':
    'Values must be strictly positive, with approximately normal logarithms.',
  'guide.case.lognormal.caution':
    'A long right tail is not enough to choose this model. Compare the fit with alternatives such as gamma.',
  'guide.case.lognormal.alternative':
    'If the duration is better explained as a sum of waiting times',
  'guide.case.lognormal.parameters':
    'μ and σ describe the logarithms of the values, not the original durations.',
  'guide.case.beta.title': 'How certain are we about the conversion rate?',
  'guide.case.beta.summary':
    'Uncertainty about a success rate from limited observations, including A/B tests.',
  'guide.case.beta.why': 'Represent uncertainty about a probability between 0 and 1.',
  'guide.case.beta.conditions':
    'With independent trials sharing a success probability and a beta prior on that probability, the posterior is also beta.',
  'guide.case.beta.caution':
    'This is not a distribution of conversion counts. Results depend on the prior; this alone does not decide an A/B test.',
  'guide.case.beta.alternative': 'To model conversion counts for a specified success probability',
  'guide.case.beta.parameters':
    'With a uniform prior, α = successes + 1 and β = failures + 1. Try values within the chart’s slider range.',
  'guide.categoryLabel': '01　What would you like to measure?',
  'guide.caseLabel': '02　Choose a situation like yours',
  'guide.detailLabel': '03　Connect your case to a distribution',
  'guide.categoryHint': 'Use the pictures as a starting point. You can explore any route.',
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
