import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../utils';
import './Choice.css';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: ReactNode;
  description?: ReactNode;
  /** Put the label before the switch (common in settings lists). */
  labelPosition?: 'start' | 'end';
}

/** An on/off toggle for settings that apply immediately. Use Checkbox for form submissions. */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, description, labelPosition = 'end', id, className, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  return (
    <div
      className={cx(
        'ds-choice',
        labelPosition === 'start' && 'ds-choice--reverse',
        rest.disabled && 'ds-choice--disabled',
        className,
      )}
    >
      <input ref={ref} id={inputId} type="checkbox" role="switch" className="ds-switch" aria-describedby={descId} {...rest} />
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
