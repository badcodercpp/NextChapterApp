import { AppAuthenticatedLayout } from '@/components';
import { JournalHistoryEntries } from '../components';
import { JournalRoutes } from '@/features/journal/navigation';
import React from 'react';
import { View } from 'react-native';
import { useJournalHistoryBootstrap } from '../hooks/useJournalHistoryBootstrap';

export function JournalHistoryScreen() {
  useJournalHistoryBootstrap();

  return (
    <AppAuthenticatedLayout
    // uncomment this if bottom bar is hidden
    // noBottomPadding
    >
      <View className="mt-2">
        <JournalHistoryEntries origin={JournalRoutes.JournalHistory} />
      </View>
    </AppAuthenticatedLayout>
  );
}
