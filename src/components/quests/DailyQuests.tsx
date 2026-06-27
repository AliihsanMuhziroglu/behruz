"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { DAILY_QUESTS } from "@/data/quests";
import { STORAGE_KEYS } from "@/data/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useGame } from "@/hooks/useGameContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function DailyQuests() {
  const [completed, setCompleted] = useLocalStorage<string[]>(STORAGE_KEYS.QUESTS, []);
  const { addXp, unlockBadge, playSound, triggerConfetti } = useGame();
  const reducedMotion = useReducedMotion();

  const toggleQuest = (questId: string, xpReward: number, badgeId?: string) => {
    const isCompleted = completed.includes(questId);

    if (isCompleted) {
      setCompleted((prev) => prev.filter((id) => id !== questId));
      addXp(-xpReward);
      playSound("click");
      return;
    }

    setCompleted((prev) => [...prev, questId]);
    addXp(xpReward);
    playSound("success");
    triggerConfetti();
    unlockBadge("first-quest");
    if (badgeId) unlockBadge(badgeId);
  };

  return (
    <section id="quests" className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="section-title mb-8 text-center">Задания на сегодня</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DAILY_QUESTS.map((quest, i) => {
            const isDone = completed.includes(quest.id);

            return (
              <motion.button
                key={quest.id}
                initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => toggleQuest(quest.id, quest.xpReward, quest.badgeId)}
                className={cn(
                  "neon-card group relative p-6 text-left transition-all duration-300",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-green/50",
                  isDone
                    ? "border-neon-green/50 bg-neon-green/10 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                    : "hover:border-neon-purple/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                )}
                aria-pressed={isDone}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 transition-all",
                      isDone
                        ? "border-neon-green bg-neon-green text-white"
                        : "border-white/30 group-hover:border-neon-purple"
                    )}
                  >
                    {isDone && <Check className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className={cn("text-lg font-bold", isDone ? "text-neon-green" : "text-white")}>
                      {quest.text}
                    </p>
                    <p className="mt-1 text-sm text-neon-orange">+{quest.xpReward} XP</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
