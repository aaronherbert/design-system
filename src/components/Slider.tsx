import { forwardRef, useState, type CSSProperties, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../utils';
import { Field, type FieldBaseProps } from './Field';
import './Slider.css';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>, FieldBaseProps {
  /** Show the current value next to the label. Pass a function to format it. */
  showValue?: boolean | ((value: number) => ReactNode);
  fieldClassName?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { label, hint, error, hideLabel, showValue = false, id, disabled, min = 0, max = 100, className, fieldClassName, onChange, ...rest },
  ref,
) {
  const [internal, setInternal] = useState(Number(rest.value ?? rest.defaultValue ?? min));
  const current = rest.value !== undefined ? Number(rest.value) : internal;
  const pct = ((current - Number(min)) / (Number(max) - Number(min))) * 100;
  const valueLabel = typeof showValue === 'function' ? showValue(current) : current;

  return (
    <Field
      id={id}
      label={
        label && (
          <span className="ds-slider__label">
            {label}
            {showValue && <output className="ds-slider__value">{valueLabel}</output>}
          </span>
        )
      }
      hint={hint}
      error={error}
      hideLabel={hideLabel}
      disabled={disabled}
      className={fieldClassName}
    >
      {(control) => (
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          disabled={disabled}
          className={cx('ds-slider', className)}
          style={{ '--ds-slider-pct': `${pct}%` } as CSSProperties}
          onChange={(e) => {
            setInternal(Number(e.target.value));
            onChange?.(e);
          }}
          {...control}
          {...rest}
        />
      )}
    </Field>
  );
});
