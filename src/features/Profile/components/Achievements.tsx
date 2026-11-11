import { AppIcon, AppPressable, AppText } from '@/components';
import { ScrollView, View } from 'react-native';

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
          ? 'border-secondary bg-primary/25'
          : 'border-border bg-card'
      }`}
    >
      {/* Badge */}
      <View className="h-6 items-center justify-center">
        <AppIcon
          icon={AchievementItemIcon}
          size={22}
          strokeWidth={2.2}
          className={isFeatured ? 'text-white' : 'text-text'}
        />
      </View>

      {/* Title */}
      <AppText
        variant="sm"
        className="mt-1 text-center leading-5 text-text"
        numberOfLines={2}
      >
        {achievement.title}
      </AppText>

      {/* Date */}
      <AppText
        variant="xs"
        className="mt-1 text-center leading-4 text-text-muted"
        numberOfLines={1}
      >
        {timeAgo}
      </AppText>
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
        <AppText variant="lg" className="font-semibold text-text">
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
        contentContainerClassName="gap-3 px-1"
      >
        {(myAchievements || []).map((achievement, index) => (
          <AchievementItem
            key={achievement.id}
            achievement={achievement}
            isFeatured={index === 0}
            onPress={() => onAchievementPress?.(achievement)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
