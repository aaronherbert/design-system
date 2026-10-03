import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../utils';
import './AppShell.css';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Brand / logo shown at the start of the top bar. */
  brand?: ReactNode;
  /** Right-hand side of the top bar (user menu, actions). */
  headerActions?: ReactNode;
  /** Side navigation. Becomes a toggleable drawer below 900px. */
  sidebar?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

/** Full-page application frame: sticky header, optional sidebar, main content and footer. */
export function AppShell({ brand, headerActions, sidebar, footer, className, children, ...rest }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className={cx('ds-shell', sidebar && 'ds-shell--with-sidebar', navOpen && 'ds-shell--nav-open', className)} {...rest}>
      <header className="ds-shell__header">
        {sidebar && (
          <button
            type="button"
            className="ds-shell__menu"
            aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <div className="ds-shell__brand">{brand}</div>
        <div className="ds-shell__header-actions">{headerActions}</div>
      </header>
      {sidebar && (
        <>
          <nav className="ds-shell__sidebar" aria-label="Main">
            {sidebar}
          </nav>
          <div className="ds-shell__scrim" onClick={() => setNavOpen(false)} aria-hidden="true" />
        </>
      )}
      <main className="ds-shell__main">{children}</main>
      {footer && <footer className="ds-shell__footer">{footer}</footer>}
    </div>
  );
}

export interface NavItemProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  icon?: ReactNode;
  active?: boolean;
}

/** A sidebar navigation link styled for use inside `AppShell`. */
export function NavItem({ href = '#', icon, active, className, children, ...rest }: NavItemProps) {
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cx('ds-nav-item', active && 'ds-nav-item--active', className)}
      {...rest}
    >
      {icon && <span className="ds-nav-item__icon">{icon}</span>}
      {children}
    </a>
  );
}
