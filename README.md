# Probability Distribution Visualizer

A website that visualizes probability distributions interactively. Move the parameter sliders and watch the probability density function (PDF) / probability mass function (PMF) charts update in real time.

## Features

- **10 probability distributions**, ordered the way statistics is learned (prerequisite distributions first, closely related ones adjacent): Bernoulli, binomial, Poisson, geometric, negative binomial, normal, log-normal, exponential, gamma, and beta
- **Parameter controls**: sliders / numeric inputs with real-time chart updates
- **Sample histograms**: draw samples and overlay them on the theoretical distribution (sample size adjustable from 100 to 10,000, resampling supported)
- **Use cases**: each distribution comes with a plain-language explanation of how it is used in everyday life and at work, with the current parameter values woven into the text
- **URL sharing**: the whole state (parameters, card order, visibility, language, theme) is continuously synced to the address bar, so copying the URL is all it takes to let someone else open the exact same view
- **Reorder & filter**: drag-and-drop card reordering and chip-based show/hide toggles (all distributions shown by default)
- **Japanese / English** and **dark / light mode** support

## Development

Docker is the only requirement (no Node.js needed on the host).

```bash
docker compose up    # http://localhost:5173
```

With a devcontainer-capable editor such as VS Code, you can also "Reopen in Container" and run `npm run dev` from the integrated terminal.

Tests, type checking, lint, and build:

```bash
docker compose run --rm app npm test
docker compose run --rm app npm run typecheck
docker compose run --rm app npm run lint
docker compose run --rm app npm run build
```

## Deployment

Pushing to the `main` branch triggers GitHub Actions to run the tests, build the site, and deploy it to GitHub Pages.
One-time setup: set the repository's Settings → Pages → Source to **GitHub Actions**.

## Documentation

- [docs/specification.md](docs/specification.md) — requirements specification
- [docs/tech-selection.md](docs/tech-selection.md) — rationale for the framework and charting-library choices
- [CLAUDE.md](CLAUDE.md) — architecture and development guide
