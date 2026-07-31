import { StyleProp, ViewStyle } from 'react-native';

import { AppPressableProps } from '../AppPressable';
import { ChipSizes } from './constants';
import { LucideIcon } from 'lucide-react-native';

export interface AppChipProps extends Omit<AppPressableProps, 'children'> {
  label: string;

  selected?: boolean;

  icon?: LucideIcon;

  disabled?: boolean;

  size?: keyof typeof ChipSizes;

  style?: StyleProp<ViewStyle>;
}
