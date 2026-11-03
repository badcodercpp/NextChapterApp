import { AIChatComponent, ChatComposer } from '@/features/AIChat/components';
import { AppIcon, AppPressable, AppScreen, AppText } from '@/components';

import React from 'react';
import { View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAIChatBootstrap } from '@/features/AIChat/hooks/useAIChatBootstrap';
import { useAIChatSendMessageBootstrap } from '@/features/AIChat/hooks/useAIChatSendMessageBootstrap';

export function AIChatScreen() {
  const navigation = useNavigation();
  useAIChatBootstrap();

  const { sendAiChatMessage, isBootstrapPending } =
    useAIChatSendMessageBootstrap();

  return (
    <AppScreen
      keyboard
      safeArea={false}
      className="bg-background-v2"
      contentClassName="px-5 pb-3"
    >
      <View className="mb-4 mt-2 flex-row items-center">
        <AppPressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => {
            if (navigation.canGoBack()) navigation.goBack();
          }}
          className="h-11 w-11 items-center justify-center rounded-full border border-border-v2 bg-surface-v2"
        >
          <AppIcon icon={ChevronLeft} size={22} className="text-text-v2" />
        </AppPressable>
        <View className="flex-1 px-2">
          <View className="flex-row items-center justify-center gap-2">
            <AppText variant="lg" className="font-semibold text-text-v2">
              AI Coach Chat
            </AppText>
            <View className="h-2 w-2 rounded-full bg-success-v2" />
          </View>
          <View className="w-11" />
          <AppText variant="xs" className="mt-1 text-center text-text-muted-v2">
            Your 24/7 support, always here for you
          </AppText>
        </View>
      </View>

      <AIChatComponent
        onSend={sendAiChatMessage}
        isBootstrapPending={isBootstrapPending}
      />
      <View className="pt-3">
        <ChatComposer
          onSend={sendAiChatMessage}
          isBootstrapPending={isBootstrapPending}
        />
      </View>
    </AppScreen>
  );
}
