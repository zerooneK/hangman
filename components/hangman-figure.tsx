import { figurePartsShown, type Game } from "@/lib/game";

const PARTS = [
  <circle key="head" cx="140" cy="65" r="15" />,
  <line key="body" x1="140" y1="80" x2="140" y2="140" />,
  <line key="left-arm" x1="140" y1="95" x2="115" y2="120" />,
  <line key="right-arm" x1="140" y1="95" x2="165" y2="120" />,
  <line key="left-leg" x1="140" y1="140" x2="115" y2="180" />,
  <line key="right-leg" x1="140" y1="140" x2="165" y2="180" />,
];

export function HangmanFigure({ game }: { game: Game }) {
  const shownParts = figurePartsShown(game, PARTS.length);

  return (
    <svg
      viewBox="0 0 200 220"
      role="img"
      aria-label={`รูปคนทายคำ: ทายผิด ${game.wrongGuesses} จาก ${game.lives} ครั้ง`}
      className="h-48 w-40 text-black sm:h-56 sm:w-48 dark:text-zinc-50"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <line x1="20" y1="210" x2="180" y2="210" />
      <line x1="50" y1="210" x2="50" y2="20" />
      <line x1="50" y1="20" x2="140" y2="20" />
      <line x1="140" y1="20" x2="140" y2="50" />
      {PARTS.slice(0, shownParts)}
    </svg>
  );
}
