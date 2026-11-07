import { AppCard, AppIcon, AppText } from '@/components';
import { Sparkles, Star, Trophy } from 'lucide-react-native';

import React from 'react';
import { View } from 'react-native';

interface JournalPromptCardProps {
  prompt?: string;
  description?: string;
}

export function JournalPromptCard({
  prompt = 'What small win are you proud of today?',
  description = 'Celebrate the progress, no matter how small.',
}: JournalPromptCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[26px] border border-primary-v2/40 bg-background-v2 p-5">
      <View
        pointerEvents="none"
        className="absolute -right-10 -top-24 h-48 w-56 rounded-full bg-primary-v2/15"
      />
      <View
        pointerEvents="none"
        className="absolute -bottom-36 -right-16 h-48 w-64 rotate-[-25deg] rounded-full bg-primary-v2/10"
      />
      <View className=" flex-row items-center">
        <View className="mr-4 h-16 w-16 shrink-0 items-center justify-center rounded-[20px] border border-primary-v2/50 bg-primary-v2/20">
          <AppIcon
            icon={Trophy}
            size={40}
            className="text-link-v2"
            strokeWidth={1.8}
          />
          <View className="absolute top-5 items-center">
            <AppIcon icon={Star} size={13} className="text-link-v2" />
          </View>
          <View className="absolute -right-1 -top-3">
            <AppIcon icon={Sparkles} size={18} className="text-link-v2" />
          </View>
        </View>
        {/* Content */}
        <View className="flex-1 border-l border-primary-v2/25 pl-4">
          {/* Prompt */}
          <AppText variant="lg" className="font-bold leading-6 text-text-v2">
            {prompt}
          </AppText>

          {/* Description */}
          <AppText variant="sm" className="mt-2 leading-5 text-text-muted-v2">
            {description}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
