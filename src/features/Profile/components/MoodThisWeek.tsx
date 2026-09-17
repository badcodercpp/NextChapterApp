import { AppText } from '@/components';
import { View } from 'react-native';
import { cn } from '@/utils';

interface MoodEntry {
  day: string;
  emoji: string;
  level: number;
}

interface MoodThisWeekProps {
  entries?: MoodEntry[];
  startDate?: string;
  endDate?: string;
}

const DEFAULT_ENTRIES: MoodEntry[] = [
  {
    day: 'M',
    emoji: '😞',
    level: 1,
  },
  {
    day: 'T',
    emoji: '😐',
    level: 2,
  },
  {
    day: 'W',
    emoji: '🙂',
    level: 3,
  },
  {
    day: 'T',
    emoji: '😊',
    level: 4,
  },
  {
    day: 'F',
    emoji: '😊',
    level: 4,
  },
  {
    day: 'S',
    emoji: '🙂',
    level: 3,
  },
  {
    day: 'S',
    emoji: '😊',
    level: 5,
  },
];

const MAX_LEVEL = 5;

function MoodBar({ entry, isToday }: { entry: MoodEntry; isToday: boolean }) {
  const height = 28 + (entry.level / MAX_LEVEL) * 65;

  return (
    <View className="flex-1 items-center">
      {/* Emoji */}
      <AppText variant="md" className="h-8 text-center">
        {entry.emoji}
      </AppText>

      {/* Bar */}
      <View
        className={cn(
          'mt-2 w-8 rounded-full',
          isToday ? 'bg-primary' : 'bg-[#4B4385]',
        )}
        style={{
          height,
        }}
      />

      {/* Day */}
      <AppText variant="sm" className="mt-2 text-text-muted">
        {entry.day}
      </AppText>
    </View>
  );
}

export function MoodThisWeek({
  entries = DEFAULT_ENTRIES,
  startDate = 'May 6',
  endDate = '12',
}: MoodThisWeekProps) {
  return (
    <View className="rounded-[24px] border border-white/10 bg-card/60 p-4">
      {/* Header */}
      <View className="mb-6 flex-row items-center justify-between">
        <AppText variant="xl" className="font-semibold text-text">
          Mood This Week
        </AppText>

        <AppText variant="md" className="text-text-muted">
          {startDate} – {endDate}
        </AppText>
      </View>

      {/* Chart */}
      <View className="flex-row items-end justify-between">
        {entries.map((entry, index) => (
          <MoodBar
            key={`${entry.day}-${index}`}
            entry={entry}
            isToday={index === entries.length - 1}
          />
        ))}
      </View>
    </View>
  );
}
