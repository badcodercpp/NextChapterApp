import { AppContentLoader } from '@/components';
import { JournalEntryCard } from './JournalEntryCard';
import React from 'react';
import { View } from 'react-native';
import { selectMyJournalEntries } from '@/state/selectors/api/myJournalEntries';
import { useSelector } from 'react-redux';

interface JournalHistoryEntriesProps {}

export function JournalHistoryEntries({}: JournalHistoryEntriesProps) {
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
            <JournalEntryCard key={entry.id} entry={entry} />
          ))}
        </>
      )}
    </View>
  );
}
