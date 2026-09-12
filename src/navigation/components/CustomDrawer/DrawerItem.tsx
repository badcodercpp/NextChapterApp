import { Pressable, View } from 'react-native';

import { AppIcon } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import { ChevronRight } from 'lucide-react-native';
import { DrawerItemProps } from './types';
import React from 'react';
import { styles } from './styles';

export function DrawerItem({ item, focused, onPress }: DrawerItemProps) {
  const Icon = item.icon;

  return (
    <Pressable
      android_ripple={
        {
          // color: Theme.colors.primaryLight,
        }
      }
      onPress={onPress}
      style={[styles.item, focused && styles.activeItem]}
      className="border-border border-b-1"
    >
      <View style={styles.iconContainer}>
        <AppIcon icon={Icon} size={24} className="text-text" />
      </View>

      <AppText style={[styles.label, focused && styles.activeLabel]}>
        {item.title}
      </AppText>

      <View style={styles.iconContainer}>
        <AppIcon icon={ChevronRight} size={16} className="text-text" />
      </View>
    </Pressable>
  );
}
