import { AppTextProps } from './types';
import { Colors } from '@/theme/colors';
import React from 'react';
import { Text } from 'react-native';
import { Typography } from '@/theme/typography';
import { cn } from '@/utils';

export function AppText({
  children,
  variant = 'body',
  color = 'text',
  className,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      className={cn(Typography[variant], Colors[color], className)}
    >
      {children}
    </Text>
  );
}
