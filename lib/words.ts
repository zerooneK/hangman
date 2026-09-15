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

  const fresh = choices.filter((choice) => choice.word !== previousWord);
  const pool = fresh.length > 0 ? fresh : choices;

  if (pool.length > 0) {
    return pool[Math.floor(random() * pool.length)];
  }

  const anyWord = lists.flatMap((list) =>
    list.words.map((word) => ({ category: list.category, word })),
  );

  return anyWord[Math.floor(random() * anyWord.length)];
}