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
  iconClassName: string;
  iconBackgroundClassName: string;
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
      iconClassName: 'text-primary',
      iconBackgroundClassName: 'bg-surface',
    },
    {
      id: 'tasks-completed',
      value: 48,
      label: 'Tasks Completed',
      icon: CircleCheck,
      iconClassName: 'text-primary',
      iconBackgroundClassName: 'bg-surface',
    },
    {
      id: 'day-streak',
      value: activeJourney?.currentDay ?? 1,
      label: 'Day Streak',
      icon: Flame,
      iconClassName: 'text-primary',
      iconBackgroundClassName: 'bg-surface',
    },
    {
      id: 'recovery-score',
      value: myRecovery?.overallScore ?? 0,
      label: 'Recovery Score',
      icon: Star,
      iconClassName: 'text-primary',
      iconBackgroundClassName: 'bg-surface',
    },
  ];
  return (
    <View className="flex-row gap-3">
      {stats.map(stat => (
        <View
          key={stat.id}
          className="flex-1 items-center rounded-[16px] border border-white/10 bg-white/[0.03] px-2 py-2"
        >
          {/* Icon */}
          <View
            className={`h-12 w-12 items-center justify-center rounded-full ${stat.iconBackgroundClassName}`}
          >
            <AppIcon
              icon={stat.icon}
              size={20}
              strokeWidth={2.5}
              className={stat.iconClassName}
            />
          </View>

          {/* Value */}
          <AppText variant="2xl" className="mt-2 font-bold text-text">
            {stat.value}
          </AppText>

          {/* Label */}
          <AppText
            variant="xs"
            className="mt-1 text-center text-text-muted"
            numberOfLines={2}
          >
            {stat.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}
