import { AppExpandableText, AppIcon, AppText } from '@/components';
import { Bot, CheckCheck } from 'lucide-react-native';
import { AiChatRole } from '@/__generated__/graphql';
import { ChatMessageProps } from '@/features/CommonFeature/types/ChatMessageTypes';
import { View } from 'react-native';

export function CoachAvatar() {
  return (
    <View className="mr-2 h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-v2">
      <AppIcon icon={Bot} size={20} className="text-on-primary-v2" />
    </View>
  );
}

export function AIChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === AiChatRole.User;

  return (
    <View className="mb-5">
      <View
        className={`flex-row items-end ${
          isUser ? 'justify-end pl-10' : 'pr-6'
        }`}
      >
        {!isUser && <CoachAvatar />}
        <View className="max-w-full shrink">
          <View
            className={`rounded-3xl px-4 py-3 ${
              isUser
                ? 'rounded-br-lg bg-primary-v2'
                : 'rounded-bl-lg border border-border-v2 bg-input-v2'
            }`}
          >
            <AppExpandableText
              text={message.content}
              variant="md"
              collapsedLines={6}
              textClassName={`leading-6 ${
                isUser ? 'text-on-primary-v2' : 'text-text-v2'
              }`}
              buttonTextClassName={
                isUser ? 'text-on-primary-v2' : 'text-link-v2'
              }
            />
          </View>
        </View>
      </View>
      <View
        className={`mt-1 flex-row items-center gap-2 ${
          isUser ? 'justify-end' : 'ml-12'
        }`}
      >
        <AppText variant="xs" className="text-text-muted-v2">
          {message.createdAt}
        </AppText>
        {isUser && message.status && (
          <AppIcon icon={CheckCheck} size={16} className="text-link-v2" />
        )}
      </View>
    </View>
  );
}
