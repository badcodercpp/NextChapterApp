import { AppCard, AppText } from '@/components';

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
    <AppCard className=" rounded-3xl border border-border bg-card">
      <View className=" flex-row items-center">
        {/* Content */}
        <View className="flex-1">
          {/* Prompt */}
          <AppText variant="xl" className=" text-text">
            {prompt}
          </AppText>

          {/* Description */}
          <AppText variant="sm" className="mt-1 text-text-muted">
            {description}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
