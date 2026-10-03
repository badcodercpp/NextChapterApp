import { AppCard, AppExpandableText, AppIcon, AppText } from '@/components';
import {
  BarChart3,
  CircleDot,
  Clock3,
  RefreshCw,
  Star,
} from 'lucide-react-native';
import React, { useMemo } from 'react';
import { lazySelectTodayMission, selectActiveJourney } from '@/state/selectors';

import { View } from 'react-native';
import { properCase } from '@/utils/strings';
import { useSelector } from 'react-redux';

interface MissionOverviewCardProps {}

export function MissionOverviewCard({}: MissionOverviewCardProps) {
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
        <AppIcon icon={CircleDot} size={28} className="text-primary" />

        <AppText variant="xl" className="ml-3 text-primary">
          Mission Overview
        </AppText>
      </View>

      {/* Overview */}
      <AppExpandableText
        collapsedLines={3}
        text={todayMission?.overview}
        variant="lg"
        textClassName="mt-4 text-text"
      />

      {/* Metadata */}
      <View className="mt-4 flex-row justify-between">
        {/* Time */}
        <View className=" flex-1 items-center justify-center rounded-[38px] border border-border bg-surface p-2 py-4">
          <AppIcon icon={Clock3} size={24} className="text-primary" />
          <AppText variant="sm" className="mt-2 text-primary">
            Time
          </AppText>

          <AppText variant="sm" className="mt-2 text-text">
            {properCase(todayMission?.time)}
          </AppText>
        </View>

        {/* Difficulty */}
        <View className="ml-1 flex-1 items-center justify-center rounded-[38px] border border-border bg-surface p-2 py-4">
          <AppIcon icon={BarChart3} size={24} className="text-primary" />
          <AppText variant="sm" className="mt-2 text-primary">
            Difficulty
          </AppText>

          <AppText variant="sm" className="mt-2 text-text">
            {properCase(todayMission?.difficulty)}
          </AppText>
        </View>

        {/* Impact */}
        <View className="ml-1 flex-1 items-center justify-center rounded-[38px] border border-border bg-surface p-2 py-4">
          <AppIcon icon={Star} size={24} className="text-primary" />

          <AppText variant="sm" className="mt-2 text-primary">
            Impact
          </AppText>

          <AppText variant="sm" className="mt-2 text-text">
            {properCase(todayMission?.impact)}
          </AppText>
        </View>

        {/* Category */}
        <View className="ml-1 flex-1 items-center justify-center rounded-[38px] border border-border bg-surface p-2 py-4">
          <AppIcon icon={RefreshCw} size={24} className="text-primary" />

          <AppText variant="sm" className="mt-2 text-primary">
            Category
          </AppText>

          <AppText variant="sm" className="mt-2 text-center text-text">
            {properCase(todayMission?.category)}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
