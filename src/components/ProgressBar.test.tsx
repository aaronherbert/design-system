import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressBar } from './ProgressBar';
import { expectNoAxeViolations } from '../test/axe';

describe('ProgressBar', () => {
  it('is a labelled progressbar showing the percentage', () => {
    render(<ProgressBar label="Uploading photos" value={45} />);
    const bar = screen.getByRole('progressbar', { name: 'Uploading photos' });
    expect(bar).toHaveAttribute('value', '45');
    expect(bar).toHaveAttribute('max', '100');
    expect(bar).toHaveAttribute('aria-valuetext', '45%');
    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('is indeterminate without a value', () => {
    render(<ProgressBar label="Preparing export" />);
    const bar = screen.getByRole('progressbar', { name: 'Preparing export' });
    expect(bar).not.toHaveAttribute('value');
    expect(bar).not.toHaveAttribute('aria-valuetext');
  });

  it('uses valueText, clamps the value, and links the hint', () => {
    render(<ProgressBar label="Setup" value={9} max={5} valueText="Step 5 of 5" hint="Almost done" />);
    const bar = screen.getByRole('progressbar', { name: 'Setup' });
    expect(bar).toHaveAttribute('value', '5');
    expect(bar).toHaveAttribute('aria-valuetext', 'Step 5 of 5');
    expect(bar).toHaveAccessibleDescription('Almost done');
  });

  it('keeps a hidden label as the accessible name', () => {
    render(<ProgressBar label="Video upload" hideLabel value={80} />);
    expect(screen.getByRole('progressbar', { name: 'Video upload' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <ProgressBar label="Uploading" value={30} hint="About a minute left" />
        <ProgressBar label="Preparing" />
        <ProgressBar label="Sync failed" value={38} tone="danger" hint="The connection dropped." />
        <ProgressBar label="Hidden" hideLabel value={10} />
      </div>,
    );
    await expectNoAxeViolations(container);
  });
});
