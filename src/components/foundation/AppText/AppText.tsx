import { AppTextProps } from './types';
import React from 'react';
import { Text } from 'react-native';
import { cn } from '@/utils';

export function AppText({
  children,
  variant = 'xl',
  color = 'text',
  className,
  ...props
}: AppTextProps) {
  return (
    <Text {...props} className={cn(`text-${variant}`, color, className)}>
      {children}
    </Text>
  );
}
