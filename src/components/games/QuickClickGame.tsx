"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trophy, Zap } from "lucide-react";
import { STORAGE_KEYS } from "@/data/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useGame } from "@/hooks/useGameContext";

interface Target {
  id: number;
  x: number;
  y: number;
}

export function QuickClickGame() {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [target, setTarget] = useState<Target | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useLocalStorage<number>(STORAGE_KEYS.QUICK_CLICK_HIGH, 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetIdRef = useRef(0);
  const { playSound, unlockBadge } = useGame();

  const spawnTarget = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const size = 56;
    const padding = 20;
    const x = padding + Math.random() * (rect.width - size - padding * 2);
    const y = padding + Math.random() * (rect.height - size - padding * 2);

    targetIdRef.current += 1;
    setTarget({ id: targetIdRef.current, x, y });
  }, []);

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
    playSound("click");
    setTimeout(spawnTarget, 100);
  };

  useEffect(() => {
    if (!playing || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setPlaying(false);
          setGameOver(true);
          setTarget(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [playing, gameOver]);

  useEffect(() => {
    if (!gameOver) return;
    if (score > highScore) setHighScore(score);
    if (score >= 15) unlockBadge("fast-fingers");
    playSound("celebrate");
  }, [gameOver, score, highScore, setHighScore, unlockBadge, playSound]);

  const handleHit = () => {
    setScore((s) => s + 1);
    playSound("success");
    spawnTarget();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-4 text-sm font-semibold">
          <span className="text-neon-orange">
            Счёт: <span className="text-white">{score}</span>
          </span>
          <span className="text-neon-blue">
            Лучший результат: <span className="text-white">{highScore}</span>
          </span>
          {playing && (
            <span className="text-neon-purple">
              Осталось времени: <span className="text-white">{timeLeft}с</span>
            </span>
          )}
        </div>
      </div>

      {!playing && !gameOver && (
        <button onClick={startGame} className="neon-btn-primary mx-auto">
          <Zap className="mr-2 inline h-5 w-5" />
          Начать игру
        </button>
      )}

      {(playing || gameOver) && (
        <div
          ref={containerRef}
          className="relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-space-dark/50 sm:h-80"
        >
          <AnimatePresence>
            {playing && target && (
              <motion.button
                key={target.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={handleHit}
                className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-neon-orange to-neon-pink text-2xl shadow-[0_0_20px_rgba(249,115,22,0.6)] focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-orange/50"
                style={{ left: target.x, top: target.y }}
                aria-label="Цель"
              >
                🎯
              </motion.button>
            )}
          </AnimatePresence>

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-space-dark/80">
              <Trophy className="h-12 w-12 text-neon-orange" />
              <p className="text-2xl font-black text-white">Счёт: {score}</p>
              {score > highScore && score > 0 && (
                <p className="text-neon-green font-semibold">Новый рекорд! 🎉</p>
              )}
              <button onClick={startGame} className="neon-btn-secondary flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Попробовать снова
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
