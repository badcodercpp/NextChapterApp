import { AppText } from '@/components/foundation/AppText';
import { CategoryChipProps } from './types';
import { JournalCategoryConfig } from './config';
import React from 'react';
import { Theme } from '@/theme';
import { View } from 'react-native';
import { styles } from './styles';

export const CategoryChip = ({ category, selected }: CategoryChipProps) => {
  const config = category ? JournalCategoryConfig[category] : undefined;

  return (
    <View
      // onPress={() => onPress(category)}
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: selected
            ? Theme.colors.primary
            : Theme.colors.surface,
          borderColor: selected ? Theme.colors.primary : 'transparent',
        },
      ]}
    >
      <AppText
        variant="label"
        style={[
          styles.label,
          {
            color: selected ? Theme.colors.surface : Theme.colors.text,
          },
        ]}
      >
        {config?.label}
      </AppText>
    </View>
  );
};
