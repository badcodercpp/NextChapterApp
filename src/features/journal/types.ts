import { UserMood } from '@/constants';

export enum JournalCategory {
  All = 'all',
  Reflection = 'reflection',
  Gratitude = 'gratitude',
  Dream = 'dream',
  Goal = 'goal',
  Memory = 'memory',
  Free = 'free',
  Growth = 'growth',
  Acceptance = 'acceptance',
  Future = 'future',
  Healing = 'healing',
}

export interface Journal {
  id: string;

  title: string;

  content: string;

  mood: UserMood;

  category: JournalCategory;

  isFavorite: boolean;

  createdAt: string;

  updatedAt?: string;
}
