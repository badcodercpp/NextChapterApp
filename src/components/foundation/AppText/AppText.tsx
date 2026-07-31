import { AppTextProps } from './types';
import { Colors } from '@/theme/colors';
import React from 'react';
import { Text } from 'react-native';
import { Typography } from '@/theme/typography';

export function AppText({
  children,
  variant = 'body',
  color = 'text',
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        Typography[variant],
        {
          color: Colors[color],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
