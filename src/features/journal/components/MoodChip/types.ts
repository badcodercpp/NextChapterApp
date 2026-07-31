import { UserMood } from '@/constants';

export type MoodChipSize = 'small' | 'medium' | 'large';

export type ChipVariant = 'vertical' | 'horizontal';

export interface MoodChipProps {
  mood?: UserMood;
  selected?: boolean;
  showLabel?: boolean;
  size?: MoodChipSize;
  variant?: ChipVariant;
}
