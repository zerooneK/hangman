import type { Difficulty } from "./difficulty";
import { guess, startGame, type Game } from "./game";
import { pickWord, type Random, type WordList } from "./words";

export type GameFlow =
  | { readonly phase: "start" }
  | { readonly phase: "select"; readonly previousWord?: string }
  | { readonly phase: "playing"; readonly difficulty: Difficulty; readonly game: Game };

export const initialFlow: GameFlow = { phase: "start" };

export interface Deps {
  readonly lists: readonly WordList[];
  readonly random: Random;
}

export function openPicker(flow: GameFlow): GameFlow {
  if (flow.phase === "playing") {
    return { phase: "select", previousWord: flow.game.word };
  }

  return { phase: "select" };
}

export function beginGame(flow: GameFlow, difficulty: Difficulty, deps: Deps): GameFlow {
  const previousWord = flow.phase === "select" ? flow.previousWord : undefined;
  const choice = pickWord(deps.lists, deps.random, difficulty, previousWord);

  return {
    phase: "playing",
    difficulty,
    game: startGame(choice.word, choice.category, difficulty.lives),
  };
}

export function replay(flow: GameFlow, deps: Deps): GameFlow {
  if (flow.phase !== "playing") {
    return flow;
  }

  const choice = pickWord(deps.lists, deps.random, flow.difficulty, flow.game.word);

  return {
    phase: "playing",
    difficulty: flow.difficulty,
    game: startGame(choice.word, choice.category, flow.difficulty.lives),
  };
}

export function applyGuess(flow: GameFlow, letter: string): GameFlow {
  if (flow.phase !== "playing") {
    return flow;
  }

  return { ...flow, game: guess(flow.game, letter) };
}