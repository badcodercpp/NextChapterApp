import { Camera, Eye, Image as ImageIcon } from 'lucide-react-native';
import { Modal, Pressable, View } from 'react-native';

import type { AppFileChooseModalProps } from './types';
import { AppIcon } from '@/components/foundation/AppIcon';
import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';

export function AppFileChooseModal({
  visible,
  title = 'Profile Photo',
  viewText = 'View Photo',
  changeText = 'Change Photo',
  cancelText = 'Cancel',
  onView,
  onChange,
  onCancel,
  onDismiss,
  showView = true,
  showChange = true,
}: AppFileChooseModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      onDismiss={onDismiss}
    >
      <View className="flex-1 items-center justify-center bg-background/80 px-6">
        <Pressable className="absolute inset-0" onPress={onCancel} />

        <View className="w-full max-w-[380px] rounded-[28px] bg-background p-6">
          <View className="mb-5 self-center rounded-full bg-primary/10 p-4">
            <AppIcon icon={ImageIcon} size={28} className="text-primary" />
          </View>

          <AppText variant="xl" className="text-center font-semibold text-text">
            {title}
          </AppText>

          <View className="mt-7 gap-3">
            {showView && (
              <AppPressable
                onPress={onView}
                className="flex-row items-center justify-center rounded-2xl border border-border px-4 py-3"
              >
                <AppIcon icon={Eye} size={20} className="mr-2 text-text" />

                <AppText variant="md" className="font-semibold text-text">
                  {viewText}
                </AppText>
              </AppPressable>
            )}

            {showChange && (
              <AppPressable
                onPress={onChange}
                className="flex-row items-center justify-center rounded-2xl bg-primary px-4 py-3"
              >
                <AppIcon icon={Camera} size={20} className="mr-2 text-white" />

                <AppText variant="md" className="font-semibold text-white">
                  {changeText}
                </AppText>
              </AppPressable>
            )}

            <AppPressable
              onPress={onCancel}
              className="items-center justify-center rounded-2xl px-4 py-3"
            >
              <AppText
                variant="md"
                className="font-semibold text-text-secondary"
              >
                {cancelText}
              </AppText>
            </AppPressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
