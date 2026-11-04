import { AppAuthenticatedLayout, AppText } from '@/components';

import React from 'react';
import { SessionProgress } from '../components';
import { View } from 'react-native';

export function DailySessionCompleteStepScreen() {
  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-4">
        <SessionProgress currentStep={'COMPLETED'} />
      </View>
      <View className="mt-4">
        <AppText variant="lg" className="mt-3 text-center text-text">
          DailySessionCompleteStepScreen
        </AppText>
      </View>
    </AppAuthenticatedLayout>
  );
}
