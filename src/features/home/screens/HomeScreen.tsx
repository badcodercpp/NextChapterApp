import { AppAuthenticatedLayout, AppButton } from '@/components';
import { CalendarClock, ChevronRight } from 'lucide-react-native';
import {
  DailyAffirmationCard,
  QuickActionCardComponent,
  RecoveryScoreCard,
  TodaysQuestionCard,
} from '../components';

import { HomeScreenLoader } from '@/components/foundation/AppContentLoader/HomeScreenLoader';
import React from 'react';
import { TodaysMissionCard } from '@/features/CommonFeature';
import { View } from 'react-native';
import { useHomeBootstrap } from '../hooks/useHomeBootstrap';
import { useStartDailySession } from '../hooks/useStartDailySession';
import { useTranslation } from 'react-i18next';

export function HomeScreen() {
  const { isBootstrapping } = useHomeBootstrap();

  const {
    startNewOrResumeCurrentDailySession,
    dailySessionMetadataProcessing,
  } = useStartDailySession();

  const { t } = useTranslation();

  return (
    <AppAuthenticatedLayout>
      {isBootstrapping ? (
        <>
          <HomeScreenLoader />
        </>
      ) : (
        <>
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
              title={t('app.locale.home.continueSession')}
              size="lg"
              leftIcon={CalendarClock}
              fullWidth
              className="mb-0"
              onPress={startNewOrResumeCurrentDailySession}
              rightIcon={ChevronRight}
              loading={dailySessionMetadataProcessing}
              disabled={dailySessionMetadataProcessing}
            />
          </View>

          <View className="mt-4">
            <QuickActionCardComponent />
          </View>

          <View className="mt-4">
            <DailyAffirmationCard />
          </View>
        </>
      )}
    </AppAuthenticatedLayout>
  );
}
