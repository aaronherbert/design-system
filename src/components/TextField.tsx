import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx, type ControlSize } from '../utils';
import { Field, type FieldBaseProps } from './Field';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, FieldBaseProps {
  size?: ControlSize;
  /** Content rendered inside the box before the input (icon, currency symbol…). */
  leading?: ReactNode;
  /** Content rendered inside the box after the input (icon, unit, button…). */
  trailing?: ReactNode;
  /** Class for the outer field wrapper (the `className` prop goes on the `<input>`). */
  fieldClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, hideLabel, size = 'md', leading, trailing, id, required, disabled, className, fieldClassName, type = 'text', ...rest },
  ref,
) {
  return (
    <Field
      id={id}
      label={label}
      hint={hint}
      error={error}
      hideLabel={hideLabel}
      required={required}
      disabled={disabled}
      className={fieldClassName}
    >
      {(control) => (
        <div
          className={cx(
            'ds-control',
            `ds-control--${size}`,
            error && 'ds-control--invalid',
            disabled && 'ds-control--disabled',
          )}
        >
          {leading && <span className="ds-control__adornment">{leading}</span>}
          <input
            ref={ref}
            type={type}
            required={required}
            disabled={disabled}
            className={cx('ds-control__input', className)}
            {...control}
            {...rest}
          />
          {trailing && <span className="ds-control__adornment">{trailing}</span>}
        </div>
      )}
    </Field>
  );
});
