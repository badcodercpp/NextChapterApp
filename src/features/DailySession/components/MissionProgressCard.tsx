import { AppCard, AppIcon, AppPressable, AppText } from '@/components';

import { ChartNoAxesColumnIncreasing, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

interface MissionProgressCardProps {
  completed?: number;
  total?: number;
  onWhyPress?: () => void;
}

export function MissionProgressCard({
  completed = 0,
  total = 1,
  onWhyPress,
}: MissionProgressCardProps) {
  const progress = total > 0 ? Math.min(Math.max(completed / total, 0), 1) : 0;

  return (
    <AppCard className="overflow-hidden rounded-[26px] border border-primary-v2/40 bg-background-v2 p-5">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View className="flex-row flex-wrap items-center justify-between gap-3">
        <View className="shrink">
          <AppPressable
            onPress={onWhyPress}
            className="flex-row items-center justify-between"
          >
            <AppIcon
              icon={ChartNoAxesColumnIncreasing}
              size={22}
              className="mr-2 text-link-v2"
            />
            <AppText variant="md" className="font-bold text-link-v2">
              Your Progress
            </AppText>
          </AppPressable>
          <AppText variant="lg" className="mt-2 font-bold text-text-v2">
            {completed} / {total} Completed
          </AppText>
        </View>
        <View>
          <AppPressable
            onPress={onWhyPress}
            className="flex-row items-center rounded-full border border-primary-v2/50 bg-primary-v2/10 px-3 py-2"
          >
            <AppText variant="sm" className="font-semibold text-link-v2">
              Why mission?
            </AppText>

            <AppIcon
              icon={ChevronRight}
              size={18}
              className="ml-1 text-link-v2"
            />
          </AppPressable>
        </View>
      </View>

      <View className="mt-5 relative h-2.5 overflow-hidden rounded-full bg-primary-v2/25">
        <View
          className="absolute left-0 top-0 h-full rounded-full bg-primary-v2"
          style={{
            width: `${Math.max(progress * 100, 0)}%`,
          }}
        />
      </View>
    </AppCard>
  );
}
