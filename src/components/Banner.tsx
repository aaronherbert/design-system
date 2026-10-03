import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils';
import './Banner.css';

export interface BannerProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  /** Optional trailing action, e.g. a Button. Buttons inside a banner are restyled to sit on the gradient. */
  action?: ReactNode;
  /** `brand` uses the deep brand gradient; `subtle` uses a tinted surface. */
  variant?: 'brand' | 'subtle';
}

/**
 * A highlighted summary panel, for plan usage, onboarding progress or announcements.
 * Put a `Meter` inside to show progress.
 */
export function Banner({ title, action, variant = 'brand', className, children, ...rest }: BannerProps) {
  return (
    <section className={cx('ds-banner', `ds-banner--${variant}`, className)} {...rest}>
      <div className="ds-banner__top">
        <div className="ds-banner__text">
          <p className="ds-banner__title">{title}</p>
          {children && <div className="ds-banner__body">{children}</div>}
        </div>
        {action && <div className="ds-banner__action">{action}</div>}
      </div>
    </section>
  );
}

export interface MeterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: number;
  max?: number;
  /** Accessible name, e.g. "Build minutes used". */
  label: string;
  /** Visible text describing the value, e.g. "1,240 of 2,000". Also used as aria-valuetext. */
  valueText?: string;
}

/** A read-only gauge for a known range (quota, storage, completion). Not for indeterminate loading. */
export function Meter({ value, max = 100, label, valueText, className, ...rest }: MeterProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cx('ds-meter', className)} {...rest}>
      {valueText && (
        <div className="ds-meter__head" aria-hidden="true">
          <span>{label}</span>
          <span className="ds-meter__value">{valueText}</span>
        </div>
      )}
      <div
        className="ds-meter__track"
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={valueText}
      >
        <span className="ds-meter__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
