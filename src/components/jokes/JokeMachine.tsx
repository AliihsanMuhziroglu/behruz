"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laugh } from "lucide-react";
import { getRandomJoke } from "@/data/jokes";
import { useGame } from "@/hooks/useGameContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function JokeMachine() {
  const [joke, setJoke] = useState<string | null>(null);
  const [key, setKey] = useState(0);
  const { playSound } = useGame();
  const reducedMotion = useReducedMotion();

  const tellJoke = () => {
    setJoke((prev) => getRandomJoke(prev ?? undefined));
    setKey((k) => k + 1);
    playSound("click");
  };

  return (
    <section id="jokes" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="section-title mb-8 text-center">
          Машина шуток Бехруза 😂
        </h2>

        <div className="neon-card flex flex-col items-center gap-6 p-8">
          <motion.div
            animate={reducedMotion ? {} : { rotate: [0, -5, 5, 0] }}
            transition={reducedMotion ? {} : { duration: 2, repeat: Infinity }}
          >
            <Laugh className="h-16 w-16 text-neon-orange" />
          </motion.div>

          <AnimatePresence mode="wait">
            {joke && (
              <motion.div
                key={key}
                initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? {} : { opacity: 0, y: -20 }}
                className="w-full rounded-2xl border border-neon-orange/30 bg-neon-orange/10 p-6 text-center"
              >
                <p className="whitespace-pre-line text-lg font-medium leading-relaxed text-white sm:text-xl">
                  {joke}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!joke && (
            <p className="text-slate-400">Нажми кнопку и получи смешную шутку!</p>
          )}

          <button onClick={tellJoke} className="neon-btn-primary text-lg">
            Рассказать новую шутку
          </button>
        </div>
      </div>
    </section>
  );
}
