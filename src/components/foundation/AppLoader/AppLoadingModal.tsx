import { ActivityIndicator, Modal, View } from 'react-native';

import { AppLoadingModalProps } from './types';
import { AppText } from '@/components';
import React from 'react';

export function AppLoadingModal({
  visible,
  message = 'Please wait...',
}: AppLoadingModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="min-w-[140px] items-center rounded-2xl bg-card px-6 py-5 mx-5">
          <ActivityIndicator size="large" className="text-primary" />

          {message ? (
            <AppText variant="sm" className="mt-3 text-center text-text">
              {message}
            </AppText>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
