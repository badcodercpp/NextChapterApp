import { JournalHeader, JournalHistoryEntries } from '../components';

import { AppAuthenticatedLayout } from '@/components';
import { JournalRoutes } from '@/features/journal/navigation';
import React from 'react';
import { View } from 'react-native';
import { useJournalHistoryBootstrap } from '../hooks/useJournalHistoryBootstrap';

export function JournalHistoryScreen() {
  useJournalHistoryBootstrap();

  return (
    <AppAuthenticatedLayout>
      <View className="mt-2">
        <JournalHeader
          enableSearch={true}
          title="Journals"
          description="Your journal histories"
        />
      </View>
      <View className="mt-4">
        <JournalHistoryEntries origin={JournalRoutes.JournalHistory} />
      </View>
    </AppAuthenticatedLayout>
  );
}
