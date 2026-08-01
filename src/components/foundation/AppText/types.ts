import { ColorVariant } from '@/theme/colors';
import { TextProps } from 'react-native';
import { TypographyVariant } from '@/theme/typography';

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: ColorVariant;
  className?: string;
}
