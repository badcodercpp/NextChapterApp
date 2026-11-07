import { AppAvatar, AppText } from '@/components';

import { View } from 'react-native';

interface UserChatMessageCardProps {
  content: string;
  createdAt: string;
  userName: string;
  themed?: boolean;
}

export function UserChatMessageCard({
  content,
  createdAt,
  userName,
  themed = false,
}: UserChatMessageCardProps) {
  return (
    <View className="flex-1 flex-row justify-end">
      <View className="flex-1">
        <View
          className={
            themed
              ? 'min-h-[56px] rounded-[24px] border border-primary-v2/50 bg-primary-v2 px-4 py-4'
              : 'rounded-[24px] border border-border bg-secondary px-4 py-4'
          }
        >
          <AppText variant="lg" className={themed ? 'text-on-primary-v2' : ''}>
            {content}
          </AppText>
        </View>

        <View className="mt-1 flex-row justify-end items-center">
          <AppText
            variant="xs"
            className={themed ? 'text-text-muted-v2' : 'text-text-muted'}
          >
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
