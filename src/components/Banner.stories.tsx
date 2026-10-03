import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner, Meter } from './Banner';
import { Button } from './Button';
import { Stack } from '../layout/Stack';

const meta = {
  title: 'Form controls/Banner',
  component: Banner,
  subcomponents: { Meter },
  args: {
    title: 'Pro plan',
    children: '1,240 of 2,000 build minutes used this month. Resets on 1 November.',
  },
  argTypes: { variant: { control: 'inline-radio', options: ['brand', 'subtle'] } },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>],
} satisfies Meta<typeof Banner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Banner {...args} action={<Button size="sm">View usage</Button>}>
      <Stack gap={3}>
        <span>{args.children}</span>
        <Meter label="Build minutes used" value={1240} max={2000} />
      </Stack>
    </Banner>
  ),
};

export const Subtle: Story = {
  args: { variant: 'subtle', title: 'Finish setting up', children: '3 of 5 steps done. Connect a domain next.' },
  render: (args) => (
    <Banner {...args} action={<Button size="sm" variant="outline">Continue</Button>}>
      <Stack gap={3}>
        <span>{args.children}</span>
        <Meter label="Setup progress" value={3} max={5} />
      </Stack>
    </Banner>
  ),
};

export const MeterOnItsOwn: Story = {
  name: 'Meter on its own',
  render: () => (
    <Stack gap={5}>
      <Meter label="Storage" value={7.2} max={10} valueText="7.2 of 10 GB" />
      <Meter label="Seats" value={6} max={10} valueText="6 of 10" />
    </Stack>
  ),
};
