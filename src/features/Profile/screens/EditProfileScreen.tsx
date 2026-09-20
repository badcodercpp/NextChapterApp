import {
  BasicInfoSection,
  ContactSection,
  PersonalDetailsSection,
  ProfilePhotoPicker,
  WellnessFocusSection,
} from '../components';
import React, { useState } from 'react';

import { AppAuthenticatedLayout } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import { ProfileNavigationProp } from '@/features/Profile/navigation/types';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function EditProfileScreen() {
  const navigation = useNavigation<ProfileNavigationProp>();
  const [fullName, setFullName] = useState('Shreya Singh');
  const [username, setUsername] = useState('@shreya.singh');
  const [bio, setBio] = useState(
    'Healing one day at a time. 🌿 Gratitude & growth.',
  );
  return (
    <AppAuthenticatedLayout noBottomPadding>
      <AppText variant="xl">EditProfileScreen</AppText>
      <View className="mt-4">
        <ProfilePhotoPicker />
      </View>
      <View className="mt-4">
        <BasicInfoSection
          fullName={fullName}
          username={username}
          bio={bio}
          onFullNameChange={setFullName}
          onUsernameChange={setUsername}
          onBioChange={setBio}
        />
      </View>
      <View className="mt-4">
        <ContactSection phone={''} email={''} />
      </View>
      <View className="mt-4">
        <PersonalDetailsSection
          gender={'other'}
          dateOfBirth={''}
          location={''}
          onGenderChange={() => {}}
        />
      </View>
      <View className="mt-4">
        <WellnessFocusSection
          selectedFocusAreas={[]}
          onFocusAreaToggle={() => {}}
          onSave={() => {
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
