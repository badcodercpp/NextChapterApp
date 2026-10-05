import { Pressable, View } from 'react-native';

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
const CHART_HEIGHT = 100;
const BAR_WIDTH = 28;

const BEFORE_COLOR = '#4B4385';
const AFTER_COLOR = '#8B7CFF';
const TODAY_AFTER_COLOR = '#A99EFF';

const getMoodEmoji = (score: number) => {
  if (score <= 0) return '';

  if (score < 1.5) return '😞';
  if (score < 2.5) return '😕';
  if (score < 3.5) return '😐';
  if (score < 4.5) return '🙂';

  return '😊';
};

const normalizeMood = (value: unknown): number => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, Math.min(number, MAX_LEVEL));
};

function MoodBar({
  entry,
  filter,
  isToday,
}: {
  entry: MoodEntry;
  filter: MoodFilter;
  isToday: boolean;
}) {
  const before = filter === 'after' ? 0 : entry.beforeMood;

  const after = filter === 'before' ? 0 : entry.afterMood;

  const total = before + after;

  const beforeHeight = (before / (MAX_LEVEL * 2)) * CHART_HEIGHT;

  const afterHeight = (after / (MAX_LEVEL * 2)) * CHART_HEIGHT;

  const totalHeight = beforeHeight + afterHeight;

  const emojiScore =
    filter === 'before' ? before : filter === 'after' ? after : after || before;

  return (
    <View className="flex-1 items-center">
      {/* Chart */}
      <View
        className="relative w-10"
        style={{
          height: CHART_HEIGHT,
        }}
      >
        {/* Emoji */}
        {total > 0 && (
          <View
            className="absolute left-0 right-0 items-center"
            style={{
              bottom: totalHeight + 2,
            }}
          >
            <AppText variant="md" className="text-center">
              {getMoodEmoji(emojiScore)}
            </AppText>
          </View>
        )}

        {/* Bar */}
        <View
          className="absolute bottom-0 left-1/2 overflow-hidden rounded-t-[6px]"
          style={{
            width: BAR_WIDTH,
            height: totalHeight,
            transform: [{ translateX: -(BAR_WIDTH / 2) }],
          }}
        >
          {before > 0 && (
            <View
              style={{
                height: beforeHeight,
                width: BAR_WIDTH,
                backgroundColor: BEFORE_COLOR,
              }}
            />
          )}

          {after > 0 && (
            <View
              style={{
                height: afterHeight,
                width: BAR_WIDTH,
                backgroundColor: isToday ? TODAY_AFTER_COLOR : AFTER_COLOR,
              }}
            />
          )}
        </View>
      </View>

      {/* Day */}
      <AppText variant="sm" className="mt-1 text-text-muted">
        {entry.day}
      </AppText>
    </View>
  );
}

export function MoodThisWeek({}: MoodThisWeekProps) {
  const { data: moodThisWeek } = useSelector(selectMoodThisWeek);

  const [filter, setFilter] = useState<MoodFilter>('all');

  const entries: MoodEntry[] =
    moodThisWeek?.map(item => ({
      day: format(new Date(item.date?.toString() ?? Date.now()), 'EEEEE'),

      // IMPORTANT:
      // Force GraphQL values into real numbers.
      beforeMood: normalizeMood(item.startMoodAverage) || 2,

      afterMood: normalizeMood(item.endMoodAverage) || 5,
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

  console.log('MoodThisWeek entries:', entries); // Debugging log

  return (
    <View className="rounded-[24px] border border-border bg-card p-4">
      {/* Header */}
      <View className="mb-4 flex-row items-center justify-between">
        <AppText variant="xl" className="font-semibold text-text">
          Mood This Week
        </AppText>

        <AppText variant="md" className="text-text-muted">
          {dateRange}
        </AppText>
      </View>

      {/* Legend */}
      <View className="mb-1 flex-row items-center gap-2">
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
          className={`flex-row items-center rounded-full mt-2 px-3 py-1.5 ${
            filter === 'before' ? 'bg-primary/15' : ''
          }`}
        >
          <View className="mr-2 h-2.5 w-2.5 rounded-full bg-[#4B4385]" />

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
      <View className="flex-row items-end">
        {entries.map((entry, index) => (
          <MoodBar
            key={`${entry.day}-${index}`}
            entry={entry}
            filter={filter}
            isToday={index === entries.length - 1}
          />
        ))}
      </View>
    </View>
  );
}
