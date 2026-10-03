import { Modal, Pressable, View } from 'react-native';

import { AlertTriangle } from 'lucide-react-native';
import { AppConfirmModalProps } from './types';
import { AppIcon } from '@/components/foundation/AppIcon';
import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';

export function AppConfirmModal({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  icon: Icon = AlertTriangle,
}: AppConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <Pressable className="absolute inset-0" onPress={onCancel} />

        <View className="w-full max-w-[380px] rounded-[28px] bg-background p-6">
          {/* Icon */}
          <View className="mb-5 self-center rounded-full bg-warning/10 p-4">
            <AppIcon icon={Icon} size={28} className="text-warning" />
          </View>

          {/* Title */}
          <AppText variant="xl" className="text-center font-semibold text-text">
            {title}
          </AppText>

          {/* Message */}
          {message && (
            <AppText
              variant="md"
              className="mt-3 text-center leading-6 text-text-secondary"
            >
              {message}
            </AppText>
          )}

          {/* Actions */}
          <View className="mt-7 flex-row gap-3">
            <AppPressable
              onPress={onCancel}
              className="flex-1 items-center justify-center rounded-2xl border border-border px-4 py-3"
            >
              <AppText variant="md" className="font-semibold text-text">
                {cancelText}
              </AppText>
            </AppPressable>

            <AppPressable
              onPress={onConfirm}
              className="flex-1 items-center justify-center rounded-2xl bg-primary px-4 py-3"
            >
              <AppText variant="md" className="font-semibold text-white">
                {confirmText}
              </AppText>
            </AppPressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
