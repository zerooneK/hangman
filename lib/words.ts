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
  const words = candidates.length > 0 ? candidates : list.words;
  const word = words[Math.floor(random() * words.length)];

  return { category: list.category, word };
}
