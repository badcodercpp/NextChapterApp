import { AppIconProps } from './types';
import { Theme } from '@/theme';

export function AppIcon({
  icon: Icon,
  size = 24,
  color = 'text',
  strokeWidth = 2,
  fill,
}: AppIconProps) {
  return (
    <Icon
      size={size}
      color={Theme.colors[color]}
      strokeWidth={strokeWidth}
      {...(fill
        ? {
            fill,
          }
        : {})}
    />
  );
}
