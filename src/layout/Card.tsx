import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../utils';
import './Layout.css';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  as?: ElementType;
  title?: ReactNode;
  description?: ReactNode;
  /** Rendered top-right of the header (buttons, menu…). */
  actions?: ReactNode;
  /** Rendered in a separated footer bar (form buttons, links…). */
  footer?: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** `outlined` (default) uses a border; `elevated` uses a shadow; `sunken` sits below the surface. */
  variant?: 'outlined' | 'elevated' | 'sunken';
}

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { as: Tag = 'section', title, description, actions, footer, padding = 'md', variant = 'outlined', className, children, ...rest },
  ref,
) {
  const hasHeader = title || description || actions;
  return (
    <Tag ref={ref} className={cx('ds-card', `ds-card--${variant}`, `ds-card--pad-${padding}`, className)} {...rest}>
      {hasHeader && (
        <header className="ds-card__header">
          <div className="ds-card__titles">
            {title && <h3 className="ds-card__title">{title}</h3>}
            {description && <p className="ds-card__description">{description}</p>}
          </div>
          {actions && <div className="ds-card__actions">{actions}</div>}
        </header>
      )}
      {children && <div className="ds-card__body">{children}</div>}
      {footer && <footer className="ds-card__footer">{footer}</footer>}
    </Tag>
  );
});
