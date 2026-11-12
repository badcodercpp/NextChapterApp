import { AppIcon, AppText } from '@/components';
import { CalendarDays, CircleCheck, Flame, Star } from 'lucide-react-native';
import { selectActiveJourney, selectMyRecovery } from '@/state/selectors';

import { View } from 'react-native';
import { useSelector } from 'react-redux';

interface ProfileStat {
  id: string;
  value: string | number;
  label: string;
  icon: typeof CalendarDays;
}

interface ProfileStatsProps {}

export function ProfileStats({}: ProfileStatsProps) {
  const { data: activeJourney } = useSelector(selectActiveJourney);
  const { data: myRecovery } = useSelector(selectMyRecovery);

  const stats: ProfileStat[] = [
    {
      id: 'days-active',
      value: activeJourney?.currentDay ?? 1,
      label: 'Day',
      icon: CalendarDays,
    },
    {
      id: 'tasks-completed',
      value: 48,
      label: 'Tasks Completed',
      icon: CircleCheck,
    },
    {
      id: 'day-streak',
      value: activeJourney?.currentDay ?? 1,
      label: 'Day Streak',
      icon: Flame,
    },
    {
      id: 'recovery-score',
      value: myRecovery?.overallScore ?? 0,
      label: 'Recovery Score',
      icon: Star,
    },
  ];

  return (
    <View className="flex-row flex-wrap justify-between gap-y-3">
      {stats.map(stat => (
        <View
          key={stat.id}
          className="min-h-[128px] w-[48%] items-center justify-center rounded-[22px] border border-secondary/30 bg-card px-3 py-3"
        >
          {/* Icon */}
          <View className="mb-2 h-11 w-11 items-center justify-center rounded-[15px] bg-primary/15">
            <AppIcon
              icon={stat.icon}
              size={24}
              strokeWidth={2.2}
              className="text-secondary"
            />
          </View>

          {/* Value */}
          <AppText variant="2xl" className="font-bold leading-7 text-text">
            {stat.value}
          </AppText>

          {/* Label */}
          <AppText
            variant="sm"
            className="mt-1 min-h-10 text-center leading-5 text-text-secondary"
            numberOfLines={2}
          >
            {stat.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}
