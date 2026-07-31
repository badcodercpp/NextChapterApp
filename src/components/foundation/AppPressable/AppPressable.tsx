import { AppPressableProps } from './types';
import { Pressable } from 'react-native';
import React from 'react';
import { styles } from './styles';

export function AppPressable({
  children,
  style,
  disabledOpacity = 0.5,
  disabled,
  ...props
}: AppPressableProps) {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        style,
        {
          opacity: disabled ? disabledOpacity : pressed ? 0.7 : 1,
        },
      ]}
    >
      {children}
    </Pressable>
  );
}
