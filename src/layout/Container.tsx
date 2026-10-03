import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cx } from '../utils';
import './Layout.css';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Max content width. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/** Centres content with a max width and responsive side gutters. */
export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { as: Tag = 'div', size = 'lg', className, ...rest },
  ref,
) {
  return <Tag ref={ref} className={cx('ds-container', `ds-container--${size}`, className)} {...rest} />;
});

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ orientation = 'horizontal', className, ...rest }: DividerProps) {
  return (
    <hr
      aria-orientation={orientation}
      className={cx('ds-divider', `ds-divider--${orientation}`, className)}
      {...rest}
    />
  );
}
