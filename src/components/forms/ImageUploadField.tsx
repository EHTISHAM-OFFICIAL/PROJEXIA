import { useRef, useState } from 'react';
import { ImagePlus, Loader2, Pencil, X } from 'lucide-react';
import { Image } from '../ui/Image';
import { validateProjectImage } from '../../utils/fileValidation';
import { PROJECT_IMAGE_RULES } from '../../constants/requestOptions';
import { formatFileSize } from '../../utils/formatting';
import { ImageProcessingDialog } from './ImageProcessingDialog';
import { imgbbService, type UploadedImage } from '../../services/imgbbService';

interface ImageUploadFieldProps {
  value: string | null;
  onUpload: (file: File) => Promise<void | UploadedImage>;
  onClear: () => void;
  label: string;
  disabled?: boolean;
}

/** Uploads one image immediately and lets admins reopen the image preparation editor. */
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
  const [lastUploadedFile, setLastUploadedFile] = useState<File | null>(null);
  const [uploadSummary, setUploadSummary] = useState<UploadedImage | null>(null);
  const [retryingBackup, setRetryingBackup] = useState(false);
  const inputId = `image-${label.replace(/\\W+/g, '-').toLowerCase()}`;

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const result = validateProjectImage(file);
    if (!result.valid) {
      setError(result.error ?? 'That file cannot be uploaded.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setError(null);
    setUploadSummary(null);
    setPendingFile(file);
  };

  const editImage = async () => {
    setError(null);
    if (lastUploadedFile) {
      setPendingFile(lastUploadedFile);
      return;
    }
    if (value) {
      try {
        const response = await fetch(value);
        if (!response.ok) throw new Error('Could not retrieve the uploaded image.');
        const blob = await response.blob();
        const extension = blob.type === 'image/jpeg' ? '.jpg' : blob.type === 'image/webp' ? '.webp' : '.png';
        const file = new File([blob], `${label.toLowerCase().replace(/\\W+/g, '-')}${extension}`, { type: blob.type || 'image/png' });
        const validation = validateProjectImage(file);
        if (!validation.valid) throw new Error(validation.error ?? 'This image cannot be edited.');
        setPendingFile(file);
      } catch {
        setError('To edit this previously saved image, choose its original file again.');
        inputRef.current?.click();
      }
    } else {
      inputRef.current?.click();
    }
  };

  const uploadPreparedFile = async (file: File) => {
    const validation = validateProjectImage(file);
    if (!validation.valid) throw new Error(validation.error ?? 'The prepared image cannot be uploaded.');
    setBusy(true);
    setError(null);
    try {
      const result = await onUpload(file);
      setLastUploadedFile(file);
      setUploadSummary(result && (result.partialSuccess || result.fallbackSaved === false) ? result : null);
      setPendingFile(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Upload failed.');
      throw caught;
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const retryBackup = async () => {
    if (!lastUploadedFile || !uploadSummary?.missingProvider) return;
    setRetryingBackup(true);
    setError(null);
    try {
      const result = await imgbbService.retryMissingProvider(
        lastUploadedFile,
        uploadSummary.missingProvider,
        uploadSummary.url,
        uploadSummary.primaryProvider,
        { id: uploadSummary.primaryId, idEncoded: uploadSummary.primaryIdEncoded },
      );
      setUploadSummary(result.fallbackSaved === false ? result : null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not retry the backup host.');
    } finally {
      setRetryingBackup(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={PROJECT_IMAGE_RULES.allowedExtensions.join(',')}
        disabled={disabled || busy}
        onChange={(event) => void handleFile(event.target.files?.[0])}
        className="sr-only"
      />
      {value ? (
        <div className="w-full max-w-sm overflow-hidden rounded-xl border border-line bg-surface">
          <div className="relative">
            <Image src={value} alt={`${label} preview`} className="aspect-[16/10] w-full object-cover" />
            <span className="absolute left-2 top-2 rounded-md bg-bg/85 px-2 py-1 text-xs font-medium text-content shadow-sm">Uploaded</span>
          </div>
          <div className="flex items-center gap-2 border-t border-line p-2">
            <button
              type="button"
              onClick={() => void editImage()}
              disabled={disabled || busy}
              className="inline-flex min-h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-surface-raised px-3 text-sm font-medium text-content transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
            >
              {busy ? <Loader2 size={15} className="animate-spin" /> : <Pencil size={15} />}
              Edit image
            </button>
            <button
              type="button"
              onClick={onClear}
              disabled={disabled || busy}
              className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg border border-line px-3 text-sm text-content-muted transition-colors hover:border-state-danger hover:text-state-danger disabled:opacity-50"
            >
              <X size={15} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-line bg-surface-raised px-4 py-6 text-center">
          <label
            htmlFor={inputId}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm text-content transition-colors hover:border-line-strong"
          >
            {busy ? <Loader2 size={15} className="animate-spin" aria-hidden="true" /> : <ImagePlus size={15} aria-hidden="true" />}
            {busy ? 'Uploading…' : `Upload ${label.toLowerCase()}`}
          </label>
          <p className="mt-2.5 text-xs text-content-muted">
            JPG, PNG, WebP or GIF up to {formatFileSize(PROJECT_IMAGE_RULES.maxSizeBytes)}
          </p>
        </div>
      )}
      {pendingFile && <ImageProcessingDialog file={pendingFile} title={value ? `Edit ${label.toLowerCase()}` : `Prepare ${label.toLowerCase()}`} onCancel={() => { setPendingFile(null); if (inputRef.current) inputRef.current.value = ''; }} onUse={uploadPreparedFile} />}
      {uploadSummary && (
        <div className="rounded-lg border border-line bg-surface-raised p-3 text-xs leading-relaxed text-content-secondary" role="status">
          {uploadSummary.missingProvider ? (
            <>
              <p>
                Uploaded to {uploadSummary.primaryProvider === 'imgbb' ? 'ImgBB' : 'Freeimage.host'}, but {uploadSummary.missingProvider === 'imgbb' ? 'ImgBB' : 'Freeimage.host'} did not finish. The image is saved; its backup is not ready yet.
              </p>
              <button type="button" onClick={() => void retryBackup()} disabled={retryingBackup || busy} className="mt-2 inline-flex min-h-8 items-center justify-center gap-2 rounded-lg border border-line px-3 py-1.5 font-medium text-content transition-colors hover:border-accent hover:text-accent disabled:opacity-50">
                {retryingBackup ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
                {retryingBackup ? 'Retrying backup…' : 'Retry missing backup'}
              </button>
            </>
          ) : (
            <p>Both hosts received the image, but fallback metadata could not be saved. Check the image-hosting Firestore rule and try uploading again.</p>
          )}
        </div>
      )}
      {error && <p className="text-xs text-state-danger" role="alert">{error}</p>}
    </div>
  );
}
