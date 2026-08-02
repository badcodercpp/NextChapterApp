import { AppIconProps } from './types';
import React from 'react';
import { cn } from '@/utils';
import { withUniwind } from 'uniwind';

export function AppIcon({
  icon: Icon,
  size = 24,
  strokeWidth = 2,
  className = 'text-text',
}: AppIconProps) {
  const UniwindIcon = withUniwind(Icon);
  // const resolvedStyle = useResolveClassNames(className);
  // const activeColor = resolvedStyle?.color || 'black';
  return (
    <UniwindIcon
      size={size}
      strokeWidth={strokeWidth}
      // fill={activeColor}
      className={cn(className)}
    />
  );
}
