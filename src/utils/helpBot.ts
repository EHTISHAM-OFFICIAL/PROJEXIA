import { HELP_KNOWLEDGE } from '../constants/helpKnowledge';

/**
 * Finds the best-matching canned answer for a question, or null if nothing
 * matches well enough. Deliberately simple keyword scoring rather than any
 * kind of model — this is what keeps the assistant free, instant, and
 * incapable of answering anything not in HELP_KNOWLEDGE.
 */
export function findHelpAnswer(question: string): string | null {
  const normalized = question.toLowerCase();

  let bestScore = 0;
  let bestAnswer: string | null = null;

  for (const entry of HELP_KNOWLEDGE) {
    const score = entry.keywords.reduce(
      (count, keyword) => (normalized.includes(keyword.toLowerCase()) ? count + 1 : count),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
    }
  }

  return bestAnswer;
}
