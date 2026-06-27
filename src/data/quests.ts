export interface Quest {
  id: string;
  text: string;
  xpReward: number;
  badgeId?: string;
}

export const DAILY_QUESTS: Quest[] = [
  {
    id: "read-book",
    text: "Почитай книгу 20 минут",
    xpReward: 50,
    badgeId: "bookworm",
  },
  {
    id: "learn-new",
    text: "Узнай что-нибудь новое",
    xpReward: 40,
  },
  {
    id: "help-someone",
    text: "Помоги кому-нибудь",
    xpReward: 60,
    badgeId: "super-helper",
  },
];

export const BASE_XP = 850;
export const MAX_XP = 1000;
export const QUEST_XP_REWARD = 50;
