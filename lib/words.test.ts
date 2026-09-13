import { describe, expect, it } from "vitest";
import { pickWord, type WordList } from "./words";

const LISTS: WordList[] = [
  { category: "Animals", words: ["CAT", "DOG"] },
  { category: "Fruits", words: ["FIG", "KIWI"] },
];

describe("picking a Word", () => {
  it("returns a Word from the chosen Category", () => {
    const choice = pickWord(LISTS, () => 0);

    expect(choice).toEqual({ category: "Animals", word: "CAT" });
  });

  it("uses injected randomness to choose the Category and Word", () => {
    const values = [0.75, 0];
    const random = () => values.shift() ?? 0;

    const choice = pickWord(LISTS, random);

    expect(choice).toEqual({ category: "Fruits", word: "FIG" });
  });

  it("does not return the previous Word", () => {
    const choice = pickWord(LISTS, () => 0, "CAT");

    expect(choice.word).toBe("DOG");
  });
});
