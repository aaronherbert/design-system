import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cx, type ControlSize } from '../utils';
import { Field, type FieldBaseProps } from './Field';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, FieldBaseProps {
  size?: ControlSize;
  /** Shorthand for simple lists; you can pass `<option>` children instead. */
  options?: SelectOption[];
  /** Adds a first, empty, unselectable option with this text. */
  placeholder?: string;
  fieldClassName?: string;
}

/** Native `<select>` styled to match the other controls (keeps native mobile pickers & a11y). */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    hint,
    error,
    hideLabel,
    size = 'md',
    options,
    placeholder,
    id,
    required,
    disabled,
    className,
    fieldClassName,
    children,
    ...rest
  },
  ref,
) {
  const uncontrolledDefault = rest.value === undefined && rest.defaultValue === undefined && placeholder ? '' : undefined;
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
            'ds-select',
            `ds-control--${size}`,
            error && 'ds-control--invalid',
            disabled && 'ds-control--disabled',
          )}
        >
          <select
            ref={ref}
            required={required}
            disabled={disabled}
            defaultValue={uncontrolledDefault}
            className={cx('ds-control__input', 'ds-select__input', className)}
            {...control}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options?.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))}
            {children}
          </select>
          <svg className="ds-select__chevron" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" d="m4 6 4 4 4-4" />
          </svg>
        </div>
      )}
    </Field>
  );
});
