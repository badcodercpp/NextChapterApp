import { AppCard, AppPressable, AppText } from '@/components';

import { View } from 'react-native';

interface QuickReply {
  id: string;
  text: string;
}

interface QuickFollowupReplyCardProps {
  replies?: QuickReply[];
  onSelect?: (reply: QuickReply) => void;
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
  replies = defaultReplies,
  onSelect,
}: QuickFollowupReplyCardProps) {
  return (
    <AppCard className="overflow-hidden rounded-[24px] border border-border bg-card p-5">
      <AppText variant="lg" className=" text-primary">
        You can reply or try one of these
      </AppText>

      <View className="mt-2 flex-row flex-wrap justify-between gap-y-3">
        {replies.map(reply => (
          <AppPressable
            key={reply.id}
            onPress={() => onSelect?.(reply)}
            className="w-[48%] flex-row items-center rounded-[24px] border border-border bg-transparent p-4"
          >
            <AppText variant="md" className="flex-1 text-text-secondary">
              {reply.text}
            </AppText>
          </AppPressable>
        ))}
      </View>
    </AppCard>
  );
}
