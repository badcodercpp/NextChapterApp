import { JournalHistoryEntries } from '../components';

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
        <JournalHistoryEntries origin={JournalRoutes.JournalHistory} />
      </View>
    </AppAuthenticatedLayout>
  );
}
