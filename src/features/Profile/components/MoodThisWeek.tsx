import { Pressable, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Line,
  Path,
  Stop,
} from 'react-native-svg';

import { AppText } from '@/components';
import { format } from 'date-fns';
import { selectMoodThisWeek } from '@/state/selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';

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
      y:
        CHART_BOTTOM -
        (mood / MAX_LEVEL) * (CHART_BOTTOM - CHART_TOP),
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
      ? `${linePath} L ${points[points.length - 1].x} ${CHART_BOTTOM} L ${points[0].x} ${CHART_BOTTOM} Z`
      : '';

  return (
    <View className="rounded-[24px] border border-secondary/35 bg-card p-4">
      {/* Header */}
      <View className="mb-4 flex-row items-center justify-between">
        <AppText variant="md" className="font-semibold text-text">
          Mood This Week
        </AppText>

        <AppText variant="sm" className="text-text-muted">
          {dateRange}
        </AppText>
      </View>

      {/* Legend */}
      <View className="mb-3 flex-row items-center">
        <Pressable
          onPress={() => setFilter('all')}
          className={`flex-row items-center rounded-full px-3 py-1.5 ${
            filter === 'all' ? 'bg-primary/15' : ''
          }`}
        >
          <View className="mr-2 h-2.5 w-2.5 rounded-full bg-primary" />

          <AppText
            variant="sm"
            className={
              filter === 'all'
                ? 'font-semibold text-primary'
                : 'text-text-muted'
            }
          >
            All
          </AppText>
        </Pressable>

        <Pressable
          onPress={() => setFilter('before')}
          className={`flex-row items-center rounded-full px-3 py-1.5 ${
            filter === 'before' ? 'bg-primary/15' : ''
          }`}
        >
          <View className="mr-2 h-2.5 w-2.5 rounded-full bg-primary/40" />

          <AppText
            variant="sm"
            className={
              filter === 'before'
                ? 'font-semibold text-text'
                : 'text-text-muted'
            }
          >
            Before
          </AppText>
        </Pressable>

        <Pressable
          onPress={() => setFilter('after')}
          className={`flex-row items-center rounded-full px-3 py-1.5 ${
            filter === 'after' ? 'bg-primary/15' : ''
          }`}
        >
          <View className="mr-2 h-2.5 w-2.5 rounded-full bg-primary/40" />
          <AppText
            variant="sm"
            className={
              filter === 'after' ? 'font-semibold text-text' : 'text-text-muted'
            }
          >
            After
          </AppText>
        </Pressable>
      </View>

      {/* Chart */}
      <View>
        <Svg
          width="100%"
          height={CHART_HEIGHT}
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          preserveAspectRatio="none"
        >
          <Defs>
            <LinearGradient id="moodArea" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#A936FF" stopOpacity={0.45} />
              <Stop offset="1" stopColor="#A936FF" stopOpacity={0.04} />
            </LinearGradient>
          </Defs>
          {points.map((point, index) => (
            <Line
              key={`grid-${index}`}
              x1={point.x}
              y1={CHART_TOP}
              x2={point.x}
              y2={CHART_BOTTOM}
              stroke="#6D5A91"
              strokeOpacity={0.4}
              strokeDasharray="4 4"
            />
          ))}
          {areaPath ? <Path d={areaPath} fill="url(#moodArea)" /> : null}
          {linePath ? (
            <Path
              d={linePath}
              fill="none"
              stroke="#A936FF"
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
              fill={index === points.length - 1 ? '#FFFFFF' : '#A936FF'}
              stroke={index === points.length - 1 ? '#A936FF' : 'none'}
              strokeWidth={index === points.length - 1 ? 2 : 0}
            />
          ))}
        </Svg>
        <View className="flex-row">
          {entries.map((entry, index) => (
            <View key={`${entry.day}-${index}`} className="flex-1 items-center">
              <AppText variant="sm" className="mt-2 text-text-muted">
                {entry.day}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
