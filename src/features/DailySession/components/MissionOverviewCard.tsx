import { AppCard, AppExpandableText, AppIcon, AppText } from '@/components';
import {
  BarChart3,
  ClipboardCheck,
  Clock3,
  RefreshCw,
  Star,
  Target,
} from 'lucide-react-native';

import React from 'react';
import { View } from 'react-native';
import { properCase } from '@/utils/strings';
import { selectTodayMission } from '@/state/selectors';
import { useSelector } from 'react-redux';

export function MissionOverviewCard() {
  const { data: todayMission } = useSelector(selectTodayMission);
  const metadata = [
    { label: 'Time', icon: Clock3, value: todayMission?.time },
    { label: 'Difficulty', icon: BarChart3, value: todayMission?.difficulty },
    { label: 'Impact', icon: Star, value: todayMission?.impact },
    { label: 'Category', icon: RefreshCw, value: todayMission?.category },
  ];

  return (
    <AppCard className="overflow-hidden rounded-[28px] border border-primary-v2/40 bg-background-v2 p-4">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View
        pointerEvents="none"
        className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-primary-v2/15"
      />
      <View className="flex-row items-center">
        <View className="h-11 w-11 items-center justify-center rounded-[14px] border border-primary-v2/40 bg-primary-v2/20">
          <AppIcon icon={Target} size={28} className="text-link-v2" />
        </View>
        <AppText
          variant="lg"
          className="ml-3 flex-1 border-l border-primary-v2/40 pl-3 font-bold text-link-v2"
        >
          Mission Overview
        </AppText>
        <AppIcon
          icon={ClipboardCheck}
          size={36}
          className="ml-2 text-link-v2"
        />
      </View>

      <AppExpandableText
        collapsedLines={3}
        text={todayMission?.overview}
        variant="md"
        textClassName="mt-4 leading-6 text-text-v2"
        buttonClassName="mt-3 self-start"
        buttonTextClassName="font-semibold text-link-v2"
        showMoreText="Show more"
        showLessText="Show less"
      />

      <View className="mt-5 flex-row gap-2">
        {metadata.map(item => (
          <View
            key={item.label}
            className="min-w-0 flex-1 items-center rounded-[20px] border border-primary-v2/40 bg-background-v2/40 px-1 py-4"
          >
            <AppIcon icon={item.icon} size={28} className="text-link-v2" />
            <AppText
              variant="xs"
              numberOfLines={1}
              adjustsFontSizeToFit
              className="mt-2 w-full text-center font-medium text-text-v2"
            >
              {item.label}
            </AppText>
            <View
              className={`mt-3 w-full rounded-full px-1 py-1.5 ${
                item.label === 'Impact' ? 'bg-primary-v2' : 'bg-selected-v2'
              }`}
            >
              <AppText
                variant="xs"
                numberOfLines={1}
                adjustsFontSizeToFit
                className={`text-center font-semibold ${
                  item.label === 'Impact'
                    ? 'text-on-primary-v2'
                    : 'text-text-v2'
                }`}
              >
                {properCase(item.value)}
              </AppText>
            </View>
          </View>
        ))}
      </View>
    </AppCard>
  );
}
