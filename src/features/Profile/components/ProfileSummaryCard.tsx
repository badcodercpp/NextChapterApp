import { AppAvatar, AppIcon, AppPressable, AppText } from '@/components';
import { Pencil, Sprout } from 'lucide-react-native';

import { View } from 'react-native';

interface ProfileSummaryCardProps {
  name?: string;
  status?: string;
  quote?: string;
  onEditPress?: () => void;
}

export function ProfileSummaryCard({
  name = 'Ajay Jha',
  status = 'Recovering & Growing',
  quote = 'One day at a time.\nI choose me. 💜',
  onEditPress,
}: ProfileSummaryCardProps) {
  return (
    <View className="rounded-[28px] border border-secondary/40 bg-card/60 p-4">
      <View className="flex-row items-center">
        {/* Profile Image */}
        <View className="mr-6">
          <View className="items-center justify-center">
            <AppAvatar size="lg" name="Ajay Jha" />
          </View>
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Name + Edit */}
          <View className="flex-row items-start justify-between">
            <AppText
              variant="2xl"
              className="flex-1 font-semibold text-text"
              numberOfLines={1}
            >
              {name}
            </AppText>

            <AppPressable
              onPress={onEditPress}
              className="
                ml-3
                min-w-[105px]
                flex-row
                items-center
                justify-center
                rounded-full
                border
                border-text-muted/30
                bg-white/5
                px-4
                py-2.5
              "
            >
              <AppIcon
                icon={Pencil}
                size={18}
                strokeWidth={2.5}
                className="text-secondary"
              />

              <AppText
                variant="md"
                className="ml-2 font-semibold text-secondary"
              >
                Edit
              </AppText>
            </AppPressable>
          </View>

          {/* Status */}
          <View className="mt-2 flex-row items-center">
            <AppIcon
              icon={Sprout}
              size={21}
              strokeWidth={2.5}
              className="mr-2 text-green-400"
            />

            <AppText variant="lg" className="font-medium text-green-400">
              {status}
            </AppText>
          </View>

          {/* Quote */}
          <View className="mt-5 flex-row">
            <AppText variant="lg" className="flex-1 text-text-secondary">
              {quote}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}
