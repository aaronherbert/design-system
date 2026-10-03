import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TagInput, type TagInputProps } from './TagInput';

const existing = ['work', 'meeting', 'personal', 'recipes', 'reading list', 'travel', 'ideas', 'weekly review', 'acme'];

function Controlled(props: Partial<TagInputProps>) {
  const [tags, setTags] = useState<string[]>(props.value ?? []);
  return <TagInput label="Tags" suggestions={existing} {...props} value={tags} onValueChange={setTags} />;
}

const meta = {
  title: 'Form controls/TagInput',
  component: TagInput,
  args: {
    label: 'Tags',
    value: [],
    onValueChange: () => {},
    suggestions: existing,
    placeholder: 'Add a tag',
    hint: 'Press Enter or comma to add. Backspace removes the last tag.',
  },
  decorators: [(Story) => <div style={{ maxWidth: 480, minHeight: 320 }}><Story /></div>],
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof TagInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithValues: Story = { args: { value: ['work', 'meeting'] } };

export const LowercaseNormalisation: Story = {
  args: { normalize: (s: string) => s.trim().toLowerCase(), hint: 'Tags are saved in lowercase.' },
};

export const NoCreate: Story = { args: { allowCreate: false, hint: 'Choose from existing tags only.' } };

export const WithError: Story = { args: { required: true, error: 'Add at least one tag so you can find this later.' } };

export const Disabled: Story = { args: { disabled: true, value: ['archived'] } };
