import { AppPressable, AppText } from '@/components';
import { ScrollView, View } from 'react-native';

import { selectLatestAiChatMessage } from '@/state/selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

interface QuickReply {
  id: string;
  label: string;
  color: string;
}

interface QuickRepliesProps {
  replies?: QuickReply[];
  onPress?: (reply: QuickReply) => void;
}

const DEFAULT_REPLIES: QuickReply[] = [
  {
    id: 'overthinking',
    label: 'Help me manage overthinking',
    color: 'text-secondary',
  },
  {
    id: 'motivate',
    label: 'Motivate me today',
    color: 'text-green-400',
  },
  {
    id: 'bad-day',
    label: "I'm having a bad day",
    color: 'text-cyan-400',
  },
];

export function QuickReplies({ onPress }: QuickRepliesProps) {
  const { data: latestAiChatMessage } = useSelector(selectLatestAiChatMessage);

  const quickReplies = useMemo(() => {
    if (
      !latestAiChatMessage?.quickReplies ||
      !latestAiChatMessage?.quickReplies?.length
    ) {
      return DEFAULT_REPLIES;
    }
    return latestAiChatMessage?.quickReplies?.map((e, index) => ({
      id: `quick_reply_${index}`,
      label: e,
      color: 'text-secondary',
    }));
  }, [latestAiChatMessage]);

  return (
    <View>
      {/* Header */}
      <AppText
        variant="sm"
        className="mb-2 font-semibold tracking-wide text-text-muted"
      >
        QUICK REPLIES
      </AppText>

      {/* Replies */}
      <View className="flex h-12">
        <ScrollView horizontal>
          <View className="flex-row flex-wrap gap-2">
            {quickReplies.map(reply => (
              <AppPressable
                key={reply.id}
                onPress={() => onPress?.(reply)}
                className={`flex-row items-center rounded-full border px-4 py-2 ${reply.color.replace(
                  'text-',
                  'border-',
                )}/40 text-primary bg-card/40`}
              >
                <AppText
                  variant="sm"
                  className={`ml-2 font-medium ${reply.color}`}
                >
                  {reply.label}
                </AppText>
              </AppPressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
