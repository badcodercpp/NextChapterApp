import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { Check, Shield } from 'lucide-react-native';

import { View } from 'react-native';

interface TodaysMissionCardProps {
  title: string;
  description: string;
  completed: number;
  total: number;
  onPress?: () => void;
}

export function TodaysMissionCard({
  title,
  description,
  completed,
  total,
  onPress,
}: TodaysMissionCardProps) {
  const progress = total > 0 ? completed / total : 0;
  const isCompleted = completed >= total;

  return (
    <AppCard className="rounded-[28px] border border-primary/30 bg-card px-4 py-5">
      <View className="flex-row">
        {/* Content */}
        <View className="flex-1 pr-4">
          <AppText
            variant="sm"
            className="font-medium uppercase tracking-wide text-primary"
          >
            Today's Mission
          </AppText>

          <AppText
            variant="xl"
            className="mt-2 font-semibold text-text"
            numberOfLines={1}
          >
            {title}
          </AppText>

          <AppText
            variant="md"
            className="mt-1 leading-7 text-text-secondary"
            numberOfLines={2}
          >
            {description}
          </AppText>

          {/* Progress */}
          <View className="mt-4 flex-row items-center">
            <AppPressable
              onPress={onPress}
              disabled={!onPress}
              className="h-4 w-4 items-center justify-center rounded-full bg-primary"
            >
              <AppIcon
                icon={Check}
                size={17}
                className="text-white"
                strokeWidth={3}
              />
            </AppPressable>

            <View className="mx-3 flex-1">
              <View className="h-2 overflow-hidden rounded-full bg-primary/20">
                <View
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${Math.min(progress, 1) * 100}%`,
                  }}
                />
              </View>
            </View>

            <AppText variant="sm" className="text-text-secondary">
              {completed}/{total} {isCompleted ? 'Completed' : 'Completed'}
            </AppText>
          </View>
        </View>

        {/* Mission Icon */}
        <View className="h-16 w-16 items-center justify-center self-center rounded-full bg-primary/15">
          <AppIcon
            icon={Shield}
            size={30}
            className="text-primary"
            strokeWidth={2}
          />
        </View>
      </View>
    </AppCard>
  );
}
