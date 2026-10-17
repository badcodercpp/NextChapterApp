import { getGreetingKey, toHttpsURL } from '@/utils';

import { AppAvatar } from '@/components/foundation/AppAvatar';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { View } from 'react-native';
import { selectMe } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export function DrawerHeader() {
  const { data: me } = useSelector(selectMe);
  const { t } = useTranslation();

  return (
    <View className="items-center py-6">
      <AppAvatar
        size="lg"
        name={me?.displayName ?? ''}
        uri={toHttpsURL(me?.avatarUrl) ?? undefined}
      />

      <AppText variant="xl" className="mt-3 mb-1">
        {t(getGreetingKey())} 👋
      </AppText>

      <AppText variant="xl" className="mb-2">
        {me?.displayName ?? ''}
      </AppText>

      <AppText variant="md" className="text-center">
        Keep growing one day at a time 🌱
      </AppText>
    </View>
  );
}
