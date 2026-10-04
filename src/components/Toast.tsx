import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cx } from '../utils';
import { Button, IconButton } from './Button';
import './Toast.css';

export interface ToastOptions {
  message: ReactNode;
  /** A single action, e.g. Undo. Clicking it also dismisses the toast. */
  action?: { label: string; onClick: () => void };
  /** Milliseconds before it hides. Default 5000. `Infinity` keeps it until dismissed. Paused while hovered or focused. */
  duration?: number;
  tone?: 'neutral' | 'success' | 'danger';
}

export interface ToastApi {
  /** Shows a toast and returns its id. */
  show: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

interface ToastItem extends ToastOptions {
  id: string;
}

const ToastContext = createContext<ToastApi | null>(null);

/** Returns `{ show, dismiss }`. Must be used inside a `ToastProvider`. */
export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast must be used inside a ToastProvider');
  return api;
}

export interface ToastProviderProps {
  children: ReactNode;
  /** Accessible name of the notifications region. Default "Notifications". */
  label?: string;
}

let counter = 0;

/**
 * Hosts toasts: brief, non-blocking messages in the bottom corner, announced politely
 * to screen readers. Put it inside `ThemeProvider`, around the app.
 */
export function ToastProvider({ children, label = 'Notifications' }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const [paused, setPaused] = useState(false);

  const dismiss = useCallback((id: string) => setItems((list) => list.filter((t) => t.id !== id)), []);
  const show = useCallback((options: ToastOptions) => {
    const id = `ds-toast-${++counter}`;
    setItems((list) => [...list, { ...options, id }]);
    return id;
  }, []);
  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <section
        className="ds-toaster"
        aria-label={label}
        aria-live="polite"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
        }}
      >
        {items.map((item) => (
          <ToastView key={item.id} item={item} paused={paused} onDismiss={() => dismiss(item.id)} />
        ))}
      </section>
    </ToastContext.Provider>
  );
}

function ToastView({ item, paused, onDismiss }: { item: ToastItem; paused: boolean; onDismiss: () => void }) {
  const { message, action, duration = 5000, tone = 'neutral' } = item;
  const remaining = useRef(duration);

  useEffect(() => {
    if (paused || !Number.isFinite(remaining.current)) return;
    const started = Date.now();
    const timer = setTimeout(onDismiss, remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - started;
    };
  }, [paused, onDismiss]);

  return (
    <div className={cx('ds-toast', `ds-toast--${tone}`)}>
      <div className="ds-toast__message">{message}</div>
      {action && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            action.onClick();
            onDismiss();
          }}
        >
          {action.label}
        </Button>
      )}
      <IconButton
        aria-label="Dismiss"
        size="sm"
        onClick={onDismiss}
        icon={
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        }
      />
    </div>
  );
}
