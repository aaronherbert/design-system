import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx } from '../utils';
import { Field, type FieldBaseProps } from './Field';
import { Tag } from './Tag';
import './TagInput.css';

export interface TagInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size'>,
    FieldBaseProps {
  /** The selected tags. */
  value: string[];
  onValueChange: (tags: string[]) => void;
  /** Existing tags offered as autocomplete options. */
  suggestions?: string[];
  /** Cleans up typed text before it becomes a tag. Defaults to trimming whitespace. */
  normalize?: (text: string) => string;
  /** Offer to create a tag that isn't in `suggestions`. Default `true`. */
  allowCreate?: boolean;
  /** Maximum options shown at once. Default 8. */
  maxSuggestions?: number;
  /** Label for the "create" option. Default `Create "<text>"`. */
  createLabel?: (text: string) => ReactNode;
  /** Class for the outer field wrapper (the `className` prop goes on the `<input>`). */
  fieldClassName?: string;
}

type Option = { kind: 'existing' | 'create'; value: string };

const defaultNormalize = (text: string) => text.trim();
const defaultCreateLabel = (text: string) => `Create "${text}"`;

/**
 * Multi-value text input: typed or picked values become removable tags.
 * Implements the ARIA combobox pattern with a listbox of suggestions.
 * Enter or comma adds a tag; Backspace in an empty input removes the last one.
 */
export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(function TagInput(
  {
    label,
    hint,
    error,
    hideLabel,
    value,
    onValueChange,
    suggestions = [],
    normalize = defaultNormalize,
    allowCreate = true,
    maxSuggestions = 8,
    createLabel = defaultCreateLabel,
    id,
    required,
    disabled,
    className,
    fieldClassName,
    placeholder,
    onKeyDown,
    onBlur,
    onFocus,
    ...rest
  },
  forwardedRef,
) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listId = useId();

  const query = normalize(text);
  const options = useMemo<Option[]>(() => {
    const q = query.toLowerCase();
    const chosen = new Set(value.map((v) => v.toLowerCase()));
    const matches = [...new Set(suggestions)]
      .filter((s) => !chosen.has(s.toLowerCase()) && s.toLowerCase().includes(q))
      .sort((a, b) => {
        const rank = (s: string) => (s.toLowerCase().startsWith(q) ? 0 : 1);
        return rank(a) - rank(b) || a.localeCompare(b);
      })
      .slice(0, maxSuggestions)
      .map((s): Option => ({ kind: 'existing', value: s }));
    const exact = suggestions.some((s) => s.toLowerCase() === q) || chosen.has(q);
    if (allowCreate && q && !exact) matches.push({ kind: 'create', value: query });
    return matches;
  }, [query, value, suggestions, maxSuggestions, allowCreate]);

  const expanded = open && options.length > 0;
  const optionId = (i: number) => `${listId}-opt-${i}`;

  useEffect(() => {
    if (active >= options.length) setActive(options.length - 1);
  }, [options.length, active]);

  useEffect(() => {
    if (expanded && active >= 0) document.getElementById(`${listId}-opt-${active}`)?.scrollIntoView?.({ block: 'nearest' });
  }, [active, expanded, listId]);

  const commit = (raw: string) => {
    const tag = normalize(raw);
    setText('');
    setActive(-1);
    if (!tag || value.some((v) => v.toLowerCase() === tag.toLowerCase())) return;
    onValueChange([...value, tag]);
  };

  const remove = (tag: string) => {
    onValueChange(value.filter((v) => v !== tag));
    inputRef.current?.focus();
  };

  const handleChange = (next: string) => {
    if (next.includes(',')) {
      const parts = next.split(',');
      const tail = parts.pop() ?? '';
      const added: string[] = [];
      for (const p of parts) {
        const tag = normalize(p);
        const all = [...value, ...added];
        if (tag && !all.some((v) => v.toLowerCase() === tag.toLowerCase())) added.push(tag);
      }
      if (added.length) onValueChange([...value, ...added]);
      setText(tail);
    } else {
      setText(next);
    }
    setOpen(true);
    setActive(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setOpen(true);
        if (options.length) setActive((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setOpen(true);
        if (options.length) setActive((i) => (i <= 0 ? options.length - 1 : i - 1));
        break;
      case 'Enter':
        if (expanded && active >= 0) {
          e.preventDefault();
          commit(options[active].value);
        } else if (query) {
          e.preventDefault();
          commit(text);
        }
        break;
      case 'Escape':
        if (expanded) {
          // Close the list without closing a surrounding dialog.
          e.preventDefault();
          e.stopPropagation();
          setOpen(false);
          setActive(-1);
        }
        break;
      case 'Backspace':
        if (!text && value.length) {
          e.preventDefault();
          onValueChange(value.slice(0, -1));
        }
        break;
    }
  };

  return (
    <Field
      id={id}
      label={label}
      hint={hint}
      error={error}
      hideLabel={hideLabel}
      required={required}
      disabled={disabled}
      className={fieldClassName}
    >
      {(control) => (
        <div
          className={cx(
            'ds-control',
            'ds-tag-input',
            error && 'ds-control--invalid',
            disabled && 'ds-control--disabled',
          )}
          onMouseDown={(e) => {
            // Clicking the box (not a tag button) focuses the input.
            if (e.target === e.currentTarget) {
              e.preventDefault();
              inputRef.current?.focus();
            }
          }}
        >
          {value.length > 0 && (
            <ul className="ds-tag-input__tags" aria-label="Selected">
              {value.map((tag) => (
                <li key={tag}>
                  <Tag size="sm" tone="primary" onRemove={disabled ? undefined : () => remove(tag)}>
                    {tag}
                  </Tag>
                </li>
              ))}
            </ul>
          )}
          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof forwardedRef === 'function') forwardedRef(node);
              else if (forwardedRef) forwardedRef.current = node;
            }}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={expanded}
            aria-controls={listId}
            aria-activedescendant={expanded && active >= 0 ? optionId(active) : undefined}
            autoComplete="off"
            required={required && value.length === 0}
            disabled={disabled}
            placeholder={value.length ? undefined : placeholder}
            value={text}
            className={cx('ds-control__input', 'ds-tag-input__input', className)}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={(e) => {
              setOpen(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              if (query) commit(text);
              setOpen(false);
              setActive(-1);
              onBlur?.(e);
            }}
            {...control}
            {...rest}
          />
          <ul id={listId} role="listbox" aria-label="Suggestions" className="ds-tag-input__listbox" hidden={!expanded}>
            {expanded &&
              options.map((opt, i) => (
                <li
                  key={`${opt.kind}:${opt.value}`}
                  id={optionId(i)}
                  role="option"
                  aria-selected={i === active}
                  className={cx('ds-tag-input__option', opt.kind === 'create' && 'ds-tag-input__option--create')}
                  // Keep focus in the input so the blur handler doesn't fire first.
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseMove={() => setActive(i)}
                  onClick={() => {
                    commit(opt.value);
                    setOpen(true);
                  }}
                >
                  {opt.kind === 'create' ? createLabel(opt.value) : opt.value}
                </li>
              ))}
          </ul>
        </div>
      )}
    </Field>
  );
});
