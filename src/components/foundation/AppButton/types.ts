import { StyleProp, ViewStyle } from 'react-native';

import { AppPressableProps } from '../AppPressable';
import { LucideIcon } from 'lucide-react-native';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends Omit<AppPressableProps, 'children'> {
  title: string;

  variant?: ButtonVariant;

  size?: ButtonSize;

  loading?: boolean;

  fullWidth?: boolean;

  leftIcon?: LucideIcon;

  rightIcon?: LucideIcon;

  style?: StyleProp<ViewStyle>;
}
