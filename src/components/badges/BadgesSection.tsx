"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { BADGES } from "@/data/badges";
import { useGame } from "@/hooks/useGameContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function BadgesSection() {
  const { badges } = useGame();
  const reducedMotion = useReducedMotion();

  return (
    <section id="badges" className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="section-title mb-8 text-center">Мои достижения</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {BADGES.map((badge, i) => {
            const unlocked = badges.includes(badge.id);

            return (
              <motion.div
                key={badge.id}
                initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "neon-card relative flex flex-col items-center gap-3 p-4 text-center transition-all sm:p-5",
                  unlocked
                    ? "border-neon-orange/50 shadow-[0_0_25px_rgba(249,115,22,0.3)]"
                    : "opacity-40 grayscale"
                )}
              >
                {!unlocked && (
                  <div className="absolute right-2 top-2">
                    <Lock className="h-4 w-4 text-white/40" />
                  </div>
                )}

                <motion.span
                  className="text-4xl"
                  animate={
                    unlocked && !reducedMotion
                      ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }
                      : {}
                  }
                  transition={
                    unlocked && !reducedMotion
                      ? { duration: 2, repeat: Infinity, repeatDelay: 3 }
                      : {}
                  }
                >
                  {badge.icon}
                </motion.span>

                <div>
                  <p className={cn("text-sm font-bold", unlocked ? "text-neon-orange" : "text-white/50")}>
                    {badge.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{badge.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
