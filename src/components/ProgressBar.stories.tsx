import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { Button } from './Button';
import { Stack } from '../layout/Stack';

const meta = {
  title: 'Form controls/ProgressBar',
  component: ProgressBar,
  args: { label: 'Uploading photos', value: 45, hint: 'About 2 minutes left' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['primary', 'success', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <Stack gap={6}>
      <ProgressBar label="Importing contacts" value={62} hint="Importing 310 of 500" />
      <ProgressBar label="Backup complete" value={100} tone="success" hint="All 1,204 files backed up" />
      <ProgressBar
        label="Sync failed"
        value={38}
        tone="danger"
        hint="Failed at 38%: the connection dropped. Check your network and try again."
      />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={6}>
      <ProgressBar label="Small" size="sm" value={30} />
      <ProgressBar label="Medium" size="md" value={70} />
    </Stack>
  ),
};

export const Indeterminate: Story = {
  args: { value: undefined, label: 'Preparing your export', hint: 'This can take a minute for large projects' },
};

export const CustomValueText: Story = {
  name: 'Custom value text',
  args: { label: 'Setting up your workspace', value: 3, max: 5, valueText: 'Step 3 of 5', hint: 'Next: invite your team' },
};

export const HiddenLabel: Story = {
  name: 'Hidden label',
  args: { label: 'Video upload', hideLabel: true, hint: undefined, value: 80 },
};

export const LongLabel: Story = {
  name: 'Long label',
  args: {
    label: 'Uploading quarterly-financial-report-final-v3-reviewed-by-legal.pdf',
    value: 12,
    valueText: '1.2 of 9.8 MB',
  },
};

/** Click start to watch it fill, finish, and switch to the success tone. */
export const Simulated: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(null);
    useEffect(() => {
      if (value === null || value >= 100) return;
      const t = setTimeout(() => setValue((v) => Math.min(100, (v ?? 0) + 7)), 250);
      return () => clearTimeout(t);
    }, [value]);
    const done = value === 100;
    return (
      <Stack gap={4}>
        <ProgressBar
          label={done ? 'Upload complete' : 'Uploading 24 photos'}
          value={value ?? 0}
          tone={done ? 'success' : 'primary'}
          hint={done ? 'All 24 photos uploaded' : value === null ? 'Ready to upload' : 'Keep this tab open'}
        />
        <div>
          <Button variant="outline" onClick={() => setValue(0)} disabled={value !== null && !done}>
            {done ? 'Upload again' : 'Start upload'}
          </Button>
        </div>
      </Stack>
    );
  },
};
