import {
  JourneySummaryCard,
  RecoveryProgressCard,
  RecoveryProgressHeader,
} from '../components';

import { AppAuthenticatedLayout } from '@/components';
import React from 'react';
import { View } from 'react-native';

export function RecoveryProgressScreen() {
  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-4">
        <RecoveryProgressHeader onSharePress={() => {}} />
      </View>
      <View className="mt-4">
        <RecoveryProgressCard overallScore={64} currentDay={12} />
      </View>
      <View className="mt-4">
        <JourneySummaryCard
          currentDay={12}
          daysActive={8}
          tasksCompleted={23}
          journalEntries={10}
          reflections={8}
        />
      </View>
    </AppAuthenticatedLayout>
  );
}
