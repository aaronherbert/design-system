import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dialog, type DialogProps } from './Dialog';
import { Button } from './Button';
import { TextField } from './TextField';
import { Textarea } from './Textarea';
import { Text } from './Typography';
import { Stack } from '../layout/Stack';

function WithTrigger({ trigger = 'Open dialog', ...props }: Partial<DialogProps> & { trigger?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{trigger}</Button>
      <Dialog
        title="Dialog"
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          props.footer ?? (
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </>
          )
        }
      />
    </>
  );
}

const meta = {
  title: 'Form controls/Dialog',
  component: Dialog,
  args: {
    open: false,
    onClose: () => {},
    title: 'Rename project',
    description: 'The new name is shown to everyone on the team.',
  },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  render: (args) => (
    <WithTrigger {...args} trigger="Rename project">
      <TextField label="Project name" defaultValue="Website relaunch" autoFocus />
    </WithTrigger>
  ),
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Form: Story = {
  args: { title: 'New note', description: undefined, size: 'lg' },
  render: (args) => (
    <WithTrigger {...args} trigger="New note">
      <Stack gap={5}>
        <TextField label="Title" name="title" autoFocus />
        <Textarea label="Note" name="body" rows={8} />
      </Stack>
    </WithTrigger>
  ),
};

export const Confirmation: Story = {
  args: { title: 'Delete this note?', description: undefined, size: 'sm' },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Delete note</Button>
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>Keep it</Button>
              <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
            </>
          }
        >
          <Text>"Q3 planning" will be moved to the bin. You can restore it for 30 days.</Text>
        </Dialog>
      </>
    );
  },
};

export const LongContent: Story = {
  args: { title: 'Terms of service', description: undefined },
  render: (args) => (
    <WithTrigger {...args} trigger="Read terms">
      <Stack gap={4}>
        {Array.from({ length: 12 }, (_, i) => (
          <Text key={i}>
            Section {i + 1}. You keep ownership of everything you write. We store it only where you tell us to, and
            you can export or delete it at any time from your account settings.
          </Text>
        ))}
      </Stack>
    </WithTrigger>
  ),
};
