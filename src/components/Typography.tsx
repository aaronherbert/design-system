import type { ElementType, HTMLAttributes } from 'react';
import { cx } from '../utils';
import './Typography.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const defaultSize: Record<HeadingLevel, HeadingSize> = { 1: '2xl', 2: 'xl', 3: 'lg', 4: 'md', 5: 'sm', 6: 'xs' };

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level (h1–h6). */
  level?: HeadingLevel;
  /** Visual size, independent from the semantic level. */
  size?: HeadingSize;
}

export function Heading({ level = 2, size, className, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cx('ds-heading', `ds-heading--${size ?? defaultSize[level]}`, className)} {...rest} />;
}

export type TextSize = 'xs' | 'sm' | 'md' | 'lg';
export type TextTone = 'default' | 'muted' | 'subtle' | 'primary' | 'danger' | 'success' | 'warning';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: TextSize;
  tone?: TextTone;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  mono?: boolean;
}

export function Text({ as: Tag = 'p', size = 'md', tone = 'default', weight, mono, className, ...rest }: TextProps) {
  return (
    <Tag
      className={cx(
        'ds-text',
        `ds-text--${size}`,
        tone !== 'default' && `ds-text--${tone}`,
        weight && `ds-text--${weight}`,
        mono && 'ds-text--mono',
        className,
      )}
      {...rest}
    />
  );
}
