import {
  ActivityIndicator,
  ColorValue,
  Image,
  Modal,
  Pressable,
  View,
} from 'react-native';
import { ImageIcon, X } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

import type { AppImagePreviewModalProps } from './types';
import { AppIcon } from '@/components/foundation/AppIcon';
import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import React, { ReactNode } from 'react';
import { useCSSVariable } from 'uniwind';

export function AppModalWaves() {
  const primary = useCSSVariable('--color-primary-v2');
  const color = typeof primary === 'string' ? primary : '#7c3aed';

  return (
    <View
      pointerEvents="none"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      className="absolute inset-0"
    >
      {/* Keyed by colour so react-native-svg repaints on theme change. */}
      <Svg
        key={color}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <Path
          d="M0 0 H34 C26 8 30 16 20 22 C12 27 6 26 0 32 Z"
          fill={color}
          fillOpacity={0.22}
        />
        <Path
          d="M100 64 C88 66 84 74 76 80 C68 86 62 90 56 100 H100 Z"
          fill={color}
          fillOpacity={0.16}
        />
      </Svg>
    </View>
  );
}

interface AppPhotoModalShellProps {
  visible: boolean;
  onClose?: () => void;
  closeDisabled?: boolean;
  onDismiss?: () => void;
  children: ReactNode;
}

/** Shared modal frame so photo steps can swap content without re-opening. */
export function AppPhotoModalShell({
  visible,
  onClose,
  closeDisabled = false,
  onDismiss,
  children,
}: AppPhotoModalShellProps) {
  const close = closeDisabled ? undefined : onClose;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={close}
      onDismiss={onDismiss}
    >
      <View className="flex-1 items-center justify-center bg-black/60 px-6">
        <Pressable
          className="absolute inset-0"
          disabled={closeDisabled}
          onPress={close}
          accessibilityLabel="Close"
        />

        <View className="w-full max-w-[380px] overflow-hidden rounded-[28px] border border-primary-v2/30 bg-surface-v2 p-6">
          <AppModalWaves />

          <AppPressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            onPress={close}
            disabled={closeDisabled}
            hitSlop={8}
            className="absolute right-4 top-4 z-10 h-10 w-10 items-center justify-center rounded-full bg-primary-v2/15"
          >
            <AppIcon icon={X} size={20} className="text-text-v2" />
          </AppPressable>

          {children}
        </View>
      </View>
    </Modal>
  );
}

export function AppPhotoModalHeader({
  title,
  message,
}: {
  title: string;
  message?: string;
}) {
  return (
    <View className="items-center">
      <View className="h-12 w-12 items-center justify-center rounded-2xl border border-primary-v2/30 bg-primary-v2/15">
        <AppIcon icon={ImageIcon} size={22} className="text-link-v2" />
      </View>
      <AppText variant="xl" className="mt-3 text-center font-bold text-text-v2">
        {title}
      </AppText>
      {!!message && (
        <AppText variant="md" className="mt-1 text-center text-text-muted-v2">
          {message}
        </AppText>
      )}
    </View>
  );
}

export function AppImagePreviewContent({
  uri,
  title = 'Profile Photo',
  message = 'Use this photo as your profile picture?',
  cancelText,
  confirmText = 'Use Photo',
  onCancel,
  onConfirm,
  loading = false,
}: Omit<AppImagePreviewModalProps, 'visible'>) {
  const onPrimary = useCSSVariable('--color-on-primary-v2') ?? '#ffffff';

  return (
    <>
      <AppPhotoModalHeader title={title} message={message} />

      <View className="mt-6 items-center justify-center">
        <View className="absolute h-64 w-64 rounded-full bg-primary-v2/10" />
        <View className="h-56 w-56 items-center justify-center rounded-full border-4 border-primary-v2 bg-background-v2 p-1">
          <View className="h-full w-full overflow-hidden rounded-full bg-input-v2">
            <Image
              source={{ uri }}
              className="h-full w-full"
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      <View className="mt-8 flex-row gap-3">
        {cancelText && (
          <AppPressable
            onPress={onCancel}
            disabled={loading}
            className="flex-1 items-center justify-center rounded-2xl border border-primary-v2/40 bg-surface-v2 px-4 py-3.5"
          >
            <AppText variant="md" className="font-semibold text-link-v2">
              {cancelText}
            </AppText>
          </AppPressable>
        )}

        <AppPressable
          onPress={onConfirm}
          disabled={loading}
          disabledOpacity={1}
          accessibilityState={{ busy: loading }}
          className="flex-1 flex-row items-center justify-center rounded-2xl bg-primary-v2 px-4 py-3.5"
        >
          {loading && (
            <ActivityIndicator
              size="small"
              color={onPrimary as ColorValue}
              className="mr-2"
            />
          )}
          <AppText variant="md" className="font-semibold text-on-primary-v2">
            {loading ? 'Uploading…' : confirmText}
          </AppText>
        </AppPressable>
      </View>
    </>
  );
}

export function AppImagePreviewModal({
  visible,
  ...props
}: AppImagePreviewModalProps) {
  return (
    <AppPhotoModalShell
      visible={visible}
      onClose={props.onCancel}
      closeDisabled={props.loading}
    >
      <AppImagePreviewContent {...props} />
    </AppPhotoModalShell>
  );
}
