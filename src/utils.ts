export function cx(...classes: unknown[]): string {
  return classes.filter((c): c is string => typeof c === 'string' && c !== '').join(' ');
}

/** Spacing scale keys — map to --ds-space-* tokens. */
export type Space = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

export const space = (s: Space | undefined) => (s === undefined ? undefined : `var(--ds-space-${s})`);

export type ControlSize = 'sm' | 'md' | 'lg';
