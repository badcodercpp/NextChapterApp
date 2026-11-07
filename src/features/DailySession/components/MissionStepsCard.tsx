import { AppCard, AppExpandableText, AppIcon, AppText } from '@/components';
import { CalendarCheck, List, ListChecks, Timer } from 'lucide-react-native';
import { RememberCard } from '@/features/CommonFeature';

import React from 'react';
import { View } from 'react-native';
import { selectTodayMission } from '@/state/selectors';
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
  const { data: todayMission } = useSelector(selectTodayMission);

  return (
    <AppCard className="overflow-hidden rounded-[28px] border border-primary-v2/30 bg-background-v2 p-4">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      {/* Header */}
      <View className="flex-row items-center">
        <View className="h-11 w-11 items-center justify-center rounded-[14px] bg-primary-v2/20">
          <AppIcon icon={List} size={26} className="text-link-v2" />
        </View>
        <View className="ml-3 flex-1 border-l border-primary-v2/40 pl-3">
          <AppText variant="lg" className="font-bold text-link-v2">
            What You Will Do
          </AppText>
          <AppText variant="sm" className="mt-1 text-text-muted-v2">
            A simple {todayMission?.steps?.length ?? 0}-step plan for today
          </AppText>
        </View>
      </View>

      {/* Steps */}
      <View className="mt-4">
        {(todayMission?.steps ?? []).map((step, index, steps) => (
          <View
            key={`${step.title}-${index}`}
            className="mb-4 flex-row items-start"
          >
            {index < steps.length - 1 && (
              <View className="absolute bottom-[-16px] left-3.5 top-8 w-px bg-primary-v2/60" />
            )}
            <View className="mt-4 h-7 w-7 items-center justify-center rounded-full border border-primary-v2 bg-selected-v2">
              <AppText variant="sm" className="font-semibold text-text-v2">
                {index + 1}
              </AppText>
            </View>
            <View className="ml-3 flex-1 flex-row items-center rounded-[22px] border border-primary-v2/30 bg-background-v2/40 p-3">
              <View className="h-11 w-11 items-center justify-center rounded-[14px] border border-primary-v2/25 bg-primary-v2/10">
                <AppIcon
                  icon={
                    index === 0
                      ? ListChecks
                      : index === 1
                      ? Timer
                      : CalendarCheck
                  }
                  size={27}
                  className="text-link-v2"
                />
              </View>
              <View className="ml-3 flex-1 border-l border-primary-v2/30 pl-3">
                <AppText variant="md" className="font-semibold text-text-v2">
                  {step.title}
                </AppText>
                <AppExpandableText
                  text={step.description}
                  collapsedLines={2}
                  variant="sm"
                  textClassName="mt-1 leading-5 text-text-muted-v2"
                  buttonTextClassName="text-link-v2"
                  showMoreText="Show more"
                  showLessText="Show less"
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Remember */}
      <RememberCard title={rememberTitle} message={rememberMessage} themed />
    </AppCard>
  );
}
