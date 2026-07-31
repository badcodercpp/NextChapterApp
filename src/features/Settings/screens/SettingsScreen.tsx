import { AppScreen } from '@/components/foundation/AppScreen';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';

export function SettingsScreen() {
  return (
    <AppScreen scroll horizontalPadding="md">
      <AppText variant="titleLargeBold">SettingsScreen</AppText>
    </AppScreen>
  );
}
