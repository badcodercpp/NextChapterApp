import { AppCard, AppExpandableText, AppText } from '@/components';

import { JournalEntryMenu } from './JournalEntryMenu';
import { RecentJournalEntriesQuery } from '@/__generated__/graphql';
import { View } from 'react-native';
import { format } from 'date-fns';
import { getMoodEmojiByValue } from '@/utils';

type JournalEntry = RecentJournalEntriesQuery['recentJournalEntries'][0];

export function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  return (
    <AppCard className="mb-4 rounded-3xl border border-border bg-card">
      <View className="flex-row">
        <View className="mr-3 items-center justify-between">
          {/* Mood */}
          <AppText variant="2xl" className="">
            {getMoodEmojiByValue(entry.mood)}
          </AppText>
        </View>
        {/* Content */}
        <View className="flex-1">
          {/* Date + Day */}
          <View className="flex-row items-center">
            <AppText variant="sm" className="text-text-muted">
              {format(
                new Date(entry.entryDate?.toString() ?? Date.now()),
                'MMM dd, yyyy',
              )}
            </AppText>

            <View className="mx-3 h-1.5 w-1.5 rounded-full bg-primary" />

            <AppText variant="sm" className="text-primary">
              Day {entry.day}
            </AppText>
          </View>

          <AppText variant="xl" className="mt-2 text-primary">
            {entry.title}
          </AppText>

          {/* Journal text */}
          <AppExpandableText
            text={entry.content}
            collapsedLines={3}
            variant="lg"
            textClassName=" pr-1 text-text"
          />
        </View>

        {/* Right actions */}

        <View className="ml-3 items-center justify-between">
          {/* More */}

          <JournalEntryMenu entry={entry} />
        </View>
      </View>
    </AppCard>
  );
}
