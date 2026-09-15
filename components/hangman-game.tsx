"use client";

import { useEffect, useState } from "react";
import { HangmanFigure } from "@/components/hangman-figure";
import { LetterKeyboard } from "@/components/letter-keyboard";
import { DIFFICULTIES, wordLengthLabel, type Difficulty } from "@/lib/difficulty";
import { guess, livesLeft, maskedWord, startGame, type Game } from "@/lib/game";
import { WORD_LISTS } from "@/lib/word-lists";
import { pickWord } from "@/lib/words";

type Screen = "start" | "select" | "playing";

const BUTTON =
  "rounded-full bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:focus-visible:outline-white";

function newGame(difficulty: Difficulty, previousWord?: string): Game {
  const choice = pickWord(WORD_LISTS, Math.random, difficulty, previousWord);

  return startGame(choice.word, choice.category, difficulty.lives);
}

function applyGuess(game: Game | null, letter: string): Game | null {
  return game ? guess(game, letter) : game;
}

export function HangmanGame() {
  const [screen, setScreen] = useState<Screen>("start");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (/^[a-z]$/i.test(event.key)) {
        setGame((current) => applyGuess(current, event.key));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function start(chosen: Difficulty) {
    setDifficulty(chosen);
    setGame(newGame(chosen));
    setScreen("playing");
  }

  if (screen === "start") {
    return (
      <div className="flex flex-col items-center gap-6">
        <p className="max-w-md text-center text-lg text-zinc-600 dark:text-zinc-400">
          ทายคำภาษาอังกฤษทีละตัวอักษร มีคำใบ้เป็นหมวดหมู่
        </p>
        <button type="button" onClick={() => setScreen("select")} className={BUTTON}>
          เริ่มเกม
        </button>
      </div>
    );
  }

  if (screen === "select") {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
          เลือกระดับความยาก
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          {DIFFICULTIES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => start(option)}
              className="w-40 rounded-2xl border border-zinc-300 px-6 py-4 text-center transition-colors hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-zinc-700 dark:hover:bg-zinc-800 dark:focus-visible:outline-white"
            >
              <span className="block text-lg font-semibold text-black dark:text-zinc-50">
                {option.label}
              </span>
              <span className="block text-sm text-zinc-600 dark:text-zinc-400">
                {wordLengthLabel(option)} · {option.lives} ชีวิต
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!game || !difficulty) {
    return null;
  }

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
        ระดับ: <span className="font-semibold">{difficulty.label}</span> · คำใบ้:{" "}
        <span className="font-semibold">{game.category}</span>
      </p>

      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        ชีวิตที่เหลือ: {livesLeft(game)} / {game.lives}
      </p>

      <HangmanFigure game={game} />

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
        onGuess={(letter) => setGame((current) => applyGuess(current, letter))}
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
            onClick={() => setGame(newGame(difficulty, game.word))}
            className={BUTTON}
          >
            เล่นอีกครั้ง
          </button>
        </div>
      )}
    </>
  );
}
