export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const BADGES: Badge[] = [
  {
    id: "first-quest",
    name: "Первое задание",
    description: "Выполни своё первое задание",
    icon: "🎯",
  },
  {
    id: "bookworm",
    name: "Книжный червь",
    description: "Прочитай книгу 20 минут",
    icon: "📚",
  },
  {
    id: "fast-fingers",
    name: "Быстрые пальцы",
    description: "Набери 15+ очков в Быстром клике",
    icon: "⚡",
  },
  {
    id: "memory-master",
    name: "Мастер памяти",
    description: "Пройди игру на память",
    icon: "🧠",
  },
  {
    id: "knowledge-explorer",
    name: "Исследователь знаний",
    description: "Ответь правильно на 4+ вопроса викторины",
    icon: "🔭",
  },
  {
    id: "super-helper",
    name: "Суперпомощник",
    description: "Помоги кому-нибудь",
    icon: "🤝",
  },
];
