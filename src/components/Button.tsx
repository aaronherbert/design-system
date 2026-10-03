import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx, type ControlSize } from '../utils';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ControlSize;
  /** Shows a spinner, disables the button and sets `aria-busy`. */
  loading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    disabled,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'ds-button',
        `ds-button--${variant}`,
        `ds-button--${size}`,
        fullWidth && 'ds-button--full',
        loading && 'ds-button--loading',
        className,
      )}
      {...rest}
    >
      {loading && <span className="ds-button__spinner" aria-hidden="true" />}
      {leadingIcon && <span className="ds-button__icon">{leadingIcon}</span>}
      {children && <span className="ds-button__label">{children}</span>}
      {trailingIcon && <span className="ds-button__icon">{trailingIcon}</span>}
    </button>
  );
});

export interface IconButtonProps extends Omit<ButtonProps, 'leadingIcon' | 'trailingIcon' | 'children' | 'fullWidth'> {
  /** Required: icon-only buttons need an accessible name. */
  'aria-label': string;
  icon: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, variant = 'ghost', className, ...rest },
  ref,
) {
  return (
    <Button ref={ref} variant={variant} className={cx('ds-button--icon-only', className)} leadingIcon={icon} {...rest} />
  );
});
