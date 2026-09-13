"use client";

import { useEffect, useState } from "react";
import { HangmanFigure } from "@/components/hangman-figure";
import { LetterKeyboard } from "@/components/letter-keyboard";
import {
  MAX_WRONG_GUESSES,
  guess,
  livesLeft,
  maskedWord,
  startGame,
  type Game,
} from "@/lib/game";
import { WORD_LISTS } from "@/lib/word-lists";
import { pickWord } from "@/lib/words";

function newGame(previousWord?: string): Game {
  const choice = pickWord(WORD_LISTS, Math.random, previousWord);

  return startGame(choice.word, choice.category);
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

  return (
    <>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        คำใบ้: <span className="font-semibold">{game.category}</span>
      </p>

      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        ชีวิตที่เหลือ: {livesLeft(game)} / {MAX_WRONG_GUESSES}
      </p>

      <HangmanFigure wrongGuesses={game.wrongGuesses} />

      <p className="flex flex-wrap justify-center gap-2 font-mono text-3xl tracking-widest text-black sm:gap-3 sm:text-5xl dark:text-zinc-50">
        {slots.map((slot, index) => (
          <span key={index}>{slot}</span>
        ))}
      </p>

      <LetterKeyboard
        guessed={game.guessed}
        disabled={isOver}
        onGuess={(letter) => setGame((current) => guess(current, letter))}
      />

      {isOver && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-semibold text-black dark:text-zinc-50">
            {game.status === "won" ? "เก่งมาก! คุณชนะ" : "เสียใจด้วย คุณแพ้"}
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            คำคือ: <span className="font-semibold">{game.word}</span>
          </p>
          <button
            type="button"
            onClick={() => setGame(newGame(game.word))}
            className="rounded-full bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-300"
          >
            เล่นอีกครั้ง
          </button>
        </div>
      )}
    </>
  );
}
