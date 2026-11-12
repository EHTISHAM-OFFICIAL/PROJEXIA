import { describe, expect, it } from 'vitest';
import { safeHttpUrl } from './safeUrl';

describe('safeHttpUrl', () => {
  it('allows normal http and https links', () => {
    expect(safeHttpUrl('https://example.com/a?b=1')).toBe('https://example.com/a?b=1');
    expect(safeHttpUrl('http://example.com')).toBe('http://example.com/');
  });

  it('blocks script and data schemes, including obfuscated ones', () => {
    expect(safeHttpUrl('javascript:alert(1)')).toBeNull();
    expect(safeHttpUrl('  JaVaScRiPt:alert(1)')).toBeNull();
    expect(safeHttpUrl('java\tscript:alert(1)')).toBeNull();
    expect(safeHttpUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
    expect(safeHttpUrl('vbscript:msgbox(1)')).toBeNull();
    expect(safeHttpUrl('file:///etc/passwd')).toBeNull();
  });

  it('blocks relative, empty and non-string values', () => {
    expect(safeHttpUrl('/admin/requests')).toBeNull();
    expect(safeHttpUrl('//evil.example')).toBeNull();
    expect(safeHttpUrl('')).toBeNull();
    expect(safeHttpUrl(undefined)).toBeNull();
    expect(safeHttpUrl({ toString: () => 'https://example.com' })).toBeNull();
  });

  it('can require https', () => {
    expect(safeHttpUrl('http://example.com', { httpsOnly: true })).toBeNull();
    expect(safeHttpUrl('https://example.com', { httpsOnly: true })).not.toBeNull();
  });

  it('rejects absurdly long values', () => {
    expect(safeHttpUrl(`https://example.com/${'a'.repeat(3000)}`)).toBeNull();
  });
});
