"use client";

import { BackgroundStars } from "@/components/background/BackgroundStars";
import { BackgroundPlanets } from "@/components/background/BackgroundPlanets";
import { ParticleField } from "@/components/background/ParticleField";
import { ConfettiEffect } from "@/components/ui/ConfettiEffect";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutCard } from "@/components/about/AboutCard";
import { DailyQuests } from "@/components/quests/DailyQuests";
import { MiniGamesSection } from "@/components/games/MiniGamesSection";
import { QuizSection } from "@/components/quiz/QuizSection";
import { JokeMachine } from "@/components/jokes/JokeMachine";
import { BadgesSection } from "@/components/badges/BadgesSection";
import { SurpriseButton } from "@/components/surprise/SurpriseButton";
import { Footer } from "@/components/layout/Footer";
import { useGame } from "@/hooks/useGameContext";
import { cn } from "@/lib/utils";

export default function Home() {
  const { confettiKey, discoMode } = useGame();

  return (
    <main
      className={cn(
        "relative min-h-screen overflow-x-hidden bg-gradient-to-b from-space-dark via-space-navy to-space-dark",
        discoMode && "disco-mode"
      )}
    >
      <BackgroundStars />
      <BackgroundPlanets />
      <ParticleField />
      <ConfettiEffect triggerKey={confettiKey} />

      <SoundToggle />
      <SurpriseButton />

      <HeroSection />
      <AboutCard />
      <DailyQuests />
      <MiniGamesSection />
      <QuizSection />
      <JokeMachine />
      <BadgesSection />
      <Footer />
    </main>
  );
}
