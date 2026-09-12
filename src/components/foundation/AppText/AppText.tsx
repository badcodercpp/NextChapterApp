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
  const defaultColorClassName = 'text-text';
  return (
    <Text
      {...props}
      className={cn(
        variantClassNames[variant],
        color,
        defaultColorClassName,
        className,
      )}
    >
      {children}
    </Text>
  );
}
