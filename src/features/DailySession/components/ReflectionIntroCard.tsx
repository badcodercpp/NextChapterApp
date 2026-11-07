import { AppCard, AppIcon, AppText } from '@/components';

import React from 'react';
import { Sprout, UserRound } from 'lucide-react-native';
import { View } from 'react-native';

interface ReflectionIntroCardProps {
  title?: string;
  heading?: string;
  description?: string;
}

export function ReflectionIntroCard({
  title = 'Time to Reflect',
  heading = "Let's pause and reflect on today's session.",
  description = 'Your reflections help you understand yourself better and track your growth.',
}: ReflectionIntroCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[28px] border border-primary-v2/50 bg-background-v2 p-5">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-16 -right-12 h-32 w-48 rounded-full bg-primary-v2/20"
      />
      <View className="flex-row items-center">
        <View className="h-11 w-11 items-center justify-center rounded-2xl border border-primary-v2/30 bg-primary-v2/20">
          <AppIcon icon={UserRound} size={26} className="text-link-v2" />
        </View>

        <AppText
          variant="lg"
          className="ml-3 flex-1 border-l border-primary-v2/40 pl-3 font-semibold text-link-v2"
        >
          {title}
        </AppText>
      </View>

      <View className="mt-4">
        <AppText variant="xl" className="font-bold leading-7 text-text-v2">
          {heading}
        </AppText>

        <View className="mt-3 flex-row items-center">
          <AppText
            variant="sm"
            className="flex-1 pr-3 leading-5 text-text-muted-v2"
          >
            {description}
          </AppText>
          <AppIcon icon={Sprout} size={64} className="text-link-v2" />
        </View>
      </View>
    </AppCard>
  );
}
