import { AppIcon, AppPressable, AppText } from '@/components';
import { ArrowRight, Crown } from 'lucide-react-native';

import React from 'react';
import { View } from 'react-native';

interface Props {
  onPress?: () => void;
}

export function DrawerPremiumCard({ onPress }: Props) {
  return (
    <AppPressable
      accessibilityRole="button"
      accessibilityLabel="Go Premium"
      onPress={onPress}
      className="mx-4 flex-row items-center rounded-3xl border border-primary/60 bg-primary/25 p-3"
    >
      <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary/40">
        <AppIcon icon={Crown} size={28} className="text-text" />
      </View>

      <View className="ml-3 flex-1">
        <AppText variant="lg" className="font-bold text-text">
          Go Premium
        </AppText>
        <AppText variant="xs" className="text-text-secondary">
          Unlock all journeys.
        </AppText>
      </View>

      <View className="ml-2 h-9 w-9 items-center justify-center rounded-full bg-white">
        <AppIcon icon={ArrowRight} size={18} className="text-primary" />
      </View>
    </AppPressable>
  );
}
