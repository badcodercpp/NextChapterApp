import {
  JourneySummaryCard,
  RecoveryProgressCard,
  RecoveryProgressHeader,
  RecoveryScoreChart,
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
        <RecoveryProgressCard />
      </View>
      <View className="mt-4">
        <JourneySummaryCard />
      </View>
      <View className="mt-4">
        <RecoveryScoreChart />
      </View>
    </AppAuthenticatedLayout>
  );
}
