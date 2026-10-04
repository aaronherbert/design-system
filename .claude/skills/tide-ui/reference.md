# Tide component API

Every component is exported from `@aaronherbert/design-system`. Unless noted, components forward extra props (and `ref`, where listed) to their underlying element, so native attributes such as `name`, `value`, `onChange`, `autoComplete` and `disabled` work as usual.

`Space` is one of `0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16` (multiples of 4px). `ControlSize` is `'sm' | 'md' | 'lg'` (32 / 40 / 48px).

## Theming

| Component | Props |
|---|---|
| `ThemeProvider` | `theme?: 'dark' \| 'light' \| 'system'` (default `'dark'`). Plus `div` props, ref. |

## Form controls

Labelled fields (`TextField`, `Textarea`, `Select`, `Slider`) share **FieldBaseProps**: `label?`, `hint?` (help text), `error?` (message; also sets `aria-invalid`), `hideLabel?` (visually hidden but still read aloud). On these, `className` goes on the native control; use `fieldClassName` for the wrapper.

| Component | Props |
|---|---|
| `Button` | `variant?: 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` (default `primary`), `size?: ControlSize`, `loading?`, `fullWidth?`, `leadingIcon?`, `trailingIcon?`. `type` defaults to `"button"`. Ref. |
| `IconButton` | `icon: ReactNode`, **`aria-label: string` (required)**, `variant?` (default `ghost`), `size?`, `loading?`. Ref. |
| `TextField` | FieldBaseProps + `size?: ControlSize`, `leading?` / `trailing?` (icons, units or prefixes inside the box), all `<input>` props. Ref goes to the input. |
| `Textarea` | FieldBaseProps + `resizable?` (default `true`), `rows?` (default 4), all `<textarea>` props. Ref. |
| `Select` | FieldBaseProps + `size?`, `options?: { value, label, disabled? }[]` (or `<option>` / `<optgroup>` children), `placeholder?` (an empty, unselectable first option), all `<select>` props. Native select. Ref. |
| `Checkbox` | **`label` (required)**, `description?`, `indeterminate?`, `error?: boolean`, all `<input>` props (`checked`, `defaultChecked`, `onChange`…). Ref. |
| `RadioGroup` | **`legend` (required)**, `hint?`, `error?`, `name?` (auto-generated if omitted), `value?` + `onValueChange?(value)` for controlled use, `disabled?`, `required?`, `inline?` (lay options out in a row). |
| `Radio` | **`value` and `label` (required)**, `description?`, `defaultChecked?` for uncontrolled groups. Must be inside a `RadioGroup`. Ref. |
| `Switch` | **`label` (required)**, `description?`, `labelPosition?: 'start' \| 'end'` (`start` suits settings lists), checkbox `<input>` props. Renders `role="switch"`. Ref. |
| `Slider` | FieldBaseProps + `showValue?: boolean \| (value: number) => ReactNode` (format the readout), `min` / `max` / `step` / `value` / `defaultValue`. Ref. |
| `Fieldset` | **`legend` (required)**, `hint?`, `error?`, `required?`. Groups checkboxes or related fields. |
| `TagInput` | FieldBaseProps + **`value: string[]` and `onValueChange` (required)**, `suggestions?: string[]` (autocomplete options), `normalize?(text)` (default trims; pass `s => s.trim().toLowerCase()` for case-insensitive tags), `allowCreate?` (default `true`; offers "Create …"), `maxSuggestions?` (default 8), `createLabel?(text)`, `placeholder?`. ARIA combobox: Enter or comma adds a tag, Backspace in an empty input removes the last one, and Escape closes the list (not a surrounding Dialog). Ref goes to the input. |
| `Tag` | Chip: **`children` (required)**, `tone?: 'neutral' \| 'primary'`, `size?: 'sm' \| 'md'` (default `md`), `onClick?` (makes the label a button), `onRemove?` (adds a × button), `removeLabel?` (default "Remove <children>"). Ref. |
| `TreeView` | ARIA tree: **`aria-label` (or `aria-labelledby`)**, `selectedId?` / `defaultSelectedId?` / `onSelect?(id)`, `expandedIds?` / `defaultExpandedIds?` / `onExpandedChange?(ids)`. One tab stop. Arrows and Home/End move, Right/Left expand and collapse, Enter/Space select. Ref. |
| `TreeItem` | **`id` and `label` (required)**, `meta?` (end of the row, e.g. a count), `icon?`, `hasChildren?` (shows the chevron before lazy children exist), nested `TreeItem` children (rendered only while expanded). Must be inside a `TreeView`. |
| `Field` | For custom controls: FieldBaseProps + `id?`, `required?`, `disabled?`, and a render-prop child `(control) => <YourInput {...control} />`. Spread `control` (`id`, `aria-describedby`, `aria-invalid`) onto the control. |

