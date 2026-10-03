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
    <AppCard className="overflow-hidden rounded-[22px] border border-border bg-card p-5">
      <View className="flex-row items-center">
        {/* Left Heart */}
        <AppIcon icon={Heart} size={28} className="text-primary" />

        {/* Message */}
        <View className="ml-6 flex-1">
          <AppText variant="lg" className="font-semibold leading-6 text-text">
            {message}
          </AppText>

          <AppText variant="md" className="mt-1 text-text-muted">
            {subtitle}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
