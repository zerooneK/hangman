import { describe, expect, it } from "vitest";
import { DIFFICULTIES } from "./difficulty";
import { pickWord, type WordList } from "./words";

const easy = DIFFICULTIES.find((difficulty) => difficulty.id === "easy")!;
const normal = DIFFICULTIES.find((difficulty) => difficulty.id === "normal")!;
const hard = DIFFICULTIES.find((difficulty) => difficulty.id === "hard")!;

const LISTS: WordList[] = [
  { category: "Animals", words: ["CAT", "MONKEY", "ELEPHANT"] },
  { category: "Fruits", words: ["FIG", "BANANA"] },
];

describe("picking a Word for a Difficulty", () => {
  it("lets Easy pick only Words of at most 5 letters, across Categories", () => {
    const choice = pickWord(LISTS, () => 0, easy);

    expect(choice).toEqual({ category: "Animals", word: "CAT" });
  });

  it("lets Hard pick only Words of at least 7 letters", () => {
    const choice = pickWord(LISTS, () => 0, hard);

    expect(choice).toEqual({ category: "Animals", word: "ELEPHANT" });
  });

  it("lets Normal pick any Word", () => {
    const choice = pickWord(LISTS, () => 0.999, normal);

    expect(choice).toEqual({ category: "Fruits", word: "BANANA" });
  });

  it("uses injected randomness across the whole Difficulty pool", () => {
    const choice = pickWord(LISTS, () => 0.999, easy);

    expect(choice).toEqual({ category: "Fruits", word: "FIG" });
  });

  it("returns the chosen Word's own Category as the hint", () => {
    const choice = pickWord(LISTS, () => 0.999, easy);

    expect(choice.category).toBe("Fruits");
  });

  it("does not return the previous Word within the Difficulty's pool", () => {
    const choice = pickWord(LISTS, () => 0, easy, "CAT");

    expect(choice.word).toBe("FIG");
  });

  it("falls back to the previous Word when it is the only match", () => {
    const singleWordLists: WordList[] = [{ category: "Animals", words: ["CAT"] }];

    const choice = pickWord(singleWordLists, () => 0, easy, "CAT");

    expect(choice).toEqual({ category: "Animals", word: "CAT" });
  });

  it("falls back to any Word when the Difficulty has no matches at all", () => {
    const longWordsOnly: WordList[] = [{ category: "Animals", words: ["ELEPHANT"] }];

    const choice = pickWord(longWordsOnly, () => 0, easy);

    expect(choice).toEqual({ category: "Animals", word: "ELEPHANT" });
  });
});