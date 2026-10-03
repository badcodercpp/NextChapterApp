import { AppText } from '@/components';
import { AssistantAvatar } from '@/features/CommonFeature/components/AssistantAvatar';
import { View } from 'react-native';

interface AssistantChatMessageCardProps {
  content: string;
  createdAt: string;
}

export function AssistantChatMessageCard({
  content,
  createdAt,
}: AssistantChatMessageCardProps) {
  return (
    <View className="flex-1 flex-row items-start">
      <AssistantAvatar />

      <View className="flex-1">
        <View className="rounded-[24px] border border-border bg-surface px-4 py-4">
          <AppText variant="lg" className="">
            {content}
          </AppText>
        </View>

        <AppText variant="xs" className="mt-1 ml-1 text-text-muted">
          {createdAt}
        </AppText>
      </View>
    </View>
  );
}
