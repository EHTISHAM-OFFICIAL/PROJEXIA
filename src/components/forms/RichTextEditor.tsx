import { useRef, type KeyboardEvent } from 'react';
import { Bold, Heading2, Italic, List, Underline } from 'lucide-react';
import { TextArea } from './Inputs';

type Format = 'bold' | 'italic' | 'underline' | 'heading' | 'bullet';

const FORMATS: Record<Format, { before: string; after: string }> = {
  bold: { before: '**', after: '**' },
  italic: { before: '*', after: '*' },
  underline: { before: '++', after: '++' },
  heading: { before: '## ', after: '' },
  bullet: { before: '- ', after: '' },
};

export function RichTextEditor({
  id,
  value,
  onChange,
  rows = 5,
  placeholder,
  inlineOnly = false,
  showToolbar = true,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  inlineOnly?: boolean;
  showToolbar?: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (format: Format) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const selected = value.slice(selectionStart, selectionEnd);
    const { before, after } = FORMATS[format];
    const isLineFormat = format === 'heading' || format === 'bullet';
    const lineStart = value.lastIndexOf('\n', Math.max(0, selectionStart - 1)) + 1;
    const lineEndIndex = value.indexOf('\n', selectionEnd);
    const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;
    const targetStart = isLineFormat ? lineStart : selectionStart;
    const targetEnd = isLineFormat ? lineEnd : selectionEnd;
    const target = value.slice(targetStart, targetEnd);
    const replacement = isLineFormat
      ? target.split('\n').map((line) => line ? before + line : line).join('\n')
      : before + target + after;
    const nextValue = value.slice(0, targetStart) + replacement + value.slice(targetEnd);
    onChange(nextValue);

    const cursorStart = isLineFormat
      ? targetStart + (selected ? 0 : before.length)
      : targetStart + before.length;
    const cursorEnd = isLineFormat
      ? targetStart + replacement.length
      : targetStart + before.length + selected.length;
    window.requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
    const key = event.key.toLowerCase();
    const format: Format | null =
      key === 'b' ? 'bold' :
      key === 'i' ? 'italic' :
      key === 'u' ? 'underline' : null;
    if (!format) return;
    event.preventDefault();
    applyFormat(format);
  };

  const tools: { format: Format; label: string; shortcut?: string; icon: typeof Bold }[] = [
    { format: 'bold', label: 'Bold', shortcut: 'Ctrl+B', icon: Bold },
    { format: 'italic', label: 'Italic', shortcut: 'Ctrl+I', icon: Italic },
    { format: 'underline', label: 'Underline', shortcut: 'Ctrl+U', icon: Underline },
    { format: 'heading', label: 'Heading', icon: Heading2 },
    { format: 'bullet', label: 'Bullet list', icon: List },
  ];

  const visibleTools = inlineOnly
    ? tools.filter(({ format }) => format === 'bold' || format === 'italic' || format === 'underline')
    : tools;

  return (
    <div className="overflow-hidden rounded-lg border border-line focus-within:border-accent/70 focus-within:ring-2 focus-within:ring-accent/15">
      {showToolbar && <div className="flex flex-wrap items-center gap-1 border-b border-line bg-surface px-2 py-1.5">
        {visibleTools.map(({ format, label, shortcut, icon: Icon }) => (
          <button
            key={format}
            type="button"
            title={shortcut ? `${label} (${shortcut})` : label}
            aria-label={label}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => applyFormat(format)}
            className="inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-md px-2 text-sm text-content-secondary transition-colors hover:bg-surface-raised hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Icon size={15} aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
        <span className="ml-auto hidden text-xs text-content-muted md:inline">Select text, then format</span>
      </div>}
      <TextArea
        ref={textareaRef}
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        className="block w-full resize-y rounded-none border-0 shadow-none focus:border-0 focus:ring-0"
        aria-describedby={`${id}-format-help`}
      />
      <p id={`${id}-format-help`} className="border-t border-line bg-surface/50 px-3 py-2 text-xs leading-relaxed text-content-muted">
        {inlineOnly ? 'Supports **bold**, *italic* and ++underline++ formatting.' : 'Supports **bold**, *italic*, ++underline++, ## headings and - bullet lists.'} Shortcuts: Ctrl/⌘ + B, I or U.
      </p>
    </div>
  );
}
