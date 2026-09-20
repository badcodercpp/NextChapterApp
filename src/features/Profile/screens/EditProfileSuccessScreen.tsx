import {
  ProfileCompletionActions,
  ProfileUpdateSuccess,
  ProfileUpdatedSummary,
  RedirectCountdown,
} from '../components';

import { AppAuthenticatedLayout } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { View } from 'react-native';

export function EditProfileSuccessScreen() {
  return (
    <AppAuthenticatedLayout noBottomPadding>
      <AppText variant="xl">EditProfileSuccessScreen</AppText>
      <View className="mt-4">
        <ProfileUpdateSuccess />
      </View>
      <View className="mt-4">
        <ProfileUpdatedSummary />
      </View>
      <View className="mt-4">
        <RedirectCountdown />
      </View>
      <View className="mt-4">
        <ProfileCompletionActions />
      </View>
    </AppAuthenticatedLayout>
  );
}
