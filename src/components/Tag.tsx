import { forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode } from 'react';
import { cx } from '../utils';
import './Tag.css';

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** `neutral` (default) for plain labels; `primary` to highlight, e.g. an active filter. */
  tone?: 'neutral' | 'primary';
  size?: 'sm' | 'md';
  /** Makes the label a button (e.g. "filter by this tag"). */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Shows a remove (×) button. */
  onRemove?: () => void;
  /** Accessible name for the remove button. Defaults to "Remove <children>" when children is a string. */
  removeLabel?: string;
  children: ReactNode;
}

/** A compact label for a keyword, category or filter. Optionally clickable and/or removable. */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { tone = 'neutral', size = 'md', onClick, onRemove, removeLabel, className, children, ...rest },
  ref,
) {
  const removeName = removeLabel ?? (typeof children === 'string' ? `Remove ${children}` : 'Remove');
  return (
    <span
      ref={ref}
      className={cx('ds-tag', `ds-tag--${tone}`, `ds-tag--${size}`, onRemove && 'ds-tag--removable', className)}
      {...rest}
    >
      {onClick ? (
        <button type="button" className="ds-tag__label ds-tag__label--button" onClick={onClick}>
          {children}
        </button>
      ) : (
        <span className="ds-tag__label">{children}</span>
      )}
      {onRemove && (
        <button type="button" className="ds-tag__remove" aria-label={removeName} onClick={onRemove}>
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
});
