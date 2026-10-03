import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState, type DialogHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../utils';
import { IconButton } from './Button';
import './Dialog.css';

export interface DialogProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'open' | 'onClose'> {
  open: boolean;
  /** Called when the user asks to close: Escape, the close button or a backdrop click. */
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  /** Rendered in a separated bar at the bottom (action buttons). */
  footer?: ReactNode;
  /** Max width: `sm` 400px, `md` 560px (default), `lg` 800px. Always full screen below 640px. */
  size?: 'sm' | 'md' | 'lg';
  /** Close when the backdrop is clicked. Default `true`. */
  closeOnBackdrop?: boolean;
  /** Accessible name of the close button. Default "Close". */
  closeLabel?: string;
}

/**
 * Modal dialog built on the native `<dialog>` element (`showModal`), so focus is trapped,
 * the rest of the page is inert and Escape closes it. Focus returns to the opener on close.
 * Content is only rendered while open, so forms inside start fresh each time.
 */
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(function Dialog(
  {
    open,
    onClose,
    title,
    description,
    footer,
    size = 'md',
    closeOnBackdrop = true,
    closeLabel = 'Close',
    className,
    children,
    ...rest
  },
  forwardedRef,
) {
  const ref = useRef<HTMLDialogElement | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();
  // Content mounts only after showModal(), so `autoFocus` inside it lands on a focusable element.
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      setShown(true);
    } else if (!open) {
      if (dialog.open) dialog.close();
      setShown(false);
      opener.current?.focus();
      opener.current = null;
    }
  }, [open]);

  // Without an autoFocus target, start on the first control in the body (else the close button).
  useEffect(() => {
    const dialog = ref.current;
    if (!shown || !dialog || dialog.querySelector('.ds-dialog__panel')?.contains(document.activeElement)) return;
    const first = dialog.querySelector<HTMLElement>(
      '.ds-dialog__body :is(input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])):not(:disabled)',
    );
    (first ?? dialog.querySelector<HTMLElement>('.ds-dialog__header button'))?.focus();
  }, [shown]);

  // Give focus back if unmounted while open.
  useEffect(
    () => () => {
      opener.current?.focus();
    },
    [],
  );

  return (
    <dialog
      ref={(node) => {
        ref.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      className={cx('ds-dialog', `ds-dialog--${size}`, className)}
      onCancel={(e) => {
        // Keep the dialog controlled: let the parent decide.
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // The dialog element itself only receives clicks on its backdrop.
        if (closeOnBackdrop && e.target === e.currentTarget) onClose();
      }}
      {...rest}
    >
      {open && shown && (
        <div className="ds-dialog__panel">
          <header className="ds-dialog__header">
            <div className="ds-dialog__titles">
              <h2 id={titleId} className="ds-dialog__title">
                {title}
              </h2>
              {description && (
                <p id={descId} className="ds-dialog__description">
                  {description}
                </p>
              )}
            </div>
            <IconButton
              aria-label={closeLabel}
              size="sm"
              onClick={onClose}
              icon={
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              }
            />
          </header>
          <div className="ds-dialog__body">{children}</div>
          {footer && <footer className="ds-dialog__footer">{footer}</footer>}
        </div>
      )}
    </dialog>
  );
});
