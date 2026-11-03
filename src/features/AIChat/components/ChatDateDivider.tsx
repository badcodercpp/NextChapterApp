import { AppText } from '@/components';
import { View } from 'react-native';

interface ChatDateDividerProps {
  label?: string;
}

export function ChatDateDivider({ label = 'Chats' }: ChatDateDividerProps) {
  return (
    <View className="my-4 flex-row items-center">
      <View className="h-px flex-1 bg-border-v2" />

      <AppText variant="xs" className="mx-4 font-medium text-text-muted-v2">
        {label}
      </AppText>

      <View className="h-px flex-1 bg-border-v2" />
    </View>
  );
}
