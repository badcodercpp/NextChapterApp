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
  selectedRange,
}: RecoveryScoreChartComponentProps) {
  const { color: chartPrimaryColor } = useResolveClassNames('text-primary');
  const PURPLE = '#B84CFF';

  return (
    <View className="mt-5 mb-5">
      <LineChart
        data={data}
        areaChart
        curved
        isAnimated
        height={190}
        overflowTop={38}
        maxValue={100}
        noOfSections={4}
        stepValue={25}
        initialSpacing={12}
        endSpacing={12}
        spacing={selectedRange.days === 7 ? 45 : 80}
        thickness={3}
        color={chartPrimaryColor?.toString()}
        startFillColor={PURPLE}
        endFillColor={PURPLE}
        startOpacity={0.28}
        endOpacity={0.01}
        hideDataPoints={false}
        dataPointsColor="#FFFFFF"
        dataPointsRadius={4}
        dataPointsWidth={8}
        dataPointsHeight={8}
        xAxisColor="transparent"
        xAxisThickness={0}
        yAxisColor="transparent"
        yAxisThickness={0}
        yAxisLabelWidth={42}
        yAxisLabelSuffix="%"
        yAxisTextStyle={{
          color: '#64748B',
          fontSize: 12,
        }}
        rulesColor="rgba(255,255,255,0.07)"
        rulesThickness={1}
        rulesType="solid"
        xAxisLabelsHeight={20}
        xAxisLabelsVerticalShift={4}
        xAxisTextNumberOfLines={2}
        xAxisLabelTextStyle={{
          color: '#64748B',
          fontSize: 32,
          width: 55,
        }}
        hideOrigin={false}
        disableScroll={false}
        scrollToEnd
        pointerConfig={{
          pointerColor: chartPrimaryColor?.toString(),
          radius: 5,
          pointerStripColor: 'rgba(184, 76, 255, 0.25)',
          pointerStripWidth: 1,
          pointerStripHeight: 190,
          pointerStripUptoDataPoint: true,
          activatePointersOnLongPress: true,
          persistPointer: false,
          pointerLabelWidth: 90,
          pointerLabelHeight: 36,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items: { value: number }[]) => (
            <View className="items-center rounded-full bg-purple-500 px-3 py-1">
              <AppText variant="sm" className="font-bold text-white">
                {items[0]?.value ?? 0}%
              </AppText>
            </View>
          ),
        }}
      />

      {/* Latest score bubble */}
      {latestScore !== null && (
        <View className="absolute right-0 top-[-8px] rounded-full bg-purple-500 px-3 py-1">
          <AppText variant="md" className="font-bold text-white">
            {latestScore}%
          </AppText>
        </View>
      )}
    </View>
  );
}
