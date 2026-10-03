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

- **Theme.** Teal brand colour, coral accent and tinted slate neutrals, with light and dark themes, all defined as CSS custom properties in [`src/styles/tokens.css`](src/styles/tokens.css).
- **Fonts.** Inter (UI and body), Plus Jakarta Sans (headings) and JetBrains Mono (code), self-hosted through Fontsource.
- **Form controls.** `Button`, `IconButton`, `TextField`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`/`Radio`, `Switch`, `Slider`, `Fieldset`, `Field`, `Alert`.
- **Layout.** `Stack`, `Inline`, `Grid`/`GridItem`, `Container`, `Card`, `Divider`, `AppShell`/`NavItem`.
- **Typography.** `Heading`, `Text`.
- **Theming.** `ThemeProvider` (`light` | `dark` | `system`).

## Using it in an app

```tsx
import '@aaronherbert/design-system/fonts.css';
import '@aaronherbert/design-system/styles.css';
import { ThemeProvider, TextField, Button, Stack } from '@aaronherbert/design-system';

<ThemeProvider theme="system">
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
