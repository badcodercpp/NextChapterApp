import { AppCard, AppExpandableText, AppIcon, AppText } from '@/components';
import { CalendarDays } from 'lucide-react-native';

import { JournalEntryMenu } from './JournalEntryMenu';
import { JournalRoutes } from '@/features/journal/navigation';
import { RecentJournalEntriesQuery } from '@/__generated__/graphql';
import { View } from 'react-native';
import { format } from 'date-fns';
import { getMoodEmojiByValue } from '@/utils';

type JournalEntry = RecentJournalEntriesQuery['recentJournalEntries'][0];

export function JournalEntryCard({
  entry,
  origin,
}: {
  entry: JournalEntry;
  origin: keyof typeof JournalRoutes;
}) {
  return (
    <AppCard className="mb-4 rounded-[26px] border border-primary-v2/30 bg-background-v2 p-4">
      <View
        pointerEvents="none"
        className="absolute bottom-0 right-0 h-20 w-32 rounded-tl-full bg-primary-v2/10"
      />
      <View className="flex-row items-center">
        <View className="mr-3 h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-primary-v2/30 bg-primary-v2/15">
          {/* Mood */}
          <AppText variant="2xl" className="">
            {getMoodEmojiByValue(entry.mood)}
          </AppText>
        </View>
        {/* Content */}
        <View className="flex-1 border-l border-primary-v2/25 pl-3">
          {/* Date + Day */}
          <View className="flex-row flex-wrap items-center gap-y-1">
            <AppIcon
              icon={CalendarDays}
              size={15}
              className="mr-1.5 text-link-v2"
            />
            <AppText variant="xs" className="text-text-muted-v2">
              {format(
                new Date(entry.entryDate?.toString() ?? Date.now()),
                'MMM dd, yyyy',
              )}
            </AppText>

            <View className="mx-2 h-1 w-1 rounded-full bg-primary-v2" />

            <AppText
              variant="xs"
              className="rounded-full bg-primary-v2/15 px-2 py-1 font-semibold text-primary-v2"
            >
              Day {entry.day}
            </AppText>
          </View>

          <AppText variant="xl" className="mt-2 font-bold text-primary-v2">
            {entry.title}
          </AppText>

          {/* Journal text */}
          <AppExpandableText
            text={entry.content}
            collapsedLines={3}
            variant="md"
            textClassName="mt-1 pr-1 leading-6 text-text-muted-v2"
          />
        </View>

        {/* Right actions */}

        <View className="ml-2 self-start">
          {/* More */}

          <JournalEntryMenu entry={entry} origin={origin} />
        </View>
      </View>
    </AppCard>
  );
}
