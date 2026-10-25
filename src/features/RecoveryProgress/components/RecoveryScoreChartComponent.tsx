import { LineChart, LineChartPropsType } from 'react-native-gifted-charts';

import { AppText } from '@/components';
import { RangeOption } from './RecoveryScoreChartTypes';
import { View } from 'react-native';
import { useResolveClassNames } from 'uniwind';

interface RecoveryScoreChartComponentProps extends LineChartPropsType {
  latestScore?: number | null;
  selectedRange: RangeOption;
}

export function RecoveryScoreChartComponent({
  data,
  latestScore,
}: RecoveryScoreChartComponentProps) {
  const { color: chartPrimaryColor } = useResolveClassNames('text-primary');
  const { color: chartMutedColor } = useResolveClassNames('text-text-muted');

  const PURPLE = chartPrimaryColor?.toString() ?? '#B84CFF';

  return (
    <View className="mb-5 mt-5">
      <LineChart
        data={data}
        areaChart
        curved
        isAnimated
        height={190}
        overflowTop={38}
        overflowBottom={24}
        maxValue={100}
        noOfSections={4}
        stepValue={25}
        /*
         * X-axis positioning
         */
        initialSpacing={24}
        endSpacing={24}
        spacing={80}
        adjustToWidth={false}
        /*
         * Line
         */
        thickness={3}
        color={chartPrimaryColor?.toString()}
        /*
         * Area fill
         */
        startFillColor={PURPLE}
        endFillColor={PURPLE}
        startOpacity={0.28}
        endOpacity={0.01}
        /*
         * Data points
         */
        hideDataPoints={false}
        dataPointsShape="circular"
        dataPointsRadius={5}
        dataPointsColor={PURPLE}
        /*
         * Axes
         */
        xAxisColor="transparent"
        xAxisThickness={0}
        yAxisColor="transparent"
        yAxisThickness={0}
        yAxisLabelWidth={42}
        yAxisLabelSuffix="%"
        // eslint-disable-next-line react-native/no-inline-styles
        yAxisTextStyle={{
          color: chartMutedColor?.toString(),
          fontSize: 16,
        }}
        /*
         * Horizontal rules
         */
        rulesColor="rgba(255,255,255,0.07)"
        rulesThickness={1}
        rulesType="solid"
        /*
         * X-axis labels
         */
        xAxisLabelsHeight={20}
        xAxisLabelsVerticalShift={16}
        xAxisTextNumberOfLines={1}
        // eslint-disable-next-line react-native/no-inline-styles
        xAxisLabelTextStyle={{
          color: chartMutedColor?.toString(),
          fontSize: 12,
          width: 80,
          textAlign: 'center',
        }}
        hideOrigin={false}
        /*
         * Scroll
         */
        disableScroll={false}
        scrollToEnd={true}
        /*
         * Pointer
         */
        pointerConfig={{
          pointerColor: chartPrimaryColor?.toString(),
          radius: 5,
          pointerStripColor: 'rgba(184, 76, 255, 0.25)',
          pointerStripWidth: 1,
          pointerStripHeight: 190,
          pointerStripUptoDataPoint: true,
          // 👇 Don't activate pointer on long press
          activatePointersOnLongPress: false,
          // 👇 Activate immediately when touching the chart
          activatePointersInstantlyOnTouch: true,
          // 👇 Keep pointer after tapping
          persistPointer: true,
          pointerLabelWidth: 90,
          pointerLabelHeight: 36,
          autoAdjustPointerLabelPosition: true,

          // eslint-disable-next-line react/no-unstable-nested-components
          pointerLabelComponent: (items: { value: number }[]) => (
            <View className="items-center rounded-full bg-primary px-3 py-1">
              <AppText variant="sm" className="font-bold text-white">
                {items[0]?.value ?? 0}%
              </AppText>
            </View>
          ),
        }}
      />

      {/* Latest score bubble */}
      {latestScore !== null && latestScore !== undefined && (
        <View className="absolute right-0 top-[-8px] rounded-full bg-primary px-3 py-1">
          <AppText variant="md" className="font-bold text-white">
            {latestScore}%
          </AppText>
        </View>
      )}
    </View>
  );
}
