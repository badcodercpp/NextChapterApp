import { LineChart } from 'react-native-gifted-charts';
import { View } from 'react-native';

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
  return (
    <View>
      <LineChart
        data={data.map(value => ({ value }))}
        width={width}
        height={height}
        color={color}
        thickness={3}
        curved
        hideRules
        hideAxesAndRules
        hideDataPoints
        adjustToWidth
        disableScroll
        initialSpacing={0}
        endSpacing={0}
        yAxisOffset={Math.min(...data)}
        maxValue={Math.max(...data) - Math.min(...data)}
        noOfSections={1}
        spacing={width / Math.max(data.length - 1, 1)}
      />
    </View>
  );
}
