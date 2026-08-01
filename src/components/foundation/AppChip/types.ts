import { ChipSize, ChipVariant } from './variants';

import { AppPressableProps } from '../AppPressable';
import { LucideIcon } from 'lucide-react-native';

export interface AppChipProps extends Omit<AppPressableProps, 'children'> {
  title: string;

  variant?: ChipVariant;

  size?: ChipSize;

  leftIcon?: LucideIcon;

  rightIcon?: LucideIcon;

  selected?: boolean;

  className?: string;
}
