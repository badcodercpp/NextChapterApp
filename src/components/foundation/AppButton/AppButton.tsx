import { ActivityIndicator, View } from 'react-native';
import { ButtonSizes, ButtonVariants } from './variants';

import { AppButtonProps } from './types';
import { AppIcon } from '../AppIcon';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { cn } from '@/utils';

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

  const isGradient = variant === 'gradient' && button.gradient !== null;

  return (
    <AppPressable
      {...props}
      disabled={disabled || loading}
      className={cn(
        'flex-row items-center justify-center rounded-2xl bg-primary overflow-hidden',

        fullWidth && 'w-full',

        !isGradient && button.container,

        buttonSize.container,

        disabled && 'opacity-50',

        className,
      )}
    >
      {isGradient ? (
        <>
          {/* @ts-ignore */}
          <LinearGradient
            colors={button.gradient.colors}
            start={button.gradient.start}
            end={button.gradient.end}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <View className="h-full w-full flex-row items-center flex-1 px-6">
                {LeftIcon && (
                  <View className="mr-2">
                    <AppIcon icon={LeftIcon} size={buttonSize.icon} />
                  </View>
                )}

                <View className="flex-1">
                  <AppText variant="lg" className={button.text}>
                    {title}
                  </AppText>
                </View>

                {RightIcon && (
                  <View className="ml-2">
                    <AppIcon
                      icon={RightIcon}
                      size={buttonSize.icon}
                      className="text-primary"
                    />
                  </View>
                )}
              </View>
            )}
          </LinearGradient>
        </>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <View className="h-full w-full flex-row items-center flex-1 px-6">
              {LeftIcon && (
                <View className="mr-2">
                  <AppIcon icon={LeftIcon} size={buttonSize.icon} />
                </View>
              )}

              <View className="flex-1 items-center">
                <AppText variant="lg" className={button.text}>
                  {title}
                </AppText>
              </View>

              {RightIcon && (
                <View className="ml-2">
                  <AppIcon
                    icon={RightIcon}
                    size={buttonSize.icon}
                    className="text-text"
                  />
                </View>
              )}
            </View>
          )}
        </>
      )}
    </AppPressable>
  );
}
