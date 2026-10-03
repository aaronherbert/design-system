import { forwardRef, useEffect, useId, useImperativeHandle, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../utils';
import './Choice.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  /** Secondary text under the label. */
  description?: ReactNode;
  /** Shows the "partially checked" state, e.g. for a select-all checkbox. */
  indeterminate?: boolean;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate = false, error, id, className, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const inner = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inner.current!);

  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={cx('ds-choice', rest.disabled && 'ds-choice--disabled', className)}>
      <input
        ref={inner}
        id={inputId}
        type="checkbox"
        className={cx('ds-checkbox', error && 'ds-choice__input--invalid')}
        aria-describedby={descId}
        aria-invalid={error || undefined}
        {...rest}
      />
      <div className="ds-choice__text">
        <label htmlFor={inputId} className="ds-choice__label">
          {label}
        </label>
        {description && (
          <p id={descId} className="ds-choice__description">
            {description}
          </p>
        )}
      </div>
    </div>
  );
});
