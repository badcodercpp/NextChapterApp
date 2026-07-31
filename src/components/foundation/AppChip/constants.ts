import { Theme } from '@/theme';
import { Typography } from '@/theme/typography';

export const ChipSizes = {
  sm: {
    height: 32,
    icon: 16,
    typography: 'caption' as keyof typeof Typography,
    paddingHorizontal: 12,
  },

  md: {
    height: 40,
    icon: 18,
    typography: 'bodySmall' as keyof typeof Typography,
    paddingHorizontal: 16,
  },
};

export const ChipColors = {
  default: {
    background: Theme.colors.surface,
    border: Theme.colors.border,
    text: 'text',
    icon: 'textSecondary',
  },

  selected: {
    background: Theme.colors.primary,
    border: Theme.colors.primary,
    text: 'textInverse',
    icon: 'textInverse',
  },
};
