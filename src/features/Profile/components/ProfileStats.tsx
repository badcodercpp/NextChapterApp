import {
  AppIcon,
  AppPatternArtwork,
  AppPatternArtworkVariant,
  AppText,
} from '@/components';
import { CalendarDays, CircleCheck, Flame, Star } from 'lucide-react-native';
import { selectActiveJourney, selectMyRecovery } from '@/state/selectors';

import { View } from 'react-native';
import { useSelector } from 'react-redux';

interface ProfileStat {
  id: string;
  artwork: AppPatternArtworkVariant;
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
      artwork: 'grid',
      value: activeJourney?.currentDay ?? 1,
      label: 'Days',
      icon: CalendarDays,
    },
    {
      id: 'tasks-completed',
      artwork: 'rings',
      value: 48,
      label: 'Tasks Completed',
      icon: CircleCheck,
    },
    {
      id: 'day-streak',
      artwork: 'waves',
      value: activeJourney?.currentDay ?? 1,
      label: 'Day Streak',
      icon: Flame,
    },
    {
      id: 'recovery-score',
      artwork: 'sparkles',
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
          className="w-[48.5%] flex-row items-center overflow-hidden rounded-[20px] border border-primary-v2/20 bg-surface-v2 px-3 py-3.5"
        >
          <AppPatternArtwork variant={stat.artwork} />
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary-v2/15">
            <AppIcon
              icon={stat.icon}
              size={22}
              strokeWidth={2.2}
              className="text-link-v2"
            />
          </View>
          <View className="ml-3 flex-1">
            <AppText variant="xl" className="font-bold text-text-v2">
              {stat.value}
            </AppText>
            <AppText
              variant="sm"
              className="text-text-muted-v2"
              numberOfLines={2}
            >
              {stat.label}
            </AppText>
          </View>
        </View>
      ))}
    </View>
  );
}
