import { AppIcon, AppText } from '@/components';
import { CalendarDays, Flame, Star } from 'lucide-react-native';
import { selectActiveJourney, selectMyRecovery } from '@/state/selectors';

import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

export function DrawerStats() {
  const { data: activeJourney } = useSelector(selectActiveJourney);
  const { data: myRecovery } = useSelector(selectMyRecovery);

  const stats = [
    {
      id: 'days',
      icon: CalendarDays,
      value: activeJourney?.currentDay ?? 1,
      label: 'Days',
    },
    {
      id: 'streak',
      icon: Flame,
      value: activeJourney?.currentDay ?? 1,
      label: 'Day Streak',
    },
    {
      id: 'recovery',
      icon: Star,
      value: myRecovery?.overallScore ?? 0,
      label: 'Recovery',
    },
  ];

  return (
    <View className="mx-4 flex-row rounded-3xl border border-primary/40 bg-primary/15 py-2">
      {stats.map((stat, index) => (
        <View
          key={stat.id}
          className={
            index > 0
              ? 'flex-1 items-center border-l border-primary/30'
              : 'flex-1 items-center'
          }
        >
          <AppIcon icon={stat.icon} size={22} className="text-primary" />
          <AppText variant="xl" className="mt-1 font-bold text-text">
            {stat.value}
          </AppText>
          <AppText variant="xs" className="text-text-secondary">
            {stat.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}
