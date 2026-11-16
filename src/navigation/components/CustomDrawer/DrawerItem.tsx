import { Pressable, View } from 'react-native';

import { AppIcon } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import { ChevronRight } from 'lucide-react-native';
import { DrawerItemProps } from './types';
import React from 'react';

export function DrawerItem({ item, focused, onPress }: DrawerItemProps) {
  const Icon = item.icon;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={item.title}
      className={
        focused
          ? 'mx-4 mb-1 flex-row items-center rounded-2xl border border-primary bg-primary/40 p-2'
          : 'mx-4 mb-1 flex-row items-center rounded-2xl border border-primary/25 bg-primary/10 p-2'
      }
    >
      <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
        <AppIcon icon={Icon} size={22} className="text-text" />
      </View>

      <AppText
        variant="lg"
        className={focused ? 'ml-3 flex-1 font-semibold' : 'ml-3 flex-1'}
      >
        {item.title}
      </AppText>

      <View className="pr-1">
        <AppIcon icon={ChevronRight} size={18} className="text-text" />
      </View>
    </Pressable>
  );
}
