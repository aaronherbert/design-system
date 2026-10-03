import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Button } from './Button';
import { Stack } from '../layout/Stack';

const meta = {
  title: 'Form controls/Alert',
  component: Alert,
  args: { tone: 'info', title: 'Heads up', children: 'Your trial ends in 3 days.' },
  argTypes: { tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] } },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <Stack gap={3} style={{ maxWidth: 560 }}>
      <Alert tone="info" title="New version available">Refresh to get the latest features.</Alert>
      <Alert tone="success" title="Profile saved" />
      <Alert tone="warning" title="Unsaved changes">You have changes that haven't been saved yet.</Alert>
      <Alert
        tone="danger"
        title="We couldn't submit the form"
        action={<Button size="sm" variant="outline">Retry</Button>}
      >
        Check the 2 highlighted fields and try again.
      </Alert>
    </Stack>
  ),
};
