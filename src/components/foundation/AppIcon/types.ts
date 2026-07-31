import { LucideIcon } from 'lucide-react-native';
import { ThemeColor } from '@/theme/types';

export interface AppIconProps {
  icon: LucideIcon;

  size?: number;

  color?: ThemeColor;

  strokeWidth?: number;

  fill?: string;
}
