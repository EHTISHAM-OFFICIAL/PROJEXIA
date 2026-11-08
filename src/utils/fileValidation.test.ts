import { describe, expect, it } from 'vitest';
import {
  sanitizeFileName,
  uniqueFileName,
  validateAttachment,
  validateFile,
} from './fileValidation';

const file = (name: string, type: string, size: number) =>
  new File([new Uint8Array(size)], name, { type });

describe('validateFile', () => {
  const rules = {
    maxSizeBytes: 1000,
    allowedMimeTypes: ['image/png'],
    allowedExtensions: ['.png'],
  };

  it('accepts a file within the rules', () => {
    expect(validateFile(file('a.png', 'image/png', 500), rules).valid).toBe(true);
  });

  it('rejects empty, oversized and wrong-type files', () => {
    expect(validateFile(file('a.png', 'image/png', 0), rules).valid).toBe(false);
    expect(validateFile(file('a.png', 'image/png', 2000), rules).error).toMatch(/limit/);
    expect(validateFile(file('a.exe', 'application/x-msdownload', 10), rules).error).toMatch(
      /not an accepted file type/,
    );
    // Right extension but wrong MIME type must also fail.
    expect(validateFile(file('a.png', 'text/html', 10), rules).valid).toBe(false);
  });

  it('applies the real attachment rules', () => {
    // Attachments are uploaded to the image host, so only images are allowed.
    expect(validateAttachment(file('sketch.png', 'image/png', 1024)).valid).toBe(true);
    expect(validateAttachment(file('drawing.pdf', 'application/pdf', 1024)).valid).toBe(false);
    expect(validateAttachment(file('script.js', 'text/javascript', 1024)).valid).toBe(false);
  });
});

describe('file names', () => {
  it('removes path characters', () => {
    expect(sanitizeFileName('../../etc/passwd')).not.toContain('/');
    expect(sanitizeFileName('my file (1).png')).toBe('my_file_1_.png');
  });

  it('creates different names for the same input', () => {
    expect(uniqueFileName('a.png')).not.toBe(uniqueFileName('a.png'));
    expect(uniqueFileName('a.png').endsWith('a.png')).toBe(true);
  });
});
