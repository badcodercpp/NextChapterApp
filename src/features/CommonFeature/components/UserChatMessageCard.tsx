import { AppAvatar, AppText } from '@/components';

import { View } from 'react-native';

interface UserChatMessageCardProps {
  content: string;
  createdAt: string;
  userName: string;
}

export function UserChatMessageCard({
  content,
  createdAt,
  userName,
}: UserChatMessageCardProps) {
  return (
    <View className="flex-1 flex-row justify-end">
      <View className="flex-1">
        <View className="rounded-[24px] border border-border bg-secondary px-4 py-4">
          <AppText variant="lg" className="">
            {content}
          </AppText>
        </View>

        <View className="mt-1 flex-row justify-end items-center">
          <AppText variant="xs" className="text-text-muted">
            {createdAt}
          </AppText>
        </View>
      </View>
      <View className="ml-2 mt-2">
        <AppAvatar size="sm" name={userName} />
      </View>
    </View>
  );
}
