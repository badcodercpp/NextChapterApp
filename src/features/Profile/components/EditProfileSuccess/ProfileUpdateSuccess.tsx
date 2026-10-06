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

      {/* All Done */}
      <View className="mt-4 flex-row items-center">
        <View className="mr-4 h-2.5 w-2.5 rounded-full bg-primary" />

        <AppText variant="md" className="font-semibold uppercase text-text">
          All Done
        </AppText>

        <View className="ml-4 h-2.5 w-2.5 rounded-full bg-primary" />
      </View>

      {/* Title */}
      <AppText
        variant="3xl"
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
        variant="lg"
        className="
          mt-4
          text-center
          text-text-muted
        "
      >
        {description}
      </AppText>
    </View>
  );
}
