import { AppAvatar, AppIcon, AppText } from '@/components';
import { Bot, CheckCheck } from 'lucide-react-native';

import { View } from 'react-native';

export interface ChatMessageData {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  createdAt: string;
  status?: 'sent' | 'read';
}

interface ChatMessageProps {
  message: ChatMessageData;
}

const AssistantAvatar = () => (
  <View className="h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface mr-2 mt-2">
    <AppIcon icon={Bot} size={24} className="text-white" strokeWidth={2} />
  </View>
);

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <View className="flex-1 mb-5">
      {isUser ? (
        <View className="flex-1 flex-row justify-end">
          <View className="flex-1">
            <View className="rounded-[22px] border border-border bg-secondary px-4 py-4">
              <AppText variant="md" className="leading-6">
                {message.content}
              </AppText>
            </View>

            <View className="mt-1 flex-row justify-end items-center">
              <AppText variant="xs" className="text-text-muted">
                {message.createdAt}
              </AppText>

              {message.status && (
                <AppIcon
                  icon={CheckCheck}
                  size={18}
                  className="ml-1 text-primary"
                  strokeWidth={2.5}
                />
              )}
            </View>
          </View>
          <View className="ml-2 mt-2">
            <AppAvatar size="sm" name="Ajay Jha" />
          </View>
        </View>
      ) : (
        <View className="flex-1 flex-row items-start">
          <AssistantAvatar />

          <View className="flex-1">
            <View className="rounded-[22px] border border-border bg-surface px-4 py-4">
              <AppText variant="md" className="leading-6">
                {message.content}
              </AppText>
            </View>

            <AppText variant="xs" className="mt-1 ml-1 text-text-muted">
              {message.createdAt}
            </AppText>
          </View>
        </View>
      )}
    </View>
  );
}
