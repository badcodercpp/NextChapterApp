import { StyleProp, TextProps, TextStyle } from 'react-native';
import { ThemeColor, ThemeTypography } from '@/theme/types';

import { ReactNode } from 'react';

export interface AppTextProps extends TextProps {
  children: ReactNode;

  variant?: ThemeTypography;

  color?: ThemeColor;

  style?: StyleProp<TextStyle>;
}
