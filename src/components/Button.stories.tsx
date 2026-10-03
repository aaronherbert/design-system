import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button, IconButton } from './Button';
import { Inline, Stack } from '../layout/Stack';
import { ArrowRightIcon, PlusIcon, TrashIcon } from '../stories/icons';

const meta = {
  title: 'Form controls/Button',
  component: Button,
  args: { children: 'Save changes', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Inline gap={3}>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="danger">Delete</Button>
    </Inline>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Inline gap={3}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </Inline>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Inline gap={3}>
      <Button {...args} leadingIcon={<PlusIcon />}>New project</Button>
      <Button {...args} variant="outline" trailingIcon={<ArrowRightIcon />}>Continue</Button>
      <Button {...args} variant="danger" leadingIcon={<TrashIcon />}>Delete</Button>
      <IconButton aria-label="Add item" icon={<PlusIcon />} variant="outline" />
      <IconButton aria-label="Delete item" icon={<TrashIcon />} />
    </Inline>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack gap={4}>
      <Inline gap={3}>
        <Button {...args} loading>Saving</Button>
        <Button {...args} variant="outline" loading>Loading</Button>
        <Button {...args} disabled>Disabled</Button>
        <Button {...args} variant="outline" disabled>Disabled</Button>
      </Inline>
      <div style={{ maxWidth: 360 }}>
        <Button {...args} fullWidth>Full width</Button>
      </div>
    </Stack>
  ),
};
