import { AppCard, AppText } from '@/components';
import {
  selectMe,
  selectMyRecovery,
  selectRecoveryScoreTrendForLastNDays,
} from '@/state/selectors';

import { RecoveryTrend } from './RecoveryTrend';
import { View } from 'react-native';
import { properCase } from '@/utils/strings';
import { useSelector } from 'react-redux';

interface RecoveryScoreCardProps {}

export function RecoveryScoreCard({}: RecoveryScoreCardProps) {
  const { data: me } = useSelector(selectMe);
  const { data: myRecovery, loading } = useSelector(selectMyRecovery);
  const { data: recoveryScoreTrendForLastNDays } = useSelector(
    selectRecoveryScoreTrendForLastNDays,
  );

  return (
    <AppCard className="overflow-hidden rounded-[24px] border-1 border-border bg-card p-5">
      <View className="flex-row mb-2 items-center">
        <AppText variant="md" className="text-primary mr-0.5">
          Good Morning, {me?.displayName ?? ''}{' '}
        </AppText>
        <AppText variant="2xl" className="text-primary mr-1">
          👋{' '}
        </AppText>
      </View>
      <AppText variant="3xl" className="text-text mb-4">
        You've got this.{'\n'}One step at a time.
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
                Recovery Score
              </AppText>

              <AppText
                variant="5xl"
                className="mt-2 font-semibold leading-none text-text"
              >
                {myRecovery?.overallScore ?? 0}%
              </AppText>

              <AppText variant="sm" className="mt-2 text-primary">
                ↑ {properCase(myRecovery?.trend?.toString()) ?? 'Up'}{' '}
                {myRecovery?.previousScore ?? myRecovery?.overallScore ?? 0}%
                from yesterday
              </AppText>
            </View>

            <View className="items-end pt-3">
              <AppText variant="sm" className="text-primary">
                7 Day Trend
              </AppText>

              {/* Trend graph will go here */}
              <View className="mt-3 h-10 w-28">
                <RecoveryTrend data={recoveryScoreTrendForLastNDays} />
              </View>
            </View>
          </View>
        </AppCard>
      )}
    </AppCard>
  );
}
