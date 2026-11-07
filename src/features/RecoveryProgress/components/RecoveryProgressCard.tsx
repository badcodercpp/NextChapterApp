import { AppIcon, AppText } from '@/components';
import {
  selectActiveJourney,
  selectApplicationConfig,
  selectMe,
} from '@/state/selectors';
import { useCallback, useMemo } from 'react';

import { PieChart } from 'react-native-gifted-charts';
import { CalendarDays } from 'lucide-react-native';
import { View } from 'react-native';
import { cn } from '@/utils';
import { useResolveClassNames } from 'uniwind';
import { useSelector } from 'react-redux';

interface RecoveryProgressCardProps {
  message?: string;
  className?: string;
}

const RING_RADIUS = 42;
const RING_WIDTH = 12;

function RecoveryProgressChartLabel({ progress }: { progress: number }) {
  return (
    <View className="items-center justify-center">
      <AppText variant="md" className="font-bold text-link-v2">
        {progress}%
      </AppText>

      <AppText variant="xs" className="mt-1 text-text-muted-v2">
        Overall
      </AppText>
    </View>
  );
}

export function RecoveryProgressCard({
  message = "Healing isn't linear, but every step forward matters. Keep going!",
  className,
}: RecoveryProgressCardProps) {
  const { data: me } = useSelector(selectMe);
  const { data: applicationConfig } = useSelector(selectApplicationConfig);
  const { data: activeJourney } = useSelector(selectActiveJourney);

  const calculateProgress = useCallback(() => {
    if (!activeJourney || !applicationConfig) {
      return 0;
    }

    const totalDays = applicationConfig.totalProgramDays;
    const currentDay = activeJourney.currentDay;

    return totalDays > 0
      ? Math.min(100, Math.max(0, Math.round((currentDay / totalDays) * 100)))
      : 0;
  }, [activeJourney, applicationConfig]);

  const progress = useMemo(() => calculateProgress(), [calculateProgress]);

  const remaining = 100 - progress;
  const { backgroundColor: chartBackgroundColor } =
    useResolveClassNames('bg-background-v2');
  const { backgroundColor: chartRadiusPrimaryColor } =
    useResolveClassNames('bg-primary-v2');
  const { backgroundColor: chartRadiusSecondaryColor } =
    useResolveClassNames('bg-selected-v2');

  return (
    <View
      className={cn(
        'relative w-full overflow-hidden',
        'rounded-[26px]',
        'border border-primary-v2/30',
        'bg-background-v2',
        'p-4',
        className,
      )}
    >
      <View
        pointerEvents="none"
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-v2/10"
      />
      <View className="flex-row items-center">
        {/* Progress Ring */}
        <View className="items-center justify-center">
          <View className="items-center justify-center">
            <PieChart
              donut
              radius={RING_RADIUS}
              innerRadius={RING_RADIUS - RING_WIDTH}
              backgroundColor={chartBackgroundColor?.toString()}
              data={[
                {
                  value: progress,
                  color: chartRadiusPrimaryColor?.toString(),
                },
                {
                  value: remaining,
                  color: chartRadiusSecondaryColor?.toString(),
                },
              ]}
              // eslint-disable-next-line react/no-unstable-nested-components
              centerLabelComponent={() => (
                <RecoveryProgressChartLabel progress={progress} />
              )}
            />
          </View>
        </View>

        {/* Content */}
        <View className="ml-3 flex-1">
          {/* Heading */}
          <AppText variant="lg" className="font-bold leading-6 text-text-v2">
            You're doing incredible, {me?.displayName}!
          </AppText>

          {/* Description */}
          <AppText variant="sm" className="mt-2 leading-5 text-text-muted-v2">
            {message}
          </AppText>
        </View>
      </View>
      {/* Day Progress */}
      <View
        className="
              mt-4
              flex-row
              items-center
              rounded-[18px]
              border
              border-primary-v2/25
              bg-primary-v2/10
              p-3
            "
      >
        <View className="mr-3">
          <AppIcon
            icon={CalendarDays}
            size={24}
            className="text-link-v2"
            strokeWidth={1.5}
          />
        </View>

        <View className="flex-1">
          <AppText variant="md" className="font-semibold text-link-v2">
            Day {activeJourney?.currentDay} of{' '}
            {applicationConfig?.totalProgramDays}
          </AppText>

          <AppText variant="xs" className="mt-1 text-text-muted-v2">
            Keep showing up for yourself.
          </AppText>
        </View>
      </View>
    </View>
  );
}
