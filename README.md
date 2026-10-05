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
- **Form controls.** `Button`, `IconButton`, `TextField`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`/`Radio`, `Switch`, `Slider`, `Fieldset`, `Field`, `TagInput`, `Tag`, `TreeView`/`TreeItem`.
- **Feedback and overlays.** `Alert`, `Banner`, `Meter`, `ProgressBar`, `Dialog`, `ToastProvider`/`useToast`.
- **Layout.** `Stack`, `Inline`, `Grid`/`GridItem`, `Container`, `Card`, `Divider`, `AppShell`/`NavItem`.
- **Typography.** `Heading`, `Text`.
- **Theming.** `ThemeProvider` (`dark` by default, or `light` | `system`).

## Using it in an app

Tide is published to [GitHub Packages](https://github.com/aaronherbert/design-system/pkgs/npm/design-system).

**One-time setup per machine.** GitHub's registry needs a token even for public packages:
1. Create a classic personal access token with the `read:packages` scope at https://github.com/settings/tokens.
2. Add it to your *user-level* `~/.npmrc`. Never commit it.
   ```
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN
   ```

**In each app**, add an `.npmrc` (safe to commit) and install:

```
@aaronherbert:registry=https://npm.pkg.github.com
```

```bash
npm install @aaronherbert/design-system
```

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

**In an app's GitHub Actions**, give `actions/setup-node` the values `registry-url: https://npm.pkg.github.com` and `scope: '@aaronherbert'`, and set `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` with `permissions: packages: read`. Then grant that repo access on the package page: **Package settings → Manage Actions access → Add repository**.

## Releasing

```bash
npm version minor        # or patch / major: bumps package.json, commits and tags vX.Y.Z
git push --follow-tags   # the tag triggers .github/workflows/publish.yml
```

The publish workflow checks that the tag matches `package.json`, type-checks, builds and publishes to GitHub Packages. Use semantic versioning: patch for fixes, minor for new components or props, major for anything that breaks an app (a renamed prop, a removed token).

## Deploying Storybook to GitHub Pages

[`.github/workflows/storybook.yml`](.github/workflows/storybook.yml) type-checks the project, builds it, and deploys Storybook on every push to `main`. Pull requests are built but not deployed.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Visual review on pull requests (Chromatic)

[`.github/workflows/chromatic.yml`](.github/workflows/chromatic.yml) uploads Storybook to [Chromatic](https://www.chromatic.com) on every pull request and snapshots each story in **dark and light**. If anything looks different from `main`, the PR gets a pending **UI Tests** check. Click its **Details** link to see each change side by side (or as a highlighted diff), then **Accept** or **Deny** it. The check turns green once every change is accepted. Pushes to `main` are accepted automatically and become the new baseline.

One-time setup:

1. Sign in at [chromatic.com](https://www.chromatic.com) with GitHub and add `aaronherbert/design-system` as a project. Install the Chromatic GitHub app when it asks; the app posts the **UI Tests** check.
2. Copy the project token into **Settings → Secrets and variables → Actions** as `CHROMATIC_PROJECT_TOKEN`.
3. Merge this workflow and let it run once on `main` to create the baseline.
4. To make review mandatory: **Settings → Branches → Add rule for `main` → Require status checks to pass**, then choose **UI Tests** (and **UI Review** if you want a review of every PR, not just ones with visual changes).

TurboSnap (`onlyChanged`) only snapshots stories affected by a change, which keeps usage well inside the free plan. A change to `tokens.css` or `.storybook/` still snapshots everything.

## Claude Code

- [`CLAUDE.md`](CLAUDE.md) and [`.claude/skills/tide-component`](.claude/skills/tide-component/SKILL.md) guide Claude when working on this repo.
- [`.claude/skills/tide-ui`](.claude/skills/tide-ui/SKILL.md) teaches Claude to build UI with Tide in *any* project. Install or update it user-wide with `npm run claude:install-skill`, which copies it to `~/.claude/skills/tide-ui`.
