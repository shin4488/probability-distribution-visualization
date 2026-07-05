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
- **Add the negative binomial distribution**, with an explanation that makes its composition clear (the sum of r geometric distributions = the number of failures before the r-th success in repeated Bernoulli trials)
- **GitHub Actions supply-chain protection**: pin actions in workflows to commit hashes instead of tags like `@v4`
- **Chart ordering**: order the charts the way a statistics learner studies them. If one distribution presupposes another, show the prerequisite first, and show closely related distributions near each other (Bernoulli → binomial → negative binomial → Poisson → exponential → gamma → beta → normal → log-normal)
- **No share button**: the state is always synced to the URL, so users are expected to copy it from the address bar
- **No TypeScript errors in the host editor (fix the root cause, don't suppress warnings)**: bind-mount node_modules so type declarations also exist on the host. npm (including install) still runs only inside the container
