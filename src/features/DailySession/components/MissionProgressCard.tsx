import { AppCard, AppIcon, AppPressable, AppText } from '@/components';

import { ChevronRight } from 'lucide-react-native';
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
    <AppCard className="rounded-[24px] border border-border bg-card p-4">
      <View className="flex-row items-center justify-between">
        <View>
          <AppPressable
            onPress={onWhyPress}
            className="flex-row items-center justify-between"
          >
            <AppText variant="xl" className="   text-primary">
              Your Progress
            </AppText>
          </AppPressable>
          <AppText variant="md" className="mt-2  text-text">
            <AppText variant="md" className=" text-text-secondary">
              {completed}
            </AppText>

            <AppText variant="md" className=" text-text">
              {' / '}
              {total} Completed
            </AppText>
          </AppText>
        </View>
        <View>
          <AppPressable onPress={onWhyPress} className="flex-row items-center">
            <AppText variant="lg" className=" text-primary">
              Why mission?
            </AppText>

            <AppIcon icon={ChevronRight} size={24} className="text-primary" />
          </AppPressable>
        </View>
      </View>

      <View className="mt-4 relative h-2 overflow-hidden rounded-full bg-border">
        <View
          className="absolute left-0 top-0 h-full rounded-full bg-primary"
          style={{
            width: `${Math.max(progress * 100, 0)}%`,
          }}
        />
      </View>
    </AppCard>
  );
}
