import { CalendarClock, ChevronRight } from 'lucide-react-native';
import {
  DailyAffirmationCard,
  QuickActionCardComponent,
  RecoveryScoreCard,
  TodaysFocusCard,
  TodaysMissionCard,
} from '../components';
import { ScrollView, View } from 'react-native';

import { AppButton } from '@/components';
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
      <View className="flex-1 px-4">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-1 pb-20">
            <AppText variant="xl">HomeScreen</AppText>
            <View>
              <RecoveryScoreCard score={8} trend={20} />
            </View>
            <View className="mt-4">
              <TodaysFocusCard
                focus={'Let go of what hurts,\nchoose what heals.'}
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
              <DailyAffirmationCard
                title="Small steps every day lead to big changes."
                subtitle="You're stronger than you think."
                onPress={() => {
                  // navigate / open insight
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
}
