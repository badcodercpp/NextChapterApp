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
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUpdateProfileBootstrap } from '@/features/Profile/hooks/useUpdateProfileBootstrap';

export function EditProfileScreen() {
  const navigation = useNavigation<ProfileNavigationProp>();
  const { handleStartProfileUpdate, isBootstrapPending, isBootstrapError } =
    useUpdateProfileBootstrap();

  useScreenHeader({
    backDisabled: isBootstrapPending,
  });

  usePreventBackNavigation(isBootstrapPending);

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-4">
        <ProfilePhotoPicker />
      </View>
      <View className="mt-4">
        <BasicInfoSection />
      </View>
      <View className="mt-4">
        <ContactSection />
      </View>
      <View className="mt-4">
        <PersonalDetailsSection />
      </View>
      <View className="mt-4">
        <WellnessFocusSection
          onSave={async () => {
            await handleStartProfileUpdate();

            if (isBootstrapError) {
              showToast('Failed to update profile', 'error');
              return;
            }
            showToast('Profile updated successfully', 'success');
            navigation.navigate('EditProfileSuccessScreen');
          }}
          onDeleteAccount={() => {
            navigation.navigate('DeleteProfileScreen');
          }}
        />
      </View>
    </AppAuthenticatedLayout>
  );
}
