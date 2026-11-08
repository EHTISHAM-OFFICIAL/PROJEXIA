import { beforeEach, describe, expect, it } from 'vitest';
import { findHelpAnswer, resetHelpContext, suggestWhileTyping } from './helpBot';

describe('help bot', () => {
  beforeEach(() => resetHelpContext());

  it('answers a question about electronics with some text', () => {
    const answer = findHelpAnswer('What is an Arduino?');
    expect(answer.answer.length).toBeGreaterThan(20);
  });

  it('does not throw on empty or nonsense input', () => {
    expect(() => findHelpAnswer('')).not.toThrow();
    expect(() => findHelpAnswer('asdkjh qweoiu zzzz')).not.toThrow();
    expect(findHelpAnswer('asdkjh qweoiu zzzz').answer.length).toBeGreaterThan(0);
  });

  it('suggests questions while typing and nothing for very short input', () => {
    expect(Array.isArray(suggestWhileTyping('ardu'))).toBe(true);
    expect(suggestWhileTyping('')).toEqual([]);
  });
});
