import { AppAvatar, AppIcon, AppPressable, AppText } from '@/components';
import { selectApplicationConfig, selectMe } from '@/state/selectors';

import { Pencil } from 'lucide-react-native';
import { View } from 'react-native';
import { toHttpsURL } from '@/utils';
import { useSelector } from 'react-redux';

interface ProfileSummaryCardProps {
  onEditPress?: () => void;
}

export function ProfileSummaryCard({ onEditPress }: ProfileSummaryCardProps) {
  const { data: me } = useSelector(selectMe);
  const { data: applicationConfig } = useSelector(selectApplicationConfig);

  return (
    <View className="rounded-[28px] border border-secondary/40 bg-card/60 p-4">
      <View className="flex-row items-center">
        {/* Profile Image */}
        <View className="mr-4">
          <View className="items-center justify-center">
            <AppAvatar
              size="lg"
              name={me?.displayName ?? ''}
              uri={toHttpsURL(me?.avatarUrl) ?? undefined}
            />
          </View>
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Name + Edit */}
          <View className="flex-row items-start justify-between">
            <AppText
              variant="xl"
              className="flex-1 font-semibold text-text"
              numberOfLines={1}
            >
              {me?.displayName ?? ''}
            </AppText>

            <AppPressable
              onPress={onEditPress}
              className="
                ml-3
                w-10
                h-10
                flex-row
                items-center
                justify-center
                rounded-full
                border
                border-text-muted/30
                bg-white/5
                px-4
                py-2.5
                absolute
                right-0
              "
            >
              <AppIcon
                icon={Pencil}
                size={18}
                strokeWidth={2.5}
                className="text-secondary"
              />
            </AppPressable>
          </View>
          {/* Quote */}
          <View className="mt-1 flex-row">
            <AppText variant="md" className="mr-8 flex-1 text-text-secondary">
              {me?.bio ?? applicationConfig?.profileSummaryQuote}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}
