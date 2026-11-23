import { Pressable, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Line,
  Path,
  Stop,
} from 'react-native-svg';

import { AppCardDecoration, AppIcon, AppText } from '@/components';
import { ChartColumn } from 'lucide-react-native';
import { format } from 'date-fns';
import { selectMoodThisWeek } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useCSSVariable } from 'uniwind';

const MOOD_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'before', label: 'Before' },
  { key: 'after', label: 'After' },
] as const;

interface MoodEntry {
  day: string;
  beforeMood: number;
  afterMood: number;
}

interface MoodThisWeekProps {}

type MoodFilter = 'all' | 'before' | 'after';

const MAX_LEVEL = 5;
const CHART_WIDTH = 320;
const CHART_HEIGHT = 96;
const CHART_TOP = 10;
const CHART_BOTTOM = 82;
const CHART_SIDE_PADDING = 20;

const normalizeMood = (value: unknown): number => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, Math.min(number, MAX_LEVEL));
};

export function MoodThisWeek({}: MoodThisWeekProps) {
  const { data: moodThisWeek } = useSelector(selectMoodThisWeek);
  const primary = useCSSVariable('--color-primary-v2');
  const divider = useCSSVariable('--color-border-v2');
  const surface = useCSSVariable('--color-surface-v2');
  const chartColor = typeof primary === 'string' ? primary : '#A936FF';
  const gridColor = typeof divider === 'string' ? divider : '#6D5A91';
  const dotFill = typeof surface === 'string' ? surface : '#FFFFFF';

  const [filter, setFilter] = useState<MoodFilter>('all');

  const entries: MoodEntry[] =
    moodThisWeek?.map(item => ({
      day: format(new Date(item.date?.toString() ?? Date.now()), 'EEEEE'),

      // IMPORTANT:
      // Force GraphQL values into real numbers.
      beforeMood: normalizeMood(item.startMoodAverage) || 0,

      afterMood: normalizeMood(item.endMoodAverage) || 0,
    })) ?? [];

  const startDate = moodThisWeek?.[0]?.date
    ? new Date(moodThisWeek[0].date.toString())
    : null;

  const endDate = moodThisWeek?.[moodThisWeek.length - 1]?.date
    ? new Date(moodThisWeek?.[moodThisWeek.length - 1]?.date?.toString() ?? '')
    : null;

  const dateRange =
    startDate && endDate
      ? startDate.getMonth() === endDate.getMonth()
        ? `${format(startDate, 'MMM d')} - ${format(endDate, 'd')}`
        : `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`
      : '';

  const points = entries.map((entry, index) => {
    const mood =
      filter === 'before'
        ? entry.beforeMood
        : filter === 'after'
        ? entry.afterMood
        : (entry.beforeMood + entry.afterMood) /
          (entry.beforeMood && entry.afterMood ? 2 : 1);
    const x =
      entries.length === 1
        ? CHART_WIDTH / 2
        : CHART_SIDE_PADDING +
          (index * (CHART_WIDTH - CHART_SIDE_PADDING * 2)) /
            (entries.length - 1);

    return {
      x,
      y: CHART_BOTTOM - (mood / MAX_LEVEL) * (CHART_BOTTOM - CHART_TOP),
    };
  });

  const linePath = points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = points[index - 1];
    const midpoint = (previous.x + point.x) / 2;
    return `${path} C ${midpoint} ${previous.y}, ${midpoint} ${point.y}, ${point.x} ${point.y}`;
  }, '');
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${CHART_BOTTOM} L ${
          points[0].x
        } ${CHART_BOTTOM} Z`
      : '';

  return (
    <View className="overflow-hidden rounded-[24px] border border-primary-v2/20 bg-surface-v2 p-4">
      <AppCardDecoration />
      {/* Header */}
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <AppIcon icon={ChartColumn} size={20} className="text-link-v2" />
          <AppText variant="md" className="font-semibold text-text-v2">
            Mood This Week
          </AppText>
        </View>

        <AppText variant="sm" className="text-text-muted-v2">
          {dateRange}
        </AppText>
      </View>

      {/* Legend */}
      <View className="mb-3 flex-row items-center gap-2">
        {MOOD_FILTERS.map(option => {
          const isActive = filter === option.key;
          return (
            <Pressable
              key={option.key}
              onPress={() => setFilter(option.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              className={`flex-row items-center rounded-full border px-3 py-1.5 ${
                isActive
                  ? 'border-primary-v2 bg-primary-v2'
                  : 'border-border-v2 bg-primary-v2/10'
              }`}
            >
              <View
                className={`mr-2 h-2 w-2 rounded-full ${
                  isActive ? 'bg-on-primary-v2' : 'bg-link-v2/60'
                }`}
              />
              <AppText
                variant="sm"
                className={
                  isActive
                    ? 'font-semibold text-on-primary-v2'
                    : 'text-text-muted-v2'
                }
              >
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      {/* Chart */}
      <View>
        <Svg
          key={chartColor}
          width="100%"
          height={CHART_HEIGHT}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          preserveAspectRatio="none"
        >
          <Defs>
            <LinearGradient id="moodArea" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={chartColor} stopOpacity={0.45} />
              <Stop offset="1" stopColor={chartColor} stopOpacity={0.04} />
            </LinearGradient>
          </Defs>
          {points.map((point, index) => (
            <Line
              key={`grid-${index}`}
              x1={point.x}
              y1={CHART_TOP}
              x2={point.x}
              y2={CHART_BOTTOM}
              stroke={gridColor}
              strokeOpacity={0.4}
              strokeDasharray="4 4"
            />
          ))}
          {areaPath ? <Path d={areaPath} fill="url(#moodArea)" /> : null}
          {linePath ? (
            <Path
              d={linePath}
              fill="none"
              stroke={chartColor}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          {points.map((point, index) => (
            <Circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r={index === points.length - 1 ? 4.5 : 3}
              fill={index === points.length - 1 ? dotFill : chartColor}
              stroke={index === points.length - 1 ? chartColor : 'none'}
              strokeWidth={index === points.length - 1 ? 2 : 0}
            />
          ))}
        </Svg>
        <View className="flex-row">
          {entries.map((entry, index) => (
            <View key={`${entry.day}-${index}`} className="flex-1 items-center">
              <AppText variant="sm" className="mt-2 text-text-muted-v2">
                {entry.day}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
