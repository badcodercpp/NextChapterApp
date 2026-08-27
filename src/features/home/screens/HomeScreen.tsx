import { AppScreen } from '@/components/foundation/AppScreen';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';

export function HomeScreen() {
  return (
    <AppScreen
      safeBottom={true}
      safeTop={false}
      className="flex-1 bg-background"
      contentClassName="flex-1 bg-background"
      safeArea={false}
    >
      <AppText variant="xl">HomeScreen</AppText>
    </AppScreen>
  );
}
