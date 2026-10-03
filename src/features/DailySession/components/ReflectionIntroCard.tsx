import { AppCard, AppIcon, AppText } from '@/components';

import React from 'react';
import { UserRound } from 'lucide-react-native';
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
    <AppCard className="overflow-hidden rounded-[24px] border border-border bg-card p-5">
      {/* Header */}
      <View className="flex-row items-center">
        <AppIcon icon={UserRound} size={24} className="text-primary" />

        <AppText variant="xl" className="ml-3 text-primary">
          {title}
        </AppText>
      </View>

      {/* Content */}
      <View className="mt-2">
        <AppText variant="lg" className=" text-text">
          {heading}
        </AppText>

        <AppText variant="md" className="mt-2 text-text-secondary">
          {description}
        </AppText>
      </View>
    </AppCard>
  );
}
