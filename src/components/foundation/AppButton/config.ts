import { ThemeColor, ThemeTypography } from '@/theme/types';

import { Spacing } from '@/theme/spacing';

export const ButtonSizes = {
  sm: {
    height: 40,
    paddingHorizontal: Spacing.lg,
    typography: 'bodySmall' as ThemeTypography,
  },

  md: {
    height: 52,
    paddingHorizontal: Spacing.xl,
    typography: 'body' as ThemeTypography,
  },

  lg: {
    height: 60,
    paddingHorizontal: Spacing['2xl'],
    typography: 'title' as ThemeTypography,
  },
};

export const ButtonVariants = {
  primary: {
    backgroundColor: 'primary' as ThemeColor,
    textColor: 'textInverse' as ThemeColor,
    borderColor: undefined,
  },

  secondary: {
    backgroundColor: 'surfaceSecondary' as ThemeColor,
    textColor: 'text' as ThemeColor,
    borderColor: undefined,
  },

  outline: {
    backgroundColor: 'transparent' as ThemeColor,
    textColor: 'primary' as ThemeColor,
    borderColor: 'primary' as ThemeColor,
  },

  ghost: {
    backgroundColor: 'transparent' as ThemeColor,
    textColor: 'primary' as ThemeColor,
    borderColor: undefined,
  },

  danger: {
    backgroundColor: 'error' as ThemeColor,
    textColor: 'textInverse' as ThemeColor,
    borderColor: undefined,
  },
};
