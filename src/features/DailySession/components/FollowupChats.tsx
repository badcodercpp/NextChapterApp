import {
  AICoachCardFollowupCard,
  AssistantChatMessageCard,
  UserChatMessageCard,
} from '@/features/CommonFeature';
import {
  selectApplicationConfig,
  selectMe,
  selectTodayQuestion,
} from '@/state/selectors';
import { useCallback, useMemo } from 'react';

import { ConversationRole } from '@/__generated__/graphql';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

interface FollowUpChatsProps {}

export function FollowUpChats({}: FollowUpChatsProps) {
  const { data: todayQuestion } = useSelector(selectTodayQuestion);
  const { data: me } = useSelector(selectMe);
  const { data: applicationConfig } = useSelector(selectApplicationConfig);

  const getTodayQuestionContent = useCallback(() => {
    const firstItem = [...(todayQuestion?.conversation ?? [])].find(
      item => item.role === ConversationRole.Assistant,
    );
    return firstItem;
  }, [todayQuestion]);

  const getTodayUserReplyContent = useCallback(() => {
    const firstItem = [...(todayQuestion?.conversation ?? [])].find(
      item => item.role === ConversationRole.User,
    );
    return firstItem;
  }, [todayQuestion]);

  const getRemainingConversation = useCallback(() => {
    const conversation = todayQuestion?.conversation ?? [];

    const assistantIndex = conversation.findIndex(
      item => item.role === ConversationRole.Assistant,
    );

    const userIndex = conversation.findIndex(
      item => item.role === ConversationRole.User,
    );

    return conversation.filter(
      (_, index) => index !== assistantIndex && index !== userIndex,
    );
  }, [todayQuestion]);

  const todayQuestionContent = useMemo(() => {
    return getTodayQuestionContent();
  }, [getTodayQuestionContent]);

  const todayUserReplyContent = useMemo(() => {
    return getTodayUserReplyContent();
  }, [getTodayUserReplyContent]);

  const remainingConversation = useMemo(() => {
    return getRemainingConversation() ?? [];
  }, [getRemainingConversation]);

  return (
    <View className="flex-1">
      <AssistantChatMessageCard
        content={
          todayQuestionContent?.content ?? todayQuestionContent?.question ?? ''
        }
        createdAt={todayQuestionContent?.createdAt?.toString() ?? ''}
      />
      <View className="mt-4">
        <UserChatMessageCard
          content={todayUserReplyContent?.content ?? ''}
          createdAt={todayUserReplyContent?.createdAt?.toString() ?? ''}
          userName={me?.displayName ?? ''}
        />
      </View>
      <View className="mt-0">
        {remainingConversation.map((item, index) => {
          if (item.role === ConversationRole.Assistant) {
            return (
              <View
                className="mt-4"
                key={`ai_question_cont_${index.toString()}`}
              >
                <AICoachCardFollowupCard
                  messageInsight={item.insight ?? ''}
                  messageReflection={item.reflection ?? ''}
                  questions={[
                    {
                      id: `ai_question_${index.toString()}`,
                      question: item.content ?? item.question ?? '',
                    },
                  ]}
                  coachName={applicationConfig?.aiCoachName ?? 'AI Coach'}
                  createdAt={item?.createdAt?.toString() ?? ''}
                />
              </View>
            );
          }
          return (
            <View
              className="mt-4"
              key={`user_question_cont_${index.toString()}`}
            >
              <UserChatMessageCard
                content={item?.content ?? ''}
                createdAt={item?.createdAt?.toString() ?? ''}
                userName={me?.displayName ?? ''}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}
