import { StyleProp, ViewStyle } from 'react-native';

import { AppPressableProps } from '../AppPressable';
import { LucideIcon } from 'lucide-react-native';

export interface AppFABProps extends Omit<AppPressableProps, 'children'> {
  icon: LucideIcon;

  label?: string;

  extended?: boolean;

  loading?: boolean;

  disabled?: boolean;

  style?: StyleProp<ViewStyle>;
}
