import { Camera, ChevronRight, Eye } from 'lucide-react-native';
import { View } from 'react-native';

import type { AppFileChooseModalProps } from './types';
import { AppIcon } from '@/components/foundation/AppIcon';
import {
  AppPhotoModalHeader,
  AppPhotoModalShell,
} from '@/components/foundation/AppImagePreviewModal/AppImagePreviewModal';
import { AppPressable } from '@/components/foundation/AppPressable';
import { AppText } from '@/components/foundation/AppText';
import React from 'react';
import { cn } from '@/utils';

export function AppFileChooseContent({
  title = 'Profile Photo',
  viewText = 'View Photo',
  changeText = 'Change Photo',
  cancelText = 'Cancel',
  onView,
  onChange,
  onCancel,
  showView = true,
  showChange = true,
}: Omit<AppFileChooseModalProps, 'visible' | 'onDismiss'>) {
  const options = [
    showView && {
      key: 'view',
      icon: Eye,
      label: viewText,
      hint: 'See your current photo',
      onPress: onView,
      primary: false,
    },
    showChange && {
      key: 'change',
      icon: Camera,
      label: changeText,
      hint: 'Pick a new photo from your library',
      onPress: onChange,
      primary: true,
    },
  ].filter(Boolean) as {
    key: string;
    icon: typeof Eye;
    label: string;
    hint: string;
    onPress?: () => void;
    primary: boolean;
  }[];

  return (
    <>
      <AppPhotoModalHeader title={title} message="What would you like to do?" />

      <View className="mt-6 gap-3">
        {options.map(option => (
          <AppPressable
            key={option.key}
            accessibilityRole="button"
            accessibilityLabel={option.label}
            onPress={option.onPress}
            className={cn(
              'flex-row items-center rounded-2xl border p-3',
              option.primary
                ? 'border-primary-v2 bg-primary-v2/15'
                : 'border-primary-v2/30 bg-background-v2/40',
            )}
          >
            <View
              className={cn(
                'h-11 w-11 items-center justify-center rounded-xl',
                option.primary ? 'bg-primary-v2' : 'bg-primary-v2/15',
              )}
            >
              <AppIcon
                icon={option.icon}
                size={20}
                className={
                  option.primary ? 'text-on-primary-v2' : 'text-link-v2'
                }
              />
            </View>
            <View className="ml-3 flex-1">
              <AppText variant="md" className="font-semibold text-text-v2">
                {option.label}
              </AppText>
              <AppText variant="sm" className="text-text-muted-v2">
                {option.hint}
              </AppText>
            </View>
            <AppIcon
              icon={ChevronRight}
              size={20}
              className="text-text-muted-v2"
            />
          </AppPressable>
        ))}
      </View>

      <AppPressable
        accessibilityRole="button"
        onPress={onCancel}
        className="mt-5 items-center justify-center rounded-2xl border border-primary-v2/40 px-4 py-3.5"
      >
        <AppText variant="md" className="font-semibold text-link-v2">
          {cancelText}
        </AppText>
      </AppPressable>
    </>
  );
}

export function AppFileChooseModal({
  visible,
  onDismiss,
  ...props
}: AppFileChooseModalProps) {
  return (
    <AppPhotoModalShell
      visible={visible}
      onClose={props.onCancel}
      onDismiss={onDismiss}
    >
      <AppFileChooseContent {...props} />
    </AppPhotoModalShell>
  );
}
