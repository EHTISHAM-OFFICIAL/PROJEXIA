import { useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { Image } from '../ui/Image';
import { validateProjectImage } from '../../utils/fileValidation';
import { PROJECT_IMAGE_RULES } from '../../constants/requestOptions';
import { formatFileSize } from '../../utils/formatting';
import { ImageProcessingDialog } from './ImageProcessingDialog';

interface ImageUploadFieldProps {
  value: string | null;
  onUpload: (file: File) => Promise<void>;
  onClear: () => void;
  label: string;
  disabled?: boolean;
}

/** Uploads one image immediately and reports back the download URL via onUpload. */
export function ImageUploadField({
  value,
  onUpload,
  onClear,
  label,
  disabled = false,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const inputId = `image-${label.replace(/\W+/g, '-').toLowerCase()}`;

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const result = validateProjectImage(file);
    if (!result.valid) {
      setError(result.error ?? 'That file cannot be uploaded.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setError(null);
    setPendingFile(file);
  };

  const uploadPreparedFile = async (file: File) => {
    const validation = validateProjectImage(file);
    if (!validation.valid) throw new Error(validation.error ?? 'The prepared image cannot be uploaded.');
    setBusy(true);
    setError(null);
    try {
      await onUpload(file);
      setPendingFile(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Upload failed.');
      throw caught;
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {value ? (
        <div className="relative w-full max-w-xs overflow-hidden rounded-lg border border-line">
          <Image src={value} alt={`${label} preview`} className="aspect-[16/10] w-full object-cover" />
          <button
            type="button"
            onClick={onClear}
            disabled={disabled || busy}
            aria-label={`Remove ${label}`}
            className="absolute right-2 top-2 rounded-md bg-bg/80 p-1.5 text-content-secondary backdrop-blur transition-colors hover:text-state-danger"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-line bg-surface-raised px-4 py-6 text-center">
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={PROJECT_IMAGE_RULES.allowedExtensions.join(',')}
            disabled={disabled || busy}
            onChange={(event) => void handleFile(event.target.files?.[0])}
            className="sr-only"
          />
          <label
            htmlFor={inputId}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm text-content transition-colors hover:border-line-strong"
          >
            {busy ? (
              <Loader2 size={15} className="animate-spin" aria-hidden="true" />
            ) : (
              <ImagePlus size={15} aria-hidden="true" />
            )}
            {busy ? 'Uploading…' : `Upload ${label.toLowerCase()}`}
          </label>
          <p className="mt-2.5 text-xs text-content-muted">
            JPG, PNG, WebP or GIF up to {formatFileSize(PROJECT_IMAGE_RULES.maxSizeBytes)}
          </p>
        </div>
      )}
      {pendingFile && <ImageProcessingDialog file={pendingFile} title={`Prepare ${label.toLowerCase()}`} onCancel={() => { setPendingFile(null); if (inputRef.current) inputRef.current.value = ''; }} onUse={uploadPreparedFile} />}
      {error && (
        <p className="text-xs text-state-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
