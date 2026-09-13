const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function LetterKeyboard({
  guessed,
  disabled,
  onGuess,
}: {
  guessed: readonly string[];
  disabled: boolean;
  onGuess: (letter: string) => void;
}) {
  return (
    <div className="grid w-full max-w-xl grid-cols-6 gap-2 sm:grid-cols-9">
      {LETTERS.map((letter) => {
        const spent = guessed.includes(letter);

        return (
          <button
            key={letter}
            type="button"
            disabled={spent || disabled}
            onClick={() => onGuess(letter)}
            className="select-none rounded-lg border border-zinc-300 py-2 font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-30 disabled:hover:bg-transparent dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:disabled:hover:bg-transparent"
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
