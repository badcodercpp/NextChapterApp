import { LineChart, LineChartPropsType } from 'react-native-gifted-charts';
import { AppText } from '@/components';
import { RangeOption } from './RecoveryScoreChartTypes';
import { View } from 'react-native';
import { useState } from 'react';
import { useResolveClassNames } from 'uniwind';

interface RecoveryScoreChartComponentProps extends LineChartPropsType {
  latestScore?: number | null;
  selectedRange: RangeOption;
}

export function RecoveryScoreChartComponent({
  data = [],
  selectedRange,
}: RecoveryScoreChartComponentProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const { backgroundColor: primary } = useResolveClassNames('bg-primary-v2');
  const { color: muted } = useResolveClassNames('text-text-muted-v2');
  const { color: text } = useResolveClassNames('text-text-v2');
  const { backgroundColor: rules } = useResolveClassNames('bg-border-v2');
  // Reserve the Y-axis and both endpoint margins inside the measured card.
  const plotWidth = Math.max(0, containerWidth - 60);
  const spacing = data.length > 1 ? (plotWidth - 40) / (data.length - 1) : 0;
  const labelInterval = Math.max(1, Math.ceil((data.length - 1) / 3));
  const points = data.map((item, index) => ({
    ...item,
    label:
      index === 0 || index === data.length - 1 || index % labelInterval === 0
        ? item.label
        : '',
    hideDataPoint: data.length > 10 && index !== data.length - 1,
  }));

  return (
    <View
      className="mb-4 mt-6"
      onLayout={event => setContainerWidth(event.nativeEvent.layout.width)}
    >
      {plotWidth > 40 && (
        <LineChart
          key={`${selectedRange.label}-${containerWidth}-${data.length}`}
          data={points}
          width={plotWidth}
          height={180}
          areaChart
          curved={false}
          maxValue={100}
          noOfSections={4}
          stepValue={25}
          initialSpacing={20}
          endSpacing={20}
          spacing={spacing}
          disableScroll
          thickness={3}
          color={primary?.toString()}
          startFillColor={primary?.toString()}
          endFillColor={primary?.toString()}
          startOpacity={0.35}
          endOpacity={0.02}
          dataPointsRadius={4}
          dataPointsColor={text?.toString()}
          xAxisColor={rules?.toString()}
          yAxisThickness={0}
          yAxisLabelWidth={38}
          yAxisLabelSuffix="%"
          // eslint-disable-next-line react-native/no-inline-styles
          yAxisTextStyle={{ color: muted?.toString(), fontSize: 12 }}
          rulesColor={rules?.toString()}
          rulesType="dashed"
          rulesThickness={1}
          xAxisLabelsHeight={24}
          xAxisLabelsVerticalShift={6}
          xAxisTextNumberOfLines={1}
          // eslint-disable-next-line react-native/no-inline-styles
          xAxisLabelTextStyle={{
            color: muted?.toString(),
            fontSize: 11,
            width: 52,
            textAlign: 'center',
          }}
          pointerConfig={{
            initialPointerIndex: data.length - 1,
            initialPointerAppearDelay: 0,
            pointerColor: primary?.toString(),
            radius: 5,
            pointerStripColor: muted?.toString(),
            pointerStripWidth: 1,
            pointerStripUptoDataPoint: true,
            activatePointersOnLongPress: false,
            activatePointersInstantlyOnTouch: true,
            persistPointer: true,
            pointerLabelWidth: 68,
            pointerLabelHeight: 32,
            autoAdjustPointerLabelPosition: true,
            // eslint-disable-next-line react/no-unstable-nested-components
            pointerLabelComponent: (items: { value: number }[]) => (
              <View className="items-center rounded-full bg-primary-v2 px-3 py-1">
                <AppText variant="sm" className="font-bold text-on-primary-v2">
                  {items[0]?.value ?? 0}%
                </AppText>
              </View>
            ),
          }}
        />
      )}
    </View>
  );
}
