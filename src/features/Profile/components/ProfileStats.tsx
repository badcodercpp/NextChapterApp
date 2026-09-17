import { AppIcon, AppText } from '@/components';
import { CalendarDays, CircleCheck, Flame, Star } from 'lucide-react-native';

import { View } from 'react-native';

interface ProfileStat {
  id: string;
  value: string | number;
  label: string;
  icon: typeof CalendarDays;
  iconClassName: string;
  iconBackgroundClassName: string;
}

interface ProfileStatsProps {
  stats?: ProfileStat[];
}

const DEFAULT_STATS: ProfileStat[] = [
  {
    id: 'days-active',
    value: 12,
    label: 'Days Active',
    icon: CalendarDays,
    iconClassName: 'text-purple-400',
    iconBackgroundClassName: 'bg-purple-500/20',
  },
  {
    id: 'tasks-completed',
    value: 48,
    label: 'Tasks Completed',
    icon: CircleCheck,
    iconClassName: 'text-emerald-400',
    iconBackgroundClassName: 'bg-emerald-500/20',
  },
  {
    id: 'day-streak',
    value: 7,
    label: 'Day Streak',
    icon: Flame,
    iconClassName: 'text-amber-400',
    iconBackgroundClassName: 'bg-amber-500/20',
  },
  {
    id: 'recovery-score',
    value: 720,
    label: 'Recovery Score',
    icon: Star,
    iconClassName: 'text-cyan-400',
    iconBackgroundClassName: 'bg-cyan-500/20',
  },
];

export function ProfileStats({ stats = DEFAULT_STATS }: ProfileStatsProps) {
  return (
    <View className="flex-row gap-3">
      {stats.map(stat => (
        <View
          key={stat.id}
          className="flex-1 items-center rounded-[16px] border border-white/10 bg-white/[0.03] px-2 py-2"
        >
          {/* Icon */}
          <View
            className={`h-[32px] w-[32px] items-center justify-center rounded-full ${stat.iconBackgroundClassName}`}
          >
            <AppIcon
              icon={stat.icon}
              size={16}
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
