import {
  BeforeYouGoCard,
  DeleteAccountActions,
  DeleteAccountConfirmation,
  DeletionSummaryCard,
} from '../components';
import React, { useState } from 'react';

import { AppAuthenticatedLayout } from '@/components';
import { AppText } from '@/components/foundation/AppText';
import { View } from 'react-native';

export function DeleteProfileScreen() {
  const [confirmationText, setConfirmationText] = useState('');
  return (
    <AppAuthenticatedLayout noBottomPadding>
      <AppText variant="xl">DeleteProfileScreen</AppText>
      <View className="mt-4">
        <DeleteAccountConfirmation
          name={'Shreya Singh'}
          email={'shreya@outdated.me'}
          memberSince={'2023'}
        />
      </View>
      <View className="mt-4">
        <DeletionSummaryCard />
      </View>
      <View className="mt-4">
        <BeforeYouGoCard
          onPauseAccount={() => {
            // Pause account
          }}
          onDisableNotifications={() => {
            // Open notification settings
          }}
          onExportData={() => {
            // Export user data
          }}
        />
      </View>
      <View className="mt-4">
        <DeleteAccountActions
          confirmationText={confirmationText}
          onConfirmationTextChange={setConfirmationText}
          onDelete={() => {
            // Delete account API
          }}
          onKeepAccount={() => {
            // navigation.goBack();
          }}
        />
      </View>
    </AppAuthenticatedLayout>
  );
}
