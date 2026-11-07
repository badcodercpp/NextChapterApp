import { AppCard, AppIcon, AppText } from '@/components';
import { useCallback, useMemo } from 'react';

import { Clock3, MessageCircleQuestion, Sprout } from 'lucide-react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';
import { useResolveClassNames } from 'uniwind';
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
  helperText = 'There are no right or wrong answers.\nBe honest with yourself.',
}: TodaysQuestionCardInSessionProps) {
  const { data: todayQuestion } = useSelector(selectTodayQuestion);
  const { backgroundColor: accent } = useResolveClassNames('bg-primary-v2');
  const { color: highlight } = useResolveClassNames('text-link-v2');

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
    <AppCard className="overflow-hidden rounded-[26px] border border-primary-v2/40 bg-background-v2 p-4">
      <View
        pointerEvents="none"
        className="absolute inset-0 bg-primary-v2/10"
      />
      <View
        pointerEvents="none"
        className="absolute -right-16 -top-24 h-48 w-64 rounded-full bg-primary-v2/10"
      />
      <View className="flex-row flex-wrap items-center gap-y-3">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-[14px] border border-primary-v2/25 bg-primary-v2/20">
          <AppIcon
            icon={MessageCircleQuestion}
            size={24}
            className="text-link-v2"
          />
        </View>

        <View className="flex-1 border-l border-primary-v2/30 pl-3">
          <AppText variant="md" className="font-semibold text-link-v2">
            {category}
          </AppText>

          <AppText variant="xs" className="mt-1 text-text-muted-v2">
            {focus}
          </AppText>
        </View>

        <View className="ml-2 flex-row items-center rounded-full border border-primary-v2/40 bg-primary-v2/15 px-2.5 py-1.5">
          <AppIcon icon={Clock3} size={14} className="text-link-v2" />

          <AppText variant="xs" className="ml-1.5 font-medium text-text-v2">
            {duration}
          </AppText>
        </View>
      </View>

      <View className="mt-5">
        <AppText variant="lg" className="font-semibold leading-7 text-text-v2">
          {todayQuestionContent ?? question}
        </AppText>
      </View>

      <View pointerEvents="none" className="mt-2 h-12">
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
        >
          <Defs>
            <LinearGradient id="questionSunset" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={highlight} stopOpacity={0.8} />
              <Stop offset="1" stopColor={accent} stopOpacity={0.1} />
            </LinearGradient>
          </Defs>
          <Circle cx="335" cy="47" r="24" fill="url(#questionSunset)" />
          <Path
            d="M297 27 L292 20 M311 16 L307 8 M334 11 V3 M355 18 L360 10 M372 28 L380 23"
            stroke={highlight}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.7}
          />
          <Path
            d="M145 60 Q235 -5 285 30 Q310 40 335 54 Q370 25 400 27 V60Z"
            fill="url(#questionSunset)"
            stroke={accent}
            strokeWidth={0.7}
          />
          <Path
            d="M235 60 Q285 30 335 54 Q365 43 400 50 V60Z"
            fill={accent}
            opacity={0.15}
          />
        </Svg>
      </View>
      <View className="flex-row items-center border-t border-primary-v2/30 pt-3">
        <AppIcon icon={Sprout} size={24} className="mr-3 text-link-v2" />
        <AppText
          variant="sm"
          className="flex-1 italic leading-5 text-text-muted-v2"
        >
          {helperText}
        </AppText>
      </View>
    </AppCard>
  );
}
