## Overview

This repository is a small, static Reveal.js presentation titled "Real Parallelism in Ruby with Ractors". The presentation is authored primarily in `index.html`; JavaScript plugins live in `scripts/` and are loaded through the browser import map.

## Important files

- `index.html` — presentation markup, Markdown slide content, inline styles, CDN import map, etc.
- `styles/theme.css` — custom reveal.js theme (dark, ruby accent). It replaces the stock `night` theme and follows the structure of reveal's compiled themes: `--r-*` custom properties in `:root` followed by `.reveal` rules. The Mermaid `themeVariables` in `index.html` and the colors in `gvl_visualization.html` are tuned to match it.
- `gvl_visualization.html` — self-contained animation comparing GVL-bound Threads to parallel Ractors, embedded in the deck via an iframe.
- `scripts/mermaid-plugin.js` — renders fenced Mermaid blocks in the deck as SVG.
- `scripts/laser-pointer-plugin.js` — Reveal.js plugin that toggles a mouse-following laser pointer with Caps Lock.
- `scripts/server.js` — BrowserSync development server.
- `bin/install` — shell wrapper that installs Node dependencies.
- `bin/server` — shell wrapper that starts the BrowserSync development server.
- `.github/workflows/static.yml` — deploys the repository contents to GitHub Pages on pushes to `main`.
- `images/` — presentation assets. The benchmark charts are from the Rails at Scale post "Bringing Rails into the Ractor-age".
- `package.json` — Node package metadata and the BrowserSync development dependency.

## Local development

Install dependencies and start the development server:

```sh
./bin/install
./bin/server
```

There is no automated test suite, linter, formatter, or build command configured.

## Editing guidance

- Keep slide content in `index.html` unless a requested change clearly belongs in a plugin or asset file.
- Preserve the existing Reveal.js Markdown structure: slide boundaries are represented by Markdown separators inside the `data-template` textarea.
- Match the surrounding JavaScript style and use semicolons only where the file already uses them. Avoid unrelated formatting changes in the large presentation file.
- Mermaid diagrams must remain valid Mermaid syntax and should be checked in the rendered deck, not only as source text.
- Code samples and numbers in the deck are sourced from the Rails at Scale posts, the Ruby 4.0 `Ractor` docs, and the `rails/rails` pull requests labelled "Ractor Support". Keep them accurate to those sources.

## Deployment

GitHub Actions deploys the repository root to GitHub Pages after pushes to `main`. Keep `index.html`, root-level plugin modules, and referenced assets compatible with static hosting: do not rely on server-side routing, filesystem APIs, or development-only paths.
