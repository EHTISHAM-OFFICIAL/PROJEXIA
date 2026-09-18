import { ATTACHMENT_RULES, PROJECT_IMAGE_RULES } from '../constants/requestOptions';
import { formatFileSize } from './formatting';

interface FileRules {
  maxSizeBytes: number;
  allowedMimeTypes: readonly string[];
  allowedExtensions: readonly string[];
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Client-side check only — it exists for fast feedback, not security.
 * Storage rules enforce the same limits server-side.
 */
export function validateFile(file: File, rules: FileRules): FileValidationResult {
  if (file.size === 0) {
    return { valid: false, error: `${file.name} is empty.` };
  }

  if (file.size > rules.maxSizeBytes) {
    return {
      valid: false,
      error: `${file.name} is ${formatFileSize(file.size)}. The limit is ${formatFileSize(rules.maxSizeBytes)}.`,
    };
  }

  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  const mimeOk = rules.allowedMimeTypes.includes(file.type);
  const extensionOk = rules.allowedExtensions.includes(extension);

  if (!mimeOk || !extensionOk) {
    return {
      valid: false,
      error: `${file.name} is not an accepted file type. Allowed: ${rules.allowedExtensions.join(', ')}.`,
    };
  }

  return { valid: true };
}

export const validateAttachment = (file: File) => validateFile(file, ATTACHMENT_RULES);
export const validateProjectImage = (file: File) => validateFile(file, PROJECT_IMAGE_RULES);

/** Strips path characters so a user-supplied filename cannot escape its storage folder. */
export function sanitizeFileName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .slice(-120);
}

/** Produces a collision-proof storage filename. */
export function uniqueFileName(originalName: string): string {
  const safe = sanitizeFileName(originalName);
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
}

export const acceptAttribute = (extensions: readonly string[]) => extensions.join(',');
