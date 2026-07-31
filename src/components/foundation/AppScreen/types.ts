import { ThemeColor, ThemeSpacing } from '@/theme/types';

import { ReactNode } from 'react';

export interface AppScreenProps {
  children: ReactNode;

  scroll?: boolean;

  safeArea?: boolean;

  keyboard?: boolean;

  backgroundColor?: ThemeColor;

  horizontalPadding?: ThemeSpacing;

  verticalPadding?: ThemeSpacing;

  safeTop?: boolean;
}
