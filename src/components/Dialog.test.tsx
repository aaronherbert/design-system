import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { expectNoAxeViolations } from '../test/axe';

function Harness({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          onClose?.();
        }}
        title="Edit note"
        description="Changes save automatically."
        footer={<Button onClick={() => setOpen(false)}>Done</Button>}
      >
        <input aria-label="Title" />
      </Dialog>
    </>
  );
}

describe('Dialog', () => {
  it('renders nothing inside until opened', () => {
    render(<Harness />);
    expect(screen.queryByLabelText('Title')).not.toBeInTheDocument();
  });

  it('opens with an accessible name and description', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = screen.getByRole('dialog', { name: 'Edit note' });
    expect(dialog).toHaveAttribute('open');
    expect(dialog).toHaveAccessibleDescription('Changes save automatically.');
  });

  it('closes from the close button and returns focus to the opener', async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const opener = screen.getByRole('button', { name: 'Open' });
    await userEvent.click(opener);
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledOnce();
    expect(screen.queryByLabelText('Title')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('routes the native cancel event (Escape) through onClose', async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes on backdrop click only', async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await userEvent.click(screen.getByLabelText('Title'));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('moves focus into the body on open, honouring autoFocus', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByLabelText('Title')).toHaveFocus();

    render(
      <Dialog open onClose={() => {}} title="Pick one">
        <input aria-label="First" />
        <input aria-label="Second" autoFocus />
      </Dialog>,
    );
    expect(screen.getByLabelText('Second')).toHaveFocus();
  });

  it('has no axe violations when open', async () => {
    const { container } = render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await expectNoAxeViolations(container);
  });
});
