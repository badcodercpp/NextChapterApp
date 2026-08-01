import { ColorVariant } from '@/theme/colors';
import { LucideIcon } from 'lucide-react-native';

export interface AppIconProps {
  icon: LucideIcon;

  size?: number;

  color?: ColorVariant;

  strokeWidth?: number;

  fill?: string;
}
