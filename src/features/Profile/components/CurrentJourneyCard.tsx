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
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useResolveClassNames } from 'uniwind';

interface CurrentJourneyCardProps {
  onPress?: () => void;
}

export function CurrentJourneyCard({ onPress }: CurrentJourneyCardProps) {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const { data: activeJourney } = useSelector(selectActiveJourney);
  const { backgroundColor: accent } = useResolveClassNames('bg-secondary');

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
        overflow-hidden
        rounded-[24px]
        border border-secondary/40
        bg-card
        p-4
      "
    >
      <View pointerEvents="none" className="absolute inset-0">
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient
              id="profileJourneyBackground"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <Stop offset="0" stopColor={accent} stopOpacity={0.18} />
              <Stop offset="0.55" stopColor={accent} stopOpacity={0.04} />
              <Stop offset="1" stopColor={accent} stopOpacity={0.12} />
            </LinearGradient>
          </Defs>
          <Rect
            width="100%"
            height="100%"
            fill="url(#profileJourneyBackground)"
          />
        </Svg>
      </View>
      {/* Top Section */}
      <View className="flex-row items-center">
        {/* Journey Icon */}
        <View className="mr-3 h-14 w-14 items-center justify-center rounded-[18px] bg-primary/25">
          <AppIcon
            icon={Heart}
            size={32}
            strokeWidth={2.5}
            className="text-secondary"
          />
        </View>
        <View className="mr-3 h-14 w-px bg-border" />

        {/* Journey Details */}
        <View className="flex-1">
          <AppText variant="md" className="font-semibold text-secondary">
            Current Journey
          </AppText>

          <AppText
            variant="lg"
            className="mt-0 font-semibold text-text"
            numberOfLines={1}
          >
            {properCase(activeJourney?.program)}
          </AppText>

          <AppText variant="sm" className="mt-0.5 text-text-muted">
            {format(
              new Date(activeJourney?.startedAt?.toString() ?? Date.now()),
              'MMM dd, yyyy',
            )}
          </AppText>
        </View>

        {/* Arrow */}
        <AppIcon
          icon={ChevronRight}
          size={26}
          strokeWidth={2.5}
          className="text-text-muted"
        />
      </View>

      {/* Progress Header */}
      <View className="mt-4 flex-row items-center justify-between border-t border-border/80 pt-3">
        <AppText variant="sm" className="text-text-muted">
          Day {activeJourney?.currentDay} of{' '}
          {applicationConfig?.totalProgramDays}
        </AppText>

        <AppText variant="sm" className="font-semibold text-secondary">
          {progress}%
        </AppText>
      </View>

      {/* Progress Bar */}
      <View className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
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
