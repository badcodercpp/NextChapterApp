import {
  AIChatComponent,
  ChatComposer,
  QuickReplies,
} from '@/features/AIChat/components';
import { AppAuthenticatedLayout, AppContentLoader } from '@/components';

import React from 'react';
import { View } from 'react-native';
import { useAIChatBootstrap } from '@/features/AIChat/hooks/useAIChatBootstrap';
import { useAIChatSendMessageBootstrap } from '@/features/AIChat/hooks/useAIChatSendMessageBootstrap';

export function AIChatScreen() {
  useAIChatBootstrap();

  const { sendAiChatMessage, isBootstrapPending } =
    useAIChatSendMessageBootstrap();

  return (
    <AppAuthenticatedLayout noBottomPadding withoutScrollView>
      <View className="flex-1">
        <View className="mt-2 flex-1">
          <AIChatComponent />
        </View>

        {isBootstrapPending && <AppContentLoader />}

        <View className="mt-2">
          <QuickReplies
            onSend={sendAiChatMessage}
            isBootstrapPending={isBootstrapPending}
          />
        </View>
        <View className="mt-2">
          <ChatComposer
            onSend={sendAiChatMessage}
            isBootstrapPending={isBootstrapPending}
          />
        </View>
      </View>
    </AppAuthenticatedLayout>
  );
}
