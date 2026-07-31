import { AppCardProps } from './types';
import { Colors } from '@/theme/colors';
import { Radius } from '@/theme/radius';
import React from 'react';
import { Shadows } from '@/theme/shadows';
import { Spacing } from '@/theme/spacing';
import { View } from 'react-native';
import { styles } from './styles';

export function AppCard({
  children,
  style,
  padding = 'xl',
  radius = 'lg',
  backgroundColor = 'surface',
  shadow = 'sm',
  border = false,
}: AppCardProps) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[backgroundColor],
          padding: Spacing[padding],
          borderRadius: Radius[radius],
        },
        Shadows[shadow],
        style,
        // eslint-disable-next-line react-native/no-inline-styles
        border && {
          borderWidth: 1,
          borderColor: Colors.border,
        },
      ]}
    >
      {children}
    </View>
  );
}
