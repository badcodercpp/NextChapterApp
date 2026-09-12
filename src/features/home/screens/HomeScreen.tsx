import { AppAuthenticatedLayout, AppButton } from '@/components';
import { CalendarClock, ChevronRight } from 'lucide-react-native';
import {
  DailyAffirmationCard,
  QuickActionCardComponent,
  QuickActions,
  RecoveryScoreCard,
  TodaysFocusCard,
  TodaysMissionCard,
} from '../components';

import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { View } from 'react-native';

export function HomeScreen() {
  return (
    <AppAuthenticatedLayout>
      <AppText variant="xl">HomeScreen</AppText>
      <View>
        <RecoveryScoreCard score={8} trend={20} />
      </View>
      <View className="mt-4">
        <TodaysFocusCard
          focus={'Let go of what hurts, choose what heals.'}
          day={12}
          totalDays={90}
        />
      </View>
      <View className="mt-4">
        <TodaysMissionCard
          title="No Contact Challenge"
          description="Avoid checking your ex's profile or social media today."
          completed={0}
          total={1}
        />
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
        <DailyAffirmationCard
          title="Small steps every day lead to big changes."
          subtitle="You're stronger than you think."
          onPress={() => {
            // navigate / open insight
          }}
        />
      </View>
    </AppAuthenticatedLayout>
  );
}
