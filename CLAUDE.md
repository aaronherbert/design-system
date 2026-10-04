# Tide design system

Tide is the React design system (`@aaronherbert/design-system`) behind all of Aaron's React apps. A change here reaches every app that uses it, so keep the API stable and keep every visual change accessible.

- Storybook: https://aaronherbert.github.io/design-system/ (deployed by `.github/workflows/storybook.yml` on push to `main`)
- Visual review: `.github/workflows/chromatic.yml` snapshots every story in dark and light on each PR. Changed snapshots leave a pending **UI Tests** check that Aaron accepts in Chromatic. New stories get snapshotted automatically; to skip a story that can't render stably, set `parameters: { chromatic: { disableSnapshot: true } }`.
- Published to GitHub Packages (`https://npm.pkg.github.com`) by `.github/workflows/publish.yml` when a `v*` tag is pushed. Apps install it with an `.npmrc` scope line plus a user-level token (see README). `prepare` builds `dist/`, which isn't committed.

## Commands

```bash
npm run dev              # Storybook on :6006
npm run typecheck        # tsc --noEmit (TypeScript 7)
npm test                 # vitest: component behaviour + axe accessibility checks (src/**/*.test.tsx)
npm run build            # library → dist/ (index.js, index.d.ts, styles.css, fonts.css)
npm run build-storybook  # static Storybook → storybook-static/
npm run claude:install-skill   # copy the tide-ui skill to ~/.claude/skills (do this after changing it)
```

Before you call a change done: `typecheck`, `test`, `build` and `build-storybook` all pass, and you've looked at the affected stories in the browser in **dark and light**.

## Releasing

`npm version patch|minor|major` (commits and tags), then `git push --follow-tags`. Patch is for fixes, minor for new components, props or tokens, and major for anything that breaks an app (renamed or removed props or tokens, changed defaults). Only release when the user asks. Publishing is public and versions can't be reused.

## Layout

```
src/styles/tokens.css   Design tokens: palette ramps, type, spacing, radius, sizing, semantic colours, gradients
src/styles/base.css     Base styles scoped to .ds-root (ThemeProvider)
src/styles/fonts.css    Fontsource imports, shipped unbundled as dist/fonts.css
src/components/         Controls, feedback and typography: Component.tsx + .css + .stories.tsx + .test.tsx
src/test/               Vitest setup (dialog polyfill) and expectNoAxeViolations()
src/layout/             Stack, Grid, Container, Card, AppShell (+ Layout.css, AppShell.css, Layout.stories.tsx)
src/stories/            Introduction.mdx, Foundations (colours, type, gradients, spacing), Examples (full pages)
src/index.ts            Public API: every export must be listed here
tools/theme-lab.html    Theme generator and WCAG audit; the source of the colour values in tokens.css
.claude/skills/         tide-ui (how apps use Tide; installed user-wide) and tide-component (how to change Tide)
```

## Conventions

- **Tokens only.** Component CSS uses `var(--ds-…)`. Never hard-code hex/rgb, except `#fff` for switch and slider thumbs, and translucent black/white overlays.
- **Semantic over raw.** Components use `--ds-color-*` and `--ds-gradient-*`, never the raw ramps (`--ds-cobalt-500`). The only exception is a solid fallback behind a gradient.
- **Changing colours:** don't hand-edit hex values in `tokens.css`. Open `tools/theme-lab.html`, adjust it, check the audit shows every row passing, and paste the generated CSS. The lab's `audit()` is the contrast check; if you add a new text-on-background pairing, add it to the lab's `AUDIT` list too.
- **Gradients** always sit over a solid colour: `background-color: var(--ds-color-primary); background-image: var(--ds-gradient-primary, none);`. Text on a gradient must reach 4.5:1 against every stop.
- **Theme:** dark is the default (`:root` holds the dark aliases; `ThemeProvider` defaults to `'dark'`). Light lives under `[data-theme='light']`. Define every new semantic token in both blocks.
- **Class names:** BEM-ish with a `ds-` prefix: `ds-button`, `ds-button--primary`, `ds-button__icon`. Plain CSS files imported by the component; no CSS-in-JS and no CSS modules.
- **Components:** `forwardRef` to the underlying native element, spread `...rest`, merge classes with `cx()`. Labelled inputs wrap themselves in `Field` and accept `FieldBaseProps`. Use native elements (`<select>`, `<input type="checkbox">`) and restyle them rather than rebuilding them with divs.
- **Stories:** every component has `Component.stories.tsx` titled `Form controls/<Name>` or `Layout`, with a `Playground` story and stories for variants, sizes and states (error, disabled, loading). Autodocs are on globally.
- **Public API:** export new components from `src/index.ts`, add them to `README.md`, and add them to `.claude/skills/tide-ui/reference.md`. Then run `npm run claude:install-skill`.

## Accessibility (non-negotiable)

- Text 4.5:1. Control boundaries, checked states and focus rings 3:1 against what's around them (WCAG 1.4.11).
- Every control has a programmatic label. Hints and errors are linked with `aria-describedby`; errors set `aria-invalid`.
- Visible `:focus-visible` ring (2px `--ds-color-focus-ring`, 2px offset) on everything interactive.
- Target size 24px or more. Inputs use 16px text (`--ds-control-font-size`) so iOS doesn't zoom on focus.
- Colour is never the only signal; pair it with an icon or text.
- Respect `prefers-reduced-motion` (handled in base.css; don't add motion that bypasses it).

## Environment notes

- Windows with Node 24 (`.nvmrc`). The repo uses LF line endings (`.gitattributes`).
- Edit files with the Edit tool or Bash `sed`. Don't round-trip files through PowerShell 5.1 `Get-Content`/`Set-Content`: it misreads UTF-8 and adds a BOM.
- To check stories in the browser, serve `storybook-static` with caching off (`npx http-server storybook-static -p 6007 -s -c-1`). Otherwise new stories can show as "not found".
