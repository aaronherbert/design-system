import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { TagInput, type TagInputProps } from './TagInput';
import { expectNoAxeViolations } from '../test/axe';

const suggestions = ['work', 'meeting', 'personal', 'weekly review'];

function Harness({ initial = [], onChange, ...props }: Partial<TagInputProps> & { initial?: string[]; onChange?: (t: string[]) => void }) {
  const [tags, setTags] = useState(initial);
  return (
    <TagInput
      label="Tags"
      suggestions={suggestions}
      {...props}
      value={tags}
      onValueChange={(t) => {
        setTags(t);
        onChange?.(t);
      }}
    />
  );
}

const input = () => screen.getByRole('combobox', { name: 'Tags' });

describe('TagInput', () => {
  it('labels the combobox and links the hint', () => {
    render(<Harness hint="Press Enter to add" />);
    expect(input()).toHaveAccessibleDescription('Press Enter to add');
    expect(input()).toHaveAttribute('aria-expanded', 'false');
  });

  it('suggests matching existing tags, prefix matches first', async () => {
    render(<Harness />);
    await userEvent.type(input(), 'w');
    expect(input()).toHaveAttribute('aria-expanded', 'true');
    const options = screen.getAllByRole('option').map((o) => o.textContent);
    expect(options).toEqual(['weekly review', 'work', 'Create "w"']);
  });

  it('commits the highlighted option with arrow keys and Enter', async () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await userEvent.type(input(), 'me');
    await userEvent.keyboard('{ArrowDown}');
    expect(input()).toHaveAttribute('aria-activedescendant', screen.getAllByRole('option')[0].id);
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenLastCalledWith(['meeting']);
    expect(input()).toHaveValue('');
  });

  it('creates new tags with Enter and comma, normalised and de-duplicated', async () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} normalize={(s) => s.trim().toLowerCase()} />);
    await userEvent.type(input(), '  Side Project {Enter}');
    await userEvent.type(input(), 'Ideas,side project,');
    expect(onChange).toHaveBeenLastCalledWith(['side project', 'ideas']);
  });

  it('commits pasted comma-separated text', async () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await userEvent.click(input());
    await userEvent.paste('a, b, c');
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
    expect(input()).toHaveValue(' c');
  });

  it('hides already-selected tags from suggestions', async () => {
    render(<Harness initial={['work']} />);
    await userEvent.type(input(), 'wo');
    expect(screen.queryByRole('option', { name: 'work' })).not.toBeInTheDocument();
  });

  it('removes tags with Backspace and with the remove button', async () => {
    const onChange = vi.fn();
    render(<Harness initial={['work', 'meeting']} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Remove work' }));
    expect(onChange).toHaveBeenLastCalledWith(['meeting']);
    await userEvent.click(input());
    await userEvent.keyboard('{Backspace}');
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('Escape closes the list without propagating', async () => {
    const outer = vi.fn();
    render(
      <div onKeyDown={outer}>
        <Harness />
      </div>,
    );
    await userEvent.type(input(), 'wo');
    await userEvent.keyboard('{Escape}');
    expect(input()).toHaveAttribute('aria-expanded', 'false');
    expect(outer).not.toHaveBeenCalledWith(expect.objectContaining({ key: 'Escape' }));
  });

  it('clicking an option commits it', async () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await userEvent.type(input(), 'pers');
    await userEvent.click(screen.getByRole('option', { name: 'personal' }));
    expect(onChange).toHaveBeenLastCalledWith(['personal']);
  });

  it('has no axe violations, open and closed', async () => {
    const { container } = render(<Harness initial={['work']} hint="Press Enter to add" error="Add a tag" />);
    await expectNoAxeViolations(container);
    await userEvent.type(input(), 'me');
    await expectNoAxeViolations(container);
  });
});
