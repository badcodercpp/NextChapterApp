import { Image, Pressable, View } from 'react-native';

import { AppText } from '../AppText';
import { AvatarProps } from './types';
import React from 'react';
import { styles } from './styles';

export function AppAvatar({
  name,
  uri,
  source,
  size = 48,
  onPress,
}: AvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .map(x => x[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : '';

  const avatar = (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {uri || source ? (
        <Image
          source={uri ? { uri } : source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <AppText variant="titleMediumBold" style={styles.initials}>
          {initials}
        </AppText>
      )}
    </View>
  );

  if (!onPress) {
    return avatar;
  }

  return <Pressable onPress={onPress}>{avatar}</Pressable>;
}
