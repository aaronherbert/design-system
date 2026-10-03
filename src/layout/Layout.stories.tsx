import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Stack, Inline } from './Stack';
import { Grid, GridItem } from './Grid';
import { Container, Divider } from './Container';
import { Card } from './Card';
import { Button } from '../components/Button';
import { Text } from '../components/Typography';

const meta: Meta = { title: 'Layout', tags: ['!autodocs'] };
export default meta;

const Box = ({ children, h = 56 }: { children?: ReactNode; h?: number }) => (
  <div
    style={{
      minHeight: h,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--ds-radius-md)',
      background: 'var(--ds-color-primary-subtle)',
      border: '1px dashed var(--ds-color-primary)',
      color: 'var(--ds-color-primary-text)',
      fontSize: 'var(--ds-text-sm)',
      fontWeight: 600,
      padding: '0 12px',
    }}
  >
    {children}
  </div>
);

export const StackStory: StoryObj<typeof Stack> = {
  name: 'Stack',
  args: { direction: 'column', gap: 4 },
  argTypes: {
    direction: { control: 'inline-radio', options: ['column', 'row'] },
    gap: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] },
    align: { control: 'select', options: [undefined, 'flex-start', 'center', 'flex-end', 'stretch'] },
    justify: { control: 'select', options: [undefined, 'flex-start', 'center', 'flex-end', 'space-between'] },
  },
  render: (args) => (
    <Stack {...args}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
};

export const InlineStory: StoryObj = {
  name: 'Inline',
  render: () => (
    <Stack gap={6}>
      <Text size="sm" tone="muted">A horizontal row that wraps. Good for button groups, tags and toolbars.</Text>
      <Inline gap={2}>
        {['Design', 'Engineering', 'Marketing', 'Sales', 'Support', 'Finance', 'Legal', 'Operations'].map((t) => (
          <Box key={t} h={32}>{t}</Box>
        ))}
      </Inline>
      <Inline justify="space-between">
        <Button variant="ghost">Back</Button>
        <Inline gap={2}>
          <Button variant="outline">Save draft</Button>
          <Button>Publish</Button>
        </Inline>
      </Inline>
    </Stack>
  ),
};

export const GridStory: StoryObj = {
  name: 'Grid',
  render: () => (
    <Stack gap={8}>
      <Stack gap={2}>
        <Text weight="semibold">Fixed columns (collapse to 1 on mobile)</Text>
        <Grid columns={3}>
          {Array.from({ length: 6 }, (_, i) => <Box key={i}>{i + 1}</Box>)}
        </Grid>
      </Stack>
      <Stack gap={2}>
        <Text weight="semibold">12-column grid with spans</Text>
        <Grid columns={12} gap={3}>
          <GridItem span={8}><Box>span 8</Box></GridItem>
          <GridItem span={4}><Box>span 4</Box></GridItem>
          <GridItem span={4}><Box>span 4</Box></GridItem>
          <GridItem span={4}><Box>span 4</Box></GridItem>
          <GridItem span={4}><Box>span 4</Box></GridItem>
          <GridItem span={12}><Box>span 12</Box></GridItem>
        </Grid>
      </Stack>
      <Stack gap={2}>
        <Text weight="semibold">Auto-fill with <code>minItemWidth="12rem"</code> (resize the window)</Text>
        <Grid minItemWidth="12rem">
          {Array.from({ length: 8 }, (_, i) => <Box key={i}>Card {i + 1}</Box>)}
        </Grid>
      </Stack>
    </Stack>
  ),
};

export const ContainerStory: StoryObj = {
  name: 'Container',
  parameters: { fullBleed: true },
  render: () => (
    <Stack gap={4} style={{ paddingBlock: 24 }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Container key={s} size={s}>
          <Box>Container size="{s}"</Box>
        </Container>
      ))}
    </Stack>
  ),
};

export const CardStory: StoryObj = {
  name: 'Card',
  render: () => (
    <Grid minItemWidth="18rem" gap={6}>
      <Card title="Outlined" description="Default card with a border.">
        <Text size="sm" tone="muted">Cards group related content and actions.</Text>
      </Card>
      <Card variant="elevated" title="Elevated" description="Uses a shadow instead of a border." actions={<Button size="sm" variant="ghost">Edit</Button>}>
        <Text size="sm" tone="muted">Good for content that floats over a background.</Text>
      </Card>
      <Card
        title="With footer"
        description="Typical for forms and dialogs."
        footer={
          <>
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Save</Button>
          </>
        }
      >
        <Text size="sm" tone="muted">The footer sits on a sunken background.</Text>
      </Card>
      <Card variant="sunken" padding="sm">
        <Text size="sm">Sunken card with small padding and no header.</Text>
      </Card>
    </Grid>
  ),
};

export const DividerStory: StoryObj = {
  name: 'Divider',
  render: () => (
    <Stack gap={4}>
      <Text>Above</Text>
      <Divider />
      <Text>Below</Text>
      <Inline gap={4} style={{ height: 24 }}>
        <Text size="sm">Left</Text>
        <Divider orientation="vertical" />
        <Text size="sm">Right</Text>
      </Inline>
    </Stack>
  ),
};
