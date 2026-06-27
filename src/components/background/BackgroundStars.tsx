"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BackgroundStars() {
  const reducedMotion = useReducedMotion();
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={
            reducedMotion
              ? { opacity: 0.6 }
              : { opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }
          }
          transition={
            reducedMotion
              ? {}
              : { duration: star.duration, repeat: Infinity, delay: star.delay }
          }
        />
      ))}
    </div>
  );
}
