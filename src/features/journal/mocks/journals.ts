import { Journal, JournalCategory } from '../types';

import { UserMood } from '@/constants';

export const mockJournals: Journal[] = [
  {
    id: '1',
    title: 'Evening Reflection',
    content:
      "Today I finally found some peace after a long and difficult day. I realized it's okay to slow down and appreciate small moments.",
    mood: UserMood.Calm,
    category: JournalCategory.Reflection,
    isFavorite: true,
    createdAt: '2026-07-18T22:30:00',
  },
  {
    id: '2',
    title: 'Grateful for Family',
    content:
      'Spent the evening talking with my parents. It reminded me how important these conversations are.',
    mood: UserMood.Happy,
    category: JournalCategory.Gratitude,
    isFavorite: false,
    createdAt: '2026-07-17T20:15:00',
  },
  {
    id: '3',
    title: 'A Dream to Remember',
    content:
      'I had a strange dream about walking through mountains at sunrise. It felt incredibly peaceful.',
    mood: UserMood.Neutral,
    category: JournalCategory.Dream,
    isFavorite: false,
    createdAt: '2026-07-16T07:45:00',
  },
  {
    id: '4',
    title: 'Small Step Forward',
    content:
      'Completed one of my weekly goals today. Progress is slow, but it still counts.',
    mood: UserMood.Happy,
    category: JournalCategory.Goal,
    isFavorite: false,
    createdAt: '2026-07-15T18:20:00',
  },
];
