import { GameShell } from "@/components/game-shell";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-zinc-50 p-4 font-sans sm:gap-8 sm:p-6 dark:bg-black">
      <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
        แฮงแมน
      </h1>
      <GameShell />
    </main>
  );
}
