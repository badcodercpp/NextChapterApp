import {
  AccountSettings,
  Achievements,
  CurrentJourneyCard,
  MoodThisWeek,
  ProfileStats,
  ProfileSummaryCard,
} from '../components';

import { AppAuthenticatedLayout } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import { type ProfileNavigationProp } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useProfileBootstrap } from '@/features/Profile/hooks/useProfileBootstrap';

export function ProfileScreen() {
  const navigation = useNavigation<ProfileNavigationProp>();
  useProfileBootstrap();

  const goToEditProfile = useCallback(() => {
    navigation.navigate('EditProfileScreen');
  }, [navigation]);

  return (
    <AppAuthenticatedLayout noBottomPadding>
      <AppText variant="xl">ProfileScreen</AppText>
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
        <AccountSettings />
      </View>
    </AppAuthenticatedLayout>
  );
}
