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
  onPress,
}: {
  achievement: Achievement;
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
      className="mr-2 items-center border-1 border-border rounded-[16px] p-4 bg-card"
    >
      {/* Badge */}
      <View
        className={`
          h-[40px]
          w-[40px]
          items-center
          justify-center
          rounded-[22px]
        `}
      >
        <AppIcon icon={AchievementItemIcon} size={24} strokeWidth={2.2} />
      </View>

      {/* Title */}
      <AppText
        variant="md"
        className="mt-4 text-center text-text-secondary"
        numberOfLines={2}
      >
        {achievement.title}
      </AppText>

      {/* Date */}
      <AppText variant="xs" className="mt-1 text-text-muted">
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
      <View className="mb-2 flex-row items-center justify-between">
        <AppText variant="lg" className="font-semibold text-primary">
          Achievements
        </AppText>

        <AppPressable onPress={onViewAllPress}>
          <AppText variant="lg" className="font-medium text-secondary">
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
        {(myAchievements || []).map(achievement => (
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
