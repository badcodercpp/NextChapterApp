import {
  AppCard,
  AppExpandableText,
  AppIcon,
  AppPressable,
  AppText,
} from '@/components';

import { Bot } from 'lucide-react-native';
import { View } from 'react-native';
import { formatDistanceToNowStrict } from 'date-fns';

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
  themed?: boolean;
}

export function AICoachCardFollowupCard({
  messageInsight,
  messageReflection,
  questions,
  coachName,
  createdAt,
  themed = false,
}: AICoachCardFollowupCardProps) {
  const dateAgo = new Date(createdAt);
  const timeAgo = formatDistanceToNowStrict(dateAgo, {
    addSuffix: true,
  });
  return (
    <>
      <AppCard
        className={
          themed
            ? 'overflow-hidden rounded-[26px] border border-primary-v2/40 bg-background-v2 p-4'
            : 'overflow-hidden rounded-[24px] border border-border bg-card p-5'
        }
      >
        {themed && (
          <View
            pointerEvents="none"
            className="absolute inset-0 bg-primary-v2/10"
          />
        )}
        {/* Coach Header */}
        <View className="flex-row items-center">
          <View
            className={
              themed
                ? 'h-12 w-12 items-center justify-center rounded-[16px] border border-primary-v2/30 bg-primary-v2/20'
                : 'h-12 w-12 items-center justify-center rounded-full border-1 border-primary bg-primary/10'
            }
          >
            <AppIcon
              icon={Bot}
              size={24}
              className={themed ? 'text-link-v2' : 'text-primary'}
            />
          </View>

          <AppText
            variant="xl"
            className={
              themed
                ? 'ml-3 flex-1 font-semibold text-link-v2'
                : 'ml-4 text-primary'
            }
          >
            {coachName}
          </AppText>
        </View>

        {/* Coach Message */}
        {messageInsight && (
          <View className="mt-4">
            <AppText
              variant="xl"
              className={themed ? 'text-link-v2' : 'text-primary'}
            >
              Insight -{' '}
            </AppText>
            <AppExpandableText
              text={messageInsight}
              variant="lg"
              textClassName={
                themed
                  ? 'mt-1 leading-6 text-text-v2'
                  : 'mt-1 text-text-secondary'
              }
              buttonTextClassName={themed ? 'text-link-v2' : 'text-primary'}
            />
          </View>
        )}

        <View
          className={
            themed
              ? 'mt-4 h-px bg-primary-v2/20'
              : 'mt-4 h-px flex-1 bg-divider'
          }
        />

        {messageReflection && (
          <View className="mt-4">
            <AppText
              variant="xl"
              className={themed ? 'text-link-v2' : 'text-primary'}
            >
              Reflection -{' '}
            </AppText>
            <AppExpandableText
              text={messageReflection}
              variant="lg"
              textClassName={
                themed
                  ? 'mt-1 leading-6 text-text-v2'
                  : 'mt-1 text-text-secondary'
              }
              buttonTextClassName={themed ? 'text-link-v2' : 'text-primary'}
            />
          </View>
        )}

        <View
          className={
            themed
              ? 'mt-4 h-px bg-primary-v2/20'
              : 'mt-4 h-px flex-1 bg-divider'
          }
        />

        {/* Follow-up Heading */}
        <AppText
          variant="xl"
          className={themed ? 'mt-4 text-link-v2' : 'mt-4 text-primary'}
        >
          Can you tell me more ...
        </AppText>

        {/* Questions */}
        <View className="mt-3 gap-3">
          {questions?.map(question => (
            <AppPressable
              key={question.id}
              onPress={() => {}}
              className={
                themed
                  ? 'flex-row items-start rounded-[20px] border border-primary-v2/30 bg-background-v2/40 p-4'
                  : 'flex-row items-start rounded-[28px] border-2 border-border bg-transparent p-4'
              }
            >
              {/* Question */}
              <AppText
                variant="lg"
                className={
                  themed
                    ? 'flex-1 leading-7 text-text-v2'
                    : 'flex-1 text-text-secondary'
                }
              >
                {question.question}
              </AppText>
            </AppPressable>
          ))}
        </View>
      </AppCard>
      <AppText
        variant="sm"
        className={
          themed
            ? 'mt-1 mr-4 text-right text-text-muted-v2'
            : 'mt-1 mr-4 text-right text-text-muted'
        }
      >
        {timeAgo}
      </AppText>
    </>
  );
}
