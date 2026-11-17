import { Crown, Moon, Sun } from 'lucide-react-native';
import { getGreetingKey, toHttpsURL } from '@/utils';

import { AppAvatar } from '@/components/foundation/AppAvatar';
import { AppIcon } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { View } from 'react-native';
import { selectMe } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export function DrawerHeader() {
  const { data: me } = useSelector(selectMe);
  const { t } = useTranslation();

  const hour = new Date().getHours();
  const isNight = hour >= 19 || hour < 5;

  return (
    <View className="items-center pb-3">
      <View className="rounded-full border-2 border-primary p-1">
        <AppAvatar
          size="md"
          name={me?.displayName ?? ''}
          uri={toHttpsURL(me?.avatarUrl) ?? undefined}
        />
      </View>

      <AppText variant="2xl" className="mt-1.5 font-bold text-text">
        {me?.displayName ?? ''}
      </AppText>

      <View className="mt-1.5 flex-row items-center rounded-full border border-primary/50 bg-primary/15 px-3 py-1">
        <AppIcon icon={Crown} size={14} className="text-primary" />
        <AppText variant="xs" className="ml-1.5 font-semibold text-text">
          Free Plan
        </AppText>
      </View>

      <View className="mt-2 flex-row items-center">
        <AppIcon
          icon={isNight ? Moon : Sun}
          size={22}
          className="text-primary"
        />
        <AppText variant="xl" className="ml-2 font-bold text-text">
          {t(getGreetingKey())}
        </AppText>
      </View>
    </View>
  );
}
