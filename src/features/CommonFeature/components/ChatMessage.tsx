import { AppAvatar, AppIcon, AppText } from '@/components';

import { AssistantAvatar } from '@/features/CommonFeature/components/AssistantAvatar';
import { ChatMessageProps } from '@/features/CommonFeature/types/ChatMessageTypes';
import { CheckCheck } from 'lucide-react-native';
import { View } from 'react-native';
import { selectMe } from '@/state/selectors';
import { useSelector } from 'react-redux';

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const { data: me } = useSelector(selectMe);

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
            <AppAvatar size="sm" name={me?.displayName ?? ''} />
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
