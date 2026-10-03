import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import { Stack } from '../layout/Stack';
import { Divider } from '../layout/Container';

const meta = {
  title: 'Form controls/Switch',
  component: Switch,
  args: { label: 'Enable notifications' },
} satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <Stack gap={3}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </Stack>
  ),
};

export const SettingsList: Story = {
  render: () => (
    <Stack gap={4} style={{ maxWidth: 480 }}>
      <Switch labelPosition="start" label="Email digests" description="A weekly summary of activity." defaultChecked />
      <Divider />
      <Switch labelPosition="start" label="Push notifications" description="Mentions and direct messages." />
      <Divider />
      <Switch labelPosition="start" label="Dark mode" description="Use the dark theme on this device." />
    </Stack>
  ),
};
