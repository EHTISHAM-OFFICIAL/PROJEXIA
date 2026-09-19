import { useRef, useState } from 'react';
import { Paperclip, X } from 'lucide-react';
import { ATTACHMENT_RULES } from '../../constants/requestOptions';
import { validateAttachment } from '../../utils/fileValidation';
import { formatFileSize } from '../../utils/formatting';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
}

export function FileUpload({ files, onChange, disabled = false }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const nextErrors: string[] = [];
    const accepted: File[] = [];

    Array.from(incoming).forEach((file) => {
      if (files.length + accepted.length >= ATTACHMENT_RULES.maxFiles) {
        nextErrors.push(`You can attach up to ${ATTACHMENT_RULES.maxFiles} files.`);
        return;
      }
      if (files.some((existing) => existing.name === file.name && existing.size === file.size)) {
        return; // silently skip exact duplicates
      }
      const result = validateAttachment(file);
      if (result.valid) accepted.push(file);
      else if (result.error) nextErrors.push(result.error);
    });

    if (accepted.length) onChange([...files, ...accepted]);
    setErrors(Array.from(new Set(nextErrors)));
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, position) => position !== index));
    setErrors([]);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          if (!disabled) addFiles(event.dataTransfer.files);
        }}
        className="rounded-lg border border-dashed border-line bg-surface-raised px-4 py-6 text-center"
      >
        <input
          ref={inputRef}
          id="attachments"
          type="file"
          multiple
          disabled={disabled}
          accept={ATTACHMENT_RULES.allowedExtensions.join(',')}
          onChange={(event) => addFiles(event.target.files)}
          className="sr-only"
        />
        <label
          htmlFor="attachments"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm text-content transition-colors hover:border-line-strong"
        >
          <Paperclip size={15} aria-hidden="true" />
          Choose files
        </label>
        <p className="mt-3 text-xs leading-relaxed text-content-muted">
          Drag files here, or browse. Up to {ATTACHMENT_RULES.maxFiles} files,{' '}
          {formatFileSize(ATTACHMENT_RULES.maxSizeBytes)} each. Photos, screenshots or sketches — JPG, PNG, WebP, GIF or BMP.
        </p>
      </div>

      {errors.length > 0 && (
        <ul className="flex flex-col gap-1" role="alert">
          {errors.map((error) => (
            <li key={error} className="text-xs text-state-danger">
              {error}
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface-raised px-3 py-2.5"
            >
              <span className="min-w-0 flex-1 truncate text-sm text-content">{file.name}</span>
              <span className="shrink-0 font-mono text-xs text-content-muted">
                {formatFileSize(file.size)}
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded p-1 text-content-muted transition-colors hover:text-state-danger"
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
