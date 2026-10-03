import { forwardRef, type CSSProperties, type ElementType, type HTMLAttributes } from 'react';
import { cx, space, type Space } from '../utils';
import './Layout.css';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** `column` (default) stacks vertically; `row` lays out horizontally. */
  direction?: 'row' | 'column';
  gap?: Space;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: boolean;
  /** Turn a `row` stack into a column on small screens (< 640px). */
  collapseOnMobile?: boolean;
}

/** One-dimensional flex layout with token-based spacing. Use `Inline` for a wrapping row. */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  { as: Tag = 'div', direction = 'column', gap = 4, align, justify, wrap, collapseOnMobile, className, style, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={cx('ds-stack', collapseOnMobile && 'ds-stack--collapsible', className)}
      style={{
        flexDirection: direction,
        gap: space(gap),
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
      }}
      {...rest}
    />
  );
});

/** Horizontal, wrapping row — buttons, tags, toolbars. */
export const Inline = forwardRef<HTMLElement, Omit<StackProps, 'direction' | 'wrap'>>(function Inline(
  { gap = 2, align = 'center', ...rest },
  ref,
) {
  return <Stack ref={ref} direction="row" wrap gap={gap} align={align} {...rest} />;
});
