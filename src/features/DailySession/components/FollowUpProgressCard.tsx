import { AppCard, AppIcon, AppText } from '@/components';

import { Award } from 'lucide-react-native';
import { View } from 'react-native';

interface FollowUpProgressCardProps {
  current: number;
  total: number;
  title?: string;
  message?: string;
}

export function FollowUpProgressCard({
  current,
  total,
  title = "You're doing great!",
  message = 'Keep going, healing takes time.',
}: FollowUpProgressCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[24px] border border-primary-v2/30 bg-background-v2 px-4 py-4">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View className="flex-row items-center">
        <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-primary-v2/25">
          <AppIcon icon={Award} size={30} className="text-link-v2" />
        </View>

        <View className="ml-3 flex-1 border-l border-primary-v2/30 pl-3">
          <AppText variant="md" className="font-semibold text-text-v2">
            {title}
          </AppText>

          <AppText variant="xs" className="mt-1 text-text-muted-v2">
            {message}
          </AppText>
        </View>

        <View className="ml-3 items-center border-l border-primary-v2/30 pl-3">
          <AppText variant="lg" className="font-bold text-link-v2">
            {current} / {total}
          </AppText>

          <AppText variant="xs" className="mt-1 text-text-muted-v2">
            Follow-ups
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
