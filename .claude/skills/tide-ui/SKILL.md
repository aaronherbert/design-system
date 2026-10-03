---
name: tide-ui
description: Build React UI with the Tide design system (@aaronherbert/design-system), which every one of Aaron's React projects uses. Use when creating or changing pages, forms, layouts, settings screens, dashboards or components in a React app, when setting up a new React project, or when asked about colours, spacing, theming, dark mode or accessibility in one of these apps.
---

# Building UI with Tide

Tide is Aaron's design system. Use its components, tokens and theme for every piece of React UI. Don't add another component library (MUI, Chakra, shadcn and so on), don't hand-write colours, and don't build a component Tide already has.

- Source and docs: https://github.com/aaronherbert/design-system
- Storybook (live examples of every component): https://aaronherbert.github.io/design-system/
- Full component API: [reference.md](reference.md) in this skill folder. Read it before using a component you haven't used in this session.

## 1. Check the project is set up

Look in `package.json` for `@aaronherbert/design-system`. If it's missing, install it. Tide is published to **GitHub Packages**, not npmjs.com:

1. Make sure the project has an `.npmrc` (commit this file) containing:
   ```
   @aaronherbert:registry=https://npm.pkg.github.com
   ```
2. Run `npm install @aaronherbert/design-system`.

Installing needs a GitHub token, even though the package is public. If `npm install` fails with **401** or **403**, the machine has no token. **Don't create, request or paste one yourself.** Tell the user to add a classic personal access token with the `read:packages` scope to their *user-level* `~/.npmrc` (never the project's), as `//npm.pkg.github.com/:_authToken=<token>`. They create the token at https://github.com/settings/tokens.

In the project's own GitHub Actions, give `actions/setup-node` the values `registry-url: https://npm.pkg.github.com` and `scope: '@aaronherbert'`, and set `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` with `permissions: packages: read`. The user also has to grant that repo access once: on the package page, go to Package settings → Manage Actions access → Add repository.

To update Tide later, run `npm install @aaronherbert/design-system@latest`. Release notes are in the repo's tags.

It needs React 18 or later. Then import the two stylesheets once, at the app entry (`main.tsx`, `_app.tsx` or the root layout), and wrap the app in `ThemeProvider`:

```tsx
import '@aaronherbert/design-system/fonts.css';  // Inter, Plus Jakarta Sans, JetBrains Mono
import '@aaronherbert/design-system/styles.css'; // tokens + component styles
import { ThemeProvider } from '@aaronherbert/design-system';

<ThemeProvider>{/* app */}</ThemeProvider>
```

- `ThemeProvider` defaults to **dark**. Pass `theme="light"` or `theme="system"` only when the project asks for it.
- `ThemeProvider` renders a `div.ds-root` that sets fonts, text colour and background. Put it high enough to cover the whole app, including portals you control.
- In Next.js App Router, Tide components use hooks, so render them from Client Components (`'use client'`).

## 2. Pick components, then layout

Reach for these in this order:

1. **A Tide component** for every control: `Button`, `IconButton`, `TextField`, `Textarea`, `Select`, `Checkbox`, `RadioGroup` + `Radio`, `Switch`, `Slider`, `Fieldset`, `TagInput`, `Tag`, `TreeView` + `TreeItem`, `Dialog`, `ToastProvider` + `useToast`, `Alert`, `Banner` + `Meter`, `Heading`, `Text`.
2. **A Tide layout primitive** for arrangement: `Stack` (vertical/horizontal flex), `Inline` (wrapping row), `Grid` + `GridItem`, `Container`, `Card`, `Divider`, `AppShell` + `NavItem`.
3. **`Field`**, to give a custom control the same label/hint/error wiring as the built-in ones.
4. Only then write custom CSS, and use tokens only (section 4).

Common recipes:

