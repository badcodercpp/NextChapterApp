import { AppCard, AppText } from '@/components';
import {
  lazySelectGetRecoveryScoreTrendForLastNDay,
  selectMe,
  selectMyRecovery,
} from '@/state/selectors';

import { RecoveryTrend } from './RecoveryTrend';
import { getGreetingKey } from '@/utils';
import { View } from 'react-native';
import { properCase } from '@/utils/strings';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface RecoveryScoreCardProps {}

export function RecoveryScoreCard({}: RecoveryScoreCardProps) {
  const { data: myRecovery, loading } = useSelector(selectMyRecovery);
  const { data: me } = useSelector(selectMe);
  const selectGetRecoveryScoreTrendForLastNDay = useMemo(() => {
    return lazySelectGetRecoveryScoreTrendForLastNDay(7);
  }, []);

  const { data: recoveryScoreTrendForLastNDayData } = useSelector(
    selectGetRecoveryScoreTrendForLastNDay,
  );
  const recoveryScoreTrendForLastNDay = recoveryScoreTrendForLastNDayData.map(
    e => e.score ?? 0,
  );

  const { t } = useTranslation();

  return (
    <AppCard className="overflow-hidden rounded-[28px] border border-border-v2 bg-surface-v2 p-5">
      <View
        pointerEvents="none"
        className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary-v2/10"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-primary-v2/10"
      />

      <AppText variant="md" className="font-medium text-primary-v2">
        {t(getGreetingKey())}, {me?.displayName?.split(' ')?.[0] ?? ''} 👋
      </AppText>
      <AppText
        variant="3xl"
        className="mb-5 mt-2 font-bold leading-tight text-text-v2"
      >
        {t('app.locale.home.recoveryScore.encouragement')}
      </AppText>
      {loading ? (
        <View className="gap-3 rounded-3xl bg-selected-v2 p-4">
          <View className="h-5 w-3/4 rounded-md bg-primary-v2/30" />
          <View className="h-4 w-full rounded-md bg-primary-v2/30" />
          <View className="mt-2 h-10 w-full rounded-xl bg-primary-v2/30" />
        </View>
      ) : (
        <View className="rounded-3xl border border-primary-v2/30 bg-background-v2/60 px-5 py-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <AppText
                variant="sm"
                className="font-medium uppercase tracking-wide text-primary-v2"
              >
                {t('app.locale.home.recoveryScore.scoreTitle')}
              </AppText>

              <AppText
                variant="5xl"
                className="mt-1 font-bold leading-tight text-text-v2"
              >
                {myRecovery?.overallScore ?? 0}%
              </AppText>

              <AppText variant="sm" className="mt-1 text-primary-v2">
                ↑ {properCase(myRecovery?.trend?.toString()) ?? 'Up'}{' '}
                {myRecovery?.previousScore ?? myRecovery?.overallScore ?? 0}%{' '}
                {t('app.locale.home.recoveryScore.fromYesterday')}
              </AppText>
            </View>

            <View className="ml-3 items-end pt-1">
              <AppText variant="sm" className="text-primary-v2">
                {t('app.locale.home.recoveryScore.trend')}
              </AppText>

              <View className="mt-3 h-10 w-28">
                <RecoveryTrend data={recoveryScoreTrendForLastNDay} />
              </View>
            </View>
          </View>
        </View>
      )}
    </AppCard>
  );
}
