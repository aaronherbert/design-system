import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import { Stack } from '../layout/Stack';

const countries = [
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
];

const meta = {
  title: 'Form controls/Select',
  component: Select,
  args: { label: 'Country', placeholder: 'Choose a country', options: countries },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithGroups: Story = {
  args: { options: undefined, label: 'Timezone', placeholder: undefined },
  render: (args) => (
    <Select {...args}>
      <optgroup label="Europe">
        <option value="Europe/London">London (GMT+0)</option>
        <option value="Europe/Paris">Paris (GMT+1)</option>
      </optgroup>
      <optgroup label="Americas">
        <option value="America/New_York">New York (GMT-5)</option>
        <option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
      </optgroup>
    </Select>
  ),
};

export const WithError: Story = { args: { required: true, error: 'Select your country.' } };

export const Sizes: Story = {
  render: (args) => (
    <Stack gap={5}>
      <Select {...args} size="sm" label="Small" />
      <Select {...args} size="md" label="Medium" />
      <Select {...args} size="lg" label="Large" />
    </Stack>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
