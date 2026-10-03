import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { TreeItem, TreeView } from './TreeView';

const meta = {
  title: 'Form controls/TreeView',
  component: TreeView,
  args: { 'aria-label': 'Folders', children: null },
  decorators: [(Story) => <div style={{ maxWidth: 280 }}><Story /></div>],
} satisfies Meta<typeof TreeView>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <TreeView {...args} defaultExpandedIds={['work']} defaultSelectedId="meetings">
      <TreeItem id="work" label="Work" meta={12}>
        <TreeItem id="meetings" label="Meetings" meta={5}>
          <TreeItem id="acme" label="Acme" meta={2} />
          <TreeItem id="weekly" label="Weekly" meta={3} />
        </TreeItem>
        <TreeItem id="ideas" label="Ideas" meta={4} />
      </TreeItem>
      <TreeItem id="personal" label="Personal" meta={8}>
        <TreeItem id="health" label="Health" meta={3} />
      </TreeItem>
      <TreeItem id="recipes" label="Recipes" meta={6} />
    </TreeView>
  ),
};

/** Children are created only when an item is expanded; `hasChildren` shows the chevron before that. */
export const LazyChildren: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>();
    const renderLevel = (path: string[]): ReactNode =>
      ['north', 'south', 'east', 'west']
        .filter((d) => !path.includes(d))
        .map((d) => {
          const id = [...path, d].join('/');
          return (
            <TreeItem key={id} id={id} label={d} hasChildren={path.length < 2}>
              {expanded.includes(id) && path.length < 2 ? renderLevel([...path, d]) : null}
            </TreeItem>
          );
        });
    return (
      <TreeView
        {...args}
        aria-label="Directions"
        selectedId={selected}
        onSelect={setSelected}
        expandedIds={expanded}
        onExpandedChange={setExpanded}
      >
        {renderLevel([])}
      </TreeView>
    );
  },
};

export const LongLabels: Story = {
  render: (args) => (
    <TreeView {...args}>
      <TreeItem id="a" label="A label long enough that it has to be truncated" meta={128} />
      <TreeItem id="b" label="Short" meta={3} />
    </TreeView>
  ),
};
