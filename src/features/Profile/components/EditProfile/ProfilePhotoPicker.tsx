import { AppAvatar, AppPressable, AppText } from '@/components';
import type { AppAvatarPhotoActionsHandle } from '@/components/foundation/AppAvatar/types';
import { useRef } from 'react';

import { View } from 'react-native';
import { selectMe } from '@/state/selectors';
import { toHttpsURL } from '@/utils';
import { useSelector } from 'react-redux';

interface ProfilePhotoPickerProps {
  title?: string;
  description?: string;
}

export function ProfilePhotoPicker({
  title = 'Change photo',
  description = 'JPG, PNG or GIF · Max 5MB',
}: ProfilePhotoPickerProps) {
  const { data: me } = useSelector(selectMe);
  const photoActionsRef = useRef<AppAvatarPhotoActionsHandle>(null);
  return (
    <View className="items-center">
      {/* Profile Image */}
      <View className="items-center justify-center rounded-full border-2 border-primary-v2 p-1">
        <View className="items-center justify-center rounded-full border border-primary-v2/30 p-1">
          <AppAvatar
            size="xl"
            name={me?.displayName ?? ''}
            uri={toHttpsURL(me?.avatarUrl) ?? undefined}
            enablePhotoActions
            photoActionsRef={photoActionsRef}
            className="h-40 w-40"
            accessibilityRole="button"
            accessibilityLabel="Change profile photo"
          />
        </View>
      </View>

      {/* Change Photo */}
      <AppPressable
        accessibilityRole="button"
        accessibilityLabel={title}
        hitSlop={8}
        onPress={() => photoActionsRef.current?.open()}
        className="mt-5"
      >
        <AppText variant="lg" className="font-semibold text-link-v2">
          {title}
        </AppText>
      </AppPressable>

      {/* Supported Formats */}
      <AppText variant="md" className="mt-1 text-center text-text-muted-v2">
        {description}
      </AppText>
    </View>
  );
}
