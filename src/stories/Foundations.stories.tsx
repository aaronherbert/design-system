import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, Heading, Stack, Text } from '../index';

const meta: Meta = {
  title: 'Foundations',
  tags: ['!autodocs'],
};
export default meta;

const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const scales: Record<string, { token: string; role: string }> = {
  Cobalt: { token: 'cobalt', role: 'primary' },
  'Cobalt alt': { token: 'cobalt-alt', role: 'gradient partner (cerulean)' },
  Saffron: { token: 'saffron', role: 'accent' },
  Mist: { token: 'mist', role: 'neutrals' },
  Red: { token: 'red', role: 'danger' },
  Green: { token: 'green', role: 'success' },
  Amber: { token: 'amber', role: 'warning' },
  Blue: { token: 'blue', role: 'info' },
};

const semantic = [
  ['bg', 'surface', 'surface-sunken', 'border', 'border-strong', 'control-border', 'control-border-strong'],
  ['text', 'text-muted', 'text-subtle', 'text-disabled'],
  ['primary', 'primary-hover', 'primary-subtle', 'primary-text', 'on-primary', 'accent', 'accent-subtle', 'accent-text'],
  ['success', 'success-subtle', 'warning', 'warning-subtle', 'danger', 'danger-subtle', 'info', 'info-subtle'],
];

function Swatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <Stack gap={1} style={{ minWidth: 0 }}>
      <div
        style={{
          height: 56,
          borderRadius: 'var(--ds-radius-md)',
          background: `var(${cssVar})`,
          boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 0.08)',
        }}
      />
      <Text size="xs" weight="semibold">
        {label}
      </Text>
      <Text size="xs" tone="muted" mono>
        {cssVar}
      </Text>
    </Stack>
  );
}

export const Colours: StoryObj = {
  render: () => (
    <Stack gap={10}>
      <Stack gap={2}>
        <Heading level={1}>Colour</Heading>
        <Text tone="muted">
          Harbour: cobalt is the brand colour, saffron is the accent and mist is for neutrals. Gradients run from cobalt
          to cerulean. Apps should use the semantic tokens, which change with the theme. Every pairing passes WCAG 2.2 AA.
        </Text>
      </Stack>
      {Object.entries(scales).map(([name, { token, role }]) => (
        <Stack key={name} gap={3}>
          <Heading level={2} size="sm">
            {name} <Text as="span" size="sm" tone="muted">· {role}</Text>
          </Heading>
          <Grid minItemWidth="5.5rem" gap={3}>
            {steps.map((s) => (
              <Swatch key={s} cssVar={`--ds-${token}-${s}`} label={s} />
            ))}
          </Grid>
        </Stack>
      ))}
      <Stack gap={3}>
        <Heading level={2} size="sm">
          Semantic tokens (switch the theme in the toolbar)
        </Heading>
        {semantic.map((row, i) => (
          <Grid key={i} minItemWidth="8.5rem" gap={3}>
            {row.map((t) => (
              <Swatch key={t} cssVar={`--ds-color-${t}`} label={t} />
            ))}
          </Grid>
        ))}
      </Stack>
    </Stack>
  ),
};

const gradients = [
  ['--ds-gradient-primary', 'Primary buttons, logo, progress fills. White (light) or dark (dark) text passes at both ends.'],
  ['--ds-gradient-banner', 'Brand banners. Deep cobalt to cerulean with a saffron glow; white text passes at every stop.'],
  ['--ds-gradient-line', 'The 2px rule under the app header.'],
  ['--ds-gradient-meter', 'Meter fill inside a brand banner.'],
  ['--ds-gradient-page', 'A faint glow behind the app background.'],
];

export const Gradients: StoryObj = {
  render: () => (
    <Stack gap={8}>
      <Stack gap={2}>
        <Heading level={1}>Gradients</Heading>
        <Text tone="muted" style={{ maxWidth: '65ch' }}>
          Gradients sit on top of a solid semantic colour, which stays as the fallback in browsers that can't draw
          them. They interpolate in OKLCH so the middle never turns grey. Use them for emphasis, never as the only way
          to show state.
        </Text>
      </Stack>
      <Grid minItemWidth="18rem" gap={5}>
        {gradients.map(([token, use]) => (
          <Stack key={token} gap={2}>
            <div
              style={{
                height: token === '--ds-gradient-line' ? 8 : 96,
                borderRadius: 'var(--ds-radius-lg)',
                backgroundColor: 'var(--ds-color-surface)',
                backgroundImage: `var(${token})`,
                boxShadow: 'inset 0 0 0 1px var(--ds-color-border)',
              }}
            />
            <Text size="sm" mono>{token}</Text>
            <Text size="sm" tone="muted">{use}</Text>
          </Stack>
        ))}
      </Grid>
    </Stack>
  ),
};

