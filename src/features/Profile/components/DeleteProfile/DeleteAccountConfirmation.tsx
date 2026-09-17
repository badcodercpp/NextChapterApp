import { AlertTriangle, X } from 'lucide-react-native';
import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { Image, View } from 'react-native';

interface DeleteAccountConfirmationProps {
  name: string;
  email: string;
  memberSince: string;
  avatarUri?: string;

  onDelete?: () => void;
}

export function DeleteAccountConfirmation({
  name,
  email,
  memberSince,
  avatarUri,
  onDelete,
}: DeleteAccountConfirmationProps) {
  return (
    <View className="flex-1 bg-background px-0">
      {/* Warning Icon */}
      <View className="mt-4 items-center">
        <View className="relative h-[132px] w-[132px] items-center justify-center rounded-[38px] border border-red-400/40 bg-red-400/[0.05]">
          {/* Decorative dots */}
          <View className="absolute right-[13px] top-[13px] h-2.5 w-2.5 rounded-full bg-red-400/60" />

          <View className="absolute bottom-[13px] left-[13px] h-3.5 w-3.5 rounded-full bg-red-400/30" />

          <AppIcon
            icon={AlertTriangle}
            size={52}
            className="text-red-400"
            strokeWidth={1.8}
          />
        </View>
      </View>

      {/* Title */}
      <AppText
        variant="xl"
        className="mt-4 text-center font-semibold text-white"
      >
        Are you sure?
      </AppText>

      {/* Description */}
      <AppText
        variant="lg"
        className="mt-4 text-center leading-8 text-text-muted"
      >
        Deleting your account is permanent and cannot be undone. All your data
        will be lost.
      </AppText>

      {/* Account Card */}
      <AppCard
        className="
          mt-4
          rounded-[24px]
          border
          border-white/10
          bg-white/[0.05]
          py-4
        "
      >
        <View className="flex-1 flex-row items-center">
          {/* Avatar */}
          <View className="mr-5 h-[50px] w-[50px] overflow-hidden rounded-full border border-red-400/50">
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              <View className="h-full w-full items-center justify-center bg-white/10">
                <AppText variant="xl" className="font-semibold text-text-muted">
                  {name.charAt(0).toUpperCase()}
                </AppText>
              </View>
            )}
          </View>

          {/* Account Details */}
          <View className="flex-1">
            <AppText
              variant="lg"
              className="font-semibold text-white"
              numberOfLines={1}
            >
              {name}
            </AppText>

            <AppText
              variant="md"
              className="mt-1 text-text-muted"
              numberOfLines={1}
            >
              {email} · Member since {memberSince}
            </AppText>
          </View>

          {/* Delete */}
          <AppPressable
            onPress={onDelete}
            className="
              ml-4
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-red-400/40
              bg-red-400/[0.05]
            "
            accessibilityRole="button"
            accessibilityLabel="Delete account"
          >
            <AppIcon
              icon={X}
              size={25}
              className="text-red-400"
              strokeWidth={2.8}
            />
          </AppPressable>
        </View>
      </AppCard>
    </View>
  );
}
