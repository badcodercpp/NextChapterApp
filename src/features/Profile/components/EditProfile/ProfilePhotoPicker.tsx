import { AppAvatar, AppText } from '@/components';

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
  return (
    <View className="items-center">
      {/* Profile Image */}
      <View className="items-center justify-center rounded-full border-2 border-secondary p-1">
        <View className="items-center justify-center rounded-full border border-secondary/30 p-1">
          <AppAvatar
            size="xl"
            name={me?.displayName ?? ''}
            uri={toHttpsURL(me?.avatarUrl) ?? undefined}
            enablePhotoActions
            className="h-40 w-40"
            accessibilityRole="button"
            accessibilityLabel="Change profile photo"
          />
        </View>
      </View>

      {/* Change Photo */}
      <AppText variant="lg" className="mt-5 font-semibold text-secondary">
        {title}
      </AppText>

      {/* Supported Formats */}
      <AppText variant="md" className="mt-1 text-center text-text-muted">
        {description}
      </AppText>
    </View>
  );
}
