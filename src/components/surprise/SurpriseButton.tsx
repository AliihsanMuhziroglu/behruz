"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import { useGame } from "@/hooks/useGameContext";

export function SurpriseButton() {
  const [showMessage, setShowMessage] = useState(false);
  const { setDiscoMode, discoMode, triggerConfetti, playSound } = useGame();

  const activateSurprise = () => {
    setDiscoMode(true);
    triggerConfetti();
    setShowMessage(true);
    playSound("celebrate");

    setTimeout(() => {
      setDiscoMode(false);
      setShowMessage(false);
    }, 5000);
  };

  return (
    <>
      <button
        onClick={activateSurprise}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full border-2 border-neon-pink bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 px-5 py-3 font-bold text-white shadow-[0_0_25px_rgba(236,72,153,0.4)] backdrop-blur-md transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-pink/50"
        aria-label="Секретный сюрприз"
      >
        <Gift className="h-5 w-5 text-neon-pink" />
        <span className="hidden sm:inline">Секретный сюрприз 🎁</span>
        <span className="sm:hidden">🎁</span>
      </button>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              animate={discoMode ? { rotate: [0, 2, -2, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="relative rounded-3xl border-2 border-neon-orange bg-gradient-to-br from-neon-purple/90 to-neon-blue/90 p-10 text-center shadow-[0_0_60px_rgba(168,85,247,0.6)]"
            >
              <p className="text-3xl font-black text-white sm:text-4xl">
                Бехруз сегодня снова великолепен! ⭐
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
