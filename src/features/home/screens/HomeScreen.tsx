import { AppAuthenticatedLayout, AppButton } from '@/components';
import { CalendarClock, ChevronRight } from 'lucide-react-native';
import {
  DailyAffirmationCard,
  QuickActionCardComponent,
  QuickActions,
  RecoveryScoreCard,
  TodaysQuestionCard,
} from '../components';

import { DailySessionRoutes } from '@/features/DailySession';
import React from 'react';
import { TabRoutes } from '@/navigation/Tab/TabRoutes';
import { TodaysMissionCard } from '@/features/CommonFeature';
import { View } from 'react-native';
import { useHomeBootstrap } from '@/features/home/hooks/useHomeBootstrap';
import { useTabNavigation } from '@/navigation/Tab/hooks/useTabNavigation';

export function HomeScreen() {
  const navigation = useTabNavigation();
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
          onPress={() =>
            navigation.navigate(TabRoutes.DailySessionTab, {
              screen: DailySessionRoutes.DailySessionLanding,
            })
          }
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
