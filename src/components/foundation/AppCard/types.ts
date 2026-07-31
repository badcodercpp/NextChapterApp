import { StyleProp, ViewStyle } from 'react-native';
import { ThemeColor, ThemeRadius, ThemeSpacing } from '@/theme/types';

import { ReactNode } from 'react';
import { Shadows } from '@/theme/shadows';

export interface AppCardProps {
  children: ReactNode;

  style?: StyleProp<ViewStyle>;

  padding?: ThemeSpacing;

  radius?: ThemeRadius;

  backgroundColor?: ThemeColor;

  shadow?: keyof typeof Shadows;

  border?: boolean;
}
