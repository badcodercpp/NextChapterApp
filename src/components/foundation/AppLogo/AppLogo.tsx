import { AppLogoProps } from './types';
import { Image } from 'react-native';
import React from 'react';

export function AppLogo({ size = 96, style }: AppLogoProps) {
  return (
    <Image
      source={require('@/assets/images/logo.png')}
      resizeMode="contain"
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
