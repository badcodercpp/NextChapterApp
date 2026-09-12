import { AppAvatar } from '@/components/foundation/AppAvatar';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { View } from 'react-native';

export function DrawerHeader() {
  return (
    <View className="items-center py-6">
      <AppAvatar size="lg" name="Ajay Jha" />

      <AppText variant="xl" className="mt-3 mb-1">
        Good Evening 👋
      </AppText>

      <AppText variant="xl" className="mb-2">
        Ajay Jha
      </AppText>

      <AppText variant="md" className="text-center">
        Keep growing one day at a time 🌱
      </AppText>
    </View>
  );
}
