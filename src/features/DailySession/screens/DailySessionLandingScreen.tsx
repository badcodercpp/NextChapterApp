import React, { useState } from 'react';
import {
  SessionOverviewCard,
  SessionReminderCard,
  StartSessionCard,
  TodaySessionOverviewCard,
  TodaysFocusCard,
} from '../components';

import { AppAuthenticatedLayout } from '@/components';
import { MoodSelector } from '@/features/CommonFeature';
import { RecoveryReasonCurrentFeeling } from '@/__generated__/graphql';
import { View } from 'react-native';

export function DailySessionLandingScreen() {
  const [value, setValue] = useState<
    Array<RecoveryReasonCurrentFeeling | undefined>
  >([]);

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
          value={value}
          setValue={setValue}
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
