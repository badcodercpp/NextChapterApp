import { AppIcon, AppText } from '@/components';
import { selectApplicationConfig, selectMe } from '@/state/selectors';

import { PieChart } from 'react-native-gifted-charts';
import { Triangle } from 'lucide-react-native';
import { View } from 'react-native';
import { cn } from '@/utils';
import { useResolveClassNames } from 'uniwind';
import { useSelector } from 'react-redux';

interface RecoveryProgressCardProps {
  overallScore: number;
  name?: string;
  currentDay: number;
  totalDays?: number;
  message?: string;
  className?: string;
}

const RING_RADIUS = 42;
const RING_WIDTH = 12;

function RecoveryProgressChartLabel({ progress }: { progress: number }) {
  return (
    <View className="items-center justify-center">
      <AppText variant="xs" className="font-medium leading-none text-primary">
        {progress}%
      </AppText>

      <AppText variant="xs" className="mt-1 text-text-muted">
        Overall
      </AppText>
    </View>
  );
}

export function RecoveryProgressCard({
  overallScore,
  currentDay,
  message = "Healing isn't linear, but every step forward matters. Keep going!",
  className,
}: RecoveryProgressCardProps) {
  const { data: me } = useSelector(selectMe);
  const { data: applicationConfig } = useSelector(selectApplicationConfig);

  const progress = Math.min(Math.max(overallScore, 0), 100);
  const remaining = 100 - progress;
  const { backgroundColor: chartBackgroundColor } =
    useResolveClassNames('bg-surface');
  const { backgroundColor: chartRadiusPrimaryColor } =
    useResolveClassNames('bg-primary');
  const { backgroundColor: chartRadiusSecondaryColor } =
    useResolveClassNames('bg-background');

  return (
    <View
      className={cn(
        'relative w-full overflow-hidden',
        'rounded-[24px]',
        'border border-border',
        'bg-surface',
        'p-4',
        className,
      )}
    >
      <View className="flex-row items-center">
        {/* Progress Ring */}
        <View className="items-center justify-center">
          <View className="items-center justify-center bg-surface">
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
          <AppText variant="xl" className="font-semibold text-text">
            You're doing incredible, {me?.displayName}! ✨
          </AppText>

          {/* Description */}
          <AppText variant="xs" className="mt-1 text-text-muted">
            {message}
          </AppText>

          {/* Day Progress */}
          <View
            className="
              mt-4
              min-h-[104px]
              flex-row
              items-center
              rounded-[24px]
              border
              border-border
              p-4
            "
          >
            <View className="mr-5">
              <AppIcon
                icon={Triangle}
                size={24}
                className="text-primary"
                strokeWidth={1.5}
              />
            </View>

            <View className="flex-1">
              <AppText variant="md" className="font-semibold text-primary">
                Day {currentDay} of {applicationConfig?.totalProgramDays}
              </AppText>

              <AppText variant="xs" className="mt-1 leading-6 text-text-muted">
                Keep showing up for{'\n'}
                yourself.
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
