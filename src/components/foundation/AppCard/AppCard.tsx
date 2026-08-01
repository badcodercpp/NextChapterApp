import { AppCardProps } from './types';
import { CardVariants } from './variants';
import React from 'react';
import { View } from 'react-native';
import { cn } from '@/utils/cn';

export function AppCard({
  children,
  variant = 'surface',
  border = false,
  className,
  ...props
}: AppCardProps) {
  return (
    <View
      {...props}
      className={cn(
        'rounded-3xl p-6',

        CardVariants[variant],

        border && 'border border-border',

        'shadow-lg',

        className,
      )}
    >
      {children}
    </View>
  );
}
