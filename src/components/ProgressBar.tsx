import { forwardRef, useId, type ProgressHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../utils';
import './ProgressBar.css';

export interface ProgressBarProps extends Omit<ProgressHTMLAttributes<HTMLProgressElement>, 'value' | 'max'> {
  /** Visible label naming the task, e.g. "Uploading photos". Required: it is the bar's accessible name. */
  label: ReactNode;
  /** Progress so far, from 0 to `max`. Leave it out while the total is unknown to show an indeterminate bar. */
  value?: number;
  /** The value that means "done". Defaults to 100. */
  max?: number;
  /**
   * Text shown at the end of the label row, e.g. "3 of 12 files". Defaults to the percentage when `value` is set.
   * A string also becomes `aria-valuetext`.
   */
  valueText?: ReactNode;
  /** Helper or status text under the bar, linked with `aria-describedby`. Say "failed" here when `tone` is `danger`. */
  hint?: ReactNode;
  /** `primary` (default) while working, `success` when done, `danger` when it failed. Pair it with words in `label` or `hint`. */
  tone?: 'primary' | 'success' | 'danger';
  size?: 'sm' | 'md';
  /** Keep the label for screen readers but hide it visually. */
  hideLabel?: boolean;
  /** Class for the wrapper. `className` goes on the native `<progress>`. */
  fieldClassName?: string;
}

/**
 * Shows how far a task has got (an upload, an import, a multi-step setup), or that it's running when the total
 * is unknown. For a static amount within a range, like storage used, use `Meter` instead.
 */
export const ProgressBar = forwardRef<HTMLProgressElement, ProgressBarProps>(function ProgressBar(
  { label, value, max = 100, valueText, hint, tone = 'primary', size = 'md', hideLabel, fieldClassName, className, id, ...rest },
  ref,
) {
  const autoId = useId();
  const barId = id ?? autoId;
  const hintId = hint ? `${barId}-hint` : undefined;
  const determinate = value !== undefined;
  const clamped = determinate ? Math.max(0, Math.min(max, value)) : undefined;
  const shownValue = valueText ?? (clamped !== undefined ? `${Math.round((clamped / max) * 100)}%` : undefined);

  return (
    <div className={cx('ds-progress', `ds-progress--${tone}`, `ds-progress--${size}`, fieldClassName)}>
      <div className={cx('ds-progress__head', hideLabel && !shownValue && 'ds-visually-hidden')}>
        <label htmlFor={barId} className={cx('ds-progress__label', hideLabel && 'ds-visually-hidden')}>
          {label}
        </label>
        {shownValue !== undefined && (
          <span className="ds-progress__value" aria-hidden="true">
            {shownValue}
          </span>
        )}
      </div>
      <progress
        ref={ref}
        id={barId}
        className={cx('ds-progress__bar', className)}
        value={clamped}
        max={max}
        aria-valuetext={typeof shownValue === 'string' ? shownValue : undefined}
        aria-describedby={hintId}
        {...rest}
      />
      {hint && (
        <p id={hintId} className="ds-progress__hint">
          {hint}
        </p>
      )}
    </div>
  );
});
