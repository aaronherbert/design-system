---
name: tide-component
description: Add a new component to the Tide design system repo or change an existing one, including its CSS, tokens, stories, exports and docs. Use when working inside the design-system repository on components, tokens, themes or Storybook.
---

# Adding or changing a Tide component

Follow these steps in order. Read `CLAUDE.md` first if you haven't this session.

## 1. Decide where it goes

- Is it a control, feedback or typography component? It goes in `src/components/`. Is it arrangement? It goes in `src/layout/`.
- Check it doesn't already exist under another name, and that a variant of an existing component wouldn't do the job. Variants are cheaper for every app than new components.
- If it needs a colour or gradient Tide doesn't have, add a semantic token first (step 3). Don't add raw colours.

## 2. Write the component

`src/components/Thing.tsx`:

```tsx
import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../utils';
import './Thing.css';

export interface ThingProps extends HTMLAttributes<HTMLDivElement> {
  /** Document every prop. These comments show up in Storybook autodocs. */
  variant?: 'default' | 'emphasis';
}

export const Thing = forwardRef<HTMLDivElement, ThingProps>(function Thing(
  { variant = 'default', className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx('ds-thing', `ds-thing--${variant}`, className)} {...rest} />;
});
```

- **A labelled input** extends `FieldBaseProps`, renders through `<Field>`, and spreads the render-prop `control` onto the native element (see `TextField.tsx`). Put `className` on the native control and add `fieldClassName` for the wrapper.
- **A native element exists** (button, input, select, dialog, details)? Use it and restyle it.
- **Defaults** should be the safe, common case. Props are optional unless the component is inaccessible without them (for example `aria-label` on `IconButton`, or `label` on `Checkbox`).

## 3. Style it

`src/components/Thing.css`:

- Use `ds-thing`, `ds-thing--variant` and `ds-thing__part` classes only.
- Use `var(--ds-…)` for every colour, space, radius, font, shadow and duration.
- Interactive elements get `:focus-visible { outline: 2px solid var(--ds-color-focus-ring); outline-offset: 2px; }`.
- Transitions use `var(--ds-duration-fast) var(--ds-ease)`.
- Gradients go over a solid fallback: `background-color: …; background-image: var(--ds-gradient-…, none);`.

**A new semantic token** needs all of these:
1. Add it to both the `:root, [data-theme='dark']` block and the `[data-theme='light']` block in `src/styles/tokens.css`.
2. If it's a text/background or control/surface pairing, add it to `AUDIT` (and `TOKEN_NAMES`) in `tools/theme-lab.html`, open the lab, and confirm the row passes for Harbour in both modes.
3. Show it in `src/stories/Foundations.stories.tsx` (the `semantic` rows, or the gradients list).

## 4. Stories

`src/components/Thing.stories.tsx`, following the existing files:
- `title: 'Form controls/Thing'` (or put it under `Layout` for layout primitives)
- `component: Thing`, plus `args` that render something realistic. Use real-world copy, never lorem ipsum.
- A `Playground` story, then one story each for variants, sizes and states (error, disabled, loading, empty, long content).
- If it fits a full page, use it in `src/stories/Examples.stories.tsx` too.

## 5. Export and document

1. Add `export * from './components/Thing';` to `src/index.ts`.
2. Add it to the component list in `README.md`.
3. Add a row to `.claude/skills/tide-ui/reference.md` with its props, defaults and required props. If it changes how apps should build screens, update `SKILL.md` there as well.
4. Run `npm run claude:install-skill` so other projects pick up the new docs.

## 6. Verify

```bash
npm run typecheck && npm run build && npm run build-storybook
```

Then serve the build (`npx http-server storybook-static -p 6007 -s -c-1`) and check the stories:
- in dark (the default) and light (`&globals=theme:light`)
- at phone width
- by tabbing through them with the keyboard, checking for a visible focus ring
- with no console errors

Changing an existing prop name or default breaks every app that uses Tide. Avoid it. If you must, keep the old prop working, and say so clearly in the commit message.
