import { AppPressableProps } from './types';
import { Pressable } from 'react-native';
import React from 'react';
import { cn } from '@/utils';

export function AppPressable({
  children,
  className,
  style,
  disabledOpacity = 0.5,
  disabled,
  pressedOpacity = 0.7,
  ...props
}: AppPressableProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      className={cn(className)}
      style={({ pressed }) => [
        style,
        {
          opacity: disabled ? disabledOpacity : pressed ? pressedOpacity : 1,
        },
      ]}
    >
      {children}
    </Pressable>
  );
}
