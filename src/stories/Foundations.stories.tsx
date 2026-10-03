import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, Heading, Stack, Text } from '../index';

const meta: Meta = {
  title: 'Foundations',
  tags: ['!autodocs'],
};
export default meta;

const scales = {
  Teal: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  Coral: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  Slate: ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
};

const semantic = [
  ['bg', 'surface', 'surface-sunken', 'border', 'border-strong'],
  ['text', 'text-muted', 'text-subtle', 'text-disabled'],
  ['primary', 'primary-hover', 'primary-subtle', 'on-primary', 'accent', 'accent-subtle'],
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
          Teal is the brand colour, coral is the accent and slate is for neutrals. Apps should use the semantic tokens,
          which change with the theme.
        </Text>
      </Stack>
      {Object.entries(scales).map(([name, steps]) => (
        <Stack key={name} gap={3}>
          <Heading level={2} size="sm">
            {name}
          </Heading>
          <Grid minItemWidth="5.5rem" gap={3}>
            {steps.map((s) => (
              <Swatch key={s} cssVar={`--ds-${name.toLowerCase()}-${s}`} label={s} />
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
