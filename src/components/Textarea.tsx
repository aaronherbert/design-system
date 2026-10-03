import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cx } from '../utils';
import { Field, type FieldBaseProps } from './Field';
import './Textarea.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldBaseProps {
  /** Allow the user to drag-resize vertically. Default `true`. */
  resizable?: boolean;
  fieldClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, hideLabel, resizable = true, id, required, disabled, rows = 4, className, fieldClassName, ...rest },
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
        <div className={cx('ds-control', 'ds-textarea', error && 'ds-control--invalid', disabled && 'ds-control--disabled')}>
          <textarea
            ref={ref}
            rows={rows}
            required={required}
            disabled={disabled}
            className={cx('ds-control__input', 'ds-textarea__input', !resizable && 'ds-textarea__input--fixed', className)}
            {...control}
            {...rest}
          />
        </div>
      )}
    </Field>
  );
});
