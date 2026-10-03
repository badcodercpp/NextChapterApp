import { AppCard, AppIcon, AppNumberedList, AppText } from '@/components';
import { List, Sparkles } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { lazySelectTodayMission, selectActiveJourney } from '@/state/selectors';

import { View } from 'react-native';
import { useSelector } from 'react-redux';

export interface MissionStep {
  title: string;
  description: string;
  order?: number;
}

interface MissionStepsCardProps {
  rememberTitle?: string;
  rememberMessage?: string;
}

export function MissionStepsCard({
  rememberTitle = 'Remember',
  rememberMessage = 'Every time you choose yourself, you heal a little more.',
}: MissionStepsCardProps) {
  const { data: activeJourney } = useSelector(selectActiveJourney);

  const todayMissionSelector = useMemo(() => {
    return lazySelectTodayMission(
      activeJourney?.id ?? '',
      activeJourney?.currentDay ?? 1,
    );
  }, [activeJourney]);

  const { data: todayMission } = useSelector(todayMissionSelector);

  return (
    <AppCard className="rounded-[28px] border border-border bg-card p-5">
      {/* Header */}
      <View className="flex-row items-center">
        <AppIcon icon={List} size={24} className="text-primary" />

        <AppText variant="xl" className="ml-3 text-primary">
          What You Will Do
        </AppText>
      </View>

      {/* Steps */}
      <View className="mt-4">
        <AppNumberedList items={todayMission?.steps ?? []} />
      </View>

      {/* Remember */}
      <View className="mt-0 overflow-hidden rounded-[24px] border border-border bg-card p-4">
        <View className="flex-row">
          {/* Icon */}
          <View className="pt-1">
            <AppIcon icon={Sparkles} size={20} className="text-primary" />
          </View>

          {/* Text */}
          <View className="ml-4 flex-1">
            <AppText variant="lg" className="font-semibold text-primary">
              {rememberTitle}
            </AppText>

            <AppText variant="md" className="mt-1 leading-6 text-text">
              {rememberMessage}
            </AppText>
          </View>
        </View>
      </View>
    </AppCard>
  );
}
