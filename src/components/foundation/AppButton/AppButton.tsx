import { ActivityIndicator, View } from 'react-native';
import { ButtonSizes, ButtonVariants } from './config';

import { AppButtonProps } from './types';
import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { Colors } from '@/theme/colors';
import React from 'react';
import { styles } from './styles';

export function AppButton({
  title,

  variant = 'primary',

  size = 'md',

  loading = false,

  fullWidth = true,

  leftIcon,

  rightIcon,

  style,

  disabled,

  ...props
}: AppButtonProps) {
  const button = ButtonVariants[variant];
  const buttonSize = ButtonSizes[size];

  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;

  return (
    <AppPressable
      {...props}
      disabled={disabled || loading}
      style={[
        styles.container,

        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: Colors[button.backgroundColor],

          borderWidth: button.borderColor ? 1 : 0,

          borderColor: button.borderColor
            ? Colors[button.borderColor]
            : 'transparent',

          height: buttonSize.height,

          paddingHorizontal: buttonSize.paddingHorizontal,

          width: fullWidth ? '100%' : undefined,
        },

        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors[button.textColor]} />
      ) : (
        <View style={styles.content}>
          {LeftIcon && (
            <View style={styles.iconLeft}>
              <AppIcon icon={LeftIcon} size={20} color={button.textColor} />
            </View>
          )}

          <AppText variant={buttonSize.typography} color={button.textColor}>
            {title}
          </AppText>

          {RightIcon && (
            <View style={styles.iconRight}>
              <AppIcon icon={RightIcon} size={20} color={button.textColor} />
            </View>
          )}
        </View>
      )}
    </AppPressable>
  );
}
