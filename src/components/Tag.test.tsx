import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tag } from './Tag';
import { expectNoAxeViolations } from '../test/axe';

describe('Tag', () => {
  it('is plain text by default', () => {
    render(<Tag>recipes</Tag>);
    expect(screen.getByText('recipes')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('becomes a button with onClick and offers a labelled remove button', async () => {
    const onClick = vi.fn();
    const onRemove = vi.fn();
    render(
      <Tag onClick={onClick} onRemove={onRemove}>
        work
      </Tag>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'work' }));
    await userEvent.click(screen.getByRole('button', { name: 'Remove work' }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('uses removeLabel for non-string children', () => {
    render(
      <Tag onRemove={() => {}} removeLabel="Remove filter">
        <b>work</b>
      </Tag>,
    );
    expect(screen.getByRole('button', { name: 'Remove filter' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Tag>a</Tag>
        <Tag tone="primary" onClick={() => {}} onRemove={() => {}}>
          b
        </Tag>
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
