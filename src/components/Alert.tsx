import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils';
import './Alert.css';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  title?: ReactNode;
  /** Optional trailing content such as a dismiss button. */
  action?: ReactNode;
}

const icons: Record<AlertTone, string> = {
  info: 'M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm0 6a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 8 7Zm0-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  success: 'M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm3.03 4.47a.75.75 0 0 0-1.06 0L7 8.44 6.03 7.47a.75.75 0 1 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0 0-1.06Z',
  warning: 'M6.7 1.9a1.5 1.5 0 0 1 2.6 0l5.8 10.3A1.5 1.5 0 0 1 13.8 14.5H2.2a1.5 1.5 0 0 1-1.3-2.3L6.7 1.9ZM8 10.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM8 5a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 8 5Z',
  danger: 'M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm0 9.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM8 4a.9.9 0 0 0-.9.95l.2 4a.7.7 0 0 0 1.4 0l.2-4A.9.9 0 0 0 8 4Z',
};

/** Inline message for form-level feedback (submission errors, success confirmation). */
export function Alert({ tone = 'info', title, action, className, children, ...rest }: AlertProps) {
  return (
    <div
      role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}
      className={cx('ds-alert', `ds-alert--${tone}`, className)}
      {...rest}
    >
      <svg className="ds-alert__icon" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d={icons[tone]} />
      </svg>
      <div className="ds-alert__body">
        {title && <p className="ds-alert__title">{title}</p>}
        {children && <div className="ds-alert__content">{children}</div>}
      </div>
      {action && <div className="ds-alert__action">{action}</div>}
    </div>
  );
}
