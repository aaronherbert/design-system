import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../utils';
import { Fieldset } from './Fieldset';
import './Choice.css';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  invalid?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  legend: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  name?: string;
  /** Controlled value. Omit and use `defaultChecked` on a Radio for uncontrolled use. */
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  /** Lay the options out in a row instead of a column. */
  inline?: boolean;
  className?: string;
  children: ReactNode;
}

export function RadioGroup({
  legend,
  hint,
  error,
  name,
  value,
  onValueChange,
  disabled,
  required,
  inline,
  className,
  children,
}: RadioGroupProps) {
  const autoName = useId();
  return (
    <Fieldset legend={legend} hint={hint} error={error} required={required} disabled={disabled} className={className}>
      <RadioGroupContext.Provider
        value={{
          name: name ?? autoName,
          value,
          onChange: onValueChange ? (e) => onValueChange(e.target.value) : undefined,
          disabled,
          invalid: !!error,
        }}
      >
        <div role="radiogroup" className={cx('ds-choice-group', inline && 'ds-choice-group--inline')}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    </Fieldset>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  value: string;
  label: ReactNode;
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, description, id, className, disabled, onChange, ...rest },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = description ? `${inputId}-desc` : undefined;
  const isDisabled = disabled ?? group?.disabled;
  const controlled = group?.value !== undefined ? { checked: group.value === value } : {};

  return (
    <div className={cx('ds-choice', isDisabled && 'ds-choice--disabled', className)}>
      <input
        ref={ref}
        id={inputId}
        type="radio"
        name={group?.name}
        value={value}
        disabled={isDisabled}
        className={cx('ds-radio', group?.invalid && 'ds-choice__input--invalid')}
        aria-describedby={descId}
        onChange={(e) => {
          group?.onChange?.(e);
          onChange?.(e);
        }}
        {...controlled}
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
