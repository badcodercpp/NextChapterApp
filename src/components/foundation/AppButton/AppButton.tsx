import { ActivityIndicator, View } from 'react-native';
import { ButtonSizes, ButtonVariants } from './variants';

import { AppButtonProps } from './types';
import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { cn } from '@/utils/cn';

export function AppButton({
  title,

  variant = 'primary',

  size = 'md',

  loading = false,

  fullWidth = true,

  leftIcon,

  rightIcon,

  className,

  disabled,

  ...props
}: AppButtonProps) {
  const button = ButtonVariants[variant];
  const buttonSize = ButtonSizes[size];

  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;

  const isGradient = variant === 'gradient';

  return (
    <AppPressable
      {...props}
      disabled={disabled || loading}
      className={cn(
        'flex-row items-center justify-center rounded-2xl bg-button',

        fullWidth && 'w-full',

        !isGradient && button.container,

        // buttonSize.container,

        disabled && 'opacity-50',

        className,

        'bg-red-500',
      )}
    >
      {isGradient ? (
        <LinearGradient
          //@ts-ignore
          colors={button.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className={cn(
            'flex-row items-center justify-center rounded-2xl',
            buttonSize.container,
          )}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <View className="flex-row items-center">
              {LeftIcon && (
                <View className="mr-2">
                  <AppIcon icon={LeftIcon} size={buttonSize.icon} />
                </View>
              )}

              <AppText variant={buttonSize.typography} className={button.text}>
                {title}
              </AppText>

              {RightIcon && (
                <View className="ml-2">
                  <AppIcon icon={RightIcon} size={buttonSize.icon} />
                </View>
              )}
            </View>
          )}
        </LinearGradient>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <View className="flex-row items-center">
              {LeftIcon && (
                <View className="mr-2">
                  <AppIcon icon={LeftIcon} size={buttonSize.icon} />
                </View>
              )}

              <AppText variant={buttonSize.typography} className={button.text}>
                {title}
              </AppText>

              {RightIcon && (
                <View className="ml-2">
                  <AppIcon icon={RightIcon} size={buttonSize.icon} />
                </View>
              )}
            </View>
          )}
        </>
      )}
    </AppPressable>
  );
}
