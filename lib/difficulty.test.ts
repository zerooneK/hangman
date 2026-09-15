import { describe, expect, it } from "vitest";
import { DIFFICULTIES, wordFits } from "./difficulty";

const easy = DIFFICULTIES.find((difficulty) => difficulty.id === "easy")!;
const normal = DIFFICULTIES.find((difficulty) => difficulty.id === "normal")!;
const hard = DIFFICULTIES.find((difficulty) => difficulty.id === "hard")!;

describe("the three Difficulties", () => {
  it("are Easy, Normal and Hard with Thai labels", () => {
    expect(DIFFICULTIES.map((difficulty) => difficulty.label)).toEqual([
      "ง่าย",
      "ปกติ",
      "ยาก",
    ]);
  });

  it("start Games with 8, 6 and 4 Lives respectively", () => {
    expect(easy.lives).toBe(8);
    expect(normal.lives).toBe(6);
    expect(hard.lives).toBe(4);
  });
});

describe("fitting a Word to a Difficulty by length", () => {
  it("lets Easy take Words of at most 5 letters", () => {
    expect(wordFits(easy, "CAT")).toBe(true);
    expect(wordFits(easy, "PANDA")).toBe(true);
    expect(wordFits(easy, "MONKEY")).toBe(false);
  });

  it("lets Normal take any Word", () => {
    expect(wordFits(normal, "CAT")).toBe(true);
    expect(wordFits(normal, "ELEPHANT")).toBe(true);
  });

  it("lets Hard take only Words of at least 7 letters", () => {
    expect(wordFits(hard, "MONKEY")).toBe(false);
    expect(wordFits(hard, "FALCON")).toBe(false);
    expect(wordFits(hard, "ELEPHANT")).toBe(true);
    expect(wordFits(hard, "THAILAND")).toBe(true);
  });
});