import {
  SessionOverviewCard,
  SessionReminderCard,
  StartSessionCard,
  TodayRecoveryCard,
  TodaysFocusCard,
} from '../components';

import { AppAuthenticatedLayout } from '@/components';
import { MoodSelector } from '@/features/CommonFeature';
import React from 'react';
import { View } from 'react-native';

export function DailySessionLandingScreen() {
  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-2">
        <TodayRecoveryCard />
      </View>
      <View className="mt-4">
        <TodaysFocusCard />
      </View>
      <View className="mt-4">
        <SessionOverviewCard />
      </View>
      <View className="mt-4">
        <MoodSelector
          title="Your current mood"
          subtitle="How are you feeling now ?"
        />
      </View>
      <View className="mt-4">
        <StartSessionCard />
      </View>
      <View className="mt-4">
        <SessionReminderCard />
      </View>
    </AppAuthenticatedLayout>
  );
}
