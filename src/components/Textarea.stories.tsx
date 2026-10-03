import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Form controls/Textarea',
  component: Textarea,
  args: { label: 'Message', placeholder: 'Tell us a bit more…', hint: 'Max 500 characters.' },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithError: Story = { args: { error: 'Please enter a message.', required: true, hint: undefined } };
export const NotResizable: Story = { args: { resizable: false, rows: 6 } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'This cannot be edited.' } };
