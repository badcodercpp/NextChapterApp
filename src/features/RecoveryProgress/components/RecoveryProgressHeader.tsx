import { AppIcon, AppPressable, AppText } from '@/components';

import { Share2 } from 'lucide-react-native';
import { View } from 'react-native';

interface RecoveryProgressHeaderProps {
  onSharePress?: () => void;
}

export function RecoveryProgressHeader({
  onSharePress,
}: RecoveryProgressHeaderProps) {
  return (
    <View className="w-full">
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <AppText variant="3xl" className="font-bold text-white">
            Recovery Progress
          </AppText>

          <AppText variant="sm" className="mt-1 text-text-muted">
            Track your healing journey
          </AppText>
        </View>

        {/* Share */}
        {onSharePress && (
          <AppPressable
            onPress={onSharePress}
            className="
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-primary/50
              bg-primary/[0.08]
            "
            accessibilityRole="button"
            accessibilityLabel="Share recovery progress"
          >
            <AppIcon
              icon={Share2}
              size={24}
              className="text-primary"
              strokeWidth={2.5}
            />
          </AppPressable>
        )}
      </View>
    </View>
  );
}
