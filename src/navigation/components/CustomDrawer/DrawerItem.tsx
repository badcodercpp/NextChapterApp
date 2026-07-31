import { Pressable, View } from 'react-native';

import { AppText } from '@/components/foundation/AppText';
import { DrawerItemProps } from './types';
import React from 'react';
import { Theme } from '@/theme';
import { styles } from './styles';

export function DrawerItem({ item, focused, onPress }: DrawerItemProps) {
  const Icon = item.icon;

  return (
    <Pressable
      android_ripple={{
        color: Theme.colors.primaryLight,
      }}
      onPress={onPress}
      style={[styles.item, focused && styles.activeItem]}
    >
      <View style={styles.iconContainer}>
        <Icon
          width={22}
          height={22}
          color={focused ? Theme.colors.primary : Theme.colors.textSecondary}
        />
      </View>

      <AppText style={[styles.label, focused && styles.activeLabel]}>
        {item.title}
      </AppText>
    </Pressable>
  );
}
