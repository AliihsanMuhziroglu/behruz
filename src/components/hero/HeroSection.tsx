"use client";

import { motion } from "framer-motion";
import { Rocket, Target } from "lucide-react";
import { AstronautAvatar } from "./AstronautAvatar";
import { useGame } from "@/hooks/useGameContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const { playSound } = useGame();
  const reducedMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    playSound("click");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center"
    >
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <AstronautAvatar />
      </motion.div>

      <motion.h1
        initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glow-text mb-4 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Добро пожаловать в мир приключений Бехруза! 🚀
      </motion.h1>

      <motion.p
        initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl md:text-2xl"
      >
        Здесь тебя ждут игры, задания, сюрпризы и море веселья!
      </motion.p>

      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <button
          onClick={() => scrollTo("games")}
          className="neon-btn-primary flex items-center justify-center gap-2 text-lg"
        >
          <Rocket className="h-5 w-5" />
          Начать приключение
        </button>
        <button
          onClick={() => scrollTo("quests")}
          className="neon-btn-secondary flex items-center justify-center gap-2 text-lg"
        >
          <Target className="h-5 w-5" />
          Посмотреть задание дня
        </button>
      </motion.div>
    </section>
  );
}
