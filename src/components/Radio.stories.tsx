import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './Radio';
import { Text } from './Typography';

const meta = {
  title: 'Form controls/RadioGroup',
  component: RadioGroup,
  subcomponents: { Radio },
  args: { legend: 'Delivery speed', children: null },
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="standard" label="Standard" defaultChecked />
      <Radio value="express" label="Express" />
      <Radio value="overnight" label="Overnight" />
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  args: { legend: 'Plan', hint: 'You can change plan at any time.' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="free" label="Hobby — Free" description="1 project, community support." defaultChecked />
      <Radio value="pro" label="Pro — £12/month" description="Unlimited projects, email support." />
      <Radio value="team" label="Team — £40/month" description="Up to 10 seats, SSO, priority support." />
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('email');
    return (
      <>
        <RadioGroup {...args} legend="Contact preference" inline value={value} onValueChange={setValue}>
          <Radio value="email" label="Email" />
          <Radio value="phone" label="Phone" />
          <Radio value="post" label="Post" />
        </RadioGroup>
        <Text size="sm" tone="muted" style={{ marginTop: 16 }}>
          Selected: <code>{value}</code>
        </Text>
      </>
    );
  },
};

export const WithError: Story = {
  args: { legend: 'Size', error: 'Choose a size to continue.', required: true },
  render: (args) => (
    <RadioGroup {...args} inline>
      <Radio value="s" label="Small" />
      <Radio value="m" label="Medium" />
      <Radio value="l" label="Large" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="a" label="Option A" defaultChecked />
      <Radio value="b" label="Option B" />
    </RadioGroup>
  ),
};
