import { ActivityIndicator } from 'react-native';
import { AppFABProps } from './types';
import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { Colors } from '@/theme/colors';
import { FAB } from './constants';
import React from 'react';
import { styles } from './styles';

export function AppFAB({
  icon,

  label,

  extended = false,

  loading = false,

  disabled = false,

  style,

  ...props
}: AppFABProps) {
  return (
    <AppPressable
      {...props}
      disabled={disabled || loading}
      style={[
        styles.container,

        // eslint-disable-next-line react-native/no-inline-styles
        {
          width: extended ? undefined : FAB.size,

          height: extended ? FAB.extendedHeight : FAB.size,

          borderRadius: extended ? FAB.extendedHeight / 2 : FAB.borderRadius,

          paddingHorizontal: extended ? FAB.horizontalPadding : 0,

          opacity: disabled ? 0.5 : 1,
        },

        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.textInverse} />
      ) : (
        <>
          <AppIcon icon={icon} size={FAB.iconSize} color="textInverse" />

          {extended && label && (
            <AppText
              variant="bodyBold"
              color="textInverse"
              style={styles.label}
            >
              {label}
            </AppText>
          )}
        </>
      )}
    </AppPressable>
  );
}
