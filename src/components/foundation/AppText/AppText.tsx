import { AppTextProps } from './types';
import React from 'react';
import { Text } from 'react-native';
import { cn } from '@/utils';
import { variantClassNames } from './variants';

export function AppText({
  children,
  variant = 'xl',
  color = 'text',
  className = 'text-text',
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      className={cn(variantClassNames[variant], color, className)}
    >
      {children}
    </Text>
  );
}
