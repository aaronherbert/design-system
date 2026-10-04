import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TreeItem, TreeView } from './TreeView';
import { expectNoAxeViolations } from '../test/axe';

function Sample(props: { onSelect?: (id: string) => void; defaultExpandedIds?: string[] }) {
  return (
    <TreeView aria-label="Tags" {...props}>
      <TreeItem id="work" label="work" meta={3}>
        <TreeItem id="meeting" label="meeting" meta={2} />
        <TreeItem id="ideas" label="ideas" meta={1} />
      </TreeItem>
      <TreeItem id="home" label="home" meta={1} />
    </TreeView>
  );
}

const item = (name: string) => screen.getByRole('treeitem', { name: new RegExp(`^${name}`) });

describe('TreeView', () => {
  it('renders a labelled tree with one tab stop', () => {
    render(<Sample />);
    expect(screen.getByRole('tree', { name: 'Tags' })).toBeInTheDocument();
    const items = screen.getAllByRole('treeitem');
    expect(items.map((i) => i.tabIndex)).toEqual([0, -1]);
    expect(item('work')).toHaveAttribute('aria-expanded', 'false');
    expect(item('home')).not.toHaveAttribute('aria-expanded');
    expect(item('work')).toHaveAttribute('aria-level', '1');
  });

  it('does not render children until expanded', async () => {
    render(<Sample />);
    expect(screen.queryByRole('treeitem', { name: /meeting/ })).not.toBeInTheDocument();
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    expect(item('work')).toHaveAttribute('aria-expanded', 'true');
    expect(item('meeting')).toHaveAttribute('aria-level', '2');
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('supports the full arrow-key pattern', async () => {
    render(<Sample defaultExpandedIds={['work']} />);
    await userEvent.tab();
    expect(item('work')).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}'); // already expanded: to first child
    expect(item('meeting')).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(item('ideas')).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}'); // leaf: to parent
    expect(item('work')).toHaveFocus();
    await userEvent.keyboard('{End}');
    expect(item('home')).toHaveFocus();
    await userEvent.keyboard('{Home}');
    expect(item('work')).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}'); // expanded: collapse
    expect(item('work')).toHaveAttribute('aria-expanded', 'false');
    expect(item('work').tabIndex).toBe(0);
  });

  it('selects with Enter, Space and click', async () => {
    const onSelect = vi.fn();
    render(<Sample onSelect={onSelect} defaultExpandedIds={['work']} />);
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    expect(onSelect).toHaveBeenLastCalledWith('work');
    expect(item('work')).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowDown}[Space]');
    expect(onSelect).toHaveBeenLastCalledWith('meeting');
    await userEvent.click(screen.getByText('home'));
    expect(onSelect).toHaveBeenLastCalledWith('home');
    expect(onSelect).toHaveBeenCalledTimes(3); // nested clicks don't bubble to the parent
  });

  it('moves the tab stop to a visible item when the focused one is collapsed away', async () => {
    const { rerender } = render(<Sample defaultExpandedIds={['work']} />);
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    expect(item('meeting').tabIndex).toBe(0);
    rerender(
      <TreeView aria-label="Tags">
        <TreeItem id="work" label="work" />
      </TreeView>,
    );
    expect(item('work').tabIndex).toBe(0);
  });

  it('has no axe violations', async () => {
    const { container } = render(<Sample defaultExpandedIds={['work']} />);
    await expectNoAxeViolations(container);
  });
});
