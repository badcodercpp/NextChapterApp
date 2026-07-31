import { AppText } from '@/components/foundation/AppText';
import { CategoryBadgeConfig } from './constants';
import { CategoryBadgeProps } from './types';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export function CategoryBadge({ category, style }: CategoryBadgeProps) {
  const badge = CategoryBadgeConfig[category];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: badge.backgroundColor,
        },
        style,
      ]}
    >
      <AppText variant="captionBold" color={badge.textColor}>
        {badge.label}
      </AppText>
    </View>
  );
}
