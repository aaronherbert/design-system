import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { Fieldset } from './Fieldset';
import { Stack } from '../layout/Stack';

const meta = {
  title: 'Form controls/Checkbox',
  component: Checkbox,
  args: { label: 'I agree to the terms and conditions' },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDescription: Story = {
  args: { label: 'Product updates', description: 'News about features and improvements. Roughly once a month.', defaultChecked: true },
};

export const States: Story = {
  render: () => (
    <Stack gap={3}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Invalid" error />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </Stack>
  ),
};

const toppings = ['Mushrooms', 'Olives', 'Peppers', 'Pineapple'];

export const GroupWithSelectAll: Story = {
  name: 'Group with select-all',
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(['Olives']);
    const all = selected.length === toppings.length;
    const some = selected.length > 0 && !all;
    return (
      <Fieldset legend="Toppings" hint="Choose as many as you like.">
        <Checkbox
          label="Select all"
          checked={all}
          indeterminate={some}
          onChange={() => setSelected(all ? [] : toppings)}
        />
        <Stack gap={3} style={{ paddingInlineStart: 'var(--ds-space-6)' }}>
          {toppings.map((t) => (
            <Checkbox
              key={t}
              label={t}
              checked={selected.includes(t)}
              onChange={(e) => setSelected((s) => (e.target.checked ? [...s, t] : s.filter((x) => x !== t)))}
            />
          ))}
        </Stack>
      </Fieldset>
    );
  },
};
