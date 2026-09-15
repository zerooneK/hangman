export type DifficultyId = "easy" | "normal" | "hard";

export interface Difficulty {
  readonly id: DifficultyId;
  readonly label: string;
  readonly lives: number;
  readonly maxWordLength: number | undefined;
  readonly minWordLength: number | undefined;
}

export const DIFFICULTIES: readonly Difficulty[] = [
  { id: "easy", label: "ง่าย", lives: 8, maxWordLength: 5, minWordLength: undefined },
  { id: "normal", label: "ปกติ", lives: 6, maxWordLength: undefined, minWordLength: undefined },
  { id: "hard", label: "ยาก", lives: 4, maxWordLength: undefined, minWordLength: 7 },
];

export function wordFits(difficulty: Difficulty, word: string): boolean {
  const length = word.length;

  if (difficulty.maxWordLength !== undefined && length > difficulty.maxWordLength) {
    return false;
  }

  if (difficulty.minWordLength !== undefined && length < difficulty.minWordLength) {
    return false;
  }

  return true;
}

export function wordLengthLabel(difficulty: Difficulty): string {
  if (difficulty.maxWordLength !== undefined) {
    return `คำไม่เกิน ${difficulty.maxWordLength} ตัวอักษร`;
  }

  if (difficulty.minWordLength !== undefined) {
    return `คำ ${difficulty.minWordLength} ตัวอักษรขึ้นไป`;
  }

  return "ทุกคำ";
}