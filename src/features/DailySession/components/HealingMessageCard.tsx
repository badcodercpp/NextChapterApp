import { AppCard, AppIcon, AppText } from '@/components';

import { Heart } from 'lucide-react-native';
import { View } from 'react-native';

interface HealingMessageCardProps {
  message?: string;
  subtitle?: string;
}

export function HealingMessageCard({
  message = 'Every question is a step toward healing.',
  subtitle = "You're doing great, Aarav.",
}: HealingMessageCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[22px] border border-primary-v2/30 bg-background-v2 p-4">
      <View
        pointerEvents="none"
        className="absolute -bottom-16 -right-12 h-28 w-44 rounded-full bg-primary-v2/15"
      />
      <View className="flex-row items-center">
        <View className="h-10 w-10 items-center justify-center rounded-[14px] bg-primary-v2/15">
          <AppIcon icon={Heart} size={22} className="text-link-v2" />
        </View>

        <View className="ml-3 flex-1 border-l border-primary-v2/30 pl-3">
          <AppText
            variant="md"
            className="font-semibold leading-5 text-text-v2"
          >
            {message}
          </AppText>

          <AppText variant="xs" className="mt-1 text-text-muted-v2">
            {subtitle}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
