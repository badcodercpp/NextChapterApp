import {
  AIChatComponent,
  ChatComposer,
  QuickReplies,
} from '@/features/AIChat/components';

import { AppAuthenticatedLayout } from '@/components';
import React from 'react';
import { View } from 'react-native';
import { useAIChatBootstrap } from '@/features/AIChat/hooks/useAIChatBootstrap';

export function AIChatScreen() {
  useAIChatBootstrap();

  return (
    <AppAuthenticatedLayout noBottomPadding withoutScrollView>
      <View className="mt-2 flex-1">
        <AIChatComponent />
        <View className="mt-2">
          <QuickReplies />
        </View>
        <View className="mt-2">
          <ChatComposer />
        </View>
      </View>
    </AppAuthenticatedLayout>
  );
}
