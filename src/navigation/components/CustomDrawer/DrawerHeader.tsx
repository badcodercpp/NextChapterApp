import { AppAvatar } from '@/components/foundation/AppAvatar';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { View } from 'react-native';
import { selectMe } from '@/state/selectors';
import { toHttpsURL } from '@/utils';
import { useSelector } from 'react-redux';

export function DrawerHeader() {
  const { data: me } = useSelector(selectMe);
  return (
    <View className="items-center py-6">
      <AppAvatar
        size="lg"
        name={me?.displayName ?? ''}
        uri={toHttpsURL(me?.avatarUrl) ?? undefined}
      />

      <AppText variant="xl" className="mt-3 mb-1">
        Good Evening 👋
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
