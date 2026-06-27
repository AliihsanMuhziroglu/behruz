"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trophy } from "lucide-react";
import { MEMORY_EMOJIS, STORAGE_KEYS } from "@/data/constants";
import { useGame } from "@/hooks/useGameContext";
import { shuffleArray, formatTime, cn } from "@/lib/utils";

interface Card {
  id: number;
  emoji: string;
  pairId: number;
  flipped: boolean;
  matched: boolean;
}

function createCards(): Card[] {
  const pairs = MEMORY_EMOJIS.flatMap((emoji, pairId) => [
    { id: pairId * 2, emoji, pairId, flipped: false, matched: false },
    { id: pairId * 2 + 1, emoji, pairId, flipped: false, matched: false },
  ]);
  return shuffleArray(pairs);
}

export function MemoryCardsGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [won, setWon] = useState(false);
  const { playSound, unlockBadge, triggerConfetti } = useGame();

  const startGame = useCallback(() => {
    setCards(createCards());
    setFlippedIndices([]);
    setMoves(0);
    setSeconds(0);
    setPlaying(true);
    setWon(false);
    playSound("click");
  }, [playSound]);

  useEffect(() => {
    if (!playing || won) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [playing, won]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      setWon(true);
      setPlaying(false);
      playSound("celebrate");
      triggerConfetti();
      unlockBadge("memory-master");
      try {
        localStorage.setItem(STORAGE_KEYS.MEMORY_COMPLETED, "true");
      } catch {
        // ignore
      }
    }
  }, [cards, playSound, triggerConfetti, unlockBadge]);

  const handleFlip = (index: number) => {
    if (!playing || won) return;
    if (flippedIndices.length >= 2) return;
    if (cards[index].flipped || cards[index].matched) return;
    if (flippedIndices.includes(index)) return;

    playSound("click");

    const newFlipped = [...flippedIndices, index];
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, flipped: true } : c))
    );
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (cards[first].pairId === cards[second].pairId) {
        playSound("success");
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === first || i === second ? { ...c, matched: true, flipped: true } : c
            )
          );
          setFlippedIndices([]);
        }, 400);
      } else {
        playSound("error");
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === first || i === second ? { ...c, flipped: false } : c
            )
          );
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {playing && (
        <div className="flex gap-4 text-sm font-semibold">
          <span className="text-neon-orange">
            Количество ходов: <span className="text-white">{moves}</span>
          </span>
          <span className="text-neon-blue">
            Время: <span className="text-white">{formatTime(seconds)}</span>
          </span>
        </div>
      )}

      {!playing && !won && (
        <button onClick={startGame} className="neon-btn-primary mx-auto">
          Начать игру
        </button>
      )}

      {(playing || won) && (
        <>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {cards.map((card, index) => (
              <motion.button
                key={card.id}
                onClick={() => handleFlip(index)}
                whileHover={{ scale: card.matched ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "aspect-square rounded-xl text-2xl font-bold transition-all sm:text-3xl",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-purple/50",
                  card.matched
                    ? "border-2 border-neon-green bg-neon-green/20"
                    : card.flipped
                      ? "border-2 border-neon-purple bg-space-card"
                      : "border border-white/20 bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 hover:border-neon-purple"
                )}
                aria-label={card.flipped || card.matched ? card.emoji : "Скрытая карта"}
              >
                <AnimatePresence mode="wait">
                  {(card.flipped || card.matched) && (
                    <motion.span
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                    >
                      {card.emoji}
                    </motion.span>
                  )}
                  {!card.flipped && !card.matched && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neon-purple/60"
                    >
                      ?
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          {won && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-neon-green/50 bg-neon-green/10 p-6"
            >
              <Trophy className="h-10 w-10 text-neon-green" />
              <p className="text-xl font-black text-white">Победа! 🎉</p>
              <p className="text-slate-300">
                Ходов: {moves} · Время: {formatTime(seconds)}
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
