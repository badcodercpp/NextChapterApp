import {
  SessionOverviewCard,
  SessionReminderCard,
  StartSessionCard,
  TodaySessionOverviewCard,
  TodaysFocusCard,
} from '../components';

import { AppAuthenticatedLayout } from '@/components';
import { MoodSelector } from '@/features/CommonFeature';
import React from 'react';
import { View } from 'react-native';
import { useOptimisticSessionStartMoodUpdate } from '../hooks/useOptimisticSessionStartMoodUpdate';

export function DailySessionLandingScreen() {
  const { optimisticDailySessionStartMoods, updateDailySessionStartMoods } =
    useOptimisticSessionStartMoodUpdate();

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-2">
        <TodaySessionOverviewCard />
      </View>
      <View className="mt-4">
        <TodaysFocusCard />
      </View>
      <View className="mt-4">
        <SessionOverviewCard />
      </View>
      <View className="mt-4">
        <MoodSelector
          value={optimisticDailySessionStartMoods}
          setValue={updateDailySessionStartMoods}
          title="Your current mood"
          subtitle="How are you feeling now ?"
        />
      </View>
      <View className="mt-4">
        <StartSessionCard currentMood={optimisticDailySessionStartMoods} />
      </View>
      <View className="mt-4">
        <SessionReminderCard />
      </View>
    </AppAuthenticatedLayout>
  );
}
