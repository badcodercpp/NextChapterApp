import { ActivityIndicator, View } from 'react-native';
import { FabSizes, FabVariants } from './variants';

import { AppFabProps } from './types';
import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { Colors } from '@/theme/colors';
import React from 'react';
import { cn } from '@/utils';

export function AppFab({
  icon,
  label,
  extended = false,
  loading = false,
  disabled = false,
  variant = 'primary',
  className,
  ...props
}: AppFabProps) {
  const fab = FabVariants[variant];
  const size = extended ? FabSizes.extended : FabSizes.normal;

  return (
    <AppPressable
      {...props}
      disabled={disabled || loading}
      className={cn(
        'flex-row items-center justify-center',

        fab.container,

        size.container,

        disabled && 'opacity-50',

        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color={Colors.text} />
      ) : (
        <>
          <AppIcon icon={icon} size={size.icon} />

          {extended && label && (
            <View className="ml-3">
              <AppText variant="lg" className={fab.text}>
                {label}
              </AppText>
            </View>
          )}
        </>
      )}
    </AppPressable>
  );
}
