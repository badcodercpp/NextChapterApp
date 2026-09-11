import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { ChevronRight, Sparkles } from 'lucide-react-native';

import { View } from 'react-native';

interface DailyAffirmationCardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export function DailyAffirmationCard({
  title,
  subtitle,
  onPress,
}: DailyAffirmationCardProps) {
  return (
    <AppPressable onPress={onPress}>
      <AppCard className="rounded-[28px] border border-primary/30 bg-card p-4">
        <View className="flex-row items-center">
          {/* Icon */}
          <View className="mr-4">
            <AppIcon
              icon={Sparkles}
              size={30}
              className="text-secondary"
              strokeWidth={2}
            />
          </View>

          {/* Content */}
          <View className="flex-1">
            <AppText
              variant="md"
              className="font-semibold text-text"
              numberOfLines={2}
            >
              {title}
            </AppText>

            {subtitle && (
              <AppText
                variant="sm"
                className="mt-1 text-text-muted"
                numberOfLines={1}
              >
                {subtitle}
              </AppText>
            )}
          </View>

          {/* Arrow */}
          <View className="ml-3">
            <AppIcon
              icon={ChevronRight}
              size={26}
              className="text-text-muted"
              strokeWidth={2.5}
            />
          </View>
        </View>
      </AppCard>
    </AppPressable>
  );
}
