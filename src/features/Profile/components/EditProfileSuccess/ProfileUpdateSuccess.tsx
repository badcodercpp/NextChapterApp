import { AppAvatar, AppText } from '@/components';

import { View } from 'react-native';
import { selectMe } from '@/state/selectors';
import { toHttpsURL } from '@/utils';
import { useSelector } from 'react-redux';

interface ProfileUpdateSuccessProps {
  title?: string;
  description?: string;
}

export function ProfileUpdateSuccess({
  title = 'Profile Updated Successfully!',
  description = "Your profile is all set. Everything looks great — you're ready to dive in.",
}: ProfileUpdateSuccessProps) {
  const { data: me } = useSelector(selectMe);
  return (
    <View className="flex-1 items-center bg-background pt-4">
      {/* Profile Avatar */}
      <AppAvatar
        size="xl"
        name={me?.displayName ?? ''}
        uri={toHttpsURL(me?.avatarUrl) ?? undefined}
      />

      {/* Title */}
      <AppText
        variant="xl"
        className="
          mt-4
          text-center
          font-semibold
          text-text
        "
      >
        {title}
      </AppText>

      {/* Description */}
      <AppText
        variant="sm"
        className="
          mt-2
          text-center
          text-text-muted
        "
      >
        {description}
      </AppText>
    </View>
  );
}
