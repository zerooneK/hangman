import { describe, expect, it } from "vitest";
import { DIFFICULTIES } from "./difficulty";
import {
  applyGuess,
  beginGame,
  initialFlow,
  openPicker,
  replay,
  type Deps,
  type GameFlow,
} from "./game-flow";
import { livesLeft, maskedWord } from "./game";
import type { WordList } from "./words";

const easy = DIFFICULTIES.find((difficulty) => difficulty.id === "easy")!;
const normal = DIFFICULTIES.find((difficulty) => difficulty.id === "normal")!;

const LISTS: WordList[] = [{ category: "Animals", words: ["CAT", "DOG"] }];
const deps = (random = () => 0): Deps => ({ lists: LISTS, random });

function playing(flow: GameFlow): Extract<GameFlow, { phase: "playing" }> {
  if (flow.phase !== "playing") {
    throw new Error("expected a playing flow");
  }

  return flow;
}

function finished(difficulty = normal): GameFlow {
  let game = beginGame(openPicker(initialFlow), difficulty, deps());

  for (const letter of ["z", "y", "x", "w", "v", "u", "s", "r"]) {
    game = applyGuess(game, letter);
  }

  return game;
}

describe("a fresh flow", () => {
  it("starts on the start screen", () => {
    expect(initialFlow).toEqual({ phase: "start" });
  });
});

describe("opening the Difficulty picker", () => {
  it("goes to select from start without a previous Word", () => {
    expect(openPicker(initialFlow)).toEqual({ phase: "select" });
  });

  it("remembers the Word just played when leaving a Game", () => {
    const game = beginGame(openPicker(initialFlow), normal, deps());

    expect(openPicker(game)).toEqual({ phase: "select", previousWord: "CAT" });
  });

  it("keeps an already chosen previous Word", () => {
    const select = { phase: "select" as const, previousWord: "DOG" };

    expect(openPicker(select)).toEqual(select);
  });
});

describe("beginning a Game", () => {
  it("starts with the Difficulty's Lives", () => {
    const flow = playing(beginGame(openPicker(initialFlow), easy, deps()));

    expect(flow.difficulty.id).toBe("easy");
    expect(livesLeft(flow.game)).toBe(8);
  });

  it("avoids the previous Word", () => {
    const select = { phase: "select" as const, previousWord: "CAT" };

    expect(playing(beginGame(select, normal, deps())).game.word).toBe("DOG");
  });

  it("is a no-op outside the picker", () => {
    expect(beginGame(initialFlow, normal, deps())).toEqual(initialFlow);
  });
});

describe("guessing outside a Game", () => {
  it("is ignored on the start screen", () => {
    expect(applyGuess(initialFlow, "A")).toEqual(initialFlow);
  });

  it("is ignored on the Difficulty picker", () => {
    const select = openPicker(initialFlow);

    expect(applyGuess(select, "A")).toEqual(select);
  });

  it("reveals letters while playing", () => {
    const flow = playing(beginGame(openPicker(initialFlow), normal, deps()));

    expect(maskedWord(playing(applyGuess(flow, "A")).game)).toBe("_A_");
  });
});

describe("replaying", () => {
  it("keeps the same Difficulty", () => {
    const flow = finished(easy);

    expect(playing(replay(flow, deps())).difficulty.id).toBe("easy");
  });

  it("avoids the Word just played", () => {
    const flow = finished(normal);

    expect(playing(replay(flow, deps())).game.word).toBe("DOG");
  });

  it("is a no-op while the Game is still playing", () => {
    const flow = beginGame(openPicker(initialFlow), normal, deps());

    expect(replay(flow, deps())).toEqual(flow);
  });

  it("is a no-op outside a Game", () => {
    expect(replay(initialFlow, deps())).toEqual(initialFlow);
  });
});
