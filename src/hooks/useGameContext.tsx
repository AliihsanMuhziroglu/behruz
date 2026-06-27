"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { BASE_XP, MAX_XP } from "@/data/quests";
import { STORAGE_KEYS } from "@/data/constants";

interface GameContextType {
  xp: number;
  maxXp: number;
  addXp: (amount: number) => void;
  badges: string[];
  unlockBadge: (badgeId: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type: "success" | "click" | "error" | "celebrate") => void;
  discoMode: boolean;
  setDiscoMode: (enabled: boolean) => void;
  triggerConfetti: () => void;
  confettiKey: number;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useLocalStorage<number>(STORAGE_KEYS.XP, BASE_XP);
  const [badges, setBadges] = useLocalStorage<string[]>(STORAGE_KEYS.BADGES, []);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [discoMode, setDiscoMode] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  const addXp = useCallback(
    (amount: number) => {
      setXp((prev) => Math.max(BASE_XP, Math.min(prev + amount, MAX_XP)));
    },
    [setXp]
  );

  const unlockBadge = useCallback(
    (badgeId: string) => {
      setBadges((prev) => {
        if (prev.includes(badgeId)) return prev;
        return [...prev, badgeId];
      });
    },
    [setBadges]
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const playSound = useCallback(
    (type: "success" | "click" | "error" | "celebrate") => {
      if (!soundEnabled) return;
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const freqs: Record<string, number[]> = {
          success: [523, 659, 784],
          click: [440],
          error: [200, 150],
          celebrate: [523, 659, 784, 1047],
        };

        const notes = freqs[type];
        notes.forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.value = freq;
          o.type = "sine";
          const start = ctx.currentTime + i * 0.12;
          g.gain.setValueAtTime(0.15, start);
          g.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
          o.start(start);
          o.stop(start + 0.15);
        });

        osc.disconnect();
        setTimeout(() => ctx.close(), 1000);
      } catch {
        // ignore
      }
    },
    [soundEnabled]
  );

  const triggerConfetti = useCallback(() => {
    setConfettiKey((k) => k + 1);
  }, []);

  const value = useMemo(
    () => ({
      xp,
      maxXp: MAX_XP,
      addXp,
      badges,
      unlockBadge,
      soundEnabled,
      toggleSound,
      playSound,
      discoMode,
      setDiscoMode,
      triggerConfetti,
      confettiKey,
    }),
    [xp, addXp, badges, unlockBadge, soundEnabled, toggleSound, playSound, discoMode, triggerConfetti, confettiKey]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
