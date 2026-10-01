import { AppIcon, AppPressable, AppText } from '@/components';
import { ChevronRight, Heart } from 'lucide-react-native';

import { View } from 'react-native';
import { selectApplicationConfig } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface CurrentJourneyCardProps {
  title?: string;
  journeyName?: string;
  startedDate?: string;
  currentDay?: number;
  totalDays?: number;
  progress?: number;
  onPress?: () => void;
}

export function CurrentJourneyCard({
  title = 'Current Journey',
  journeyName = 'Breakup Recovery',
  startedDate = 'Started on 30 Apr 2025',
  currentDay = 12,
  progress = 13,
  onPress,
}: CurrentJourneyCardProps) {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);

  return (
    <AppPressable
      onPress={onPress}
      className="
        rounded-[26px]
        border
        border-secondary/40
        bg-card/60
        p-4
      "
    >
      {/* Top Section */}
      <View className="flex-row items-center">
        {/* Journey Icon */}
        <View className="mr-5 h-10 w-10 items-center justify-center rounded-[25px] bg-primary">
          <AppIcon
            icon={Heart}
            size={24}
            strokeWidth={2.5}
            className="text-white"
          />
        </View>

        {/* Journey Details */}
        <View className="flex-1">
          <AppText variant="md" className="font-semibold text-secondary">
            {title}
          </AppText>

          <AppText
            variant="xl"
            className="mt-1 font-semibold text-text"
            numberOfLines={1}
          >
            {journeyName}
          </AppText>

          <AppText variant="md" className="mt-0.5 text-text-muted">
            {startedDate}
          </AppText>
        </View>

        {/* Arrow */}
        <AppIcon
          icon={ChevronRight}
          size={24}
          strokeWidth={2.5}
          className="text-text-muted"
        />
      </View>

      {/* Progress Header */}
      <View className="mt-6 flex-row items-center justify-between">
        <AppText variant="md" className="text-text-muted">
          Day {currentDay} of {applicationConfig?.totalProgramDays}
        </AppText>

        <AppText variant="md" className="font-semibold text-secondary">
          {progress}%
        </AppText>
      </View>

      {/* Progress Bar */}
      <View className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
        <View
          className="h-full rounded-full bg-primary"
          style={{
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
          }}
        />
      </View>
    </AppPressable>
  );
}
