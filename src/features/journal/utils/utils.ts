import { Theme } from '@/theme';
import { UserMood } from '@/constants';

export const getMoodBackgroundColor = (mood?: UserMood): string => {
  switch (mood) {
    case UserMood.Happy:
      return Theme.colors.moodHappySurface;

    case UserMood.Calm:
      return Theme.colors.moodCalmSurface;

    case UserMood.Neutral:
      return Theme.colors.moodNeutralSurface;

    case UserMood.Sad:
      return Theme.colors.moodSadSurface;

    case UserMood.Anxious:
      return Theme.colors.moodAnxiousSurface;

    case UserMood.Angry:
      return Theme.colors.moodAngrySurface;

    default:
      return Theme.colors.surface;
  }
};
