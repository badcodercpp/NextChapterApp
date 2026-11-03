import { AIChatMessage, CoachAvatar } from './AIChatMessage';
import { AppContentLoader, AppText } from '@/components';
import { FlatList, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { AICoachCard } from './AICoachCard';
import { ChatDateDivider } from './ChatDateDivider';
import { SendAiChatMessageInput } from '@/__generated__/graphql';
import { formatDistanceToNowStrict } from 'date-fns';
import { selectMyAiChatConversations } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface AIChatComponentProps {
  isBootstrapPending?: boolean;
  onSend?: (input: SendAiChatMessageInput) => void;
}

export function AIChatComponent({ isBootstrapPending }: AIChatComponentProps) {
  const flatListRef = useRef<FlatList>(null);

  const { data: myAiChatConversations, loading } = useSelector(
    selectMyAiChatConversations,
  );

  const messageHistory = useMemo(() => {
    const allMessage = myAiChatConversations?.[0]?.messages ?? [];

    return allMessage.map(message => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: formatDistanceToNowStrict(
        message.createdAt?.toString() ?? new Date().toString(),
        {
          addSuffix: true,
        },
      ),
    }));
  }, [myAiChatConversations]);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToEnd({
          animated: true,
        });
      });
    });
  }, []);

  useEffect(() => {
    if (!messageHistory.length) {
      return;
    }

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    });
  }, [messageHistory.length]);

  return (
    <View className="flex-1">
      {loading ? (
        <AppContentLoader />
      ) : (
        <FlatList
          ref={flatListRef}
          data={messageHistory}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View>
              <AICoachCard />
              <ChatDateDivider />
            </View>
          }
          renderItem={({ item }) => <AIChatMessage message={item} />}
          ListFooterComponent={
            <View>
              {isBootstrapPending && (
                <View
                  accessibilityRole="progressbar"
                  accessibilityLabel="Coach is replying"
                  accessibilityLiveRegion="polite"
                  className="mb-4 flex-row items-center"
                >
                  <CoachAvatar />
                  <View className="flex-row items-center gap-2 rounded-3xl border border-border-v2 bg-input-v2 px-4 py-3">
                    <View className="h-2 w-2 rounded-full bg-primary-v2" />
                    <View className="h-2 w-2 rounded-full bg-primary-v2/60" />
                    <View className="h-2 w-2 rounded-full bg-primary-v2/30" />
                    <AppText
                      variant="xs"
                      className="ml-1 shrink text-text-muted-v2"
                    >
                      Coach is typing...
                    </AppText>
                  </View>
                </View>
              )}
            </View>
          }
          onContentSizeChange={scrollToBottom}
          //   onLayout={scrollToBottom}
        />
      )}
    </View>
  );
}
