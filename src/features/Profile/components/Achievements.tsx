import { AppIcon, AppPressable, AppText } from '@/components';
import { ScrollView, View } from 'react-native';

import { ChevronRight, Lock, Trophy } from 'lucide-react-native';
import { MyAchievementsQuery } from '@/__generated__/graphql';
import { formatDistanceToNowStrict } from 'date-fns';
import { getAchievementTypeIcon } from '@/utils';
import { selectMyAchievements } from '@/state/selectors';
import { useSelector } from 'react-redux';

type Achievement = MyAchievementsQuery['myAchievements'][0];

interface AchievementsProps {
  achievements?: Achievement[];
  onViewAllPress?: () => void;
  onAchievementPress?: (achievement: Achievement) => void;
}

function AchievementItem({
  achievement,
  isFeatured,
  onPress,
}: {
  achievement: Achievement;
  isFeatured: boolean;
  onPress?: () => void;
}) {
  const timeAgo = formatDistanceToNowStrict(
    new Date(achievement?.unlockedAt?.toString() ?? Date.now()),
    {
      addSuffix: true,
    },
  );
  const AchievementItemIcon = getAchievementTypeIcon(achievement.type);
  return (
    <AppPressable
      onPress={onPress}
      className={`h-[112px] w-[136px] items-center justify-center rounded-[18px] border px-2 py-2 ${
        isFeatured
          ? 'border-primary-v2 bg-primary-v2/15'
          : 'border-primary-v2/20 bg-surface-v2'
      }`}
    >
      {/* Badge */}
      <View className="h-6 items-center justify-center">
        {achievement.unlocked && (
          <AppIcon
            icon={AchievementItemIcon}
            size={22}
            strokeWidth={2.2}
            className={
              achievement.unlocked
                ? isFeatured
                  ? 'text-link-v2'
                  : 'text-text-v2'
                : 'text-text-muted-v2 opacity-40'
            }
          />
        )}

        {!achievement.unlocked && (
          <AppIcon
            icon={Lock}
            size={22}
            strokeWidth={2.5}
            className="text-text-v2"
          />
        )}
      </View>

      {/* Title */}
      <AppText
        variant="sm"
        className="mt-1 text-center font-semibold leading-5 text-text-v2"
        numberOfLines={2}
      >
        {achievement.title}
      </AppText>

      {/* Date / Locked */}
      {achievement.unlocked && (
        <AppText
          variant="xs"
          className="mt-1 text-center leading-4 text-text-muted-v2"
          numberOfLines={1}
        >
          {timeAgo}
        </AppText>
      )}
    </AppPressable>
  );
}

export function Achievements({
  onViewAllPress,
  onAchievementPress,
}: AchievementsProps) {
  const { data: myAchievements } = useSelector(selectMyAchievements);

  return (
    <View className="w-full">
      {/* Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <AppIcon icon={Trophy} size={22} className="text-link-v2" />
          <AppText variant="lg" className="font-semibold text-text-v2">
            Achievements
          </AppText>
        </View>

        <AppPressable
          onPress={onViewAllPress}
          className="flex-row items-center gap-0.5"
        >
          <AppText variant="md" className="font-semibold text-link-v2">
            View All
          </AppText>
          <AppIcon icon={ChevronRight} size={18} className="text-link-v2" />
        </AppPressable>
      </View>

      {/* Achievements */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 px-1"
      >
        {(myAchievements || []).map((achievement, index) => (
          <AchievementItem
            key={`achievement_${index}_${achievement.id}`}
            achievement={achievement}
            isFeatured={index === 0}
            onPress={() => onAchievementPress?.(achievement)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
