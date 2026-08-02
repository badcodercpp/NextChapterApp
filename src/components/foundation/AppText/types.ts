import { ColorVariant } from '@/theme/colors';
import { TextProps } from 'react-native';
import { TypographyVariant } from '@/theme/types';

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: ColorVariant;
  className?: string;
}
