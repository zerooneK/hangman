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
  previousWord?: string,
): WordChoice {
  const list = lists[Math.floor(random() * lists.length)];
  const candidates = list.words.filter((word) => word !== previousWord);

  if (candidates.length > 0) {
    const word = candidates[Math.floor(random() * candidates.length)];

    return { category: list.category, word };
  }

  const alternatives = lists
    .flatMap((other) => other.words.map((word) => ({ category: other.category, word })))
    .filter((choice) => choice.word !== previousWord);

  if (alternatives.length > 0) {
    return alternatives[Math.floor(random() * alternatives.length)];
  }

  const word = list.words[Math.floor(random() * list.words.length)];

  return { category: list.category, word };
}
