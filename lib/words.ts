import { wordFits, type Difficulty } from "./difficulty";

export interface WordList {
  readonly category: string;
  readonly words: readonly string[];
}

export interface WordChoice {
  readonly category: string;
  readonly word: string;
}

export type Random = () => number;

export function pickWord(
  lists: readonly WordList[],
  random: Random,
  difficulty: Difficulty,
  previousWord?: string,
): WordChoice {
  const choices = lists.flatMap((list) =>
    list.words
      .filter((word) => wordFits(difficulty, word))
      .map((word) => ({ category: list.category, word })),
  );

  const withoutPrevious = choices.filter((choice) => choice.word !== previousWord);
  const pool = withoutPrevious.length > 0 ? withoutPrevious : choices;

  if (pool.length === 0) {
    throw new Error("No Word in any Category fits this Difficulty");
  }

  return pool[Math.floor(random() * pool.length)];
}