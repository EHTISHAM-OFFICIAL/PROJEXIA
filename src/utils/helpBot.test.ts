import { beforeEach, describe, expect, it } from 'vitest';
import { findHelpAnswer, resetHelpContext, suggestWhileTyping } from './helpBot';

describe('help bot', () => {
  beforeEach(() => resetHelpContext());

  it('answers a question about electronics with some text', () => {
    const answer = findHelpAnswer('What is an Arduino?');
    expect(answer.answer.length).toBeGreaterThan(20);
  });

  it('answers broad service questions with the complete service overview', () => {
    const questions = [
      'What services does the studio provide?',
      'What services does ProjexiaHub provide?',
      'What kind of projects can you make?',
      'Do you provide school, college and university projects?',
      'Do you provide school and university projects?',
      'Do you make school and university projects?',
    ];

    for (const question of questions) {
      resetHelpContext();
      const response = findHelpAnswer(question);
      expect(response.answer).toContain('School projects');
      expect(response.answer).toContain('University projects');
      expect(response.answer).toContain('Arduino-based');
      expect(response.answer).not.toContain("I’m not confident I understood");
    }
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
