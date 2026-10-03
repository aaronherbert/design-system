import { useId, type ReactNode } from 'react';
import { cx } from '../utils';
import './Field.css';

/** Props shared by every labelled form control. */
export interface FieldBaseProps {
  label?: ReactNode;
  /** Helper text shown under the control. */
  hint?: ReactNode;
  /** Error message. Also marks the control `aria-invalid`. */
  error?: ReactNode;
  /** Keep the label for screen readers but hide it visually. */
  hideLabel?: boolean;
}

export interface FieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
}

export interface FieldProps extends FieldBaseProps {
  id?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  /** Render prop receiving the ids/aria attributes to spread onto your control. */
  children: (control: FieldControlProps) => ReactNode;
}

/**
 * Label + hint + error wrapper. Built-in controls use it already; use it directly
 * to give a custom control the same layout and accessibility wiring.
 */
export function Field({ id, label, hint, error, hideLabel, required, disabled, className, children }: FieldProps) {
  const autoId = useId();
  const controlId = id ?? autoId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('ds-field', disabled && 'ds-field--disabled', className)}>
      {label && (
        <label htmlFor={controlId} className={cx('ds-field__label', hideLabel && 'ds-visually-hidden')}>
          {label}
          {required && (
            <span className="ds-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children({ id: controlId, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {hint && (
        <p id={hintId} className="ds-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="ds-field__error">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm0 9.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM8 4a.9.9 0 0 0-.9.95l.2 4a.7.7 0 0 0 1.4 0l.2-4A.9.9 0 0 0 8 4Z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
