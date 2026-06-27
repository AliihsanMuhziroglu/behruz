"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RotateCcw, Award } from "lucide-react";
import { QUIZ_QUESTIONS, getQuizTitle, getQuizXP } from "@/data/quizQuestions";
import { useGame } from "@/hooks/useGameContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function QuizSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const { addXp, unlockBadge, playSound } = useGame();
  const reducedMotion = useReducedMotion();

  const question = QUIZ_QUESTIONS[currentIndex];
  const isCorrect = selected === question?.correctIndex;

  const startQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFinished(false);
    setStarted(true);
    playSound("click");
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);

    const correct = index === question.correctIndex;
    if (correct) {
      setScore((s) => s + 1);
      playSound("success");
    } else {
      playSound("error");
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
      playSound("click");
    } else {
      const finalScore = score;
      const xp = getQuizXP(finalScore);
      addXp(xp);
      if (finalScore >= 4) {
        unlockBadge("knowledge-explorer");
      }
      setFinished(true);
      playSound("celebrate");
    }
  };

  if (!started) {
    return (
      <section id="quiz" className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-title mb-8">Весёлая викторина</h2>
          <div className="neon-card p-8">
            <p className="mb-6 text-lg text-slate-300">
              5 вопросов о космосе, животных, науке и многом другом!
            </p>
            <button onClick={startQuiz} className="neon-btn-primary">
              Начать викторину
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (finished) {
    const title = getQuizTitle(score);
    const xpEarned = getQuizXP(score);

    return (
      <section id="quiz" className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="section-title mb-8 text-center">Весёлая викторина</h2>
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="neon-card flex flex-col items-center gap-6 p-8 text-center"
          >
            <Award className="h-16 w-16 text-neon-orange" />
            <h3 className="text-3xl font-black text-white">Твой результат</h3>
            <p className="text-5xl font-black text-neon-purple">
              {score} / {QUIZ_QUESTIONS.length}
            </p>
            <p className="text-xl text-neon-green">
              Получено XP: +{xpEarned}
            </p>
            <div className="rounded-2xl border border-neon-orange/50 bg-neon-orange/10 px-8 py-4">
              <p className="text-sm text-slate-400">Твоё звание</p>
              <p className="text-2xl font-black text-neon-orange">{title}</p>
            </div>
            <button onClick={startQuiz} className="neon-btn-secondary flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Попробовать снова
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="section-title mb-8 text-center">Весёлая викторина</h2>

        <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-400">
          <span>Вопрос {currentIndex + 1} / {QUIZ_QUESTIONS.length}</span>
          <span className="rounded-full bg-neon-purple/20 px-3 py-1 text-neon-purple">
            {question.category}
          </span>
        </div>

        <div className="neon-card p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={reducedMotion ? {} : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? {} : { opacity: 0, x: -30 }}
            >
              <h3 className="mb-8 text-xl font-bold text-white sm:text-2xl">
                {question.question}
              </h3>

              <div className="grid gap-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={cn(
                      "rounded-2xl border-2 px-5 py-4 text-left text-lg font-semibold transition-all",
                      "focus:outline-none focus-visible:ring-4 focus-visible:ring-neon-purple/50",
                      !showResult && "border-white/20 bg-white/5 text-white hover:border-neon-purple hover:bg-neon-purple/10",
                      showResult && index === question.correctIndex && "border-neon-green bg-neon-green/20 text-neon-green",
                      showResult && selected === index && index !== question.correctIndex && "border-red-500 bg-red-500/20 text-red-400",
                      showResult && selected !== index && index !== question.correctIndex && "border-white/10 opacity-50"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-col items-center gap-4"
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle className="h-8 w-8 text-neon-green" />
                        <span className="text-xl font-black text-neon-green">Правильно!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-8 w-8 text-red-400" />
                        <span className="text-xl font-black text-red-400">Неправильно!</span>
                      </>
                    )}
                  </div>
                  <button onClick={handleNext} className="neon-btn-primary">
                    {currentIndex < QUIZ_QUESTIONS.length - 1 ? "Следующий вопрос" : "Увидеть результат"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
