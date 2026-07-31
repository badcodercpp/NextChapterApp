import { JournalCategory } from '../../types';

export const JournalCategoryConfig = {
  [JournalCategory.Reflection]: {
    label: 'Reflection',
  },

  [JournalCategory.Gratitude]: {
    label: 'Gratitude',
  },

  [JournalCategory.Dream]: {
    label: 'Dream',
  },

  [JournalCategory.Goal]: {
    label: 'Goal',
  },

  [JournalCategory.Memory]: {
    label: 'Memory',
  },

  [JournalCategory.Free]: {
    label: 'Free',
  },

  [JournalCategory.All]: {
    label: 'All',
  },

  [JournalCategory.Growth]: {
    label: 'Growth',
  },

  [JournalCategory.Acceptance]: {
    label: 'Acceptance',
  },

  [JournalCategory.Future]: {
    label: 'Future',
  },

  [JournalCategory.Healing]: {
    label: 'Healing',
  },
} as const;
