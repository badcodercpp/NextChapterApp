import { AppCard, AppIcon, AppText } from '@/components';

import { Target } from 'lucide-react-native';
import { View } from 'react-native';

interface TodaysFocusCardProps {
  focus: string;
  day: number;
  totalDays: number;
}

export function TodaysFocusCard({
  focus,
  day,
  totalDays,
}: TodaysFocusCardProps) {
  return (
    <AppCard className="rounded-[28px] border border-primary/30 bg-card px-4 py-5">
      <View className="flex-row items-center">
        {/* Focus Icon */}
        <View className="h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <AppIcon
            icon={Target}
            size={30}
            className="text-primary"
            strokeWidth={2}
          />
        </View>

        {/* Focus Content */}
        <View className="ml-3 flex-1">
          <AppText variant="sm" className="text-primary">
            Today's Focus
          </AppText>

          <AppText variant="lg" className="mt-1 text-text" numberOfLines={2}>
            {focus}
          </AppText>
        </View>

        {/* Day */}
        <View className="ml-3 items-end">
          <AppText variant="xl" className="text-primary">
            Day {day}
          </AppText>

          <AppText variant="sm" className="mt-0.5 text-text-secondary">
            of {totalDays}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
