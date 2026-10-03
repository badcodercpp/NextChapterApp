import {
  AppCard,
  AppExpandableText,
  AppIcon,
  AppPressable,
  AppText,
} from '@/components';

import { Bot } from 'lucide-react-native';
import { View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

interface AICoachQuestion {
  id: string;
  question: string;
}

interface AICoachCardFollowupCardProps {
  messageInsight: string;
  messageReflection: string;
  questions: AICoachQuestion[];
  coachName: string;
  createdAt: string;
}

export function AICoachCardFollowupCard({
  messageInsight,
  messageReflection,
  questions,
  coachName,
  createdAt,
}: AICoachCardFollowupCardProps) {
  const dateAgo = new Date(createdAt);
  const timeAgo = formatDistanceToNow(dateAgo, {
    addSuffix: true,
  });
  return (
    <>
      <AppCard className="overflow-hidden rounded-[24px] border border-border bg-card p-5">
        {/* Coach Header */}
        <View className="flex-row items-center">
          <View className="h-12 w-12 items-center justify-center rounded-full border-1 border-primary bg-primary/10">
            <AppIcon icon={Bot} size={24} className="text-primary" />
          </View>

          <AppText variant="xl" className="ml-4 text-primary">
            {coachName}
          </AppText>
        </View>

        {/* Coach Message */}
        {messageInsight && (
          <View className="mt-4">
            <AppText variant="xl" className="text-primary">
              Insight -{' '}
            </AppText>
            <AppExpandableText
              text={messageInsight}
              variant="lg"
              textClassName="mt-1 text-text-secondary"
            />
          </View>
        )}

        <View className="mt-4 h-px flex-1 bg-divider" />

        {messageReflection && (
          <View className="mt-4">
            <AppText variant="xl" className="text-primary">
              Reflection -{' '}
            </AppText>
            <AppExpandableText
              text={messageReflection}
              variant="lg"
              textClassName="mt-1 text-text-secondary"
            />
          </View>
        )}

        <View className="mt-4 h-px flex-1 bg-divider" />

        {/* Follow-up Heading */}
        <AppText variant="xl" className="mt-4 text-primary">
          Can you tell me more ...
        </AppText>

        {/* Questions */}
        <View className="mt-3 gap-3">
          {questions?.map(question => (
            <AppPressable
              key={question.id}
              onPress={() => {}}
              className="flex-row items-start rounded-[28px] border-2 border-border bg-transparent p-4"
            >
              {/* Question */}
              <AppText variant="lg" className="flex-1 text-text-secondary">
                {question.question}
              </AppText>
            </AppPressable>
          ))}
        </View>
      </AppCard>
      <AppText variant="sm" className="mt-1 mr-4 text-right text-text-muted">
        {timeAgo}
      </AppText>
    </>
  );
}
