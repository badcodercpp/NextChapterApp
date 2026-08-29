import { Image, View } from 'react-native';

import type { AppAvatarProps } from './types';
import { AppPressable } from '../AppPressable';
import { AppText } from '../AppText';
import { AvatarSizes } from './variants';
import React from 'react';
import { cn } from '@/utils';

export function AppAvatar({
  name,
  uri,
  source,
  size = 'md',
  className,
  onPress,
  ...props
}: AppAvatarProps) {
  const avatarSize = AvatarSizes[size];

  const initials =
    name
      ?.trim()
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? '';

  const avatar = (
    <View
      className={cn(
        'items-center justify-center rounded-full bg-primary overflow-hidden',

        avatarSize.container,

        className,
      )}
    >
      {uri || source ? (
        <Image
          source={uri ? { uri } : source}
          className="h-full w-full"
          resizeMode="cover"
        />
      ) : (
        <AppText variant="lg" color="text">
          {initials}
        </AppText>
      )}
    </View>
  );

  if (!onPress) {
    return avatar;
  }

  return (
    <AppPressable onPress={onPress} {...props}>
      {avatar}
    </AppPressable>
  );
}
