import { AppText } from '@/components';
import { View } from 'react-native';

interface ChatDateDividerProps {
  label?: string;
}

export function ChatDateDivider({ label = 'Today' }: ChatDateDividerProps) {
  return (
    <View className="mb-8 flex-row items-center">
      <View className="h-px flex-1 bg-border" />

      <AppText variant="sm" className="mx-5 text-text-muted">
        {label}
      </AppText>

      <View className="h-px flex-1 bg-border" />
    </View>
  );
}
