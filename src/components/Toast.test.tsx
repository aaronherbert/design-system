import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider, useToast, type ToastOptions } from './Toast';
import { expectNoAxeViolations } from '../test/axe';

function Trigger(options: ToastOptions) {
  const toast = useToast();
  return <button onClick={() => toast.show(options)}>Show</button>;
}

const setup = (options: ToastOptions) => {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const utils = render(
    <ToastProvider>
      <Trigger {...options} />
    </ToastProvider>,
  );
  return { user, ...utils };
};

describe('Toast', () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it('announces in a polite, labelled region and hides after its duration', async () => {
    const { user } = setup({ message: 'Saved', duration: 3000 });
    const region = screen.getByRole('region', { name: 'Notifications' });
    expect(region).toHaveAttribute('aria-live', 'polite');
    await user.click(screen.getByRole('button', { name: 'Show' }));
    expect(region).toHaveTextContent('Saved');
    act(() => vi.advanceTimersByTime(3000));
    expect(region).not.toHaveTextContent('Saved');
  });

  it('runs the action and dismisses', async () => {
    const onUndo = vi.fn();
    const { user } = setup({ message: 'Deleted', action: { label: 'Undo', onClick: onUndo } });
    await user.click(screen.getByRole('button', { name: 'Show' }));
    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onUndo).toHaveBeenCalledOnce();
    expect(screen.queryByText('Deleted')).not.toBeInTheDocument();
  });

  it('pauses while hovered', async () => {
    const { user } = setup({ message: 'Deleted', duration: 1000 });
    await user.click(screen.getByRole('button', { name: 'Show' }));
    await user.hover(screen.getByText('Deleted'));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText('Deleted')).toBeInTheDocument();
    await user.unhover(screen.getByText('Deleted'));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.queryByText('Deleted')).not.toBeInTheDocument();
  });

  it('can be dismissed', async () => {
    const { user } = setup({ message: 'Hello', duration: Infinity });
    await user.click(screen.getByRole('button', { name: 'Show' }));
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { user, container } = setup({ message: 'Deleted', action: { label: 'Undo', onClick: () => {} } });
    await user.click(screen.getByRole('button', { name: 'Show' }));
    vi.useRealTimers();
    await expectNoAxeViolations(container);
  });
});