## Feedback

| Component | Props |
|---|---|
| `Alert` | `tone?: 'info' \| 'success' \| 'warning' \| 'danger'` (default `info`), `title?`, `action?` (for example a Button), children for the body. `danger` and `warning` use `role="alert"`; the others use `role="status"`. |
| `Banner` | **`title` (required)**, `action?` (Buttons inside are restyled to sit on the gradient), `variant?: 'brand' \| 'subtle'` (default `brand`, a deep gradient with white text), children for the body. For plan or quota summaries, onboarding and announcements. |
| `Dialog` | Modal on native `<dialog>`: **`open`, `onClose` and `title` (required)**, `description?`, `footer?` (action bar, secondary first and primary last), `size?: 'sm' \| 'md' \| 'lg'` (400/560/800px, default `md`, full screen below 640px), `closeOnBackdrop?` (default `true`), `closeLabel?`. Children render only while it's open. Escape, the × button and the backdrop all call `onClose`, and focus returns to the opener. Ref. |
| `ToastProvider` | Wrap the app once, inside `ThemeProvider`. `label?` (region name, default "Notifications"). |
| `useToast()` | Returns `{ show(options) → id, dismiss(id) }`. Options: **`message`**, `action?: { label, onClick }` (e.g. Undo; clicking it also dismisses), `duration?` (ms, default 5000, `Infinity` to keep it), `tone?: 'neutral' \| 'success' \| 'danger'`. The timer pauses on hover and focus. |
| `Meter` | **`value` and `label` (required)**, `max?` (default 100), `valueText?` (shows a label/value row and becomes `aria-valuetext`). A known range only, never indeterminate loading. |
| `ProgressBar` | Task progress on native `<progress>`: **`label` (required)**, `value?` (omit for indeterminate), `max?` (default 100), `valueText?` (default the percentage; a string becomes `aria-valuetext`), `hint?` (linked with `aria-describedby`), `tone?: 'primary' \| 'success' \| 'danger'` (default `primary`; say "failed" or "complete" in `label`/`hint` too), `size?: 'sm' \| 'md'` (default `md`), `hideLabel?`, `fieldClassName?` (wrapper; `className` goes on the `<progress>`). Use for uploads, imports and setup steps; use `Meter` for static amounts. Ref. |

## Typography

| Component | Props |
|---|---|
| `Heading` | `level?: 1–6` (default 2; this sets the HTML tag), `size?: 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` (visual size; defaults by level). Uses the display font. |
| `Text` | `as?` (default `p`), `size?: 'xs' \| 'sm' \| 'md' \| 'lg'`, `tone?: 'default' \| 'muted' \| 'subtle' \| 'primary' \| 'danger' \| 'success' \| 'warning'`, `weight?: 'regular' \| 'medium' \| 'semibold' \| 'bold'`, `mono?`. |

## Layout

| Component | Props |
|---|---|
| `Stack` | `direction?: 'column' \| 'row'` (default column), `gap?: Space` (default 4), `align?`, `justify?`, `wrap?`, `collapseOnMobile?` (a row becomes a column below 640px), `as?`. Ref. |
| `Inline` | A wrapping row: `gap?` (default 2), `align?` (default center), `justify?`, `as?`. Ref. |
| `Grid` | `columns?: 1 \| 2 \| 3 \| 4 \| 6 \| 12` (default 2; one column below 640px) **or** `minItemWidth?: string` (auto-fill, for example `"16rem"`), `gap?`, `rowGap?`, `as?`. Ref. |
| `GridItem` | `span?: number` (columns to span in a fixed grid), `as?`. |
| `Container` | `size?: 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` (640 / 960 / 1200 / 1440px; default `lg`), responsive side padding, `as?`. Ref. |
| `Card` | `title?`, `description?`, `actions?` (top right), `footer?` (a separated bar; put form buttons here), `padding?: 'none' \| 'sm' \| 'md' \| 'lg'`, `variant?: 'outlined' \| 'elevated' \| 'sunken'`, `as?` (default `section`). Ref. |
| `Divider` | `orientation?: 'horizontal' \| 'vertical'`. |
| `AppShell` | `brand?`, `headerActions?`, `sidebar?` (becomes a toggleable drawer below 900px), `footer?`, children as main content. Gradient rule under the header, page glow behind. |
| `NavItem` | `href?`, `icon?`, `active?` (sets `aria-current="page"`). Use inside `AppShell`'s `sidebar`. For router links, render your router's link with `className="ds-nav-item"` (add `ds-nav-item--active` and `aria-current="page"` when active). |

## Utilities

- `cx(...classes)`: joins truthy class names.
- Types: `Space`, `ControlSize`, and a `…Props` type for every component.
