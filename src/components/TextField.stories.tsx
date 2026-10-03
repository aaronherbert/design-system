import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';
import { Stack } from '../layout/Stack';
import { MailIcon, SearchIcon } from '../stories/icons';

const meta = {
  title: 'Form controls/TextField',
  component: TextField,
  args: { label: 'Full name', placeholder: 'Ada Lovelace' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithHint: Story = {
  args: { label: 'Username', hint: 'Letters, numbers and underscores only.', placeholder: 'ada_l' },
};

export const WithError: Story = {
  args: { label: 'Email', type: 'email', defaultValue: 'ada@', error: 'Enter a valid email address.', required: true },
};

export const Adornments: Story = {
  render: () => (
    <Stack gap={5}>
      <TextField label="Search" hideLabel placeholder="Search projects…" leading={<SearchIcon />} />
      <TextField label="Email" type="email" placeholder="you@example.com" leading={<MailIcon />} />
      <TextField label="Price" type="number" placeholder="0.00" leading="£" trailing="GBP" />
      <TextField label="Website" placeholder="example.com" leading="https://" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={5}>
      <TextField size="sm" label="Small" placeholder="32px tall" />
      <TextField size="md" label="Medium" placeholder="40px tall" />
      <TextField size="lg" label="Large" placeholder="48px tall" />
    </Stack>
  ),
};

export const Types: Story = {
  render: () => (
    <Stack gap={5}>
      <TextField label="Password" type="password" defaultValue="hunter2" />
      <TextField label="Date of birth" type="date" />
      <TextField label="Quantity" type="number" defaultValue={1} min={1} />
      <TextField label="Phone" type="tel" placeholder="+44 7700 900000" />
    </Stack>
  ),
};

export const Disabled: Story = { args: { disabled: true, defaultValue: 'Read only value' } };
