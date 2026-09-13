"use client";

import { useEffect, useState } from "react";
import {
  MAX_WRONG_GUESSES,
  guess,
  livesLeft,
  maskedWord,
  startGame,
  type Game,
} from "@/lib/game";

const WORD = "HANGMAN";

export default function Home() {
  const [game, setGame] = useState<Game>(() => startGame(WORD));

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
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 p-6 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
        Hangman
      </h1>

      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        ชีวิตที่เหลือ: {livesLeft(game)} / {MAX_WRONG_GUESSES}
      </p>

      <p className="flex gap-3 font-mono text-5xl tracking-widest text-black dark:text-zinc-50">
        {slots.map((slot, index) => (
          <span key={index}>{slot}</span>
        ))}
      </p>

      {isOver && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-semibold text-black dark:text-zinc-50">
            {game.status === "won" ? "เก่งมาก! คุณชนะ" : "เสียใจด้วย คุณแพ้"}
          </p>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            คำตอบคือ: <span className="font-semibold">{game.word}</span>
          </p>
          <button
            type="button"
            onClick={() => setGame(startGame(WORD))}
            className="rounded-full bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-300"
          >
            เล่นอีกครั้ง
          </button>
        </div>
      )}
    </main>
  );
}
