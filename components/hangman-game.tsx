"use client";

import { useEffect, useState } from "react";
import { HangmanFigure } from "@/components/hangman-figure";
import { LetterKeyboard } from "@/components/letter-keyboard";
import { MAX_WRONG_GUESSES, guess, livesLeft, maskedWord, startGame, type Game } from "@/lib/game";
import { DIFFICULTIES } from "@/lib/difficulty";
import { WORD_LISTS } from "@/lib/word-lists";
import { pickWord } from "@/lib/words";

function newGame(previousWord?: string): Game {
  const normal = DIFFICULTIES.find((difficulty) => difficulty.id === "normal")!;
  const choice = pickWord(WORD_LISTS, Math.random, normal, previousWord);

  return startGame(choice.word, choice.category, MAX_WRONG_GUESSES);
}

export function HangmanGame() {
  const [game, setGame] = useState<Game>(() => newGame());

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (/^[a-z]$/i.test(event.key)) {
        setGame((current) => guess(current, event.key));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const slots = maskedWord(game).split("");
  const isOver = game.status !== "playing";
  const spokenWord = slots.map((slot) => (slot === "_" ? "ว่าง" : slot)).join(" ");
  const resultMessage =
    game.status === "won"
      ? "เก่งมาก! คุณชนะ"
      : game.status === "lost"
        ? "เสียใจด้วย คุณแพ้"
        : "";

  return (
    <>
      <p className="sr-only" role="status" aria-live="polite">
        {resultMessage}
      </p>

      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        คำใบ้: <span className="font-semibold">{game.category}</span>
      </p>

      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        ชีวิตที่เหลือ: {livesLeft(game)} / {MAX_WRONG_GUESSES}
      </p>

      <HangmanFigure wrongGuesses={game.wrongGuesses} />

      <p className="flex flex-wrap justify-center gap-2 font-mono text-3xl tracking-widest text-black sm:gap-3 sm:text-5xl dark:text-zinc-50">
        <span className="sr-only">คำที่ต้องทาย: {spokenWord}</span>
        {slots.map((slot, index) => (
          <span key={index} aria-hidden="true">
            {slot}
          </span>
        ))}
      </p>

      <LetterKeyboard
        guessed={game.guessed}
        disabled={isOver}
        onGuess={(letter) => setGame((current) => guess(current, letter))}
      />

      {isOver && (
        <div className="flex flex-col items-center gap-4">
          <p
            aria-hidden="true"
            className="text-2xl font-semibold text-black dark:text-zinc-50"
          >
            {resultMessage}
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            คำคือ: <span className="font-semibold">{game.word}</span>
          </p>
          <button
            type="button"
            onClick={() => setGame(newGame(game.word))}
            className="rounded-full bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:focus-visible:outline-white"
          >
            เล่นอีกครั้ง
          </button>
        </div>
      )}
    </>
  );
}
