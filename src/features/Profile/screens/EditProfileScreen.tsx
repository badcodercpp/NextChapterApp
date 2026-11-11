import { AppAuthenticatedLayout, showToast } from '@/components';
import {
  BasicInfoSection,
  ContactSection,
  PersonalDetailsSection,
  ProfilePhotoPicker,
  WellnessFocusSection,
} from '../components';
import { usePreventBackNavigation, useScreenHeader } from '@/navigation/hooks';

import { ProfileNavigationProp } from '@/features/Profile/navigation/types';
import { ProfileRoutes } from '@/features/Profile/navigation';
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUpdateProfileBootstrap } from '@/features/Profile/hooks/useUpdateProfileBootstrap';

export function EditProfileScreen() {
  const navigation = useNavigation<ProfileNavigationProp>();
  const { handleStartProfileUpdate, isBootstrapPending } =
    useUpdateProfileBootstrap();

  useScreenHeader({
    backDisabled: isBootstrapPending,
  });

  usePreventBackNavigation(isBootstrapPending);

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-6">
        <ProfilePhotoPicker />
      </View>
      <View className="mt-8">
        <BasicInfoSection />
      </View>
      <View className="mt-8">
        <ContactSection />
      </View>
      <View className="mt-8">
        <PersonalDetailsSection />
      </View>
      <View className="mt-6">
        <WellnessFocusSection
          saving={isBootstrapPending}
          onSave={async () => {
            const didUpdate = await handleStartProfileUpdate();
            if (!didUpdate) {
              showToast('Failed to update profile', 'error');
              return;
            }
            navigation.replace(ProfileRoutes.EditProfileSuccessScreen);
          }}
          onDeleteAccount={() => {
            navigation.replace('DeleteProfileScreen');
          }}
        />
      </View>
    </AppAuthenticatedLayout>
  );
}
