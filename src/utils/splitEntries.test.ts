import { describe, expect, it } from 'vitest';
import { splitEntries } from './splitEntries';

describe('splitEntries', () => {
  it('splits sentences when a full stop is followed by a capitalized entry', () => {
    expect(splitEntries('Arduino Uno. LCD Display. Jumper Wires.')).toEqual([
      'Arduino Uno.',
      'LCD Display.',
      'Jumper Wires.',
    ]);
  });

  it('keeps line breaks and common list markers as separate entries', () => {
    expect(splitEntries('First item\n- Second item\n• Third item')).toEqual([
      'First item',
      'Second item',
      'Third item',
    ]);
  });

  it('does not split common abbreviations or decimal values', () => {
    expect(splitEntries('Use e.g. Arduino Uno. Voltage is 3.3V. Current is 2A.')).toEqual([
      'Use e.g. Arduino Uno.',
      'Voltage is 3.3V.',
      'Current is 2A.',
    ]);
  });

  it('does not split a full stop followed by a lowercase continuation', () => {
    expect(splitEntries('This is one sentence. and this continues it.')).toEqual([
      'This is one sentence. and this continues it.',
    ]);
  });

  it('trims empty entries', () => {
    expect(splitEntries('  First item.  Second item.  ')).toEqual([
      'First item.',
      'Second item.',
    ]);
  });
});
