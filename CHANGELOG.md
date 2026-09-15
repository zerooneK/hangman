# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versioning follows [Semantic Versioning](https://semver.org/).

## [0.10.5] - 2026-09-13

### Added

- Word picking is now Difficulty-aware: it collects Words from every Category, keeps those matching the Difficulty's length rule, and picks uniformly; the chosen Word's own Category is the hint.

_(Part of ticket #10.)_

## [0.10.4] - 2026-09-13

### Fixed

- Loss-boundary tests now cover 6 and 8 Lives, and figure scaling tests prove the figure is never complete before the last Life at every Difficulty.
- `figurePartsShown` now takes the Game instead of separate numbers.

_(Part of ticket #9.)_

## [0.10.3] - 2026-09-13

### Added

- Difficulty domain data (Easy/Normal/Hard with Lives 8/6/4 and Word-length rules) with unit tests.
- Games now carry their own Lives and are Lost when those run out; remaining Lives derive from the Game.
- A stick-figure scaling helper that draws the figure complete exactly at the last Life.

_(Part of ticket #9.)_

## [0.10.2] - 2026-09-13

### Added

- ADR 0003 recording the Difficulty-levels decision (Word length + Lives).
- `CONTEXT.md` glossary: new **Difficulty** term; **Life** definition now depends on Difficulty.

## [0.10.1] - 2026-09-13

### Changed

- Replaced the default Next.js README with a full project README in Thai: how to play, features, commands, adding words, project structure, and deployment.

## [0.10.0] - 2026-09-13

### Added

- Expanded every Word List to 20 English words. There are now 5 Categories and 100 Words in total.

## [0.9.0] - 2026-09-13

### Added

- Expanded every Word List to 15 English words.
- New "อาชีพ" (Occupations) Category with 15 words. There are now 5 Categories and 75 Words in total.

## [0.8.1] - 2026-09-13

### Fixed

- Screen readers can now read the letter slots: the description is real hidden text, because an `aria-label` on a plain paragraph is ignored.
- The Win/Loss result now lives in a persistent live region so it is announced when it appears.

## [0.8.0] - 2026-09-13

### Added

- Thai interface throughout: page title, hint, lives, result, and play-again button, with `<html lang="th">`.
- Accessibility polish: the stick figure and letter slots expose screen-reader text, the Win/Loss result is announced as a live status, guessed letter buttons are labelled as already guessed, and all interactive elements show a visible focus ring.

## [0.7.1] - 2026-09-13

### Fixed

- Removed the `overflow-x-hidden` safety net on the page; the layout already wraps, so a real overflow would now be visible instead of silently clipped.

## [0.7.0] - 2026-09-13

### Added

- On-screen A–Z letter buttons so the game can be played on a phone or tablet; a letter already guessed is disabled and visually spent.
- Responsive layout: letter slots wrap, and the figure, keyboard, and padding shrink on narrow screens.

## [0.6.1] - 2026-09-13

### Fixed

- Word selection now guarantees a different Word even when the chosen Category has no alternative, falling back to another Category.
- The Category is carried as part of the Game instead of a separate "Round", matching the project glossary.

## [0.6.0] - 2026-09-13

### Added

- Word Lists as one JSON file per Category (animals, fruits, countries, colors), English words only.
- Pure, tested Word selection (`lib/words`) using injected randomness, which never serves the same Word twice in a row.
- The Category is shown to the player as a hint.
- The Game now loads client-side only, keeping the Word random without a server/client mismatch.

## [0.5.1] - 2026-09-13

### Fixed

- The stick figure now derives its part count from the drawing itself, removing a duplicate "6" that could drift from the number of Lives.

## [0.5.0] - 2026-09-13

### Added

- A stick figure drawn one part per Wrong Guess (head, body, two arms, two legs), becoming complete at six, and resetting when a new Game starts.

## [0.4.1] - 2026-09-13

### Fixed

- Normalise the Word to uppercase so a lowercase Word can be guessed and won.
- Rename the end-of-Game label from "คำตอบคือ" to "คำคือ" to match the glossary.

## [0.4.0] - 2026-09-13

### Added

- Core Game rules as a pure, tested module (`lib/game`): a correct Guess reveals every occurrence, a Wrong Guess costs one Life, a repeated Guess is ignored, and the Game ends in a Win or a Loss after six Wrong Guesses.
- A playable home page: one slot per letter, keyboard input, remaining Lives, Win/Loss message, Word reveal, and a "play again" button — all client-side with no server storage.

## [0.3.1] - 2026-09-13

### Fixed

- Synced the `package-lock.json` root version with the project version.

## [0.3.0] - 2026-09-13

### Added

- Next.js (App Router) + TypeScript + Tailwind CSS app skeleton that builds and runs, with a first page showing "Hangman".
- Vitest setup with a smoke test that checks the `VERSION` file.
- `typecheck`, `test`, and `test:watch` npm scripts.

## [0.2.0] - 2026-09-13

### Added

- `CONTEXT.md` glossary for the game's domain language.
- ADR-0001: deploy on Vercel.
- ADR-0002: no player data stored in v1.

## [0.1.0] - 2026-09-13

### Added

- Initial project scaffolding: engineering agent skills, repo configuration, and the communication, versioning, and changelog rules.
