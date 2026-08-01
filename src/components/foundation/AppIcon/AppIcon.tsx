import { AppIconProps } from './types';
import { Colors } from '@/theme/colors';
import React from 'react';

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
      color={Colors[color]}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  );
}
