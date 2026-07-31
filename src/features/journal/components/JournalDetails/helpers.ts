import { Colors } from '@/theme/colors';
import { JournalCategory } from '../../types';
import { JournalPresentation } from './types';
import { UserMood } from '@/constants';

export function getJournalPresentation(mood: UserMood): JournalPresentation {
  switch (mood) {
    case 'hopeful':
      return {
        scene: 'sunrise',
        moodBackground: Colors.moodHappySurface,
        chipBackground: Colors.successSurface,
        chipColor: Colors.success,
      };

    case 'grateful':
      return {
        scene: 'goldenField',
        moodBackground: Colors.moodHappySurface,
        chipBackground: Colors.warningSurface,
        chipColor: Colors.warning,
      };

    case 'confident':
      return {
        scene: 'forest',
        moodBackground: Colors.primarySurface,
        chipBackground: Colors.primarySurface,
        chipColor: Colors.primary,
      };

    case 'neutral':
      return {
        scene: 'hills',
        moodBackground: Colors.moodNeutralSurface,
        chipBackground: Colors.backgroundSecondary,
        chipColor: Colors.textSecondary,
      };

    case 'lonely':
      return {
        scene: 'mist',
        moodBackground: Colors.moodSadSurface,
        chipBackground: Colors.purpleSurface,
        chipColor: Colors.purple,
      };

    case 'sad':
      return {
        scene: 'rain',
        moodBackground: Colors.moodSadSurface,
        chipBackground: Colors.infoSurface,
        chipColor: Colors.info,
      };

    case 'heartbroken':
      return {
        scene: 'storm',
        moodBackground: Colors.moodSadSurface,
        chipBackground: Colors.errorSurface,
        chipColor: Colors.error,
      };

    case 'anxious':
      return {
        scene: 'storm',
        moodBackground: Colors.moodAnxiousSurface,
        chipBackground: Colors.warningSurface,
        chipColor: Colors.warning,
      };

    case 'angry':
      return {
        scene: 'storm',
        moodBackground: Colors.moodAngrySurface,
        chipBackground: Colors.errorSurface,
        chipColor: Colors.error,
      };

    default:
      return {
        scene: 'sunrise',
        moodBackground: Colors.moodNeutralSurface,
        chipBackground: Colors.backgroundSecondary,
        chipColor: Colors.text,
      };
  }
}

export function formatJournalDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatJournalTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatJournalMeta(date: Date): string {
  return formatJournalDate(date);
}

export function getCategoryLabel(category: JournalCategory): string {
  switch (category) {
    case 'reflection':
      return 'Reflection';

    case 'gratitude':
      return 'Gratitude';

    case 'growth':
      return 'Growth';

    case 'acceptance':
      return 'Acceptance';

    case 'future':
      return 'Future';

    case 'healing':
      return 'Healing';

    default:
      return 'Journal';
  }
}
