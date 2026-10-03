import { forwardRef, useEffect, useState, type HTMLAttributes } from 'react';
import { cx } from '../utils';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** `system` follows the OS `prefers-color-scheme` setting. */
  theme?: Theme;
}

function useSystemTheme(): 'light' | 'dark' {
  const query = '(prefers-color-scheme: dark)';
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setDark(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return dark ? 'dark' : 'light';
}

/**
 * Applies the Tide base styles and colour theme to everything inside it.
 * Wrap your app (or any subtree) in one of these.
 */
export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(function ThemeProvider(
  { theme = 'dark', className, ...rest },
  ref,
) {
  const system = useSystemTheme();
  const resolved = theme === 'system' ? system : theme;
  return <div ref={ref} data-theme={resolved} className={cx('ds-root', className)} {...rest} />;
});
