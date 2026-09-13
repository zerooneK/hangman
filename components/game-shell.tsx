"use client";

import dynamic from "next/dynamic";

const HangmanGame = dynamic(
  () => import("@/components/hangman-game").then((module) => module.HangmanGame),
  { ssr: false },
);

export function GameShell() {
  return <HangmanGame />;
}
