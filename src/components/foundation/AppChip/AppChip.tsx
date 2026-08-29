import { ChipSizes, ChipVariants } from './variants';

import type { AppChipProps } from './types';
import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import React from 'react';
import { View } from 'react-native';
import { cn } from '@/utils';

export function AppChip({
  title,
  variant = 'soft',
  size = 'md',
  selected = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}: AppChipProps) {
  const chip = ChipVariants[variant];
  const chipSize = ChipSizes[size];

  return (
    <AppPressable
      {...props}
      className={cn(
        'flex-row items-center rounded-full',

        chip.container,

        chipSize.container,

        selected && 'border-2 border-primary',

        className,
      )}
    >
      {leftIcon && (
        <View className="mr-2">
          <AppIcon icon={leftIcon} size={chipSize.icon} />
        </View>
      )}

      <AppText variant="xs" className={chip.text}>
        {title}
      </AppText>

      {rightIcon && (
        <View className="ml-2">
          <AppIcon icon={rightIcon} size={chipSize.icon} />
        </View>
      )}
    </AppPressable>
  );
}
