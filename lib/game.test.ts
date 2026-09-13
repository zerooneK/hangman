import { describe, expect, it } from "vitest";
import { guess, livesLeft, maskedWord, startGame } from "./game";

describe("a new Game", () => {
  it("hides every letter of the Word", () => {
    const game = startGame("CAT");

    expect(maskedWord(game)).toBe("___");
  });

  it("normalises the Word so any letter case can be guessed", () => {
    const game = guess(startGame("cat"), "C");

    expect(maskedWord(game)).toBe("C__");
  });
});

describe("guessing a letter", () => {
  it("reveals every occurrence of a correct Guess", () => {
    const game = guess(startGame("BANANA"), "a");

    expect(maskedWord(game)).toBe("_A_A_A");
  });

  it("ignores a letter that was already guessed", () => {
    const once = guess(startGame("BANANA"), "a");

    const twice = guess(once, "a");

    expect(twice.wrongGuesses).toBe(0);
    expect(twice.guessed).toEqual(["A"]);
  });
});

describe("a Wrong Guess", () => {
  it("costs one Life", () => {
    const game = guess(startGame("CAT"), "z");

    expect(livesLeft(game)).toBe(5);
  });
});

describe("a Game's end", () => {
  it("is won when every letter is revealed", () => {
    let game = startGame("CAT");
    for (const letter of ["c", "a", "t"]) {
      game = guess(game, letter);
    }

    expect(game.status).toBe("won");
    expect(maskedWord(game)).toBe("CAT");
  });

  it("is lost when every Life is spent", () => {
    let game = startGame("CAT");
    for (const letter of ["x", "y", "z", "p", "q", "r"]) {
      game = guess(game, letter);
    }

    expect(game.status).toBe("lost");
    expect(livesLeft(game)).toBe(0);
  });

  it("ignores a Guess once it has ended", () => {
    let game = startGame("CAT");
    for (const letter of ["c", "a", "t"]) {
      game = guess(game, letter);
    }

    const after = guess(game, "z");

    expect(after).toEqual(game);
  });
});
