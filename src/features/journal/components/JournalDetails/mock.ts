import { JournalCategory } from '../../types';
import { JournalDetails } from './types';
import { UserMood } from '@/constants';

export const journalDetailsMock: JournalDetails = {
  id: 'journal_1',

  title: 'Evening Reflection',

  emoji: '🌅',

  mood: UserMood.Sad,

  category: JournalCategory.Reflection,

  createdAt: new Date('2026-07-19T21:15:00'),

  day: 18,

  bookmarked: true,

  question:
    "What's one thing you handled better today than you would have a month ago?",

  content: `Today felt different.

I still thought about her, but for the first time those memories didn't completely take over my day.

There were moments where I simply focused on work, smiled during a conversation, and realized I wasn't constantly waiting for a message that would never come.

Healing isn't loud.

It isn't waking up one morning suddenly feeling happy.

It's these tiny moments where life quietly returns without asking for permission.

Tonight I'm grateful that I noticed those moments instead of ignoring them.`,

  aiInsight:
    "You're beginning to notice progress instead of only pain. Recovery often feels invisible until you look back and realize your hardest days no longer define every moment.",
};
