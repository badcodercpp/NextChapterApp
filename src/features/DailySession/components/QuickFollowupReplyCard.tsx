import { AppCard, AppIcon, AppPressable, AppText } from '@/components';
import { Frown, Handshake, Sparkles, Target, Users } from 'lucide-react-native';
import { useCallback, useMemo } from 'react';

import { ConversationRole } from '@/__generated__/graphql';
import { View } from 'react-native';
import { getLastConversationByRole } from '@/utils';
import { selectTodayQuestion } from '@/state/selectors';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';

interface QuickReply {
  id: string;
  text: string;
}

interface QuickFollowupReplyCardProps {
  createQuickReplyFollowupRecord?: (reply: string) => void;
}

const defaultReplies: QuickReply[] = [
  {
    id: '1',
    text: 'It happened after a big fight',
  },
  {
    id: '2',
    text: 'I felt completely rejected',
  },
  {
    id: '3',
    text: 'I wished they had stayed',
  },
  {
    id: '4',
    text: 'I blamed myself',
  },
];

export function QuickFollowupReplyCard({
  createQuickReplyFollowupRecord,
}: QuickFollowupReplyCardProps) {
  const { data: todayQuestion } = useSelector(selectTodayQuestion);

  const getReplies = useCallback((questions: typeof todayQuestion) => {
    const lastAssistantConversation = getLastConversationByRole(
      questions,
      ConversationRole.Assistant,
    );
    if (!lastAssistantConversation?.quickReplies?.length) {
      return defaultReplies;
    }

    return (
      lastAssistantConversation?.quickReplies?.reduce((acc, curr) => {
        const newId = uuid.v4();
        return [
          ...acc,
          {
            id: newId,
            text: curr,
          },
        ];
      }, [] as Array<QuickReply>) ?? []
    );
  }, []);

  const allReplyEntity = useMemo(() => {
    return getReplies(todayQuestion);
  }, [getReplies, todayQuestion]);

  return (
    <AppCard className="overflow-hidden rounded-[26px] border border-primary-v2/30 bg-background-v2 p-4">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View className="flex-row items-center">
        <AppIcon icon={Sparkles} size={23} className="mr-2 text-link-v2" />
        <AppText variant="md" className="flex-1 font-semibold text-link-v2">
          You can reply or try one of these
        </AppText>
      </View>

      <View className="mt-3 flex-row flex-wrap justify-between gap-y-2">
        {allReplyEntity.map((reply, index) => (
          <AppPressable
            key={reply.id}
            onPress={() => createQuickReplyFollowupRecord?.(reply.text)}
            className="w-[48%] min-h-[72px] flex-row items-center rounded-[20px] border border-primary-v2/30 bg-background-v2/40 px-3 py-3"
          >
            <AppIcon
              icon={[Handshake, Frown, Users, Target][index % 4]}
              size={24}
              className="mr-2 text-link-v2"
            />
            <AppText variant="sm" className="flex-1 leading-5 text-text-v2">
              {reply.text}
            </AppText>
          </AppPressable>
        ))}
      </View>
    </AppCard>
  );
}
