import { AppCard, AppIcon, AppText } from '@/components';
import { useCallback, useMemo } from 'react';

import { Award } from 'lucide-react-native';
import { ConversationRole } from '@/__generated__/graphql';
import { View } from 'react-native';
import { selectTodayQuestion } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface FollowUpProgressCardProps {
  total: number;
  title?: string;
  message?: string;
}

export function FollowUpProgressCard({
  total,
  title = "You're doing great!",
  message = 'Keep going, healing takes time.',
}: FollowUpProgressCardProps) {
  const { data: todayQuestion } = useSelector(selectTodayQuestion);

  const getTotalTodayUserReplyContent = useCallback(
    (questions: typeof todayQuestion) => {
      const conversation = questions?.conversation ?? [];
      if (!conversation) {
        return 0;
      }

      return conversation.reduce((acc, curr) => {
        let target: number = acc;
        if (curr.role === ConversationRole.User) {
          target = target + 1;
        }
        return target;
      }, 0);
    },
    [],
  );

  const totalTodayUserReplyContent = useMemo(() => {
    return getTotalTodayUserReplyContent(todayQuestion);
  }, [getTotalTodayUserReplyContent, todayQuestion]);

  return (
    <AppCard className="overflow-hidden rounded-[24px] border border-primary-v2/30 bg-background-v2 px-4 py-4">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View className="flex-row items-center">
        <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-primary-v2/25">
          <AppIcon icon={Award} size={30} className="text-link-v2" />
        </View>

        <View className="ml-3 flex-1 border-l border-primary-v2/30 pl-3">
          <AppText variant="md" className="font-semibold text-text-v2">
            {title}
          </AppText>

          <AppText variant="xs" className="mt-1 text-text-muted-v2">
            {message}
          </AppText>
        </View>

        <View className="ml-3 items-center border-l border-primary-v2/30 pl-3">
          <AppText variant="lg" className="font-bold text-link-v2">
            {totalTodayUserReplyContent} / {total}
          </AppText>

          <AppText variant="xs" className="mt-1 text-text-muted-v2">
            Follow-ups
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
