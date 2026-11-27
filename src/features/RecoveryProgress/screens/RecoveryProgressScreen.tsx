import { AppAuthenticatedLayout, AppLoadingModal } from '@/components';
import {
  JourneySummaryCard,
  RecoveryProgressCard,
  RecoveryScoreChart,
} from '../components';

import React from 'react';
import { CardAccessBoundary } from '@/components/foundation/AppCard/CardAccess';
import { RecoveryProgressShareButton } from '@/features/RecoveryProgress/components/RecoveryProgressShareButton';
import { View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { useScreenHeader } from '@/navigation/hooks';
import { useShareViewAsPdf } from '../hooks/useShareViewAsPdf';

export function RecoveryProgressScreen() {
  const { viewShotRef, isGenerating, handleSharePress } = useShareViewAsPdf({
    fileName: 'Invoice_1024',
    paperSize: 'A4',
    shareTitle: 'Share Invoice PDF',
  });

  useScreenHeader({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerRight: () => (
      <RecoveryProgressShareButton handleSharePress={handleSharePress} />
    ),
  });

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1.0 }}>
        <View collapsable={false}>
          <View className="mt-4">
            <CardAccessBoundary>
              <RecoveryProgressCard />
            </CardAccessBoundary>
          </View>
          <View className="mt-4">
            <JourneySummaryCard />
          </View>
          <View className="mt-4">
            <RecoveryScoreChart />
          </View>
        </View>
      </ViewShot>
      <AppLoadingModal
        visible={isGenerating}
        message="Please wait while we generate report for your recovery progress..."
      />
    </AppAuthenticatedLayout>
  );
}
