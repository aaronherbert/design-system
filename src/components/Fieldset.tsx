import { useId, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../utils';
import './Fieldset.css';

export interface FieldsetProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'children'> {
  legend: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
}

/** Groups related controls (checkbox lists, radio groups, address blocks) under one legend. */
export function Fieldset({ legend, hint, error, required, className, children, ...rest }: FieldsetProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <fieldset
      className={cx('ds-fieldset', className)}
      aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
      {...rest}
    >
      <legend className="ds-fieldset__legend">
        {legend}
        {required && (
          <span className="ds-field__required" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      {hint && (
        <p id={hintId} className="ds-field__hint ds-fieldset__hint">
          {hint}
        </p>
      )}
      <div className="ds-fieldset__body">{children}</div>
      {error && (
        <p id={errorId} className="ds-field__error ds-fieldset__error">
          {error}
        </p>
      )}
    </fieldset>
  );
}
