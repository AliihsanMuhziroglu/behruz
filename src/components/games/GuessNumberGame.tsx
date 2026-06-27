"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, HelpCircle } from "lucide-react";
import { useGame } from "@/hooks/useGameContext";

export function GuessNumberGame() {
  const [target, setTarget] = useState<number | null>(null);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { playSound } = useGame();

  const startGame = () => {
    setTarget(Math.floor(Math.random() * 50) + 1);
    setGuess("");
    setAttempts(0);
    setHint(null);
    setWon(false);
    setPlaying(true);
    playSound("click");
  };

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 50) return;
    if (!target) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (num === target) {
      setWon(true);
      setPlaying(false);
      setHint(null);
      playSound("celebrate");
      return;
    }

    playSound("click");
    if (num < target) {
      setHint("Больше");
    } else {
      setHint("Меньше");
    }
    setGuess("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleGuess();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {!playing && !won && (
        <button onClick={startGame} className="neon-btn-primary">
          Начать игру
        </button>
      )}

      {(playing || won) && (
        <>
          {!won && (
            <p className="text-center text-slate-300">
              Я загадал число от 1 до 50. Попробуй угадать!
            </p>
          )}

          {!won && (
            <div className="flex w-full max-w-xs flex-col gap-3">
              <input
                type="number"
                min={1}
                max={50}
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Твой ответ..."
                className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-center text-xl font-bold text-white placeholder:text-white/30 focus:border-neon-purple focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-purple/50"
                aria-label="Твой ответ"
              />
              <button
                onClick={handleGuess}
                disabled={!guess}
                className="neon-btn-primary disabled:opacity-40"
              >
                Проверить
              </button>
            </div>
          )}

          {hint && !won && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-2xl border border-neon-orange/50 bg-neon-orange/10 px-6 py-3"
            >
              <HelpCircle className="h-5 w-5 text-neon-orange" />
              <span className="text-lg font-bold text-neon-orange">{hint}</span>
            </motion.div>
          )}

          {attempts > 0 && !won && (
            <p className="text-sm text-slate-400">Попыток: {attempts}</p>
          )}

          {won && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-neon-green/50 bg-neon-green/10 p-8"
            >
              <span className="text-5xl">🎉</span>
              <p className="text-2xl font-black text-neon-green">Ты угадал!</p>
              <p className="text-slate-300">
                Число было: <span className="font-bold text-white">{target}</span>
              </p>
              <p className="text-slate-300">
                Попыток: <span className="font-bold text-white">{attempts}</span>
              </p>
              <button onClick={startGame} className="neon-btn-secondary flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Попробовать снова
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