const sizes = ['5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const Typography: StoryObj = {
  render: () => (
    <Stack gap={10}>
      <Stack gap={2}>
        <Heading level={1}>Typography</Heading>
        <Text tone="muted">Plus Jakarta Sans for headings, Inter for UI and body text, JetBrains Mono for code.</Text>
      </Stack>

      <Grid minItemWidth="16rem" gap={6}>
        {[
          ['Display', 'var(--ds-font-display)', 'Plus Jakarta Sans'],
          ['Sans', 'var(--ds-font-sans)', 'Inter'],
          ['Mono', 'var(--ds-font-mono)', 'JetBrains Mono'],
        ].map(([role, family, name]) => (
          <Stack key={role} gap={2} style={{ padding: 'var(--ds-space-5)', border: '1px solid var(--ds-color-border)', borderRadius: 'var(--ds-radius-lg)' }}>
            <Text size="xs" tone="muted" weight="semibold">
              {role.toUpperCase()}
            </Text>
            <div style={{ fontFamily: family, fontSize: 44, fontWeight: 600, lineHeight: 1 }}>Aa</div>
            <div style={{ fontFamily: family }}>{name}</div>
            <div style={{ fontFamily: family, color: 'var(--ds-color-text-muted)', fontSize: 14 }}>
              ABCDEFGHIJKLM nopqrstuvwxyz 0123456789
            </div>
          </Stack>
        ))}
      </Grid>

      <Stack gap={3}>
        <Heading level={2} size="sm">
          Headings
        </Heading>
        <Heading level={1}>Heading 1 · Set sail with Tide</Heading>
        <Heading level={2}>Heading 2 · Set sail with Tide</Heading>
        <Heading level={3}>Heading 3 · Set sail with Tide</Heading>
        <Heading level={4}>Heading 4 · Set sail with Tide</Heading>
        <Heading level={5}>Heading 5 · Set sail with Tide</Heading>
        <Heading level={6}>Heading 6 · Overline</Heading>
      </Stack>

      <Stack gap={2}>
        <Heading level={2} size="sm">
          Scale
        </Heading>
        {sizes.map((s) => (
          <Stack key={s} direction="row" gap={4} align="baseline">
            <Text size="xs" tone="subtle" mono style={{ width: 120, flex: 'none' }}>
              --ds-text-{s}
            </Text>
            <span style={{ fontSize: `var(--ds-text-${s})`, lineHeight: 1.3 }}>The quick brown fox</span>
          </Stack>
        ))}
      </Stack>

      <Stack gap={2} style={{ maxWidth: '65ch' }}>
        <Heading level={2} size="sm">
          Body
        </Heading>
        <Text size="lg">Large body: an intro paragraph or the lead text on a marketing page.</Text>
        <Text>
          Default body is 16px with a 1.5 line height. Keep lines to roughly 65 characters for comfortable reading.
          Use <code>muted</code> text for secondary information.
        </Text>
        <Text size="sm" tone="muted">
          Small muted text: helper copy, captions and metadata.
        </Text>
      </Stack>
    </Stack>
  ),
};

export const SpacingAndShape: StoryObj = {
  name: 'Spacing & shape',
  render: () => (
    <Stack gap={10}>
      <Heading level={1}>Spacing &amp; shape</Heading>
      <Stack gap={2}>
        <Heading level={2} size="sm">
          Spacing (4px grid)
        </Heading>
        {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((s) => (
          <Stack key={s} direction="row" gap={4} align="center">
            <Text size="xs" mono tone="subtle" style={{ width: 120 }}>
              --ds-space-{s}
            </Text>
            <div style={{ width: `var(--ds-space-${s})`, height: 16, background: 'var(--ds-color-primary)', borderRadius: 2 }} />
            <Text size="xs" tone="muted">
              {s * 4}px
            </Text>
          </Stack>
        ))}
      </Stack>
      <Stack gap={3}>
        <Heading level={2} size="sm">
          Radius
        </Heading>
        <Stack direction="row" gap={6} wrap>
          {['sm', 'md', 'lg', 'xl', 'full'].map((r) => (
            <Stack key={r} gap={2} align="center">
              <div style={{ width: 72, height: 72, background: 'var(--ds-color-primary-subtle)', border: '2px solid var(--ds-color-primary)', borderRadius: `var(--ds-radius-${r})` }} />
              <Text size="xs" mono tone="muted">
                {r}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack gap={3}>
        <Heading level={2} size="sm">
          Elevation
        </Heading>
        <Stack direction="row" gap={8} wrap>
          {['sm', 'md', 'lg'].map((s) => (
            <div key={s} style={{ width: 140, height: 90, display: 'grid', placeItems: 'center', background: 'var(--ds-color-surface)', borderRadius: 'var(--ds-radius-lg)', boxShadow: `var(--ds-shadow-${s})` }}>
              <Text size="xs" mono tone="muted">
                --ds-shadow-{s}
              </Text>
            </div>
          ))}
        </Stack>
      </Stack>
    </Stack>
  ),
};
