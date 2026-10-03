import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';
import { Stack } from '../layout/Stack';

const meta = {
  title: 'Form controls/Slider',
  component: Slider,
  args: { label: 'Volume', defaultValue: 40, showValue: true },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Formatted: Story = {
  render: () => (
    <Stack gap={6}>
      <Slider label="Budget" min={0} max={5000} step={50} defaultValue={1500} showValue={(v) => `£${v.toLocaleString()}`} />
      <Slider label="Opacity" min={0} max={1} step={0.05} defaultValue={0.8} showValue={(v) => `${Math.round(v * 100)}%`} hint="Applies to the background layer." />
      <Slider label="Disabled" defaultValue={60} disabled showValue />
    </Stack>
  ),
};
