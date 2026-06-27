"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useGame } from "@/hooks/useGameContext";

export function SoundToggle() {
  const { soundEnabled, toggleSound, playSound } = useGame();

  return (
    <button
      onClick={() => {
        toggleSound();
        if (!soundEnabled) {
          setTimeout(() => playSound("click"), 50);
        }
      }}
      className="fixed right-4 top-4 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-space-card/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-neon-purple hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-purple/50"
      aria-label={soundEnabled ? "Выключить звук" : "Включить звук"}
    >
      {soundEnabled ? (
        <>
          <Volume2 className="h-5 w-5 text-neon-green" />
          <span className="hidden sm:inline">Выключить звук</span>
        </>
      ) : (
        <>
          <VolumeX className="h-5 w-5 text-white/60" />
          <span className="hidden sm:inline">Включить звук</span>
        </>
      )}
    </button>
  );
}
