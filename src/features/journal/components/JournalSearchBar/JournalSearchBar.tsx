import { Filter, Search } from 'lucide-react-native';
import { TextInput, View } from 'react-native';

import { AppIcon } from '@/components/foundation/AppIcon';
import { AppPressable } from '@/components/foundation/AppPressable';
import { JournalSearchBarProps } from './types';
import React from 'react';
import { Theme } from '@/theme';
import { styles } from './styles';

export const JournalSearchBar = ({
  value,
  placeholder = 'Search journals...',
  onChangeText,
  onFilterPress,
}: JournalSearchBarProps) => {
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: Theme.colors.surface,
          borderColor: Theme.colors.border,
          borderWidth: 1,
        },
      ]}
    >
      <AppIcon icon={Search} size={22} color="textSecondary" />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.textSecondary}
        style={[
          styles.input,
          {
            color: Theme.colors.text,
          },
        ]}
      />

      <AppPressable style={styles.iconButton} onPress={onFilterPress}>
        <AppIcon icon={Filter} size={22} color="textSecondary" />
      </AppPressable>
    </View>
  );
};
