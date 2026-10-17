import { AppCard, AppText } from '@/components';
import {
  lazySelectGetRecoveryScoreTrendForLastNDay,
  selectMe,
  selectMyRecovery,
} from '@/state/selectors';

import { RecoveryTrend } from './RecoveryTrend';
import { View } from 'react-native';
import { getGreetingKey } from '@/utils';
import { properCase } from '@/utils/strings';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface RecoveryScoreCardProps {}

export function RecoveryScoreCard({}: RecoveryScoreCardProps) {
  const { data: me } = useSelector(selectMe);
  const { data: myRecovery, loading } = useSelector(selectMyRecovery);
  const selectGetRecoveryScoreTrendForLastNDay = useMemo(() => {
    return lazySelectGetRecoveryScoreTrendForLastNDay(7);
  }, []);

  const { data: recoveryScoreTrendForLastNDayData } = useSelector(
    selectGetRecoveryScoreTrendForLastNDay,
  );
  const recoveryScoreTrendForLastNDay = recoveryScoreTrendForLastNDayData.map(
    e => e.score ?? 0,
  );
  console.log(
    'recoveryScoreTrendForLastNDay',
    recoveryScoreTrendForLastNDay,
    recoveryScoreTrendForLastNDayData,
  );
  const { t } = useTranslation();

  return (
    <AppCard className="overflow-hidden rounded-[24px] border-1 border-border bg-card p-5">
      <View className="flex-row mb-2 items-center">
        <AppText variant="md" className="text-primary mr-0.5">
          {t(getGreetingKey())}, {me?.displayName ?? ''}{' '}
        </AppText>
        <AppText variant="2xl" className="text-primary mr-1">
          👋{' '}
        </AppText>
      </View>
      <AppText variant="3xl" className="text-text mb-4">
        {t('app.locale.home.recoveryScore.encouragement')}
      </AppText>
      {loading ? (
        <View className="gap-3 rounded-2xl bg-surface p-4">
          <View className="h-5 w-3/4 rounded-md bg-primary animate-pulse" />
          <View className="h-4 w-full rounded-md bg-primary animate-pulse" />
          <View className="mt-2 h-10 w-full rounded-xl bg-primary animate-pulse" />
        </View>
      ) : (
        <AppCard className="overflow-hidden rounded-[28px] border-1 border-border bg-card px-4 py-4">
          <View className="flex-row items-start justify-between">
            <View>
              <AppText
                variant="sm"
                className="font-medium uppercase tracking-wide text-primary"
              >
                {t('app.locale.home.recoveryScore.scoreTitle')}
              </AppText>

              <AppText
                variant="5xl"
                className="mt-2 font-semibold leading-none text-text"
              >
                {myRecovery?.overallScore ?? 0}%
              </AppText>

              <AppText variant="sm" className="mt-2 text-primary">
                ↑ {properCase(myRecovery?.trend?.toString()) ?? 'Up'}{' '}
                {myRecovery?.previousScore ?? myRecovery?.overallScore ?? 0}%{' '}
                {t('app.locale.home.recoveryScore.fromYesterday')}
              </AppText>
            </View>

            <View className="items-end pt-3">
              <AppText variant="sm" className="text-primary">
                {t('app.locale.home.recoveryScore.trend')}
              </AppText>

              {/* Trend graph will go here */}
              <View className="mt-3 h-10 w-28">
                <RecoveryTrend data={recoveryScoreTrendForLastNDay} />
              </View>
            </View>
          </View>
        </AppCard>
      )}
    </AppCard>
  );
}
