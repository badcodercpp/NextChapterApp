import { TypographyVariant } from '@/theme/types';
export interface AppExpandableTextProps {
  text?: string;
  variant?: TypographyVariant;
  collapsedLines?: number;
  showMoreText?: string;
  showLessText?: string;
  textClassName?: string;
  buttonClassName?: string;
  buttonTextClassName?: string;
}
