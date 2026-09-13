# Hangman

A single-player Hangman word game served on the web. A player guesses an English word one letter at a time and sees the word's Category as the only hint.

## Language

**Word**: The secret English term the player is trying to reveal.
_Avoid_: Answer, puzzle, solution

**Category**: A labelled group that a Word belongs to (e.g. Animals, Fruits); shown to the player as the only hint.
_Avoid_: Topic, theme, subject

**Word List**: The collection of Words available to the game, grouped by Category.
_Avoid_: Dictionary, word bank, word set

**Guess**: A single letter the player submits to try to reveal the Word.
_Avoid_: Try, pick, letter choice

**Wrong Guess**: A Guess whose letter does not appear in the Word; each one costs the player one Life.
_Avoid_: Miss, error, mistake

**Life**: One of six allowances a Game starts with; the player loses when every Life is spent.
_Avoid_: Try, attempt, heart, chance

**Game**: A single play-through, from the first Guess to a Win or a Loss.
_Avoid_: Round, session, match

**Reveal**: The end of a Game where every letter of the Word is shown.
_Avoid_: Solution, answer

**Win**: A Game that ends because the player revealed every letter of the Word.

**Loss**: A Game that ends because the player spent every Life before revealing the Word.
