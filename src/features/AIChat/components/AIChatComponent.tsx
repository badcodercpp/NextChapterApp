import { FlatList, View } from 'react-native';

import { AICoachCard } from './AICoachCard';
import { ChatDateDivider } from './ChatDateDivider';
import { ChatMessage } from '@/features/CommonFeature';
import { formatDistanceToNowStrict } from 'date-fns';
import { selectMyAiChatConversations } from '@/state/selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface AIChatComponentProps {}

export function AIChatComponent({}: AIChatComponentProps) {
  const { data: myAiChatConversations } = useSelector(
    selectMyAiChatConversations,
  );

  const messageHistory = useMemo(() => {
    const allMessage = myAiChatConversations?.[0].messages ?? [];

    return allMessage?.map(message => {
      const timeAgo = formatDistanceToNowStrict(
        message.createdAt?.toString() ?? new Date().toString(),
        {
          addSuffix: true,
        },
      );
      return {
        id: message.id,
        role: message.role,
        content: message.content,
        createdAt: timeAgo,
      };
    });
  }, [myAiChatConversations]);

  return (
    <FlatList
      data={messageHistory}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-0"
      ListHeaderComponent={
        <View>
          <AICoachCard />
          <ChatDateDivider />
        </View>
      }
      renderItem={({ item }) => <ChatMessage message={item} />}
    />
  );
}