```tsx
// Page frame
<AppShell brand={<>Logo Name</>} headerActions={<Button size="sm">New</Button>}
  sidebar={<><NavItem href="/" active>Home</NavItem><NavItem href="/settings">Settings</NavItem></>}>
  <Container size="md">
    <Stack gap={8}>
      <Stack gap={1}>
        <Heading level={1} size="xl">Settings</Heading>
        <Text tone="muted">Manage your profile and notifications.</Text>
      </Stack>
      {/* cards… */}
    </Stack>
  </Container>
</AppShell>

// Form in a card: two columns that collapse to one on mobile
<Card title="Profile" description="Shown on your public page."
  footer={<><Button variant="outline">Cancel</Button><Button type="submit">Save</Button></>}>
  <Grid columns={2} gap={5}>
    <TextField label="First name" name="first" autoComplete="given-name" required />
    <TextField label="Last name" name="last" autoComplete="family-name" required />
    <GridItem span={2}><TextField label="Email" type="email" name="email" error={errors.email} /></GridItem>
  </Grid>
</Card>

// Responsive card list
<Grid minItemWidth="16rem" gap={4}>{items.map((i) => <Card key={i.id} title={i.name} />)}</Grid>

// Button row: secondary actions first, primary last
<Inline justify="flex-end"><Button variant="ghost">Back</Button><Button>Continue</Button></Inline>
```

## 3. Forms and accessibility rules

These are requirements, not suggestions:

- **Every control has a visible `label`.** If the design hides it (a search box, for example), pass `hideLabel` so screen readers still get it. Icon-only buttons use `IconButton` with `aria-label`.
- **Errors go in the `error` prop** with a sentence saying how to fix the problem ("Enter an email address like name@example.com", not "Invalid"). The prop sets `aria-invalid` and links the message to the field. For a form-level summary, add `<Alert tone="danger" title="…">` at the top of the form.
- **Group related options** with `RadioGroup` (one choice) or `Fieldset` + `Checkbox` (several). Use `Switch` only for settings that apply immediately. Use `Checkbox` for anything submitted with a form.
- **Use `Select` (native) for 5 or more options and `RadioGroup` for fewer**, so all choices are visible.
- **Set `autoComplete`, `type` and `inputMode`** on fields (`email`, `tel`, `name`, `new-password`, …).
- **Use `Button type="submit"` inside a `<form onSubmit>`.** Buttons default to `type="button"`. Use `loading` while submitting; it disables the button and sets `aria-busy`.
- **Never use colour as the only signal.** Pair it with text or an icon. The built-in error, alert and required styles already do this.
- **Headings go in order** (`h1` then `h2`…). Use `Heading level` for meaning and `size` for looks.
- **Keep the default `md` control size.** `sm` is for dense toolbars only; `lg` is for primary touch actions.
- **Don't remove focus outlines** or set `outline: none` on interactive elements.

## 4. Styling with tokens

When custom CSS is unavoidable, use only these CSS custom properties. They switch automatically between dark and light.

- **Colour:** `--ds-color-{bg, surface, surface-sunken, surface-hover, border, border-strong, text, text-muted, text-subtle, primary, primary-hover, primary-subtle, primary-text, on-primary, accent, accent-subtle, accent-text, danger, danger-text, danger-subtle, success, success-text, success-subtle, warning, warning-text, warning-subtle, info, info-text, info-subtle, focus-ring, control-border}`
- **Gradients:** `--ds-gradient-{primary, banner, line, meter, page}`. Always layer them over a solid colour, as `background-color: var(--ds-color-primary); background-image: var(--ds-gradient-primary);`.
- **Spacing (4px grid):** `--ds-space-{1,2,3,4,5,6,8,10,12,16}`. Layout props take the same numbers: `<Stack gap={4}>` is 16px.
- **Type:** `--ds-font-{sans, display, mono}`, `--ds-text-{xs…5xl}`, `--ds-weight-{regular, medium, semibold, bold}`
- **Shape:** `--ds-radius-{sm, md, lg, xl, full, button}`, `--ds-shadow-{sm, md, lg}`
- **Sizing:** `--ds-control-h-{sm, md, lg}`, `--ds-container-{sm, md, lg, xl}`

Pairing rules: text on `surface` or `bg` uses `text`, `text-muted` or `primary-text`. Text on `primary` uses `on-primary`. Text on a `*-subtle` background uses the matching `*-text`. Any other combination is unchecked, so verify 4.5:1 contrast first.

**Don't:** use hex, rgb or named colours; use the raw palette (`--ds-cobalt-*`, `--ds-mist-*`) in app code; use px values off the 4px grid; or invent new gradients. If something is missing from Tide, say so and suggest adding it to the design system rather than working around it in the app.

## 5. Before finishing

- Check the screen in **both themes**: dark (the default) and light.
- Check it at **phone width (~400px)**. `Grid columns` collapses to one column below 640px, and `AppShell`'s sidebar becomes a drawer below 900px.
- **Tab through it with the keyboard.** Every control should be reachable, with a visible focus ring.
- Run the project's type check and build.
