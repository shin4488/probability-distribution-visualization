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
  'guide.case.binomial.title': 'How many of 10 sales calls will convert?',
  'guide.case.binomial.summary':
    'Sales conversions, opened emails, or defective items in a batch of 100.',
  'guide.case.binomial.why': 'Count how many of a fixed number of trials meet a condition.',
  'guide.case.binomial.conditions':
    'Use this when you know how many calls you will make and each has the same chance of converting. One call’s outcome must not affect the others.',
  'guide.case.binomial.caution':
    'If one company’s purchase makes another company more likely to buy, the outcomes affect each other. If existing and new customers have very different conversion rates, treating every call as having the same probability can also misrepresent how much the count varies.',
  'guide.case.binomial.alternative': 'To describe uncertainty about the conversion rate itself',
  'guide.case.poisson.title': 'How many enquiries arrive in an hour?',
  'guide.case.poisson.summary': 'Enquiries, customer arrivals, or defects within a fixed interval.',
  'guide.case.poisson.why': 'Model the number of events within a fixed time or area.',
  'guide.case.poisson.conditions':
    'For hourly enquiry counts, the expected count should be roughly the same in each hour being compared, with a steady arrival rate throughout each hour. One enquiry should not trigger another.',
  'guide.case.poisson.caution':
    'If the average is 20 enquiries per hour during the day but two at night, model day and night separately. Even within one time slot, some days may be much busier than others. If that variation exceeds what a Poisson distribution predicts, consider a negative binomial distribution, which allows greater variability.',
  'guide.case.poisson.alternative': 'When event rates vary between people or places',
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
  'guide.case.geometric.title': 'How many misses before the first hit?',
  'guide.case.geometric.summary': 'Unsuccessful draws or sales attempts before the first success.',
  'guide.case.geometric.why': 'Count failures before the first success.',
  'guide.case.geometric.conditions':
    'Use this when every attempt has the same chance of success and earlier outcomes do not affect later ones. A string of misses must not make the next attempt more likely to succeed.',
  'guide.case.geometric.caution':
    'Count the misses before the first hit: zero if the first attempt succeeds, or two if the third succeeds. Add one to count all attempts including the hit. Guaranteed wins or increasing odds do not fit this use.',
  'guide.case.geometric.alternative': 'To model time until the next event instead of attempts',
  'guide.case.exponential.title': 'How long until the next enquiry?',
  'guide.case.exponential.summary': 'Time until the next customer or request arrives.',
  'guide.case.exponential.why':
    'Describe the time until the next randomly arriving enquiry, customer, or request.',
  'guide.case.exponential.conditions':
    'The average arrival rate should remain steady throughout the period you are waiting, and arrivals should not affect each other. Having already waited ten minutes does not make an arrival overdue: the outlook for the remaining wait is the same as when you started.',
  'guide.case.exponential.caution':
    'This does not fit customers with scheduled arrival times. It also does not describe equipment lifetimes well when wear makes failure more likely as the equipment ages.',
  'guide.case.exponential.alternative': 'To model the total wait until several events occur',
  'guide.case.gamma.title': 'How long will three tasks take in total?',
  'guide.case.gamma.summary': 'Total time for a sequence of similar tasks.',
  'guide.case.gamma.why':
    'Describe the total time for three tasks completed in sequence. If their durations are independent and follow the same exponential distribution, their sum follows a gamma distribution. At two minutes per task on average, the average total is six minutes.',
  'guide.case.gamma.conditions':
    'Tasks must have the same average duration, and a long task must not affect how long the others take. Check that each duration can be described by an exponential distribution. Adding durations does not automatically make the total gamma-distributed.',
  'guide.case.gamma.caution':
    'This use does not fit tasks with nearly fixed durations, or sequences where one delay affects the next task.',
  'guide.case.gamma.alternative': 'When durations grow through multiplicative effects',
  'guide.case.normal.title': 'How much do product dimensions vary?',
  'guide.case.normal.summary':
    'Dimensions or measurement errors concentrated around a centre with roughly symmetric spread.',
  'guide.case.normal.why': 'Describe a symmetric, bell-shaped spread around a central value.',
  'guide.case.normal.conditions':
    'Consider this if repeated measurements cluster near the mean and spread out roughly symmetrically. Look for one peak and relatively few extreme values.',
  'guide.case.normal.caution':
    'This distribution includes negative values. For quantities that cannot be negative, or have a few very large values, check whether the model predicts unrealistic outcomes.',
  'guide.case.normal.alternative': 'For positive values with a long right tail',
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
  'guide.case.beta.title': 'How certain are we about the conversion rate?',
  'guide.case.beta.summary':
    'Uncertainty about a success rate from limited observations, including A/B tests.',
  'guide.case.beta.why':
    'Use successes and failures to estimate an unknown conversion rate. Three successes in ten calls do not establish that the true rate is exactly 30%. A beta distribution represents how plausible different rates between 0% and 100% are.',
  'guide.case.beta.conditions':
    'Assume calls share the same conversion probability and do not affect each other. Start with a beta distribution describing plausible rates before seeing the data, then update it with recorded successes and failures.',
  'guide.case.beta.caution':
    'With little data, starting with all rates equally plausible can give a different estimate from starting near 30% based on past experience—even with identical observations. When comparing A/B variants, check both this starting assumption and the amount of data collected.',
  'guide.case.beta.alternative': 'To model conversion counts for a specified success probability',
  'guide.categoryLabel': '01　What would you like to measure?',
  'guide.caseLabel': '02　Choose a situation like yours',
  'guide.detailLabel': '03　Connect your case to a distribution',
  'guide.category.outcome.hint': 'One trial, two possible outcomes',
  'guide.category.count.hint': 'Count events within a given scope',
  'guide.category.waiting.hint': 'Measure the wait until an event',
  'guide.category.measurement.hint': 'Explore how measured values spread',
  'guide.category.proportion.hint': 'Explore uncertainty about a rate',
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
