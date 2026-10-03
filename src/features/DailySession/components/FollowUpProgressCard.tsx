import { AppCard, AppIcon, AppText } from '@/components';

import { Sparkles } from 'lucide-react-native';
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
    <AppCard className="overflow-hidden rounded-[24px] border border-border bg-card px-5 py-4">
      <View className="flex-row items-start">
        {/* Coach / Healing Icon */}
        <View className="h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary/5">
          <View className="h-8 w-8 items-center justify-center rounded-full border border-primary/50 bg-primary/10">
            <AppIcon icon={Sparkles} size={16} className="text-primary" />
          </View>
        </View>

        {/* Message */}
        <View className="ml-4 flex-1">
          <AppText variant="lg" className="font-semibold text-text">
            {title}
          </AppText>

          <AppText variant="md" className="mt-1 text-text-muted">
            {message}
          </AppText>
        </View>

        {/* Progress */}
        <View className="ml-4 items-center">
          <AppText
            variant="xl"
            className="font-semibold leading-none text-purple-400"
          >
            {current} / {total}
          </AppText>

          <AppText variant="xs" className="mt-1 text-text-muted">
            Follow-ups
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
