import { AppIcon } from '@/components/foundation/AppIcon';
import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import { JournalHeaderProps } from './types';
import React from 'react';
import { Theme } from '@/theme';
import { View } from 'react-native';
import { X } from 'lucide-react-native';
import { styles } from './styles';

export const JournalHeader = ({
  title,
  onClose,
  onSave,
  saveText = 'Save',
  saveDisabled = false,
  saveLoading = false,
  containerStyle,
  titleStyle,
}: JournalHeaderProps) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Theme.colors.background },
        containerStyle,
      ]}
    >
      <View style={[styles.side, styles.left]}>
        <AppPressable hitSlop={8} onPress={onClose}>
          <AppIcon icon={X} size={28} />
        </AppPressable>
      </View>

      <AppText
        variant="titleMediumBold"
        style={[styles.title, { color: Theme.colors.text }, titleStyle]}
        numberOfLines={1}
      >
        {title}
      </AppText>

      <View style={[styles.side, styles.right]}>
        <AppPressable
          disabled={saveDisabled || saveLoading}
          hitSlop={8}
          onPress={onSave}
        >
          <AppText
            variant="titleMediumBold"
            style={[
              {
                color: Theme.colors.primary,
              },
            ]}
          >
            {saveLoading ? '...' : saveText}
          </AppText>
        </AppPressable>
      </View>
    </View>
  );
};
