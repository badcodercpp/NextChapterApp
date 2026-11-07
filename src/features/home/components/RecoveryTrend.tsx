import { LineChart } from 'react-native-gifted-charts';
import { View } from 'react-native';
import { useResolveClassNames } from 'uniwind';

interface RecoveryTrendProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function RecoveryTrend({
  data,
  color = '#00D9FF',
  width = 48,
  height = 32,
}: RecoveryTrendProps) {
  const { color: chartPrimaryColor } = useResolveClassNames('text-primary-v2');
  const minValue = data.length ? Math.min(...data) : 0;
  const maxValue = data.length ? Math.max(...data) : 1;
  const valueRange = maxValue - minValue;
  const scalePadding = Math.max(valueRange * 0.2, 1);
  const chartColor = chartPrimaryColor?.toString() ?? color;

  return (
    <View>
      <LineChart
        data={data.map(value => ({ value }))}
        width={width}
        height={height}
        color={chartColor}
        thickness={2.5}
        areaChart
        curved
        hideRules
        hideAxesAndRules
        hideDataPoints
        disableScroll
        initialSpacing={0}
        endSpacing={0}
        yAxisOffset={minValue - scalePadding}
        maxValue={Math.max(valueRange + scalePadding * 2, 2)}
        noOfSections={3}
        spacing={width / Math.max(data.length - 1, 1)}
        startFillColor={chartColor}
        endFillColor={chartColor}
        startOpacity={0.28}
        endOpacity={0.02}
        xAxisThickness={0}
        yAxisThickness={0}
      />
    </View>
  );
}
