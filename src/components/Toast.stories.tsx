import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast } from './Toast';
import { Button } from './Button';
import { Inline } from '../layout/Stack';

function Demo() {
  const toast = useToast();
  return (
    <Inline>
      <Button variant="outline" onClick={() => toast.show({ message: 'Note saved to Google Drive.', tone: 'success' })}>
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.show({ message: '"Q3 planning" deleted.', action: { label: 'Undo', onClick: () => toast.show({ message: 'Restored.' }) } })
        }
      >
        With Undo
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.show({ message: "Couldn't reach Google Drive. We'll keep trying.", tone: 'danger', duration: Infinity })}
      >
        Persistent error
      </Button>
    </Inline>
  );
}

const meta = {
  title: 'Form controls/Toast',
  component: ToastProvider,
  args: { children: null },
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
} satisfies Meta<typeof ToastProvider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
