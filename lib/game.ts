export type GameStatus = "playing" | "won" | "lost";

export const MAX_WRONG_GUESSES = 6;

export interface Game {
  readonly word: string;
  readonly category: string;
  readonly lives: number;
  readonly guessed: readonly string[];
  readonly wrongGuesses: number;
  readonly status: GameStatus;
}

export function startGame(word: string, category: string, lives: number): Game {
  return {
    word: word.toUpperCase(),
    category,
    lives,
    guessed: [],
    wrongGuesses: 0,
    status: "playing",
  };
}

export function maskedWord(game: Game): string {
  return game.word
    .split("")
    .map((letter) => (game.guessed.includes(letter) ? letter : "_"))
    .join("");
}

export function guess(game: Game, letter: string): Game {
  if (game.status !== "playing") {
    return game;
  }

  const normalized = letter.toUpperCase();

  if (game.guessed.includes(normalized)) {
    return game;
  }

  const isCorrect = game.word.includes(normalized);
  const guessed = [...game.guessed, normalized];
  const wrongGuesses = isCorrect ? game.wrongGuesses : game.wrongGuesses + 1;
  const revealed = game.word.split("").every((letter) => guessed.includes(letter));

  return {
    word: game.word,
    category: game.category,
    lives: game.lives,
    guessed,
    wrongGuesses,
    status: revealed ? "won" : wrongGuesses >= game.lives ? "lost" : "playing",
  };
}

export function livesLeft(game: Game): number {
  return game.lives - game.wrongGuesses;
}

export function figurePartsShown(
  wrongGuesses: number,
  lives: number,
  totalParts: number,
): number {
  if (lives <= 0 || totalParts <= 0) {
    return 0;
  }

  const proportion = Math.round((wrongGuesses * totalParts) / lives);

  return Math.min(Math.max(proportion, 0), totalParts);
}
