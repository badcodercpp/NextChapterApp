import { AppPressableProps } from '../AppPressable';
import { FabVariant } from './variants';
import { LucideIcon } from 'lucide-react-native';

export interface AppFabProps extends Omit<AppPressableProps, 'children'> {
  icon: LucideIcon;

  label?: string;

  extended?: boolean;

  loading?: boolean;

  variant?: FabVariant;

  className?: string;
}
