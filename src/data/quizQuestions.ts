export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "Космос",
    question: "Какая планета известна как «Красная планета»?",
    options: ["Венера", "Марс", "Юпитер", "Сатурн"],
    correctIndex: 1,
  },
  {
    id: 2,
    category: "Животные",
    question: "Какое животное может менять цвет кожи?",
    options: ["Лев", "Хамелеон", "Слон", "Крокодил"],
    correctIndex: 1,
  },
  {
    id: 3,
    category: "Наука",
    question: "Из чего состоит вода?",
    options: ["Кислород и азот", "Водород и кислород", "Углерод и водород", "Железо и кислород"],
    correctIndex: 1,
  },
  {
    id: 4,
    category: "Математика",
    question: "Сколько будет 12 × 5?",
    options: ["50", "55", "60", "65"],
    correctIndex: 2,
  },
  {
    id: 5,
    category: "Общие знания",
    question: "Какой язык говорят в Бразилии?",
    options: ["Испанский", "Португальский", "Французский", "Английский"],
    correctIndex: 1,
  },
];

export function getQuizTitle(score: number): string {
  if (score >= 5) return "Мудрец Галактики";
  if (score >= 4) return "Супермозг";
  if (score >= 3) return "Исследователь знаний";
  if (score >= 2) return "Любознательный искатель";
  return "Начинающий исследователь";
}

export function getQuizXP(score: number): number {
  return score * 30;
}
