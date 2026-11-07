import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import {
  lazySelectGetRecoveryScoreTrendForLastNDay,
  selectMe,
  selectMyRecovery,
} from '@/state/selectors';

import { Modal, Pressable } from 'react-native';
import { RANGE_OPTIONS } from '@/features/RecoveryProgress/constants';
import { RecoveryTrend } from './RecoveryTrend';
import { CalendarDays, ChevronDown, Info } from 'lucide-react-native';
import { getGreetingKey } from '@/utils';
import { View } from 'react-native';
import { properCase } from '@/utils/strings';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLazyGetRecoveryScoreTrendForLastNDayQuery } from '@/__generated__/graphql';

interface RecoveryScoreCardProps {}

export function RecoveryScoreCard({}: RecoveryScoreCardProps) {
  const [selectedDays, setSelectedDays] = useState(7);
  const [showTrendRanges, setShowTrendRanges] = useState(false);
  const { loading } = useSelector(selectMyRecovery);
  const { data: me } = useSelector(selectMe);
  const [loadRecoveryTrend] = useLazyGetRecoveryScoreTrendForLastNDayQuery();
  const selectGetRecoveryScoreTrendForLastNDay = useMemo(() => {
    return lazySelectGetRecoveryScoreTrendForLastNDay(selectedDays);
  }, [selectedDays]);

  const { data: recoveryScoreTrendForLastNDayData } = useSelector(
    selectGetRecoveryScoreTrendForLastNDay,
  );
  const recoveryScoreTrendForLastNDay = recoveryScoreTrendForLastNDayData.map(
    e => e.score ?? 0,
  );
  const selectedAssessments = recoveryScoreTrendForLastNDayData.filter(
    item => item.assessmentId !== null && item.score !== null,
  );
  const latestSelectedAssessment =
    selectedAssessments[selectedAssessments.length - 1];
  const selectedScore = latestSelectedAssessment?.score ?? 0;
  const firstSelectedScore = selectedAssessments[0]?.score;
  const selectedPeriodChange =
    selectedAssessments.length > 1 && firstSelectedScore != null
      ? selectedScore - firstSelectedScore
      : latestSelectedAssessment?.scoreChange ?? 0;
  const isScoreUp = selectedPeriodChange >= 0;

  const { t } = useTranslation();

  return (
    <AppCard className="overflow-hidden rounded-[28px] border border-primary-v2/30 bg-background-v2 p-4">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View
        pointerEvents="none"
        className="absolute -right-20 -top-24 h-48 w-48 rounded-full bg-primary-v2/10"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-primary-v2/10"
      />

      <AppText variant="sm" className="font-medium text-link-v2">
        {t(getGreetingKey())}, {me?.displayName?.split(' ')?.[0] ?? ''} 👋
      </AppText>
      <AppText
        variant="2xl"
        className="mb-4 mt-2 font-bold leading-8 text-text-v2"
      >
        {t('app.locale.home.recoveryScore.encouragement')}
      </AppText>
      {loading ? (
        <View className="gap-3 rounded-[22px] border border-border-v2 bg-background-v2/60 p-4">
          <View className="h-5 w-3/4 rounded-md bg-primary-v2/30" />
          <View className="h-4 w-full rounded-md bg-primary-v2/30" />
          <View className="mt-2 h-10 w-full rounded-xl bg-primary-v2/30" />
        </View>
      ) : (
        <View className="rounded-[22px] border border-primary-v2/30 bg-background-v2/70 p-3">
          <View className="flex-row flex-wrap items-center justify-between gap-2">
            <View className="flex-row items-center">
              <AppText
                variant="xs"
                className="font-semibold uppercase tracking-wide text-link-v2"
              >
                {t('app.locale.home.recoveryScore.scoreTitle')}
              </AppText>
              <AppIcon icon={Info} size={16} className="ml-1.5 text-link-v2" />
            </View>
            <AppPressable
              accessibilityRole="button"
              accessibilityLabel={`Select recovery trend range, currently ${selectedDays} days`}
              onPress={() => setShowTrendRanges(true)}
              className="flex-row items-center rounded-full border border-primary-v2/30 bg-primary-v2/10 px-2.5 py-1.5"
            >
              <AppIcon
                icon={CalendarDays}
                size={16}
                className="mr-1.5 text-link-v2"
              />
              <AppText variant="xs" className="text-text-v2">
                {selectedDays} Day Trend
              </AppText>
              <AppIcon
                icon={ChevronDown}
                size={14}
                className="ml-1 text-link-v2"
              />
            </AppPressable>
          </View>

          <View className="mt-3 flex-row items-center">
            <View className="mr-2 flex-1">
              <AppText
                variant="4xl"
                className="font-bold leading-tight text-text-v2"
              >
                {Math.round(selectedScore)}%
              </AppText>

              <View className="mt-2 self-start flex-row items-center rounded-xl bg-primary-v2/10 px-2 py-1.5">
                <AppText variant="sm" className="mr-1 text-link-v2">
                  {isScoreUp ? '↑' : '↓'}
                </AppText>
                <AppText variant="xs" className="shrink leading-4 text-link-v2">
                  {properCase(isScoreUp ? 'up' : 'down')}{' '}
                  {Math.round(Math.abs(selectedPeriodChange))}% over the last{' '}
                  {selectedDays} days
                </AppText>
              </View>
            </View>

            <View className="mr-3 h-24 w-[46%] justify-center">
              <RecoveryTrend
                data={recoveryScoreTrendForLastNDay}
                width={120}
                height={88}
              />
            </View>
          </View>
        </View>
      )}
      <Modal
        visible={showTrendRanges}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTrendRanges(false)}
      >
        <View className="flex-1 items-center justify-center px-8">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close trend range options"
            className="absolute inset-0 bg-black/50"
            onPress={() => setShowTrendRanges(false)}
          />
          <View className="w-full max-w-[320px] overflow-hidden rounded-2xl border border-border-v2 bg-surface-v2">
            <AppText
              variant="sm"
              className="border-b border-border-v2 px-4 py-3 font-semibold text-text-v2"
            >
              Choose trend range
            </AppText>
            {RANGE_OPTIONS.map(option => (
              <AppPressable
                key={option.days}
                accessibilityRole="button"
                accessibilityState={{ selected: selectedDays === option.days }}
                onPress={() => {
                  setSelectedDays(option.days);
                  setShowTrendRanges(false);
                  loadRecoveryTrend({ days: option.days });
                }}
                className={`px-4 py-3 ${
                  selectedDays === option.days ? 'bg-primary-v2/15' : ''
                }`}
              >
                <AppText
                  variant="sm"
                  className={
                    selectedDays === option.days
                      ? 'font-semibold text-primary-v2'
                      : 'text-text-v2'
                  }
                >
                  {option.days} Day Trend
                </AppText>
              </AppPressable>
            ))}
          </View>
        </View>
      </Modal>
    </AppCard>
  );
}
