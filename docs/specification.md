# Specification

## Goals

- Build a website that visualizes probability distributions as charts
- Let users adjust the parameters of each distribution on the page
- When a parameter changes, the chart updates to show the distribution for those parameters
- Make the site excel in UI/UX

## Requirements

- Display the probability distributions as a list on screen
- Parameters must be adjustable
- Generate samples and display them as a histogram
- For each distribution, describe how it is used in everyday life and at work
- Those descriptions must incorporate the actual parameter values
- Support multiple languages so the site is usable by as many people as possible
- Support dark mode and light mode
- Sharing a URL must let another user open the page with the same parameter settings
- The distribution charts must support reordering and showing only selected charts
- All charts are shown by default

## Distributions

Target the following distributions.

- Bernoulli
- Binomial
- Normal
- Beta
- Poisson
- Exponential
- Gamma
- Log-normal

## Implementation policy

- Do not write plain HTML/CSS/JS; use whichever framework is judged appropriate
- Use TypeScript
- Choose technology so as to avoid damage from npm supply-chain attacks
- For visualization, evaluate multiple candidate libraries and record the selection rationale
- Design for loose coupling and high cohesion
- Split modules appropriately
- Make the site fast to render
- Code comments must convey information that cannot be read from the code itself
- Virtualize the development environment (e.g. Docker) so setup is easy and there is no drift from production
- Invest in developer experience

## Ground rules

- Write CLAUDE.md so development can continue in a later session
- Create the minimum necessary Agent Skills (if needed)
- If anything in the specification is unclear, ask instead of interpreting it on your own

## Confirmed additions

Decisions settled through questions and follow-up instructions during development (confirmed on 2026-07-05).

### Settled by answers to questions

- **Supported languages**: Japanese + English. Build the i18n foundation so more languages can be added later
- **Deployment target**: GitHub Pages (project page at `https://<user>.github.io/<repo>/`). No custom domain, since it costs money
- **Reordering UI**: drag-and-drop of the cards
- **Sample size**: user-adjustable (100–10,000, default 1,000)

### Settled by follow-up instructions

- **Environment setup**: use Docker so setup is effortless (no Node.js required on the host). Never run `npm install` directly on the host. Also support devcontainers
- **Linter / formatter**: adopt one (rationale recorded in docs/tech-selection.md; Biome was chosen)
- **Add the negative binomial distribution.** Its explanation must convey the gamma-Poisson mixture view (a Poisson whose rate λ itself follows a gamma distribution) and the practical reading "counts with individual differences (overdispersion)", plus how it relates to the geometric distribution (the sum of r geometrics; r=1 is the geometric itself)
- **Add the geometric distribution** (failures before the first success; the discrete counterpart of the exponential)
- **GitHub Actions supply-chain protection**: pin actions in workflows to commit hashes instead of tags like `@v4`
- **Force-pushes are denied** for the AI via permissions (`git push --force` and variants). Pushed history is treated as immutable; history surgery, when unavoidable, is done by the product owner
- **CI on every branch**: lint, typecheck, tests, and build run on every pull request and on pushes to non-main branches (ci.yml), so failures surface as PR status checks; pushes to main run the same checks in deploy.yml before deploying. Lint treats warnings as failures in CI (`--error-on-warnings`)
- **Chart ordering**: order the charts the way a statistics learner studies them. If one distribution presupposes another, show the prerequisite first, and show closely related distributions near each other. The five discrete distributions come first, in the fixed order Bernoulli → binomial → Poisson → geometric → negative binomial (the negative binomial sits right after the geometric, its r=1 special case), followed by the five continuous ones in the fixed order normal → log-normal → exponential → gamma → beta
- **No share button**: the state is always synced to the URL, so users are expected to copy it from the address bar
- **A fixed back-to-top button** appears at the bottom right once the page is scrolled (~400px) and smooth-scrolls to the top in one click
- **A toolbar toggle shows/hides the use-case sections** across all cards (top right). The state is part of the shareable URL (`usecase=0` when hidden; omitted when visible, the default)
- **The app title is a link to the app root** (a relative link that drops the query string). Since the query is the entirety of shareable state, clicking it effectively resets the page while keeping personal preferences (theme/language) stored locally
- **Write as little hand-rolled CSS as possible** (hand-written CSS hurts maintainability). Tailwind CSS was adopted; the only remaining CSS file holds design tokens and theme variables
- **No TypeScript errors in the host editor (fix the root cause, don't suppress warnings)**: bind-mount node_modules so type declarations also exist on the host. npm (including install) still runs only inside the container
- **The normal distribution defaults to a realistic test-score N(60, 10²)** (range 0-100) instead of the standard normal, so the use-case text reads naturally ("about 68% score between 50 and 70") on first paint
- **Bernoulli's default p is 0.3**, matching the binomial's default, so the two adjacent cards read as one story (the same trial seen once vs n times)
- **Explanation style**: the tagline above each chart is generic/abstract (what the distribution is, and how it relates to other distributions); the use-case text is concrete/practical (real scenarios with the current parameter values woven in). The Poisson tagline must mention its relation to the binomial (the large-n, small-p limit)
- **Sample histogram UX**: the toggle is labeled "標本シミュレーション / Sample simulation", with a help icon whose tooltip (hover on desktop, tap on mobile) explains what it does. The toggle is **off by default** — the first paint shows only the theoretical curves and users opt in per card
