import { Journal, JournalCategory } from '../types';

import { UserMood } from '@/constants';

export const journalDetailsMock: Journal = {
  id: '1',
  title: 'A Small Win',

  content: `Today I finally smiled without forcing myself.
I still miss her.
But today felt different.
Maybe healing doesn't happen all at once.
Maybe it happens one small step at a time.`,

  mood: UserMood.Happy,
  category: JournalCategory.Reflection,

  createdAt: '2026-07-18T22:30:00',
  updatedAt: '2026-07-18T23:30:00',
  isFavorite: false,
};
