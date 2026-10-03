import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tag } from './Tag';
import { Inline } from '../layout/Stack';

const meta = {
  title: 'Form controls/Tag',
  component: Tag,
  args: { children: 'design review' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'primary'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <Inline>
      <Tag>recipes</Tag>
      <Tag tone="primary">work</Tag>
    </Inline>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Inline>
      <Tag size="sm">small</Tag>
      <Tag size="md">medium</Tag>
    </Inline>
  ),
};

export const Clickable: Story = {
  render: () => {
    const [active, setActive] = useState('work');
    return (
      <Inline>
        {['work', 'personal', 'reading list'].map((t) => (
          <Tag key={t} tone={active === t ? 'primary' : 'neutral'} onClick={() => setActive(t)}>
            {t}
          </Tag>
        ))}
      </Inline>
    );
  },
};

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = useState(['travel', 'japan', 'itinerary']);
    return (
      <Inline>
        {tags.map((t) => (
          <Tag key={t} tone="primary" onRemove={() => setTags(tags.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
      </Inline>
    );
  },
};

export const LongLabel: Story = {
  render: () => (
    <div style={{ maxWidth: 200 }}>
      <Tag onRemove={() => {}}>a really quite long tag name that truncates</Tag>
    </div>
  ),
};
