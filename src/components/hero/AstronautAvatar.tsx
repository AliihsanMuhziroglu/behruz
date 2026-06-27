"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AstronautAvatar() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64"
      animate={reducedMotion ? {} : { y: [0, -12, 0] }}
      transition={reducedMotion ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-blue/30 blur-2xl" />

      <svg viewBox="0 0 200 200" className="relative h-full w-full drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
        {/* Body */}
        <ellipse cx="100" cy="130" rx="45" ry="50" fill="#3b82f6" />
        <ellipse cx="100" cy="130" rx="38" ry="43" fill="#2563eb" />

        {/* Arms */}
        <ellipse cx="55" cy="125" rx="15" ry="25" fill="#3b82f6" transform="rotate(-20 55 125)" />
        <ellipse cx="145" cy="125" rx="15" ry="25" fill="#3b82f6" transform="rotate(20 145 125)" />

        {/* Legs */}
        <ellipse cx="80" cy="175" rx="14" ry="22" fill="#1d4ed8" />
        <ellipse cx="120" cy="175" rx="14" ry="22" fill="#1d4ed8" />

        {/* Helmet */}
        <circle cx="100" cy="75" r="42" fill="#e2e8f0" />
        <circle cx="100" cy="75" r="36" fill="#1e293b" opacity="0.3" />
        <circle cx="100" cy="75" r="42" fill="none" stroke="#a855f7" strokeWidth="3" />

        {/* Face */}
        <circle cx="88" cy="72" r="5" fill="#0f172a" />
        <circle cx="112" cy="72" r="5" fill="#0f172a" />
        <circle cx="90" cy="70" r="2" fill="white" />
        <circle cx="114" cy="70" r="2" fill="white" />
        <path d="M 88 85 Q 100 95 112 85" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

        {/* Game controller */}
        <rect x="130" y="110" width="30" height="18" rx="5" fill="#f97316" />
        <circle cx="138" cy="119" r="3" fill="#1e293b" />
        <circle cx="152" cy="119" r="3" fill="#1e293b" />

        {/* Stars decoration */}
        <text x="30" y="50" fontSize="16" fill="#fbbf24">⭐</text>
        <text x="160" y="40" fontSize="12" fill="#a855f7">✨</text>
        <text x="170" y="80" fontSize="14" fill="#22c55e">🚀</text>
      </svg>
    </motion.div>
  );
}
