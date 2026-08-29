import { AppLogoProps } from './types';
import { Image } from 'react-native';
import { LogoVariants } from './variants';
import React from 'react';
import { cn } from '@/utils';

export function AppLogo({
  size = 96,
  variant = 'default',
  className,
  ...props
}: AppLogoProps) {
  return (
    <Image
      {...props}
      source={LogoVariants[variant]}
      resizeMode="contain"
      className={cn(className)}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
