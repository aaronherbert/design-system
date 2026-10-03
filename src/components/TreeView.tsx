import {
  Children,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx } from '../utils';
import './TreeView.css';

interface TreeContextValue {
  selectedId?: string;
  tabbableId?: string;
  isExpanded: (id: string) => boolean;
  setExpanded: (id: string, expanded: boolean) => void;
  select: (id: string) => void;
  setTabbable: (id: string) => void;
}

const TreeContext = createContext<TreeContextValue | null>(null);
const LevelContext = createContext(1);

export interface TreeViewProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  /** Required unless `aria-labelledby` is set: trees need an accessible name. */
  'aria-label'?: string;
  /** Controlled selected item id. */
  selectedId?: string;
  defaultSelectedId?: string;
  onSelect?: (id: string) => void;
  /** Controlled expanded item ids. */
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  children: ReactNode;
}

const ITEM_SELECTOR = '[role="treeitem"]';

/**
 * Hierarchical list with expandable items, following the ARIA tree pattern:
 * one tab stop, arrow keys to move, Right/Left to expand/collapse, Enter or Space to select.
 * Children of a `TreeItem` are only rendered while it is expanded, so they can be computed lazily.
 */
export const TreeView = forwardRef<HTMLUListElement, TreeViewProps>(function TreeView(
  {
    selectedId: selectedProp,
    defaultSelectedId,
    onSelect,
    expandedIds: expandedProp,
    defaultExpandedIds = [],
    onExpandedChange,
    className,
    onKeyDown,
    children,
    ...rest
  },
  forwardedRef,
) {
  const [selectedState, setSelectedState] = useState(defaultSelectedId);
  const [expandedState, setExpandedState] = useState(defaultExpandedIds);
  const [tabbableId, setTabbable] = useState<string | undefined>(selectedProp ?? defaultSelectedId);
  const selectedId = selectedProp !== undefined ? selectedProp : selectedState;
  const expandedIds = expandedProp ?? expandedState;
  const rootRef = useRef<HTMLUListElement | null>(null);

  const isExpanded = useCallback((id: string) => expandedIds.includes(id), [expandedIds]);

  const setExpanded = useCallback(
    (id: string, expanded: boolean) => {
      if (expandedIds.includes(id) === expanded) return;
      const next = expanded ? [...expandedIds, id] : expandedIds.filter((x) => x !== id);
      if (expandedProp === undefined) setExpandedState(next);
      onExpandedChange?.(next);
    },
    [expandedIds, expandedProp, onExpandedChange],
  );

  const select = useCallback(
    (id: string) => {
      if (selectedProp === undefined) setSelectedState(id);
      setTabbable(id);
      onSelect?.(id);
    },
    [selectedProp, onSelect],
  );

  // Keep exactly one item tabbable, even after the tabbable one is collapsed away.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>(ITEM_SELECTOR);
    const ids = Array.from(items, (el) => el.dataset.id);
    if (tabbableId && ids.includes(tabbableId)) return;
    const fallback = selectedId && ids.includes(selectedId) ? selectedId : ids[0];
    if (fallback !== tabbableId) setTabbable(fallback);
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const root = rootRef.current;
    const current = (e.target as HTMLElement).closest<HTMLElement>(ITEM_SELECTOR);
    if (!root || !current || !root.contains(current)) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
    const index = items.indexOf(current);
    const id = current.dataset.id!;
    const expandable = current.hasAttribute('aria-expanded');
    const expanded = current.getAttribute('aria-expanded') === 'true';
    const focus = (el: HTMLElement | undefined) => {
      if (!el) return;
      setTabbable(el.dataset.id!);
      el.focus();
    };

    switch (e.key) {
      case 'ArrowDown':
        focus(items[index + 1]);
        break;
      case 'ArrowUp':
        focus(items[index - 1]);
        break;
      case 'Home':
        focus(items[0]);
        break;
      case 'End':
        focus(items[items.length - 1]);
        break;
      case 'ArrowRight':
        if (expandable && !expanded) setExpanded(id, true);
        else if (expanded) focus(current.querySelector<HTMLElement>(ITEM_SELECTOR) ?? undefined);
        break;
      case 'ArrowLeft':
        if (expanded) setExpanded(id, false);
        else focus(current.parentElement?.closest<HTMLElement>(ITEM_SELECTOR) ?? undefined);
        break;
      case 'Enter':
      case ' ':
        select(id);
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <TreeContext.Provider value={{ selectedId, tabbableId, isExpanded, setExpanded, select, setTabbable }}>
      <LevelContext.Provider value={1}>
        <ul
          ref={(node) => {
            rootRef.current = node;
            if (typeof forwardedRef === 'function') forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
          role="tree"
          className={cx('ds-tree', className)}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          {children}
        </ul>
      </LevelContext.Provider>
    </TreeContext.Provider>
  );
});

export interface TreeItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  /** Unique within the tree. Used for selection and expansion. */
  id: string;
  label: ReactNode;
  /** Secondary content at the end of the row, e.g. a count. */
  meta?: ReactNode;
  icon?: ReactNode;
  /**
   * Show the item as expandable even when no children are passed yet.
   * Use it when children are computed only once the item is expanded.
   */
  hasChildren?: boolean;
  children?: ReactNode;
}

export const TreeItem = forwardRef<HTMLLIElement, TreeItemProps>(function TreeItem(
  { id, label, meta, icon, hasChildren, className, children, onClick, ...rest },
  ref,
) {
  const tree = useContext(TreeContext);
  const level = useContext(LevelContext);
  if (!tree) throw new Error('TreeItem must be used inside a TreeView');
  const expandable = hasChildren ?? Children.count(children) > 0;
  const expanded = expandable && tree.isExpanded(id);
  const selected = tree.selectedId === id;

  return (
    <li
      ref={ref}
      role="treeitem"
      data-id={id}
      aria-level={level}
      aria-expanded={expandable ? expanded : undefined}
      aria-selected={selected}
      tabIndex={tree.tabbableId === id ? 0 : -1}
      className={cx('ds-tree__item', selected && 'ds-tree__item--selected', className)}
      onFocus={(e) => {
        if (e.target === e.currentTarget) tree.setTabbable(id);
      }}
      onClick={(e) => {
        onClick?.(e);
        e.stopPropagation();
        if (!e.defaultPrevented) tree.select(id);
      }}
      {...rest}
    >
      <div className="ds-tree__row" style={{ '--ds-tree-level': level - 1 } as CSSProperties}>
        <span
          className={cx('ds-tree__toggle', !expandable && 'ds-tree__toggle--leaf')}
          aria-hidden="true"
          onClick={(e) => {
            if (!expandable) return;
            e.stopPropagation();
            tree.setExpanded(id, !expanded);
          }}
        >
          {expandable && (
            <svg viewBox="0 0 16 16" width="14" height="14">
              <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {icon && <span className="ds-tree__icon">{icon}</span>}
        <span className="ds-tree__label">{label}</span>
        {meta !== undefined && <span className="ds-tree__meta">{meta}</span>}
      </div>
      {expanded && Children.count(children) > 0 && (
        <LevelContext.Provider value={level + 1}>
          <ul role="group" className="ds-tree__group">
            {children}
          </ul>
        </LevelContext.Provider>
      )}
    </li>
  );
});
