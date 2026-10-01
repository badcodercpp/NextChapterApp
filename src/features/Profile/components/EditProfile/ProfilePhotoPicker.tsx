import { AppAvatar, AppPressable, AppText } from '@/components';

import { View } from 'react-native';
import { selectMe } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface ProfilePhotoPickerProps {
  onPress?: () => void;
  title?: string;
  description?: string;
}

export function ProfilePhotoPicker({
  onPress,
  title = 'Change photo',
  description = 'JPG, PNG or GIF · Max 5MB',
}: ProfilePhotoPickerProps) {
  const { data: me } = useSelector(selectMe);
  return (
    <View className="items-center">
      {/* Profile Image */}
      <View className="relative">
        {/* Gradient-like Border */}

        <View className="items-center justify-center">
          <AppAvatar size="xl" name={me?.displayName ?? ''} />
        </View>
      </View>

      {/* Change Photo */}
      <AppPressable onPress={onPress} className="mt-5">
        <AppText variant="md" className="font-semibold text-secondary">
          {title}
        </AppText>
      </AppPressable>

      {/* Supported Formats */}
      <AppText variant="md" className="mt-1 text-text-muted">
        {description}
      </AppText>
    </View>
  );
}
