import { AppAuthenticatedLayout, AppButton } from '@/components';
import { CalendarClock, ChevronRight } from 'lucide-react-native';
import {
  DailyAffirmationCard,
  QuickActionCardComponent,
  QuickActions,
  RecoveryScoreCard,
  TodaysMissionCard,
  TodaysQuestionCard,
} from '../components';

import React from 'react';
import { View } from 'react-native';
import { useHomeBootstrap } from '@/features/home/hooks/useHomeBootstrap';

export function HomeScreen() {
  useHomeBootstrap();

  return (
    <AppAuthenticatedLayout>
      <View className="mt-2">
        <RecoveryScoreCard />
      </View>
      <View className="mt-4">
        <TodaysQuestionCard />
      </View>
      <View className="mt-4">
        <TodaysMissionCard />
      </View>

      <View className="mt-4">
        <AppButton
          title="Continue Daily Session"
          size="lg"
          leftIcon={CalendarClock}
          fullWidth
          className="mb-0"
          onPress={() => {}}
          rightIcon={ChevronRight}
        />
      </View>

      <View className="mt-4">
        <QuickActionCardComponent />
      </View>

      <View className="mt-4">
        <QuickActions />
      </View>

      <View className="mt-4">
        <DailyAffirmationCard />
      </View>
    </AppAuthenticatedLayout>
  );
}
