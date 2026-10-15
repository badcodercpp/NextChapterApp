import { AppIcon, AppPressable, AppText } from '@/components';
import { ChevronRight, Heart } from 'lucide-react-native';
import {
  selectActiveJourney,
  selectApplicationConfig,
} from '@/state/selectors';
import { useCallback, useMemo } from 'react';

import { View } from 'react-native';
import { format } from 'date-fns';
import { properCase } from '@/utils/strings';
import { useSelector } from 'react-redux';

interface CurrentJourneyCardProps {
  onPress?: () => void;
}

export function CurrentJourneyCard({ onPress }: CurrentJourneyCardProps) {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const { data: activeJourney } = useSelector(selectActiveJourney);

  const calculateProgress = useCallback(() => {
    if (!activeJourney || !applicationConfig) {
      return 0;
    }

    const totalDays = applicationConfig.totalProgramDays;
    const currentDay = activeJourney.currentDay;

    return Math.round((currentDay / totalDays) * 100);
  }, [activeJourney, applicationConfig]);

  const progress = useMemo(() => calculateProgress(), [calculateProgress]);

  return (
    <AppPressable
      onPress={onPress}
      className="
        rounded-[24px]
        border
        border-border
        bg-card
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
          <AppText variant="lg" className="font-semibold text-secondary">
            Current Journey
          </AppText>

          <AppText
            variant="xl"
            className="mt-0 font-semibold text-text"
            numberOfLines={1}
          >
            {properCase(activeJourney?.program)}
          </AppText>

          <AppText variant="md" className="mt-0.5 text-text-muted">
            {format(
              new Date(activeJourney?.startedAt?.toString() ?? Date.now()),
              'MMM dd, yyyy',
            )}
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
          Day {activeJourney?.currentDay} of{' '}
          {applicationConfig?.totalProgramDays}
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
