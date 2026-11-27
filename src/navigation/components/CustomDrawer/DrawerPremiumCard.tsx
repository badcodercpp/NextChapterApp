import { AppIcon, AppPressable, AppText } from '@/components';
import { ArrowRight, Crown } from 'lucide-react-native';

import React from 'react';
import { View } from 'react-native';
import { selectIsPremiumUser } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface Props {
  onPress?: () => void;
}

export function DrawerPremiumCard({ onPress }: Props) {
  const isPremium = useSelector(selectIsPremiumUser);
  const { t } = useTranslation();
  const label = t(
    isPremium ? 'app.locale.premium.upgrade' : 'app.locale.premium.go',
  );

  return (
    <AppPressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="mx-4 flex-row items-center rounded-3xl border border-primary/60 bg-primary/25 p-3"
    >
      <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary/40">
        <AppIcon icon={Crown} size={28} className="text-text" />
      </View>

      <View className="ml-3 flex-1">
        <AppText variant="lg" className="font-bold text-text">
          {label}
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
