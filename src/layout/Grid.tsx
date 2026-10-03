import { forwardRef, type CSSProperties, type ElementType, type HTMLAttributes } from 'react';
import { cx, space, type Space } from '../utils';
import './Layout.css';

export interface GridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Fixed number of equal columns. Collapses to one column on small screens. */
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  /** Responsive auto-fill: as many columns as fit at this minimum width (e.g. `"16rem"`). Overrides `columns`. */
  minItemWidth?: string;
  gap?: Space;
  rowGap?: Space;
}

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  { as: Tag = 'div', columns = 2, minItemWidth, gap = 4, rowGap, className, style, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={cx('ds-grid', !minItemWidth && 'ds-grid--fixed', className)}
      style={{
        '--ds-grid-cols': minItemWidth
          ? `repeat(auto-fill, minmax(min(${minItemWidth}, 100%), 1fr))`
          : `repeat(${columns}, minmax(0, 1fr))`,
        columnGap: space(gap),
        rowGap: space(rowGap ?? gap),
        ...style,
      } as CSSProperties}
      {...rest}
    />
  );
});

export interface GridItemProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Number of columns to span (in a fixed-column grid). */
  span?: number;
}

export function GridItem({ as: Tag = 'div', span, style, ...rest }: GridItemProps) {
  return <Tag style={{ gridColumn: span ? `span ${span}` : undefined, ...style }} {...rest} />;
}
