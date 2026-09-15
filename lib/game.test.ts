import { describe, expect, it } from "vitest";
import { figurePartsShown, guess, livesLeft, maskedWord, startGame } from "./game";

const start = (word: string, lives = 6) => startGame(word, "Category", lives);

describe("a new Game", () => {
  it("hides every letter of the Word", () => {
    const game = start("CAT");

    expect(maskedWord(game)).toBe("___");
  });

  it("normalises the Word so any letter case can be guessed", () => {
    const game = guess(start("cat"), "C");

    expect(maskedWord(game)).toBe("C__");
  });
});

describe("guessing a letter", () => {
  it("reveals every occurrence of a correct Guess", () => {
    const game = guess(start("BANANA"), "a");

    expect(maskedWord(game)).toBe("_A_A_A");
  });

  it("ignores a letter that was already guessed", () => {
    const once = guess(start("BANANA"), "a");

    const twice = guess(once, "a");

    expect(twice.wrongGuesses).toBe(0);
    expect(twice.guessed).toEqual(["A"]);
  });
});

describe("a Wrong Guess", () => {
  it("costs one Life", () => {
    const game = guess(start("CAT"), "z");

    expect(livesLeft(game)).toBe(5);
  });
});

describe("a Game's end", () => {
  it("is won when every letter is revealed", () => {
    let game = start("CAT");
    for (const letter of ["c", "a", "t"]) {
      game = guess(game, letter);
    }

    expect(game.status).toBe("won");
    expect(maskedWord(game)).toBe("CAT");
  });

  it("is lost when every Life is spent", () => {
    let game = start("CAT");
    for (const letter of ["x", "y", "z", "p", "q", "r"]) {
      game = guess(game, letter);
    }

    expect(game.status).toBe("lost");
    expect(livesLeft(game)).toBe(0);
  });

  it("ignores a Guess once it has ended", () => {
    let game = start("CAT");
    for (const letter of ["c", "a", "t"]) {
      game = guess(game, letter);
    }

    const after = guess(game, "z");

    expect(after).toEqual(game);
  });
});

describe("a Game's own Lives", () => {
  it("starts with as many Lives as it was given", () => {
    expect(livesLeft(start("CAT", 8))).toBe(8);
    expect(livesLeft(start("CAT", 4))).toBe(4);
  });

  it("is lost only when its own Lives run out", () => {
    let game = start("CAT", 4);
    for (const letter of ["x", "y", "z"]) {
      game = guess(game, letter);
    }

    expect(game.status).toBe("playing");
    expect(livesLeft(game)).toBe(1);

    game = guess(game, "w");

    expect(game.status).toBe("lost");
    expect(livesLeft(game)).toBe(0);
  });

  it("hits the loss boundary exactly at 6 and 8 Lives too", () => {
    let six = start("CAT", 6);
    for (const letter of ["x", "y", "z", "p", "q"]) {
      six = guess(six, letter);
    }

    expect(six.status).toBe("playing");
    six = guess(six, "r");
    expect(six.status).toBe("lost");

    let eight = start("CAT", 8);
    for (const letter of ["x", "y", "z", "p", "q", "r", "w"]) {
      eight = guess(eight, letter);
    }

    expect(eight.status).toBe("playing");
    eight = guess(eight, "v");
    expect(eight.status).toBe("lost");
  });
});

describe("the stick figure parts", () => {
  const withWrongGuesses = (lives: number, count: number) => {
    const wrongLetters = ["x", "y", "z", "p", "q", "r", "w", "v", "u", "s"];
    let game = start("CAT", lives);

    for (let i = 0; i < count; i++) {
      game = guess(game, wrongLetters[i]);
    }

    return game;
  };

  it("shows no parts before the first Wrong Guess", () => {
    expect(figurePartsShown(withWrongGuesses(8, 0), 6)).toBe(0);
  });

  it("completes exactly at the last Life for every Difficulty", () => {
    expect(figurePartsShown(withWrongGuesses(8, 8), 6)).toBe(6);
    expect(figurePartsShown(withWrongGuesses(6, 6), 6)).toBe(6);
    expect(figurePartsShown(withWrongGuesses(4, 4), 6)).toBe(6);
  });

  it("is never complete before the last Life", () => {
    expect(figurePartsShown(withWrongGuesses(8, 7), 6)).toBe(5);
    expect(figurePartsShown(withWrongGuesses(6, 5), 6)).toBe(5);
    expect(figurePartsShown(withWrongGuesses(4, 3), 6)).toBe(5);
  });

  it("grows in proportion to the Wrong Guesses", () => {
    expect(figurePartsShown(withWrongGuesses(4, 1), 6)).toBe(2);
    expect(figurePartsShown(withWrongGuesses(6, 3), 6)).toBe(3);
    expect(figurePartsShown(withWrongGuesses(8, 6), 6)).toBe(5);
  });

  it("never draws more parts than the figure has", () => {
    expect(figurePartsShown(withWrongGuesses(8, 10), 6)).toBe(6);
  });
});
