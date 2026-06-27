"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, MousePointerClick, Hash } from "lucide-react";
import { QuickClickGame } from "./QuickClickGame";
import { MemoryCardsGame } from "./MemoryCardsGame";
import { GuessNumberGame } from "./GuessNumberGame";
import { cn } from "@/lib/utils";
import { useGame } from "@/hooks/useGameContext";

const GAMES = [
  { id: "quick-click", name: "Быстрый клик", icon: MousePointerClick },
  { id: "memory", name: "Игра на память", icon: Brain },
  { id: "guess", name: "Угадай число", icon: Hash },
] as const;

type GameId = (typeof GAMES)[number]["id"];

export function MiniGamesSection() {
  const [activeGame, setActiveGame] = useState<GameId>("quick-click");
  const { playSound } = useGame();

  return (
    <section id="games" className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="section-title mb-8 text-center">Мини-игры</h2>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onClick={() => {
                setActiveGame(game.id);
                playSound("click");
              }}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-5 py-3 font-bold transition-all",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-purple/50",
                activeGame === game.id
                  ? "bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  : "border border-white/20 bg-white/5 text-slate-300 hover:border-neon-purple/50"
              )}
              aria-pressed={activeGame === game.id}
            >
              <game.icon className="h-5 w-5" />
              {game.name}
            </button>
          ))}
        </div>

        <div className="neon-card p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGame}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeGame === "quick-click" && <QuickClickGame />}
              {activeGame === "memory" && <MemoryCardsGame />}
              {activeGame === "guess" && <GuessNumberGame />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
