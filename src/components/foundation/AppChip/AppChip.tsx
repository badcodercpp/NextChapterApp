import { ChipColors, ChipSizes } from './constants';

import { AppChipProps } from './types';
import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export function AppChip({
  label,

  icon,

  selected = false,

  disabled = false,

  size = 'md',

  style,

  ...props
}: AppChipProps) {
  const chipSize = ChipSizes[size];

  const colors = selected ? ChipColors.selected : ChipColors.default;

  return (
    <AppPressable
      {...props}
      disabled={disabled}
      style={[
        styles.container,

        // eslint-disable-next-line react-native/no-inline-styles
        {
          height: chipSize.height,

          paddingHorizontal: chipSize.paddingHorizontal,

          backgroundColor: colors.background,

          borderColor: colors.border,

          opacity: disabled ? 0.5 : 1,
        },

        style,
      ]}
    >
      {icon && (
        <View style={styles.icon}>
          <AppIcon icon={icon} size={chipSize.icon} color="success" />
        </View>
      )}

      <AppText variant={chipSize.typography}>{label}</AppText>
    </AppPressable>
  );
}
