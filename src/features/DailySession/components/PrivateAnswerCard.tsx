import { AppCard, AppIcon, AppPressable, AppText } from '@/components';

import { Lock } from 'lucide-react-native';
import { View } from 'react-native';

interface PrivateAnswerCardProps {
  onPress?: () => void;
}

export function PrivateAnswerCard({ onPress }: PrivateAnswerCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[22px] border border-primary-v2/30 bg-background-v2 p-3.5">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <AppPressable onPress={onPress} className="flex-row items-center">
        <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-primary-v2/20">
          <AppIcon icon={Lock} size={22} className="text-link-v2" />
        </View>

        <View className="ml-3 flex-1">
          <AppText
            variant="sm"
            className="font-semibold leading-5 text-link-v2"
          >
            Your answer is private and encrypted
          </AppText>

          <AppText variant="xs" className="mt-1 leading-4 text-text-muted-v2">
            Only you and your AI coach can see this.
          </AppText>
        </View>
      </AppPressable>
    </AppCard>
  );
}
