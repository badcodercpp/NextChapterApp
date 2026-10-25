import { AppContentLoader } from '@/components';
import { JournalEntryCard } from './JournalEntryCard';
import { JournalRoutes } from '@/features/journal/navigation';
import React from 'react';
import { View } from 'react-native';
import { selectMyJournalEntries } from '@/state/selectors/api/myJournalEntries';
import { useSelector } from 'react-redux';

interface JournalHistoryEntriesProps {
  origin: keyof typeof JournalRoutes;
}

export function JournalHistoryEntries({ origin }: JournalHistoryEntriesProps) {
  const { data: recentJournalEntries, loading } = useSelector(
    selectMyJournalEntries,
  );

  return (
    <View className="">
      {/* Header */}

      {/* Entries */}
      {loading ? (
        <>
          <AppContentLoader />
          <AppContentLoader />
          <AppContentLoader />
        </>
      ) : (
        <>
          {recentJournalEntries?.map(entry => (
            <JournalEntryCard key={entry.id} entry={entry} origin={origin} />
          ))}
        </>
      )}
    </View>
  );
}
