import { AppCard, AppIcon, AppText } from '@/components';
import { useCallback, useMemo } from 'react';

import { Clock3 } from 'lucide-react-native';
import { ConversationRole } from '@/__generated__/graphql';
import { View } from 'react-native';
import { selectTodayQuestion } from '@/state/selectors';
import { useSelector } from 'react-redux';

interface TodaysQuestionCardInSessionProps {
  category?: string;
  focus?: string;
  duration?: string;
  question?: string;
  helperText?: string;
}

export function TodaysQuestionCardInSession({
  category = "Today's Question",
  focus = 'Let go of what hurts',
  duration = '2-3 min',
  question = "What's one moment or memory that still hurts when you think about it?",
  helperText = 'There are no right or wrong answers, Be honest with yourself.',
}: TodaysQuestionCardInSessionProps) {
  const { data: todayQuestion } = useSelector(selectTodayQuestion);

  const getTodayQuestionContent = useCallback(() => {
    const firstItem = [...(todayQuestion?.conversation ?? [])].find(
      item => item.role === ConversationRole.Assistant,
    );
    return firstItem?.content ?? firstItem?.question ?? '';
  }, [todayQuestion]);

  const todayQuestionContent = useMemo(() => {
    return getTodayQuestionContent();
  }, [getTodayQuestionContent]);

  return (
    <AppCard className="overflow-hidden rounded-[24px] border border-border bg-card p-5">
      {/* Header */}
      <View className="flex-row items-center">
        {/* Header Text */}
        <View className="flex-1">
          <AppText variant="lg" className="font-semibold text-primary">
            {category}
          </AppText>

          <AppText variant="sm" className="text-text-muted">
            {focus}
          </AppText>
        </View>

        {/* Duration */}
        <View className="flex-row items-center rounded-full border border-primary/50 bg-primary/5 px-4 py-3">
          <AppIcon icon={Clock3} size={20} className="text-primary" />

          <AppText variant="sm" className="ml-2 text-primary">
            {duration}
          </AppText>
        </View>
      </View>

      {/* Question */}
      <View className="mt-4">
        <AppText variant="lg" className="text-text">
          {todayQuestionContent ?? question}
        </AppText>
      </View>

      {/* Helper */}
      <View className="mt-2">
        <AppText variant="sm" className="text-text-muted">
          {helperText}
        </AppText>
      </View>
    </AppCard>
  );
}
