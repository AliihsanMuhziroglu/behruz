"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  color: ["#a855f7", "#3b82f6", "#f97316", "#22c55e", "#ec4899"][i % 5],
  size: Math.random() * 4 + 2,
  duration: Math.random() * 10 + 15,
}));

export function ParticleField() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.4,
          }}
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0.2, 0.6, 0.2],
                }
          }
          transition={
            reducedMotion
              ? {}
              : { duration: p.duration, repeat: Infinity, ease: "linear" }
          }
        />
      ))}
    </div>
  );
}
