import {
  AccountSettings,
  Achievements,
  CurrentJourneyCard,
  MoodThisWeek,
  ProfileStats,
  ProfileSummaryCard,
} from '../components';

import { AppAuthenticatedLayout, AppConfirmModal } from '@/components';
import { type ProfileNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useProfileBootstrap } from '@/features/Profile/hooks/useProfileBootstrap';
import { useFormContext } from 'react-hook-form';
import { MasterFormData } from '@/form/types';
import { useSelector } from 'react-redux';
import { selectMe } from '@/state/selectors';
import { useAccountRowItemAction } from '../hooks/useAccountRowItemAction';

export function ProfileScreen() {
  const { data: me } = useSelector(selectMe);
  const navigation = useNavigation<ProfileNavigationProp>();
  useProfileBootstrap();

  const {
    onAccountRowItemPress,
    showProceedModal,
    logoutCurrentDevice,
    logoutAllDevices,
    setShowProceedModal,
  } = useAccountRowItemAction();

  const goToEditProfile = useCallback(() => {
    navigation.navigate('EditProfileScreen');
  }, [navigation]);

  const { reset } = useFormContext<MasterFormData>();

  useEffect(() => {
    reset({
      updateProfile: {
        displayName: me?.displayName ?? '',
        bio: me?.bio ?? '',
        gender: me?.gender,
        phone: me?.phone,
        locationName: me?.locationName,
        locationLat: me?.locationLat,
        locationLong: me?.locationLong,
        dob: me?.dob,
      },
    });
  }, [me, reset]);

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <View className="mt-4">
        <ProfileSummaryCard onEditPress={goToEditProfile} />
      </View>
      <View className="mt-4">
        <ProfileStats />
      </View>
      <View className="mt-4">
        <CurrentJourneyCard />
      </View>
      <View className="mt-4">
        <Achievements />
      </View>
      <View className="mt-4">
        <MoodThisWeek />
      </View>
      <View className="mt-4">
        <AccountSettings onItemPress={onAccountRowItemPress} />
      </View>
      <AppConfirmModal
        visible={showProceedModal}
        title="Please select Signout option"
        message="You can sign out from the current device or all devices. Please select an option to proceed."
        confirmText="Current Device"
        cancelText="All Devices"
        onCancel={logoutAllDevices}
        onConfirm={logoutCurrentDevice}
        onBackdropPress={() => setShowProceedModal(false)}
      />
    </AppAuthenticatedLayout>
  );
}
