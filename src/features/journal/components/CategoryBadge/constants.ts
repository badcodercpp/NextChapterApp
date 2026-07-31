import { JournalCategory } from '../../types';
import { Theme } from '@/theme';

export const CategoryBadgeConfig = {
  [JournalCategory.Gratitude]: {
    label: 'Gratitude',
    backgroundColor: Theme.colors.successSurface,
    textColor: Theme.colors.success as keyof typeof Theme.colors,
  },

  [JournalCategory.Reflection]: {
    label: 'Reflection',
    backgroundColor: Theme.colors.purpleSurface,
    textColor: Theme.colors.purple as keyof typeof Theme.colors,
  },

  [JournalCategory.Dream]: {
    label: 'Dream',
    backgroundColor: Theme.colors.infoSurface,
    textColor: Theme.colors.info as keyof typeof Theme.colors,
  },

  [JournalCategory.Goal]: {
    label: 'Goal',
    backgroundColor: Theme.colors.warningSurface,
    textColor: Theme.colors.warning as keyof typeof Theme.colors,
  },

  [JournalCategory.Memory]: {
    label: 'Memory',
    backgroundColor: Theme.colors.purpleSurface,
    textColor: Theme.colors.purple as keyof typeof Theme.colors,
  },

  [JournalCategory.Free]: {
    label: 'Free',
    backgroundColor: Theme.colors.surfaceSecondary,
    textColor: Theme.colors.textSecondary as keyof typeof Theme.colors,
  },
} as const;
