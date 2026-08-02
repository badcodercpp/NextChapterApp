import { AppTextProps } from './types';
import React from 'react';
import { Text } from 'react-native';
import { cn } from '@/utils';
import { variantClassNames } from './variants';

export function AppText({
  children,
  variant = 'xl',
  color = 'text',
  className,
  ...props
}: AppTextProps) {
  const variantClassName = `text-${variant}`;
  console.log('variantClassName', variantClassName);
  return (
    <Text
      {...props}
      className={cn(variantClassNames[variant], color, className)}
    >
      {children}
    </Text>
  );
}
