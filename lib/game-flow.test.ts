import { describe, expect, it } from "vitest";
import { DIFFICULTIES } from "./difficulty";
import {
  applyGuess,
  beginGame,
  initialFlow,
  openPicker,
  replay,
  type Deps,
} from "./game-flow";
import { livesLeft, maskedWord } from "./game";
import type { WordList } from "./words";

const easy = DIFFICULTIES.find((difficulty) => difficulty.id === "easy")!;
const normal = DIFFICULTIES.find((difficulty) => difficulty.id === "normal")!;

const LISTS: WordList[] = [{ category: "Animals", words: ["CAT", "DOG"] }];
const deps = (random = () => 0): Deps => ({ lists: LISTS, random });

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
    const playing = beginGame(openPicker(initialFlow), normal, deps());

    expect(openPicker(playing)).toEqual({ phase: "select", previousWord: "CAT" });
  });
});

describe("beginning a Game", () => {
  it("starts with the Difficulty's Lives", () => {
    const flow = beginGame(openPicker(initialFlow), easy, deps());

    expect(flow.phase).toBe("playing");
    if (flow.phase !== "playing") return;
    expect(flow.difficulty.id).toBe("easy");
    expect(livesLeft(flow.game)).toBe(8);
  });

  it("avoids the previous Word", () => {
    const select = { phase: "select" as const, previousWord: "CAT" };

    const flow = beginGame(select, normal, deps());

    expect(flow.phase).toBe("playing");
    if (flow.phase !== "playing") return;
    expect(flow.game.word).toBe("DOG");
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
    const flow = beginGame(openPicker(initialFlow), normal, deps());

    const next = applyGuess(flow, "A");

    expect(next.phase).toBe("playing");
    if (next.phase !== "playing") return;
    expect(maskedWord(next.game)).toBe("_A_");
  });
});

describe("replaying", () => {
  it("keeps the same Difficulty", () => {
    const flow = beginGame(openPicker(initialFlow), easy, deps());

    const next = replay(flow, deps());

    expect(next.phase).toBe("playing");
    if (next.phase !== "playing") return;
    expect(next.difficulty.id).toBe("easy");
  });

  it("avoids the Word just played", () => {
    const flow = beginGame(openPicker(initialFlow), normal, deps());

    const next = replay(flow, deps());

    if (next.phase !== "playing") throw new Error("expected a playing flow");
    expect(next.game.word).toBe("DOG");
  });

  it("is a no-op outside a Game", () => {
    expect(replay(initialFlow, deps())).toEqual(initialFlow);
  });
});