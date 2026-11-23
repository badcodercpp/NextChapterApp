import {
  AppIcon,
  AppMountainArtwork,
  AppPressable,
  AppText,
} from '@/components';
import { ChevronRight, Heart } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import {
  selectActiveJourney,
  selectApplicationConfig,
} from '@/state/selectors';
import { useCallback, useMemo } from 'react';

import { View } from 'react-native';
import { format } from 'date-fns';
import { properCase } from '@/utils/strings';
import { useCSSVariable } from 'uniwind';
import { useSelector } from 'react-redux';

interface CurrentJourneyCardProps {
  onPress?: () => void;
}

export function CurrentJourneyCard({ onPress }: CurrentJourneyCardProps) {
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const { data: activeJourney } = useSelector(selectActiveJourney);
  const primary = useCSSVariable('--color-primary-v2');
  const accent = typeof primary === 'string' ? primary : '#7c3aed';

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
      className="overflow-hidden rounded-[24px] border border-primary-v2/20 bg-surface-v2 p-4"
    >
      <View pointerEvents="none" className="absolute inset-0">
        <Svg key={accent} width="100%" height="100%">
          <Defs>
            <LinearGradient
              id="profileJourneyBackground"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <Stop offset="0" stopColor={accent} stopOpacity={0.06} />
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
      <AppMountainArtwork variant="hills" className="bottom-12 h-20 w-3/5" />

      <View className="flex-row items-center">
        <View className="mr-4 h-16 w-16 items-center justify-center rounded-[18px] bg-primary-v2/15">
          <AppIcon
            icon={Heart}
            size={30}
            strokeWidth={2.2}
            className="text-link-v2"
          />
        </View>

        <View className="flex-1">
          <AppText variant="sm" className="font-semibold text-link-v2">
            Current Journey
          </AppText>
          <AppText
            variant="xl"
            className="font-bold text-text-v2"
            numberOfLines={1}
          >
            {properCase(activeJourney?.program)}
          </AppText>
          <AppText variant="sm" className="mt-0.5 text-text-muted-v2">
            {format(
              new Date(activeJourney?.startedAt?.toString() ?? Date.now()),
              'MMM dd, yyyy',
            )}
          </AppText>
        </View>

        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-v2/10">
          <AppIcon
            icon={ChevronRight}
            size={22}
            strokeWidth={2.4}
            className="text-text-v2"
          />
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-between border-t border-border-v2 pt-3">
        <AppText variant="sm" className="text-text-muted-v2">
          Day {activeJourney?.currentDay} of{' '}
          {applicationConfig?.totalProgramDays}
        </AppText>
        <AppText variant="sm" className="font-semibold text-link-v2">
          {progress}%
        </AppText>
      </View>

      <View className="mt-3 h-2.5 overflow-hidden rounded-full bg-primary-v2/15">
        <View
          className="h-full rounded-full bg-primary-v2"
          style={{
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
          }}
        />
      </View>
    </AppPressable>
  );
}
