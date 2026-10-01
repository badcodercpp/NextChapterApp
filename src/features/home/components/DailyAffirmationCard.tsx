import { AppCard, AppIcon, AppPressable, AppText } from '@/components';

import { Sparkles } from 'lucide-react-native';
import { View } from 'react-native';
import { selectMotivationalMessage } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface DailyAffirmationCardProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

export function DailyAffirmationCard({
  title = 'Small steps every day lead to big changes.',
  subtitle = "You're stronger than you think.",
  onPress,
}: DailyAffirmationCardProps) {
  const { data: motivationalMessage } = useSelector(selectMotivationalMessage);
  return (
    <AppPressable onPress={onPress}>
      <AppCard className="rounded-[24px] border-1 border-border bg-card p-5">
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
              {motivationalMessage?.title ?? title}
            </AppText>

            {subtitle && (
              <AppText
                variant="sm"
                className="mt-1 text-text-muted"
                numberOfLines={1}
              >
                {motivationalMessage?.description ?? subtitle}
              </AppText>
            )}
          </View>
        </View>
      </AppCard>
    </AppPressable>
  );
}
