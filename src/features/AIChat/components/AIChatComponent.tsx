import { FlatList, View } from 'react-native';
import { useMemo, useRef } from 'react';

import { AICoachCard } from './AICoachCard';
import { AppContentLoader } from '@/components';
import { ChatDateDivider } from './ChatDateDivider';
import { ChatMessage } from '@/features/CommonFeature';
import { formatDistanceToNowStrict } from 'date-fns';
import { selectMyAiChatConversations } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface AIChatComponentProps {
  isBootstrapPending?: boolean;
}

export function AIChatComponent({}: AIChatComponentProps) {
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

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToEnd({
          animated: false,
        });
      });
    });
  };

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
          ListHeaderComponent={
            <View>
              <AICoachCard />
              <ChatDateDivider />
            </View>
          }
          renderItem={({ item }) => <ChatMessage message={item} />}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        />
      )}
    </View>
  );
}
