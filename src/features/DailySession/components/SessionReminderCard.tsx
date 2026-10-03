import { AppCard, AppIcon, AppText } from '@/components';

import { Heart } from 'lucide-react-native';
import { View } from 'react-native';

interface SessionReminderCardProps {}

export function SessionReminderCard({}: SessionReminderCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[24px] border border-border bg-card p-5">
      <View className="flex-row items-center">
        {/* Heart */}
        <View className="h-14 w-14 items-center justify-center rounded-full bg-primary/15">
          <AppIcon icon={Heart} size={24} className="text-text" />
        </View>

        {/* Content */}
        <View className="ml-5 flex-1">
          <AppText variant="lg" className="text-text">
            Remember
          </AppText>

          <AppText variant="sm" className="mt-1 text-text-muted">
            There are no right or wrong answers, Be honest with yourself.
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
