import { AppCard, AppIcon, AppPressable, AppText } from '@/components';

import { Bot } from 'lucide-react-native';
import { View } from 'react-native';

interface AICoachQuestion {
  id: string;
  question: string;
}

interface AICoachCardFollowupCardProps {
  message: string;
  questions: AICoachQuestion[];
  coachName: string;
  createdAt: string;
}

export function AICoachCardFollowupCard({
  message,
  questions,
  coachName,
  createdAt,
}: AICoachCardFollowupCardProps) {
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
        <AppText variant="lg" className="mt-4 text-text-secondary">
          {message}
        </AppText>

        {/* Follow-up Heading */}
        <AppText variant="xl" className="mt-4 font-semibold text-text">
          Can you tell me more about...
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
      <AppText variant="xs" className="mt-1 ml-1 text-text-muted">
        {createdAt}
      </AppText>
    </>
  );
}
