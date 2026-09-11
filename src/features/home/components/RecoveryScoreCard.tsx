import { AppCard, AppText } from '@/components';

import { RecoveryTrend } from './RecoveryTrend';
import { View } from 'react-native';

interface RecoveryScoreCardProps {
  score: number;
  trend: number;
}

export function RecoveryScoreCard({ score, trend }: RecoveryScoreCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[28px] border border-primary bg-card px-4 py-4">
      <View className="flex-row mb-2 items-center">
        <AppText variant="md" className="text-primary mr-0.5">
          Good Morning, AJ{' '}
        </AppText>
        <AppText variant="2xl" className="text-primary mr-1">
          👋{' '}
        </AppText>
      </View>
      <AppText variant="3xl" className="text-text mb-4">
        You've got this.{'\n'}One step at a time.
      </AppText>
      <AppCard className="overflow-hidden rounded-[28px] border border-primary/30 bg-card px-4 py-4">
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
              {score}%
            </AppText>

            <AppText variant="sm" className="mt-2 text-primary">
              ↑ Up {trend}% from yesterday
            </AppText>
          </View>

          <View className="items-end pt-3">
            <AppText variant="sm" className="text-primary">
              7 Day Trend
            </AppText>

            {/* Trend graph will go here */}
            <View className="mt-3 h-10 w-28">
              <RecoveryTrend data={[48, 52, 53, 59, 61, 65, 68]} />
            </View>
          </View>
        </View>
      </AppCard>
    </AppCard>
  );
}
