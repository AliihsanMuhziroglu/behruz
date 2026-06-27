"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const planets = [
  { color: "#a855f7", size: 120, x: "8%", y: "15%", duration: 25 },
  { color: "#3b82f6", size: 80, x: "85%", y: "20%", duration: 30 },
  { color: "#f97316", size: 60, x: "75%", y: "70%", duration: 22 },
  { color: "#22c55e", size: 45, x: "12%", y: "75%", duration: 28 },
];

export function BackgroundPlanets() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {planets.map((planet, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20 blur-sm"
          style={{
            width: planet.size,
            height: planet.size,
            left: planet.x,
            top: planet.y,
            background: `radial-gradient(circle at 30% 30%, ${planet.color}, transparent 70%)`,
          }}
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -30, 0, 20, 0],
                  x: [0, 15, 0, -10, 0],
                }
          }
          transition={
            reducedMotion
              ? {}
              : { duration: planet.duration, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}
