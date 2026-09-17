import { AppIcon, AppPressable, AppText } from '@/components';
import { BookOpen, Check, Flame, Star, Trophy } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

interface Achievement {
  id: string;
  title: string;
  date: string;
  icon: typeof Check;
  iconColor: string;
  backgroundColor: string;
}

interface AchievementsProps {
  achievements?: Achievement[];
  onViewAllPress?: () => void;
  onAchievementPress?: (achievement: Achievement) => void;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'consistency',
    title: '10 Days\nConsistency',
    date: '10 May',
    icon: Trophy,
    iconColor: 'text-white',
    backgroundColor: 'bg-primary',
  },
  {
    id: 'first-mission',
    title: 'First Mission',
    date: '8 May',
    icon: Check,
    iconColor: 'text-white',
    backgroundColor: 'bg-emerald-500',
  },
  {
    id: 'journal',
    title: '5 Journal Entries',
    date: '7 May',
    icon: BookOpen,
    iconColor: 'text-white',
    backgroundColor: 'bg-cyan-500',
  },
  {
    id: 'streak',
    title: '7 Day Streak',
    date: '11 May',
    icon: Flame,
    iconColor: 'text-white',
    backgroundColor: 'bg-amber-500',
  },
  {
    id: 'self-reflector',
    title: 'Self Reflector',
    date: '11 May',
    icon: Star,
    iconColor: 'text-white',
    backgroundColor: 'bg-purple-500',
  },
];

function AchievementItem({
  achievement,
  onPress,
}: {
  achievement: Achievement;
  onPress?: () => void;
}) {
  return (
    <AppPressable
      onPress={onPress}
      className="mr-4 items-center border-1 border-border rounded-[16px] p-4"
    >
      {/* Badge */}
      <View
        className={`
          h-[40px]
          w-[40px]
          items-center
          justify-center
          rounded-[22px]
          ${achievement.backgroundColor}
        `}
      >
        <AppIcon
          icon={achievement.icon}
          size={24}
          strokeWidth={2.2}
          className={achievement.iconColor}
        />
      </View>

      {/* Title */}
      <AppText
        variant="sm"
        className="mt-2 text-center leading-5 text-text-secondary"
        numberOfLines={2}
      >
        {achievement.title}
      </AppText>

      {/* Date */}
      <AppText variant="xs" className="mt-1 text-text-muted">
        {achievement.date}
      </AppText>
    </AppPressable>
  );
}

export function Achievements({
  achievements = DEFAULT_ACHIEVEMENTS,
  onViewAllPress,
  onAchievementPress,
}: AchievementsProps) {
  return (
    <View className="w-full">
      {/* Header */}
      <View className="mb-4 flex-row items-center justify-between">
        <AppText variant="xl" className="font-semibold text-text">
          Achievements
        </AppText>

        <AppPressable onPress={onViewAllPress}>
          <AppText variant="md" className="font-medium text-secondary">
            View All
          </AppText>
        </AppPressable>
      </View>

      {/* Achievements */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-1 px-1"
      >
        {achievements.map(achievement => (
          <AchievementItem
            key={achievement.id}
            achievement={achievement}
            onPress={() => onAchievementPress?.(achievement)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
