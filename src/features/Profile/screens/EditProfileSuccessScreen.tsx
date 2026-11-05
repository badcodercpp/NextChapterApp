import {
  ProfileCompletionActions,
  ProfileUpdateSuccess,
  ProfileUpdatedSummary,
  RedirectCountdown,
} from '../components';

import { AppAuthenticatedLayout } from '@/components';
import React from 'react';
import { View } from 'react-native';

export function EditProfileSuccessScreen() {
  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-4">
        <ProfileUpdateSuccess />
      </View>
      <View className="mt-6">
        <ProfileUpdatedSummary />
      </View>
      <View className="mt-6">
        <RedirectCountdown />
      </View>
      <View className="mt-6">
        <ProfileCompletionActions />
      </View>
    </AppAuthenticatedLayout>
  );
}
