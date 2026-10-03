import { AppCard, AppIcon, AppPressable, AppText } from '@/components';

import { Lock } from 'lucide-react-native';
import { View } from 'react-native';

interface PrivateAnswerCardProps {
  onPress?: () => void;
}

export function PrivateAnswerCard({ onPress }: PrivateAnswerCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[24px] border border-border bg-card p-4">
      <AppPressable onPress={onPress} className="flex-row items-center">
        {/* Icon */}
        <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/15">
          <AppIcon icon={Lock} size={20} className="text-primary" />
        </View>

        {/* Content */}
        <View className="ml-5 flex-1">
          <AppText variant="lg" className="text-primary">
            Your answer is private and encrypted
          </AppText>

          <AppText variant="sm" className="mt-1 text-text-muted">
            Only you and your AI coach can see this.
          </AppText>
        </View>
      </AppPressable>
    </AppCard>
  );
}
