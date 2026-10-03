# Tide design system

React design tokens, form controls and layout primitives, documented in Storybook.

**Storybook:** https://aaronherbert.github.io/design-system/

## Develop

```bash
npm install
npm run dev              # Storybook at http://localhost:6006
npm run typecheck
npm run build            # library → dist/
npm run build-storybook  # static Storybook → storybook-static/
```

## What's inside

- **Theme.** The Harbour palette: cobalt brand colour, saffron accent and mist neutrals, with cobalt-to-cerulean gradients. Dark is the default; light is a toggle away. Comfortable density and soft corners. All defined as CSS custom properties in [`src/styles/tokens.css`](src/styles/tokens.css), and every pairing passes WCAG 2.2 AA in both themes.
- **Fonts.** Inter (UI and body), Plus Jakarta Sans (headings) and JetBrains Mono (code), self-hosted through Fontsource.
- **Form controls.** `Button`, `IconButton`, `TextField`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`/`Radio`, `Switch`, `Slider`, `Fieldset`, `Field`, `Alert`, `Banner`, `Meter`.
- **Layout.** `Stack`, `Inline`, `Grid`/`GridItem`, `Container`, `Card`, `Divider`, `AppShell`/`NavItem`.
- **Typography.** `Heading`, `Text`.
- **Theming.** `ThemeProvider` (`dark` by default, or `light` | `system`).

## Using it in an app

```tsx
import '@aaronherbert/design-system/fonts.css';
import '@aaronherbert/design-system/styles.css';
import { ThemeProvider, TextField, Button, Stack } from '@aaronherbert/design-system';

<ThemeProvider>
  <Stack gap={4}>
    <TextField label="Email" type="email" />
    <Button>Continue</Button>
  </Stack>
</ThemeProvider>;
```

Until the package is published to a registry, you can install it straight from GitHub (`npm i github:aaronherbert/design-system`) or with `npm link`.

## Deploying Storybook to GitHub Pages

[`.github/workflows/storybook.yml`](.github/workflows/storybook.yml) type-checks the project, builds it, and deploys Storybook on every push to `main`. Pull requests are built but not deployed.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Claude Code

- [`CLAUDE.md`](CLAUDE.md) and [`.claude/skills/tide-component`](.claude/skills/tide-component/SKILL.md) guide Claude when working on this repo.
- [`.claude/skills/tide-ui`](.claude/skills/tide-ui/SKILL.md) teaches Claude to build UI with Tide in *any* project. Install or update it user-wide with `npm run claude:install-skill`, which copies it to `~/.claude/skills/tide-ui`.
