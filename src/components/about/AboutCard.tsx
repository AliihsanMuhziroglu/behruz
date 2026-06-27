"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Star, Zap } from "lucide-react";
import { useGame } from "@/hooks/useGameContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AboutCard() {
  const { xp, maxXp } = useGame();
  const reducedMotion = useReducedMotion();
  const xpPercent = Math.min((xp / maxXp) * 100, 100);

  const stats = [
    { label: "Имя", value: "Бехруз", icon: Star },
    { label: "Возраст", value: "11 лет", icon: Sparkles },
    { label: "Уровень", value: "11", icon: Zap },
    { label: "Звание", value: "Супергерой Галактики", icon: Shield },
    {
      label: "Суперсила",
      value: "Любознательность и желание узнавать новое",
      icon: Sparkles,
    },
  ];

  return (
    <section id="about" className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="section-title mb-8 text-center">
          Главный герой этого мира
        </h2>

        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="neon-card overflow-hidden p-6 sm:p-8 md:p-10"
        >
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 rounded-2xl bg-white/5 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon-purple/20">
                  <stat.icon className="h-5 w-5 text-neon-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-neon-orange">XP</span>
              <span className="text-sm font-bold text-white">
                {xp} / {maxXp} XP
              </span>
            </div>
            <div className="h-6 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green"
                initial={{ width: 0 }}
                whileInView={{ width: `${xpPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
