import { Image, Modal, Pressable, View } from 'react-native';

import type { AppImagePreviewModalProps } from './types';
import { AppLoader } from '@/components/foundation/AppLoader';
import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';

export function AppImagePreviewModal({
  visible,
  uri,
  title = 'Profile Photo',
  message = 'Use this photo as your profile picture?',
  cancelText,
  confirmText = 'Use Photo',
  onCancel,
  onConfirm,
  loading = false,
}: AppImagePreviewModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={loading ? undefined : onCancel}
    >
      <View className="flex-1 items-center justify-center bg-background/80 px-6">
        {/* Backdrop */}
        <Pressable
          className="absolute inset-0"
          disabled={loading}
          onPress={loading ? undefined : onCancel}
        />

        {/* Modal */}
        <View className="w-full max-w-[380px] rounded-[28px] bg-background p-6">
          {/* Title */}
          <AppText variant="xl" className="text-center font-semibold text-text">
            {title}
          </AppText>

          {/* Message */}
          <AppText
            variant="md"
            className="mt-2 text-center text-text-secondary"
          >
            {message}
          </AppText>

          {/* Image Preview */}
          <View className="mt-6 items-center">
            <View className="h-56 w-56 overflow-hidden rounded-full bg-surface">
              <Image
                source={{ uri }}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Actions */}
          <View className="mt-7 flex-row gap-3">
            {/* Cancel */}
            {cancelText && (
              <AppPressable
                onPress={onCancel}
                disabled={loading}
                className="flex-1 items-center justify-center rounded-2xl border border-border px-4 py-3"
              >
                <AppText variant="md" className="font-semibold text-text">
                  {cancelText}
                </AppText>
              </AppPressable>
            )}

            {/* Confirm */}
            <AppPressable
              onPress={onConfirm}
              disabled={loading}
              className="flex-1 items-center justify-center rounded-2xl bg-primary px-4 py-3"
            >
              {loading ? (
                <AppLoader />
              ) : (
                <AppText variant="md" className="font-semibold text-white">
                  {confirmText}
                </AppText>
              )}
            </AppPressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
